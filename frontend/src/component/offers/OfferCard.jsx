import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OfferCard({ offer }) {
    // console.log("offer",offer)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  if (!offer) return <div>Loading...</div>;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(offer.endDate) - new Date()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [offer.endDate])

  // const totalPrice = offer.products.reduce((sum, item) => sum + (item.productId.price * item.minQty), 0)
  const productCount = offer.products.length

  return (
    <Link to={`/offers/${offer._id}`} className="block h-full">
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      <div className="h-48 bg-gradient-to-br from-blue-700 to-red-900 relative p-6 flex flex-col justify-between">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Tag size={100} className="text-white" />
        </div>
        
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-2 border border-white/30">
            Limited Time Offer
          </span>
          <h3 className="text-xl font-bold text-white line-clamp-2">{offer.title}</h3>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white/90 text-sm font-medium">
          <Clock size={16} />
          <span>Ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
          {offer.description}
        </p>

        <div className="space-y-4 mt-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Includes {productCount} products</span>
            {/* <span className="font-bold text-blue-700 text-lg">${totalPrice.toFixed(2)}</span> */}
          </div>

          <div 
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group"
          >
            Buy Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  )
}
