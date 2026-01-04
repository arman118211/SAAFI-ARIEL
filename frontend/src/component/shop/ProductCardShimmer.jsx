"use client"
import { motion } from "framer-motion"

export default function ProductCardShimmer() {
  return (
    <div className="h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col border border-gray-100 animate-pulse">
        
        {/* Image Shimmer */}
        <div className="relative h-72 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
          <ShimmerOverlay />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between gap-3">
          
          {/* Category */}
          <div className="h-3 w-24 bg-gray-200 rounded"></div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>

          {/* Description */}
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>

          {/* Quantity Bar */}
          <div className="h-7 bg-gray-200 rounded-lg"></div>

          {/* Feature Pills */}
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
            <div className="h-6 w-16 bg-gray-200 rounded-md"></div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>

          {/* Button */}
          <div className="h-10 w-full bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

function ShimmerOverlay() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{
        repeat: Infinity,
        duration: 1.6,
        ease: "linear",
      }}
      style={{
        background:
          "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
      }}
    />
  )
}
