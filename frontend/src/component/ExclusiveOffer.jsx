"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift } from "lucide-react"

const ExclusiveOffer = () => {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <section className="px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            Exclusive <span className="text-[#5851DB]">Offers</span>
          </h2>
          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-[#ff0000] to-[#5851DB] rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.p
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12 mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover our exclusive offers and promotions designed to give you the best value. Click on the banner below to
          learn how to redeem these special deals.
        </motion.p>

        <motion.div
          className="max-w-7xl h-fit mx-auto cursor-pointer relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={() => setShowPopup(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src="/banner/offer1.webp"
            alt="Exclusive Offer"
            className="w-full h-auto max-h-[400px] rounded-2xl shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/30 to-[#5851DB]/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full flex items-center">
              <Gift className="text-[#ff0000] mr-2" size={20} />
              <span className="font-bold text-[#5851DB]">Click to view offer</span>
            </div>
          </div>
        </motion.div>

        {/* Popup for Exclusive Offer - Improved for mobile */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto my-4 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
                  onClick={() => setShowPopup(false)}
                >
                  <X size={18} />
                </button>

                <h3 className="text-xl sm:text-2xl font-bold text-[#ff0000] mb-4 sm:mb-6 flex items-center">
                  <Gift className="mr-2 sm:mr-3" size={20} />
                  Special Offer Details
                </h3>

                <div className="mb-6 sm:mb-8">
                  <img
                    src="/banner/offer1.webp"
                    alt="Offer Details"
                    className="w-full h-auto max-h-[150px] sm:max-h-[200px] rounded-xl shadow-md object-cover"
                  />
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <h4 className="text-lg sm:text-xl font-semibold text-[#5851DB]">How to Redeem:</h4>
                  <ol className="list-decimal pl-5 space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                    <li>Purchase any high-quality detergent product.</li>
                    <li>Find the promotional coupon inside the packaging.</li>
                    <li>Collect 4 coupons to qualify for the prize.</li>
                    <li>Submit the coupons at the redemption center or website to enter the lucky draw for a 10-gram silver coin.</li>
                  </ol>

                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mt-4 sm:mt-6 border-l-4 border-[#5851DB]">
                    <p className="text-xs sm:text-sm text-gray-500">
                      *Offer valid until supplies last. Terms and conditions apply.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ExclusiveOffer