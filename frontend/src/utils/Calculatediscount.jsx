import { useState } from "react";
import { motion } from "framer-motion"; // Optional: for smooth animations

const DiscountCalculator = () => {
  const [total, setTotal] = useState("");
  const [discounted, setDiscounted] = useState("");

  const isInvalid = Number(discounted) > Number(total) && total !== "";
  
  const discountVal = total && discounted && !isInvalid
    ? (((total - discounted) / total) * 100)
    : 0;

  const discountPercent = discountVal.toFixed(1);
  const savings = total && discounted && !isInvalid ? (total - discounted).toFixed(2) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gray-800 p-8 text-center text-white">
          <h2 className="text-3xl font-extrabold tracking-tight">Price Slash</h2>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-medium">Smart Savings Tracker</p>
        </div>

        <div className="p-8">
          {/* Inputs Grid */}
          <div className="space-y-6">
            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Original Price</label>
              <div className="relative mt-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-purple-500 focus:bg-white rounded-2xl transition-all outline-none text-lg font-medium"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Sale Price</label>
              <div className="relative mt-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="number"
                  value={discounted}
                  onChange={(e) => setDiscounted(e.target.value)}
                  placeholder="0.00"
                  className={`w-full pl-10 pr-4 py-4 bg-gray-50 border-2 transition-all rounded-2xl outline-none text-lg font-medium ${
                    isInvalid ? "border-red-400 bg-red-50" : "border-transparent focus:border-purple-500 focus:bg-white"
                  }`}
                />
              </div>
              {isInvalid && (
                <p className="text-xs text-red-500 mt-2 font-medium flex items-center">
                  <span className="mr-1">⚠️</span> Sale price cannot exceed total.
                </p>
              )}
            </div>
          </div>

          {/* Visual Result Card */}
          <div className="mt-10 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400">You Save</p>
                <h3 className="text-2xl font-bold text-gray-800">₹{savings}</h3>
              </div>
              
              <div className="relative flex items-center justify-center">
                {/* Simple SVG Progress Circle */}
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={220}
                    strokeDashoffset={220 - (220 * Math.min(discountVal, 100)) / 100}
                    className="text-purple-600 transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-sm font-bold text-purple-700">{Math.round(discountVal)}%</span>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-400 text-[10px] mt-6 uppercase font-bold tracking-tighter">
            Instant Calculation • No Refresh Needed
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DiscountCalculator;