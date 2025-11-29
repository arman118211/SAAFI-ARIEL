"use client"
import { motion } from "framer-motion"
import { Star, ShoppingCart, ArrowRight, Award, Shield } from "lucide-react"
import { Link } from "react-router-dom"

const products = [
  {
    id: 1,
    name: "New Extra Tite Detergent",
    image: "/product/un1.png",
    rating: 5,
    tag: "Best Seller",
    tagColor: "bg-red-500",
    price: "331.50",
    discount: "390.00"
  },
  {
    id: 2,
    name: "New Harbal Wash",
    image: "/product/un2.png",
    rating: 4.5,
    tag: "New",
    tagColor: "bg-blue-500",
    price: "153.00",
    discount: "180.00"
  },
  {
    id: 3,
    name: "New Saafi Detergent",
    image: "/product/un3.png",
    rating: 4.8,
    tag: "Eco Friendly",
    tagColor: "bg-green-500",
    price: "85.00",
    discount: "100.00"
  },
  {
    id: 4,
    name: "New Gaay Chaap ",
    image: "/product/un4.png",
    rating: 4.7,
    tag: "Premium",
    tagColor: "bg-purple-500",
    price: "85.00",
    discount: "100.00"
  },
]

const FeaturedProducts = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center relative mb-16">
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-red-50 rounded-full opacity-70 blur-2xl"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#ff0000] relative inline-block z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              Featured <span className="text-[#5851DB]">Products</span>
            </h2>
          </motion.h2>
          
          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-[#ff0000] to-[#5851DB] rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <motion.p
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover our most popular cleaning solutions, crafted with premium ingredients for exceptional results
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              variants={item}
            >
              <div className="relative overflow-hidden">
                {/* Product tag with enhanced styling */}
                <div className={`absolute top-4 left-4 z-10 ${product.tagColor} text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg`}>
                  {product.tag}
                </div>
                
                {/* Wishlist icon with pulse effect */}
                <button className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md transform transition-all duration-300 hover:scale-110">
                  <motion.div 
                    whileHover={{ scale: 1.2 }} 
                    whileTap={{ scale: 0.9 }}
                    animate={{ scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } }}
                  >
                    <Award size={18} className="text-red-500" />
                  </motion.div>
                </button>
                
                {/* Product image with enhanced hover effect */}
                <div className="h-72 overflow-hidden bg-gray-50">
                  <motion.img
                    src={product.image || "/api/placeholder/320/320"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15, rotate: -2 }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* Improved gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              
              <div className="p-6 relative bg-gradient-to-br from-white to-gray-50">
                {/* Product details with enhanced typography */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#5851DB] transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Quality badge with glow effect */}
                  <motion.div 
                    className="flex items-center text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full shadow-sm"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)" }}
                  >
                    <Shield size={12} className="mr-1" />
                    <span>Premium</span>
                  </motion.div>
                </div>
                
                {/* Rating with animated stars */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star
                        size={18}
                        className={`${
                          i < Math.floor(product.rating) 
                            ? "text-yellow-400" 
                            : i < product.rating 
                              ? "text-yellow-400 opacity-50" 
                              : "text-gray-300"
                        } fill-current mr-0.5`}
                      />
                    </motion.div>
                  ))}
                  <span className="text-sm font-medium text-gray-600 ml-2">{product.rating}</span>
                </div>
                
                {/* Price with enhanced styling */}
                <div className="flex items-baseline mb-5">
                  <span className="text-2xl font-bold text-gray-900 mr-2">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.discount}</span>
                  <span className="ml-2 text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-md">SAVE {Math.round(((parseFloat(product.discount.replace('$', '')) - parseFloat(product.price.replace('$', ''))) / parseFloat(product.discount.replace('$', ''))) * 100)}%</span>
                </div>
                
                {/* Shop Now button as a link with enhanced styling */}
                <Link 
                  to={`/shop`}
                  className="w-full block"
                >
                  <motion.div
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#5851DB] to-[#833ab4] text-white font-medium flex items-center justify-center shadow-lg shadow-[#5851DB]/30"
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(88, 81, 219, 0.5)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    <span className="font-bold">Shop Now</span>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-20">
          <Link to="/shop" className="inline-block">
            <motion.div
              className="bg-gradient-to-r from-[#ff0000] to-[#5851DB] px-10 py-5 rounded-full text-lg font-bold flex items-center justify-center mx-auto text-white shadow-xl shadow-[#5851DB]/30 hover:shadow-2xl hover:shadow-[#5851DB]/40 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(88, 81, 219, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Explore More
              <ArrowRight className="ml-2" size={20} />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts