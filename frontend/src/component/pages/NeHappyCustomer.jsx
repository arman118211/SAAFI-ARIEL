"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star, Award } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "ग्राहक",
    image: "/customer/IMG_8192.webp",
    text: "साफी एरियलले मेरो लन्ड्री दिनचर्यामा पूरै रूपले परिवर्तन ल्याएको छ। यसको दाग हटाउने क्षमता असाधारण छ, र मेरा कपडाहरू कहिल्यै यति ताजो गन्ध गरेका थिएनन्!",
    rating: 5,
    location: "नेपाल"
  },
  {
    id: 2,
    name: "ग्राहक",
    image: "/customer/IMG_8217.webp",
    text: "व्यस्त आमा हुँ, म त्यस्ता डिटर्जेन्ट चाहन्छु जुन पहिलो पटकमै काम गर्छ। साफी एरियलले मेरो बच्चाको कपडाबाट सबैभन्दा गाह्रो दाग हटाउँछ, र त्यो कुनै अतिरिक्त प्रयास बिना।",
    rating: 5,
    location: "नेपाल"
  },
  {
    id: 3,
    name: "ग्राहक",
    image: "/customer/IMG_8224.webp",
    text: "मैले धेरै डिटर्जेन्टहरू प्रयोग गरेको छु, तर साफी एरियल सबैभन्दा उत्तम हो। यसले रंगहरूलाई जीवन्त राख्छ र सेतो कपडाहरूलाई सफा राख्छ, प्रत्येक धुनेपछि।",
    rating: 4,
    location: "नेपाल"
  },
  {
    id: 4,
    name: "ग्राहक",
    image: "/customer/IMG_8212.webp",
    text: "यसको गन्ध अद्भुत छ र केहि दिनसम्म टिक्छ। मेरा कपडाहरू मात्र सफा देखिँदैनन्, तर गजबको गन्ध पनि आउँछ। म यसलाई अत्यधिक सिफारिस गर्दछु!",
    rating: 5,
    location: "नेपाल"
  }
]

// Confetti component
const Confetti = ({ isActive }) => {
  const confettiCount = 50;
  const colors = ["#ff0000", "#5851DB", "#ffcc00", "#00ccff", "#ff6600"];
  
  if (!isActive) return null;
  
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(confettiCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * 100 - 50 + 50,
            y: -20,
            scale: 0
          }}
          animate={{
            x: Math.random() * 200 - 100 + 50,
            y: Math.random() * 300 + 100,
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: "easeOut"
          }}
          style={{
            width: Math.random() * 8 + 5 + "px",
            height: Math.random() * 8 + 5 + "px",
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
          }}
        />
      ))}
    </div>
  );
};

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center mt-2">
      {[...Array(5)].map((_, index) => (
        <motion.div 
          key={index} 
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
        >
          <Star
            size={18}
            className={`${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} mr-1`}
          />
        </motion.div>
      ))}
    </div>
  );
};

const NeHappyCustomer = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const nextSlide = () => {
    setDirection("right")
    setCurrent((prev) => (prev + 1) % testimonials.length)
    triggerConfetti()
  }

  const prevSlide = () => {
    setDirection("left")
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    triggerConfetti()
  }

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        nextSlide()
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isHovering])

  const handleMouseMove = (e) => {
    if (!isHovering) return
    
    const container = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - container.left) / container.width - 0.5;
    const y = (e.clientY - container.top) / container.height - 0.5;
    
    setMousePosition({ x, y });
  };

  const variants = {
    enter: (direction) => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction === "right" ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction === "right" ? -45 : 45,
    }),
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto relative">
        <motion.div
          className="absolute top-10 right-10 text-red-500 opacity-20"
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Award size={80} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-0 left-10 text-indigo-500 opacity-20"
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: -360 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Award size={60} />
        </motion.div>
        
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#ff0000] relative inline-block mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              हाम्रो <span className="text-[#5851DB]">खुशी ग्राहक</span>
            </h2>
            <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-[#ff0000] to-[#5851DB] rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          हाम्रो शब्द मात्र नगर्नुहोस्। हाम्रा ग्राहकहरूले साफी एरियल उत्पादनसँगको अनुभवको बारेमा के भन्नु भएको छ हेर्नुहोस्।
        </motion.p>

        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            className="overflow-hidden rounded-2xl bg-white shadow-xl p-8 md:p-10 min-h-[250px] border border-gray-100 relative perspective-1000"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{
              perspective: "1000px"
            }}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <div className="absolute top-6 left-6 opacity-10">
              <Quote size={60} className="text-[#5851DB]" />
            </div>

            <Confetti isActive={showConfetti} />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  duration: 0.6, 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                className="flex flex-col md:flex-row items-center gap-8 relative z-10"
                style={{
                  transform: isHovering ? `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)` : "none",
                  transformStyle: "preserve-3d",
                  transition: isHovering ? "none" : "transform 0.5s ease"
                }}
              >
                <motion.div 
                  className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#5851DB]/20 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  style={{
                    transform: isHovering ? `translateZ(20px)` : "none"
                  }}
                >
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div style={{
                  transform: isHovering ? `translateZ(40px)` : "none"
                }}>
                  <motion.p 
                    className="text-gray-700 text-lg italic mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonials[current].text}"
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="font-bold text-[#ff0000] text-lg">{testimonials[current].name}</h4>
                    <p className="text-gray-500 text-sm">{testimonials[current].location}</p>
                    <StarRating rating={testimonials[current].rating} />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg text-[#5851DB] hover:text-[#ff0000] transition-colors duration-300"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            className="absolute right-3 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg text-[#5851DB] hover:text-[#ff0000] transition-colors duration-300"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </motion.button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`h-3 rounded-full transition-all duration-300 ${
                  current === index ? "bg-[#ff0000] w-6" : "bg-gray-300 w-3"
                }`}
                onClick={() => {
                  setCurrent(index)
                  triggerConfetti()
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NeHappyCustomer