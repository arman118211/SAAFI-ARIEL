"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { Instagram, MousePointer, Grid } from "lucide-react"

const saafigramImages = [
  "/customer/IMG_1.webp",
  "/customer/uimg.webp",
  "/customer/IMG_8224.webp",
  "/customer/c14.webp",
  "/customer/IMG_8217.webp",
  "/customer/IMG_8192.webp",
  "/customer/IMG_8148.webp",
  "/customer/IMG_8212.webp",
]

const SaafiGram = () => {
  const [activeImage, setActiveImage] = useState(null)
  const [layoutMode, setLayoutMode] = useState("slider") // slider, collage
  const containerRef = useRef(null)
  const sliderRef = useRef(null)
  const [sliderPosition, setSliderPosition] = useState(0)
  const controls = useAnimation()
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Parallax effect values
  const rotateValues = useTransform(scrollYProgress, [0, 1], [0, 10])
  const scaleValues = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // Handle slider drag
  const handleSliderDrag = (_, info) => {
    const newPosition = sliderPosition + info.delta.x
    setSliderPosition(newPosition)
  }

  // Selected image view
  const expandImage = (index) => {
    setActiveImage(index)
  }

  const closeExpandedImage = () => {
    setActiveImage(null)
  }

  // Reset slider position when it goes too far
  useEffect(() => {
    if (layoutMode === "slider") {
      const maxScroll = -(saafigramImages.length * 310) // Approximate width of all images

      // Auto-scroll effect
      const interval = setInterval(() => {
        setSliderPosition((prev) => {
          // Reset position when reaching the end to create infinite scroll effect
          if (prev < maxScroll + 600) {
            return 0
          }
          return prev - 1
        })
      }, 30)

      return () => clearInterval(interval)
    }
  }, [layoutMode, saafigramImages.length])

  const renderImagesByLayout = () => {
    switch (layoutMode) {
      case "slider":
        return (
          <motion.div
            ref={sliderRef}
            className="relative overflow-hidden h-[220px] xs:h-[250px] sm:h-[300px] md:h-[400px] w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute flex gap-3 sm:gap-5 h-full py-4 sm:py-6 px-2"
              drag="x"
              dragConstraints={{ left: -1500, right: 100 }}
              onDragEnd={handleSliderDrag}
              style={{ x: sliderPosition }}
            >
              {/* First set of images */}
              {saafigramImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="w-[160px] xs:w-[180px] sm:w-[250px] md:w-[300px] h-full rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 cursor-grab"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => (activeImage === index ? closeExpandedImage() : expandImage(index))}
                >
                  <img
                    src={image || "/api/placeholder/300/400"}
                    alt={`Saafigram image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}

              {/* Duplicate images for infinite scroll effect */}
              {saafigramImages.map((image, index) => (
                <motion.div
                  key={`duplicate-${index}`}
                  className="w-[160px] xs:w-[180px] sm:w-[250px] md:w-[300px] h-full rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 cursor-grab"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <img
                    src={image || "/api/placeholder/300/400"}
                    alt={`Saafigram image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-[#5851DB] bg-white p-2 sm:p-3 rounded-full shadow-lg">
              <MousePointer size={16} className="sm:w-5 sm:h-5" />
            </div>
          </motion.div>
        )

      case "collage":
        return (
          <div className="h-[500px] md:h-[600px] overflow-hidden">
            <motion.div
              className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 md:gap-3 relative overflow-hidden h-full"
              style={{ rotate: rotateValues, scale: scaleValues }}
            >
              {saafigramImages.map((image, index) => {
                // Larger feature image based on screen size
                const isFeature = index === 2
                const spanClasses = isFeature
                  ? "row-span-2 col-span-2 xs:row-span-2 xs:col-span-2 sm:row-span-2 sm:col-span-2 "
                  : ""

                return (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden rounded-md sm:rounded-lg cursor-pointer ${spanClasses}`}
                    style={{
                      aspectRatio: isFeature ? "1" : index % 2 === 0 ? "0.8" : "1.2",
                    }}
                    whileHover={{ scale: 1.03, zIndex: 10 }}
                    onClick={() => (activeImage === index ? closeExpandedImage() : expandImage(index))}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1, duration: 0.5 },
                    }}
                  >
                    <img
                      src={image || "/api/placeholder/300/300"}
                      alt={`Saafigram image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-1 sm:p-2"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <p className="text-white text-xs md:text-sm font-bold">#SaafiClean</p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        )

      default:
        return (
          <motion.div
            ref={sliderRef}
            className="relative overflow-hidden h-[220px] xs:h-[250px] sm:h-[300px] md:h-[400px] w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Default to slider if mode is invalid */}
            <motion.div
              className="absolute flex gap-3 sm:gap-5 h-full py-4 sm:py-6 px-2"
              drag="x"
              dragConstraints={{ left: -1500, right: 100 }}
              onDragEnd={handleSliderDrag}
              style={{ x: sliderPosition }}
            >
              {saafigramImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="w-[160px] xs:w-[180px] sm:w-[250px] md:w-[300px] h-full rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 cursor-grab"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => (activeImage === index ? closeExpandedImage() : expandImage(index))}
                >
                  <img
                    src={image || "/api/placeholder/300/400"}
                    alt={`Saafigram image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )
    }
  }

  return (
    <section className="py-8 xs:py-10 sm:py-16 md:py-20 px-3 sm:px-4 bg-white overflow-hidden" ref={containerRef}>
      <div className="container mx-auto">
        <motion.h2
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-[#ff0000] relative inline-block mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              Check Out  <span className="text-[#5851DB]">Our SaafiGram</span>
            </h2>
          {/* <span className="absolute bottom-[-10px] sm:bottom-[-15px] left-1/2 transform -translate-x-1/2 w-12 sm:w-16 md:w-24 h-1 bg-[#5851DB]"></span> */}
          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-[#ff0000] to-[#5851DB] rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl mx-auto mb-5 sm:mb-8 mt-6 sm:mt-8 px-2 sm:px-0 text-xs xs:text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join our community and see how Saafi Ariel is transforming laundry experiences. Share your clean moments with
          us using #SaafiClean.
        </motion.p>

        {/* Layout toggle - responsive design */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <motion.button
            onClick={() => setLayoutMode("slider")}
            className={`px-3 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2 ${
              layoutMode === "slider" ? "bg-[#5851DB] text-white" : "bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-4 sm:h-4"
            >
              <path d="M21 7H3M21 12H3M21 17H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Carousel</span>
          </motion.button>

          <motion.button
            onClick={() => setLayoutMode("collage")}
            className={`px-3 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2 ${
              layoutMode === "collage" ? "bg-[#5851DB] text-white" : "bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Grid size={14} className="sm:w-4 sm:h-4" />
            <span>Collage</span>
          </motion.button>
        </div>

        {/* Layout content */}
        <div className="relative">
          {/* Carousel layout visual hint */}
          {layoutMode === "slider" && (
            <motion.div
              className="absolute -top-8 sm:-top-10 right-0 text-xs sm:text-sm text-gray-500 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-[10px] xs:text-xs sm:text-sm">Drag to explore</span>
              <motion.div
                className="ml-1 sm:ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="sm:w-4 sm:h-4">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {renderImagesByLayout()}
        </div>

        {/* Instagram link */}
        <motion.div
          className="flex justify-center mt-6 sm:mt-10 md:mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://www.instagram.com/arielsaafi?igsh=MW5vZWtwMDEzNm1pag=="
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[#5851DB] font-medium border border-[#5851DB]/20 px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-full hover:bg-[#5851DB]/5 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Instagram size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
            <span className="text-[11px] xs:text-xs sm:text-sm">Follow us on Instagram @saafi_official</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Fullscreen expanded image - responsive modal */}
      {activeImage !== null && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeExpandedImage}
        >
          <motion.div className="relative max-w-full max-h-[80vh] w-full md:w-auto">
            <motion.img
              src={saafigramImages[activeImage]}
              alt={`Expanded image ${activeImage + 1}`}
              className="max-w-full max-h-[80vh] w-full md:w-auto object-contain rounded"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-black/50 text-white text-center rounded-b"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs sm:text-sm md:text-base font-medium">#SaafiClean</p>
            </motion.div>
          </motion.div>
          <motion.button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white bg-black/30 rounded-full p-1.5 sm:p-2"
            onClick={closeExpandedImage}
            whileHover={{ scale: 1.1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-5 sm:h-5"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </motion.button>
        </motion.div>
      )}
    </section>
  )
}

export default SaafiGram
