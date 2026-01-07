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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import useIsMobile from "../hook/useIsMobile"
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

  const isMobile = useIsMobile()

  

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

	

  if(isMobile){
    return <MobileNavbar/>
  }else{
	if (location.pathname === "/login" || location.pathname === "/dashboard") {
		return null;
	}
  }

	return (
		<>
			<motion.div
				className={`w-full sticky top-0 left-0 right-0 z-40 bg-white  ${
					isScrolled ? "shadow-lg" : ""
				} transition-all duration-300`}
				initial={{ y: 0 }}
				animate={{ y: showNavbar ? 0 : -37 }}
				transition={{ duration: 0.3 }}
			>
				{/* Top section */}
				<div className="max-w-7xl mx-auto flex justify-between items-center p-2  mr-4">
					<div className="flex-1 hidden md:block"></div>

					<div className="flex-1 flex justify-center md:justify-end items-center gap-4">
						{/* Updated links in desktop view */}
						<div className="hidden md:flex items-center space-x-4">
							{/* Added Login link */}
							{/* AUTH SECTION */}
							{!seller ? (
								<Link
									to="/login"
									className="text-blue-700 hover:text-blue-900 font-bold transition-colors text-sm"
								>
									LOGIN
								</Link>
							) : (
								<div
									className="relative"
									onMouseEnter={() => setShowUserMenu(true)}
									onMouseLeave={() => setShowUserMenu(false)}
								>
									<button className="flex items-center gap-2 text-blue-700 font-bold text-sm">
										<User size={16} />
										{seller.name}
										<ChevronDown size={14} />
									</button>

									<AnimatePresence>
										{showUserMenu && (
											<motion.div
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 8 }}
												className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50"
											>
												<Link
													to="/dashboard"
													className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-sm"
												>
													<LayoutDashboard size={16} />
													Dashboard
												</Link>

												<Link
													to="/dashboard"
													state={{ activeTab: "profile" }}
													className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-sm"
												>
													<User size={16} />
													Profile
												</Link>

												<button
													onClick={() => {
														dispatch(logout());
														toast.success("Logged out successfully 👋");
													}}
													className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-sm text-red-600"
												>
													<LogOut size={16} />
													Logout
												</button>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							)}

							<Link
								to="/why-choose-us"
								className="text-blue-700 hover:text-blue-900 font-bold transition-colors text-sm"
							>
								WHY CHOOSE US
							</Link>
							<Link
								to="/contact"
								className="text-blue-700 hover:text-blue-900 font-bold transition-colors text-sm"
							>
								CONTACT US
							</Link>
						</div>

						{/* Hide all top links in mobile view as requested */}

						<div className="relative">
							<button
								className="text-blue-700 font-bold flex items-center gap-1 text-sm"
								onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
							>
								<Globe size={14} />
								NEPAL - ENGLISH
								<motion.div
									animate={{ rotate: isLangMenuOpen ? 180 : 0 }}
									transition={{ duration: 0.3 }}
								>
									<ChevronDown size={14} />
								</motion.div>
							</button>

							<AnimatePresence>
								{isLangMenuOpen && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
										className="absolute top-full right-0 bg-white shadow-xl rounded-lg mt-1 w-40 z-30 overflow-hidden"
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
				</div>

				{/* Red bar with logo */}
				<div className="w-full relative h-8 bg-red-600">
					{/* Logo */}
					<motion.div
						className="absolute left-6 md:left-16 lg:left-24 top-1/2 transform -translate-y-1/2 z-10 "
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
					>
						<Link to="/">
							<div className="relative w-19 h-14 rounded-t-full overflow-hidden bg-white top-5 ">
								<div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white opacity-50 mix-blend-overlay"></div>
								<img
									src="/logo.jpg"
									alt="Gay Chap Logo"
									className="h-14 w-21 object-contain "
								/>
							</div>
						</Link>
					</motion.div>

					{/* Mobile menu button */}
					<button
						id="menu-button"
						className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 z-20"
						onClick={() => {
							setIsMenuOpen(!isMenuOpen);
							if (!isMenuOpen) setShowNavbar(true);
						}}
						aria-label="Toggle menu"
					>
						<Menu size={20} color="white" />
					</button>
				</div>

				{/* Main navigation */}
				<div className="bg-white pt-8 pb-1 ">
					{/* Desktop navigation */}
					<div className="hidden absolute top-16 left-100 md:flex justify-center ">
						<nav className="flex gap-12 py-1">
							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-base relative"
								whileHover="hover"
							>
								<Link to="/shop">Shop Products</Link>
								<motion.span
									className="absolute -bottom-1 left-0 h-0.5 bg-blue-700 w-0"
									variants={{
										hover: { width: "100%" },
									}}
									transition={{ duration: 0.3 }}
								></motion.span>
							</motion.div>

							{/* Added New Offer link */}
							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-base relative"
								whileHover="hover"
							>
								<Link to="/new-offer">New Offer</Link>
								<motion.span
									className="absolute -bottom-1 left-0 h-0.5 bg-blue-700 w-0"
									variants={{
										hover: { width: "100%" },
									}}
									transition={{ duration: 0.3 }}
								></motion.span>
							</motion.div>

							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-base relative"
								whileHover="hover"
							>
								<Link to="/how-to-wash">How To Wash Cloths</Link>
								<motion.span
									className="absolute -bottom-1 left-0 h-0.5 bg-blue-700 w-0"
									variants={{
										hover: { width: "100%" },
									}}
									transition={{ duration: 0.3 }}
								></motion.span>
							</motion.div>
							<motion.div
								className="text-blue-700 hover:text-blue-900 font-bold text-base relative"
								whileHover="hover"
							>
								<Link to="/about">About Saafi Ariel</Link>
								<motion.span
									className="absolute -bottom-1 left-0 h-0.5 bg-blue-700 w-0"
									variants={{
										hover: { width: "100%" },
									}}
									transition={{ duration: 0.3 }}
								></motion.span>
							</motion.div>
							<motion.div
								className="relative text-blue-700 hover:text-blue-900 font-bold text-base"
								whileHover="hover"
							>
								<Link to="/cart" className="flex items-center gap-2">
									<ShoppingCart size={18} />
									Cart
									{cartCount > 0 && (
										<span
											className="
        absolute -top-2 -right-3
        bg-green-600 text-white
        text-xs font-bold
        w-5 h-5 rounded-full
        flex items-center justify-center
      "
										>
											{cartCount}
										</span>
									)}
								</Link>

								<motion.span
									className="absolute -bottom-1 left-0 h-0.5 bg-blue-700 w-0"
									variants={{ hover: { width: "100%" } }}
									transition={{ duration: 0.3 }}
								/>
							</motion.div>
						</nav>
					</div>
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
