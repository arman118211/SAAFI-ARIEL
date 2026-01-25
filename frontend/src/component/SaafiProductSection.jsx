"use client"
import { Package, Heart, ChevronRight } from "lucide-react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import {Link} from 'react-router-dom'

const SaafiProductSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        {/* Section heading with animated underline */}
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-red-500 relative inline-block">
          <h2 className="text-3xl md:text-5xl font-bold mb-4  text-gray-800">
              Find The Best  <span className="text-[#5851DB]">Saafi Product For You</span>
            </h2>
            <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-[#ff0000] to-[#5851DB] rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          </h2>
          {/* <div className="w-32 h-1 bg-purple-500 mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse"></div>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Browse by Type Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-102">
            <div className="p-8 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-12 -mt-12 z-0"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mr-4 shadow-md transition-transform duration-300 hover:rotate-12">
                  <Package size={24} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Browse by Type</h3>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed relative z-10">
                Explore our range of detergents - powder, liquid, or capsules. Find the format that suits your needs.
              </p>
              
              <Link to='/shop'>
                <div className="flex items-center text-purple-600 font-semibold group cursor-pointer">
                  <span className="mr-2 group-hover:mr-3 transition-all">Explore Products</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
            
            {/* Image container without 3D hover effect */}
            <div className="relative w-full pb-[98.5%] overflow-hidden bg-gradient-to-br from-purple-50 to-white">
              <img
                src="/banner/ca1.png"
                alt="Saafi product types"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              />
              {/* Simple shadow */}
              <div className="absolute inset-x-8 bottom-6 rounded-full bg-black/10 blur-md opacity-40"
                style={{ height: '10px' }}></div>
            </div>
          </div>

          {/* Browse by Need Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-102">
            <div className="p-8 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-12 -mt-12 z-0"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mr-4 shadow-md transition-transform duration-300 hover:rotate-12">
                  <Heart size={24} className="text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Browse by Need</h3>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed relative z-10">
                Discover products tailored to your specific laundry challenges - stain removal, fabric care, or freshness.
              </p>
              
              <Link to='/shop'>
                <div className="flex items-center text-red-600 font-semibold group cursor-pointer">
                  <span className="mr-2 group-hover:mr-3 transition-all">Find Solutions</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
            
            {/* Image container without 3D hover effect */}
            <div className="relative w-full pb-[98.5%] overflow-hidden bg-gradient-to-br from-red-50 to-white">
              <img
                src="/banner/Extra.png"
                alt="Saafi product needs"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              />
              {/* Simple shadow */}
              <div className="absolute inset-x-8 bottom-6 rounded-full bg-black/10 blur-md opacity-40"
                style={{ height: '10px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaafiProductSection