"use client"
import { Filter, ChevronDown, List, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductFilter({ onFilterChange, onSortChange }) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const filters = [
    { label: "All Products", value: "all" },
    { label: "Detergent", value: "Detergent" },
    { label: "Dishwashing", value: "dishwashing" },
    { label: "Surface Cleaner", value: "surface" },
    { label: "On Sale", value: "sale" },
  ]

  const sorts = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Most Popular", value: "popular" },
  ]

  const activeLabel = filters.find(f => f.value === activeFilter)?.label

  return (
    <div className="mb-8">
      {/* MOBILE VIEW: Single Row with Icon Buttons */}
      <div className="flex lg:hidden items-center gap-2 w-full py-4">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex-1 flex items-center justify-between bg-white border border-gray-200 p-3 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2">
            <List size={18} className="text-teal-600" />
            <span className="text-xs font-bold text-gray-700">{activeLabel}</span>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        <div className="relative flex-1">
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 p-3 rounded-xl shadow-sm text-xs font-bold focus:outline-none"
          >
            {sorts.map((sort) => (
              <option key={sort.value} value={sort.value}>{sort.label}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW: Original Horizontal Design */}
      <div className="hidden lg:flex bg-white rounded-2xl shadow-sm border border-gray-100 p-6 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-teal-600" />
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  setActiveFilter(filter.value)
                  onFilterChange(filter.value)
                }}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all border ${
                  activeFilter === filter.value
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal-500 hover:text-teal-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-black uppercase tracking-widest text-gray-400">Sort by:</span>
          <div className="relative">
            <select
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 rounded-xl border border-gray-200 focus:border-teal-500 focus:outline-none bg-white text-sm font-bold cursor-pointer"
            >
              {sorts.map((sort) => (
                <option key={sort.value} value={sort.value}>{sort.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY (Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-[2rem] p-6 lg:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Select Category</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setActiveFilter(filter.value)
                      onFilterChange(filter.value)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full p-4 rounded-xl text-left font-bold transition-all ${
                      activeFilter === filter.value 
                      ? "bg-teal-50 text-teal-700 border-2 border-teal-500" 
                      : "bg-gray-50 text-gray-600 border-2 border-transparent"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}