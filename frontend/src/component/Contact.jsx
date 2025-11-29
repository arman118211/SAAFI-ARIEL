"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Link } from 'react-router-dom';
import emailjs from "@emailjs/browser"
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Twitter,
  Users,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react"

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Form and Info Section */}
      <ContactFormSection />

      {/* Map Section */}
      <MapSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Office Hours Section */}
      <OfficeHoursSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#5851DB] to-red-600 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5851DB] rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 z-10 text-center ">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 "
        >
          Get in <span className="">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white max-w-3xl mx-auto"
        >
          We'd love to hear from you. Reach out to our team.
        </motion.p>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 top-0 left-0 w-full overflow-hidden leading-none  ">
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
    </section>
  )
}

// Contact Form and Info Section


const ContactFormSection = () => {
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
  
  
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
          phone: formData.phone,
          subject: formData.subject,
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
          phone: '',
          subject: '',
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
              Contact Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            We'd Love to <span className="text-[#5851DB]">Hear From You</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </motion.div>
        </motion.div>
      </div>  
        
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#5851DB]/5 to-red-100/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-[#5851DB] to-red-600 p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="mb-8">
                We'd love to hear from you. Contact us for any inquiries or partnership opportunities.
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
                    href="#"
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
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>

              {notification.show && (
                <div className={`mb-6 p-4 rounded-lg ${notification.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <p>{notification.message}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
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
                    Email Address
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5851DB] focus:border-transparent"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5851DB] focus:border-transparent"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
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

// Map Section
const MapSection = () => {
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
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#5851DB]/10 text-[#5851DB] font-medium text-sm mb-4">
            LOCATION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            Find <span className="text-red-600">Us</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">Visit our headquarters or one of our global offices</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Map placeholder - In a real implementation, you would use Google Maps or another map provider */}
          <div className="relative w-full h-[500px] bg-gray-200 overflow-hidden rounded-lg shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.1324022717554!2d83.15171447404524!3d27.52734543341019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996ef050a5e6ccb%3A0xa786a946cacd9bff!2sSaafi%20Ariel%20Udyog!5e0!3m2!1sen!2sin!4v1745674616297!5m2!1sen!2sin"
        allowFullScreen=""
        loading="lazy"
        className="w-full h-full object-cover"
        title="Saafi Ariel Udyog Location"
        style={{ border: 0 }}
      ></iframe>

      {/* Overlay with pin */}
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
          <MapPin className="w-8 h-8 text-white" />
        </div>
      </div> */}
    </div>

          {/* Office locations */}
          <div className="absolute bottom-0 left-0 right-0  bg-white/90 backdrop-blur-sm p-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="flex items-center ">
                <div className="w-12 h-12 rounded-full bg-[#5851DB]/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#5851DB]" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Headquarters</h4>
                  <p className="text-gray-600">Mayadevi-01, Pakadi Kapilvastu, Nepal</p>
                </div>
              </div>

              <div className="flex items-center ">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Nepal Office</h4>
                  <p className="text-gray-600">Mayadevi-01, Pakadi Kapilvastu, Nepal</p>
                </div>
              </div>

              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// FAQ Section
const FAQSection = () => {
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

  const faqs = [
    {
      question: "How quickly can I expect a response?",
      answer:
        "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our customer support line directly.",
    },
    {
      question: "Do you offer consultations for new clients?",
      answer:
        "Yes, we offer free initial consultations for potential clients. During this session, we'll discuss your needs and how our services can help you achieve your goals.",
    },
    {
      question: "What industries do you serve?",
      answer:
        "Saafi Ariel Industries specializes in manufacturing and providing comprehensive services related to detergents. We also offer home delivery services, catering to a variety of customer needs across multiple sectors.",
    },
    {
      question: "Do you have international support?",
      answer:
        "No, we provide services exclusively within Nepal. Our team is dedicated to handling inquiries and meeting the needs of our clients across the country.",
    },
    {
      question: "How can I request a product demonstration?",
      answer:
        "You can request a product demonstration by filling out the contact form on this page or by emailing saafi2074@gmail.com with your specific requirements.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary depending on scope and complexity. During our initial consultation, we'll provide you with a detailed timeline tailored to your specific project needs.",
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
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-medium text-sm mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            Frequently Asked <span className="text-[#5851DB]">Questions</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Find answers to common questions about our services and support
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-start">
                  <MessageSquare className="w-5 h-5 text-[#5851DB] mr-2 mt-1 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-700">
              Still have questions?{" "}
              <a href="#" className="text-[#5851DB] font-semibold hover:underline">
                Contact our support team
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Office Hours Section
const OfficeHoursSection = () => {
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

  const officeHours = [
    { day: "Monday", hours: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
    { day: "Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 6:00 PM" },
  ]

  return (
    <section className=" py-20 bg-gray-50 overflow-hidden  ">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-[#5851DB]/10 text-[#5851DB] font-medium text-sm mb-4">
                AVAILABILITY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Our <span className="text-red-600">Office Hours</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Our team is available to assist you during the following hours. For urgent matters outside of these
                hours, please use our emergency contact line.
              </p>

              <div className="space-y-4">
                {officeHours.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#5851DB] mr-3" />
                      <span className="font-medium">{item.day}</span>
                    </div>
                    <span className={`${item.hours === "Closed" ? "text-red-600 font-medium" : "text-gray-700"}`}>
                      {item.hours}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#5851DB]/10 rounded-lg">
                <p className="text-[#5851DB] font-medium">
                  <span className="font-bold">Note:</span> Hours may vary on holidays. Please check our social media
                  channels for holiday schedules.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* <div className="absolute -top-6 -right-3 w-full h-full border-2 border-[#5851DB] rounded-2xl"></div> */}
              {/* <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-red-600 rounded-2xl"></div> */}
              <img
                src="/banner/assis.svg"
                alt="Customer Support Team"
                className="w-full h-auto rounded-2xl  relative z-0 object-cover"
              />
              <div className="absolute bottom-8 left-0 right-0 bg-white/90 backdrop-blur-4xs p-6 mx-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Need Immediate Assistance?</h3>
                <p className="text-gray-600 mb-4">Our support team is ready to help you with any questions.</p>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-semibold">Emergency Support: +977-982-6448200-HELP</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#5851DB] to-red-600 text-white relative overflow-hidden ">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full border-[30px] border-white opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border-[20px] border-white opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the hundreds of businesses that have partnered with Saafi Ariel Industries to innovate and grow.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to='/contact'>
                <button className="px-8 py-3 bg-white text-[#5851DB] rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Schedule a Consultation
                </button>
              </Link>
              <Link to='/shop'>
                <button className="px-8 py-3 bg-transparent text-white rounded-full font-semibold hover:bg-white/10 transition-all border-2 border-white">
                  View Our Solutions
                </button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center">
              <Users className="w-6 h-6 mr-2" />
              <span className="text-lg">Join our 500+ satisfied clients worldwide</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
