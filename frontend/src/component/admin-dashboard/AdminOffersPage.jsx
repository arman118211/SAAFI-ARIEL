"use client"

import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Trophy, Clock, Users, TrendingUp, ChevronRight, Award, TicketPercent } from "lucide-react"
import CreateOfferForm from "./OfferFormPage"
import axios from "axios"
import { useDispatch } from "react-redux";
import {setOffers as setOffer, addOffer } from "../../redux/slices/offersSlice";
import toast from "react-hot-toast"

const OfferStatsShimmer = () => (
  <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl p-4 md:p-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
    <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
    <div className="h-8 w-20 bg-gray-400 rounded"></div>
  </div>
);

const OfferCardShimmer = () => (
  <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />

    {/* Image area */}
    <div className="h-32 md:h-40 bg-gray-200"></div>

    <div className="p-4 md:p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>

      <div className="flex justify-between mt-4">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>

      <div className="h-3 bg-gray-200 rounded w-32 mt-3"></div>

      <div className="h-9 bg-gray-300 rounded-lg mt-4"></div>
    </div>
  </div>
);



const AdminOfferPage = () => {
  const dispatch = useDispatch();
  const [offers, setOffers] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  const getAllOffer = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/offers/getAllOffersForAmin`
      );
      dispatch(setOffer(res.data.data));
      setOffers(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch offers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOffer()
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedOfferFor, setSelectedOfferFor] = useState("all");

  // Filter and search logic
  // const filteredOffers = useMemo(() => {
  //   return offers.filter((offer) => {
  //     const matchesSearch =
  //       offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  //     const matchesStatus = selectedStatus === "all" || offer.status === selectedStatus
  //     const matchesCategory =
  //       selectedCategory === "all" || offer.products.some((p) => p.productId.category === selectedCategory)
  //     return matchesSearch && matchesStatus && matchesCategory
  //   })
  // }, [searchTerm, selectedStatus, selectedCategory, offers])
  const filteredOffers = useMemo(() => {
  return offers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || offer.status === selectedStatus;

    const matchesCategory =
      selectedCategory === "all" ||
      offer.products.some(
        (p) => p.productId.category === selectedCategory
      );

    const matchesOfferFor =
      selectedOfferFor === "all" || offer.offerFor === selectedOfferFor;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesOfferFor
    );
  });
}, [searchTerm, selectedStatus, selectedCategory, selectedOfferFor, offers]);


  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set()
    offers.forEach((offer) => {
      offer.products.forEach((p) => {
        cats.add(p.productId.category)
      })
    })
    return Array.from(cats)
  }, [offers])

  // Handle new offer creation
  const handleCreateOffer = async (formData) => {
    const newOffer = {
      ...formData,
      sellerPurchases: [],
      winner: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/offers`,newOffer)
      // console.log("craeted successfully ,",response)
      toast.success("Offer created successfully")
      // console.log("new offewr",newOffer,response.data.offer)
      dispatch(addOffer(response.data.offer))
      setOffers([response.data.offer, ...offers])

    }catch(err){
      // console.log("offer creation failed please try again",err)
      toast.error("Offer creation failed please try again")
    }
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-4 md:p-6 ">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex justify-between items-start md:items-center mb-8 flex-col md:flex-row gap-4">
          <div>
              
            <h1 className="text-3xl md:text-3xl font-bold text-slate-900 mb-2">Offers Management</h1>
            <p className="text-slate-600 text-base md:text-lg">Manage bulk purchase campaigns with confidence</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 md:px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            <Plus size={20} />
            Create Offer
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {isLoading?
          Array.from({ length: 4 }).map((_, i) => <OfferStatsShimmer key={i} />):
          <>
          {[
            { icon: Trophy, label: "Total Offers", value: offers.length, color: "from-blue-500 to-blue-600" },
            {
              icon: Clock,
              label: "Active Offers",
              value: offers.filter((o) => o.status === "active").length,
              color: "from-emerald-500 to-emerald-600",
            },
            {
              icon: Users,
              label: "Total Sellers",
              value: new Set(offers.flatMap((o) => o.sellerPurchases.map((sp) => sp.sellerId._id))).size,
              color: "from-indigo-500 to-indigo-600",
            },
            {
              icon: TrendingUp,
              label: "Total Revenue",
              value: `₹${offers
                .reduce(
                  (sum, o) =>
                    sum +
                    o.sellerPurchases.reduce(
                      (s, sp) => s + sp.orders.reduce((s2, ord) => s2 + ord.orderId.totalAmount, 0),
                      0,
                    ),
                  0,
                )
                .toLocaleString()}`,
              color: "from-amber-500 to-amber-600",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} text-white p-4 md:p-6 rounded-xl shadow-lg`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-medium opacity-90 truncate">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1 truncate">{stat.value}</p>
                </div>
                <stat.icon size={24} className="opacity-40 flex-shrink-0" />
              </div>
            </motion.div>
          ))}
          </>
          }
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8 border border-slate-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all text-sm md:text-base"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-slate-400" size={18} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:outline-none appearance-none transition-all text-sm md:text-base"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-slate-400" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:outline-none appearance-none transition-all text-sm md:text-base"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3 text-slate-400" size={18} />
            <select
              value={selectedOfferFor}
              onChange={(e) => setSelectedOfferFor(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg
                        text-slate-900 focus:border-blue-500 focus:outline-none appearance-none
                        transition-all text-sm md:text-base"
            >
              <option value="all">All Offer Types</option>
              <option value="common">Common</option>
              <option value="retailer">Retailer</option>
              <option value="dealer">Dealer</option>
            </select>
          </div>

        </div>
      </motion.div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {isLoading ?(
          Array.from({ length: 6 }).map((_, i) => <OfferCardShimmer key={i} />)
        ):
        filteredOffers.length > 0 ? (
          filteredOffers.map((offer, idx) => (
            <motion.div
              key={offer._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link to={`/offer/${offer._id}`}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-slate-200 h-full hover:border-blue-400 transform hover:scale-105">
                  {/* Status & Winner Badge */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <span
                      className={`px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold ${
                        offer.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                        ${
                          offer.offerFor === "common"
                            ? "bg-slate-200 text-slate-700"
                            : offer.offerFor === "retailer"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }
                      `}
                    >
                      {offer.offerFor}
                    </span>

                    {offer.winner && (
                      <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max">
                        <Award size={12} />
                        Winner
                      </span>
                    )}
                  </div>

                  {/* Product Preview */}
                  <div className="h-32 md:h-40 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                    <div className="flex h-full items-center justify-center gap-2 p-3 md:p-4">
                      {offer.products.slice(0, 3).map((product, i) => (
                        <motion.img
                          key={i}
                          src={product.productId.imageUrl}
                          alt={product.productId.name}
                          className="w-16 md:w-24 h-16 md:h-24 object-cover rounded-lg shadow-md border-2 border-white"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 mb-4 line-clamp-2">{offer.description}</p>

                    {/* Stats */}
                    <div className="flex justify-between items-center mb-4 pb-4 border-b-2 border-slate-200 gap-2">
                      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                        <span className="font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {offer.products.length}
                        </span>
                        <span className="text-slate-700">Products</span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                        <span className="font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                          {offer.sellerPurchases.length}
                        </span>
                        <span className="text-slate-700">Sellers</span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                      <Clock size={12} />
                      Until {new Date(offer.endDate).toLocaleDateString()}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ gap: 12 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 md:py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm md:text-base"
                    >
                      View Details
                      <ChevronRight size={16} />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <Trophy size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">No offers found matching your criteria</p>
          </div>
        )
        }
      </div>

      {/* Create Offer Modal */}
      {showCreateForm && <CreateOfferForm onClose={() => setShowCreateForm(false)} onSubmit={handleCreateOffer} />}
    </div>
  )
}

export default AdminOfferPage
