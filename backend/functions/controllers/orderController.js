import Order from "../models/Order.js";
import Offer from "../models/Offer.js";
import mongoose from "mongoose";
import { sendFcmNotification } from "../utills/sendFcmNotification.js";
import Seller from "../models/Seller.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
	try {
		console.log("create api called");
		const { sellerId, items, offerId } = req.body;
		console.log({ sellerId, items, offerId });

		// calculate totalQty & totalAmount
		let totalQty = 0;
		let totalAmount = 0;
		let totalDiscount = 0;

		items.forEach((item) => {
			const qty = item.qty || 0; // bags
			const pricePerPiece = item.price || 0;
			const packSize = item.packSize || 1;
			const discount = item.discount || 0;

			const grossAmount = qty * packSize * pricePerPiece;
			const discountAmount = (grossAmount * discount) / 100;
			const netAmount = grossAmount - discountAmount;

			totalQty += qty;
			totalAmount += netAmount;
			console.log("totalAmount===>", totalAmount);
		});

		const order = await Order.create({
			sellerId,
			items,
			totalQty,
			totalAmount,
			totalDiscount,
			offerId: offerId || null,
		});

		// OFFER INTEGRATION
		if (offerId) {
			const offer = await Offer.findById(offerId);

			if (offer) {
				// check if seller exists in offer
				let sellerEntry = offer.sellerPurchases.find(
					(sp) => sp.sellerId.toString() === sellerId
				);

				if (sellerEntry) {
					sellerEntry.totalQty += totalQty;
					sellerEntry.orders.push({
						orderId: order._id,
						qty: totalQty,
					});
				} else {
					offer.sellerPurchases.push({
						sellerId,
						totalQty,
						orders: [{ orderId: order._id, qty: totalQty }],
					});
				}

				await offer.save();
			}
		}

		try {
			// 1. Find all admins and get their tokens
			console.log("start sending message");
			const admins = await mongoose.model("Seller").find({ role: "admin" });
			console.log("alll admin are -->", admins);

			// 2. Flatten all admin tokens into one array
			const adminTokens = admins.flatMap((admin) => admin.fcmTokens || []);

			if (adminTokens.length > 0) {
				// Find the name of the seller who placed the order (optional but better for UI)
				const currentSeller = await mongoose.model("Seller").findById(sellerId);

				await sendFcmNotification({
					tokens: adminTokens,
					title: "🛍️ New Order Received!",
					body: `${
						currentSeller?.name || "A seller"
					} placed an order for ₹${totalAmount}`,
					data: {
						url: `https://demo.saafiariel.com/dashboard`,
						orderId: order._id.toString(),
						type: "NEW_ORDER",
					},
				});
			}
		} catch (notificationError) {
			// We wrap this in a separate try-catch so if notification fails,
			// the order creation itself isn't cancelled
			console.error("Notification failed:", notificationError);
		}

		res.status(201).json({ message: "Order created", order });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

// GET ALL ORDERS (ADMIN)
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.sort({ createdAt: -1 }) // latest first
			.populate("sellerId")
			.populate("items.productId")
			.populate("offerId");

		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// GET SINGLE ORDER
export const getSingleOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate("sellerId")
			.populate("items.productId")
			.populate("offerId");

		if (!order) return res.status(404).json({ message: "Order not found" });

		res.status(200).json(order);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// GET ORDERS BY SELLER
export const getSellerOrders = async (req, res) => {
	try {
		console.log("get seller is called");
		const orders = await Order.find({ sellerId: req.params.sellerId })
			.sort({ createdAt: -1 }) // latest order first
			.populate({
				path: "items.productId",
				select: `
          -marketPrice -marketDiscount
          -dealerPrice -dealerDiscount
          -retailerPrice -retailerDiscount
        `,
			})
			.populate("offerId");

		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
	try {
		const { status } = req.body;
		console.log("status", status);

		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true }
		);

		if (!order) return res.status(404).json({ message: "Order not found" });
		const seller = await Seller.findById(order.sellerId);
		console.log("seller-->", seller);
		console.log("seller fcm token->", seller.fcmTokens);

		if (seller && seller.fcmTokens && seller.fcmTokens.length > 0) {
			console.log("start sending messages");
			// Define status-specific messages
			const statusMessages = {
				pending: "✅ Your order has been confirmed!",
				confirmed: "🚚 Your order is confirmed and on the way!",
				delivered: "🎉 Your order has been delivered successfully!",
				cancelled: "❌ Your order has been cancelled.",
			};

			const title = statusMessages[status] || "Order Update";
			console.log(seller.fcmTokens);

			// 3. Send Notification to Seller
			await sendFcmNotification({
				tokens: seller.fcmTokens,
				title: title,
				body: `Order #${order._id
					.toString()
					.slice(-6)} status: ${status.toUpperCase()}`,
				data: {
					url: `https://demo.saafiariel.com/dashboard`,
					orderId: order._id.toString(),
					type: "ORDER_STATUS_UPDATE",
				},
			});
		}

		res.status(200).json({ message: "Status updated", order });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// DELETE ORDER
export const deleteOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.id);

		if (!order) return res.status(404).json({ message: "Order not found" });

		res.status(200).json({ message: "Order deleted" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getTimeAgo = (date) => {
	const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

	const intervals = [
		{ label: "y", seconds: 31536000 },
		{ label: "mo", seconds: 2592000 },
		{ label: "d", seconds: 86400 },
		{ label: "h", seconds: 3600 },
		{ label: "m", seconds: 60 },
	];

	for (const interval of intervals) {
		const count = Math.floor(seconds / interval.seconds);
		if (count >= 1) {
			return `${count}${interval.label} ago`;
		}
	}

	return "just now";
};

export const getFormattedOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("sellerId", "name")
			.populate("items.productId", "name unit")
			.sort({ createdAt: -1 });

		const formattedOrders = orders.map((order) => {
			const firstItem = order.items[0];

			return {
				id: `ORD-${order._id.toString().slice(-4).toUpperCase()}`,
				customer: order.sellerId?.name || "Unknown",
				product: firstItem?.productId
					? `${firstItem.productId.name} (${firstItem.qty}${firstItem.productId.unit})`
					: "N/A",
				status:
					order.status === "delivered"
						? "Completed"
						: order.status.charAt(0).toUpperCase() + order.status.slice(1),
				amount: `₹${order.totalAmount.toFixed(2)}`,
				date: getTimeAgo(order.createdAt),
			};
		});

		res.status(200).json({
			success: true,
			orders: formattedOrders,
		});
	} catch (error) {
		console.error("getFormattedOrders error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const getSalesGraphData = async (req, res) => {
	try {
		const data = await Order.aggregate([
			{
				$match: { status: "delivered" },
			},
			{
				$project: {
					hour: { $hour: "$createdAt" },
					totalAmount: 1,
				},
			},
			{
				$bucket: {
					groupBy: "$hour",
					boundaries: [0, 4, 8, 12, 16, 20, 24],
					default: "other",
					output: {
						sales: { $sum: "$totalAmount" },
						orders: { $sum: 1 },
					},
				},
			},
		]);

		const timeMap = {
			0: "00:00",
			4: "04:00",
			8: "08:00",
			12: "12:00",
			16: "16:00",
			20: "20:00",
			24: "23:59",
		};

		const SALES_DATA = Object.keys(timeMap).map((hour) => {
			const bucket = data.find((d) => d._id === Number(hour));
			return {
				time: timeMap[hour],
				sales: bucket?.sales || 0,
				orders: bucket?.orders || 0,
			};
		});

		res.status(200).json({
			success: true,
			salesData: SALES_DATA,
		});
	} catch (error) {
		console.error("Sales graph error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
