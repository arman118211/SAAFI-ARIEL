import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
	Package,
	ShoppingCart,
	DollarSign,
	Clock,
	CheckCircle2,
	ChevronDown,
	ChevronUp,
	Calendar,
	Award,
	Truck,
} from "lucide-react";
import toast from "react-hot-toast";

const OrderStatShimmer = () => (
	<div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-300 relative overflow-hidden">
		<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
		<div className="flex items-center justify-between">
			<div>
				<div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
				<div className="h-8 w-20 bg-gray-300 rounded"></div>
			</div>
			<div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
		</div>
	</div>
);

const OrderCardShimmer = () => (
	<div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
		<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />

		<div className="p-6 border-b border-gray-200">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex items-start gap-4">
					<div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
					<div className="space-y-2">
						<div className="h-5 w-40 bg-gray-300 rounded"></div>
						<div className="h-4 w-56 bg-gray-200 rounded"></div>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div className="text-right space-y-2">
						<div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div>
						<div className="h-6 w-32 bg-gray-300 rounded ml-auto"></div>
					</div>
					<div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
				</div>
			</div>
		</div>
	</div>
);

function Order() {
	const { seller, token } = useSelector((state) => state.auth);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [expandedOrder, setExpandedOrder] = useState(null);

	const getItemTotal = (item) => {
		const packSize = item.productId?.packSize || 1;
		return item.qty * packSize * item.price;
	};

	const getOrderTotal = (order) => {
		return order.items.reduce((sum, item) => sum + getItemTotal(item), 0);
	};

	const applyPercentageDiscount = (total, percentage) => {
		if (!percentage || percentage <= 0) return total;
		return total - (total * percentage) / 100;
	};

	const getTotalPieces = (order) => {
		return order.items.reduce(
			(sum, item) => sum + item.qty * (item.productId?.packSize || 1),
			0
		);
	};

	const getorder = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/order/seller/${seller._id}`
			);
			// console.log("response", response.data);
			setOrders(response.data);
			setLoading(false);
		} catch (err) {
			// console.log("something went wrong", err)
			toast.error("server error please try after some time.");
			setLoading(false);
		}
	};


	useEffect(() => {
		getorder();
	}, []);

	// Calculate statistics
	const stats = {
		totalOrders: orders.length,
		totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
		pendingOrders: orders.filter((order) => order.status === "pending").length,
		completedOrders: orders.filter((order) => order.status === "completed")
			.length,
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "completed":
				return "bg-green-100 text-green-800 border-green-200";
			case "cancelled":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const toggleOrderExpansion = (orderId) => {
		setExpandedOrder(expandedOrder === orderId ? null : orderId);
	};

	return (
		<div className="min-h-screen ">
			<div className=" mx-auto">
				{/* Statistics Cards */}
				<div className="hidden md:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{loading ? (
						Array.from({ length: 4 }).map((_, i) => (
							<OrderStatShimmer key={i} />
						))
					) : (
						<>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600"
							>
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600 mb-1">
											Total Orders
										</p>
										<p className="md:text-3xl text-xl font-bold text-gray-900">
											{stats.totalOrders}
										</p>
									</div>
									<div className="md:w-12 md:h-12 w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
										<ShoppingCart className="w-6 h-6 text-blue-600" />
									</div>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-600"
							>
								<div className="flex items-center justify-between gap-3">
									<div>
										<p className="text-sm font-medium text-gray-600 mb-1">
											Total Revenue
										</p>
										<p className="md:text-3xl text-xl font-bold text-gray-900">
											₹{stats.totalRevenue.toLocaleString()}
										</p>
									</div>
									<div className="md:w-12 md:h-12 w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center ">
										<DollarSign className="w-6 h-6 text-red-600" />
									</div>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500"
							>
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600 mb-1">
											Pending
										</p>
										<p className="md:text-3xl text-xl font-bold text-gray-900">
											{stats.pendingOrders}
										</p>
									</div>
									<div className="md:w-12 md:h-12 w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
										<Clock className="w-6 h-6 text-yellow-500" />
									</div>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600"
							>
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600 mb-1">
											Completed
										</p>
										<p className="md:text-3xl text-xl font-bold text-gray-900">
											{stats.completedOrders}
										</p>
									</div>
									<div className="md:w-12 md:h-12 w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
										<CheckCircle2 className="w-6 h-6 text-green-600" />
									</div>
								</div>
							</motion.div>
						</>
					)}
				</div>

				{/* Orders List */}
				<div className="space-y-6">
					{loading ? (
						Array.from({ length: 3 }).map((_, i) => (
							<OrderCardShimmer key={i} />
						))
					) : orders.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
							className="bg-white rounded-2xl shadow-lg p-16 text-center flex flex-col items-center"
						>
							{/* Icon */}
							<div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
								<Package className="w-12 h-12 text-blue-600" />
							</div>

							{/* Title */}
							<h3 className="text-2xl font-bold text-gray-900 mb-3">
								No Orders Yet
							</h3>

							{/* Description */}
							<p className="text-gray-600 max-w-md mb-6">
								You haven’t received any orders yet. Once customers start
								purchasing, all your orders will appear here.
							</p>

							{/* Optional Hint */}
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<Clock className="w-4 h-4" />
								<span>Stay active to receive new orders</span>
							</div>
						</motion.div>
					) : (
						orders.map((order, index) => (
							<motion.div
								key={order._id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow "
							>
								{/* Order Header */}
								<div
									className="p-6 border-b border-gray-200"
									onClick={() => toggleOrderExpansion(order._id)}
								>
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
										<div className="flex items-start gap-4">
											<div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
												<Package className="w-6 h-6 text-white" />
											</div>
											<div>
												<div className="flex items-center gap-3 mb-2">
													<h3 className="text-md md:text-lg font-bold text-gray-900">
														Order #{order._id.slice(-8).toUpperCase()}
													</h3>
													<span
														className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
															order.status
														)}`}
													>
														{order.status.toUpperCase()}
													</span>
												</div>
												<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
													<div className="flex items-center gap-1">
														<Calendar className="w-4 h-4" />
														<span>
															{new Date(order.createdAt).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "short",
																	day: "numeric",
																}
															)}
														</span>
													</div>
													<div className="flex items-center gap-1">
														<Package className="w-4 h-4" />
														<span>{order.totalQty} bag(s)</span>
													</div>
												</div>
											</div>
										</div>
										<div className="flex items-center gap-4  justify-end sm:justify-start">
											<div className="text-right whitespace-nowrap">
												<p className="text-xs sm:text-sm text-gray-600 mb-1">
													Total Amount
												</p>
												<p className="text-lg sm:text-2xl font-bold text-red-600">
													₹{order.totalAmount}
												</p>
											</div>

											<button
												onClick={() => toggleOrderExpansion(order._id)}
												className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg 
		flex items-center justify-center transition-colors shrink-0"
											>
												{expandedOrder === order._id ? (
													<ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
												) : (
													<ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
												)}
											</button>
										</div>
									</div>
								</div>

								{/* Expandable Order Details */}
								<AnimatePresence>
									{expandedOrder === order._id && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3 }}
											className="overflow-hidden"
										>
											<div className="p-6 bg-gray-50">
												{/* Offer Details */}
												{order.offerId && (
													<div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border border-blue-200">
														<div className="flex items-start gap-3">
															<Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
															<div>
																<h4 className="font-semibold text-gray-900 mb-1">
																	{order.offerId.title}
																</h4>
																<p className="text-sm text-gray-600">
																	{order.offerId.description}
																</p>
															</div>
														</div>
													</div>
												)}

												{/* Products Grid */}
												<h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
													<Truck className="w-5 h-5 text-blue-600" />
													Order Items
												</h4>
												<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
													{order.items.map((item) => (
														<motion.div
															key={item._id}
															initial={{ opacity: 0, y: 10 }}
															animate={{ opacity: 1, y: 0 }}
															className="relative bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
														>
															{/* Discount Badge - Positioned better for mobile */}
															{item.discount > 0 && (
																<span className="absolute -top-2 -right-2 z-10 bg-red-600 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg shadow-sm">
																	{item.discount}% OFF
																</span>
															)}

															<div className="flex flex-row gap-3 sm:gap-4">
																{/* Product Image - Scaled for mobile */}
																<div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
																	<img
																		src={item.productId.imageUrl}
																		alt={item.productId?.name}
																		className="w-full h-full object-contain p-1"
																	/>
																</div>

																{/* Content Area */}
																<div className="flex-1 min-w-0 flex flex-col justify-between">
																	<div>
																		<h5 className="font-bold text-gray-900 text-sm sm:text-base truncate pr-6">
																			{item.productId?.name}
																		</h5>
																		<p className="text-xs text-gray-500 line-clamp-1 mb-2">
																			{item.productId?.description}
																		</p>

																		{/* Quantity and Sizing Row */}
																		<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-gray-600">
																			<span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
																				{item.qty} bag(s)
																			</span>
																			<span className="text-gray-300">|</span>
																			<span>
																				{item.productId.packSize} pcs/bag
																			</span>
																			<span className="text-gray-300">|</span>
																			<span>₹{item.price}/pc</span>
																		</div>
																	</div>

																	{/* Pricing Section */}
																	<div className="mt-3 pt-2 border-t border-dashed border-gray-100 flex items-end justify-between">
																		<div className="flex flex-col">
																			{item.discount > 0 ? (
																				<>
																					<span className="text-[10px] text-gray-400 line-through leading-none">
																						₹
																						{getItemTotal(
																							item
																						).toLocaleString()}
																					</span>
																					<div className="flex items-center gap-1.5">
																						<span className="text-base sm:text-lg font-bold text-gray-900">
																							₹
																							{applyPercentageDiscount(
																								getItemTotal(item),
																								item.discount
																							).toLocaleString()}
																						</span>
																						<span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">
																							SAVED {item.discount}%
																						</span>
																					</div>
																				</>
																			) : (
																				<span className="text-base sm:text-lg font-bold text-gray-900">
																					₹{getItemTotal(item).toLocaleString()}
																				</span>
																			)}
																		</div>
																	</div>
																</div>
															</div>
														</motion.div>
													))}
												</div>

												{/* Order Summary */}
												<div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
													<div className="flex items-center justify-between mb-3">
														<span className="text-gray-600">
															Total Quantity
														</span>
														<span className="font-semibold text-gray-900">
															<span>{getTotalPieces(order)} pcs</span>
														</span>
													</div>
													<div className="flex items-center justify-between pt-3 border-t border-gray-200">
														<span className="text-lg font-semibold text-gray-900">
															Total Amount
														</span>
														<span className="text-2xl font-bold text-red-600">
															₹{order.totalAmount.toLocaleString()}
														</span>
													</div>
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default Order;
