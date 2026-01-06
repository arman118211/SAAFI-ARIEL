import { ShoppingCart, ChevronRight } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingCartBadge() {
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty || 0), 0)

  if (totalQty === 0) return null;

  return (
    <AnimatePresence>
      {/* ----------------- MOBILE VIEW (Small Lighter Pill) ----------------- */}
      <motion.div
        initial={{ y: 40, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        exit={{ y: 40, opacity: 0, x: "-50%" }}
        className="fixed bottom-30 left-1/2 z-[60] md:hidden"
      >
        <button
          onClick={() => navigate("/cart")}
          className="
            flex items-center gap-2.5 
            bg-white/90 backdrop-blur-xl 
            text-slate-900 px-3 py-1.5
            rounded-full 
            shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
            border border-slate-200/50
            active:scale-95 transition-transform
          "
        >
          {/* Light Icon Container */}
          <div className="relative flex items-center justify-center bg-blue-50 p-1.5 rounded-full">
            <ShoppingCart className="w-3.5 h-3.5 text-blue-600" strokeWidth={3} />
            {/* Minimalist Red Indicator */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white"></span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold tracking-tight">{totalQty}</span>
            <span className="w-[1px] h-3 bg-slate-200" />
            <span className="text-[12px] text-slate-600 font-semibold">
              ${totalPrice.toFixed(0)}
            </span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400" strokeWidth={3} />
        </button>
      </motion.div>


      {/* ----------------- DESKTOP VIEW (Untouched) ----------------- */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="
          hidden md:block 
          fixed bottom-6 left-1/2 -translate-x-1/2
          z-50 w-[92%] max-w-md
        "
      >
        <div className="absolute inset-0 bg-blue-700/20 rounded-2xl blur-xl " />
        <motion.button
          onClick={() => navigate("/cart")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="
            relative w-full
            flex items-center justify-between gap-4
            bg-gradient-to-r from-blue-700 to-blue-800
            text-white
            px-6 py-4
            rounded-2xl
            shadow-xl
            border border-blue-600/50
            group
            transition-all duration-300
          "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="flex items-center gap-4 relative z-10 flex-1">
            <div className="bg-blue-600/50 p-3 rounded-xl backdrop-blur-sm">
              <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="text-left flex-1">
              <p className="text-base font-semibold leading-tight mb-1">Your Cart</p>
              <div className="flex items-center gap-3 text-sm text-blue-100">
                <span className="flex items-center gap-1.5">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {totalQty} {totalQty === 1 ? "item" : "items"}
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-10 bg-blue-600/50 p-2.5 rounded-lg backdrop-blur-sm group-hover:bg-blue-600/70 transition-colors">
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold min-w-[26px] h-[26px] px-1.5 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20"
          >
            {totalQty}
          </motion.div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}