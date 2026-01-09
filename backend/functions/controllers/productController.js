import Product from "../models/Product.js";
import Seller from "../models/Seller.js";
import Order from "../models/Order.js";
import { deleteFromStorage } from "../controllers/uploadController.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
	try {
		console.log("add product cxalling", req.body);
		const product = new Product(req.body);
		await product.save();

		res.status(201).json({
			success: true,
			message: "Product added successfully!",
			product,
		});
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
	try {
		const products = await Product.find();

		res.status(200).json({ success: true, products });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product)
			return res
				.status(404)
				.json({ success: false, message: "Product not found" });

		res.status(200).json({ success: true, product });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
	try {
		console.log("upadte product is called", req.params.id, req.body);
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (!product)
			return res
				.status(404)
				.json({ success: false, message: "Product not found" });

		res.status(200).json({ success: true, message: "Updated", product });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// DELETE PRODUCT
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     res.status(200).json({ success: true, message: "Deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

export const deleteProduct = async (req, res) => {
	try {
		// 1️⃣ Find product first
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res
				.status(404)
				.json({ success: false, message: "Product not found" });
		}

		// 2️⃣ Delete image from Firebase Storage (if exists)
		if (product.imageUrl) {
			await deleteFromStorage(product.imageUrl);
		}

		// 3️⃣ Delete product from DB
		await product.deleteOne();

		res.status(200).json({
			success: true,
			message: "Product and image deleted successfully",
		});
	} catch (error) {
		console.error("Delete product error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to delete product",
		});
	}
};

// TOGGLE ACTIVE/INACTIVE
export const toggleActive = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product)
			return res
				.status(404)
				.json({ success: false, message: "Product not found" });

		product.isActive = !product.isActive;
		await product.save();

		res.status(200).json({
			success: true,
			message: `Product is now ${product.isActive ? "Active" : "Inactive"}`,
			product,
		});
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

export const allStats = async (req, res) => {
	try {
		console.log("all stats calling");

		// Run DB queries in parallel
		const [productResult, totalSellers, orderStatusResult] = await Promise.all([
			// TOTAL REVENUE (Inventory Value)
			Product.aggregate([
				{ $match: { isActive: true } },
				{
					$group: {
						_id: null,
						totalRevenue: {
							$sum: { $multiply: ["$price", "$stock"] },
						},
					},
				},
			]),

			// TOTAL SELLERS (exclude admin)
			Seller.countDocuments({ role: "seller" }),

			// ORDER STATUS COUNTS
			Order.aggregate([
				{
					$group: {
						_id: "$status",
						count: { $sum: 1 },
					},
				},
			]),
		]);

		const totalRevenue = productResult[0]?.totalRevenue || 0;

		let delivered = 0;
		let pendingConfirmed = 0;

		orderStatusResult.forEach((item) => {
			if (item._id === "delivered") delivered = item.count;
			if (item._id === "pending" || item._id === "confirmed") {
				pendingConfirmed += item.count;
			}
		});

		const states = {
			totalRevenue,
			totalSellers,
			deliveredOrders: delivered,
			pendingAndConfirmedOrders: pendingConfirmed,
		};

		res.status(200).json({
			success: true,
			states,
		});
	} catch (error) {
		console.error("allStats error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const getInventoryGraphData = async (req, res) => {
	try {
		const inventoryData = await Product.aggregate([
			{
				$match: { isActive: true },
			},
			{
				$group: {
					_id: "$category",
					value: { $sum: "$stock" },
				},
			},
			{
				$project: {
					_id: 0,
					name: "$_id",
					value: 1,
				},
			},
		]);

		res.status(200).json({
			success: true,
			inventoryData,
		});
	} catch (error) {
		console.error("Inventory graph error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const getProductsByRole = async (req, res) => {
	try {
		const { role = "common" } = req.body;

		// Fetch only active products
		const products = await Product.find({ isActive: true }).lean();

		const formattedProducts = products.map((product) => {
			let price, discount;

			if (role === "retailer") {
				price = product.retailerPrice;
				discount = product.retailerDiscount;
			} else if (role === "dealer") {
				price = product.dealerPrice;
				discount = product.dealerDiscount;
			} else {
				// common
				price = product.marketPrice;
				discount = product.marketDiscount;
			}

			// ❌ remove unwanted fields
			const {
				marketPrice,
				marketDiscount,
				retailerPrice,
				retailerDiscount,
				dealerPrice,
				dealerDiscount,
				...cleanProduct
			} = product;

			return {
				...cleanProduct,
				price, // ✅ only price
				discount, // ✅ only discount
			};
		});

		return res.status(200).json({
			success: true,
			count: formattedProducts.length,
			products: formattedProducts,
		});
	} catch (error) {
		console.error("Get products error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch products",
		});
	}
};

export const searchProductsByRole = async (req, res) => {
	try {
		const { query = "", role = "common" } = req.body;
		console.log("Querry -->", query)

		// 🔍 Build search condition
		const searchCondition = {
			isActive: true,
			$or: [
				{ name: { $regex: query, $options: "i" } },
				{ description: { $regex: query, $options: "i" } },
				{ category: { $regex: query, $options: "i" } },
			],
		};

		// Fetch matching products
		const products = await Product.find(searchCondition).lean();

		const formattedProducts = products.map((product) => {
			let price, discount;

			if (role === "retailer") {
				price = product.retailerPrice;
				discount = product.retailerDiscount;
			} else if (role === "dealer") {
				price = product.dealerPrice;
				discount = product.dealerDiscount;
			} else {
				// common
				price = product.marketPrice;
				discount = product.marketDiscount;
			}

			// ❌ Remove unwanted pricing fields
			const {
				marketPrice,
				marketDiscount,
				retailerPrice,
				retailerDiscount,
				dealerPrice,
				dealerDiscount,
				...cleanProduct
			} = product;

			return {
				...cleanProduct,
				price,
				discount,
			};
		});

		return res.status(200).json({
			success: true,
			count: formattedProducts.length,
			products: formattedProducts,
		});
	} catch (error) {
		console.error("Search products error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to search products",
		});
	}
};
