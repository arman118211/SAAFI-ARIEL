"use client";
import { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import ShopHeader from "./ShopHeader";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductGridShimmer from "./ProductGridShimmer";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "../ScrollToTop";

export default function ShopPage() {
	const [activeFilter, setActiveFilter] = useState("all");
	const [sortBy, setSortBy] = useState("newest");
	const [cartItems, setCartItems] = useState([]);
	const { seller } = useSelector((state) => state.auth);

	const {
		products: PRODUCTS,
		loading,
		error,
	} = useSelector((state) => state.products);

	const dispatch = useDispatch();

	useEffect(() => {
		if (seller) {
			dispatch(fetchProducts(seller));
		} else {
			dispatch(fetchProducts("common"));
		}
	}, [dispatch, seller]);

	useEffect(() => {
		if (error) {
			toast.error("Failed to load products. Please check internet connection.");
		}
	}, [error]);

	const filteredProducts = useMemo(() => {
		let filtered = PRODUCTS;

		if (activeFilter !== "all") {
			if (activeFilter === "sale") {
				filtered = filtered.filter((p) => p.discount > 0);
			} else {
				filtered = filtered.filter(
					(p) => p.category.toLowerCase() === activeFilter.toLowerCase(),
				);
			}
		}

		// Sort
		const sorted = [...filtered];
		switch (sortBy) {
			case "price-asc":
				sorted.sort((a, b) => a.price * a.packSize - b.price * b.packSize);
				break;
			case "price-desc":
				sorted.sort((a, b) => b.price * b.packSize - a.price * a.packSize);
				break;
			case "popular":
				sorted.sort((a, b) => b.stock - a.stock);
				break;
			default:
				break;
		}

		return sorted;
	}, [PRODUCTS, activeFilter, sortBy]);

	const productsByBrand = useMemo(() => {
		const grouped = {};

		filteredProducts.forEach((product) => {
			const brand = product.brand || "Other";

			if (!grouped[brand]) {
				grouped[brand] = [];
			}

			grouped[brand].push(product);
		});

		return grouped;
	}, [filteredProducts]);

	const handleAddToCart = (product) => {
		setCartItems([...cartItems, product]);
		// You can add toast notification here
		console.log("Added to cart:", product.name);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
			<ScrollToTop />
			{/* Header */}
			<ShopHeader />

			{/* Main Content */}
			<div className="mx-auto px-6 lg:px-50 ">
				{/* Filter Section */}
				<ProductFilter
					onFilterChange={setActiveFilter}
					onSortChange={setSortBy}
				/>

				{/* Products Grid */}
				<div className="mb-16">
					{/* <div className="flex items-center justify-between mb-8">
						<h2 className="text-md font-bold text-gray-900">
							{activeFilter === "all"
								? "All Products"
								: activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
						</h2>
						<p className="text-gray-600 font-semibold">
							{filteredProducts.length} Products
						</p>
					</div> */}

					<AnimatePresence mode="wait">
						{loading ? (
							<ProductGridShimmer />
						) : (
							Object.entries(productsByBrand).map(([brand, products]) => (
								<motion.div
									key={brand}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="mb-14"
								>
									{/* Brand Title */}
									<div className="flex items-center justify-between mb-6">
										<h2 className="text-2xl font-bold text-gray-900 uppercase">
											{brand}
										</h2>
										<span className="text-sm text-gray-500 font-semibold">
											{products.length} Products
										</span>
									</div>

									{/* Brand Products Grid */}
									<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
										{products.map((product) => (
											<ProductCard
												key={product._id}
												product={product}
												onAddToCart={handleAddToCart}
											/>
										))}
									</div>
								</motion.div>
							))
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
