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
				{/* Image Container: Optimized height for 2-column layout */}
				<div className="relative h-44 lg:h-72 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
					<motion.img
						src={product.imageUrl}
						alt={product.name}
						className="w-full h-full object-contain p-2"
						animate={{ scale: isHovered ? 1.08 : 1 }}
						transition={{ duration: 0.4 }}
					/>

					{/* Badge scaling */}
					{product.discount > 0 && (
						<div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-bold uppercase">
							{product.discount}% OFF
						</div>
					)}

					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsFavorite(!isFavorite);
						}}
						className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-md"
					>
						<Heart
							size={16}
							className={
								isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
							}
						/>
					</button>
				</div>

				{/* Product Info: All details included */}
				<div className="p-3 lg:p-4 flex-1 flex flex-col">
					<p className="text-blue-600 text-[10px] lg:text-xs font-bold uppercase mb-1">
						{product.category}
					</p>
					<h3 className="text-xs lg:text-sm font-bold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
						{product.name} {product.quantity}
					</h3>

					{/* Description - Hidden on very small screens to save space, visible on tablet/desktop */}
					<p className="hidden md:block text-gray-600 text-xs mb-2">
						{product.description?.split(" ").slice(0, 12).join(" ")}
						{product.description?.split(" ").length > 12 && " ..."}
					</p>

					{/* Pack Info - Compact on mobile */}
					<div className="flex items-center gap-1 mb-2 text-[10px] lg:text-xs text-gray-700 bg-blue-50 px-2 py-1.5 rounded-lg border border-blue-100">
						<Package size={12} className="text-blue-600 flex-shrink-0" />
						<span className="font-semibold">{product.packSize} Pcs</span>
						<span className="text-gray-400">|</span>
						<span className="font-semibold">1 Bag</span>
					</div>

					{/* Key Features - Preserved but limited to 1 on mobile to prevent overflow */}
					{/* {product.keyFeatures && product.keyFeatures.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-2">
							{product.keyFeatures.slice(0, 1).map((feature, idx) => (
								<span
									key={idx}
									className="text-[9px] lg:text-xs text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 truncate max-w-full"
								>
									{feature}
								</span>
							))}
						</div>
					)} */}

					{/* Price Section */}
					<div className="mt-auto mb-2 pt-2 border-t border-gray-50">
						<div className="flex justify-between items-center">
							<div className="flex items-baseline gap-1 lg:gap-2">
								<span className="text-sm lg:text-xl font-bold text-gray-900">
									₹{finalPrice.toFixed(0)}
								</span>
								<span className="text-[10px] lg:text-sm text-gray-400 line-through font-medium">
									₹{originalTotalPrice.toFixed(0)}
								</span>
							</div>
							<span
								className={`text-[10px] font-bold ${
									product.stock > 10 ? "text-green-600" : "text-orange-600"
								}`}
							>
								{product.stock > 0
									? `${product.stock} In Stock`
									: "Out of Stock"}
							</span>
						</div>
						<p className="text-gray-500 text-[9px] lg:text-xs font-semibold">
							₹{pricePerPacket.toFixed(2)}/pc
						</p>
					</div>

					{/* Stock & Shipping */}
					{/* <div className="flex items-center justify-between mb-3">
						<span
							className={`text-[10px] font-bold ${
								product.stock > 10 ? "text-green-600" : "text-orange-600"
							}`}
						>
							{product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
						</span>
						<div className="hidden lg:flex items-center gap-1 text-[10px] text-gray-500">
							<Truck size={10} /> <span>Free</span>
						</div>
					</div> */}

					{/* Cart Actions */}
					{!addedToCart ? (
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleAddToCart(e);
							}}
							disabled={product.stock === 0}
							className={`w-full py-2 rounded-lg font-bold flex items-center justify-center gap-1 text-[10px] lg:text-sm uppercase tracking-tight ${
								product.stock === 0
									? "bg-gray-200 text-gray-500"
									: "bg-blue-600 text-white shadow-sm"
							}`}
						>
							<ShoppingCart size={14} /> <span>Add to Cart</span>
						</button>
					) : (
						<div className="flex items-center gap-1 bg-blue-50 p-1 rounded-lg border border-blue-200">
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleQtyChange(quantity - 1, e);
								}}
								className="p-1"
							>
								<Minus size={12} />
							</button>
							<span className="flex-1 text-center font-bold text-xs">
								{quantity}
							</span>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleQtyChange(quantity + 1, e);
								}}
								className="p-1"
							>
								<Plus size={12} />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleRemove(e);
								}}
								className="p-1 text-red-500 border-l border-blue-200"
							>
								<Trash2 size={12} />
							</button>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}
