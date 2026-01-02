"use client"
import { useState, useMemo } from "react"
import ProductCard from "./ProductCard"
import ProductFilter from "./ProductFilter"
import ShopHeader from "./ShopHeader"

// Sample Product Data
const PRODUCTS = [
  {
    _id: "6956668d1365970ef1e68c10",
    name: "GAAY CHAAP DETERGENT",
    description:
      "Introducing our advanced Gaay Chaap Ultra-Clean Laundry Detergent, a powerhouse solution designed to revolutionize your laundry routine.",
    category: "Powder",
    imageUrl:
      "https://storage.googleapis.com/saafi-ariel-aeb41.firebasestorage.app/uploads/7d357b9f-6c10-4e93-b899-80f16c0389b6-a1.jpg",
    keyFeatures: ["Removes tough stains", "Gentle on fabrics", "Pleasant fragrance", "Eco-friendly formula"],
    quantity: "150g",
    packSize: 12,
    price: 20,
    discount: 15,
    stock: 119,
  },
  {
    _id: "6956668d1365970ef1e68c11",
    name: "ULTRA FRESH LAUNDRY DETERGENT",
    description: "Advanced formula with premium cleaning agents for spotless whites and vibrant colors.",
    category: "Powder",
    imageUrl: "/laundry-detergent-bottle.jpg",
    keyFeatures: ["Deep Clean", "Stain Removal", "Fresh Scent", "Color Protection"],
    quantity: "200g",
    packSize: 10,
    price: 25,
    discount: 10,
    stock: 85,
  },
  {
    _id: "6956668d1365970ef1e68c12",
    name: "ECO SOFT DISHWASHING LIQUID",
    description: "Gentle on hands but tough on grease and food residue.",
    category: "Dishwashing",
    imageUrl: "/dishwashing-liquid-bottle.jpg",
    keyFeatures: ["Grease Cut", "Hand Care", "Biodegradable", "No Harsh Chemicals"],
    quantity: "500ml",
    packSize: 8,
    price: 35,
    discount: 5,
    stock: 156,
  },
  {
    _id: "6956668d1365970ef1e68c13",
    name: "CRYSTAL SHINE SURFACE CLEANER",
    description: "Leaves surfaces sparkling and sanitized with a pleasant aroma.",
    category: "Surface Cleaner",
    imageUrl: "/surface-cleaner-spray.jpg",
    keyFeatures: ["Sanitized", "Shiny Finish", "Antibacterial", "Fast Acting"],
    quantity: "400ml",
    packSize: 6,
    price: 18,
    discount: 20,
    stock: 203,
  },
  {
    _id: "6956668d1365970ef1e68c14",
    name: "DELICATE TOUCH WASH",
    description: "Perfect for silks, wools, and delicate fabrics with extra care formula.",
    category: "Powder",
    imageUrl: "/delicate-detergent.jpg",
    keyFeatures: ["Gentle", "Fabric Care", "Color Safe", "Luxurious Care"],
    quantity: "100g",
    packSize: 15,
    price: 22,
    discount: 8,
    stock: 92,
  },
  {
    _id: "6956668d1365970ef1e68c15",
    name: "POWER STAIN REMOVER",
    description: "Professional-grade stain removal solution for tough marks and oil stains.",
    category: "Powder",
    imageUrl: "/stain-remover.jpg",
    keyFeatures: ["Powerful", "Oil Stains", "Tough Marks", "Pre-treat Ready"],
    quantity: "250g",
    packSize: 5,
    price: 28,
    discount: 12,
    stock: 67,
  },
  {
    _id: "6956668d1365970ef1e68c16",
    name: "GLASS CRYSTAL CLEANER",
    description: "Streak-free cleaning for windows, mirrors, and glass surfaces.",
    category: "Surface Cleaner",
    imageUrl: "/glass-cleaner-spray.jpg",
    keyFeatures: ["Streak Free", "Crystal Clear", "Quick Dry", "Ammonia Free"],
    quantity: "300ml",
    packSize: 9,
    price: 15,
    discount: 0,
    stock: 178,
  },
  {
    _id: "6956668d1365970ef1e68c17",
    name: "ANTIBACTERIAL DISH SOAP",
    description: "Kills 99.9% of bacteria while cleaning dishes effectively.",
    category: "Dishwashing",
    imageUrl: "/antibacterial-dish-soap.jpg",
    keyFeatures: ["Antibacterial", "Effective", "Pleasant Scent", "Skin Friendly"],
    quantity: "600ml",
    packSize: 7,
    price: 32,
    discount: 15,
    stock: 134,
  },
]

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [cartItems, setCartItems] = useState([])

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS

    if (activeFilter !== "all") {
      if (activeFilter === "sale") {
        filtered = filtered.filter((p) => p.discount > 0)
      } else {
        filtered = filtered.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase())
      }
    }

    // Sort
    const sorted = [...filtered]
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price * a.packSize - b.price * b.packSize)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price * b.packSize - a.price * a.packSize)
        break
      case "popular":
        sorted.sort((a, b) => b.stock - a.stock)
        break
      default:
        break
    }

    return sorted
  }, [activeFilter, sortBy])

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product])
    // You can add toast notification here
    console.log("Added to cart:", product.name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <ShopHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Filter Section */}
        <ProductFilter onFilterChange={setActiveFilter} onSortChange={setSortBy} />

        {/* Products Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {activeFilter === "all" ? "All Products" : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
            </h2>
            <p className="text-gray-600 font-semibold">{filteredProducts.length} Products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white text-center mb-12 overflow-hidden">
          <h3 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-lg mb-6 opacity-90">Get exclusive deals and cleaning tips delivered to your inbox</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-gray-900 font-semibold"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
