import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Award,
  Truck,
} from "lucide-react"

const MOCK_ORDERS = [
  {
    _id: "6921fc4febe1d1f217384409",
    sellerId: "691b6cdb54bbb4dcecdb01e3",
    items: [
      {
        productId: {
          _id: "691cadaf1d00cc1b51a5a881",
          name: "Detergent Powder",
          description: "High quality washing powder",
          price: 450,
          unit: "kg",
          stock: 100,
          category: "Detergent",
          imageUrl: "https://example.com/detergent.jpg",
          isActive: true,
          createdAt: "2025-11-18T17:32:31.614Z",
          updatedAt: "2025-11-18T17:32:31.614Z",
          __v: 0,
        },
        qty: 10,
        price: 450,
        _id: "6921fc4febe1d1f21738440a",
      },
      {
        productId: {
          _id: "691cc937414db57fb18eb0c4",
          name: "Organic Basmati Rice",
          description: "Premium long-grain organic basmati rice.",
          price: 120,
          unit: "kg",
          stock: 200,
          category: "Groceries",
          imageUrl: "https://example.com/images/rice.jpg",
          isActive: true,
          createdAt: "2025-11-18T19:29:59.235Z",
          updatedAt: "2025-11-18T19:29:59.235Z",
          __v: 0,
        },
        qty: 50,
        price: 120,
        _id: "6921fc4febe1d1f21738440b",
      },
      {
        productId: {
          _id: "691cc95e414db57fb18eb0c6",
          name: "Fresh Cow Milk",
          description: "Farm-fresh full-cream milk.",
          price: 60,
          unit: "liter",
          stock: 150,
          category: "Dairy",
          imageUrl: "https://example.com/images/milk.jpg",
          isActive: true,
          createdAt: "2025-11-18T19:30:38.784Z",
          updatedAt: "2025-11-18T19:30:38.784Z",
          __v: 0,
        },
        qty: 30,
        price: 60,
        _id: "6921fc4febe1d1f21738440c",
      },
    ],
    totalQty: 90,
    totalAmount: 12300,
    status: "pending",
    offerId: {
      _id: "691ccba7414db57fb18eb0d1",
      title: "Festival Bulk Purchase Offer",
      description: "Buy in bulk and get special festive discounts!",
      products: [
        {
          productId: "691cadaf1d00cc1b51a5a881",
          minQty: 10,
          _id: "691ccba7414db57fb18eb0d2",
        },
        {
          productId: "691cc937414db57fb18eb0c4",
          minQty: 50,
          _id: "691ccba7414db57fb18eb0d3",
        },
        {
          productId: "691cc95e414db57fb18eb0c6",
          minQty: 30,
          _id: "691ccba7414db57fb18eb0d4",
        },
      ],
      startDate: "2025-11-20T00:00:00.000Z",
      endDate: "2025-12-05T23:59:59.999Z",
      status: "active",
      sellerPurchases: [
        {
          sellerId: "691b6cdb54bbb4dcecdb01e3",
          totalQty: 90,
          orders: [
            {
              orderId: "6921fc4febe1d1f217384409",
              qty: 90,
              _id: "6921fc4febe1d1f217384413",
              date: "2025-11-22T18:09:19.822Z",
            },
          ],
          _id: "6921fc4febe1d1f217384412",
        },
      ],
      winner: null,
      createdAt: "2025-11-18T19:40:23.511Z",
      updatedAt: "2025-11-22T18:09:19.824Z",
      __v: 1,
    },
    createdAt: "2025-11-22T18:09:19.792Z",
    updatedAt: "2025-11-22T18:09:19.792Z",
    __v: 0,
  },
]

function Order() {
  const { seller, token } = useSelector((state) => state.auth)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)

  const getorder = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/order/seller/${seller._id}`)
      console.log("response", response.data)
      setOrders(response.data)
      setLoading(false)
    } catch (err) {
      console.log("something went wrong", err)
      console.log("Using mock data for demo purposes")
      setOrders(MOCK_ORDERS)
      setLoading(false)
    }
  }

  useEffect(() => {
    getorder()
  }, [])

  // Calculate statistics
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    pendingOrders: orders.filter((order) => order.status === "pending").length,
    completedOrders: orders.filter((order) => order.status === "completed").length,
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className=" mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedOrders}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-12 text-center"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600">Orders will appear here once customers start purchasing.</p>
            </motion.div>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{order.totalQty} items</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-red-600">₹{order.totalAmount.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                      >
                        {expandedOrder === order._id ? (
                          <ChevronUp className="w-5 h-5 text-gray-700" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-700" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable Order Details */}
                <AnimatePresence>
                  {expandedOrder === order._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-gray-50">
                        {/* Offer Details */}
                        {order.offerId && (
                          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border border-blue-200">
                            <div className="flex items-start gap-3">
                              <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">{order.offerId.title}</h4>
                                <p className="text-sm text-gray-600">{order.offerId.description}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Products Grid */}
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-blue-600" />
                          Order Items
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {order.items.map((item) => (
                            <motion.div
                              key={item._id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                            >
                              <div className="flex gap-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Package className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-semibold text-gray-900 mb-1 truncate">{item.productId.name}</h5>
                                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                    {item.productId.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-sm">
                                      <span className="font-medium text-blue-600">
                                        Qty: {item.qty} {item.productId.unit}
                                      </span>
                                      <span className="text-gray-400">|</span>
                                      <span className="text-gray-600">
                                        ₹{item.price}/{item.productId.unit}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-2 pt-2 border-t border-gray-100">
                                    <p className="text-sm font-semibold text-red-600">
                                      Subtotal: ₹{(item.qty * item.price).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-600">Total Quantity</span>
                            <span className="font-semibold text-gray-900">{order.totalQty} items</span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                            <span className="text-2xl font-bold text-red-600">
                              ₹{order.totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Order
