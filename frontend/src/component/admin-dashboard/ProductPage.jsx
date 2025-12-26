"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Package, Search, Filter, X, ImageIcon, AlertCircle, TrendingUp } from "lucide-react"
import { uploadImage } from "../../utils/uploadImage";
import toast from "react-hot-toast";


import axios from "axios"

const ProductManager = () => {

  const [products, setProducts] = useState([])
  const [deletingId, setDeletingId] = useState(null);


  const getProductData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
      console.log("response", res.data)
      setProducts(res.data.products)

    } catch (err) {
      // console.log("something went wrong", err)
      toast.error("Failed to load products");
    }
  }

  useEffect(() => {
    getProductData()

  }, [])



  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    unit: "",
    stock: "",
    category: "",
    imageUrl: "",
    isActive: true,
  })

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log("calling handleSubmit")
  //   if (editingProduct) {
  //     console.log("editing form==>", editingProduct)
  //     try {
  //       const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/products/${editingProduct._id}`,
  //         formData
  //       )
  //       console.log("sucessfully upadted", res)
  //       setProducts(products.map((p) => (p._id === editingProduct._id ? { ...formData, _id: editingProduct._id } : p)))

  //     } catch (err) {
  //       console.log("failed to update the product", err)
  //     }
  //   } else {
  //     console.log("creating new product")
  //     try {
  //       const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/products/add`,
  //         formData
  //       )
  //       console.log("added data successfully", res)
  //       getProductData()

  //     } catch (err) {

  //     }
  //     setProducts([...products, { ...formData, _id: Date.now().toString() }])
  //   }
  //   resetForm()
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.imageUrl;

      // 🔥 Upload image if selected
      if (selectedImage) {
        setImageUploading(true);
        imageUrl = await uploadImage(selectedImage, "products");
        setImageUploading(false);
      }

      const payload = {
        ...formData,
        imageUrl,
      };

      if (editingProduct) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/products/${editingProduct._id}`,
          payload
        );
         toast.success("Product added successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/products/add`,
          payload
        );
        toast.success("Product added successfully");
      }

      getProductData();
      resetForm();
    } catch (err) {
      // console.error("Product save failed", err);
      setImageUploading(false);
      // alert("Failed to save product");
      toast.error("Failed to save product");
    }
  };



  const handleEdit = (product) => {
    console.log("editing product==>", product)
    setEditingProduct(product)
    setFormData({ ...product })
    setShowForm(true)
  }

  // const handleDelete = async (id) => {

  //   if (window.confirm("Are you sure you want to delete this product?")) {
  //     try {
  //       const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${id}`)
  //       // console.log("successfully deleted", id)
  //       toast.success("Product deleted");
  //       getProductData()

  //     } catch (error) {
  //       toast.error("Failed to delete product");
  //       // console.log("delete falied", error)

  //     }
  //   }
  // }
 
  const handleDelete = (id) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-white shadow-xl rounded-xl border border-gray-200 p-4 w-[320px]`}
      >
        <h3 className="text-sm font-bold text-gray-900 mb-1">
          Delete Product?
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              try {
                toast.dismiss(t.id);
                setDeletingId(id);

                await axios.delete(
                  `${import.meta.env.VITE_BASE_URL}/products/${id}`
                );

                toast.success("Product deleted successfully");
                getProductData();
              } catch (err) {
                toast.error("Failed to delete product");
              } finally {
                setDeletingId(null);
              }
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ),
    { duration: 5000 }
  );
};

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      unit: "",
      stock: "",
      category: "",
      imageUrl: "",
      isActive: true,
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const lowStockCount = products.filter((p) => p.stock < 20).length

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            <div className="w-full">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div className="p-2 md:p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg md:rounded-xl shadow-lg">
                  <Package className="text-white" size={20} />
                </div>
                <h1 className="text-3xl md:text-3xl font-bold text-slate-900">
                  Product Hub
                </h1>
              </div>
              <p className="text-slate-600 text-base md:text-lg">Manage inventory with precision and control</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
              text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap
              font-semibold shadow-sm transition-all duration-300 text-xs"
            >
              <Plus size={14} />
              Add Product
            </motion.button>


          </div>
        </motion.div>



        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-6 md:mb-8 "
        >
          {/* Blue Stats Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg md:rounded-xl shadow-lg p-4 md:p-5 group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/15 backdrop-blur-md p-2.5 md:p-3 rounded-lg md:rounded-xl border border-white/20">
                  <Package className="text-white" size={18} />
                </div>
                <span className="text-xs font-bold text-blue-100 bg-blue-500/30 px-2.5 py-1 rounded-full backdrop-blur text-opacity-90">
                  TOTAL
                </span>
              </div>
              <p className="text-blue-100 text-xs font-semibold mb-1 opacity-90">Total Products</p>
              <p className="text-3xl md:text-4xl font-black text-white">{products.length}</p>
            </div>
          </motion.div>

          {/* Red Stats Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-lg md:rounded-xl shadow-lg p-4 md:p-5 group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/15 backdrop-blur-md p-2.5 md:p-3 rounded-lg md:rounded-xl border border-white/20">
                  <AlertCircle className="text-white" size={18} />
                </div>
                <span className="text-xs font-bold text-red-100 bg-red-500/30 px-2.5 py-1 rounded-full backdrop-blur text-opacity-90">
                  ALERT
                </span>
              </div>
              <p className="text-red-100 text-xs font-semibold mb-1 opacity-90">Low Stock Items</p>
              <p className="text-3xl md:text-4xl font-black text-white">{lowStockCount}</p>
            </div>
          </motion.div>

          {/* Green Stats Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg md:rounded-xl shadow-lg p-4 md:p-5 group cursor-pointer sm:col-span-2 lg:col-span-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/15 backdrop-blur-md p-2.5 md:p-3 rounded-lg md:rounded-xl border border-white/20">
                  <TrendingUp className="text-white" size={18} />
                </div>
                <span className="text-xs font-bold text-emerald-100 bg-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur text-opacity-90">
                  REVENUE
                </span>
              </div>
              <p className="text-emerald-100 text-xs font-semibold mb-1 opacity-90">Inventory Value</p>
              <p className="text-3xl md:text-4xl font-black text-white">₹{(totalValue / 1000).toFixed(1)}K</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 mb-6 md:mb-8 border border-gray-200 "
        >
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or category..."
                className="w-full pl-9 pr-3 py-2 md:py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm transition-all duration-300"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto px-4 md:px-5 py-2 md:py-2.5 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2 text-gray-700 font-semibold text-sm"
            >
              <Filter size={16} />
              Filter
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg md:rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="hidden md:table-cell px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="hidden sm:table-cell px-3 md:px-4 py-3 md:py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 md:px-4 py-3 md:py-3.5 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredProducts.map((product, idx) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.03)" }}
                      className="hover:bg-blue-50/50 transition-all duration-300"
                    >
                      <td className="px-3 md:px-4 py-3 md:py-3.5">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="text-gray-400" size={18} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 text-xs md:text-sm truncate">{product.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1 hidden sm:block max-w-xs">
                              {product.description || "No description"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-3 md:px-4 py-3 md:py-3.5">
                        <span className="inline-flex px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-100 text-blue-700 border border-blue-300">
                          {product.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-3 md:py-3.5">
                        <div className="text-xs md:text-sm font-bold text-gray-900">₹{product.price}</div>
                        <div className="text-xs text-gray-500">{product.unit}</div>
                      </td>
                      <td className="px-3 md:px-4 py-3 md:py-3.5">
                        <div
                          className={`text-xs md:text-sm font-bold ${product.stock < 20 ? "text-red-600" : "text-emerald-600"}`}
                        >
                          {product.stock}
                        </div>
                        {product.stock < 20 && <div className="text-xs text-red-600 font-semibold">Low</div>}
                      </td>
                      <td className="hidden sm:table-cell px-3 md:px-4 py-3 md:py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-lg ${product.isActive
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                              : "bg-gray-100 text-gray-600 border border-gray-300"
                            }`}
                        >
                          {product.isActive ? "✓ Active" : "○ Inactive"}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-3 md:py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5 md:gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(product)}
                            className="p-1.5 md:p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md"
                          >
                            <Edit2 size={14} />
                          </motion.button>
                          <motion.button
                          whileHover={{ scale: deletingId === product._id ? 1 : 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          disabled={deletingId === product._id}
                          onClick={() => handleDelete(product._id)}
                          className={`p-1.5 md:p-2 rounded-lg transition-all shadow-md
                            ${
                              deletingId === product._id
                                ? "bg-red-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                            } text-white`}
                        >
                          {deletingId === product._id ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block"></span>
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </motion.button>

                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 md:py-12"
            >
              <Package size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-1">No products found</h3>
              <p className="text-xs md:text-sm text-gray-500">
                {searchTerm ? "Try adjusting your search" : "Get started by adding your first product"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-4"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg md:rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-200"
            >
              {/* Modal Header */}
              <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-red-50">
                <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto flex-1 px-4 md:px-6 py-4 md:py-6">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 ">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 ">
                      Product Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm resize-none"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        Price <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Unit</label>
                      <input
                        type="text"
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="kg, L, pcs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        Stock <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="Category"
                      />
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="https://..."
                    />
                  </div> */}
                  {/* <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                      Product Image
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg"
                    />

                    {imageUploading && (
                      <p className="text-xs text-blue-600 mt-1">Uploading image...</p>
                    )}

                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="mt-2 w-20 h-20 object-cover rounded-lg border"
                      />
                    )}
                  </div> */}
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                      Product Image
                    </label>

                    {/* Upload Box */}
                    <div className="relative">
                      <label
                        htmlFor="product-image"
                        className="group flex flex-col items-center justify-center w-full h-36 md:h-40
                        border-2 border-dashed border-gray-300 rounded-xl cursor-pointer
                        bg-gradient-to-br from-gray-50 to-white
                        hover:border-blue-500 hover:bg-blue-50/40
                        transition-all duration-300 shadow-sm"
                      >
                        <div className="flex flex-col items-center justify-center text-center px-4">
                          <ImageIcon
                            size={36}
                            className="text-gray-400 group-hover:text-blue-600 transition-colors mb-2"
                          />
                          <p className="text-xs md:text-sm font-semibold text-gray-600 group-hover:text-blue-700">
                            Click to upload image
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1">
                            PNG, JPG up to 5MB
                          </p>
                        </div>

                        <input
                          id="product-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setSelectedImage(e.target.files[0])}
                        />
                      </label>
                    </div>

                    {/* Uploading state */}
                    {imageUploading && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-blue-600 font-semibold">
                        <span className="w-3 h-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></span>
                        Uploading image...
                      </div>
                    )}

                    {/* Image Preview */}
                    {(selectedImage || formData.imageUrl) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 flex items-center gap-4 p-3 border border-gray-200 rounded-xl bg-white shadow-md"
                      >
                        <img
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : formData.imageUrl
                          }
                          alt="Preview"
                          className="w-20 h-20 rounded-lg object-cover border"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">
                            {selectedImage?.name || "Current image"}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-1">
                            Click upload again to replace
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setFormData({ ...formData, imageUrl: "" });
                          }}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
                          title="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    )}
                  </div>



                  <label className="flex items-center gap-2 md:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4 bg-white border-2 border-gray-300 rounded cursor-pointer accent-blue-600"
                    />
                    <span className="text-xs md:text-sm font-bold text-gray-700">Active Product</span>
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 md:py-3 rounded-lg transition-all shadow-lg text-sm md:text-base "
                    >
                      {editingProduct ? "Update Product" : "Add Product"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 md:py-3 rounded-lg transition-all text-sm md:text-base"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductManager
