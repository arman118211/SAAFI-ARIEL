"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  Search,
  ShoppingBag,
  X,
  ChevronDown,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  Tag,
  Check,
  Sparkles,
  RefreshCw,
  ArrowUpDown,
  Filter,
  Plus,
  Minus,
} from "lucide-react"

// Mock product data
const products = [
  {
    id: 1,
    name: "GHAAP CHAAP DETERGENT",
    image: "/product/a1.jpg",
    quantity: "150 g",
    originalPrice: 20,
    discountPercentage: 15,
    rating: 4.5,
    category: "GAAY CHAAP DETERGENTS",
    featured: true,
    description:
      "Introducing our advanced Gaay Chaap Ultra-Clean Laundry Detergent, a powerhouse solution designed to revolutionize your laundry routine. Formulated with cutting-edge technology, this detergent is engineered to deliver exceptional cleaning performance while caring for your fabrics.",
    keyFeatures: ["Removes tough stains", "Gentle on fabrics", "Pleasant fragrance", "Eco-friendly formula"],
    usageInstructions:
      "Dissolve 2 tablespoons in water before adding clothes. For tough stains, apply directly on the stain before washing.",
  },
  {
    id: 2,
    name: "NEW EXTRA TITE DETERGENT",
    image: "/product/n2.png",
    quantity: "1 kg",
    originalPrice: 290,
    discountPercentage: 10,
    rating: 4.2,
    category: "GAAY CHAAP DETERGENTS",
    featured: true,
    description:
      "Extra Tite Detergent, manufactured by Saafi Ariel Udyog, is a high-performance washing solution designed to tackle tough stains while being gentle on clothes. Formulated with advanced stain-fighting technology, it removes dirt, grease, and odors effectively, leaving your fabrics fresh and vibrant. Whether for machine wash or hand wash, Extra Tite ensures a deep clean with a refreshing fragrance",
    keyFeatures: ["Removes tough stains", "Gentle on fabrics", "Pleasant fragrance", "Eco-friendly formula"],
    usageInstructions:
      "Dissolve 2 tablespoons in water before adding clothes. For tough stains, apply directly on the stain before washing.",
  },
  {
    id: 3,
    name: "DISHWASHING BAR",
    image: "/product/n3.png",
    quantity: "Large",
    originalPrice: 20,
    discountPercentage: 0,
    rating: 4.8,
    category: "CLEANING LIQUIDS",
    featured: true,
    description:
      "Gaay Chaap Dishwashing Bar is a powerful cleaning solution designed to remove tough grease, oil, and stains from utensils while being gentle on hands. Its advanced formula ensures sparkling clean dishes with minimal effort, leaving no white residue or unpleasant odor. Suitable for all types of cookware, including stainless steel, glass, and non-stick utensils, Gaay Chaap Dishwashing Bar provides a superior dishwashing experience with a refreshing fragrance.",
    keyFeatures: ["All-purpose formula", "Streak-free finish", "Kills 99.9% of germs", "Fresh lemon scent"],
    usageInstructions:
      "For best results, wet the scrubber and rub it on the Gaay Chaap Dishwashing Bar to create a rich lather. Apply the lather on utensils, scrub thoroughly to remove grease and stains, and rinse with clean water. For heavily greased cookware, soak in water for a few minutes before scrubbing for easier cleaning. Store the bar in a dry place after use to ensure long-lasting performance.",
  },
  {
    id: 4,
    name: "SAAFI HANDWASH",
    image: "/product/a4.jpg",
    quantity: "250 ml",
    originalPrice: 100,
    discountPercentage: 15,
    rating: 4.0,
    category: "CLEANING LIQUIDS",
    featured: true,
    description:
      "Introducing Saafi Hand Wash, a luxurious and effective solution for everyday hand hygiene. Crafted with care, our hand wash is designed to cleanse, nourish, and indulge your hands with a spa-like experience.",
    keyFeatures: ["Kills 99.9% Germs", "Gentle on Skin", "Refreshing Fragrance", "pH-Balanced Formula"],
    usageInstructions: "Press the pump to release a generous amount of foaming hand wash into your hands.",
  },
  {
    id: 5,
    name: "Glass Cleaner",
    image: "/product/a7.jpg",
    quantity: "1 L",
    originalPrice: 140,
    discountPercentage: 15,
    rating: 4.3,
    category: "CLEANING LIQUIDS",
    featured: false,
    description: "Provides streak-free cleaning for all glass surfaces including windows, mirrors, and glass tables.",
    keyFeatures: ["Streak-free formula", "Fast drying", "Removes fingerprints and smudges", "Ammonia-free"],
    usageInstructions:
      "Spray directly on glass surface and wipe with a lint-free cloth or paper towel for best results.",
  },
  {
    id: 6,
    name: "PITAMBARI LIQUID",
    image: "/product/a2.jpg",
    quantity: "1 L",
    originalPrice: 100,
    discountPercentage: 15,
    rating: 4.7,
    category: "CLEANING LIQUIDS",
    featured: false,
    description:
      "Gaay Chaap Pitambari Liquid is a specially crafted liquid designed to rejuvenate and maintain the lustrous appearance of brass utensils. This cleaning solution typically combines powerful cleaning agents with gentle abrasives to effectively remove tarnish and grime without causing damage to the metal. The liquid is easy to apply, allowing for convenient and efficient cleaning.",
    keyFeatures: [
      " Effectively removes tarnish and oxidation.",
      "Mild abrasives lift stains without damaging brass.",
      "Apply with a soft cloth or sponge for hassle-free cleaning.",
    ],
    usageInstructions: "Gently rub the brass surface, focusing on areas with tarnish or discoloration.",
  },
  {
    id: 7,
    name: "Saafi Bathroom Cleaner",
    image: "/product/a13.jpg",
    quantity: "500 ml",
    originalPrice: 95,
    discountPercentage: 15,
    rating: 4.6,
    category: "CLEANING LIQUIDS",
    featured: false,
    description: "Removes soap scum, hard water stains, and mildew from bathroom surfaces.",
    keyFeatures: [
      "Powerful cleaning action",
      "Removes calcium deposits",
      "Prevents mold and mildew",
      "Fresh mint scent",
    ],
    usageInstructions: "Spray on surface, let sit for 2-3 minutes, then scrub if needed and rinse thoroughly.",
  },
  {
    id: 8,
    name: "GAAY CHAAP DETERGENTS",
    image: "/product/a1.jpg",
    quantity: "5 Kg",
    originalPrice: 500,
    discountPercentage: 15,
    rating: 4.4,
    category: "GAAY CHAAP DETERGENTS",
    featured: false,
    description: "Gentle formula designed specifically for delicate fabrics like silk, wool, and cashmere.",
    keyFeatures: [
      "pH balanced formula",
      "Preserves fabric quality",
      "No harsh chemicals",
      "Maintains color brightness",
    ],
    usageInstructions: "Add one capful to cold water. Hand wash or use delicate cycle. Do not wring, lay flat to dry.",
  },
  {
    id: 9,
    name: "GAAY CHAAP DETERGENTS",
    image: "/product/a1.jpg",
    quantity: "3 Kg",
    originalPrice: 300,
    discountPercentage: 15,
    rating: 4.4,
    category: "GAAY CHAAP DETERGENTS",
    featured: false,
    description: "Gentle formula designed specifically for delicate fabrics like silk, wool, and cashmere.",
    keyFeatures: [
      "pH balanced formula",
      "Preserves fabric quality",
      "No harsh chemicals",
      "Maintains color brightness",
    ],
    usageInstructions: "Add one capful to cold water. Hand wash or use delicate cycle. Do not wring, lay flat to dry.",
  },
  {
    id: 10,
    name: "GAAY CHAAP INSECT PROTECTOR",
    image: "/product/a5.jpg",
    quantity: "1 l",
    originalPrice: 160,
    discountPercentage: 15,
    rating: 4.6,
    category: "CLEANING LIQUIDS",
    featured: false,
    description: "Removes soap scum, hard water stains, and mildew from bathroom surfaces.",
    keyFeatures: [
      "Powerful cleaning action",
      "Removes calcium deposits",
      "Prevents mold and mildew",
      "Fresh mint scent",
    ],
    usageInstructions: "Spray on surface, let sit for 2-3 minutes, then scrub if needed and rinse thoroughly.",
  },
  {
    id: 11,
    name: "CLEANING PHENYL",
    image: "/product/a6.jpg",
    quantity: "1 L",
    originalPrice: 100,
    discountPercentage: 15,
    rating: 4.6,
    category: "CLEANING LIQUIDS",
    featured: false,
    description: "Removes soap scum, hard water stains, and mildew from bathroom surfaces.",
    keyFeatures: [
      "Powerful cleaning action",
      "Removes calcium deposits",
      "Prevents mold and mildew",
      "Fresh mint scent",
    ],
    usageInstructions: "Spray on surface, let sit for 2-3 minutes, then scrub if needed and rinse thoroughly.",
  },
  {
    id: 12,
    name: "CLEANING PHENYL WITH FRAGRANCE",
    image: "/product/a9.jpg",
    quantity: "1 L",
    originalPrice: 100,
    discountPercentage: 15,
    rating: 4.6,
    category: "CLEANING LIQUIDS",
    featured: false,
    description:
      "Introducing Gaay Chap Fresh Scent Cleaning Phenyl with awesome fragrance, a dynamic cleaning solution that not only eradicates dirt and germs but also leaves your home smelling invigoratingly fresh.",
    keyFeatures: [
      "Powerful cleaning action",
      "Removes calcium deposits",
      "Prevents mold and mildew",
      "Fresh mint scent",
    ],
    usageInstructions: "Spray on surface, let sit for 2-3 minutes, then scrub if needed and rinse thoroughly.",
  },
  {
    id: 13,
    name: "RED ACID TOILET CLEANER",
    image: "/product/a8.jpg",
    quantity: "1 L",
    originalPrice: 130,
    discountPercentage: 15,
    rating: 4.6,
    category: "CLEANING LIQUIDS",
    featured: false,
    description:
      "Red Acid toilet cleaner is a specialized cleaning solution designed to maintain cleanliness and hygiene in toilet bowls. This versatile product comes in a liquid form, making it easy to apply and ensuring thorough coverage for effective cleaning. Formulated with powerful cleaning agents, liquid toilet cleaners are crafted to remove stains, germs, and unpleasant odors, leaving the toilet bowl fresh and sanitized.",
    keyFeatures: [
      "Powerful Stain Removal",
      "Disinfects for a hygienic, germ-free toilet.",
      "Reduces scrubbing and keeps toilets fresher, longer.",
    ],
    usageInstructions: "Spray on surface, let sit for 2-3 minutes, then scrub if needed and rinse thoroughly.",
  },
  {
    id: 14,
    name: "DISH WASH",
    image: "/product/a3.jpg",
    quantity: "1 L",
    originalPrice: 100,
    discountPercentage: 15,
    rating: 4.6,
    category: "CLEANING LIQUIDS",
    featured: false,
    description:
      "Dish washing liquid, often referred to as dish soap, is an essential household cleaning product designed to efficiently remove grease, food residues, and stains from dishes, utensils, and cookware. This versatile cleaning solution is a kitchen staple known for its effectiveness in cutting through tough grime while remaining gentle on hands. Dishwashing liquids come in various formulations, offering a range of scents and additional features such as antibacterial properties.",
    keyFeatures: [
      "Breaks down grease and food for spotless dishes.",
      "Mild formula prevents dryness and irritation.",
      "Cleans plates, glasses, silverware, pots & pans.",
      "Fresh mint scent",
    ],
    usageInstructions: "Spray on surface, let sit for 2-3 minutes, then scrub if needed and rinse thoroughly.",
  },
  {
    id: 15,
    name: "Saafi Bathroom Cleaner",
    image: "/product/a14.jpg",
    quantity: "5 L",
    originalPrice: 500,
    discountPercentage: 15,
    rating: 4.6,
    category: "CLEANING LIQUIDS",
    featured: false,
    description: "Removes soap scum, hard water stains, and mildew from bathroom surfaces.",
    keyFeatures: [
      "Powerful cleaning action",
      "Removes calcium deposits",
      "Prevents mold and mildew",
      "Fresh mint scent",
    ],
    usageInstructions: "Spray on surface, let sit for 2-3 minutes, then scrub if needed and rinse thoroughly.",
  },
  {
    id: 16,
    name: "DISHWASHING BAR",
    image: "/product/n3.png",
    quantity: "small",
    originalPrice: 10,
    discountPercentage: 0,
    rating: 4.8,
    category: "CLEANING LIQUIDS",
    featured: false,
    description:
      "Gaay Chaap Dishwashing Bar is a powerful cleaning solution designed to remove tough grease, oil, and stains from utensils while being gentle on hands. Its advanced formula ensures sparkling clean dishes with minimal effort, leaving no white residue or unpleasant odor. Suitable for all types of cookware, including stainless steel, glass, and non-stick utensils, Gaay Chaap Dishwashing Bar provides a superior dishwashing experience with a refreshing fragrance.",
    keyFeatures: ["All-purpose formula", "Streak-free finish", "Kills 99.9% of germs", "Fresh lemon scent"],
    usageInstructions:
      "For best results, wet the scrubber and rub it on the Gaay Chaap Dishwashing Bar to create a rich lather. Apply the lather on utensils, scrub thoroughly to remove grease and stains, and rinse with clean water. For heavily greased cookware, soak in water for a few minutes before scrubbing for easier cleaning. Store the bar in a dry place after use to ensure long-lasting performance.",
  },
  {
    id: 17,
    name: "GAAY CHAAP DETERGENTS",
    image: "/product/a1.jpg",
    quantity: "1 Kg",
    originalPrice: 100,
    discountPercentage: 15,
    rating: 4.4,
    category: "GAAY CHAAP DETERGENTS",
    featured: false,
    description: "Gentle formula designed specifically for delicate fabrics like silk, wool, and cashmere.",
    keyFeatures: [
      "pH balanced formula",
      "Preserves fabric quality",
      "No harsh chemicals",
      "Maintains color brightness",
    ],
    usageInstructions: "Add one capful to cold water. Hand wash or use delicate cycle. Do not wring, lay flat to dry.",
  },
  {
    id: 18,
    name: "GAAY CHAAP DETERGENT LIQUID",
    image: "/product/a6.jpg",
    quantity: "1 L",
    originalPrice: 180,
    discountPercentage: 15,
    rating: 4.6,
    category: "CLEANING LIQUIDS",
    featured: false,
    description:
      "Introducing our revolutionary UltraClean Liquid Laundry Detergent – the powerhouse solution to elevate your laundry experience to unprecedented levels of cleanliness and freshness. Specially crafted with cutting-edge technology, this detergent liquid is designed to tackle even the toughest stains while caring for your fabrics.",
    keyFeatures: [
      "Lifts tough stains like grass, wine & grease.",
      " Leaves clothes with a refreshing, clean scent.",
      "More washes per bottle, less waste.",
    ],
    usageInstructions:
      "measure the appropriate amount of UltraClean Liquid Detergent based on the size of your load. Refer to the guidelines on the packaging for recommended dosages.",
  },
  {
    id: 19,
    name: "New Extra Tite Detergent",
    image: "/product/un1.png",
    quantity: "1 kg",
    originalPrice: 390,
    discountPercentage: 15,
    rating: 5,
    category: "GAAY CHAAP DETERGENTS",
    featured: true,
    description:
      "New Extra Tite Detergent gives powerful cleaning action, tackling even the toughest stains with ease. Designed for everyday laundry, it keeps clothes bright and fresh after every wash.",
    keyFeatures: [
      "Strong cleaning power for heavy stains",
      "Fabric-safe formula",
      "Traditional trust with a modern twist",
      "Fresh, soothing aroma",
    ],
    usageInstructions:
      "Mix 1 scoop in a bucket of water, soak clothes for 5 minutes, then rinse.",
  },
  {
    id: 20,
    name: "New Harbal Wash",
    image: "/product/un2.png",
    quantity: "1 kg",
    originalPrice: 180,
    discountPercentage: 15,
    rating: 4.6,
    category: "GAAY CHAAP DETERGENTS",
    featured: true,
    description:
      "New Harbal Wash combines the power of nature with modern cleaning. Infused with herbal extracts, it gently cleans clothes while being safe for skin and fabric.",
    keyFeatures: [
      "Made with herbal ingredients",
      "Gentle on hands and fabrics",
      "Natural, refreshing fragrance",
      "Effective against daily dirt and stains"
    ],
    usageInstructions:
      "Dissolve 1 scoop in water, soak clothes for 15–30 minutes, scrub lightly, then rinse.",
  },
  {
    id: 21,
    name: "New Saafi Detergent",
    image: "/product/un3.png",
    quantity: "1 kg",
    originalPrice: 100,
    discountPercentage: 15,
    rating: 4.6,
    category: "GAAY CHAAP DETERGENTS",
    featured: true,
    description:
      "New Saafi Detergent delivers a deep clean for everyday laundry needs. Its fast-acting formula ensures sparkling clean clothes with minimal effort.",
    keyFeatures: [
      "Powerful dirt removal",
      "Fast-dissolving formula",
      "Brightens clothes after each wash",
      "Pleasant fragrance that lasts",
    ],
    usageInstructions:
      "Add 1 scoop in half a bucket of water, soak, and wash after 30 minutes.",
  },
  {
    id: 22,
    name: "New Gaay Chaap ",
    image: "/product/un4.png",
    quantity: "1 kg",
    originalPrice: 100,
    discountPercentage: 15,
    rating: 4.6,
    category: "GAAY CHAAP DETERGENTS",
    featured: true,
    description:
      "New Gaay Chaap brings traditional care and modern performance together. Specially made for tough Indian stains, it maintains the fabric quality while ensuring deep cleaning.",
    keyFeatures: [
      "Removes stubborn stains effectively",
      "Keeps fabric colors vibrant",
      "Fresh, long-lasting fragrance",
      "Suitable for hand and machine wash",
    ],
    usageInstructions:
      "measure the appropriate amount of UltraClean Liquid Detergent based on the size of your load. Refer to the guidelines on the packaging for recommended dosages.",
  },
]

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isMobileFilterDrawerOpen, setIsMobileFilterDrawerOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState([])
  const [showWishlistMessage, setShowWishlistMessage] = useState(false)
  const [activeSection, setActiveSection] = useState("featured")
  const [sortOption, setSortOption] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState(["detergent", "dishwash", "phenyl"])
  const [activeFilterTab, setActiveFilterTab] = useState("category")
  const searchInputRef = useRef(null)
  const mobileSearchInputRef = useRef(null)
  const featuredRef = useRef(null)
  const detergentsRef = useRef(null)
  const liquidsRef = useRef(null)

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    let result = products

    // Filter by search term
    if (searchTerm) {
      result = result.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by category
    if (selectedCategory !== "ALL") {
      if (selectedCategory === "FEATURED") {
        result = result.filter((product) => product.featured)
      } else {
        result = result.filter((product) => product.category === selectedCategory)
      }
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        calculateDiscountedPrice(product.originalPrice, product.discountPercentage) >= priceRange[0] &&
        calculateDiscountedPrice(product.originalPrice, product.discountPercentage) <= priceRange[1],
    )

    // Filter by rating
    if (ratingFilter > 0) {
      result = result.filter((product) => product.rating >= ratingFilter)
    }

    // Filter by discount
    if (showOnlyDiscounted) {
      result = result.filter((product) => product.discountPercentage > 0)
    }

    // Sort products
    if (sortOption === "price-low-high") {
      result = [...result].sort(
        (a, b) =>
          calculateDiscountedPrice(a.originalPrice, a.discountPercentage) -
          calculateDiscountedPrice(b.originalPrice, b.discountPercentage),
      )
    } else if (sortOption === "price-high-low") {
      result = [...result].sort(
        (a, b) =>
          calculateDiscountedPrice(b.originalPrice, b.discountPercentage) -
          calculateDiscountedPrice(a.originalPrice, a.discountPercentage),
      )
    } else if (sortOption === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else if (sortOption === "discount") {
      result = [...result].sort((a, b) => b.discountPercentage - a.discountPercentage)
    }
    // For "featured" sort option, we keep the original order

    setFilteredProducts(result)
  }, [searchTerm, selectedCategory, sortOption, priceRange, ratingFilter, showOnlyDiscounted])

  const openModal = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const getFeaturedProducts = () => {
    return filteredProducts.filter((product) => product.featured)
  }

  const getProductsByCategory = (category) => {
    return filteredProducts.filter((product) => product.category === category)
  }

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    return (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(2)
  }

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
      setShowWishlistMessage(true)
      setTimeout(() => setShowWishlistMessage(false), 2000)
    }
  }

  const scrollToSection = (ref, section) => {
    ref.current.scrollIntoView({ behavior: "smooth" })
    setActiveSection(section)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    // Add to recent searches when user presses Enter
    if (e.key === "Enter" && value.trim() !== "") {
      if (!recentSearches.includes(value.toLowerCase())) {
        setRecentSearches([value.toLowerCase(), ...recentSearches.slice(0, 4)])
      }

      // Close mobile search on Enter
      if (isMobile) {
        setIsMobileSearchOpen(false)
      }
    }
  }

  const applyRecentSearch = (term) => {
    setSearchTerm(term)
    setSearchFocused(false)

    // Close mobile search when selecting a recent search
    if (isMobile) {
      setIsMobileSearchOpen(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    if (isMobile && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus()
    } else if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const resetFilters = () => {
    setSelectedCategory("ALL")
    setSortOption("featured")
    setPriceRange([0, 500])
    setRatingFilter(0)
    setShowOnlyDiscounted(false)
    setSearchTerm("")

    // Close mobile filter drawer after reset
    if (isMobile) {
      setIsMobileFilterDrawerOpen(false)
    }
  }

  const toggleMobileFilterDrawer = () => {
    setIsMobileFilterDrawerOpen(!isMobileFilterDrawerOpen)

    // If opening the drawer, set body to fixed to prevent background scrolling
    if (!isMobileFilterDrawerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const closeMobileFilterDrawer = () => {
    setIsMobileFilterDrawerOpen(false)
    document.body.style.overflow = "auto"
  }

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)

    // Focus the search input when opening
    if (!isMobileSearchOpen) {
      setTimeout(() => {
        if (mobileSearchInputRef.current) {
          mobileSearchInputRef.current.focus()
        }
      }, 100)
    }
  }

  // Add this function after the calculateDiscountedPrice function in the Shop component
  const generateWhatsAppLink = (product, quantity = 1) => {
    const discountedPrice = calculateDiscountedPrice(product.originalPrice, product.discountPercentage)
    const totalPrice = (Number.parseFloat(discountedPrice) * quantity).toFixed(2)

    const message = `
*New Order Request*
Product: ${product.name}
Quantity: ${quantity}
Price: NPR ${discountedPrice}
Total: NPR ${totalPrice}
  `.trim()

    return `https://wa.me/9779826448200?text=${encodeURIComponent(message)}`
  }

  // Count active filters
  const activeFiltersCount = () => {
    let count = 0
    if (selectedCategory !== "ALL") count++
    if (priceRange[0] > 0 || priceRange[1] < 500) count++
    if (ratingFilter > 0) count++
    if (showOnlyDiscounted) count++
    if (sortOption !== "featured") count++
    return count
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Wishlist Message */}
      <AnimatePresence>
        {showWishlistMessage && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-red-600 to-[#5851DB] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Product added to wishlist!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-[#5851DB] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Premium Cleaning Solutions</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover our range of high-quality detergents and cleaning products
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium text-lg flex items-center gap-2 ${activeSection === "featured" ? "bg-white text-[#5851DB]" : "bg-white/20 hover:bg-white/30"}`}
                onClick={() => scrollToSection(featuredRef, "featured")}
              >
                <Sparkles className="w-5 h-5" />
                Featured Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium text-lg flex items-center gap-2 ${activeSection === "detergents" ? "bg-white text-[#5851DB]" : "bg-white/20 hover:bg-white/30"}`}
                onClick={() => scrollToSection(detergentsRef, "detergents")}
              >
                <Tag className="w-5 h-5" />
                Gaay Chaap Detergents
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium text-lg flex items-center gap-2 ${activeSection === "liquids" ? "bg-white text-[#5851DB]" : "bg-white/20 hover:bg-white/30"}`}
                onClick={() => scrollToSection(liquidsRef, "liquids")}
              >
                <Tag className="w-5 h-5" />
                Cleaning Liquids
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Mobile Search Bar - Fixed at top when active */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg p-4"
          >
            <div className="flex items-center gap-2">
              <button onClick={toggleMobileSearch} className="p-2 rounded-full hover:bg-gray-100">
                <X size={20} className="text-gray-500" />
              </button>

              <div className="relative flex-grow">
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-full border-2 border-gray-200 focus:border-[#5851DB] focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <div className="absolute left-3 top-2.5 text-[#5851DB]">
                  <Search className="w-5 h-5" />
                </div>

                {searchTerm && (
                  <button onClick={clearSearch} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Recent Searches */}
            <div className="mt-2 max-h-60 overflow-y-auto">
              {recentSearches.length > 0 && (
                <div className="py-2 px-2">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">Recent Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, index) => (
                      <button
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1.5 hover:bg-gray-200"
                        onClick={() => applyRecentSearch(term)}
                      >
                        <Search className="w-3 h-3" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMobileFilterDrawer}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-lg font-bold text-[#5851DB]">Filter & Sort</h2>
                <div className="flex items-center gap-2">
                  {activeFiltersCount() > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-[#5851DB] font-medium flex items-center gap-1"
                    >
                      <RefreshCw size={14} />
                      Reset all
                    </button>
                  )}
                  <button onClick={closeMobileFilterDrawer} className="p-1.5 rounded-full hover:bg-gray-100">
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Drawer Handle */}
              <div className="w-full flex justify-center pt-2">
                <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Tabs */}
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                <button
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeFilterTab === "category"
                      ? "text-[#5851DB] border-b-2 border-[#5851DB]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveFilterTab("category")}
                >
                  Categories
                </button>
                <button
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeFilterTab === "price"
                      ? "text-[#5851DB] border-b-2 border-[#5851DB]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveFilterTab("price")}
                >
                  Price Range
                </button>
                <button
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeFilterTab === "rating"
                      ? "text-[#5851DB] border-b-2 border-[#5851DB]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveFilterTab("rating")}
                >
                  Rating
                </button>
                <button
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeFilterTab === "sort"
                      ? "text-[#5851DB] border-b-2 border-[#5851DB]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveFilterTab("sort")}
                >
                  Sort By
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-grow overflow-y-auto p-4">
                {activeFilterTab === "category" && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Select Category</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <FilterButton
                        active={selectedCategory === "ALL"}
                        onClick={() => setSelectedCategory("ALL")}
                        color="bg-gradient-to-r from-gray-700 to-gray-900"
                      >
                        All Products
                      </FilterButton>
                      <FilterButton
                        active={selectedCategory === "FEATURED"}
                        onClick={() => setSelectedCategory("FEATURED")}
                        color="bg-gradient-to-r from-yellow-500 to-yellow-600"
                      >
                        Featured Only
                      </FilterButton>
                      <FilterButton
                        active={selectedCategory === "GAAY CHAAP DETERGENTS"}
                        onClick={() => setSelectedCategory("GAAY CHAAP DETERGENTS")}
                        color="bg-gradient-to-r from-red-600 to-[#5851DB]"
                        fullWidth
                      >
                        Gaay Chaap Detergents
                      </FilterButton>
                      <FilterButton
                        active={selectedCategory === "CLEANING LIQUIDS"}
                        onClick={() => setSelectedCategory("CLEANING LIQUIDS")}
                        color="bg-gradient-to-r from-red-500 to-red-600"
                      >
                        Cleaning Liquids
                      </FilterButton>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={showOnlyDiscounted}
                            onChange={() => setShowOnlyDiscounted(!showOnlyDiscounted)}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-700">Show only discounted items</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeFilterTab === "price" && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range (NPR)</h3>
                    <div className="px-2">
                      <div className="relative h-2 bg-gray-200 rounded-full mb-6">
                        <div
                          className="absolute h-2 bg-gradient-to-r from-red-600 to-[#5851DB] rounded-full"
                          style={{
                            left: `${(priceRange[0] / 500) * 100}%`,
                            width: `${((priceRange[1] - priceRange[0]) / 500) * 100}%`,
                          }}
                        ></div>
                        <input
                          type="range"
                          min="0"
                          max="500"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                          className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="500"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                          className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">NPR {priceRange[0]}</span>
                        <span className="text-sm font-medium text-gray-700">NPR {priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Quick price range buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPriceRange([0, 100])}
                        className={`px-4 py-2 text-sm rounded-full border ${
                          priceRange[0] === 0 && priceRange[1] === 100
                            ? "border-[#5851DB] bg-[#5851DB]/5 text-[#5851DB]"
                            : "border-gray-200 text-gray-700"
                        }`}
                      >
                        Under NPR 100
                      </button>
                      <button
                        onClick={() => setPriceRange([100, 200])}
                        className={`px-4 py-2 text-sm rounded-full border ${
                          priceRange[0] === 100 && priceRange[1] === 200
                            ? "border-[#5851DB] bg-[#5851DB]/5 text-[#5851DB]"
                            : "border-gray-200 text-gray-700"
                        }`}
                      >
                        NPR 100 - 200
                      </button>
                      <button
                        onClick={() => setPriceRange([200, 300])}
                        className={`px-4 py-2 text-sm rounded-full border ${
                          priceRange[0] === 200 && priceRange[1] === 300
                            ? "border-[#5851DB] bg-[#5851DB]/5 text-[#5851DB]"
                            : "border-gray-200 text-gray-700"
                        }`}
                      >
                        NPR 200 - 300
                      </button>
                      <button
                        onClick={() => setPriceRange([300, 500])}
                        className={`px-4 py-2 text-sm rounded-full border ${
                          priceRange[0] === 300 && priceRange[1] === 500
                            ? "border-[#5851DB] bg-[#5851DB]/5 text-[#5851DB]"
                            : "border-gray-200 text-gray-700"
                        }`}
                      >
                        NPR 300+
                      </button>
                    </div>
                  </div>
                )}

                {activeFilterTab === "rating" && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Minimum Rating</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setRatingFilter(rating)}
                          className={`py-3 flex flex-col items-center justify-center rounded-lg transition-all ${
                            ratingFilter === rating
                              ? "bg-[#5851DB] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {rating === 0 ? (
                            <span className="font-medium">Any</span>
                          ) : (
                            <>
                              <div className="flex items-center">
                                {[...Array(rating)].map((_, i) => (
                                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-xs mt-1">{rating}+ Stars</span>
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeFilterTab === "sort" && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Sort Products By</h3>
                    <div className="space-y-2">
                      <SortOptionMobile
                        active={sortOption === "featured"}
                        onClick={() => setSortOption("featured")}
                        icon={<Sparkles size={18} />}
                        label="Featured"
                      />
                      <SortOptionMobile
                        active={sortOption === "price-low-high"}
                        onClick={() => setSortOption("price-low-high")}
                        icon={<ArrowUpDown size={18} />}
                        label="Price: Low to High"
                      />
                      <SortOptionMobile
                        active={sortOption === "price-high-low"}
                        onClick={() => setSortOption("price-high-low")}
                        icon={<ArrowUpDown size={18} className="rotate-180" />}
                        label="Price: High to Low"
                      />
                      <SortOptionMobile
                        active={sortOption === "rating"}
                        onClick={() => setSortOption("rating")}
                        icon={<Star size={18} />}
                        label="Highest Rated"
                      />
                      <SortOptionMobile
                        active={sortOption === "discount"}
                        onClick={() => setSortOption("discount")}
                        icon={<Tag size={18} />}
                        label="Biggest Discount"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <div className="p-4 border-t sticky bottom-0 bg-white">
                <button
                  onClick={closeMobileFilterDrawer}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-[#5851DB] text-white rounded-lg font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Search and Filter Bar */}
      <div className="sticky -top-5 z-30 bg-white shadow-lg hidden md:block">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Enhanced Search with Suggestions */}
            <div className="relative flex-grow max-w-md">
              <div
                className={`relative transition-all duration-300 ${searchFocused ? "" : ""}`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-full border-2 border-gray-200 focus:border-[#5851DB] focus:outline-none transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                />
                <div className="absolute left-4 top-3.5 text-[#5851DB]">
                  <Search className="w-5 h-5" />
                </div>

                {searchTerm && (
                  <button onClick={clearSearch} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500">Recent Searches</h4>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          onClick={() => applyRecentSearch(term)}
                        >
                          <div className="p-2 rounded-full bg-[#5851DB]/10 text-[#5851DB]">
                            <Search className="w-4 h-4" />
                          </div>
                          <span className="text-gray-700">{term}</span>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-100 bg-gray-50">
                      <button
                        className="text-sm text-[#5851DB] hover:text-[#5851DB] font-medium flex items-center gap-1"
                        onClick={() => setRecentSearches([])}
                      >
                        <X className="w-3.5 h-3.5" />
                        Clear recent searches
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center gap-2">
              {/* Sort Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full shadow-sm hover:border-[#5851DB]/20 hover:bg-[#5851DB]/5 transition-all"
                  onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
                >
                  <ArrowUpDown size={16} />
                  <span className="hidden sm:inline">Sort</span>
                </motion.button>

                <AnimatePresence>
                  {isAdvancedFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-100">
                        <h4 className="text-sm font-medium text-gray-500">Sort By</h4>
                      </div>
                      <div>
                        <SortOption
                          active={sortOption === "featured"}
                          onClick={() => setSortOption("featured")}
                          icon={<Sparkles size={16} />}
                          label="Featured"
                        />
                        <SortOption
                          active={sortOption === "price-low-high"}
                          onClick={() => setSortOption("price-low-high")}
                          icon={<ArrowUpDown size={16} />}
                          label="Price: Low to High"
                        />
                        <SortOption
                          active={sortOption === "price-high-low"}
                          onClick={() => setSortOption("price-high-low")}
                          icon={<ArrowUpDown size={16} className="rotate-180" />}
                          label="Price: High to Low"
                        />
                        <SortOption
                          active={sortOption === "rating"}
                          onClick={() => setSortOption("rating")}
                          icon={<Star size={16} />}
                          label="Highest Rated"
                        />
                        <SortOption
                          active={sortOption === "discount"}
                          onClick={() => setSortOption("discount")}
                          icon={<Tag size={16} />}
                          label="Biggest Discount"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Filter Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-[#5851DB] text-white rounded-full shadow-md hover:shadow-lg transition-all"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              {/* Reset Filters Button */}
              {(selectedCategory !== "ALL" ||
                sortOption !== "featured" ||
                priceRange[0] > 0 ||
                priceRange[1] < 500 ||
                ratingFilter > 0 ||
                showOnlyDiscounted ||
                searchTerm) && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full shadow-sm hover:border-red-200 hover:bg-red-50 transition-all"
                  onClick={resetFilters}
                >
                  <RefreshCw size={16} />
                  <span className="hidden sm:inline">Reset</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Enhanced Filter Options */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pb-4 overflow-hidden"
              >
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Category Filter */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Category</h3>
                      <div className="flex flex-wrap gap-2">
                        <FilterButton
                          active={selectedCategory === "ALL"}
                          onClick={() => setSelectedCategory("ALL")}
                          color="bg-gradient-to-r from-gray-700 to-gray-900"
                        >
                          All Products
                        </FilterButton>
                        <FilterButton
                          active={selectedCategory === "FEATURED"}
                          onClick={() => setSelectedCategory("FEATURED")}
                          color="bg-gradient-to-r from-yellow-500 to-yellow-600"
                        >
                          Featured Only
                        </FilterButton>
                        <FilterButton
                          active={selectedCategory === "GAAY CHAAP DETERGENTS"}
                          onClick={() => setSelectedCategory("GAAY CHAAP DETERGENTS")}
                          color="bg-gradient-to-r from-red-600 to-[#5851DB]"
                        >
                          Gaay Chaap Detergents
                        </FilterButton>
                        <FilterButton
                          active={selectedCategory === "CLEANING LIQUIDS"}
                          onClick={() => setSelectedCategory("CLEANING LIQUIDS")}
                          color="bg-gradient-to-r from-red-500 to-red-600"
                        >
                          Cleaning Liquids
                        </FilterButton>
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Price Range (NPR)</h3>
                      <div className="px-2">
                        <div className="relative h-2 bg-gray-200 rounded-full mb-6">
                          <div
                            className="absolute h-2 bg-gradient-to-r from-red-600 to-[#5851DB] rounded-full"
                            style={{
                              left: `${(priceRange[0] / 500) * 100}%`,
                              width: `${((priceRange[1] - priceRange[0]) / 500) * 100}%`,
                            }}
                          ></div>
                          <input
                            type="range"
                            min="0"
                            max="500"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                            className="absolute w-full h-2 opacity-0 cursor-pointer"
                          />
                          <input
                            type="range"
                            min="0"
                            max="500"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                            className="absolute w-full h-2 opacity-0 cursor-pointer"
                          />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">NPR {priceRange[0]}</span>
                          <span className="text-sm font-medium text-gray-700">NPR {priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating and Discount Filters */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Additional Filters</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Minimum Rating</label>
                          <div className="flex items-center gap-1">
                            {[0, 1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                onClick={() => setRatingFilter(rating)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                                  ratingFilter === rating
                                    ? "bg-yellow-400 text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                              >
                                {rating === 0 ? (
                                  "Any"
                                ) : (
                                  <Star size={16} className={ratingFilter === rating ? "fill-white" : ""} />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={showOnlyDiscounted}
                              onChange={() => setShowOnlyDiscounted(!showOnlyDiscounted)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-700">Show only discounted items</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Applied Filters */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Applied Filters:</span>

                      {selectedCategory !== "ALL" && (
                        <FilterTag
                          label={selectedCategory === "FEATURED" ? "Featured Only" : selectedCategory}
                          onRemove={() => setSelectedCategory("ALL")}
                        />
                      )}

                      {(priceRange[0] > 0 || priceRange[1] < 500) && (
                        <FilterTag
                          label={`NPR ${priceRange[0]} - NPR ${priceRange[1]}`}
                          onRemove={() => setPriceRange([0, 500])}
                        />
                      )}

                      {ratingFilter > 0 && (
                        <FilterTag label={`${ratingFilter}+ Stars`} onRemove={() => setRatingFilter(0)} />
                      )}

                      {showOnlyDiscounted && (
                        <FilterTag label="Discounted Only" onRemove={() => setShowOnlyDiscounted(false)} />
                      )}

                      {sortOption !== "featured" && (
                        <FilterTag
                          label={`Sorted by: ${
                            sortOption === "price-low-high"
                              ? "Price (Low to High)"
                              : sortOption === "price-high-low"
                                ? "Price (High to Low)"
                                : sortOption === "rating"
                                  ? "Highest Rated"
                                  : "Biggest Discount"
                          }`}
                          onRemove={() => setSortOption("featured")}
                        />
                      )}

                      {searchTerm && <FilterTag label={`Search: "${searchTerm}"`} onRemove={() => setSearchTerm("")} />}

                      {(selectedCategory !== "ALL" ||
                        sortOption !== "featured" ||
                        priceRange[0] > 0 ||
                        priceRange[1] < 500 ||
                        ratingFilter > 0 ||
                        showOnlyDiscounted ||
                        searchTerm) && (
                        <button
                          onClick={resetFilters}
                          className="text-sm text-[#5851DB] hover:text-[#5851DB] font-medium flex items-center gap-1"
                        >
                          <RefreshCw size={14} />
                          Reset all
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-30 px-4 py-2">
        <div className="flex items-center justify-between">
          <button onClick={toggleMobileSearch} className="flex flex-col items-center justify-center p-2 text-gray-600">
            <Search size={20} />
            <span className="text-xs mt-1">Search</span>
          </button>

          <button
            onClick={toggleMobileFilterDrawer}
            className="flex flex-col items-center justify-center p-2 text-gray-600 relative"
          >
            <Filter size={20} />
            <span className="text-xs mt-1">Filter</span>
            {activeFiltersCount() > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount()}
              </span>
            )}
          </button>

          <button
            onClick={() => setSortOption(sortOption === "featured" ? "price-low-high" : "featured")}
            className="flex flex-col items-center justify-center p-2 text-gray-600"
          >
            <ArrowUpDown size={20} />
            <span className="text-xs mt-1">Sort</span>
          </button>

          {(selectedCategory !== "ALL" ||
            sortOption !== "featured" ||
            priceRange[0] > 0 ||
            priceRange[1] < 500 ||
            ratingFilter > 0 ||
            showOnlyDiscounted ||
            searchTerm) && (
            <button onClick={resetFilters} className="flex flex-col items-center justify-center p-2 text-red-600">
              <RefreshCw size={20} />
              <span className="text-xs mt-1">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Bar for Mobile */}
      {isMobile && (selectedCategory !== "ALL" || searchTerm) && (
        <div className="md:hidden sticky top-0 z-20 bg-white border-b px-4 py-2 flex items-center overflow-x-auto scrollbar-hide">
          {selectedCategory !== "ALL" && (
            <div className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5851DB]/5 border border-[#5851DB]/20 text-sm text-[#5851DB] mr-2">
              {selectedCategory === "FEATURED"
                ? "Featured"
                : selectedCategory === "GAAY CHAAP DETERGENTS"
                  ? "Detergents"
                  : "Liquids"}
              <button onClick={() => setSelectedCategory("ALL")}>
                <X size={14} />
              </button>
            </div>
          )}

          {searchTerm && (
            <div className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5851DB]/5 border border-[#5851DB]/20 text-sm text-[#5851DB] mr-2">
              Search: {searchTerm}
              <button onClick={() => setSearchTerm("")}>
                <X size={14} />
              </button>
            </div>
          )}

          {sortOption !== "featured" && (
            <div className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5851DB]/5 border border-[#5851DB]/20 text-sm text-[#5851DB]">
              {sortOption === "price-low-high"
                ? "Price: Low to High"
                : sortOption === "price-high-low"
                  ? "Price: High to Low"
                  : sortOption === "rating"
                    ? "Highest Rated"
                    : "Biggest Discount"}
              <button onClick={() => setSortOption("featured")}>
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      <main className="container mx-auto px-4 py-12 pb-24 md:pb-12">
        {/* Featured Products Section */}
        <section ref={featuredRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4 mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#5851DB]">FEATURED PRODUCTS</h2>
            <div className="flex-grow h-1 bg-gradient-to-r from-red-500 to-[#5851DB] rounded-full"></div>
          </motion.div>

          {getFeaturedProducts().length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {getFeaturedProducts().map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  openModal={openModal}
                  calculateDiscountedPrice={calculateDiscountedPrice}
                  inWishlist={wishlist.includes(product.id)}
                  toggleWishlist={toggleWishlist}
                  index={index}
                  generateWhatsAppLink={generateWhatsAppLink}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="No featured products found matching your criteria." />
          )}
        </section>

        {/* Gaay Chaap Detergents Section */}
        <section ref={detergentsRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4 mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#5851DB]">GAAY CHAAP DETERGENTS</h2>
            <div className="flex-grow h-1 bg-gradient-to-r from-red-600 to-[#5851DB] rounded-full"></div>
          </motion.div>

          {getProductsByCategory("GAAY CHAAP DETERGENTS").length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {getProductsByCategory("GAAY CHAAP DETERGENTS").map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  openModal={openModal}
                  calculateDiscountedPrice={calculateDiscountedPrice}
                  inWishlist={wishlist.includes(product.id)}
                  toggleWishlist={toggleWishlist}
                  index={index}
                  generateWhatsAppLink={generateWhatsAppLink}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="No detergent products found matching your criteria." />
          )}
        </section>

        {/* Cleaning Liquids Section */}
        <section ref={liquidsRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4 mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-red-600">CLEANING LIQUIDS</h2>
            <div className="flex-grow h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </motion.div>

          {getProductsByCategory("CLEANING LIQUIDS").length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {getProductsByCategory("CLEANING LIQUIDS").map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  openModal={openModal}
                  calculateDiscountedPrice={calculateDiscountedPrice}
                  inWishlist={wishlist.includes(product.id)}
                  toggleWishlist={toggleWishlist}
                  index={index}
                  generateWhatsAppLink={generateWhatsAppLink}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="No cleaning liquid products found matching your criteria." />
          )}
        </section>
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ProductModal
            product={selectedProduct}
            closeModal={closeModal}
            calculateDiscountedPrice={calculateDiscountedPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            inWishlist={wishlist.includes(selectedProduct.id)}
            toggleWishlist={toggleWishlist}
            generateWhatsAppLink={generateWhatsAppLink}
          />
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button */}
      <motion.button
        className="fixed bottom-20 md:bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-red-600 to-[#5851DB] text-white shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  )
}

// Filter Button Component
const FilterButton = ({ children, active, onClick, color, fullWidth }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
        fullWidth ? "col-span-2" : ""
      } ${active ? `${color} text-white shadow-md` : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

// Sort Option Component
const SortOption = ({ active, onClick, icon, label }) => {
  return (
    <button
      className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors ${
        active ? "bg-[#5851DB]/5 text-[#5851DB]" : "text-gray-700"
      }`}
      onClick={onClick}
    >
      <div className={`p-1.5 rounded-full ${active ? "bg-[#5851DB]/10" : "bg-gray-100"}`}>{icon}</div>
      <span>{label}</span>
      {active && <Check size={16} className="ml-auto" />}
    </button>
  )
}

// Sort Option Mobile Component
const SortOptionMobile = ({ active, onClick, icon, label }) => {
  return (
    <button
      className={`w-full px-4 py-4 text-left rounded-xl flex items-center gap-3 transition-colors ${
        active
          ? "bg-[#5851DB]/10 text-[#5851DB] border border-[#5851DB]/20"
          : "bg-gray-50 text-gray-700 border border-gray-100"
      }`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-full ${active ? "bg-[#5851DB]/20" : "bg-gray-200"}`}>{icon}</div>
      <span className="font-medium">{label}</span>
      {active && <Check size={18} className="ml-auto" />}
    </button>
  )
}

// Filter Tag Component
const FilterTag = ({ label, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5851DB]/5 border border-[#5851DB]/20 text-sm text-[#5851DB]">
      {label}
      <button onClick={onRemove} className="text-[#5851DB] hover:text-[#5851DB]">
        <X size={14} />
      </button>
    </div>
  )
}

// Empty State Component
const EmptyState = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm"
    >
      <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#5851DB]/10">
        <Search size={32} className="text-[#5851DB]" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
      <p className="text-gray-500">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#5851DB]/10 text-[#5851DB] rounded-full hover:bg-[#5851DB]/20 transition-colors"
      >
        <RefreshCw size={16} />
        Reset Filters
      </button>
    </motion.div>
  )
}

// Product Card Component
const ProductCard = ({
  product,
  openModal,
  calculateDiscountedPrice,
  inWishlist,
  toggleWishlist,
  index,
  generateWhatsAppLink,
}) => {
  const discountedPrice = calculateDiscountedPrice(product.originalPrice, product.discountPercentage)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden" onClick={() => openModal(product)}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
          />

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
              {product.discountPercentage}% OFF
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
              <Sparkles size={12} />
              FEATURED
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product.id)
            }}
            className={`absolute top-4 ${product.featured ? "left-28" : "left-4"} w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
              inWishlist
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                : "bg-white/80 text-gray-600 hover:bg-white"
            } shadow-md`}
          >
            <Heart size={18} className={inWishlist ? "fill-white" : ""} />
          </button>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Quick View Button */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#5851DB] font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              onClick={() => openModal(product)}
            >
              <span>Quick View</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-2 cursor-pointer" onClick={() => openModal(product)}>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-[#5851DB] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.quantity}</p>
          </div>

          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                } ${i === Math.floor(product.rating) && product.rating % 1 > 0 ? "text-yellow-400 fill-yellow-400" : ""}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-[#5851DB]">NPR {discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through ml-2">NPR {product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-[#5851DB] hover:from-red-700 to-[#4a46b8] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-all shadow-md"
              onClick={() => window.open(generateWhatsAppLink(product), "_blank")}
            >
              <ShoppingBag size={16} />
              Buy Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Product Modal Component
const ProductModal = ({
  product,
  closeModal,
  calculateDiscountedPrice,
  quantity,
  setQuantity,
  inWishlist,
  toggleWishlist,
  generateWhatsAppLink,
}) => {
  const discountedPrice = calculateDiscountedPrice(product.originalPrice, product.discountPercentage)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock multiple images for product gallery
  const productImages = [
    product.image || "/placeholder.svg",
    // "/src/assets/product/a6.jpg",
    // "/placeholder.svg?height=200&width=200",
    // "/placeholder.svg?height=200&width=200",
  ]

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const totalPrice = (discountedPrice * quantity).toFixed(2)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white p-5 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#5851DB] truncate">{product.name}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </motion.button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-center h-80">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={productImages[selectedImage]}
                alt={product.name}
                className="max-h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-[#5851DB] shadow-md" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                </button>
              ))}
            </div>

            {product.discountPercentage > 0 && (
              <div className="mt-6 bg-red-50 border border-red-100 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-bold px-3 py-2 rounded-lg">
                    {product.discountPercentage}% OFF
                  </div>
                  <p className="text-red-600 font-medium">
                    Limited time offer! Save NPR {(product.originalPrice - discountedPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b mb-6 overflow-x-auto scrollbar-hide">
              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "description"
                    ? "text-[#5851DB] border-b-2 border-[#5851DB]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "features"
                    ? "text-[#5851DB] border-b-2 border-[#5851DB]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("features")}
              >
                Key Features
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "usage"
                    ? "text-[#5851DB] border-b-2 border-[#5851DB]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("usage")}
              >
                Usage Instructions
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-grow">
              {activeTab === "description" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-700 leading-relaxed">
                  <p className="mb-4">{product.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-medium text-gray-700">Quantity:</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{product.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Rating:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          } ${i === Math.floor(product.rating) && product.rating % 1 > 0 ? "text-yellow-400 fill-yellow-400" : ""}`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ul className="space-y-3">
                    {product.keyFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="bg-[#5851DB]/10 text-[#5851DB] p-1 rounded-full mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "usage" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed"
                >
                  <h4 className="font-medium text-gray-900 mb-2">How to Use:</h4>
                  <p>{product.usageInstructions}</p>
                </motion.div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-sm text-gray-500">Price:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-[#5851DB]">NPR {discountedPrice}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-base text-gray-500 line-through">
                        NPR {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center rounded-l-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center bg-gray-50 border-y text-gray-800 font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center rounded-r-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(generateWhatsAppLink(product, quantity), "_blank")}
                  className="flex-1 bg-gradient-to-r from-red-600 to-[#5851DB] hover:from-red-700 to-[#4a46b8] text-white py-3 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <ShoppingBag size={20} />
                  Buy Now • NPR {totalPrice}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWishlist(product.id)
                  }}
                  className={`px-6 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    inWishlist
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  <Heart size={20} className={inWishlist ? "fill-red-600" : ""} />
                  {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Shop
