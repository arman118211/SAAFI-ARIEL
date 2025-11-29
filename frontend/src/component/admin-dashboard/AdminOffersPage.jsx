import React, { useState, useMemo } from 'react';
import { Gift, Plus, Search, Filter, ChevronDown, Edit2, Trash2, Eye, Calendar, Package, Users, Trophy, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminOffersPage = () => {
  const [offers, setOffers] = useState([
    {
      "_id": "691ccba7414db57fb18eb0d1",
      "title": "Festival Bulk Purchase Offer",
      "description": "Buy in bulk and get special festive discounts!",
      "products": [
        {
          "productId": {
            "_id": "691cadaf1d00cc1b51a5a881",
            "name": "Detergent Powder",
            "price": 450,
            "unit": "kg",
            "category": "Detergent"
          },
          "minQty": 10
        },
        {
          "productId": {
            "_id": "691cc937414db57fb18eb0c4",
            "name": "Organic Basmati Rice",
            "price": 120,
            "unit": "kg",
            "category": "Groceries"
          },
          "minQty": 50
        },
        {
          "productId": {
            "_id": "691cc95e414db57fb18eb0c6",
            "name": "Fresh Cow Milk",
            "price": 60,
            "unit": "liter",
            "category": "Dairy"
          },
          "minQty": 30
        }
      ],
      "startDate": "2025-11-20T00:00:00.000Z",
      "endDate": "2025-12-05T23:59:59.999Z",
      "status": "active",
      "sellerPurchases": [
        {
          "sellerId": "691b6cdb54bbb4dcecdb01e3",
          "totalQty": 180
        },
        {
          "sellerId": "691b6d4054bbb4dcecdb01e6",
          "totalQty": 90
        }
      ],
      "winner": null,
      "createdAt": "2025-11-18T19:40:23.511Z"
    },
    {
      "_id": "691ccbf4414db57fb18eb0d7",
      "title": "Win iPhone 16 on these products",
      "description": "Buy in bulk and get special festive discounts!",
      "products": [
        {
          "productId": {
            "_id": "691cc95e414db57fb18eb0c6",
            "name": "Fresh Cow Milk",
            "price": 60,
            "unit": "liter",
            "category": "Dairy"
          },
          "minQty": 30
        }
      ],
      "startDate": "2025-11-20T00:00:00.000Z",
      "endDate": "2025-12-05T23:59:59.999Z",
      "status": "active",
      "sellerPurchases": [
        {
          "sellerId": "691b6cdb54bbb4dcecdb01e3",
          "totalQty": 30
        }
      ],
      "winner": null,
      "createdAt": "2025-11-18T19:41:40.725Z"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  const statusOptions = [
    { value: 'all', label: 'All Offers' },
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
    { value: 'upcoming', label: 'Upcoming' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-300',
      expired: 'bg-gray-50 text-gray-700 border-gray-300',
      upcoming: 'bg-blue-50 text-blue-700 border-blue-300'
    };
    return colors[status] || colors.active;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalParticipants = (offer) => {
    return offer.sellerPurchases?.length || 0;
  };

  const getTotalOrders = (offer) => {
    return offer.sellerPurchases?.reduce((sum, seller) => sum + seller.totalQty, 0) || 0;
  };

  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      const matchesSearch = 
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [offers, searchTerm, statusFilter]);

  const stats = useMemo(() => ({
    total: offers.length,
    active: offers.filter(o => o.status === 'active').length,
    expired: offers.filter(o => o.status === 'expired').length,
    totalParticipants: offers.reduce((sum, o) => sum + getTotalParticipants(o), 0)
  }), [offers]);

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const openEditModal = (offer) => {
    setModalMode('edit');
    setFormData({
      id: offer._id,
      title: offer.title,
      description: offer.description,
      startDate: offer.startDate.split('T')[0],
      endDate: offer.endDate.split('T')[0],
      status: offer.status
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      alert('Please fill all required fields');
      return;
    }

    if (modalMode === 'create') {
      const newOffer = {
        _id: Date.now().toString(),
        ...formData,
        products: [],
        sellerPurchases: [],
        winner: null,
        createdAt: new Date().toISOString()
      };
      setOffers([newOffer, ...offers]);
    } else {
      setOffers(offers.map(offer => 
        offer._id === formData.id ? { ...offer, ...formData } : offer
      ));
    }
    setShowModal(false);
  };

  const deleteOffer = (offerId) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(offer => offer._id !== offerId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Offers Management
                </h1>
              </div>
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-lg hover:from-red-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Create Offer
            </button>
          </div>
          <p className="text-gray-600 text-sm ml-10">Create and manage promotional offers</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Total Offers</p>
                <p className="text-2xl font-bold text-gray-800 mt-0.5">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-4 shadow-md border-l-4 border-emerald-500 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Active</p>
                <p className="text-2xl font-bold text-gray-800 mt-0.5">{stats.active}</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Trophy className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-4 shadow-md border-l-4 border-gray-400 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Expired</p>
                <p className="text-2xl font-bold text-gray-800 mt-0.5">{stats.expired}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-red-500 via-rose-500 to-blue-600 rounded-lg p-4 shadow-md text-white hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-xs font-medium">Participants</p>
                <p className="text-2xl font-bold mt-0.5">{stats.totalParticipants}</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-md p-4 mb-5 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search offers by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
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
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          statusFilter === option.value
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

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredOffers.map((offer, index) => (
              <motion.div
                key={offer._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-800 mb-1 truncate">{offer.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusColor(offer.status)}`}>
                        {offer.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={() => openEditModal(offer)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteOffer(offer._id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{offer.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Package className="w-3 h-3 text-blue-600" />
                        <p className="text-xs font-medium text-gray-600">Products</p>
                      </div>
                      <p className="text-lg font-bold text-gray-800">{offer.products.length}</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Users className="w-3 h-3 text-emerald-600" />
                        <p className="text-xs font-medium text-gray-600">Sellers</p>
                      </div>
                      <p className="text-lg font-bold text-gray-800">{getTotalParticipants(offer)}</p>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="p-2.5 bg-gray-50 rounded-lg mb-3 border border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="text-gray-500 mb-0.5">Start Date</p>
                        <p className="font-semibold text-gray-800">{formatDate(offer.startDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 mb-0.5">End Date</p>
                        <p className="font-semibold text-gray-800">{formatDate(offer.endDate)}</p>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedOffer(selectedOffer === offer._id ? null : offer._id)}
                    className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    {selectedOffer === offer._id ? 'Hide Details' : 'View Details'}
                  </button>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {selectedOffer === offer._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200 pt-3 mt-3"
                      >
                        <h4 className="font-bold text-gray-800 mb-2 text-sm">Products in Offer:</h4>
                        <div className="space-y-2">
                          {offer.products.map((product, idx) => (
                            <div key={idx} className="p-2.5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100">
                              <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-800 text-xs truncate">{product.productId.name}</p>
                                  <p className="text-xs text-gray-600 mt-0.5">Min Qty: {product.minQty} {product.productId.unit}</p>
                                </div>
                                <p className="font-bold text-sm text-blue-600 ml-2">₹{product.productId.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredOffers.length === 0 && (
            <div className="col-span-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Offers Found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={openCreateModal}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-lg hover:from-red-600 hover:to-blue-700 transition-all shadow-md text-sm font-semibold"
                >
                  Create Your First Offer
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {modalMode === 'create' ? 'Create New Offer' : 'Edit Offer'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Offer Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                      placeholder="Enter offer title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                      placeholder="Enter offer description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-lg hover:from-red-600 hover:to-blue-700 transition-all shadow-lg text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {modalMode === 'create' ? 'Create Offer' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOffersPage;