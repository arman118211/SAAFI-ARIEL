"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Search,
	Filter,
	ChevronDown,
	X,
	Loader2,
	ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../component/shop/ProductCard";
import ScrollToTop from "../ScrollToTop";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import loaderAnimation from "../../../public/lottie/Loading_car.json";
import noResultsAnimation from "../../../public/lottie/empty.json";
import { useRef } from "react";

const MOCK_PRODUCTS = [
	{
		id: 1,
		name: "Premium Wireless Headphones",
		category: "Electronics",
		price: 129.99,
		rating: 4.5,
		reviews: 234,
		image: "/wireless-headphones.png",
		description: "High-quality sound with noise cancellation",
		packSize: 1,
		discount: 10,
	},
	{
		id: 2,
		name: "Laptop Stand",
		category: "Accessories",
		price: 49.99,
		rating: 4.8,
		reviews: 456,
		image: "/laptop-stand.png",
		description: "Ergonomic aluminum design",
		packSize: 1,
		discount: 5,
	},
	{
		id: 3,
		name: "USB-C Cable 2M",
		category: "Cables",
		price: 14.99,
		rating: 4.6,
		reviews: 789,
		image: "/usb-cable.png",
		description: "Fast charging and data transfer",
		packSize: 1,
		discount: 0,
	},
	{
		id: 4,
		name: "Mechanical Keyboard",
		category: "Electronics",
		price: 99.99,
		rating: 4.7,
		reviews: 342,
		image: "/mechanical-keyboard.png",
		description: "RGB backlit with custom switches",
		packSize: 1,
		discount: 15,
	},
	{
		id: 5,
		name: "Wireless Mouse",
		category: "Electronics",
		price: 34.99,
		rating: 4.4,
		reviews: 567,
		image: "/wireless-mouse.png",
		description: "Precision tracking and battery",
		packSize: 1,
		discount: 8,
	},
	{
		id: 6,
		name: "Phone Mount",
		category: "Accessories",
		price: 19.99,
		rating: 4.3,
		reviews: 201,
		image: "/universal-car-phone-mount.png",
		description: "Universal 360 degree rotation",
		packSize: 1,
		discount: 0,
	},
	{
		id: 7,
		name: "Screen Protector Pack",
		category: "Accessories",
		price: 9.99,
		rating: 4.5,
		reviews: 412,
		image: "/screen-protector.png",
		description: "Pack of 3 tempered glass",
		packSize: 3,
		discount: 20,
	},
	{
		id: 8,
		name: "Portable SSD",
		category: "Storage",
		price: 79.99,
		rating: 4.9,
		reviews: 189,
		image: "/portable-ssd.jpg",
		description: "1TB fast storage solution",
		packSize: 1,
		discount: 12,
	},
	{
		id: 9,
		name: "USB Hub 7-Port",
		category: "Accessories",
		price: 24.99,
		rating: 4.2,
		reviews: 298,
		image: "/usb-cable.png",
		description: "Fast data transfer hub",
		packSize: 1,
		discount: 5,
	},
	{
		id: 10,
		name: "Monitor Stand Riser",
		category: "Accessories",
		price: 39.99,
		rating: 4.6,
		reviews: 175,
		image: "/laptop-stand.png",
		description: "Adjustable height riser",
		packSize: 1,
		discount: 10,
	},
	{
		id: 11,
		name: "Wireless Keyboard",
		category: "Electronics",
		price: 69.99,
		rating: 4.7,
		reviews: 421,
		image: "/mechanical-keyboard.png",
		description: "Ultra-thin design",
		packSize: 1,
		discount: 12,
	},
	{
		id: 12,
		name: "Desk Lamp LED",
		category: "Accessories",
		price: 44.99,
		rating: 4.4,
		reviews: 334,
		image: "/screen-protector.png",
		description: "Adjustable brightness control",
		packSize: 1,
		discount: 15,
	},
];

const CATEGORIES = ["All", "Electronics", "Accessories", "Cables", "Storage"];

const NoResults = ({ searchQuery }) => (
	<div className="flex flex-col items-center justify-center py-32 text-center">
		<Lottie
			animationData={noResultsAnimation}
			loop={false}
			className="w-56 h-56"
		/>

		<h3 className="mt-4 text-xl font-black text-gray-900">No products found</h3>

		<p className="mt-2 text-sm text-gray-500 max-w-md">
			We couldn’t find any products matching{" "}
			<span className="font-semibold text-gray-700">“{searchQuery}”</span>
		</p>
	</div>
);

