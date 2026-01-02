"use client"

import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Phone, Mail, MapPin, Building2, ShoppingCart, DollarSign, CheckCircle, Clock, Package, Calendar, TrendingUp, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDealers, approveDealer } from "../../redux/slices/dealerSlice"
import { useEffect } from "react"

"use client"

export function DealerDetailsShimmer() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10 animate-pulse">
      {/* Back button */}
      <div className="h-6 w-40 bg-gray-200 rounded mb-8" />

      {/* Header */}
      <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 mb-8 flex gap-6">
        <div className="w-20 h-20 rounded-xl bg-gray-300" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-64 bg-gray-300 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="h-8 w-40 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Dealer info */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
        <div className="h-6 w-56 bg-gray-300 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-6 h-6 bg-gray-300 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-5 w-48 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 border border-gray-200 rounded-xl p-6 space-y-3"
          >
            <div className="h-4 w-28 bg-gray-300 rounded" />
            <div className="h-8 w-20 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* Orders shimmer */}
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="bg-gray-100 border-b border-gray-200 px-8 py-6">
          <div className="h-6 w-48 bg-gray-300 rounded" />
        </div>

        <div className="p-8 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-6 w-full bg-gray-300 rounded" />
                <div className="h-8 w-32 bg-gray-300 rounded-full" />
                <div className="h-4 w-full bg-gray-300 rounded" />
              </div>

              <div className="h-20 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



