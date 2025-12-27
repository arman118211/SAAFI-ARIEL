"use client"

import { useEffect, useState } from "react"
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
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Line } from "recharts"
import ProductPage from "../admin-dashboard/ProductPage"
import AdminOrdersPage from "../admin-dashboard/AdminOrdersPage"
import AdminOffersPage from "../admin-dashboard/AdminOffersPage"
import SellerList from "../admin-dashboard/SellerList"
import axios from "axios"
import SellerProfile from "../SellerProfile"
import { useDispatch,useSelector  } from "react-redux";
import { logout } from "../../redux/slices/authSlice"; 
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";



// --- Mock Data ---
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

const DashboardHome = ({states, salesData, inventoryData, recentData, loading}) => (
  
  <div className="space-y-6 p-4">
    {/* Top Stats Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading? (
        Array.from({ length: 4 }).map((_, i) => <StatCardShimmer key={i} />)
      ) :(
      <>
        <StatCard
          title="Total Revenue"
          value={`₹ ${states.totalRevenue}`}
          trendUp={true}
          icon={DollarSign}
          color="text-blue-600"
        />
        <StatCard
          title="Total Seller"
          value={states.totalSellers}
          trendUp={true}
          icon={Droplets}
          color="text-blue-500"
        />
        <StatCard
          title="Deliverd Orders"
          value={states.deliveredOrders}
          trendUp={false}
          icon={Package}
          color="text-indigo-600"
        />
        <StatCard
          title="Pending Orders"
          value={states.pendingAndConfirmedOrders}
          trend="Action Req"
          trendUp={false}
          icon={AlertCircle}
          color="text-red-600"
        />
      </>
      )
     } 
    </div>

    {/* Main Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {loading?
      (
        <>
          <div className="lg:col-span-2"><ChartShimmer /></div>
          <div className="lg:col-span-1"><ChartShimmer /></div>
        </>
      ) :(
      <>
        <div className="lg:col-span-2">
          <ChartCard title="Sales Velocity (24h)">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e5e7eb",
                    color: "#111827",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#111827" }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="transparent"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="lg:col-span-1">
          <ChartCard title="Inventory Levels">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData} layout="vertical" margin={{ left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e5e7eb",
                    color: "#111827",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </>
      )
      }
    </div>

    {/* Recent Orders Table */}
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-900 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-900 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading?
            (
              Array.from({ length: 5 }).map((_, i) => <TableRowShimmer key={i} />)
            ) :(recentData.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-gray-600">{order.id}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500">{order.product}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${
                      order.status === "Completed"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : order.status === "Processing"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : order.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {order.status === "Completed" && <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />}
                    {order.status === "Processing" && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />}
                    {order.status === "Pending" && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5" />}
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-gray-900">{order.amount}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

const OffersPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">Campaign Management</h2>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm shadow-blue-200">
        <Tag className="w-4 h-4" />
        Create Campaign
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {OFFERS.map((offer) => (
        <div
          key={offer.id}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:border-blue-300 hover:shadow-md transition-all duration-300"
        >
          <div className="relative h-48 bg-gray-100 overflow-hidden">
            <img
              src={offer.image || "/placeholder.svg"}
              alt={offer.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                {offer.discount}
              </span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-900 font-semibold">{offer.title}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                  offer.status === "Active"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : offer.status === "Scheduled"
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {offer.status}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold text-gray-900">{offer.price}</span>
              <span className="text-sm text-gray-400 line-through">{offer.original}</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Sales Generated</span>
                <span>{offer.sales} units</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(offer.sales / 2000) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// --- Main Layout ---

const StatCardShimmer = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
    <div className="flex justify-between mb-4">
      <div className="w-9 h-9 bg-gray-200 rounded-lg" />
      <div className="w-16 h-5 bg-gray-200 rounded-full" />
    </div>
    <div className="h-3 w-28 bg-gray-200 rounded mb-2" />
    <div className="h-7 w-24 bg-gray-300 rounded" />
  </div>
);

const ChartShimmer = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 h-[320px] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
    <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
    <div className="h-full bg-gray-100 rounded-lg" />
  </div>
);

const TableRowShimmer = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4"><div className="h-3 w-24 bg-gray-200 rounded" /></td>
    <td className="px-6 py-4"><div className="h-3 w-32 bg-gray-200 rounded" /></td>
    <td className="px-6 py-4"><div className="h-3 w-28 bg-gray-200 rounded" /></td>
    <td className="px-6 py-4"><div className="h-5 w-20 bg-gray-200 rounded-full" /></td>
    <td className="px-6 py-4 text-right"><div className="h-3 w-20 bg-gray-200 rounded ml-auto" /></td>
  </tr>
);



export default function AdminDashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "dashboard"
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [states, setStates] = useState({})
  const [salesdata,setSalesData] = useState([])
  const [inventoryData,setInventoryData] = useState([])
  const [recentData,setRecentData] = useState([])
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const seller = useSelector((state) => state.auth.seller);
  // console.log("seller--->",seller)

    const getAllStates = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/allStates`)
        setStates(res.data.states)
      }catch(err){
        console.log("something went wrong",err)
      }
    }

    const getSalesData = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/order/getSalesGraphData`)
        // console.log("salesdata",res)
        setSalesData(res.data.salesData)
      }catch(err){
        console.log("something went wrong",err)
      }
    }

    const getInventroryData = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/getInventoryGraphData`)
        // console.log("salesdata",res)
        setInventoryData(res.data.inventoryData)
      }catch(err){
        console.log("something went wrong",err)
      }
    }

    const getRecentData = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/order/getFormateOrder`)
        // console.log("order",res)
        setRecentData(res.data.orders)
      }catch(err){
        console.log("something went wrong",err)
      }
    }


   useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setDashboardLoading(true);
        await Promise.all([
          getAllStates(),
          getSalesData(),
          getInventroryData(),
          getRecentData(),
        ]);
      } finally {
        setDashboardLoading(false);
      }
    };

    loadDashboardData();
  }, []);



  const menuItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    // { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "products", label: "All Products", icon: Package },
    { id: "offers", label: "Offers", icon: Tag },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "customers", label: "Customers", icon: User },
  ]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () =>{
    console.log("logout")
    dispatch(logout());
    toast.success("Log out successfully")
    navigate("/")

  }

  const bottomMenuItems = [
    { id: "profile", label: "Profile", icon: Settings },
    // { id: "security", label: "Security", icon: Shield },
  ]

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
          <Link to='/'>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-200">
              {/* <Droplets className="w-5 h-5 text-white" /> */}
              <img src="/logo.jpg" alt="" className="w-10 h-10" />
            </div>
            <span className="font-bold text-gray-900 tracking-tight text-lg">
              Saafi <span className="text-blue-600">Ariel</span>
            </span>
          </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-8">
          <div>
            <h4 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Platform</h4>
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

          <div>
            <h4 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Configuration</h4>
            <nav className="space-y-1">
              {bottomMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gray-400" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className=" absolute left-0 right-0 p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              AU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{seller.name}</p>
              <p className="text-xs text-gray-500 truncate">{seller.email}</p>
            </div>
            <LogOut 
            onClick={handleLogout}
            className="w-4 h-4 text-gray-400 hover:text-gray-900 cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6 ">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-900">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <span className="hover:text-gray-900 cursor-pointer transition-colors">SaafiAriel</span>
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
        <div className="flex-1  bg-gray-50">
          <div className="mx-auto">


            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "dashboard" ? (
                  <DashboardHome states = {states} salesData = {salesdata} recentData = {recentData} inventoryData = {inventoryData} loading={dashboardLoading} />
                ) :activeTab==="products"? <ProductPage/>
                : activeTab === "orders" ? <AdminOrdersPage/>
                : activeTab === 'customers'? <SellerList/>:
                 activeTab === "offers" ? (
                  <AdminOffersPage />
                ) :activeTab === "profile"?<SellerProfile/> : (
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