export default function ProductSearch() {
	const { seller } = useSelector((state) => state.auth);
	console.log("seller-->", seller);

	const { searchQuery } = useParams();
	console.log("searchQuery-->", searchQuery);
	const navigate = useNavigate();

	// API States
	const [dbProducts, setDbProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// UI/Filter States
	const [localInput, setLocalInput] = useState(searchQuery || "");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [priceRange, setPriceRange] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const searchInputRef = useRef(null);

	// 1. Fetch from API (Mocked) whenever URL searchQuery changes
	const getSearchData = async () => {
		try {
			const role = seller
				? seller.role === "admin"
					? "common"
					: seller.role
				: "common";
			console.log("role-->", role);

			const res = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/products/products/search`,
				{
					role,
					query: searchQuery,
				}
			);
			// console.log("response-->", res);
			setDbProducts(res.data.products);
			// setDbProducts(MOCK_PRODUCTS);
		} catch (err) {
			toast.error("something went wrong");
		}
	};

	useEffect(() => {
		const fetchFromApi = async () => {
			try {
				setIsLoading(true);
				await getSearchData();
			} catch (err) {
				toast.error("something went wrong");
			} finally {
				setIsLoading(false);
			}
		};
		fetchFromApi();
		setLocalInput(searchQuery || "");
	}, [searchQuery]);

	// 2. Client-side Filter logic for Category and Price
	const filteredProducts = useMemo(() => {
		return dbProducts.filter((product) => {
			const matchesCategory =
				selectedCategory === "All" || product.category === selectedCategory;

			const pricePerPacket = Number(product.price);
			const packSize = Number(product.packSize || 1);
			const discount = Number(product.discount || 0);

			const originalTotalPrice = pricePerPacket * packSize;
			const discountAmount = (originalTotalPrice * discount) / 100;
			const finalPrice = originalTotalPrice - discountAmount;

			const matchesPrice = priceRange === null || finalPrice <= priceRange;

			return matchesCategory && matchesPrice;
		});
	}, [dbProducts, selectedCategory, priceRange]);

	console.log("filtered products -->", filteredProducts);

	const handleSearch = (e) => {
		if (e.key === "Enter" && localInput.trim()) {
			// ✅ Close mobile keyboard
			e.target.blur();
			searchInputRef.current?.blur();

			navigate(`/search/${encodeURIComponent(localInput.trim())}`);
		}
	};

	return (
		<div className="min-h-screen bg-[#FDFDFD] pb-20 md:pb-0 ">
			{/* STICKY SEARCH HEADER */}
			<ScrollToTop />
			<header className="sticky top-0 z-50 md:z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 lg:relative lg:bg-transparent lg:border-none">
				<div className="max-w-7xl mx-auto px-4 py-3 lg:pt-10 lg:pb-6">
					<div className="hidden lg:block mb-8">
						<h1 className="text-4xl font-black text-gray-900 tracking-tight">
							Search results for{" "}
							<span className="text-teal-600">"{searchQuery}"</span>
						</h1>
					</div>

					<div className="flex items-center gap-3">
						<button
							onClick={() => navigate(-1)}
							className="lg:hidden p-2 -ml-2 text-gray-600"
						>
							<ArrowLeft size={20} />
						</button>
						<div className="relative flex-1 group md:hidden">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 w-4 h-4 lg:w-5 lg:h-5" />
							<input
								ref={searchInputRef}
								type="text"
								placeholder="Search our collection..."
								value={localInput}
								onChange={(e) => setLocalInput(e.target.value)}
								onKeyDown={handleSearch}
								className="w-full pl-11 pr-4 py-2.5 lg:py-4 bg-gray-100 lg:bg-white border border-transparent lg:border-gray-200 rounded-xl lg:rounded-2xl focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none text-sm lg:text-base font-medium"
							/>
						</div>
					</div>

					<div className="mt-4 lg:hidden flex justify-between items-center">
						<h2 className="text-lg font-black text-gray-900">
							Results for "{searchQuery}"
						</h2>
						<button
							onClick={() => setIsMobileMenuOpen(true)}
							className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
						>
							<Filter size={14} /> Filter
						</button>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
					{/* DESKTOP SIDEBAR FILTERS */}
					<aside className="hidden lg:block sticky top-23 h-fit space-y-8 ">
						<div>
							<h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-5 ">
								Categories
							</h3>
							<div className="space-y-1">
								{CATEGORIES.map((cat) => (
									<button
										key={cat}
										onClick={() => setSelectedCategory(cat)}
										className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
											selectedCategory === cat
												? "bg-teal-600 text-white shadow-md shadow-teal-200"
												: "text-gray-600 hover:bg-gray-100"
										}`}
									>
										{cat}
									</button>
								))}
							</div>
						</div>

						<div className="pt-6 border-t border-gray-100">
							<h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-5">
								Max Price: ${priceRange}
							</h3>
							<input
								type="range"
								min="0"
								max="15000"
								value={priceRange}
								onChange={(e) => setPriceRange(Number(e.target.value))}
								className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
							/>
						</div>
					</aside>

					{/* MAIN PRODUCTS AREA */}
					{/* <main className="lg:col-span-3">
						{isLoading ? (
							<div className="flex flex-col items-center justify-center py-32">
								<Lottie
									animationData={loaderAnimation}
									loop
									autoplay
									className="w-40 h-40"
								/>
								<p className="mt-4 font-bold uppercase tracking-widest text-xs text-gray-400">
									Loading Products...
								</p>
							</div>
						) : (
							<motion.div
								layout
								className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
							>
								<AnimatePresence mode="popLayout">
									{filteredProducts.map((product) => (
										<motion.div
											key={product._id}
											layout
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											transition={{ duration: 0.2 }}
										>
											<ProductCard product={product} />
										</motion.div>
									))}
								</AnimatePresence>
							</motion.div>
						)}
					</main> */}

					<main className="lg:col-span-3">
						{isLoading && (
							<div className="flex flex-col items-center justify-center py-32">
								<Lottie
									animationData={loaderAnimation}
									loop
									autoplay
									className="w-40 h-40"
								/>
								<p className="mt-4 font-bold uppercase tracking-widest text-xs text-gray-400">
									Loading Products...
								</p>
							</div>
						)}

						{!isLoading && filteredProducts.length === 0 && (
							<NoResults searchQuery={searchQuery} />
						)}

						{!isLoading && filteredProducts.length > 0 && (
							<motion.div
								layout
								className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
							>
								<AnimatePresence>
									{filteredProducts.map((product) => (
										<motion.div
											key={product._id}
											layout
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											transition={{ duration: 0.2 }}
										>
											<ProductCard product={product} />
										</motion.div>
									))}
								</AnimatePresence>
							</motion.div>
						)}
					</main>
				</div>
			</div>

			{/* MOBILE FILTER DRAWER */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsMobileMenuOpen(false)}
							className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden "
						/>
						<motion.div
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							exit={{ y: "100%" }}
							className="fixed bottom-0 left-0 right-0 bg-white z-[101] rounded-t-[2rem] p-6 lg:hidden "
						>
							<div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-lg font-black text-gray-900">FILTERS</h3>
								<button
									onClick={() => setIsMobileMenuOpen(false)}
									className="p-2 bg-gray-100 rounded-full text-gray-400"
								>
									<X size={18} />
								</button>
							</div>

							<div className="space-y-6">
								<div>
									<p className="text-xs font-black text-gray-400 uppercase mb-3">
										Categories
									</p>
									<div className="flex flex-wrap gap-2">
										{CATEGORIES.map((cat) => (
											<button
												key={cat}
												onClick={() => setSelectedCategory(cat)}
												className={`px-4 py-2 rounded-full text-xs font-bold border ${
													selectedCategory === cat
														? "bg-teal-600 border-teal-600 text-white"
														: "bg-white border-gray-200 text-gray-600"
												}`}
											>
												{cat}
											</button>
										))}
									</div>
								</div>
								<div className="pb-8">
									<p className="text-xs font-black text-gray-400 uppercase mb-3">
										Max Price: ${priceRange}
									</p>
									<input
										type="range"
										min="0"
										max="15000"
										value={priceRange}
										onChange={(e) => setPriceRange(Number(e.target.value))}
										className="w-full accent-teal-600"
									/>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