export default function DealerDetails() {
  const { dealerId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { list: dealers, loading } = useSelector(
    (state) => state.dealers
  )
  useEffect(() => {
    if (dealers.length === 0) {
      dispatch(fetchDealers())
    }
  }, [dispatch, dealers.length])

  if (loading) {
  return <DealerDetailsShimmer/>
}



  const dealer = dealers.find((d) => d._id === dealerId)
  console.log("dealer is -->",dealer)

  if (!dealer) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-10">
        <div className=" mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-6 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Dealers
          </button>
          <div className="bg-red-50 border border-red-200 rounded-xl p-12 text-center">
            <p className="text-red-600 text-lg font-semibold">Dealer not found</p>
          </div>
        </div>
      </div>
    )
  }

  const totalOrders = dealer.orders?.length || 0
  const totalAmount = dealer.orders?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0
  const confirmedOrders = dealer.orders?.filter((o) => o.status === "confirmed")?.length || 0
  const pendingOrders = dealer.orders?.filter((o) => o.status === "pending")?.length || 0
  
  // Calculate total bags and total individual products
  const totalBags = dealer.orders?.reduce((sum, order) => {
    return sum + (order.items?.reduce((itemSum, item) => itemSum + item.qty, 0) || 0)
  }, 0) || 0
  
  const totalProducts = dealer.orders?.reduce((sum, order) => {
    return sum + (order.items?.reduce((itemSum, item) => {
      return itemSum + (item.qty * (item.product?.packSize || 0))
    }, 0) || 0)
  }, 0) || 0
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className=" mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dealers
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 mb-8"
        >
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center font-bold text-white text-2xl">
              {dealer.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{dealer.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{dealer.companyName}</p>
              <div className="inline-block bg-gradient-to-r from-green-100 to-green-200 border border-green-300 px-4 py-2 rounded-full">
                <span className="text-green-800 font-semibold flex items-center gap-2">
                  <CheckCircle size={16} />
                  APPROVED DEALER
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dealer Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dealer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Phone size={24} className="text-blue-700 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Phone</p>
                <p className="text-lg font-medium text-gray-900">{dealer.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail size={24} className="text-blue-700 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
                <p className="text-lg font-medium text-gray-900">{dealer.email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-blue-700 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Address</p>
                <p className="text-lg font-medium text-gray-900">{dealer.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Building2 size={24} className="text-blue-700 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Role</p>
                <p className="text-lg font-medium text-gray-900 capitalize">{dealer.role}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart size={18} className="text-gray-600" />
              <p className="text-gray-600 text-sm font-semibold">TOTAL ORDERS</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-green-600" />
              <p className="text-gray-600 text-sm font-semibold">CONFIRMED</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{confirmedOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-orange-600" />
              <p className="text-gray-600 text-sm font-semibold">PENDING</p>
            </div>
            <p className="text-3xl font-bold text-orange-600">{pendingOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={18} className="text-blue-700" />
              <p className="text-gray-600 text-sm font-semibold">TOTAL AMOUNT</p>
            </div>
            <p className="text-3xl font-bold text-blue-700">₹{totalAmount.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Package size={18} className="text-purple-600" />
              <p className="text-gray-600 text-sm font-semibold">TOTAL PRODUCTS</p>
            </div>
            <p className="text-3xl font-bold text-purple-600">{totalProducts}</p>
            <p className="text-xs text-gray-500 mt-1">{totalBags} bags</p>
          </div>
        </motion.div>

        {/* Account Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calendar size={28} className="text-indigo-700" />
            Account Timeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 border border-indigo-200">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Created Date</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(dealer.createdAt)}</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-indigo-200">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Last Updated</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(dealer.updatedAt)}</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-indigo-200">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Account ID</p>
              <p className="text-sm font-mono text-gray-600 break-all">{dealer._id}</p>
            </div>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingCart size={28} className="text-blue-700" />
              Order Details
            </h2>
          </div>

          {dealer.orders && dealer.orders.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-gray-200"
            >
              {dealer.orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  variants={itemVariants}
                  className="px-8 py-8 hover:bg-blue-50 transition-colors duration-200"
                >
                  {/* Order Header */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order ID</p>
                      <p className="text-sm font-mono text-gray-700 break-all">{order._id}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-blue-700 flex items-center gap-1">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                      <div className="inline-block">
                        {order.status === "confirmed" ? (
                          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2 text-sm">
                            <CheckCircle size={16} />
                            CONFIRMED
                          </div>
                        ) : (
                          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2 text-sm">
                            <Clock size={16} />
                            PENDING
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order Date</p>
                      <p className="text-sm font-medium text-gray-700">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="grid grid-cols-4 gap-4 mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Bags</p>
                      <p className="text-lg font-bold text-gray-900">
                        {order.items?.reduce((sum, item) => sum + item.qty, 0) || 0} bags
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Products</p>
                      <p className="text-lg font-bold text-gray-900">
                        {order.items?.reduce((sum, item) => sum + (item.qty * (item.product?.packSize || 0)), 0) || 0} units
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Items Count</p>
                      <p className="text-lg font-bold text-gray-900">{order.items?.length || 0} types</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Offer ID</p>
                      <p className="text-xs font-mono text-gray-600 break-all">{order.offerId || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Product Items */}
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-3 uppercase">Products in this order:</p>
                    <div className="space-y-3">
                      {order.items?.map((item, idx) => (
                        <div 
                          key={item._id} 
                          className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          {/* Product Image */}
                          {item.product?.imageUrl && (
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            />
                          )}
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">{item.product?.name || 'Product Name'} {item.product?.quantity}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Package size={14} />
                                Pack Size: {item.product?.packSize || 'N/A'} units/bag
                              </span>
                              <span>Product Weight: {item.product?.quantity || 'N/A'}</span>
                            </div>
                            <div className="mt-2 text-sm">
                              <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                                {item.qty} Bags × {item.product?.packSize || 0} = {item.qty * (item.product?.packSize || 0)} Total Units
                              </span>
                            </div>
                          </div>

                          {/* Pricing Info */}
                          <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Price Per Bag</p>
                            <p className="text-lg font-bold text-blue-700">₹{item.price}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Bags: {item.qty} × {item.product.packSize} (pack size) × ₹{item.price} = ₹{(item.qty * item.product.packSize * item.price).toLocaleString('en-IN')}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 font-semibold">
                              Total Products: {item.qty * (item.product?.packSize || 0)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Order #{index + 1}</span>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Order Total</p>
                      <p className="text-2xl font-bold text-blue-700">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="px-8 py-12 text-center">
              <ShoppingCart size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders yet for this dealer</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}