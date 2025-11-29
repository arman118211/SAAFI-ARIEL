"use client"
import { motion } from "framer-motion"

const BannerSection = () => {
  return (
    <section className="py-12 px-4 w-full  bg-white h-full">
      <div className="container mx-auto">
        <motion.div
          className="overflow-hidden rounded-2xl shadow-xl relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.01 }}
        >
          <img
            src="/banner/girl1.jpg"
            alt="Saafi Banner"
            className="w-full h-auto max-h-[650px] object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/20 to-[#5851DB]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
      </div>
    </section>
  )
}

export default BannerSection
