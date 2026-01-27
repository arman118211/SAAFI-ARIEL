import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Plus,
	Edit2,
	Trash2,
	Package,
	Search,
	Filter,
	X,
	ImageIcon,
	AlertCircle,
	TrendingUp,
	Check,
	TrendingDown,
	Store,
	Users,
	Box,
	DollarSign,
	Tag,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../utils/uploadImage";
import toast from "react-hot-toast";

import axios from "axios";
import ScrollToTop from "../ScrollToTop";

// Shimmer Loading Component
const ShimmerCard = () => (
	<div className="animate-pulse">
		<div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-3 bg-[length:200%_100%] animate-shimmer"></div>
		<div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-3/4 bg-[length:200%_100%] animate-shimmer"></div>
	</div>
);

const ProductManager = () => {
	const [products, setProducts] = useState([]);
	const [deletingId, setDeletingId] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [expandedDesc, setExpandedDesc] = useState({});
	const token = useSelector((state) => state.auth.token);

	const CATEGORY_OPTIONS = [
		"Detergent Powder",
		"Dishwashing",
		"Surface Cleaner",
		"Detergent Cake",
		"Handwash",
		"Other",
	];
	const BRAND_OPTIONS = [
		"Gaay Chaap",
		"Extra Tite",
		"Saafi",
		"Saafi Nepali",
		"Detergent Cake",
		"Liquid Item",
	];

	const getProductData = async () => {
		try {
			setIsLoading(true);
			const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log("response", res.data);
			setProducts(res.data.products);
		} catch (err) {
			// console.log("something went wrong", err)
			toast.error("Failed to load products");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getProductData();
	}, []);

	const [showForm, setShowForm] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	// const [formData, setFormData] = useState({
	//   name: "",
	//   description: "",
	//   price: "",
	//   unit: "",
	//   stock: "",
	//   category: "",
	//   imageUrl: "",
	//   isActive: true,
	// })
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: "",
		brand: "Gaay Chaap",
		imageUrl: "",

		// 🔹 New fields
		keyFeatures: [""],
		usageInstruction: "",
		quantity: "", // e.g. 1kg, 500gm, 1L
		packSize: "", // e.g. 10, 12, 25

		marketPrice: "",
		marketDiscount: 0,

		retailerPrice: "",
		retailerDiscount: 0,

		dealerPrice: "",
		dealerDiscount: 0,

		stock: "",
		isActive: true,
	});

	const [selectedImage, setSelectedImage] = useState(null);
	const [imageUploading, setImageUploading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let imageUrl = formData.imageUrl;

			// ✅ Upload ONLY if user selected a NEW image
			if (selectedImage) {
				setImageUploading(true);

				imageUrl = await uploadImage(selectedImage, "products");

				setImageUploading(false);
			}

			const payload = {
				...formData,
				imageUrl, // keeps old image if not changed
			};

			if (editingProduct) {
				await axios.put(
					`${import.meta.env.VITE_BASE_URL}/products/${editingProduct._id}`,
					payload,
				);
				toast.success("Product updated successfully");
			} else {
				await axios.post(
					`${import.meta.env.VITE_BASE_URL}/products/add`,
					payload,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				toast.success("Product added successfully");
			}

			getProductData();
			resetForm();
			setSelectedImage(null); // ✅ reset after submit
		} catch (err) {
			setImageUploading(false);
			toast.error("Failed to save product");
		}
	};

	const toggleDescription = (id) => {
		setExpandedDesc((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const handleEdit = (product) => {
		console.log("editing product==>", product);
		setEditingProduct(product);
		setFormData({ ...product });
		setSelectedImage(null);
		setShowForm(true);
	};

	// const handleDelete = async (id) => {

	//   if (window.confirm("Are you sure you want to delete this product?")) {
	//     try {
	//       const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${id}`)
	//       // console.log("successfully deleted", id)
	//       toast.success("Product deleted");
	//       getProductData()

	//     } catch (error) {
	//       toast.error("Failed to delete product");
	//       // console.log("delete falied", error)

	//     }
	//   }
	// }

	const handleDelete = (id) => {
		toast.custom(
			(t) => (
				<div
					className={`${
						t.visible ? "animate-enter" : "animate-leave"
					} bg-white shadow-xl rounded-xl border border-gray-200 p-4 w-[320px]`}
				>
					<h3 className="text-sm font-bold text-gray-900 mb-1">
						Delete Product?
					</h3>
					<p className="text-xs text-gray-600 mb-4">
						This action cannot be undone.
					</p>

					<div className="flex justify-end gap-2">
						<button
							onClick={() => toast.dismiss(t.id)}
							className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
						>
							Cancel
						</button>

						<button
							onClick={async () => {
								try {
									toast.dismiss(t.id);
									setDeletingId(id);

									await axios.delete(
										`${import.meta.env.VITE_BASE_URL}/products/${id}`,
										{
											headers: {
												Authorization: `Bearer ${token}`,
											},
										},
									);

									toast.success("Product deleted successfully");
									getProductData();
								} catch (err) {
									toast.error("Failed to delete product");
								} finally {
									setDeletingId(null);
								}
							}}
							className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
						>
							Delete
						</button>
					</div>
				</div>
			),
			{ duration: 5000 },
		);
	};

	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			category: "",
			imageUrl: "",
			keyFeatures: [""],
			usageInstruction: "",
			quantity: "",
			packSize: "",
			marketPrice: "",
			marketDiscount: 0,
			retailerPrice: "",
			retailerDiscount: 0,
			dealerPrice: "",
			dealerDiscount: 0,
			stock: "",
			isActive: true,
		});
		setEditingProduct(null);
		setShowForm(false);
	};

	const filteredProducts = products.filter(
		(p) =>
			p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			p.category.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const totalValue = products.reduce(
		(sum, p) => sum + p.marketPrice * p.stock,
		0,
	);
	const lowStockCount = products.filter((p) => p.stock < 20).length;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const getDiscountedPrice = (price, discount) => {
		if (!price) return 0;
		return Math.round(price - (price * discount) / 100);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 ">
			<ScrollToTop />
			<div className="mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-8">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-6 md:mb-8"
				>
					<div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
						<div className="w-full">
							<div className="flex items-center gap-2 md:gap-3 mb-2">
								<div className="p-2 md:p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg md:rounded-xl shadow-lg">
									<Package className="text-white" size={20} />
								</div>
								<h1 className="text-3xl md:text-3xl font-bold text-slate-900">
									Product Hub
								</h1>
							</div>
							<p className="text-slate-600 text-base md:text-lg">
								Manage inventory with precision and control
							</p>
						</div>
						<motion.button
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setShowForm(true)}
							className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
              text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap
              font-semibold shadow-sm transition-all duration-300 text-xs"
						>
							<Plus size={14} />
							Add Product
						</motion.button>
					</div>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-6 md:mb-8 "
				>
					{isLoading ? (
						// Shimmer Loading Cards
						<>
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg md:rounded-xl shadow-lg p-4 md:p-5"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-slide"></div>
									<div className="relative z-10">
										<div className="flex items-center justify-between mb-3">
											<div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-lg md:rounded-xl animate-pulse"></div>
											<div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse"></div>
										</div>
										<div className="h-3 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
										<div className="h-8 md:h-10 bg-gray-300 rounded w-16 animate-pulse"></div>
									</div>
								</div>
							))}
						</>
					) : (
						<>
							{/* Blue Stats Card */}
							<motion.div
								variants={itemVariants}
								whileHover={{ y: -4 }}
								className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg md:rounded-xl shadow-lg p-4 md:p-5 group cursor-pointer"
							>
								<div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500"></div>
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-3">
										<div className="bg-white/15 backdrop-blur-md p-2.5 md:p-3 rounded-lg md:rounded-xl border border-white/20">
											<Package className="text-white" size={18} />
										</div>
										<span className="text-xs font-bold text-blue-100 bg-blue-500/30 px-2.5 py-1 rounded-full backdrop-blur text-opacity-90">
											TOTAL
										</span>
									</div>
									<p className="text-blue-100 text-xs font-semibold mb-1 opacity-90">
										Total Products
									</p>
									<p className="text-3xl md:text-4xl font-black text-white">
										{products.length}
									</p>
								</div>
							</motion.div>

							{/* Red Stats Card */}
							<motion.div
								variants={itemVariants}
								whileHover={{ y: -4 }}
								className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-lg md:rounded-xl shadow-lg p-4 md:p-5 group cursor-pointer"
							>
								<div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500"></div>
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-3">
										<div className="bg-white/15 backdrop-blur-md p-2.5 md:p-3 rounded-lg md:rounded-xl border border-white/20">
											<AlertCircle className="text-white" size={18} />
										</div>
										<span className="text-xs font-bold text-red-100 bg-red-500/30 px-2.5 py-1 rounded-full backdrop-blur text-opacity-90">
											ALERT
										</span>
									</div>
									<p className="text-red-100 text-xs font-semibold mb-1 opacity-90">
										Low Stock Items
									</p>
									<p className="text-3xl md:text-4xl font-black text-white">
										{lowStockCount}
									</p>
								</div>
							</motion.div>

							{/* Green Stats Card */}
							<motion.div
								variants={itemVariants}
								whileHover={{ y: -4 }}
								className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg md:rounded-xl shadow-lg p-4 md:p-5 group cursor-pointer sm:col-span-2 lg:col-span-1"
							>
								<div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500"></div>
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-3">
										<div className="bg-white/15 backdrop-blur-md p-2.5 md:p-3 rounded-lg md:rounded-xl border border-white/20">
											<TrendingUp className="text-white" size={18} />
										</div>
										<span className="text-xs font-bold text-emerald-100 bg-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur text-opacity-90">
											REVENUE
										</span>
									</div>
									<p className="text-emerald-100 text-xs font-semibold mb-1 opacity-90">
										Inventory Value
									</p>
									<p className="text-3xl md:text-4xl font-black text-white">
										₹{(totalValue / 1000).toFixed(1)}K
									</p>
								</div>
							</motion.div>
						</>
					)}
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 mb-6 md:mb-8 border border-gray-200 "
				>
					<div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center">
						<div className="flex-1 w-full relative">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								size={16}
							/>
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search by name or category..."
								className="w-full pl-9 pr-3 py-2 md:py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm transition-all duration-300"
							/>
						</div>
						<motion.button
							whileHover={{ scale: 1.05 }}
							className="w-full sm:w-auto px-4 md:px-5 py-2 md:py-2.5 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2 text-gray-700 font-semibold text-sm"
						>
							<Filter size={16} />
							Filter
						</motion.button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="bg-white rounded-lg md:rounded-xl shadow-lg border border-gray-200 overflow-hidden"
				>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Product
									</th>
									<th className="hidden md:table-cell px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Category
									</th>
									<th className="px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Price
									</th>
									<th className="px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Stock
									</th>
									<th className="hidden sm:table-cell px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Status
									</th>
									<th className="px-3 md:px-4 py-3 md:py-3.5 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{isLoading ? (
									// Shimmer Loading Rows
									<>
										{[1, 2, 3, 4, 5].map((i) => (
											<tr key={i} className="animate-pulse">
												<td className="px-3 md:px-4 py-3 md:py-3.5">
													<div className="flex items-center gap-2 md:gap-3">
														<div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-200 relative overflow-hidden">
															<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
														</div>
														<div className="flex-1 space-y-2">
															<div className="h-4 bg-gray-200 rounded w-32 relative overflow-hidden">
																<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
															</div>
															<div className="h-3 bg-gray-200 rounded w-48 hidden sm:block relative overflow-hidden">
																<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
															</div>
														</div>
													</div>
												</td>
												<td className="hidden md:table-cell px-3 md:px-4 py-3 md:py-3.5">
													<div className="h-6 bg-gray-200 rounded-lg w-20 relative overflow-hidden">
														<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
													</div>
												</td>
												<td className="px-3 md:px-4 py-3 md:py-3.5">
													<div className="h-4 bg-gray-200 rounded w-16 mb-1 relative overflow-hidden">
														<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
													</div>
													<div className="h-3 bg-gray-200 rounded w-12 relative overflow-hidden">
														<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
													</div>
												</td>
												<td className="px-3 md:px-4 py-3 md:py-3.5">
													<div className="h-4 bg-gray-200 rounded w-12 relative overflow-hidden">
														<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
													</div>
												</td>
												<td className="hidden sm:table-cell px-3 md:px-4 py-3 md:py-3.5">
													<div className="h-6 bg-gray-200 rounded-lg w-16 relative overflow-hidden">
														<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
													</div>
												</td>
												<td className="px-3 md:px-4 py-3 md:py-3.5 text-right">
													<div className="flex items-center justify-end gap-1.5 md:gap-2">
														<div className="w-8 h-8 bg-gray-200 rounded-lg relative overflow-hidden">
															<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
														</div>
														<div className="w-8 h-8 bg-gray-200 rounded-lg relative overflow-hidden">
															<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"></div>
														</div>
													</div>
												</td>
											</tr>
										))}
									</>
								) : (
									<AnimatePresence>
										{filteredProducts.map((product, idx) => (
											<motion.tr
												key={product._id}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: 20 }}
												transition={{ delay: idx * 0.05 }}
												whileHover={{
													backgroundColor: "rgba(59, 130, 246, 0.03)",
												}}
												onClick={() => setSelectedProduct(product)}
												className="cursor-pointer hover:bg-blue-50/50 transition-all duration-300"
											>
												<td className="px-3 md:px-4 py-3 md:py-3.5 ">
													<div className="flex items-center gap-2 md:gap-3">
														<div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
															{product.imageUrl ? (
																<img
																	src={product.imageUrl || "/placeholder.svg"}
																	alt={product.name}
																	className="w-full h-full object-cover"
																/>
															) : (
																<ImageIcon
																	className="text-gray-400"
																	size={18}
																/>
															)}
														</div>
														<div className="min-w-0">
															<div className="font-bold text-gray-900 text-xs md:text-sm truncate500">
																{product.name}
																{product.quantity}
															</div>

															<div className="hidden sm:block max-w-xs">
																<p
																	className={`text-xs text-gray-500 transition-all ${
																		expandedDesc[product._id]
																			? ""
																			: "line-clamp-2"
																	}`}
																>
																	{product.description || "No description"}
																</p>

																{product.description?.length > 80 && (
																	<button
																		onClick={(e) => {
																			e.stopPropagation(); // prevent row click
																			toggleDescription(product._id);
																		}}
																		className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
																	>
																		{expandedDesc[product._id]
																			? "Read less"
																			: "Read more"}
																	</button>
																)}
															</div>
														</div>
													</div>
												</td>
												<td className="hidden md:table-cell px-3 md:px-4 py-3 md:py-3.5 ">
													<span className="inline-flex px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-100 text-blue-700 border border-blue-300">
														{product.brand || "Uncategorized"}
													</span>
												</td>
												<td className="px-3 md:px-4 py-3 md:py-3.5">
													<div className="text-xs md:text-sm font-bold text-gray-900">
														₹ {product.marketPrice}
													</div>
													<div className="text-xs text-gray-500">
														{product.unit}
													</div>
												</td>
												<td className="px-3 md:px-4 py-3 md:py-3.5">
													<div
														className={`text-xs md:text-sm font-bold ${
															product.stock < 20
																? "text-red-600"
																: "text-emerald-600"
														}`}
													>
														{product.stock}
													</div>
													{product.stock < 20 && (
														<div className="text-xs text-red-600 font-semibold">
															Low
														</div>
													)}
												</td>
												<td className="hidden sm:table-cell px-3 md:px-4 py-3 md:py-3.5">
													<span
														className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-lg ${
															product.isActive
																? "bg-emerald-100 text-emerald-700 border border-emerald-300"
																: "bg-gray-100 text-gray-600 border border-gray-300"
														}`}
													>
														{product.isActive ? "✓ Active" : "○ Inactive"}
													</span>
												</td>
												<td className="px-3 md:px-4 py-3 md:py-3.5 text-right">
													<div className="flex items-center justify-end gap-1.5 md:gap-2">
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={(e) => {
																e.stopPropagation();
																handleEdit(product);
															}}
															className="p-1.5 md:p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md"
														>
															<Edit2 size={14} />
														</motion.button>
														<motion.button
															whileHover={{
																scale: deletingId === product._id ? 1 : 1.1,
															}}
															whileTap={{ scale: 0.9 }}
															disabled={deletingId === product._id}
															onClick={(e) => {
																e.stopPropagation();
																handleDelete(product._id);
															}}
															className={`p-1.5 md:p-2 rounded-lg transition-all shadow-md
                            ${
															deletingId === product._id
																? "bg-red-400 cursor-not-allowed"
																: "bg-red-600 hover:bg-red-700"
														} text-white`}
														>
															{deletingId === product._id ? (
																<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block"></span>
															) : (
																<Trash2 size={14} />
															)}
														</motion.button>
													</div>
												</td>
											</motion.tr>
										))}
									</AnimatePresence>
								)}
							</tbody>
						</table>
					</div>

					{filteredProducts.length === 0 && (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className="text-center py-8 md:py-12"
						>
							<Package size={40} className="mx-auto text-gray-400 mb-3" />
							<h3 className="text-lg md:text-xl font-bold text-gray-700 mb-1">
								No products found
							</h3>
							<p className="text-xs md:text-sm text-gray-500">
								{searchTerm
									? "Try adjusting your search"
									: "Get started by adding your first product"}
							</p>
						</motion.div>
					)}
				</motion.div>
			</div>

			<AnimatePresence>
				{showForm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
						onClick={resetForm}
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.95, opacity: 0, y: 20 }}
							onClick={(e) => e.stopPropagation()}
							className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col"
						>
							{/* Header */}
							<div className="relative px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 "></div>
								<div className="relative z-10 flex justify-between items-center mb-12">
									<div>
										<h2 className="text-2xl font-bold text-white mb-1">
											{editingProduct ? "Edit Product" : "Add New Product"}
										</h2>
										<p className="text-blue-100 text-sm">
											{editingProduct
												? "Update product information"
												: "Fill in the details below to create a new product"}
										</p>
									</div>
									<motion.button
										whileHover={{ rotate: 90, scale: 1.1 }}
										onClick={resetForm}
										className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all"
									>
										<X className="text-white" size={20} />
									</motion.button>
								</div>
							</div>

							{/* Body */}
							<div className="overflow-y-auto flex-1 px-6 py-6">
								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Basic Information Section */}
									<div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
										<div className="flex items-center gap-2 mb-4">
											<Package className="w-5 h-5 text-blue-600" />
											<h3 className="text-lg font-bold text-gray-900">
												Basic Information
											</h3>
										</div>

										<div className="space-y-4">
											<div>
												<label className="block text-sm font-bold text-gray-700 mb-2">
													Product Name <span className="text-red-500">*</span>
												</label>
												<input
													type="text"
													name="name"
													value={formData.name}
													onChange={handleInputChange}
													required
													className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-900 placeholder-gray-400 transition-all"
													placeholder="Enter product name"
												/>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2">
														Category
													</label>
													<select
														name="category"
														value={formData.category}
														onChange={handleInputChange}
														required
														className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none
  text-gray-900 transition-all"
													>
														<option value="" disabled>
															Select Category
														</option>

														{CATEGORY_OPTIONS.map((cat) => (
															<option key={cat} value={cat}>
																{cat}
															</option>
														))}
													</select>
												</div>

												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2">
														Stock <span className="text-red-500">*</span>
													</label>
													<input
														type="number"
														name="stock"
														value={formData.stock}
														onChange={handleInputChange}
														required
														min="0"
														className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-900 placeholder-gray-400 transition-all"
														placeholder="0"
													/>
												</div>
											</div>
											<div>
												<label className="block text-sm font-bold text-gray-700 mb-2">
													Brand <span className="text-red-500">*</span>
												</label>

												<select
													name="brand"
													value={formData.brand}
													onChange={handleInputChange}
													required
													className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none
    text-gray-900 transition-all"
												>
													{BRAND_OPTIONS.map((brand) => (
														<option key={brand} value={brand}>
															{brand}
														</option>
													))}
												</select>
											</div>

											<div>
												<label className="block text-sm font-bold text-gray-700 mb-2">
													Description
												</label>
												<textarea
													name="description"
													value={formData.description}
													onChange={handleInputChange}
													rows="3"
													className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-900 placeholder-gray-400 resize-none transition-all"
													placeholder="Enter product description"
												/>
											</div>
										</div>
									</div>

									{/* Product Details Section */}
									<div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
										<div className="flex items-center gap-2 mb-4">
											<Box className="w-5 h-5 text-blue-600" />
											<h3 className="text-lg font-bold text-gray-900">
												Product Details
											</h3>
										</div>

										<div className="space-y-4">
											<div className="grid grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2">
														Quantity
													</label>
													<input
														type="text"
														name="quantity"
														value={formData.quantity}
														onChange={handleInputChange}
														placeholder="1kg / 500gm / 1L"
														className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-900 placeholder-gray-400 transition-all"
													/>
												</div>

												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2">
														Pack Size
													</label>
													<input
														type="number"
														name="packSize"
														value={formData.packSize}
														onChange={handleInputChange}
														placeholder="10 / 12 / 25"
														className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-900 placeholder-gray-400 transition-all"
													/>
												</div>
											</div>

											<div>
												<label className="block text-sm font-bold text-gray-700 mb-2">
													Key Features
												</label>
												<div className="space-y-2">
													{formData.keyFeatures.map((feature, index) => (
														<div key={index} className="flex gap-2">
															<input
																type="text"
																value={feature}
																onChange={(e) => {
																	const updated = [...formData.keyFeatures];
																	updated[index] = e.target.value;
																	setFormData({
																		...formData,
																		keyFeatures: updated,
																	});
																}}
																className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm transition-all"
																placeholder={`Feature ${index + 1}`}
															/>
															<button
																type="button"
																onClick={() =>
																	setFormData({
																		...formData,
																		keyFeatures: formData.keyFeatures.filter(
																			(_, i) => i !== index,
																		),
																	})
																}
																className="px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors flex items-center justify-center"
															>
																✕
															</button>
														</div>
													))}
												</div>

												<button
													type="button"
													onClick={() =>
														setFormData({
															...formData,
															keyFeatures: [...formData.keyFeatures, ""],
														})
													}
													className="mt-3 flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
												>
													+ Add Feature
												</button>
											</div>

											<div>
												<label className="block text-sm font-bold text-gray-700 mb-2">
													Usage Instructions
												</label>
												<textarea
													name="usageInstruction"
													value={formData.usageInstruction}
													onChange={handleInputChange}
													rows="3"
													className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-900 placeholder-gray-400 resize-none transition-all"
													placeholder="Explain how to use the product"
												/>
											</div>
										</div>
									</div>

									{/* Pricing Section */}
									<div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100">
										<div className="flex items-center gap-2 mb-4">
											<DollarSign className="w-5 h-5 text-emerald-600" />
											<h3 className="text-lg font-bold text-gray-900">
												Pricing Tiers
											</h3>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{/* Market Price */}
											<div className="p-4 bg-white rounded-lg border-2 border-blue-200">
												<p className="text-xs font-bold text-blue-600 mb-3 flex items-center gap-1">
													<Tag size={14} />
													Market Price
												</p>
												<div className="space-y-3">
													<div>
														<label className="block text-xs font-semibold text-gray-600 mb-1">
															Price
														</label>
														<input
															type="number"
															name="marketPrice"
															value={formData.marketPrice}
															onChange={handleInputChange}
															className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm transition-all"
															placeholder="₹0"
														/>
													</div>
													<div>
														<label className="block text-xs font-semibold text-gray-600 mb-1">
															Discount (%)
														</label>
														<input
															type="number"
															name="marketDiscount"
															value={formData.marketDiscount}
															onChange={handleInputChange}
															className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm transition-all"
															placeholder="0"
														/>
													</div>
												</div>
											</div>

											{/* Retailer Price */}
											<div className="p-4 bg-white rounded-lg border-2 border-emerald-200">
												<p className="text-xs font-bold text-emerald-600 mb-3 flex items-center gap-1">
													<Tag size={14} />
													Retailer Price
												</p>
												<div className="space-y-3">
													<div>
														<label className="block text-xs font-semibold text-gray-600 mb-1">
															Price
														</label>
														<input
															type="number"
															name="retailerPrice"
															value={formData.retailerPrice}
															onChange={handleInputChange}
															className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none text-sm transition-all"
															placeholder="₹0"
														/>
													</div>
													<div>
														<label className="block text-xs font-semibold text-gray-600 mb-1">
															Discount (%)
														</label>
														<input
															type="number"
															name="retailerDiscount"
															value={formData.retailerDiscount}
															onChange={handleInputChange}
															className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none text-sm transition-all"
															placeholder="0"
														/>
													</div>
												</div>
											</div>

											{/* Dealer Price */}
											<div className="p-4 bg-white rounded-lg border-2 border-orange-200">
												<p className="text-xs font-bold text-orange-600 mb-3 flex items-center gap-1">
													<Tag size={14} />
													Dealer Price
												</p>
												<div className="space-y-3">
													<div>
														<label className="block text-xs font-semibold text-gray-600 mb-1">
															Price
														</label>
														<input
															type="number"
															name="dealerPrice"
															value={formData.dealerPrice}
															onChange={handleInputChange}
															className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 outline-none text-sm transition-all"
															placeholder="₹0"
														/>
													</div>
													<div>
														<label className="block text-xs font-semibold text-gray-600 mb-1">
															Discount (%)
														</label>
														<input
															type="number"
															name="dealerDiscount"
															value={formData.dealerDiscount}
															onChange={handleInputChange}
															className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 outline-none text-sm transition-all"
															placeholder="0"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* Image Upload Section */}
									<div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
										<div className="flex items-center gap-2 mb-4">
											<ImageIcon className="w-5 h-5 text-purple-600" />
											<h3 className="text-lg font-bold text-gray-900">
												Product Image
											</h3>
										</div>

										<div className="relative">
											<label
												htmlFor="product-image"
												className="group flex flex-col items-center justify-center w-full h-48
                        border-2 border-dashed border-gray-300 rounded-xl cursor-pointer
                        bg-white hover:border-purple-400 hover:bg-purple-50/50
                        transition-all duration-300"
											>
												<div className="flex flex-col items-center justify-center text-center px-4">
													<ImageIcon
														size={40}
														className="text-gray-400 group-hover:text-purple-600 transition-colors mb-3"
													/>
													<p className="text-sm font-semibold text-gray-600 group-hover:text-purple-700">
														Click to upload image
													</p>
													<p className="text-xs text-gray-400 mt-1">
														PNG, JPG up to 5MB
													</p>
												</div>

												<input
													id="product-image"
													type="file"
													accept="image/*"
													className="hidden"
													onChange={(e) => setSelectedImage(e.target.files[0])}
												/>
											</label>
										</div>

										{imageUploading && (
											<div className="flex items-center gap-2 mt-3 text-sm text-purple-600 font-semibold">
												<div className="w-4 h-4 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
												Uploading image...
											</div>
										)}

										{(selectedImage || formData.imageUrl) && (
											<motion.div
												initial={{ opacity: 0, scale: 0.95 }}
												animate={{ opacity: 1, scale: 1 }}
												className="mt-4 flex items-center gap-4 p-4 border-2 border-purple-200 rounded-xl bg-white"
											>
												<img
													src={
														selectedImage
															? URL.createObjectURL(selectedImage)
															: formData.imageUrl
													}
													alt="Preview"
													className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
												/>

												<div className="flex-1 min-w-0">
													<p className="text-sm font-bold text-gray-800 truncate">
														{selectedImage?.name || "Current image"}
													</p>
													<p className="text-xs text-gray-500 mt-1">
														Click upload again to replace
													</p>
												</div>

												<button
													type="button"
													onClick={() => {
														setSelectedImage(null);
														setFormData({ ...formData, imageUrl: "" });
													}}
													className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
												>
													<X size={18} />
												</button>
											</motion.div>
										)}
									</div>

									{/* Active Status */}
									<label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all">
										<input
											type="checkbox"
											name="isActive"
											checked={formData.isActive}
											onChange={handleInputChange}
											className="w-5 h-5 rounded cursor-pointer accent-blue-600"
										/>
										<div>
											<span className="text-sm font-bold text-gray-900">
												Active Product
											</span>
											<p className="text-xs text-gray-500">
												Product will be visible to customers
											</p>
										</div>
									</label>

									{/* Action Buttons */}
									<div className="flex gap-3 pt-2">
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											type="submit"
											className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30"
										>
											{editingProduct ? "Update Product" : "Add Product"}
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											type="button"
											onClick={resetForm}
											className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all"
										>
											Cancel
										</motion.button>
									</div>
								</form>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedProduct && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4"
						onClick={() => setSelectedProduct(null)}
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
							className="bg-white w-full max-w-6xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden relative max-h-[95vh] flex flex-col"
						>
							{/* Close Button - More accessible on mobile */}
							<button
								onClick={() => setSelectedProduct(null)}
								className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center group hover:scale-110 transition-all"
							>
								<X className="w-5 h-5 text-gray-600" />
							</button>

							{/* Main Scrollable Content Area */}
							<div className="overflow-y-auto lg:overflow-visible">
								<div className="grid grid-cols-1 lg:grid-cols-5">
									{/* Left Side - Image Section */}
									<div className="lg:col-span-2 bg-gradient-to-br from-slate-100 to-slate-50 p-6 lg:p-8 flex flex-col justify-center items-center relative overflow-hidden min-h-[300px] lg:min-h-[600px]">
										<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
										<div className="relative z-10 w-full max-w-[280px] sm:max-w-md">
											<img
												src={selectedProduct.imageUrl}
												alt={selectedProduct.name}
												className="w-full rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500"
											/>

											{/* Floating Badge */}
											<div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl transform rotate-3">
												<p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
													Best Seller
												</p>
											</div>
										</div>
									</div>

									{/* Right Side - Content Section */}
									<div className="lg:col-span-3 p-5 sm:p-8 flex flex-col">
										{/* Header */}
										<div className="mb-6">
											<div className="flex flex-wrap items-center gap-2 mb-3">
												<span className="px-3 py-1 text-[10px] sm:text-xs font-bold rounded-full bg-blue-600 text-white shadow-md">
													{selectedProduct.category}
												</span>
												<span
													className={`px-3 py-1 text-[10px] sm:text-xs font-bold rounded-full shadow-md ${
														selectedProduct.stock < 20
															? "bg-red-500 text-white"
															: "bg-emerald-500 text-white"
													}`}
												>
													{selectedProduct.stock} in stock
												</span>
											</div>
											<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
												{selectedProduct.name}
											</h2>
											<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
												{selectedProduct.description}
											</p>
										</div>

										{/* Key Features */}
										<div className="mb-6">
											<h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
												<Package className="w-4 h-4 text-blue-600" />
												Key Features
											</h4>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
												{selectedProduct.keyFeatures.map((feature, i) => (
													<div
														key={i}
														className="flex items-start gap-2 text-sm text-gray-700"
													>
														<Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
														<span>{feature}</span>
													</div>
												))}
											</div>
										</div>

										{/* Usage Instructions */}
										<div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
											<h4 className="text-sm font-bold text-gray-900 mb-2">
												Usage Instructions
											</h4>
											<p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
												{selectedProduct.usageInstruction}
											</p>
										</div>

										{/* Pricing Grid */}
										<div className="mt-auto pt-4 border-t border-gray-100">
											<h4 className="text-sm font-bold text-gray-900 mb-3">
												Pricing Tiers
											</h4>
											<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
												{/* Price Cards - Responsive layout handles the wrap */}
												{[
													{
														label: "Market",
														price: selectedProduct.marketPrice,
														disc: selectedProduct.marketDiscount,
														icon: TrendingDown,
														color: "blue",
													},
													{
														label: "Retailer",
														price: selectedProduct.retailerPrice,
														disc: selectedProduct.retailerDiscount,
														icon: Store,
														color: "emerald",
													},
													{
														label: "Dealer",
														price: selectedProduct.dealerPrice,
														disc: selectedProduct.dealerDiscount,
														icon: Users,
														color: "orange",
													},
												].map((tier, idx) => (
													<div
														key={idx}
														className={`relative overflow-hidden rounded-xl border-2 border-${tier.color}-200 bg-gradient-to-br from-${tier.color}-50 to-white p-3 sm:p-4`}
													>
														<div className="relative z-10">
															<div className="flex items-center gap-2 mb-1">
																<tier.icon
																	className={`w-3 h-3 sm:w-4 sm:h-4 text-${tier.color}-600`}
																/>
																<p className="text-[10px] sm:text-xs font-bold text-gray-600">
																	{tier.label} Price
																</p>
															</div>
															{tier.disc > 0 && (
																<span className="inline-block mb-1 text-[10px] px-1.5 py-0.5 bg-red-500 text-white font-bold rounded">
																	{tier.disc}% OFF
																</span>
															)}
															<p className="text-[10px] text-gray-400 line-through">
																₹{tier.price}
															</p>
															<p
																className={`text-lg sm:text-xl font-black text-${tier.color}-600`}
															>
																₹{getDiscountedPrice(tier.price, tier.disc)}
															</p>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ProductManager;
