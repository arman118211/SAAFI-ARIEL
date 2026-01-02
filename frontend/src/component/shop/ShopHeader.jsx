"use client"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function ShopHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white mb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative px-6 lg:px-12 py-16 lg:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={24} className="text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-widest">
              Premium Cleaning Solutions
            </span>
            <Sparkles size={24} className="text-yellow-400" />
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
            Discover Our Premium Detergent Collection
          </h1>

          <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Powerful cleaning formulas designed for every surface in your home. Eco-friendly, effective, and affordable
            solutions for spotless results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-900 rounded-full font-bold hover:bg-gray-100 transition-all"
            >
              Shop Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto"
        >
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p className="text-gray-300 text-sm">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">4.9★</p>
            <p className="text-gray-300 text-sm">Average Rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold">100%</p>
            <p className="text-gray-300 text-sm">Eco-Friendly</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
