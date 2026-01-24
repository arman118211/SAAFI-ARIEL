import { useState, useEffect } from "react";
import {
	Menu,
	X,
	User,
	ShoppingCart,
	ChevronRight,
	LogOut,
	LayoutDashboard,
	Phone,
	ShoppingBag,
	Sparkles,
	Info,
	Droplets,
	Award,
	Home,
	Search,
	History as HistoryIcon,
	UserCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import useIsMobile from "../hook/useIsMobile";

const RECENT_SEARCH_KEY = "recent_searches";

const getStoredSearches = () => {
	try {
		return JSON.parse(localStorage.getItem(RECENT_SEARCH_KEY)) || [];
	} catch {
		return [];
	}
};

const saveSearches = (searches) => {
	localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(searches));
};

export default function MobileNavbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isMobile = useIsMobile();

	const [recentSearches, setRecentSearches] = useState([]);

	useEffect(() => {
		setRecentSearches(getStoredSearches());
	}, []);

	const handleSearchSubmit = (query) => {
		if (!query.trim()) return;

		const updatedSearches = [
			query,
			...recentSearches.filter((item) => item !== query),
		].slice(0, 5); // keep last 5 searches

		setRecentSearches(updatedSearches);
		saveSearches(updatedSearches);

		setIsSearchOpen(false);
		setSearchQuery("");

		navigate(`/search/${query}`);
	};

	const isDashboard =
		location.pathname === "/dashboard" ||
		location.pathname.startsWith("/search/");

	const { seller } = useSelector((state) => state.auth);
	const cartItems = useSelector((state) => state.cart.items || []);
	const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

	const isActive = (path) => location.pathname === path;

	// Closes side menu on route change
	useEffect(() => {
		setIsMenuOpen(false);
		setShowUserMenu(false);
	}, [location.pathname]);

	

	// Handle Logic for User Icon
	const handleUserClick = () => {
		if (!seller) {
			navigate("/login");
		} else {
			setShowUserMenu(!showUserMenu);
		}
	};

	const getInitials = (name) => {
		return (
			name
				?.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2) || "U"
		);
	};

	const handleAuthNavigation = (path, pageKey) => {
		if (seller?.role === "admin") {
			localStorage.setItem("adminCurrentPage", pageKey);
		} else {
			localStorage.setItem("sellerCurrentPage", pageKey);
		}

		setIsMenuOpen(false);
		navigate(path);
	};

	const menuItems = [
		{ path: "/how-to-wash", label: "Washing Guide", icon: Droplets },
		{ path: "/about", label: "Our Journey", icon: Info },
		{ path: "/why-choose-us", label: "Quality Standards", icon: Award },
		{ path: "/contact", label: "Get in Touch", icon: Phone },
	];

	if (["/login"].includes(location.pathname)) return null;

	const authMenuItems = seller
		? [
				{
					label: "Dashboard",
					path: "/dashboard",
					icon: LayoutDashboard,
				},
				// {
				// 	label: "My Orders",
				// 	path: "/orders",
				// 	icon: ShoppingBag,
				// },
				// {
				// 	label: "Profile",
				// 	path: "/profile",
				// 	icon: User,
				// },
		  ]
		: [];

	return (
		<>
			{/* --- TOP BRAND BAR --- */}
			{!(isMobile && isDashboard) && (
				<nav className="fixed top-0 left-0 right-0 z-[45] bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 py-3 flex items-center justify-between md:hidden shadow-sm">
					<Link to="/" className="flex items-center gap-3">
						<motion.div
							whileTap={{ scale: 0.95 }}
							className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100"
						>
							<img
								src="/logo.jpg"
								alt="Logo"
								className="w-full h-full object-contain"
							/>
						</motion.div>
						<div className="flex flex-col">
							<span className="font-black text-lg leading-none tracking-tight text-gray-900">
								SAAFI
							</span>
							<span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">
								Ariel
							</span>
						</div>
					</Link>

					<div className="flex items-center gap-2">
						{/* SEARCH ICON */}
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => setIsSearchOpen(true)}
							className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-500"
						>
							<Search size={20} strokeWidth={2.5} />
						</motion.button>

						{/* USER ICON */}
						<div className="relative">
							<motion.button
								whileTap={{ scale: 0.9 }}
								onClick={handleUserClick}
								className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
									seller
										? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 font-bold"
										: "bg-gray-50 border border-gray-200 text-gray-500"
								}`}
							>
								{seller ? (
									getInitials(seller.name)
								) : (
									<User size={20} strokeWidth={2.5} />
								)}
							</motion.button>
							{showUserMenu && seller && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-[100]"
								>
									{/* <Link
										to="/profile"
										className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-t-2xl"
									>
										<User size={16} />
										<span className="font-medium">Profile</span>
									</Link> */}

									<Link
										to="/dashboard"
										className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
									>
										<LayoutDashboard size={16} />
										<span className="font-medium">Dashboard</span>
									</Link>

									<button
										onClick={() => {
											dispatch(logout());
											toast.success("Logged out");
											navigate("/");
										}}
										className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-50 text-red-600 rounded-b-2xl"
									>
										<LogOut size={16} />
										<span className="font-medium">Logout</span>
									</button>
								</motion.div>
							)}
						</div>
					</div>
				</nav>
			)}

			{/* --- FULL SCREEN SEARCH OVERLAY --- */}
			<AnimatePresence>
				{isSearchOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="fixed inset-0 z-[70] bg-white flex flex-col md:hidden"
					>
						{/* Search Header */}
						<div className="p-5 flex items-center gap-3 border-b border-gray-100">
							<div className="flex-1 flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-2xl">
								<Search size={20} className="text-gray-400" />
								<input
									autoFocus
									type="text"
									placeholder="Search products..."
									className="bg-transparent border-none outline-none w-full text-gray-800 font-medium"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleSearchSubmit(searchQuery);
										}
									}}
								/>
							</div>
							<button
								onClick={() => setIsSearchOpen(false)}
								className="p-2 text-gray-500 font-semibold"
							>
								Cancel
							</button>
						</div>

						{/* Recent Searches */}
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
									Recent Searches
								</h3>
							</div>
							<div className="space-y-4">
								{recentSearches.map((item, idx) => (
									<div
										key={idx}
										className="flex items-center justify-between group"
									>
										<button
											onClick={() => handleSearchSubmit(item)}
											className="flex items-center gap-3 text-left"
										>
											<HistoryIcon size={18} className="text-gray-300" />
											<span className="text-gray-700 font-medium">{item}</span>
										</button>

										<button
											onClick={() => {
												const filtered = recentSearches.filter(
													(_, i) => i !== idx
												);
												setRecentSearches(filtered);
												saveSearches(filtered);
											}}
											className="text-gray-300 hover:text-red-500 transition"
										>
											<X size={16} />
										</button>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* --- HIGH-CONTRAST FLOATING BOTTOM NAV --- */}
			<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] w-[92%] max-w-md md:hidden">
				<div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-2 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-blue-50/50">
					<TabItem to="/" icon={<Home size={22} />} active={isActive("/")} />
					<TabItem
						to="/shop"
						icon={<ShoppingBag size={22} />}
						active={isActive("/shop")}
					/>

					{/* Main Action (Menu Trigger) */}
					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsMenuOpen(true)}
						className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_20px_rgba(37,99,235,0.4)] -translate-y-6 border-[6px] border-white"
					>
						<Menu size={24} strokeWidth={2.5} />
					</motion.button>

					<TabItem
						to="/cart"
						icon={<ShoppingCart size={22} />}
						active={isActive("/cart")}
						badge={cartCount}
					/>
					<TabItem
						to="/dashboard"
						icon={<UserCircle size={22} />}
						active={isActive("/dashboard")}
					/>
				</div>
			</div>

			{/* --- FULL SCREEN SIDE MENU --- */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 28, stiffness: 240 }}
						className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden"
					>
						<div className="p-8 flex justify-between items-center border-b border-gray-50">
							<div className="flex items-center gap-3">
								<img
									src="/logo.jpg"
									alt="Logo"
									className="w-10 h-10 rounded-xl object-contain"
								/>
								<span className="font-black text-xl text-gray-900 tracking-tight">
									Explore
								</span>
							</div>
							<motion.button
								whileTap={{ scale: 0.9 }}
								onClick={() => setIsMenuOpen(false)}
								className="p-3 bg-gray-100 rounded-2xl text-gray-500"
							>
								<X size={24} />
							</motion.button>
						</div>

						<div className="flex-1 px-4 py-6 space-y-2">
							{/* AUTH MENU (Only when logged in) */}
							{seller &&
								authMenuItems.map((item, i) => (
									<motion.div
										key={item.path}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: i * 0.05 }}
									>
										<Link
											to={item.path}
											className={`flex items-center justify-between p-4 rounded-2xl ${
												isActive(item.path)
													? "bg-blue-600 text-white shadow-lg shadow-blue-100"
													: "text-gray-700 hover:bg-gray-50"
											}`}
											onClick={() => setIsMenuOpen(false)}
										>
											<div className="flex items-center gap-4">
												<div
													className={`p-2 rounded-xl ${
														isActive(item.path) ? "bg-white/20" : "bg-gray-100"
													}`}
												>
													<item.icon size={20} />
												</div>
												<span className="font-bold text-lg">{item.label}</span>
											</div>
											<ChevronRight size={18} className="opacity-50" />
										</Link>
									</motion.div>
								))}

							{/* PUBLIC MENU (Always visible) */}
							{menuItems.map((item, i) => (
								<motion.div
									key={item.path}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: (authMenuItems.length + i) * 0.05 }}
								>
									<Link
										to={item.path}
										className={`flex items-center justify-between p-4 rounded-2xl ${
											isActive(item.path)
												? "bg-blue-600 text-white shadow-lg shadow-blue-100"
												: "text-gray-700 hover:bg-gray-50"
										}`}
										onClick={() => setIsMenuOpen(false)}
									>
										<div className="flex items-center gap-4">
											<div
												className={`p-2 rounded-xl ${
													isActive(item.path) ? "bg-white/20" : "bg-gray-100"
												}`}
											>
												<item.icon size={20} />
											</div>
											<span className="font-bold text-lg">{item.label}</span>
										</div>
										<ChevronRight size={18} className="opacity-50" />
									</Link>
								</motion.div>
							))}

							{/* LOGIN CTA (Only when NOT logged in) */}
							{!seller && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="mt-6"
								>
									<button
										onClick={() => {
											setIsMenuOpen(false);
											navigate("/login");
										}}
										className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200"
									>
										<User size={20} />
										Login
									</button>
								</motion.div>
							)}

							{/* LOGOUT (Only when logged in) */}
							{seller && (
								<motion.button
									onClick={() => {
										dispatch(logout());
										toast.success("Logged out");
										setIsMenuOpen(false);
										navigate("/");
									}}
									className="mt-6 w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-red-600 hover:bg-red-50"
								>
									<LogOut size={20} />
									Logout
								</motion.button>
							)}
						</div>

						<div className="p-10 text-center border-t border-gray-50">
							<p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
								© 2024 SAAFI ARIEL
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* SAFE AREA BLUR: Prevents background content from looking messy behind the nav */}
			<div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[40] md:hidden" />

			{/* Spacer for Content */}
			<div
				className={`md:hidden ${
					location.pathname === "/dashboard" ||
					location.pathname.startsWith("/search/")
						? "h-0"
						: "h-16"
				}`}
			/>
		</>
	);
}

function TabItem({ to, icon, active, badge }) {
	return (
		<Link to={to} className="relative p-3">
			<motion.div
				animate={{
					color: active ? "#2563eb" : "#64748b",
					scale: active ? 1.2 : 1,
				}}
				className="relative"
			>
				{icon}
				{active && (
					<motion.div
						layoutId="activePill"
						className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
					/>
				)}
				{badge > 0 && (
					<span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
						{badge}
					</span>
				)}
			</motion.div>
		</Link>
	);
}
