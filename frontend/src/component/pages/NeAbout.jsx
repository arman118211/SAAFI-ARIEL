"use client"

import { useEffect,useState } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { useInView } from "react-intersection-observer"
import {
  Award,
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react"
import emailjs from '@emailjs/browser';
import NeNavbar from "./NeNavbar"
import NeFooter from "./NeFooter"

const NeAbout = () => {
  return (
    <div>
      <NeNavbar/>
      <div className="bg-white min-h-screen overflow-hidden">
      {/* Hero Section with Wave */}
      <HeroSection />

      {/* Company Overview */}
      <CompanyOverview />

      {/* CEO Section */}
      <CEOSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Achievements */}
      <AchievementsSection />

      {/* Company Culture */}
      <CompanyCultureSection />

      {/* Awards Section */}
      <AwardsSection />

      {/* Contact CTA */}
      <ContactSection />
    </div>
    <NeFooter/>
    </div>
  )
}

// Hero Section Component with Wave
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
            साफी एरियल{" "}
            <span className="relative">
            बारेमा
              {/* <span className="absolute bottom-2 left-0 w-full h-2 bg-red-500 opacity-70 rounded-full"></span> */}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8"
          >
            २०१८ देखि नवीनता र उत्कृष्टतामा पायनियर गर्दै
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to='/Ne-shop'>
              <button className="px-8 py-3 bg-white text-[#5851DB] rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              हाम्रा उत्पादनहरू अन्वेषण गर्नुहोस्
              </button>
            </Link>
            
          </motion.div>
        </motion.div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute top-0 bottom-0 left-0 w-full overflow-hidden leading-none ">
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

