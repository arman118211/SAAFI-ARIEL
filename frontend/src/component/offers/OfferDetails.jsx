import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, ShoppingCart, Package, Check, AlertCircle, ArrowLeft, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useSelector } from "react-redux";

export default function OfferDetails({ offer, onAddToCart }) {
  const { seller, token } = useSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [quantities, setQuantities] = useState({})
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Initialize quantities with minimum quantities
  useEffect(() => {
    const initialQuantities = {}
    offer.products.forEach(item => {
      initialQuantities[item.productId._id] = item.minQty
    })
    setQuantities(initialQuantities)
  }, [offer.products])

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

  // Update cart items when quantities change
  useEffect(() => {
    const items = offer.products.map(item => ({
      productId: item.productId._id,
      product: item.productId,
      quantity: quantities[item.productId._id] || item.minQty,
      minQty: item.minQty,
      price: item.productId.price // current price for snapshot
    }))
    setCartItems(items)
  }, [quantities, offer.products])

  const increaseQuantity = (productId) => {
    const product = offer.products.find(item => item.productId._id === productId)
    const currentQty = quantities[productId]
    
    if (currentQty < product.productId.stock) {
      setQuantities(prev => ({
        ...prev,
        [productId]: currentQty + 1
      }))
    }
  }

  const decreaseQuantity = (productId) => {
    const product = offer.products.find(item => item.productId._id === productId)
    const currentQty = quantities[productId]
    
    if (currentQty > product.minQty) {
      setQuantities(prev => ({
        ...prev,
        [productId]: currentQty - 1
      }))
    }
  }

  const handleQuantityChange = (productId, value) => {
    const product = offer.products.find(item => item.productId._id === productId)
    const numValue = parseInt(value)
    
    if (!isNaN(numValue) && numValue >= product.minQty && numValue <= product.productId.stock) {
      setQuantities(prev => ({
        ...prev,
        [productId]: numValue
      }))
    }
  }

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      // Prepare order data according to your controller
      const orderData = {
        sellerId: seller._id , // assuming offer has seller info
        items: cartItems.map(item => ({
          productId: item.productId,
          qty: item.quantity,
          price: item.price // current price as snapshot
        })),
        offerId: offer._id,
        // totalQty and totalAmount will be calculated in backend
      }

      if (onAddToCart) {
        // If parent component provides handler, use it
        await onAddToCart(orderData)
      } else {
        // Otherwise call API directly
        await createOrder(orderData)
      }
      
      // Show success message
      alert('Order created successfully!')
      
      // Optionally navigate to orders page or clear cart
      // navigate('/orders')
      
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Failed to create order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // API call to create order
  const createOrder = async (orderData) => {
    console.log("create order called")
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/order/create`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    console.log("res-->",response)
    return response.data
  }

  // Calculate total price based on current quantities
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity)
  }, 0)

  // Calculate savings compared to individual purchase
  const originalTotalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.minQty)
  }, 0)

  const savings = originalTotalPrice - totalPrice

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section - same as before */}
      <div className="bg-gradient-to-r from-blue-700 to-red-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Offers
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 bg-red-600 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                  Limited Time Offer
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {offer.title}
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed">
                  {offer.description}
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 min-w-[280px]"
            >
              <div className="flex items-center gap-2 mb-2 text-blue-200 text-sm font-medium uppercase tracking-wide">
                <Clock size={16} />
                Offer Ends In
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-black/20 rounded-lg p-2">
                    <div className="text-2xl font-bold font-mono">{String(value).padStart(2, '0')}</div>
                    <div className="text-[10px] uppercase opacity-70">{unit}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product List - same as before */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Included Products</h2>
              <span className="text-gray-500">{offer.products.length} items</span>
            </div>

            {offer.products.map((item, index) => (
              <motion.div
                key={item.productId._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-48 sm:h-auto bg-gray-100 relative shrink-0">
                    <img
                      src={item.productId.imageUrl || "/placeholder.svg"}
                      alt={item.productId.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {item.productId.category}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 mt-2">{item.productId.name}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">${item.productId.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">per {item.productId.unit}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{item.productId.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-green-600 font-medium">
                          <Check size={16} />
                          In Stock ({item.productId.stock})
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Package size={16} />
                          Minimum: {item.minQty}
                        </div>
                      </div>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => decreaseQuantity(item.productId._id)}
                            disabled={quantities[item.productId._id] <= item.minQty}
                            className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            value={quantities[item.productId._id] || item.minQty}
                            onChange={(e) => handleQuantityChange(item.productId._id, e.target.value)}
                            min={item.minQty}
                            max={item.productId.stock}
                            className="w-16 text-center border-0 bg-transparent py-2 focus:outline-none focus:ring-0"
                          />
                          <button
                            onClick={() => increaseQuantity(item.productId._id)}
                            disabled={quantities[item.productId._id] >= item.productId.stock}
                            className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          ${((item.productId.price * (quantities[item.productId._id] || item.minQty)).toFixed(2))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-18">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-gray-600 flex-1">
                        {item.product.name} <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span className="font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t border-dashed border-gray-200 my-4"></div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between items-center text-green-600 bg-green-50 p-3 rounded-lg">
                      <span className="font-medium">You Save</span>
                      <span className="font-bold">${savings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Total</span>
                    <span className="text-3xl font-bold text-blue-700">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-blue-200 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Order...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Create Order
                    </>
                  )}
                </button>
                
                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <p>Limited stock available. Offer valid until {new Date(offer.endDate).toLocaleDateString()}.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}