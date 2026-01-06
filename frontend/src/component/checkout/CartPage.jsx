import { useState } from "react";
import {
	Trash2,
	Plus,
	Minus,
	ArrowRight,
	ShoppingBag,
	Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
	updateCartQty,
	removeFromCart,
	clearCart,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import checkoutLoader from "../../../public/lottie/Loading_car.json";
import orderSuccess from "../../../public/lottie/Completed _Successfully.json";

export const createOrderApi = (data, token) => {
	return axios.post(`${import.meta.env.VITE_BASE_URL}/order/create`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export default function ShoppingCartComponent() {
	const [checkoutStatus, setCheckoutStatus] = useState("idle");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const seller = useSelector((state) => state.auth.seller);
	const token = useSelector((state) => state.auth.token);
	const cartItems = useSelector((state) => state.cart.items);

	const calculateItemTotal = (item) => {
		return item.packSize * item.price * item.qty;
	};

	const calculateDiscountedTotal = (item) => {
		const total = calculateItemTotal(item);
		const discountAmount = (total * item.discount) / 100;
		return total - discountAmount;
	};

	const subtotal = cartItems.reduce((sum, item) => {
		return sum + calculateItemTotal(item);
	}, 0);

	const totalDiscount = cartItems.reduce((sum, item) => {
		const total = calculateItemTotal(item);
		return sum + (total * item.discount) / 100;
	}, 0);

	const finalTotal = subtotal - totalDiscount;

	const handleQuantityChange = (productId, qty) => {
		if (qty <= 0) return;
		dispatch(updateCartQty({ productId, qty }));
	};

	const handleRemoveItem = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const handleCheckout = async () => {
		try {
			if (!seller?._id || !token) {
				toast.error("Please login to continue");
        localStorage.setItem("current", "/cart");
				navigate("/login"); 
				return;
			}

			if (cartItems.length === 0) {
				toast.error("Cart is empty");
				return;
			}

			setCheckoutStatus("loading");

			const payload = {
				sellerId: seller._id,
				items: cartItems.map((item) => ({
					productId: item.productId,
					qty: item.qty,
					price: item.price,
					packSize: item.packSize,
					discount: item.discount || 0,
				})),
				offerId: null, // or selectedOfferId
			};

			await createOrderApi(payload, token);

			// toast.success("Order placed successfully 🎉");
			setCheckoutStatus("success");
			dispatch(clearCart());
			// localStorage.setItem("sellerCurrentPage", "orders");
			// navigate("/dashboard"); // or success page
			setTimeout(() => {
				localStorage.setItem("sellerCurrentPage", "orders");
				navigate("/dashboard");
			}, 6000);
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "Order failed");
		}
	};

	if (checkoutStatus === "loading") {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
				<Lottie animationData={checkoutLoader} loop className="w-72 h-72" />
				<p className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
					Placing your order...
				</p>
			</div>
		);
	}

	if (checkoutStatus === "success") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-200 dark:border-slate-700"
				>
					<Lottie
						animationData={orderSuccess}
						loop={true}
						className="w-64 h-64 mx-auto"
					/>

					<h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
						Order Placed Successfully 🎉
					</h2>

					<p className="text-slate-600 dark:text-slate-400 mt-2">
						Redirecting to your orders in 3 seconds...
					</p>

					<button
						onClick={() => {
							localStorage.setItem("sellerCurrentPage", "orders");
							navigate("/dashboard");
						}}
						className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
					>
						View Order
					</button>
				</motion.div>
			</div>
		);
	}

	if (cartItems.length === 0) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center max-w-md"
				>
					<div className="mb-6 flex justify-center">
						<div className="relative w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
							<ShoppingBag className="w-12 h-12 text-slate-400 dark:text-slate-600" />
						</div>
					</div>
					<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
						Your cart is empty
					</h2>
					<p className="text-slate-600 dark:text-slate-400 mb-8 text-base leading-relaxed">
						Start shopping to discover amazing products and add them to your
						cart
					</p>
					<button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
						Continue Shopping
					</button>
				</motion.div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 py-8 sm:py-12 lg:py-16 px-3 sm:px-4">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8 sm:mb-12"
				>
					<div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
						<div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center flex-shrink-0">
							<ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-slate-900" />
						</div>
						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
							Shopping Cart
						</h1>
					</div>
					<p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 px-0 sm:px-1">
						You have{" "}
						<span className="font-semibold text-slate-900 dark:text-white">
							{cartItems.length}
						</span>{" "}
						{cartItems.length === 1 ? "item" : "items"} ready for checkout
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
					{/* Cart Items Section */}
					<div className="lg:col-span-2 space-y-3 sm:space-y-4">
						{cartItems.map((item, index) => (
							<motion.div
								key={item.productId}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.05 }}
								className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 group"
							>
								<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-3 sm:p-6">
									<div className="flex-shrink-0">
										<div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden group-hover:shadow-md transition-all duration-300 mx-auto sm:mx-0">
											<img
												src={item.imageUrl || "/placeholder.svg"}
												alt={item.name}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
											{item.discount > 0 && (
												<motion.div
													initial={{ scale: 0.8 }}
													animate={{ scale: 1 }}
													className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs font-bold shadow-lg"
												>
													-{item.discount}%
												</motion.div>
											)}
										</div>
									</div>

									{/* Product Details */}
									<div className="flex-1 flex flex-col justify-between">
										<div>
											<h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3 tracking-tight line-clamp-2">
												{item.name}
											</h3>
											<div className="space-y-1 sm:space-y-2">
												<div className="flex items-center gap-2 text-xs sm:text-sm">
													<span className="text-slate-600 dark:text-slate-400">
														Pack Size:
													</span>
													<span className="font-semibold text-slate-900 dark:text-white">
														{item.packSize} units/bag
													</span>
												</div>
												<div className="flex items-center gap-2 text-xs sm:text-sm">
													<span className="text-slate-600 dark:text-slate-400">
														Price:
													</span>
													<span className="font-semibold text-slate-900 dark:text-white">
														₹{item.price.toFixed(2)}/unit
													</span>
												</div>
											</div>
										</div>

										<div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-5">
											<div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg">
												<button
													onClick={() =>
														handleQuantityChange(item.productId, item.qty - 1)
													}
													className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
													aria-label="Decrease quantity"
												>
													<Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-400" />
												</button>
												<span className="w-6 sm:w-8 text-center font-semibold text-slate-900 dark:text-white text-sm">
													{item.qty}
												</span>
												<button
													onClick={() =>
														handleQuantityChange(item.productId, item.qty + 1)
													}
													className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
													aria-label="Increase quantity"
												>
													<Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-400" />
												</button>
											</div>
											<button
												onClick={() => handleRemoveItem(item.productId)}
												className="p-1.5 sm:p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 ml-auto sm:ml-0"
												aria-label="Remove item"
											>
												<Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
											</button>
										</div>
									</div>

									<div className="flex-shrink-0 text-right flex flex-col justify-between min-w-fit sm:min-w-32">
										<div>
											<p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 sm:mb-2 uppercase tracking-wider">
												Subtotal
											</p>
											<div className="space-y-1 sm:space-y-2">
												<div>
													<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
														₹{calculateDiscountedTotal(item).toFixed(2)}
													</p>
												</div>
												{item.discount > 0 && (
													<p className="text-xs sm:text-sm line-through text-slate-400 dark:text-slate-500">
														₹{calculateItemTotal(item).toFixed(2)}
													</p>
												)}
											</div>
										</div>
										{item.discount > 0 && (
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 sm:mt-3 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg whitespace-nowrap"
											>
												Save ₹
												{(
													(calculateItemTotal(item) * item.discount) /
													100
												).toFixed(2)}
											</motion.div>
										)}
									</div>
								</div>

								<div className="border-t border-slate-200 dark:border-slate-700 px-3 sm:px-6 py-3 sm:py-4 bg-slate-50 dark:bg-slate-700/50">
									<div className="flex items-start gap-2">
										<Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
										<p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
											<span className="font-semibold">{item.packSize}</span>{" "}
											units ×{" "}
											<span className="font-semibold">₹{item.price}</span> ×{" "}
											<span className="font-semibold">
												{item.qty} {item.qty === 1 ? "bag" : "bags"}
											</span>
											{item.discount > 0
												? ` = ₹${calculateItemTotal(item).toFixed(
														2
												  )} → ₹${calculateDiscountedTotal(item).toFixed(2)}`
												: ` = ₹${calculateItemTotal(item).toFixed(2)}`}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className="lg:col-span-1"
					>
						<div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden lg:sticky lg:top-8">
							{/* Summary Header */}
							<div className="bg-slate-50 dark:bg-slate-700/50 px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-slate-700">
								<h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
									Order Summary
								</h2>
							</div>

							{/* Summary Content */}
							<div className="px-4 sm:px-6 py-5 sm:py-6 space-y-4 sm:space-y-5">
								{/* Items Count */}
								<div className="pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-700">
									<div className="flex justify-between items-center text-sm">
										<span className="text-slate-600 dark:text-slate-400">
											Items
										</span>
										<span className="font-semibold text-slate-900 dark:text-white">
											{cartItems.length}
										</span>
									</div>
								</div>

								{/* Subtotal */}
								<div className="flex justify-between items-center text-sm">
									<span className="text-slate-600 dark:text-slate-400">
										Subtotal
									</span>
									<span className="font-semibold text-slate-900 dark:text-white">
										₹{subtotal.toFixed(2)}
									</span>
								</div>

								{/* Discount */}
								{totalDiscount > 0 && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 border-t border-b border-emerald-200 dark:border-emerald-900/40 text-sm"
									>
										<span className="font-semibold">Discount</span>
										<span className="font-bold">
											-₹{totalDiscount.toFixed(2)}
										</span>
									</motion.div>
								)}

								{/* Divider */}
								<div className="border-t border-slate-200 dark:border-slate-700 pt-4 sm:pt-5">
									{/* Final Total */}
									<div className="flex justify-between items-center mb-5 sm:mb-6">
										<span className="text-slate-900 dark:text-white font-semibold">
											Order Total
										</span>
										<span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
											₹{finalTotal.toFixed(2)}
										</span>
									</div>

									{/* Tax Info */}
									<p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-4 sm:mb-5 leading-relaxed">
										Taxes & shipping calculated at checkout
									</p>
								</div>

								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={handleCheckout}
									className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
								>
									<span>Proceed to Checkout</span>
									<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
								</motion.button>

								<button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
									Continue Shopping
								</button>
							</div>

							{/* Trust Badges */}
							<div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
								<div className="space-y-1.5 sm:space-y-2">
									<div className="flex items-center justify-center gap-1 text-xs text-slate-600 dark:text-slate-400">
										<Check className="w-3 h-3 flex-shrink-0" />
										<span>Secure Checkout</span>
									</div>
									<p className="text-xs text-slate-500 dark:text-slate-500 text-center">
										Free shipping on orders above ₹500
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
