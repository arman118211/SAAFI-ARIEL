"use client"

import React from "react"

import { useEffect } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import {
  Award,
  CheckCircle,
  DropletIcon,
  Heart,
  Leaf,
  Lightbulb,
  Shield,
  Smile,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react"

const WhyChooseUs = () => {
  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Hero Section with Wave */}
      <HeroSection />

      {/* Our Promise Section */}
      <PromiseSection />

      {/* Results Section */}
      <ResultsSection />

      {/* Innovation Section */}
      <InnovationSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Quality Guarantee Section */}
      <QualityGuaranteeSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

// Hero Section Component with Wave - Styled like About page
const HeroSection = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#5851DB] to-red-600 opacity-90"></div>

      {/* Parallax background elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay opacity-60"
      ></motion.div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5851DB] rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Why Choose <span className="relative">Saafi Ariel</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8"
          >
            Experience the perfect blend of powerful cleaning and gentle care
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to='/shop'>
                <button className="px-8 py-3 bg-white text-[#5851DB] rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Discover Our Products
                </button>
            </Link>
            
          </motion.div>
        </motion.div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute top-0 bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[70px] md:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-white"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-white"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      {/* Floating elements */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full border-4 border-white opacity-20"
      ></motion.div>
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full border-4 border-red-500 opacity-20"
      ></motion.div>
    </section>
  )
}

