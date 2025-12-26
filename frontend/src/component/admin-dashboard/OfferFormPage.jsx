"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Plus, Trash2, ChevronDown, Search } from "lucide-react"
import axios from "axios"

const CreateOfferForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "inactive",
    products: [],
  })

  const [selectedProducts, setSelectedProducts] = useState([])
  const [availableProducts, setAvailableProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showProductDropdown, setShowProductDropdown] = useState(false)

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Replace with your actual API endpoint
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
        console.log("product data -->",response)
        const data = response.data
        if (data.success) {
          setAvailableProducts(data.products || [])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        // Fallback to dummy data if API fails
        setAvailableProducts([
          { _id: "1", name: "Detergent Powder", price: 150, unit: "kg", stock: 100 },
          { _id: "2", name: "Organic Basmati Rice", price: 120, unit: "kg", stock: 200 },
          { _id: "3", name: "Fresh Cow Milk", price: 60, unit: "liter", stock: 150 },
          { _id: "4", name: "Cooking Oil", price: 180, unit: "liter", stock: 80 },
          { _id: "5", name: "Sugar", price: 45, unit: "kg", stock: 300 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products based on search
  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProduct = (product) => {
    // Check if product is already selected
    if (!selectedProducts.find((p) => p.productId === product._id)) {
      const newProduct = {
        productId: product._id,
        minQty: 1, // Default min quantity
        productDetails: product // Store product details for display
      }
      setSelectedProducts([...selectedProducts, newProduct])
      setShowProductDropdown(false)
      setSearchTerm("")
    }
  }

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.productId !== productId))
  }

  const handleMinQtyChange = (productId, value) => {
    const updatedProducts = selectedProducts.map(product => {
      if (product.productId === productId) {
        return { ...product, minQty: parseInt(value) || 1 }
      }
      return product
    })
    setSelectedProducts(updatedProducts)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      alert("Please enter offer title")
      return
    }
    
    if (!formData.startDate || !formData.endDate) {
      alert("Please select start and end dates")
      return
    }
    
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    
    if (endDate <= startDate) {
      alert("End date must be after start date")
      return
    }
    
    if (selectedProducts.length === 0) {
      alert("Please select at least one product")
      return
    }
    
    // Prepare final data according to schema
    const finalData = {
      ...formData,
      products: selectedProducts.map(({ productId, minQty }) => ({
        productId,
        minQty
      })),
      sellerPurchases: [], // Empty array as per schema
      winner: null // Default null as per schema
    }
    
    console.log("final data ==>",finalData)
    onSubmit(finalData)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "inactive",
      products: [],
    })
    setSelectedProducts([])
    setSearchTerm("")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 md:p-6 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Plus size={24} />
            Create New Offer
          </h2>
          <button 
            onClick={onClose} 
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Offer Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Offer Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Festival Bulk Purchase Offer"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all text-sm md:text-base"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your offer..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all resize-none text-sm md:text-base"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Start Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:outline-none transition-all text-sm md:text-base"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                End Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:outline-none transition-all text-sm md:text-base"
                required
                min={formData.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:outline-none transition-all appearance-none text-sm md:text-base"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Products Selection */}
          <div className="border-t-2 border-slate-200 pt-4 md:pt-6">
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4">
              Select Products <span className="text-red-600">*</span>
            </h3>

            {/* Product Search and Dropdown */}
            <div className="mb-6 relative">
              <p className="text-xs md:text-sm font-semibold text-slate-700 mb-3">Search Products</p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowProductDropdown(true)}
                  className="w-full px-4 py-3 pl-10 border-2 border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all text-sm md:text-base"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowProductDropdown(!showProductDropdown)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                >
                  <ChevronDown size={18} />
                </button>
              </div>

              {/* Product Dropdown */}
              {showProductDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border-2 border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center text-slate-500">Loading products...</div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="p-4 text-center text-slate-500">No products found</div>
                  ) : (
                    filteredProducts.map((product) => (
                      <motion.button
                        key={product._id}
                        type="button"
                        whileHover={{ backgroundColor: "#f0f9ff" }}
                        onClick={() => handleAddProduct(product)}
                        disabled={selectedProducts.some((p) => p.productId === product._id)}
                        className={`w-full p-3 text-left border-b border-slate-100 last:border-b-0 transition-colors ${
                          selectedProducts.some((p) => p.productId === product._id)
                            ? "bg-blue-50 cursor-not-allowed"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-slate-900">{product.name}</p>
                            <p className="text-xs text-slate-600">
                              Price: ₹{product.price} per {product.unit} | Stock: {product.stock}
                            </p>
                          </div>
                          {selectedProducts.some((p) => p.productId === product._id) && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Selected
                            </span>
                          )}
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Selected Products */}
            {selectedProducts.length > 0 && (
              <div>
                <p className="text-xs md:text-sm font-semibold text-slate-700 mb-3">
                  Selected Products ({selectedProducts.length})
                </p>
                <div className="space-y-3">
                  {selectedProducts.map((item) => {
                    const product = availableProducts.find(p => p._id === item.productId) || item.productDetails
                    return (
                      <motion.div
                        key={item.productId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-blue-50 border-2 border-blue-200 p-3 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold text-slate-900">{product?.name}</p>
                                <p className="text-xs text-slate-600">
                                  Price: ₹{product?.price} per {product?.unit}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveProduct(item.productId)}
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600 flex-shrink-0 ml-2"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-700 mb-1 block">
                                Minimum Quantity Required
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={item.minQty}
                                onChange={(e) => handleMinQtyChange(item.productId, e.target.value)}
                                className="w-full px-3 py-2 border border-blue-300 rounded text-slate-900 focus:outline-none focus:border-blue-500 text-sm"
                              />
                              <p className="text-xs text-slate-500 mt-1">
                                Seller must purchase at least {item.minQty} {product?.unit}(s) of this product
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 md:gap-4 pt-4 md:pt-6 border-t-2 border-slate-200">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-slate-300 rounded-lg font-bold text-slate-900 hover:bg-slate-100 transition-all text-sm md:text-base"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg text-sm md:text-base"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Offer"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CreateOfferForm