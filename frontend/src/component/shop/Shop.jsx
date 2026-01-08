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
	// const [PRODUCTS,setProducts] = useState([])

	// const getProductData = async () => {
	//   try{
	//     const role = seller.role ?
	//        seller.role === "admin" ? "common" : seller.role
	//        :
	//         "common"
	//     console.log("role -->",role)
	//     const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/products/getProductss`,{
	//       role:role
	//     })
	//     console.log("product api response-->",res)
	//     setProducts(res.data.products)

	//   }catch(error){
	//     toast.error("Failed to laod Product .Please check internet connection.")
	//   }
	// }

	// useEffect(()=>{
	//   getProductData()
	// },[])

	// Filter and Sort Products
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
					(p) => p.category.toLowerCase() === activeFilter.toLowerCase()
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

	const handleAddToCart = (product) => {
		setCartItems([...cartItems, product]);
		// You can add toast notification here
		console.log("Added to cart:", product.name);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			<ScrollToTop />
			{/* Header */}
			<ShopHeader />

			{/* Main Content */}
			<div className="mx-auto px-6 lg:px-50">
				{/* Filter Section */}
				<ProductFilter
					onFilterChange={setActiveFilter}
					onSortChange={setSortBy}
				/>

				{/* Products Grid */}
				<div className="mb-16">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-3xl font-bold text-gray-900">
							{activeFilter === "all"
								? "All Products"
								: activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
						</h2>
						<p className="text-gray-600 font-semibold">
							{filteredProducts.length} Products
						</p>
					</div>

					{/* {loading ? 
          (
            <ProductGridShimmer count={8} />
          ):
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>} */}

					<AnimatePresence mode="wait">
						{loading ? (
							<motion.div
								key="shimmer"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<ProductGridShimmer />
							</motion.div>
						) : (
							<motion.div
								key="products"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
									{filteredProducts.map((product) => (
										<ProductCard
											key={product._id}
											product={product}
											onAddToCart={handleAddToCart}
										/>
									))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Footer Section */}
				<div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white text-center mb-12 overflow-hidden">
					<h3 className="text-3xl font-bold mb-4">
						Subscribe to Our Newsletter
					</h3>
					<p className="text-lg mb-6 opacity-90">
						Get exclusive deals and cleaning tips delivered to your inbox
					</p>
					<div className="flex gap-3 max-w-md mx-auto">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-gray-900 font-semibold"
						/>
						<button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all">
							Subscribe
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
