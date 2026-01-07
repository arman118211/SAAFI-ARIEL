"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectSellers } from "../../redux/slices/sellerSlice";
import {
	ArrowLeft,
	Package,
	ShoppingCart,
	User,
	Mail,
	Phone,
	Clock,
	DollarSign,
	Filter,
	ChevronDown,
	ImageIcon,
	MapPinHouse,
	Building2,
} from "lucide-react";
import ScrollToTop from "../ScrollToTop";

export default function SellerDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const sellersData = useSelector(selectSellers);
	const seller = sellersData.find((s) => s._id === id);
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [expandedOrder, setExpandedOrder] = useState(null);

	if (!seller) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="text-center"
				>
					<p className="text-2xl text-red-600 font-bold mb-4">
						Seller Not Found
					</p>
					<button
						onClick={() => navigate(-1)}
						className="px-6 py-2 bg-blue-600 hover:bg-red-600 text-white rounded-lg transition-colors"
					>
						Back to Sellers
					</button>
				</motion.div>
			</div>
		);
	}

	const filteredOrders =
		selectedStatus === "all"
			? seller.orders
			: seller.orders.filter((order) => order.status === selectedStatus);

	const stats = {
		totalOrders: seller.orders.length,
		totalRevenue: seller.orders.reduce(
			(sum, order) => sum + order.totalAmount,
			0
		),
		totalItems: seller.orders.reduce((sum, order) => sum + order.totalQty, 0),
		pendingOrders: seller.orders.filter((o) => o.status === "pending").length,
	};

	const pageVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	function getDiscountedValue(originalValue, discountPercent) {
		return originalValue - (originalValue * discountPercent) / 100;
	}

	const getStatusColor = (status) => {
		switch (status) {
			case "pending":
				return "bg-amber-100 text-amber-800 border-amber-300";
			case "completed":
				return "bg-emerald-100 text-emerald-800 border-emerald-300";
			case "cancelled":
				return "bg-red-100 text-red-800 border-red-300";
			default:
				return "bg-gray-100 text-gray-800 border-gray-300";
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 md:px-30 px-6">
			<ScrollToTop />
			{/* Header with Back Button */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8"
			>
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-2 text-blue-600 hover:text-red-600 mb-6 transition-colors font-semibold"
				>
					<ArrowLeft className="w-5 h-5" />
					<span>Back to Sellers</span>
				</button>

				{/* Seller Info Card */}
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
						{/* Left Side */}
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
								<User className="w-6 h-6 text-white" />
							</div>

							<div className="space-y-1">
								<div className="flex items-center gap-3">
									{/* Seller Name */}
									<h1 className="text-3xl font-bold leading-tight">
										{seller.name}
									</h1>

									{/* Role Badge */}
									<span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold capitalize text-white">
										{seller.role}
									</span>
								</div>

								{/* Company Name */}
								<div className="flex items-center gap-2">
									<Building2 className="w-4 h-4 text-red-300" />
									<span className="text-sm font-semibold text-red-100 tracking-wide">
										{seller.companyName || "Company Not Provided"}
									</span>
								</div>
							</div>
						</div>

						{/* Right Side - Contact Info */}
						<div className="space-y-2">
							<div className="flex items-center gap-3">
								<Mail className="w-5 h-5 text-red-300" />
								<span>{seller.email || "NOT PROVIDED"}</span>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="w-5 h-5 text-red-300" />
								<span>{seller.phone}</span>
							</div>
							<div className="flex items-center gap-3">
								<MapPinHouse className="w-5 h-5 text-red-300" />
								<span>{seller.address}</span>
							</div>
							<div className="flex items-center gap-3">
								<Clock className="w-5 h-5 text-red-300" />
								<span>
									Joined {new Date(seller.createdAt).toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Stats Grid */}
			<motion.div
				variants={pageVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
			>
				<motion.div
					variants={itemVariants}
					className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-md"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-blue-100 text-sm">Total Orders</p>
							<p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
						</div>
						<ShoppingCart className="w-10 h-10 opacity-30" />
					</div>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 text-white shadow-md"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-red-100 text-sm">Pending Orders</p>
							<p className="text-3xl font-bold mt-2">{stats.pendingOrders}</p>
						</div>
						<Clock className="w-10 h-10 opacity-30" />
					</div>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg p-6 text-white shadow-md"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-emerald-100 text-sm">Total Items</p>
							<p className="text-3xl font-bold mt-2">{stats.totalItems}</p>
						</div>
						<Package className="w-10 h-10 opacity-30" />
					</div>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg p-6 text-white shadow-md"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-amber-100 text-sm">Total Revenue</p>
							<p className="text-3xl font-bold mt-2">
								₹{(stats.totalRevenue / 100000).toFixed(1)}L
							</p>
						</div>
						<DollarSign className="w-10 h-10 opacity-30" />
					</div>
				</motion.div>
			</motion.div>

			{/* Orders Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				{/* Filter */}
				{/* Filter Section */}
				<div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
							<Filter className="w-4 h-4 text-blue-600" />
						</div>
						<h2 className="text-sm font-bold text-slate-800 tracking-tight">
							Order History
						</h2>
					</div>

					{/* MOBILE VIEW: Clean Native Dropdown */}
					<div className="relative sm:hidden">
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
						>
							<option value="all">All Orders</option>
							<option value="pending">Pending</option>
							<option value="completed">Completed</option>
							<option value="cancelled">Cancelled</option>
						</select>
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
							<ChevronDown className="w-4 h-4" />
						</div>
					</div>

					{/* DESKTOP VIEW: Minimalist Text Links */}
					<div className="hidden sm:flex items-center gap-6">
						{["all", "pending", "completed", "cancelled"].map((status) => (
							<button
								key={status}
								onClick={() => setSelectedStatus(status)}
								className={`text-sm font-medium transition-all relative py-1 ${
									selectedStatus === status
										? "text-blue-600"
										: "text-gray-500 hover:text-gray-800"
								}`}
							>
								<span className="capitalize">{status}</span>
								{selectedStatus === status && (
									<motion.div
										layoutId="underline"
										className="absolute -bottom-4 left-0 right-0 h-0.5 bg-blue-600"
									/>
								)}
							</button>
						))}
					</div>
				</div>

				{/* Orders List */}
				<div className="space-y-4">
					{filteredOrders.map((order, index) => (
						<motion.div
							key={order._id}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.05 }}
						>
							<div
								onClick={() =>
									setExpandedOrder(
										expandedOrder === order._id ? null : order._id
									)
								}
								className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500 hover:shadow-md transition-all shadow-sm"
							>
								{/* --- Header Section (Always Visible) --- */}
								<div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-3">
									<div className="space-y-1">
										<div className="flex items-center gap-2">
											<span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
												Order Ref
											</span>
											<h3 className="text-sm sm:text-base font-bold text-gray-900 font-mono">
												#{order._id.toUpperCase()}
											</h3>
										</div>
										<div className="flex flex-wrap items-center gap-2">
											<span
												className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getStatusColor(
													order.status
												)}`}
											>
												{order.status}
											</span>
											<span className="text-gray-400 text-xs">•</span>
											<p className="text-gray-600 text-xs">
												{new Date(order.createdAt).toLocaleDateString("en-IN", {
													day: "2-digit",
													month: "long",
													year: "numeric",
												})}
											</p>
										</div>
									</div>

									<div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
										<div className="text-left sm:text-right">
											<span className="text-[10px] text-gray-400 uppercase font-bold block">
												Grand Total
											</span>
											<p className="text-xl font-black text-emerald-600">
												₹{order.totalAmount.toLocaleString()}
											</p>
											<p className="text-[10px] text-gray-500 font-medium">
												{order.totalQty} Total Items
											</p>
										</div>
										<ChevronDown
											className={`w-5 h-5 text-gray-400 transition-transform ${
												expandedOrder === order._id
													? "rotate-180 text-blue-600"
													: ""
											}`}
										/>
									</div>
								</div>

								{/* --- Detailed Content Section --- */}
								<AnimatePresence>
									{expandedOrder === order._id && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											className="bg-gray-50/50 border-t border-gray-200"
										>
											<div className="p-3 sm:p-6 space-y-4">
												{order.items.map((item) => (
													<div
														key={item._id}
														className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
													>
														<div className="flex flex-col sm:flex-row">
															{/* Product Visual & Name */}
															<div className="p-4 flex items-center gap-4 bg-white sm:w-2/3">
																<div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg border border-gray-100 p-1 flex-shrink-0">
																	<img
																		src={
																			item.product?.imageUrl ||
																			"/placeholder.svg"
																		}
																		alt={item.product?.name}
																		className="w-full h-full object-contain"
																	/>
																</div>
																<div className="min-w-0">
																	<h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight mb-1">
																		{item.product?.name ||
																			`ID: ${item.productId}`}
																		{item.discount > 0 && (
																			<span className="ml-2 bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
																				{item.discount}% OFF
																			</span>
																		)}
																	</h4>

																	<p className="text-[11px] text-gray-500 font-medium">
																		Pack Size: {item.product?.packSize} Pcs |
																		Unit: {item.product?.quantity}
																	</p>
																</div>
															</div>

															{/* Breakout Information Table */}
															<div className="grid grid-cols-2 sm:grid-cols-1 border-t sm:border-t-0 sm:border-l border-gray-100 bg-gray-50/30 sm:w-1/3">
																<div className="p-3 border-r sm:border-r-0 sm:border-b border-gray-100">
																	<span className="block text-[10px] uppercase text-gray-400 font-bold">
																		Billing Details
																	</span>
																	<p className="text-xs text-gray-700 mt-1">
																		{item.qty} Bags × {item.product?.packSize}{" "}
																		Pcs
																	</p>
																	<p className="text-xs font-bold text-blue-600">
																		Total: {item.qty * item.product?.packSize}{" "}
																		Units
																	</p>
																</div>
																<div className="p-3">
																	<span className="block text-[10px] uppercase text-gray-400 font-bold">
																		Item Price
																	</span>
																	<p className="text-xs text-gray-700 mt-1">
																		₹{item.price.toLocaleString()} / Pcs
																	</p>
																	{/* Price Summary */}
																	<div className="mt-3 text-right space-y-1">
																		{/* Subtotal */}
																		<div className="flex justify-between text-xs text-gray-500">
																			<span>Subtotal</span>
																			<span>
																				₹
																				{(
																					item.qty *
																					item.product?.packSize *
																					item.price
																				).toLocaleString()}
																			</span>
																		</div>

																		{/* Discount */}
																		{item.discount > 0 && (
																			<div className="flex justify-between text-xs text-gray-600">
																				<span>Discount ({item.discount}%)</span>
																				<span className="text-red-600">
																					− ₹
																					{(
																						(item.qty *
																							item.product?.packSize *
																							item.price *
																							item.discount) /
																						100
																					).toLocaleString()}
																				</span>
																			</div>
																		)}

																		{/* Divider */}
																		<div className="border-t border-gray-200 my-1"></div>

																		{/* Final Amount */}
																		<div className="flex justify-between items-center">
																			<span className="text-xs font-semibold text-gray-700 uppercase">
																				Net Amount
																			</span>
																			<span className="text-base font-bold text-gray-900">
																				₹
																				{(item.discount > 0
																					? getDiscountedValue(
																							item.qty *
																								item.product?.packSize *
																								item.price,
																							item.discount
																					  )
																					: item.qty *
																					  item.product?.packSize *
																					  item.price
																				).toLocaleString()}
																			</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												))}

												{/* --- Final Invoice Summary --- */}
												<div className="bg-white rounded-xl border-2 border-blue-50 p-5 space-y-3">
													<div className="flex justify-between items-center text-xs">
														<span className="text-gray-500 font-bold uppercase tracking-tighter">
															Offer Identification
														</span>
														<span className="font-mono text-blue-600 font-bold">
															{order.offerId}
														</span>
													</div>

													<div className="h-px bg-gray-100 w-full"></div>

													<div className="flex justify-between items-end">
														<div className="space-y-1">
															<span className="block text-[10px] text-gray-400 uppercase font-black">
																Final Statement
															</span>
															<p className="text-xs text-gray-600">
																Includes all applicable taxes & discounts
															</p>
														</div>
														<div className="text-right">
															<span className="text-[10px] text-gray-400 uppercase font-bold">
																Amount Payable
															</span>
															<p className="text-2xl font-black text-emerald-600 leading-none">
																₹{order.totalAmount.toLocaleString()}
															</p>
														</div>
													</div>
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					))}
				</div>

				{/* No Orders */}
				{filteredOrders.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-16"
					>
						<ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4 opacity-50" />
						<p className="text-xl text-gray-500">
							No {selectedStatus !== "all" ? selectedStatus : ""} orders found
						</p>
					</motion.div>
				)}
			</motion.div>
		</div>
	);
}
