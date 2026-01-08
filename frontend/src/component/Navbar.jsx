import { useState, useEffect } from "react";
import {
	Menu,
	X,
	ChevronDown,
	Globe,
	User,
	LogOut,
	LayoutDashboard,
	ShoppingCart,
	Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import useIsMobile from "../hook/useIsMobile";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
	const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);
	const [showNavbar, setShowNavbar] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const location = useLocation();
	const dispatch = useDispatch();
	const { seller } = useSelector((state) => state.auth);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const cartItems = useSelector((state) => state.cart.items);
	const [searchQuery, setSearchQuery] = useState("");

	const isMobile = useIsMobile();
	const navigate = useNavigate();

	const handleSearchKeyDown = (e) => {
		if (e.key === "Enter") {
			const query = searchQuery.trim();
			if (!query) return;

			navigate(`/search/${encodeURIComponent(query)}`);
			setSearchQuery("");
		}
	};

	// total quantity (badge count)
	const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

	// Close mobile menu when route changes

	useEffect(() => {
		setIsMenuOpen(false);
		setIsLangMenuOpen(false);
		setIsMobileLangMenuOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const handleScroll = () => {
			if (isMenuOpen) return;

			const currentScrollY = window.scrollY;
			setIsScrolled(currentScrollY > 10);

			if (currentScrollY > lastScrollY) {
				setShowNavbar(false);
			} else {
				setShowNavbar(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, isMenuOpen]);

	useEffect(() => {
		if (isMenuOpen) {
			setShowNavbar(true);
		}
	}, [isMenuOpen]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			const menu = document.getElementById("mobile-menu");
			const button = document.getElementById("menu-button");
			if (
				isMenuOpen &&
				menu &&
				!menu.contains(e.target) &&
				!button.contains(e.target)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMenuOpen]);

	// Function to handle language selection
	const handleLanguageSelect = () => {
		setIsLangMenuOpen(false);
		setIsMobileLangMenuOpen(false);
	};

	if (isMobile) {
		return <MobileNavbar />;
	} else {
		if (location.pathname === "/login" || location.pathname === "/dashboard") {
			return null;
		}
	}

	return (
		<>
			<motion.div
				className={`w-full sticky top-0 left-0 right-0 z-40 bg-white transition-all duration-300 ${
					isScrolled ? "shadow-md" : ""
				}`}
				initial={{ y: 0 }}
				animate={{ y: showNavbar ? 0 : -50 }}
				transition={{ duration: 0.3 }}
			>
				{/* --- TOP SECTION (White) --- */}
				<div className=" mx-auto flex justify-between items-center px-6 py-2   ">
					<div className="hidden md:block w-32 lg:w-48"></div>

					<div className="flex items-center gap-6 flex-1 justify-end">
						{/* Auth Links */}
						<div className="hidden md:flex items-center gap-5 border-r pr-6 border-gray-100">
							{!seller ? (
								<Link
									to="/login"
									className="text-blue-700 hover:text-blue-900 font-bold text-[13px] tracking-wide transition-colors"
								>
									LOGIN
								</Link>
							) : (
								<div
									className="relative"
									onMouseEnter={() => setShowUserMenu(true)}
									onMouseLeave={() => setShowUserMenu(false)}
								>
									<button className="flex items-center gap-2 text-blue-700 font-bold text-[13px]">
										<User size={15} /> {seller.name.toUpperCase()}{" "}
										<ChevronDown size={14} />
									</button>
									<AnimatePresence>
										{showUserMenu && (
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 10 }}
												className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
											>
												<Link
													to="/dashboard"
													className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
												>
													<LayoutDashboard size={15} /> Dashboard
												</Link>
												<button
													onClick={() => dispatch(logout())}
													className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-sm text-red-600 border-t mt-1"
												>
													<LogOut size={15} /> Logout
												</button>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							)}
							<Link
								to="/contact"
								className="text-blue-700 hover:text-blue-900 font-bold text-[13px] tracking-wide"
							>
								CONTACT US
							</Link>
						</div>

						{/* Language Selector */}
						<div className="relative border-r pr-6 border-gray-100">
							<button
								onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
								className="text-blue-700 font-bold flex items-center gap-1 text-[13px] tracking-wide"
							>
								<Globe size={15} /> EN <ChevronDown size={14} />
							</button>
							{/* RESTORED DESKTOP LANG MENU */}
							<AnimatePresence>
								{isLangMenuOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
									>
										<div
											onClick={handleLanguageSelect}
											className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
										>
											English
										</div>
										<div
											onClick={handleLanguageSelect}
											className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 font-nepali"
										>
											नेपाली
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* SEARCH BAR - After Language Selector */}
						<div className="hidden lg:block w-64">
							<div className="relative group">
								<input
									type="text"
									placeholder="Search..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyDown={handleSearchKeyDown}
									className="w-full bg-gray-100 border-transparent border focus:bg-white focus:border-blue-500 rounded-full py-1.5 pl-4 pr-10 text-sm outline-none transition-all duration-300"
								/>
								<button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600">
									<Search size={16} />
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* --- RED BAR --- */}
				<div className="w-full relative h-12 bg-red-600 flex items-center shadow-inner">
					<div className="absolute left-6 md:left-16 lg:left-24 top-0 z-50">
						<Link to="/">
							<div className="bg-white p-1 rounded-b-2xl shadow-lg border-x border-b border-gray-100 transition-transform hover:scale-105">
								<img
									src="/logo.jpg"
									alt="Logo"
									className="h-16 w-20 object-contain"
								/>
							</div>
						</Link>
					</div>
					<nav className="hidden md:flex flex-1 justify-start items-center gap-10 pl-55">
						<Link
							to="/shop"
							className="text-white text-[15px] font-bold tracking-widest hover:text-blue-100"
						>
							SHOP PRODUCTS
						</Link>
						<Link
							to="/new-offer"
							className="text-white text-[15px] font-bold tracking-widest hover:text-blue-100"
						>
							NEW OFFER
						</Link>
						<Link
							to="/how-to-wash"
							className="text-white text-[15px] font-bold tracking-widest hover:text-blue-100"
						>
							HOW TO WASH
						</Link>
						<Link
							to="/about"
							className="text-white text-[15px] font-bold tracking-widest hover:text-blue-100"
						>
							ABOUT US
						</Link>
						<Link
							to="/cart"
							className="flex items-center gap-2 text-white hover:text-blue-100 relative"
						>
							<ShoppingCart size={18} />
							<span className="font-bold text-[15px]">CART</span>
							{cartCount > 0 && (
								<span className="absolute -top-2 -right-3 bg-white text-red-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
									{cartCount}
								</span>
							)}
						</Link>
					</nav>
				</div>
			</motion.div>

			{/* Mobile menu overlay */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden fixed inset-0 backdrop-blur-md bg-opacity-50 backdrop-blur-sm z-45"
						onClick={() => setIsMenuOpen(false)}
					/>
				)}
			</AnimatePresence>

			{/* Mobile menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						id="mobile-menu"
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="md:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-gradient-to-b from-white to-blue-50 shadow-2xl z-50 py-16 px-6"
					>
						{/* Close button */}
						<motion.button
							className="absolute top-4 right-4 p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
							onClick={() => setIsMenuOpen(false)}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<X size={20} />
						</motion.button>

						<div className="flex flex-col gap-3 mb-6">
							{/* Added Login link to mobile menu */}
							{!seller ? (
								<Link to="/login" className="text-blue-700 font-bold text-base">
									LOGIN
								</Link>
							) : (
								<>
									<div className="text-blue-900 font-bold text-base">
										👤 {seller.name}
									</div>

									<Link
										to="/dashboard"
										className="text-blue-700 font-bold text-base"
									>
										Dashboard
									</Link>

									<Link
										to="/profile"
										className="text-blue-700 font-bold text-base"
									>
										Profile
									</Link>

									<button
										onClick={() => {
											dispatch(logout());
											toast.success("Logged out successfully 👋");
										}}
										className="text-red-600 font-bold text-base text-left"
									>
										Logout
									</button>
								</>
							)}

							<Link
								to="/why-choose-us"
								className="text-blue-700 hover:text-blue-900 font-bold text-base"
							>
								WHY CHOOSE US
							</Link>
							<Link
								to="/contact"
								className="text-blue-700 hover:text-blue-900 font-bold text-base"
							>
								CONTACT US
							</Link>

							<div className="relative mt-2">
								<button
									className="text-blue-700 font-bold flex items-center gap-1 text-base"
									onClick={() => setIsMobileLangMenuOpen(!isMobileLangMenuOpen)}
								>
									<Globe size={14} />
									NEPAL - ENGLISH
									<motion.div
										animate={{ rotate: isMobileLangMenuOpen ? 180 : 0 }}
										transition={{ duration: 0.3 }}
									>
										<ChevronDown size={14} />
									</motion.div>
								</button>

								<AnimatePresence>
									{isMobileLangMenuOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3 }}
											className="mt-2 bg-white rounded-lg shadow-md overflow-hidden"
										>
											<Link to="/" onClick={handleLanguageSelect}>
												<div className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors">
													English
												</div>
											</Link>
											<Link to="/Nepal" onClick={handleLanguageSelect}>
												<div className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors">
													नेपाली
												</div>
											</Link>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						<motion.hr
							className="border-blue-100 mb-4"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ delay: 0.2 }}
						/>

						<nav className="flex flex-col gap-3">
							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-lg flex items-center py-1.5 border-b border-blue-100 group"
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.3 }}
								whileHover={{ x: 5 }}
							>
								<motion.span
									className="w-2 h-6 bg-blue-700 mr-3 rounded-r-md"
									whileHover={{ width: "12px" }}
								></motion.span>
								<Link to="/shop">Shop Products</Link>
							</motion.div>

							{/* Added New Offer link to mobile menu */}
							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-lg flex items-center py-1.5 border-b border-blue-100 group"
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.35 }}
								whileHover={{ x: 5 }}
							>
								<motion.span
									className="w-0 h-6 bg-blue-700 mr-3 rounded-r-md"
									whileHover={{ width: "12px" }}
								></motion.span>
								<Link to="/new-offer">New Offer</Link>
							</motion.div>

							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-lg flex items-center py-1.5 border-b border-blue-100 group"
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.4 }}
								whileHover={{ x: 5 }}
							>
								<motion.span
									className="w-0 h-6 bg-blue-700 mr-3 rounded-r-md"
									whileHover={{ width: "12px" }}
								></motion.span>
								<Link to="/how-to-wash">How To Wash Cloths</Link>
							</motion.div>
							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-lg flex items-center py-1.5 border-b border-blue-100 group"
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.5 }}
								whileHover={{ x: 5 }}
							>
								<motion.span
									className="w-0 h-6 bg-blue-700 mr-3 rounded-r-md"
									whileHover={{ width: "12px" }}
								></motion.span>
								<Link to="/about">About Saafi Ariel</Link>
							</motion.div>
							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-lg flex items-center py-1.5 border-b border-blue-100 group"
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.55 }}
								whileHover={{ x: 5 }}
							>
								<motion.span
									className="w-0 h-6 bg-blue-700 mr-3 rounded-r-md"
									whileHover={{ width: "12px" }}
								/>

								<Link to="/cart" className="flex items-center gap-2">
									<ShoppingCart size={20} />
									Cart
									{cartCount > 0 && (
										<span
											className="
        ml-2
        bg-green-600 text-white
        text-xs font-bold
        px-2 py-0.5 rounded-full
      "
										>
											{cartCount}
										</span>
									)}
								</Link>
							</motion.div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
