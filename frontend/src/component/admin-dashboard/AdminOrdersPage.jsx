import React, { useState, useMemo, useEffect } from 'react';
import { Package, User, Calendar, DollarSign, Filter, Search, ChevronDown, CheckCircle, Clock, XCircle, Eye, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { updateOrderStatus as updateStatus } from "../../redux/slices/orderSlice";

const StatsShimmer = () => (
  <div className="bg-white rounded-lg p-4 shadow-md animate-pulse relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
    <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
    <div className="h-7 w-20 bg-gray-300 rounded"></div>
  </div>
);

const OrderCardShimmer = () => (
  <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />

    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-3 bg-gray-200 rounded w-48"></div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-3 mb-3">
      <div className="h-8 bg-gray-200 rounded"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
    </div>

    <div className="h-3 bg-gray-200 rounded w-40"></div>
  </div>
);


const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);


  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const statusOptions = [
    { value: 'all', label: 'All Orders', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'confirmed', label: 'Confirmed', color: 'blue' },
    { value: 'delivered', label: 'Delivered', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ];

  const getAllOrder = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/order/all`);
      setOrders(res.data);
    } catch (err) {
      console.log("something went wrong", err);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getAllOrder()

  }, [])


  const updateOrderStatus = async (orderId, newStatus) => {
    console.log("orderId", orderId, "newStatus", newStatus)
    try {
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/order/status/${orderId}`, {
        status: newStatus
      })
      console.log("updated successfully", res)
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      // dispatch(updateStatus({
      // orderId: orderId,
      // status: newStatus
      // }));
      setStatusMenuOpen(null);


    } catch (err) {
      console.log("something went wrong", err)
    }

  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order.sellerId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.sellerId.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-50 text-amber-700 border-amber-300',
      confirmed: 'bg-blue-50 text-blue-700 border-blue-300',
      delivered: 'bg-emerald-50 text-emerald-700 border-emerald-300',
      cancelled: 'bg-rose-50 text-rose-700 border-rose-300'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0)
  }), [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6 w-full">
      <div className="w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Orders Management
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-sm ml-10">Manage and track all customer orders efficiently</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          {isLoading?
           Array.from({ length: 5 }).map((_, i) => <StatsShimmer key={i} />):(
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-medium">Total</p>
                  <p className="text-2xl font-bold text-gray-800 mt-0.5">{stats.total}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-4 shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-medium">Pending</p>
                  <p className="text-2xl font-bold text-gray-800 mt-0.5">{stats.pending}</p>
                </div>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-medium">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-800 mt-0.5">{stats.confirmed}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg p-4 shadow-md border-l-4 border-emerald-500 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-medium">Delivered</p>
                  <p className="text-2xl font-bold text-gray-800 mt-0.5">{stats.delivered}</p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="col-span-2 md:col-span-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 shadow-md text-white hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-xs font-medium">Revenue</p>
                  <p className="text-2xl font-bold mt-0.5">₹{(stats.totalRevenue / 1000).toFixed(1)}k</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </>
          )}
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-md p-4 mb-5 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by seller name, email, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-3">Filter by Status:</p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setStatusFilter(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === option.value
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Orders List */}
        {isLoading?
        (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <OrderCardShimmer key={i} />
            ))}
          </div>
        )
        :
        <div className="space-y-3">
          <AnimatePresence>
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100"
              >
                <div className="p-4 "
                  onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0">
                        {order.sellerId.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-800 truncate">{order.sellerId.name}</h3>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-0.5">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span className="truncate">{order.sellerId.email}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 flex items-center gap-1.5 shadow-sm ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.toUpperCase()}
                      </span>

                      {/* Status Dropdown Menu */}
                      <div className="relative">
                        <button
                          onClick={() => setStatusMenuOpen(statusMenuOpen === order._id ? null : order._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>

                        <AnimatePresence>
                          {statusMenuOpen === order._id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10 overflow-hidden"
                            >
                              <div className="py-1">
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
                                  Change Status
                                </div>
                                {['pending', 'confirmed', 'delivered', 'cancelled'].map((status) => {
                                  const statusConfig = {
                                    pending: { icon: Clock, color: 'text-amber-600', bg: 'hover:bg-amber-50' },
                                    confirmed: { icon: CheckCircle, color: 'text-blue-600', bg: 'hover:bg-blue-50' },
                                    delivered: { icon: CheckCircle, color: 'text-emerald-600', bg: 'hover:bg-emerald-50' },
                                    cancelled: { icon: XCircle, color: 'text-rose-600', bg: 'hover:bg-rose-50' }
                                  };
                                  const config = statusConfig[status];
                                  const Icon = config.icon;

                                  return (
                                    <button
                                      key={status}
                                      onClick={() => updateOrderStatus(order._id, status)}
                                      disabled={order.status === status}
                                      className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors ${order.status === status
                                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                          : `${config.bg} ${config.color} font-medium`
                                        }`}
                                    >
                                      <Icon className="w-4 h-4" />
                                      {status.charAt(0).toUpperCase() + status.slice(1)}
                                      {order.status === status && (
                                        <span className="ml-auto text-xs">(Current)</span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg mb-3 border border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5 font-medium">Order ID</p>
                      <p className="font-mono text-xs text-gray-800 font-semibold">{order._id.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5 font-medium">Items</p>
                      <p className="font-bold text-sm text-gray-800">{order.totalQty}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5 font-medium">Amount</p>
                      <p className="font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(order.createdAt)}
                  </div>

                  <AnimatePresence>
                    {selectedOrder === order._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200 pt-3 mt-3"
                      >
                        <h4 className="font-bold text-gray-800 mb-2 text-sm">Order Items:</h4>
                        <div className="space-y-2 mb-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2.5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100">
                              <div>
                                <p className="font-semibold text-gray-800 text-xs">{item.productId.name}</p>
                                <p className="text-xs text-gray-600 mt-0.5">{item.qty} {item.productId.unit} × ₹{item.price}</p>
                              </div>
                              <p className="font-bold text-sm text-gray-800">₹{(item.qty * item.price).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>

                        {order.offerId && (
                          <div className="p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                            <p className="text-xs font-bold text-blue-800">🎉 {order.offerId.title}</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Orders Found</h3>
                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for</p>
              </div>
            </motion.div>
          )}
        </div>}
      </div>
    </div>
  );
};

export default AdminOrdersPage;