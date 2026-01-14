"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Clock, MapPin, Phone, Mail, Building2, Users, TrendingUp, Search } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { fetchDealers, approveDealer } from "../../redux/slices/dealerSlice"
import ScrollToTop from "../ScrollToTop"



const DealerCardShimmer = () => {
  return (
    <div className="relative overflow-hidden rounded-xl p-6 border-2 border-gray-200 bg-gray-100">
      {/* shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-lg bg-gray-300" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-gray-300 rounded" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-6 w-20 bg-gray-300 rounded-full" />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t pt-4">
        <div className="h-3 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>

      {/* Button */}
      <div className="mt-4 h-10 w-full bg-gray-300 rounded-lg" />
    </div>
  )
}


export default function DealerManagement() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [approvingId, setApprovingId] = useState(null)
  // const [dealers , setDealers] = useState([])
  const dispatch = useDispatch()

  const { list: dealers, loading } = useSelector(
    (state) => state.dealers
  )


  //  const getDealerData = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/seller/auth/getAllSeller`,{
  //         role:"dealer"
  //       }
  //     );
  //     setDealers(res.data.data);
  //   } catch (err) {
  //     console.log("something went wrong", err);
  //   } finally {
  //     console.log("loading false")
  //   }
  // };

  //  useEffect(() => {
  //     getDealerData()
  
  //   }, [])
  useEffect(() => {
    dispatch(fetchDealers())
  }, [dispatch])

  const pendingDealers = dealers.filter((d) => !d.isApproved)
  const approvedDealers = dealers.filter((d) => d.isApproved)

  const filteredPending = pendingDealers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredApproved = approvedDealers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprove = async (dealerId) => {
    try {
      setApprovingId(dealerId)
      await dispatch(approveDealer(dealerId)).unwrap()
      toast.success("Dealer approved successfully")
    } catch {
      toast.error("Failed to approve dealer")
    } finally {
      setApprovingId(null)
    }
  }


  const handleViewDetails = (dealerId) => {
    navigate(`/dealers/${dealerId}`)
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

  const DealerCard = ({ dealer, isPending }) => (
    <motion.div
      variants={itemVariants}
      onClick={() => !isPending && handleViewDetails(dealer._id)}
      className={`rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
        isPending
          ? "bg-gradient-to-br from-orange-50 to-red-50 border-red-200 hover:border-red-400"
          : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400 cursor-pointer"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white ${
              isPending ? "bg-red-600" : "bg-blue-700"
            }`}
          >
            {dealer.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{dealer.name}</h3>
            <p className="text-sm text-gray-600">{dealer.companyName}</p>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
            isPending ? "bg-orange-200 text-orange-800" : "bg-green-200 text-green-800"
          }`}
        >
          {isPending ? (
            <>
              <Clock size={14} />
              PENDING
            </>
          ) : (
            <>
              <CheckCircle size={14} />
              APPROVED
            </>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="flex items-start gap-3">
          <Phone size={18} className={isPending ? "text-red-600" : "text-blue-700"} />
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
            <p className="text-sm font-medium text-gray-800">{dealer.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail size={18} className={isPending ? "text-red-600" : "text-blue-700"} />
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
            <p className="text-sm font-medium text-gray-800">{dealer.email || "Not provided"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin size={18} className={isPending ? "text-red-600" : "text-blue-700"} />
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Address</p>
            <p className="text-sm font-medium text-gray-800">{dealer.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Building2 size={18} className={isPending ? "text-red-600" : "text-blue-700"} />
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Role</p>
            <p className="text-sm font-medium text-gray-800 capitalize">{dealer.role}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4 mb-4">
        <span>
          Registered:{" "}
          {new Date(dealer.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {dealer.orders && (
          <span className="flex items-center gap-1">
            <TrendingUp size={14} />
            {dealer.orders.length} Orders
          </span>
        )}
      </div>

      {isPending && (
        <motion.button
          onClick={() => handleApprove(dealer._id)}
          disabled={approvingId === dealer._id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            approvingId === dealer._id
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:shadow-red-500/30"
          }`}
        >
          {approvingId === dealer._id ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Clock size={18} />
              </motion.div>
              APPROVING...
            </>
          ) : (
            <>
              <CheckCircle size={18} />
              APPROVE DEALER
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <ScrollToTop/>
      <div className=" mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 ">
          <div className="flex items-center gap-3 mb-3">
            {/* <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full">
              <Users size={20} />
              <span className="font-bold">Dealer Management</span>
            </div> */}
          </div>
          <div className="flex items-center gap-3">
            <Users size={40} className="text-blue-700" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900  mb-2">
              Dealer Management
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage and approve new dealer registrations with ease</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL DEALERS</p>
            <p className="text-4xl font-bold text-gray-900">{dealers.length}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">PENDING APPROVAL</p>
            <p className="text-4xl font-bold text-red-600">{pendingDealers.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">APPROVED</p>
            <p className="text-4xl font-bold text-blue-700">{approvedDealers.length}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-2">
            {["all", "pending", "approved"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filterStatus === status
                    ? status === "pending"
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30"
                      : status === "approved"
                        ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg shadow-blue-500/30"
                        : "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {(filterStatus === "all" || filterStatus === "pending") && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={28} className="text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Pending Approval
                <span className="ml-3 text-red-600">({filteredPending.length})</span>
              </h2>
            </div>

            {loading? 
             (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <DealerCardShimmer key={i} />
                ))}
              </div>
            ) :
            filteredPending.length > 0 ? (
              <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={containerVariants}>
                <AnimatePresence>
                  {filteredPending.map((dealer) => (
                    <DealerCard key={dealer._id} dealer={dealer} isPending={true} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center"
              >
                <p className="text-gray-500 text-lg">No pending dealers{searchTerm && " matching your search"}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {(filterStatus === "all" || filterStatus === "approved") && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle size={28} className="text-blue-700" />
              <h2 className="text-3xl font-bold text-gray-900">
                Approved Dealers
                <span className="ml-3 text-blue-700">({filteredApproved.length})</span>
              </h2>
            </div>

            {loading? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <DealerCardShimmer key={i} />
                ))}
              </div>
            ) :
            filteredApproved.length > 0 ? (
              <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={containerVariants}>
                <AnimatePresence>
                  {filteredApproved.map((dealer) => (
                    <DealerCard key={dealer._id} dealer={dealer} isPending={false} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center"
              >
                <p className="text-gray-500 text-lg">No approved dealers{searchTerm && " matching your search"}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
