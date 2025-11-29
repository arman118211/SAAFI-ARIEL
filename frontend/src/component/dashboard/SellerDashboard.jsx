import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  User,
  LogOut,
  Droplets,
  Search,
  Bell,
  Menu,
  X,
  Package,
  DollarSign,
  Activity,
  AlertCircle,
  ChevronRight,
  Filter,
  Download,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  Plus,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import OfferDetailsPage from "../offers/OfferDetailsPage"
import Order from "../seller-dasboared/Order"
import SellerDashboardHome from "../seller-dasboared/SellerDashboardHome"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
// --- Mock Data for Seller ---

const SALES_DATA = [
  { time: "00:00", sales: 4000, orders: 240 },
  { time: "04:00", sales: 3000, orders: 139 },
  { time: "08:00", sales: 2000, orders: 980 },
  { time: "12:00", sales: 2780, orders: 390 },
  { time: "16:00", sales: 1890, orders: 480 },
  { time: "20:00", sales: 2390, orders: 380 },
  { time: "23:59", sales: 3490, orders: 430 },
]

const INVENTORY_DATA = [
  { name: "Liquid", value: 85 },
  { name: "Powder", value: 65 },
  { name: "Pods", value: 45 },
  { name: "Softener", value: 90 },
  { name: "Bleach", value: 30 },
]

const RECENT_ORDERS = [
  {
    id: "ORD-7782",
    customer: "Sarah Johnson",
    product: "Lavender Liquid (5L)",
    status: "Completed",
    amount: "$42.00",
    date: "2m ago",
  },
  {
    id: "ORD-7783",
    customer: "Mike Chen",
    product: "Oxi-Power Powder",
    status: "Processing",
    amount: "$35.50",
    date: "15m ago",
  },
  {
    id: "ORD-7784",
    customer: "Emma Davis",
    product: "Fabric Softener x3",
    status: "Shipped",
    amount: "$28.90",
    date: "1h ago",
  },
  {
    id: "ORD-7785",
    customer: "James Wilson",
    product: "Industrial Bleach",
    status: "Pending",
    amount: "$120.00",
    date: "2h ago",
  },
]

const OFFERS = [
  {
    id: 1,
    title: "Spring Fresh Bundle",
    discount: "25% OFF",
    price: "$24.99",
    original: "$33.99",
    image: "/detergent-bottle-blue.jpg",
    status: "Active",
    sales: 1240,
  },
  {
    id: 2,
    title: "Oxi-Power Mega Pack",
    discount: "BOGO",
    price: "$45.00",
    original: "$90.00",
    image: "/detergent-powder-red.jpg",
    status: "Scheduled",
    sales: 0,
  },
  {
    id: 3,
    title: "Sensitive Skin Liquid",
    discount: "15% OFF",
    price: "$18.50",
    original: "$21.99",
    image: "/detergent-bottle-white.jpg",
    status: "Ending Soon",
    sales: 856,
  },
]

// --- Components ---

const StatCard = ({ title, value, trend, trendUp, icon: Icon, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      {trend && (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${trendUp ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
        >
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
  </div>
)

const ChartCard = ({ title, children, height = "h-64" }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <button className="text-gray-400 hover:text-gray-900 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    <div className={height}>{children}</div>
  </div>
)

const OffersPage = () => (
  <OfferDetailsPage/>
)

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { seller, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("seller-->",seller)

  const menuItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "offers", label: "Offers", icon: Tag },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "profile", label: "Profile", icon: User },

  ]

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex">
      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out shadow-lg lg:shadow-none
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-100 sticky top-0 z-50 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-200">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 tracking-tight text-lg">
              Saafi <span className="text-blue-600">Ariel</span>
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-8">
          <div>
            <h4 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Seller Portal</h4>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  <item.icon className={`w-4 h-4 ${activeTab === item.id ? "text-blue-600" : "text-gray-400"}`} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              SJ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{seller?.name}</p>
              <p className="text-xs text-gray-500 truncate">{seller?.email}</p>
            </div>
            <LogOut className="w-4 h-4 text-gray-400 hover:text-gray-900 cursor-pointer" onClick={handleLogout} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-900">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <span className="hover:text-gray-900 cursor-pointer transition-colors">Saafi Ariel</span>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <span className="text-gray-900 font-medium capitalize">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-100 border border-transparent focus-within:border-blue-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 rounded-lg px-3 py-1.5 w-64 transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-500 w-full"
              />
              <div className="text-xs text-gray-500 border border-gray-200 bg-white rounded px-1.5 py-0.5 shadow-sm">
                ⌘K
              </div>
            </div>
            <button className="relative text-gray-500 hover:text-gray-900 transition-colors p-1.5 hover:bg-gray-100 rounded-md">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize mb-1">{activeTab}</h1>
                <p className="text-gray-500 text-sm">Manage your detergent production and distribution metrics.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors flex items-center gap-2 shadow-sm">
                  <Calendar className="w-4 h-4" />
                  Last 24 Hours
                </button>
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-200 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Buy More Product
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "dashboard" ? (
                  <SellerDashboardHome />
                ) : activeTab === "offers" ? (
                  <OffersPage />
                ) : activeTab === "orders" ? <Order/>: (
                  <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <Activity className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-gray-900 font-medium">Module Under Development</h3>
                    <p className="text-gray-500 text-sm mt-1">This section will be available in the next update.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
