"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, ChevronDown, Copy, Share2, Zap, Calendar } from "lucide-react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import axios from "axios"
import { useEffect } from "react"


const WinnerStatShimmer = () => (
  <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 shadow-sm relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-3 w-24 bg-slate-200 rounded"></div>
        <div className="h-6 w-16 bg-slate-300 rounded"></div>
      </div>
      <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
    </div>
  </div>
)
const WinnerRowShimmer = () => (
  <div className="border-b border-slate-100 px-4 sm:px-6 py-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
    <div className="grid md:grid-cols-12 gap-4 items-center">
      <div className="col-span-1 h-4 w-4 bg-slate-200 rounded"></div>
      <div className="col-span-11 md:col-span-3 space-y-2">
        <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
        <div className="h-3 w-full bg-slate-100 rounded"></div>
      </div>
      <div className="hidden md:block md:col-span-2 h-5 w-10 bg-slate-200 rounded"></div>
      <div className="hidden md:block md:col-span-2 h-4 w-24 bg-slate-200 rounded"></div>
      <div className="hidden md:block md:col-span-2 h-4 w-20 bg-slate-200 rounded"></div>
      <div className="hidden md:block md:col-span-2 h-6 w-20 bg-slate-200 rounded-full ml-auto"></div>
    </div>
  </div>
)
const WinnerExpandedShimmer = () => (
  <div className="px-4 sm:px-6 py-6 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
    <div className="space-y-4">
      <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
      <div className="h-3 w-full bg-slate-100 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
            <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)