// Our Promise Section
const PromiseSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const features = [
    {
      icon: <Star className="w-8 h-8 text-red-600" />,
      title: "Superior Cleaning Power",
      description: "Our advanced formula tackles even the toughest stains with unmatched effectiveness.",
    },
    {
      icon: <DropletIcon className="w-8 h-8 text-[#5851DB]" />,
      title: "Water Efficient Formula",
      description: "Designed to give perfect results even in quick wash cycles, saving water and energy.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-red-600" />,
      title: "Eco-Friendly Ingredients",
      description: "Biodegradable components that are gentle on the environment while tough on stains.",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#5851DB]" />,
      title: "Fabric Protection",
      description: "Special care formula that protects fabric fibers and colors, extending the life of your clothes.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-red-600" />,
      title: "Fresh Scent Technology",
      description: "Long-lasting freshness that keeps your clothes smelling beautiful all day long.",
    },
    {
      icon: <Heart className="w-8 h-8 text-[#5851DB]" />,
      title: "Family Safe",
      description: "Hypoallergenic formula suitable for sensitive skin and tested to be safe for the whole family.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5851DB] rounded-full filter blur-3xl opacity-5"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-medium text-sm mb-4">
              OUR PROMISE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              Our Promise <span className="text-[#5851DB]">To You</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-6 text-center">
            At Saafi Ariel, we're committed to providing you with the highest quality detergent that doesn't just clean,
            but transforms your laundry experience.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`w-16 h-16 ${index % 2 === 0 ? "bg-red-100" : "bg-[#5851DB]/10"} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {features.slice(3).map((feature, index) => (
              <div
                key={index + 3}
                className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`w-16 h-16 ${(index + 3) % 2 === 0 ? "bg-red-100" : "bg-[#5851DB]/10"} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Results Section
const ResultsSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const beforeAfterResults = [
    {
      stainType: "Red Wine",
      effectiveness: 98,
      icon: <DropletIcon className="text-red-600" />,
    },
    {
      stainType: "Grass",
      effectiveness: 96,
      icon: <Leaf className="text-[#5851DB]" />,
    },
    {
      stainType: "Grease",
      effectiveness: 99,
      icon: <Zap className="text-red-600" />,
    },
    {
      stainType: "Coffee",
      effectiveness: 97,
      icon: <DropletIcon className="text-[#5851DB]" />,
    },
  ]

  return (
    <section className="py-20 bg-white relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5851DB] rounded-full filter blur-3xl opacity-5"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#5851DB]/10 text-[#5851DB] font-medium text-sm mb-4">
            PROVEN RESULTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            See The <span className="text-red-600">Difference</span>
          </h2>
          <div className="w-24 h-1 bg-[#5851DB] mx-auto"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-6">
            See the difference Saafi Ariel makes with these real-world stain removal results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#5851DB] rounded-2xl"></div> */}
            {/* <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-red-600 rounded-2xl"></div> */}
            <div
             style={{
                backgroundImage: `url('/banner/change2.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
             className="relative z-10 bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl  overflow-hidden ">
              <div className="aspect-w-4 aspect-h-3 w-full h-[400px] flex items-center justify-center">
                <div className="text-center p-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="inline-block rounded-full p-5 bg-red-100 mb-4"
                  >
                    <TrendingUp size={48} className="text-red-600 " />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Before & After</h3>
                  <p className="text-gray-600">Interactive comparison would appear here</p>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#5851DB] to-red-600 text-white p-4 rounded-lg shadow-lg z-20"
            >
              <p className="font-bold">98% more effective than leading competitors</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Stain Removal <span className="text-[#5851DB]">Effectiveness</span>
            </h3>
            <div className="space-y-8">
              {beforeAfterResults.map((result, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    {React.cloneElement(result.icon, { size: 20 })}
                    <span className="font-semibold text-gray-800">{result.stainType} Stains</span>
                  </div>
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#5851DB] to-red-600"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${result.effectiveness}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.1 * index }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Competitor Average</span>
                    <span className="font-bold text-red-600">{result.effectiveness}%</span>
                  </div>
                </div>
              ))}
            </div>
            <motion.button
              className="mt-8 flex items-center gap-2 bg-gradient-to-r from-[#5851DB] to-red-600 hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lightbulb size={18} />
              <span>See Full Lab Results</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Innovation Section
const InnovationSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const innovations = [
    {
      icon: <Zap size={40} className="text-red-500" />,
      title: "StainLift™ Technology",
      description:
        "Our patented technology targets and lifts stains at the molecular level without damaging fabric fibers.",
    },
    {
      icon: <Sparkles size={40} className="text-[#5851DB]" />,
      title: "ColorShield™ Formula",
      description: "Special color-preserving agents that lock in vibrant colors wash after wash, preventing fading.",
    },
    {
      icon: <Leaf size={40} className="text-red-500" />,
      title: "EcoClean™ Process",
      description:
        "Sustainable manufacturing processes that reduce water usage by 40% compared to traditional methods.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-[#5851DB] to-red-600 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full border-[30px] border-white opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border-[20px] border-white opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Innovation At Our Core</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-lg max-w-3xl mx-auto mt-6">
            Our commitment to research and development has led to breakthrough technologies that revolutionize laundry
            care
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
                className="mb-6"
              >
                {innovation.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">{innovation.title}</h3>
              <p className="text-white/80">{innovation.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to='/contact'>
            <motion.button
                className="bg-white text-[#5851DB] hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Lightbulb size={20} />
                <span>Explore Our Technology</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Stats Section
const StatsSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const stats = [
    { value: "98%", label: "Customer Satisfaction", icon: <Smile className="text-red-600" /> },
    { value: "25+", label: "Years of Excellence", icon: <Award className="text-[#5851DB]" /> },
    { value: "15M+", label: "Happy Households", icon: <Heart className="text-red-600" /> },
    { value: "40%", label: "Less Water Used", icon: <DropletIcon className="text-[#5851DB]" /> },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex justify-center mb-4">{React.cloneElement(stat.icon, { size: 36 })}</div>
              <motion.div
                className="text-5xl font-bold mb-2 text-gray-800"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Quality Guarantee Section
const QualityGuaranteeSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            ref={ref}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Our Quality <span className="text-[#5851DB]">Guarantee</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mb-8"></div>
            <p className="text-lg text-gray-700 mb-6">
              We're so confident in our product that if you're not completely satisfied, we'll refund your purchase.
              That's the Saafi Ariel promise.
            </p>
            <ul className="space-y-4">
              {["100% Satisfaction Guarantee", "Tested by Leading Experts", "Exceeds Industry Standards"].map(
                (item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                  >
                    <CheckCircle className="text-green-500 mr-3" size={24} />
                    <span className="text-gray-800 text-lg">{item}</span>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>
          <motion.div
            className="md:w-2/5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-red-600">
              <Award className="text-red-600 mb-6" size={56} />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Award-Winning Formula</h3>
              <p className="text-gray-700 mb-6">
                Our revolutionary detergent formula has won multiple industry awards for its effectiveness and
                innovation.
              </p>

              <div className="flex space-x-4 mb-8">
                {[1, 2, 3].map((award) => (
                  <motion.div
                    key={award}
                    className="w-16 h-16 bg-[#5851DB]/10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Star size={24} className="text-[#5851DB]" />
                  </motion.div>
                ))}
              </div>

              <Link to='/about'>
                <motion.button
                    className="bg-gradient-to-r from-[#5851DB] to-red-600 hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg shadow-md w-full"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    View Our Certifications
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-[#5851DB] to-red-600 text-white py-20 relative overflow-hidden">
      {/* Parallax elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white opacity-10 blur-2xl"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Experience the Saafi Ariel Difference?</h2>
          <p className="text-xl mb-8">
            Join millions of satisfied customers who trust Saafi Ariel for their laundry needs. Try our product today
            and see the difference for yourself.
          </p>
          <Link to="/shop">
            <motion.button
                className="bg-white text-[#5851DB] hover:bg-gray-100 font-bold py-4 px-10 rounded-full shadow-lg text-lg"
                whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.95 }}
            >
                Shop Our Products Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
