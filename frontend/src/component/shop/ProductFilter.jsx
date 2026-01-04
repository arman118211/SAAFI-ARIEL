"use client"
import { Filter } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ProductFilter({ onFilterChange, onSortChange }) {
  const [activeFilter, setActiveFilter] = useState(null)

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
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Filter Categories */}
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-teal-600" />
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => {
                  setActiveFilter(filter.value)
                  onFilterChange(filter.value)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Sort by:</span>
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none bg-white font-semibold cursor-pointer"
          >
            {sorts.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