export default function WinnerOffers() {
  const { seller, token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)

  const [offers, setOffers] = useState([])

    const winnerOffers = async () => {
      try {
        if(seller.role === 'admin'){
          const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/offers/admin/offers/winners`
        )
        setOffers(response.data.offers || [])
        return
        }
        
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/offers/seller/winner/${seller._id}`
        )
        setOffers(response.data.offers || [])
      } catch (err) {
        toast.error("Failed to load offers")
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      winnerOffers()
    }, [])

  const [expandedId, setExpandedId] = useState(null)

  const calaulateTotalPrice = (offerFor, product) => {
    console.log(offerFor, product)

  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
      case "upcoming":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30"
      case "closed":
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-500/30"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "Active"
      case "upcoming":
        return "Upcoming"
      case "closed":
        return "Ended"
      default:
        return "Status"
    }
  }

  const getOfferDetails = (offer) => {
    const products = offer.products.map((p) => ({
      name: p.productId?.name || "Unknown Product",
      price: p.productId?.price || 0,
      image: p.productId?.imageUrl || "/placeholder.svg",
      minQty: p.minQty || 1,
    }))
    return products
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  if (!loading && offers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-8">
        <div className="mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Trophy className="w-16 h-16 text-red-600" />
              </motion.div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-2">Your Winning Offers</h1>
            <p className="text-slate-600 text-base sm:text-lg">No winning offers yet. Keep shopping to win!</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
      <div className="mx-auto">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 "
        >
          {loading?(
            Array.from({ length: 3 }).map((_, i) => <WinnerStatShimmer key={i} />)
          ):(
            <>
            <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">Total Items Won</p>
                  <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">{offers.length}</p>
                </div>
                <Zap className="w-8 sm:w-10 h-8 sm:h-10 text-red-600/20" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">Active Offers</p>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
                    {offers.filter((o) => o.status === "active").length}
                  </p>
                </div>
                <Zap className="w-8 sm:w-10 h-8 sm:h-10 text-emerald-600/20" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">Total Products</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                    {offers.reduce((sum, o) => sum + (o.products?.length || 0), 0)}
                  </p>
                </div>
                <Zap className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600/20" />
              </div>
            </div>
          </>
        )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm"
        >
          {/* Table Header - Hide on mobile */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 font-semibold text-slate-700 text-xs uppercase tracking-wide">
            <div className="col-span-1"></div>
            <div className="col-span-3">Offer & Products</div>
            <div className="col-span-2">Count</div>
            <div className="col-span-2">Winner</div>
            <div className="col-span-2">Dates</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* Table Rows */}
          <AnimatePresence>
            {loading? (
              Array.from({ length: 5 }).map((_, i) => <WinnerRowShimmer key={i} />)
            ) :
            offers.map((offer, index) => {
              const products = getOfferDetails(offer)

              return (
                <motion.div
                  key={offer._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Main Row */}
                  <div
                    className="grid md:grid-cols-12 gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 items-start md:items-center cursor-pointer"
                    onClick={() => setExpandedId(expandedId === offer._id ? null : offer._id)}
                  >
                    {/* Expand Icon */}
                    <div className="col-span-1 flex justify-center pt-1">
                      <motion.div
                        animate={{ rotate: expandedId === offer._id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      </motion.div>
                    </div>

                    <div className="col-span-11 md:col-span-3">
                      <p className="font-medium text-slate-900 line-clamp-1 text-sm sm:text-base">{offer.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {products.map((p) => p.name).join(" • ")}
                      </p>
                    </div>

                    {/* Mobile only: show key info in 2 columns below product */}
                    <div className="col-span-11 md:hidden grid grid-cols-2 gap-3 py-2">
                      {/* Product Count */}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Products</p>
                        <p className="text-base sm:text-lg font-bold text-red-600">{products.length}</p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Status</p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(offer.status)}`}
                        >
                          {getStatusBadge(offer.status)}
                        </span>
                      </div>
                    </div>

                    {/* Desktop only columns */}
                    <div className="hidden md:col-span-2 md:block">
                      <p className="text-lg font-bold text-red-600">{products.length}</p>
                      <p className="text-xs text-blue-600 font-medium mt-1">items</p>
                    </div>

                    <div className="hidden md:col-span-2 md:block">
                      <p className="font-medium text-slate-900 text-sm">{offer.winner?.name || "Unknown"}</p>
                      <p className="text-xs text-slate-500 truncate">{offer.winner?.phone || "N/A"}</p>
                    </div>

                    <div className="hidden md:col-span-2 md:block text-sm">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{formatDate(offer.startDate)}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">to {formatDate(offer.endDate)}</div>
                    </div>

                    <div className="hidden md:col-span-2 md:flex justify-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(offer.status)}`}
                      >
                        {getStatusBadge(offer.status)}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details Row */}
                  <AnimatePresence>
                    {expandedId === offer._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                      >
                        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                          {/* Offer Title & Description */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            <div>
                              <label className="text-xs uppercase tracking-wide font-semibold text-slate-600 mb-2 block">
                                Offer Title
                              </label>
                              <p className="text-slate-700 font-medium text-sm sm:text-base">{offer.title}</p>
                            </div>

                            <div>
                              <label className="text-xs uppercase tracking-wide font-semibold text-slate-600 mb-2 block">
                                Created On
                              </label>
                              <p className="text-slate-700 text-xs sm:text-sm">{formatDate(offer.createdAt)}</p>
                            </div>

                            <div>
                              <label className="text-xs uppercase tracking-wide font-semibold text-slate-600 mb-2 block">
                                Total Billing
                              </label>
                              <p className="text-slate-700 text-xs sm:text-sm">₹ {offer.orders[0].totalAmount}</p>
                            </div>
                            
                          </div>

                          <div>
                            <label className="text-xs uppercase tracking-wide font-semibold text-slate-600 mb-2 block">
                              Description
                            </label>
                            <p className="text-slate-700 text-xs sm:text-sm">{offer.description}</p>
                          </div>
                          

                          <div>
                            <label className="text-xs uppercase tracking-wide font-semibold text-slate-600 mb-3 block">
                              Winning Products ({products.length})
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {offer.orders?.map((product, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 flex gap-3"
                                >
                                  {product.items.map((item) => (
                                    <>
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                    <img
                                      src={item.productId.imageUrl || "/placeholder.svg"}
                                      alt={item.productId.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/80x80?text=${encodeURIComponent(product.name.substring(0, 2))}`
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900 line-clamp-1 text-xs sm:text-sm ">
                                      {item.productId.name} {item.productId.quantity}
                                    </p>
                                    <div className="flex flex-col  gap-2 mt-2 flex-wrap">
                                      <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded border border-red-200">
                                        {item.qty} (bags) x {item.productId.packSize} (pics in one bag) x {item.price} (price of one pcs) = ₹ {item.qty * item.productId.packSize * item.price}
                                      </span>
                                      
                                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded border border-blue-200">
                                        Bag: {item.qty}
                                      </span>
                                    </div>
                                  </div>

                                    </>
                                  ))
                                  }

                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Winner & Dates */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-gradient-to-br from-red-50 to-blue-50 border border-red-200 rounded-lg p-3 sm:p-4">
                              <label className="text-xs uppercase tracking-wide font-semibold text-slate-600 mb-2 block">
                                Winner Details
                              </label>
                              <div className="space-y-1">
                                <p className="text-slate-900 font-semibold text-sm sm:text-base">
                                  {offer.winner?.name}
                                </p>
                                <p className="text-xs sm:text-sm text-slate-600 break-all">{offer.winner?.phone}</p>
                              </div>
                            </div>

                            <div className="bg-white border border-blue-200 rounded-lg p-3 sm:p-4">
                              <label className="text-xs uppercase tracking-wide font-semibold text-slate-600 mb-2 block">
                                Offer Duration
                              </label>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-slate-600">
                                  <Calendar className="w-4 h-4 text-blue-500" />
                                  <span className="text-xs sm:text-sm font-medium">{formatDate(offer.startDate)}</span>
                                </div>
                                <div className="text-xs text-slate-400 ml-6">to {formatDate(offer.endDate)}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex gap-2 sm:gap-3 flex-col sm:flex-row">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-xs sm:text-sm hover:from-red-600 hover:to-red-700 transition-all shadow-md flex items-center justify-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            <span>Copy Offer Code</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-xs sm:text-sm hover:from-blue-600 hover:to-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
                          >
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
