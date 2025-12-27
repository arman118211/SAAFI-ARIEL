import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, Users, Package, DollarSign, ChevronRight } from "lucide-react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setSellers, selectSellers } from "../../redux/slices/sellerSlice";

const SellerStatsShimmer = () => (
  <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg p-6 shadow-lg relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
    <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>
    <div className="h-8 w-20 bg-gray-400 rounded"></div>
  </div>
);

const SellerCardShimmer = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />

    <div className="flex justify-between mb-4">
      <div className="space-y-2 w-full">
        <div className="h-5 w-40 bg-gray-200 rounded"></div>
        <div className="h-3 w-56 bg-gray-200 rounded"></div>
      </div>
    </div>

    <div className="h-3 w-32 bg-gray-200 rounded mb-4"></div>

    <div className="space-y-3 mb-6">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded"></div>
    </div>

    <div className="h-9 bg-gray-300 rounded-lg"></div>
  </div>
);


export default function SellerList() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
   const dispatch = useDispatch();
  const [sellersData, setSellerData] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  const getSellerData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/seller/auth/getAllSeller`
      );
      setSellerData(res.data.data);
      dispatch(setSellers(res.data.data));
    } catch (err) {
      console.log("something went wrong", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSellerData()

  }, [])



  const filteredSellers = sellersData.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const calculateStats = (seller) => {
    const totalOrders = seller.orders.length
    const totalAmount = seller.orders.reduce((sum, order) => sum + order.totalAmount, 0)
    const totalItems = seller.orders.reduce((sum, order) => sum + order.totalQty, 0)
    return { totalOrders, totalAmount, totalItems }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-8 h-8 text-blue-700" />
          <h1 className="text-3xl font-bold text-gray-900">Seller Management</h1>
        </div>
        <p className="text-blue-700 text-md">Manage and track all your sellers and their orders</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
          <input
            type="text"
            placeholder="Search by seller name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 rounded-lg bg-white border-2 border-blue-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors duration-300 shadow-sm"
          />
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
      >
       { isLoading?
        (
        Array.from({ length: 3 }).map((_, i) => <SellerStatsShimmer key={i} />)
      ):
      <>
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Sellers</p>
              <p className="text-3xl font-bold mt-2">{filteredSellers.length}</p>
            </div>
            <Users className="w-10 h-10 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{filteredSellers.reduce((sum, s) => sum + s.orders.length, 0)}</p>
            </div>
            <Package className="w-10 h-10 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">
                ₹
                {(
                  filteredSellers.reduce((sum, s) => sum + s.orders.reduce((os, o) => os + o.totalAmount, 0), 0) /
                  100000
                ).toFixed(1)}
                L
              </p>
            </div>
            <DollarSign className="w-10 h-10 opacity-50" />
          </div>
        </div>
      </>
        }
      </motion.div>

      {/* Sellers Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >{isLoading?(
          Array.from({ length: 6 }).map((_, i) => <SellerCardShimmer key={i} />)
        ) :(
        filteredSellers.map((seller) => {
          const stats = calculateStats(seller)
          return (
            <motion.div
              key={seller._id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/seller/${seller._id}`)}
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-red-600 hover:shadow-xl transition-all duration-300 h-full shadow-md">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {seller.name}
                    </h3>
                    <p className="text-blue-600 text-sm mt-1">{seller.email}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-600 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all" />
                </div>

                {/* Contact */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-blue-700">Phone:</span> {seller.phone}
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Orders</span>
                    <span className="font-bold text-blue-600">{stats.totalOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Items Sold</span>
                    <span className="font-bold text-red-600">{stats.totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Revenue</span>
                    <span className="font-bold text-emerald-600">₹{stats.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105">
                  View Details
                </button>
              </div>
            </motion.div>
          )
        }))
        }
      </motion.div>

      {/* No Results */}
      {filteredSellers.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4 opacity-50" />
          <p className="text-xl text-gray-500">No sellers found</p>
        </motion.div>
      )}
    </div>
  )
}
