"use client";
import { motion } from "framer-motion";
import {
	ShoppingCart,
	Heart,
	Truck,
	Package,
	Plus,
	Minus,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	updateCartQty,
	removeFromCart,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product, onAddToCart }) {
	const { seller, token } = useSelector((state) => state.auth);

	const [isHovered, setIsHovered] = useState(false);
	// const [addedToCart, setAddedToCart] = useState(false)
	// const [quantity, setQuantity] = useState(1)
	const [isFavorite, setIsFavorite] = useState(false);
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.items);
	const cartItem = cartItems.find((item) => item.productId === product._id);

	const addedToCart = !!cartItem;
	const quantity = cartItem?.qty || 1;

	const navigate = useNavigate();

	const pricePerPacket = product.price;
	const totalPackets = product.packSize;
	const originalTotalPrice = pricePerPacket * totalPackets;
	const discountAmount = (originalTotalPrice * product.discount) / 100;
	const finalPrice = originalTotalPrice - discountAmount;

	const handleCardClick = () => {
		navigate(`/productDetails/${product._id}`);
	};

	const handleAddToCart = (e) => {
		e.stopPropagation();

		if (!seller || !token) {
			toast.error("Please login to add items to cart.");
			navigate(`/productDetails/${product._id}`);
			return;
		}

		dispatch(
			addToCart({
				productId: product._id, // 🔑 must be MongoDB _id
				name: product.name,
				qty: 1, // start with 1 bag
				price: product.price, // price per packet
				packSize: product.packSize,
				imageUrl: product.imageUrl,
				discount: product.discount,
			})
		);
	};

	const handleRemove = (e) => {
		e.stopPropagation();
		dispatch(removeFromCart(product._id));
	};

	const handleQtyChange = (newQty, e) => {
		e.stopPropagation();
		if (newQty <= 0) return;

		dispatch(
			updateCartQty({
				productId: product._id,
				qty: newQty,
			})
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleCardClick}
			className="h-full cursor-pointer"
		>
			<div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group border border-gray-100">
				{/* Product Image Container */}
				<div className="relative h-72 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden ">
					<motion.img
						src={product.imageUrl}
						alt={product.name}
						className="w-full h-full object-contain"
						animate={{ scale: isHovered ? 1.08 : 1 }}
						transition={{ duration: 0.4 }}
					/>

					{/* Discount Badge */}
					{product.discount > 0 && (
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
						>
							{product.discount}% OFF
						</motion.div>
					)}

					{/* Favorite Button */}
					<motion.button
						onClick={(e) => {
							e.stopPropagation();
							setIsFavorite(!isFavorite);
						}}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
					>
						<Heart
							size={18}
							className={
								isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
							}
						/>
					</motion.button>

					{/* Overlay on Hover */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: isHovered ? 1 : 0 }}
						className="absolute inset-0 bg-black/5"
					/>
				</div>

				{/* Product Info */}
				<div className="p-4 flex-1 flex flex-col justify-between">
					{/* Category and Title */}
					<div>
						<p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">
							{product.category}
						</p>
						<h3 className="text-sm font-bold text-gray-900 mb-1.5 line-clamp-2 leading-tight">
							{product.name}
						</h3>
						<p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-1">
							{product.description}
						</p>
					</div>

					{/* Quantity and Pack Size Info */}
					<div className="flex items-center gap-2 mb-2 text-xs text-gray-700 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100">
						<Package size={12} className="text-blue-600 flex-shrink-0" />
						<span className="font-semibold">{product.quantity}</span>
						<span className="text-gray-600">×</span>
						<span className="font-semibold">{product.packSize} Pics</span>
						<span className="text-gray-600">×</span>
						<span className="font-semibold">1 Bag</span>
					</div>

					{/* Key Features - Compact */}
					{product.keyFeatures && product.keyFeatures.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-3">
							{product.keyFeatures.slice(0, 2).map((feature, idx) => (
								<span
									key={idx}
									className="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md border border-gray-100"
								>
									{feature}
								</span>
							))}
						</div>
					)}

					{/* Price Section */}
					<div className="mb-3 pb-3 border-b border-gray-200">
						<div className="flex items-baseline gap-2 flex-wrap">
							<span className="text-xl font-bold text-gray-900">
								₹{finalPrice.toFixed(2)}
							</span>
							<span className="text-sm text-gray-700 line-through font-semibold">
								₹{originalTotalPrice.toFixed(2)}
							</span>
						</div>
						<p className="text-gray-500 text-xs mt-1 font-semibold">
							₹{pricePerPacket.toFixed(2)}/packet
						</p>
					</div>

					{/* Stock Status - Simple */}
					<div className="mb-3 text-xs font-semibold">
						<span
							className={
								product.stock > 10 ? "text-green-600" : "text-orange-600"
							}
						>
							{product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
						</span>
					</div>

					{!addedToCart ? (
						<motion.button
							onClick={(e) => {
								e.stopPropagation();
								handleAddToCart(e);
							}}
							disabled={product.stock === 0}
							whileHover={product.stock > 0 ? { scale: 1.03, y: -2 } : {}}
							whileTap={product.stock > 0 ? { scale: 0.97 } : {}}
							className={`w-full py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm uppercase tracking-wide border-2 ${
								product.stock === 0
									? "bg-gray-300 border-gray-300 text-gray-600 cursor-not-allowed"
									: "bg-gradient-to-r from-blue-600 to-blue-700 border-transparent text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
							}`}
						>
							<ShoppingCart size={16} strokeWidth={2.5} />
							<span>Add to Cart</span>
						</motion.button>
					) : (
						<div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 p-2 rounded-lg border-2 border-blue-200">
							<motion.button
								onClick={(e) => {
									e.stopPropagation();
									handleQtyChange(quantity - 1, e);
								}}
								whileTap={{ scale: 0.95 }}
								className="p-1.5 hover:bg-white rounded-md transition-colors"
							>
								<Minus size={14} className="text-blue-600" />
							</motion.button>
							<span className="flex-1 text-center font-bold text-gray-900 text-sm">
								{quantity}
							</span>
							<motion.button
								onClick={(e) => {
									e.stopPropagation();
									handleQtyChange(quantity + 1, e);
								}}
								whileTap={{ scale: 0.95 }}
								className="p-1.5 hover:bg-white rounded-md transition-colors"
							>
								<Plus size={14} className="text-blue-600" />
							</motion.button>
							<div className="w-px h-6 bg-blue-200 mx-1"></div>
							<motion.button
								onClick={(e) => {
									e.stopPropagation();
									handleRemove(e);
								}}
								whileTap={{ scale: 0.95 }}
								className="flex-1 py-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-md flex items-center justify-center gap-1 transition-all duration-300 text-xs border border-red-200"
							>
								<Trash2 size={13} />
								<span>Remove</span>
							</motion.button>
						</div>
					)}

					{/* Shipping Info */}
					<div className="flex items-center gap-2 mt-2 text-xs text-gray-600 font-medium">
						<Truck size={12} className="text-blue-600 flex-shrink-0" />
						<span>Free shipping over ₹500</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