// Company Overview Component
const CompanyOverview = () => {
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
            हाम्रो कथा
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
             २०१८ <span className="text-[#5851DB]">देखि उत्कृष्टतामा</span> पायनियर गर्दै
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-6">
           साफी एरियल इन्डस्ट्रीज उद्योगमा नवप्रवर्तनात्मक समाधानहरू र अत्याधुनिक प्रविधि मार्फत क्रान्ति ल्याउने दृष्टिकोणसँग स्थापना गरिएको थियो। जसको शुरुवात एक सानो स्टार्टअपको रूपमा भएको थियो, अहिले हाम्रो क्षेत्रको एक विश्वव्यापी नेता बनेको छ।
          </motion.p>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-10">
           हाम्रो यात्रा उत्कृष्टताको निरन्तर खोज, दिगो विकासमा प्रतिबद्धता, र मानिसहरूको जीवनमा परिवर्तन ल्याउने उत्पादनहरू सिर्जना गर्ने उत्साहले परिभाषित भएको छ।
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">वैश्विक उपस्थिति</h3>
              <p className="text-gray-600">गर्वका साथ नेपालमा मात्र सञ्चालन गर्दै, स्थानीय आवश्यकता र मूल्यहरूको गहिरो बुझाइका साथ देशभरिका ग्राहकहरूलाई सेवा पुर्याउँदै।</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-[#5851DB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#5851DB]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">विशेषज्ञ टोली</h3>
              <p className="text-gray-600">५०० भन्दा बढी समर्पित व्यवसायीहरू उत्कृष्टता प्रदान गर्न काम गर्दै</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">हाम्रो मिशन</h3>
              <p className="text-gray-600">नवप्रवर्तन र दिगो अभ्यासमार्फत उत्कृष्टता प्रदान गर्नु।</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// CEO Section Component
const CEOSection = () => {
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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[30px] border-red-100 opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border-[30px] border-[#5851DB]/10 opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
             नेतृत्व
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
             प्रेरणा दिने <span className="text-red-600">नेतृत्व</span>
            </h2>
            <div className="w-24 h-1 bg-[#5851DB] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#5851DB] rounded-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-red-600 rounded-2xl"></div>
              <img
                src="/customer/ceo1.png"
                alt="Saafi Ariel - CEO"
                className="w-full h-auto rounded-2xl shadow-2xl relative z-10 object-cover"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-8 -right-8 w-72 h-20 bg-gradient-to-r from-[#5851DB] to-red-600 rounded-lg flex items-center justify-center z-20 shadow-xl"
              >
                <div className="text-center text-white">
                  <p className="font-bold text-2xl">श्री कलामुद्दीन</p>
                  <p className="text-sm opacity-90">संस्थापक र मुख्य कार्यकारी अधिकृत (CEO)</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
               हाम्रो दृष्टिमान नेतृत्वसँग <span className="text-[#5851DB]">भेट गर्नुहोस्</span>
              </h3>
              <p className="text-lg text-gray-700 mb-6">
               श्री कलामुद्दीन, साफी एरियल इन्डस्ट्रीजका दृष्टिमान संस्थापक र CEO, १५ वर्षभन्दा बढी समयदेखि नवप्रवर्तनको अग्रभागमा रहेका छन्। व्यवसाय व्यवस्थापनमा पृष्ठभूमि भएका कालामुद्दीनले कम्पनीलाई अद्वितीय वृद्धी र रूपान्तरणको माध्यमबाट नेतृत्व गरेका छन्।
              </p>
              <p className="text-lg text-gray-700 mb-8">
               कालामुद्दीनको नेतृत्वमा, हाम्रो कम्पनीले विश्वव्यापी रूपमा विस्तार गर्दै, क्रान्तिकारी प्रविधिहरूको पायनियर गर्दै, र गुणस्तर र ग्राहक सन्तुष्टिमा अडिग प्रतिबद्धता राख्दै आएको छ।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                      <Briefcase className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">१५+ वर्षको अनुभव</h4>
                      <p className="text-gray-600">उद्योग नेतृत्व</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#5851DB]/10 flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-[#5851DB]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">धेरै पुरस्कारहरू</h4>
                      <p className="text-gray-600">उत्कृष्टताका लागि पहिचान</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                      <Building2 className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">वैश्विक नेता</h4>
                      <p className="text-gray-600">उद्योगको रूपान्तरण गर्दै</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#5851DB]/10 flex items-center justify-center mr-4">
                      <Lightbulb className="w-6 h-6 text-[#5851DB]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">दृष्टिमान</h4>
                      <p className="text-gray-600">नवप्रवर्तनशील सोच</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Timeline Section Component (New)
const TimelineSection = () => {
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

  const timelineEvents = [
    {
        year: "२०१८",
        title: "कम्पनी स्थापना",
        description: "साफी एरियल इन्डस्ट्रीज उद्योगलाई रूपान्तरण गर्ने दृष्टिकोणसँग स्थापना गरिएको थियो।"
      },
      {
        year: "२०२०",
        title: "पहिलो प्रमुख उत्पादन शुभारंभ",
        description: "हामीले बजारमा क्रान्ति ल्याएको हाम्रो फ्ल्यागशिप उत्पादन रिलिज गर्यौं।"
      },
      {
        year: "२०२२",
        title: "नेपालभर विस्तार",
        description: "नेपालका प्रमुख स्थानहरूमा हाम्रो पहिलो क्षेत्रीय कार्यालय खोल्यौं।"
      },
      {
        year: "२०२३",
        title: "उद्योगको पहिचान",
        description: "नवप्रवर्तन र उत्कृष्टताका लागि धेरै उद्योग पुरस्कारहरू प्राप्त गर्यौं।"
      },
      {
        year: "२०२४",
        title: "दिगो पहल",
        description: "कार्बन न्यूट्रलिटीमा प्रतिबद्धता साथ हाम्रो दिगो कार्यक्रम शुरु गर्यौं।"
      },
      {
        year: "२०२५",
        title: "वैश्विक नेतृत्व",
        description: "नेपालभर एक बलियो र समर्पित उपस्थितिका साथ उद्योगको नेता बन्यौं।"
      }
  ]

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
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
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-medium text-sm mb-4">
           हाम्रो यात्रा
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            <span className="text-[#5851DB]">साफी एरियल</span> समयरेखा
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            वर्षहरूभरिका नवप्रवर्तन, वृद्धी, र उत्कृष्टताको यात्रा
          </p>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#5851DB] to-red-600 rounded-full"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} relative`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <div
                    className={`bg-white p-6 rounded-xl shadow-lg border-t-4 ${index % 2 === 0 ? "border-[#5851DB]" : "border-red-600"}`}
                  >
                    <span className="text-sm font-semibold text-gray-500">{event.year}</span>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#5851DB] flex items-center justify-center z-10">
                  <Clock className="w-5 h-5 text-[#5851DB]" />
                </div>

                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Values Section Component
const ValuesSection = () => {
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

  const values = [
    {
        title: "नवप्रवर्तन",
        description: "सधैं सिमाना विस्तार गर्दै र नयाँ सम्भावनाहरू अन्वेषण गर्दै",
        icon: <Lightbulb className='w-8 h-8' />,
        color: "bg-red-600"
      },
      {
        title: "उत्कृष्टता",
        description: "हामी जे गर्छौं त्यसमा सबैभन्दा उच्च मानकहरूमा प्रतिबद्ध",
        icon: <Star className='w-8 h-8' />,
        color: "bg-[#5851DB]"
      },
      {
        title: "इमानदारी",
        description: "हाम्रो सबै व्यापारिक व्यवहारमा ईमानदार र नैतिक आचरण",
        icon: <Shield className='w-8 h-8' />,
        color: "bg-red-600"
      },
      {
        title: "दिगोपन",
        description: "हाम्रो ग्रहको सुरक्षा गर्ने समाधानहरू सिर्जना गर्दै भविष्यको पीढीका लागि",
        icon: <Globe className='w-8 h-8' />,
        color: "bg-[#5851DB]"
      },
  ]

  return (
    <section className="py-20 bg-white">
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
            हाम्रो सिद्धान्तहरू
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            हाम्रो <span className="text-[#5851DB]">मुख्य मूल्यहरू</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            यी सिद्धान्तहरूले साफी एरियल इन्डस्ट्रीजमा हामी गर्ने सबै कार्यलाई मार्गदर्शन गर्दछ।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`h-2 ${value.color}`}></div>
              <div className="p-8">
                <div className={`w-16 h-16 rounded-lg ${value.color} text-white flex items-center justify-center mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section Component (New)
const TestimonialsSection = () => {
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

  const testimonials = [
    {
        quote: "साफी एरियल इन्डस्ट्रीज एक अविश्वसनीय साझेदार भएको छ। तिनीहरूको नवप्रवर्तनकारी समाधानहरूले हाम्रो व्यापार अपरेसनलाई पूर्ण रूपमा रूपान्तरण गरेको छ।",
        author: "Customer",
        position: "Thankyou",
        image: "/customer/IMG_8224.webp"
      },
      {
        quote: "साफी एरियलसँग काम गर्नु हाम्रो कम्पनीका लागि खेल परिवर्तन भएको छ। तिनीहरूको विवरणमा ध्यान र उत्कृष्टतामा प्रतिबद्धता अचम्मको छ।",
        author: "Customer",
        position: "Thankyou",
        image: "/customer/IMG_8212.webp"
      },
      {
        quote: "साफी एरियल इन्डस्ट्रीजमा नवप्रवर्तन र प्राविधिक विशेषज्ञताको स्तर साँच्चै प्रभावशाली छ। तिनीहरूले हामीलाई प्रतिस्पर्धाबाट अघि राख्न मद्दत गरेको छ।",
        author: "Customer",
        position: "Thankyou",
        image: "/customer/IMG_8217.webp"
      },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-[#5851DB]/10 to-red-100/30">
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
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-medium text-sm mb-4">
            साक्षात्कार
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            हाम्रो <span className="text-red-600">ग्राहकहरूको के भनाइ छ</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            सिर्फ हाम्रो शब्दमा विश्वास नगर्नुहोस् - हाम्रा केही मूल्यवान ग्राहकहरूबाट सुन्नुहोस्
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-xl relative"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl">
                "
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-[#5851DB]"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Achievements Section Component
const AchievementsSection = () => {
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

  const achievements = [
    { number: "200+", text: "संसारभरिका कर्मचारीहरू" },
    { number: "1+", text: "सेवाग्राही देशहरू" },
    { number: "15+", text: "उत्कृष्टताको वर्षहरू" },
    { number: "20,000+", text: "पूरा गरिएका प्रमुख उत्पादनहरू" },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-[#5851DB] to-red-600 text-white relative overflow-hidden">
      {/* Decorative elements */}
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">हाम्रो सफलता</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
            >
              <h3 className="text-4xl md:text-6xl font-bold mb-2">{item.number}</h3>
              <p className="text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Company Culture Section (New)
const CompanyCultureSection = () => {
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
            हाम्रो संस्कृती
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            साफि <span className="text-red-600">एरियलमा जीवन</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            हामी एक यस्तो कार्यस्थल सिर्जना गर्न विश्वास गर्छौं जहाँ नवप्रवर्तन फस्टाउँछ र मानिसहरूलाई उनीहरूको काम मनपर्छ।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">उत्साही टोलीहरू</h3>
                <p className="text-gray-600">
                 हाम्रो टोली उर्जावान व्यक्तिहरूसँग बनेको छ जो आफ्नो काम मार्फत फरक पारेकोमा समर्पित छन्। हामी सहकार्य र आपसी इज्जतको संस्कृतिलाई प्रोत्साहन गर्छौं।
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-[#5851DB]/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-[#5851DB]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">नवप्रवर्तन केन्द्र</h3>
                <p className="text-gray-600">
                 हामीले यस्तो वातावरण सिर्जना गरेका छौं जहाँ रचनात्मक सोचलाई प्रोत्साहन दिइन्छ र नयाँ विचारहरू फस्टाउन सक्छ। हाम्रा नवप्रवर्तन प्रयोगशालाहरू ती स्थानहरू हुन् जहाँ भविष्य आकार लिन्छ।
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">समावेशी वातावरण</h3>
                <p className="text-gray-600">
                हामी विविधतालाई मनाउँछौं र विश्वास गर्छौं कि विभिन्न दृष्टिकोणहरूले राम्रो समाधानतर्फ मार्गदर्शन गर्दछ। Saafi Ariel Industries मा प्रत्येकको आवाजलाई मूल्य दिइन्छ र सुन्ने गरिन्छ।
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/banner/t1.webp"
                alt="Company Culture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg mt-12">
              <img
                src="/banner/t2.webp"
                alt="Company Culture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg -mt-12">
              <img
                src="/banner/t3.webp"
                alt="Company Culture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/customer/uimg4.jpeg"
                alt="Company Culture"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Awards Section (New)
const AwardsSection = () => {
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

  const awards = [
    {
        year: "२०२३",
        title: "नवाचार उत्कृष्टता पुरस्कार",
        organization: "ग्लोबल टेक समिट"
      },
      {
        year: "२०२२",
        title: "सस्टेनेबिलिटी लिडरशिप",
        organization: "एन्वाइरोनमेन्टल बिजनेस काउन्सिल"
      },
      {
        year: "२०२१",
        title: "सर्वश्रेष्ठ कार्यस्थल संस्कृति",
        organization: "इन्डस्ट्री एचआर एशोसियेशन"
      },
      {
        year: "२०२०",
        title: "वर्षको उत्पाद",
        organization: "अन्तर्राष्ट्रिय डिजाइन पुरस्कार"
      },
      {
        year: "२०१९",
        title: "व्यवसाय रूपान्तरण",
        organization: "बिजनेस एक्सलेन्स फोरम"
      },
      {
        year: "२०१८",
        title: "वर्षको सीईओ",
        organization: "नेतृत्व परिषद"
      },
  ]

  return (
    <section className="py-20 bg-gray-50">
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
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-medium text-sm mb-4">
            मान्यता
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            हाम्रो <span className="text-[#5851DB]">पुरस्कार</span> र मान्यता
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            हाम्रो उपलब्धिहरू र उद्योगमा प्राप्त मान्यतालाई मनाइरहेका छौं।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-600 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#5851DB]/10 flex items-center justify-center mr-4">
                  <Trophy className="w-6 h-6 text-[#5851DB]" />
                </div>
                <span className="text-sm font-semibold text-gray-500">{award.year}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{award.title}</h3>
              <p className="text-gray-600">{award.organization}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    success: false,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        'service_y9zoob5',
        'template_jgcd46t',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        'llUewSRazlwEPxBHv'
      );

      if (result.status === 200) {
        // Success
        setNotification({
          show: true,
          success: true,
          message: 'Thank you for reaching out! Your message has been sent successfully. We will get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      // Error
      setNotification({
        show: true,
        success: false,
        message: 'Oops! Something went wrong sending your message. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#5851DB]/5 to-red-100/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-[#5851DB] to-red-600 p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">सम्पर्कमा आउनुहोस्</h3>
              <p className="mb-8">
                हामी तपाईंको प्रतिक्रिया सुन्न चाहन्छौं। कुनै पनि प्रश्न वा साझेदारी अवसरहरूको लागि हामीलाई सम्पर्क गर्नुहोस्।
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-4" />
                  <span>Mayadevi-01, Pakadi Kapilvastu, Nepal</span>
                </div>

                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-4" />
                  <span>+977-982-6448200</span>
                </div>

                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-4" />
                  <span>saafi2074@gmail.com</span>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/saafi.ariel.1?mibextid=ZbWKwL"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">हामीलाई सन्देश पठाउनुहोस्</h3>

              {notification.show && (
                <div className={`mb-6 p-4 rounded-lg ${notification.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <p>{notification.message}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    तपाईंको नाम
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5851DB] focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    इमेल ठेगाना
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5851DB] focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    सन्देश
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5851DB] focus:border-transparent"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#5851DB] to-red-600 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <ChevronRight className="ml-2 w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeAbout
