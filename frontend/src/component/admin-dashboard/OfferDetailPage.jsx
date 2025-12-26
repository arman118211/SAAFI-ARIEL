

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Trophy, Phone, Mail, User, Package, Calendar, Award, ChevronDown, ChevronUp, X } from "lucide-react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {selectOffers , setOffers} from "../../redux/slices/offersSlice";
import axios from "axios"

// const mockOffers = [
//   {
//     _id: "691ccba7414db57fb18eb0d1",
//     title: "Festival Bulk Purchase Offer",
//     description: "Buy in bulk and get special festive discounts!",
//     products: [
//       {
//         productId: {
//           _id: "691cadaf1d00cc1b51a5a881",
//           name: "Detergent Powder",
//           price: 450,
//           unit: "kg",
//           stock: 100,
//           category: "Detergent",
//           imageUrl: "https://www.saafiariel.com/product/a1.jpg",
//         },
//         minQty: 10,
//         _id: "691ccba7414db57fb18eb0d2",
//       },
//       {
//         productId: {
//           _id: "691cc937414db57fb18eb0c4",
//           name: "Organic Basmati Rice",
//           price: 120,
//           unit: "kg",
//           stock: 200,
//           category: "Groceries",
//           imageUrl: "https://example.com/images/rice.jpg",
//         },
//         minQty: 50,
//         _id: "691ccba7414db57fb18eb0d3",
//       },
//       {
//         productId: {
//           _id: "691cc95e414db57fb18eb0c6",
//           name: "Fresh Cow Milk",
//           price: 60,
//           unit: "liter",
//           stock: 150,
//           category: "Dairy",
//           imageUrl: "https://example.com/images/milk.jpg",
//         },
//         minQty: 30,
//         _id: "691ccba7414db57fb18eb0d4",
//       },
//     ],
//     startDate: "2025-11-20T00:00:00.000Z",
//     endDate: "2025-12-05T23:59:59.999Z",
//     status: "active",
//     sellerPurchases: [
//       {
//         sellerId: {
//           _id: "691b6cdb54bbb4dcecdb01e3",
//           name: "Rohit Sharma",
//           email: "rohit@gmail.com",
//           phone: "9876543210",
//         },
//         totalQty: 180,
//         orders: [
//           {
//             orderId: {
//               _id: "6921fc4febe1d1f217384409",
//               totalAmount: 12300,
//             },
//             qty: 90,
//             _id: "6921fc4febe1d1f217384413",
//             date: "2025-11-22T18:09:19.822Z",
//           },
//           {
//             orderId: {
//               _id: "69233068bc45dc9c46694609",
//               totalAmount: 12300,
//             },
//             qty: 90,
//             _id: "69233068bc45dc9c46694614",
//             date: "2025-11-23T16:03:52.522Z",
//           },
//         ],
//         _id: "6921fc4febe1d1f217384412",
//       },
//       {
//         sellerId: {
//           _id: "691b6d4054bbb4dcecdb01e6",
//           name: "MD Arman",
//           email: "arman@gmail.com",
//           phone: "7458839431",
//         },
//         totalQty: 90,
//         orders: [
//           {
//             orderId: {
//               _id: "6927580a2ca77e9b2ca50660",
//               totalAmount: 12300,
//             },
//             qty: 90,
//             _id: "6927580a2ca77e9b2ca5066d",
//             date: "2025-11-26T19:42:02.837Z",
//           },
//         ],
//         _id: "6927580a2ca77e9b2ca5066c",
//       },
//     ],
//     winner: null,
//     createdAt: "2025-11-18T19:40:23.511Z",
//     updatedAt: "2025-11-26T19:42:02.843Z",
//   },
//   {
//     _id: "691ccbf4414db57fb18eb0d7",
//     title: "Win iPhone 16 on these products",
//     description: "Buy in bulk and get special festive discounts!",
//     products: [
//       {
//         productId: {
//           _id: "691cc95e414db57fb18eb0c6",
//           name: "Fresh Cow Milk",
//           price: 60,
//           unit: "liter",
//           stock: 150,
//           category: "Dairy",
//           imageUrl: "https://example.com/images/milk.jpg",
//         },
//         minQty: 30,
//         _id: "691ccbf4414db57fb18eb0d8",
//       },
//     ],
//     startDate: "2025-11-20T00:00:00.000Z",
//     endDate: "2025-12-05T23:59:59.999Z",
//     status: "active",
//     sellerPurchases: [
//       {
//         sellerId: {
//           _id: "691b6cdb54bbb4dcecdb01e3",
//           name: "Rohit Sharma",
//           email: "rohit@gmail.com",
//           phone: "9876543210",
//         },
//         totalQty: 30,
//         orders: [
//           {
//             orderId: {
//               _id: "69220458ebe1d1f2173844a0",
//               totalAmount: 1800,
//             },
//             qty: 30,
//             _id: "69220458ebe1d1f2173844a6",
//             date: "2025-11-22T18:43:36.753Z",
//           },
//         ],
//         _id: "69220458ebe1d1f2173844a5",
//       },
//     ],
//     winner: null,
//     createdAt: "2025-11-18T19:41:40.725Z",
//     updatedAt: "2025-11-22T18:43:36.755Z",
//   },
// ]

const OfferDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [expandedSeller, setExpandedSeller] = useState(null)
  const [selectedWinner, setSelectedWinner] = useState(null)
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [isAutoSelecting, setIsAutoSelecting] = useState(false)
  const offers = useSelector(selectOffers)

  const [mockOffers, setmockOffers] = useState(offers ?? [])
  // const mockOffers = useSelector(selectOffers);
  console.log("offers ==>",offers)
  console.log("mock offer",mockOffers)

   useEffect(() => {
    const getAllOffer = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/offers/getAllOffersForAmin`
      )
      dispatch(setOffers(res.data.data))
      setmockOffers(res.data.data)
    }

    getAllOffer()
  }, [])

const offer = mockOffers.find((o) => o._id === id);

useEffect(() => {
    if (offer?.winner && offer?.sellerPurchases?.length) {
      const seller = offer.sellerPurchases.find(
        item => item.sellerId._id === offer.winner
      )
      setSelectedWinner(seller || null)
    }
  }, [offer])
  
  if (!mockOffers.length) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-xl font-semibold text-slate-600">Loading offer...</p>
    </div>
  );
}


console.log("original offer==>",offer)

// If offer not found yet
if (!offer) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-xl font-semibold text-red-600">Offer not found...</p>
    </div>
  );
}


  console.log("offer==>",offer)

  const totalRevenue = offer.sellerPurchases.reduce(
    (sum, sp) => sum + sp.orders.reduce((s, ord) => s + ord.orderId.totalAmount, 0),
    0,
  )

  const handleSelectWinner = async (seller) => {
    console.log("winner seller data ==>",seller)
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/offers/winner/${offer._id}`,{
        winnerId:seller.sellerId._id
      })
      console.log("winner declare successfully")
      setSelectedWinner(seller)
      setShowWinnerModal(false)

    }catch(err){
      console.log("Winner declaration failed ,please try again")
    }
    
  }

  const handleAutoSelectWinner = () => {
    setIsAutoSelecting(true)

    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = Math.floor(Math.random() * offer.sellerPurchases.length)
      setSelectedWinner(offer.sellerPurchases[currentIndex])
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      const randomIndex = Math.floor(Math.random() * offer.sellerPurchases.length)
      setSelectedWinner(offer.sellerPurchases[randomIndex])
      setIsAutoSelecting(false)
    }, 2000)
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-4 md:p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors text-sm md:text-base"
        >
          <ArrowLeft size={20} />
          Back to Offers
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200"
          >
            <div className="h-32 md:h-48 bg-gradient-to-r from-blue-200 to-indigo-200 relative overflow-hidden">
              <div className="flex h-full items-center justify-center gap-2 md:gap-4 p-3 md:p-6">
                {offer.products.slice(0, 3).map((product, i) => (
                  <motion.img
                    key={i}
                    src={product.productId.imageUrl}
                    alt={product.productId.name}
                    className="w-20 md:w-32 h-20 md:h-32 object-cover rounded-lg md:rounded-xl shadow-lg border-4 border-white"
                  />
                ))}
              </div>
              <div className="absolute top-3 md:top-4 right-3 md:right-4">
                <span
                  className={`px-4 md:px-6 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold ${
                    offer.status === "active" ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"
                  }`}
                >
                  {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-4 md:p-8">
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-4">{offer.title}</h1>
              <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8">{offer.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-blue-50 p-3 md:p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2 text-sm md:text-base">
                    <Calendar size={18} />
                    Start Date
                  </div>
                  <p className="text-slate-900 font-bold text-base md:text-lg">
                    {new Date(offer.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="bg-indigo-50 p-3 md:p-4 rounded-xl border border-indigo-200">
                  <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2 text-sm md:text-base">
                    <Calendar size={18} />
                    End Date
                  </div>
                  <p className="text-slate-900 font-bold text-base md:text-lg">
                    {new Date(offer.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-4 md:p-8 border border-slate-200"
          >
            <h2 className="text-lg md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2">
              <Package size={24} className="text-blue-600" />
              Products ({offer.products.length})
            </h2>
            <div className="space-y-3 md:space-y-4">
              {offer.products.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-50 p-4 md:p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <img
                      src={product.productId.imageUrl || "/placeholder.svg"}
                      alt={product.productId.name}
                      className="w-full md:w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-xl font-bold text-slate-900 mb-3 md:mb-2">
                        {product.productId.name}
                      </h3>
                      <div className="grid grid-cols-3 gap-2 md:gap-4">
                        <div>
                          <p className="text-xs md:text-sm text-slate-600 font-semibold">Price</p>
                          <p className="text-lg md:text-2xl font-bold text-blue-600">₹{product.productId.price}</p>
                          <p className="text-xs text-slate-500">per {product.productId.unit}</p>
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-slate-600 font-semibold">Min Qty</p>
                          <p className="text-lg md:text-2xl font-bold text-indigo-600">{product.minQty}</p>
                          <p className="text-xs text-slate-500">{product.productId.unit}</p>
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-slate-600 font-semibold">Stock</p>
                          <p className="text-lg md:text-2xl font-bold text-emerald-600">{product.productId.stock}</p>
                          <p className="text-xs text-slate-500">available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md p-6"
          >
            <h3 className="text-sm font-semibold opacity-90 mb-4 md:mb-6">Offer Summary</h3>
            <div className="space-y-4 md:space-y-5">
              <div>
                <p className="text-blue-100 text-xs md:text-sm mb-1">Total Sellers</p>
                <p className="text-3xl md:text-4xl font-bold">{offer.sellerPurchases.length}</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs md:text-sm mb-1">Total Orders</p>
                <p className="text-3xl md:text-4xl font-bold">
                  {offer.sellerPurchases.reduce((sum, sp) => sum + sp.orders.length, 0)}
                </p>
              </div>
              <div>
                <p className="text-blue-100 text-xs md:text-sm mb-1">Total Revenue</p>
                <p className="text-2xl md:text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs md:text-sm mb-1">Total Quantity</p>
                <p className="text-2xl md:text-3xl font-bold">
                  {offer.sellerPurchases.reduce((sum, sp) => sum + sp.totalQty, 0)} units
                </p>
              </div>
            </div>
          </motion.div>

          {selectedWinner ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-2xl shadow-md p-6"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Trophy size={24} />
                <h3 className="text-xl md:text-2xl font-bold">Winner Selected!</h3>
              </div>
              <div className="bg-white/20 backdrop-blur p-4 md:p-6 rounded-xl mb-4">
                <p className="text-sm opacity-90 mb-2">Winner</p>
                <p className="text-xl md:text-2xl font-bold mb-3">{selectedWinner.sellerId.name}</p>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {selectedWinner.sellerId.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {selectedWinner.sellerId.phone}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedWinner(null)}
                  className="bg-white/20 hover:bg-white/30 py-2 rounded-lg font-semibold transition-colors text-xs md:text-sm"
                >
                  Change Winner
                </button>
                <button
                  onClick={handleAutoSelectWinner}
                  disabled={isAutoSelecting}
                  className="bg-white/20 hover:bg-white/30 disabled:opacity-50 py-2 rounded-lg font-semibold transition-colors text-xs md:text-sm"
                >
                  {isAutoSelecting ? "Selecting..." : "Re-Select Auto"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <motion.button
                onClick={() => setShowWinnerModal(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 md:py-4 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <Trophy size={20} />
                Select Winner Manually
              </motion.button>

              <motion.button
                onClick={handleAutoSelectWinner}
                disabled={isAutoSelecting}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-indigo-400 disabled:to-indigo-500 text-white py-3 md:py-4 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <motion.div
                  animate={isAutoSelecting ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.6, repeat: isAutoSelecting ? Number.POSITIVE_INFINITY : 0 }}
                >
                  <Trophy size={20} />
                </motion.div>
                {isAutoSelecting ? "Selecting Winner..." : "Select Winner Auto"}
              </motion.button>
            </motion.div>
          )}

          <div className="bg-white rounded-2xl shadow-md p-4 md:p-8 border border-slate-200">
            <h3 className="text-base md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User size={22} className="text-blue-600" />
              Participating Sellers
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {offer.sellerPurchases.map((seller, idx) => (
                <motion.div
                  key={seller._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`${
                    selectedWinner?._id === seller._id
                      ? "bg-amber-50 border-2 border-amber-400"
                      : "bg-slate-50 border border-slate-200"
                  } p-3 md:p-4 rounded-xl cursor-pointer hover:shadow-md transition-all`}
                  onClick={() => setExpandedSeller(expandedSeller === seller._id ? null : seller._id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 text-sm md:text-base truncate">{seller.sellerId.name}</p>
                      <p className="text-xs md:text-sm text-slate-600 truncate">{seller.sellerId.email}</p>
                      <div className="flex gap-2 mt-2 text-xs flex-wrap">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                          {seller.totalQty} qty
                        </span>
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold">
                          {seller.orders.length} orders
                        </span>
                      </div>
                    </div>
                    {expandedSeller === seller._id ? (
                      <ChevronUp size={18} className="text-slate-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-600 flex-shrink-0" />
                    )}
                  </div>

                  {expandedSeller === seller._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-slate-300"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-700 text-sm">
                          <Phone size={16} />
                          {seller.sellerId.phone}
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-slate-600 mb-2">Orders:</p>
                          <div className="space-y-2">
                            {seller.orders.map((order) => (
                              <div key={order._id} className="bg-white p-2 rounded text-xs border border-slate-200">
                                <p className="font-semibold text-slate-800">Order ID: {order.orderId._id}</p>
                                <div className="flex justify-between mt-1">
                                  <span>{order.qty} qty</span>
                                  <span className="font-bold text-blue-600">₹{order.orderId.totalAmount}</span>
                                </div>
                                <p className="text-slate-500 mt-1">{new Date(order.date).toLocaleDateString()}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {!selectedWinner || selectedWinner._id !== seller._id ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectWinner(seller)
                          }}
                          className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
                        >
                          <Award size={16} className="inline mr-2" />
                          Select as Winner
                        </motion.button>
                      ) : null}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showWinnerModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowWinnerModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <Trophy size={24} />
                Select a Winner
              </h2>
              <button
                onClick={() => setShowWinnerModal(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {offer.sellerPurchases.map((seller) => (
                <motion.button
                  key={seller._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectWinner(seller)}
                  className="w-full p-4 rounded-xl border-2 bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-base md:text-lg">{seller.sellerId.name}</p>
                      <p className="text-xs md:text-sm text-slate-600">{seller.sellerId.email}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        Total: {seller.totalQty} qty | {seller.orders.length} orders
                      </p>
                    </div>
                    <Trophy size={24} className="text-amber-500" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default OfferDetailPage
