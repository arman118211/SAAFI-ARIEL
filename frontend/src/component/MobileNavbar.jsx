import { useState, useEffect } from "react";
import {
  Menu, X, User, ShoppingCart, ChevronRight, LogOut,
  LayoutDashboard, Phone, ShoppingBag, Sparkles, Info,
  Droplets, Award, Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
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
    return name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";
  };

  const menuItems = [
    { path: "/how-to-wash", label: "Washing Guide", icon: Droplets },
    { path: "/about", label: "Our Journey", icon: Info },
    { path: "/why-choose-us", label: "Quality Standards", icon: Award },
    { path: "/contact", label: "Get in Touch", icon: Phone },
  ];

  if (["/login", "/dashboard"].includes(location.pathname)) return null;

  return (
    <>
      {/* --- TOP BRAND BAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-[45] bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 py-3 flex items-center justify-between md:hidden shadow-sm">
        <Link to="/" className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none tracking-tight text-gray-900">SAAFI</span>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">Ariel</span>
          </div>
        </Link>

        {/* Smart User Icon / Dropdown */}
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
            {seller ? getInitials(seller.name) : <User size={20} strokeWidth={2.5} />}
          </motion.button>

          <AnimatePresence>
            {showUserMenu && seller && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 z-20 overflow-hidden"
                >
                  <Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-2xl text-gray-700">
                    <LayoutDashboard size={18} className="text-blue-600" />
                    <span className="font-semibold text-sm">Dashboard</span>
                  </Link>
                  <button 
                    onClick={() => { dispatch(logout()); setShowUserMenu(false); toast.success("Logged out"); }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-2xl text-red-600 mt-1"
                  >
                    <LogOut size={18} />
                    <span className="font-semibold text-sm">Sign Out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* --- HIGH-CONTRAST FLOATING BOTTOM NAV --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] w-[92%] max-w-md md:hidden">
        <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-2 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-blue-50/50">
          <TabItem to="/" icon={<Home size={22} />} active={isActive("/")} />
          <TabItem to="/shop" icon={<ShoppingBag size={22} />} active={isActive("/shop")} />
          
          {/* Main Action (Menu Trigger) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_20px_rgba(37,99,235,0.4)] -translate-y-6 border-[6px] border-white"
          >
            <Menu size={24} strokeWidth={2.5} />
          </motion.button>

          <TabItem to="/cart" icon={<ShoppingCart size={22} />} active={isActive("/cart")} badge={cartCount} />
          <TabItem to="/new-offer" icon={<Sparkles size={22} />} active={isActive("/new-offer")} />
        </div>
      </div>

      {/* --- FULL SCREEN SIDE MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden"
          >
            <div className="p-8 flex justify-between items-center border-b border-gray-50">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-xl" />
                <span className="font-black text-xl text-gray-900 tracking-tight">Explore</span>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(false)} className="p-3 bg-gray-100 rounded-2xl text-gray-500">
                <X size={24} />
              </motion.button>
            </div>

            <div className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item, i) => (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between p-4 rounded-2xl ${
                      isActive(item.path) ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${isActive(item.path) ? "bg-white/20" : "bg-gray-100"}`}>
                        <item.icon size={20} />
                      </div>
                      <span className="font-bold text-lg">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="opacity-50" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-10 text-center border-t border-gray-50">
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">© 2024 SAAFI ARIEL</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SAFE AREA BLUR: Prevents background content from looking messy behind the nav */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[40] md:hidden" />
      
      {/* Spacer for Content */}
      <div className="h-24 md:hidden" />
    </>
  );
}

function TabItem({ to, icon, active, badge }) {
  return (
    <Link to={to} className="relative p-3">
      <motion.div
        animate={{ 
          color: active ? "#2563eb" : "#64748b",
          scale: active ? 1.2 : 1
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