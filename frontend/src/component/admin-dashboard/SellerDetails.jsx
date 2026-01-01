"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useSelector } from "react-redux";
import { selectSellers } from "../../redux/slices/sellerSlice";
import {
  ArrowLeft,
  Package,
  ShoppingCart,
  User,
  Mail,
  Phone,
  Clock,
  DollarSign,
  Filter,
  ChevronDown,
  ImageIcon,
} from "lucide-react"

export default function SellerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const sellersData = useSelector(selectSellers);
  console.log("seller data==>",sellersData)
  const seller = sellersData.find((s) => s._id === id)
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [expandedOrder, setExpandedOrder] = useState(null)

  if (!seller) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="text-2xl text-red-600 font-bold mb-4">Seller Not Found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Back to Sellers
          </button>
        </motion.div>
      </div>
    )
  }

  const filteredOrders =
    selectedStatus === "all" ? seller.orders : seller.orders.filter((order) => order.status === selectedStatus)

  const stats = {
    totalOrders: seller.orders.length,
    totalRevenue: seller.orders.reduce((sum, order) => sum + order.totalAmount, 0),
    totalItems: seller.orders.reduce((sum, order) => sum + order.totalQty, 0),
    pendingOrders: seller.orders.filter((o) => o.status === "pending").length,
  }

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-red-600 mb-6 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Sellers</span>
        </button>

        {/* Seller Info Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Side */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{seller.name}</h1>
                  <p className="text-blue-100 capitalize">{seller.role}</p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-300" />
                <span>{seller.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-300" />
                <span>{seller.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-300" />
                <span>Joined {new Date(seller.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
      >
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
            </div>
            <ShoppingCart className="w-10 h-10 opacity-30" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 text-white shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Pending Orders</p>
              <p className="text-3xl font-bold mt-2">{stats.pendingOrders}</p>
            </div>
            <Clock className="w-10 h-10 opacity-30" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg p-6 text-white shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Total Items</p>
              <p className="text-3xl font-bold mt-2">{stats.totalItems}</p>
            </div>
            <Package className="w-10 h-10 opacity-30" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg p-6 text-white shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
            </div>
            <DollarSign className="w-10 h-10 opacity-30" />
          </div>
        </motion.div>
      </motion.div>

      {/* Orders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Filter */}
        <div className="mb-6 flex items-center gap-3">
          <Filter className="w-5 h-5 text-blue-600" />
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  selectedStatus === status
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-red-600 hover:shadow-lg transition-all shadow-sm "
              >
                {/* Order Header */}
                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="text-right mr-4">
                    <p className="text-2xl font-bold text-emerald-600 ">₹{order.totalAmount.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">{order.totalQty} items</p>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 transition-transform ${
                      expandedOrder === order._id ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Order Details */}
                {expandedOrder === order._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gray-50 p-6"
                  >
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex-shrink-0">
                            {item.product?.imageUrl ? (
                              <img
                                src={item.product.imageUrl || "/placeholder.svg"}
                                alt={item.product?.name || "Product"}
                                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                onError={(e) => {
                                  e.target.style.display = "none"
                                }}
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <p className="text-gray-900 font-semibold">
                              {item.product?.name || `Product ID: ${item.productId}`}
                            </p>
                           <p className="text-gray-600 text-sm mt-1">
                              Quantity:{" "}
                              <span className="text-blue-600 font-semibold">
                                {item.qty} bag{item.qty > 1 ? "s" : ""} × {item.product?.packSize} pcs
                              </span>
                            </p>
                            <p className="text-gray-500 text-xs">
                              Each packet: {item.product?.quantity}
                            </p>

                            <p className="text-gray-600 text-sm mt-1">
                              Price per packet:{" "}
                              <span className="text-red-600 font-semibold">
                                ₹{item.price.toLocaleString()}
                              </span>
                            </p>

                          </div>

                          <div className="text-right flex-shrink-0 ">
                            <p className="text-lg font-bold text-emerald-600">
                              ₹{(item.qty * item.product?.packSize * item.price).toLocaleString()}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">Subtotal ({item.qty} × {item.product?.packSize} × ₹{item.price})</p>
                          </div>
                        </div>
                      ))}

                      {/* Order Summary */}
                      <div className="bg-gradient-to-r from-blue-50 to-red-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-semibold">Offer ID:</span>
                          <span className="text-blue-600 font-mono text-sm">{order.offerId}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-200">
                          <span className="text-gray-700 font-semibold">Total Amount:</span>
                          <span className="text-emerald-600 font-bold text-lg">
                            ₹{order.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Orders */}
        {filteredOrders.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4 opacity-50" />
            <p className="text-xl text-gray-500">No {selectedStatus !== "all" ? selectedStatus : ""} orders found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
