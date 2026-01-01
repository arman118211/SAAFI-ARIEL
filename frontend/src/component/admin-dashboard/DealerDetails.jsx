"use client"

import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Phone, Mail, MapPin, Building2, ShoppingCart, DollarSign, CheckCircle, Clock } from "lucide-react"
const mockDealers = [
  {
    _id: "69564dfaad4adc555d90fb82",
    name: "Nitesh",
    email: "nitesh@example.com",
    phone: "7458839431",
    companyName: "Arman Enterprise",
    address: "Lucknow Gorakhpur 226010",
    role: "retailer",
    isApproved: true,
    createdAt: "2026-01-01T10:35:38.285Z",
    updatedAt: "2026-01-01T10:35:38.285Z",
    orders: [
      {
        _id: "69567e953466f0b6feb7567a",
        totalAmount: 80,
        status: "pending",
      },
      {
        _id: "69567e953466f0b6feb7567b",
        totalAmount: 150,
        status: "confirmed",
      },
    ],
  },
  {
    _id: "69564dfaad4adc555d90fb83",
    name: "Raj Kumar",
    email: null,
    phone: "9876543210",
    companyName: "Kumar Sales Co.",
    address: "Delhi 110001",
    role: "retailer",
    isApproved: false,
    createdAt: "2026-01-02T08:20:15.125Z",
    updatedAt: "2026-01-02T08:20:15.125Z",
    orders: [],
  },
  {
    _id: "69564dfaad4adc555d90fb84",
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "8765432109",
    companyName: "Singh Distributors",
    address: "Mumbai 400001",
    role: "distributor",
    isApproved: true,
    createdAt: "2025-12-28T14:45:22.890Z",
    updatedAt: "2025-12-28T14:45:22.890Z",
    orders: [
      {
        _id: "69567e953466f0b6feb7567c",
        totalAmount: 500,
        status: "confirmed",
      },
      {
        _id: "69567e953466f0b6feb7567d",
        totalAmount: 300,
        status: "pending",
      },
    ],
  },
  {
    _id: "69564dfaad4adc555d90fb85",
    name: "Amit Patel",
    email: null,
    phone: "7654321098",
    companyName: "Patel Enterprise",
    address: "Bangalore 560001",
    role: "retailer",
    isApproved: false,
    createdAt: "2026-01-01T16:30:45.456Z",
    updatedAt: "2026-01-01T16:30:45.456Z",
    orders: [],
  },
]

export default function DealerDetails({ dealers = mockDealers }) {
  const { dealerId } = useParams()
  const navigate = useNavigate()

  const dealer = dealers.find((d) => d._id === dealerId)

  if (!dealer) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/dealers")}
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
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/dealers")}
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
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL ORDERS</p>
            <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">CONFIRMED</p>
            <p className="text-3xl font-bold text-green-600">{confirmedOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">PENDING</p>
            <p className="text-3xl font-bold text-orange-600">{pendingOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL AMOUNT</p>
            <p className="text-3xl font-bold text-blue-700">₹{totalAmount}</p>
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
                  className="px-8 py-6 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order ID</p>
                      <p className="text-lg font-semibold text-gray-900">{order._id}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Amount</p>
                      <p className="text-lg font-bold text-blue-700 flex items-center gap-1">
                        <DollarSign size={18} />
                        {order.totalAmount}
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

                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order #</p>
                      <p className="text-lg font-semibold text-gray-600">#{index + 1}</p>
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
