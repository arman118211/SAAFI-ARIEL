"use client"
import { Filter, ChevronDown } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ProductFilter({ onFilterChange, onSortChange }) {
  const [activeFilter, setActiveFilter] = useState("all") // Set default to 'all'

  const filters = [
    { label: "All", value: "all" },
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        
        {/* Filter Categories */}
        <div className="flex items-start lg:items-center gap-3">
          <div className="mt-2 lg:mt-0">
            <Filter size={18} className="text-teal-600 flex-shrink-0" />
          </div>
          
          {/* Mobile: Scrollable container | Desktop: Wrapped container */}
          <div className="flex overflow-x-auto pb-2 lg:pb-0 lg:flex-wrap gap-2 no-scrollbar -mx-2 px-2 lg:mx-0 lg:px-0">
            {filters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => {
                  setActiveFilter(filter.value)
                  onFilterChange(filter.value)
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-bold text-xs lg:text-sm whitespace-nowrap transition-all duration-300 border ${
                  activeFilter === filter.value
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal-500 hover:text-teal-600"
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-none border-gray-50">
          <span className="text-xs lg:text-sm font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">
            Sort by:
          </span>
          <div className="relative flex-1 lg:flex-none max-w-[200px] lg:max-w-none">
            <select
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-xl border border-gray-200 focus:border-teal-500 focus:outline-none bg-gray-50 lg:bg-white text-xs lg:text-sm font-bold cursor-pointer transition-all"
            >
              {sorts.map((sort) => (
                <option key={sort.value} value={sort.value}>
                  {sort.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}