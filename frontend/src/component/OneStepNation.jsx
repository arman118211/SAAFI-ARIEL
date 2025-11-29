import { useState, useEffect } from "react";
import { Instagram, ExternalLink, Star, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"

const galleryImages = [
  "/customer/uimg1.jpeg",
  "/customer/uimg2.jpeg",
  "/customer/uimg3.jpeg",
  "/customer/uimg4.jpeg",
  "/customer/uimg5.jpeg",
  "/customer/c18.png",
  "/customer/c17.png",
  "/customer/IMG_8148.webp",
  
];

export default function OneStepNation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto rotate featured image every 5 seconds
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % galleryImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const navigateLightbox = (direction) => {
    setLightboxIndex(prev => {
      const newIndex = (prev + direction + galleryImages.length) % galleryImages.length;
      return newIndex;
    });
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 px-4 py-16 max-w-7xl mx-auto">
        {/* Header with animated reveal */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100" : "opacity-0 -translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="relative">
                <Star className="text-red-500 absolute -top-6 -left-6 animate-pulse" size={16} />
                <Star className="text-purple-500 absolute -top-4 -right-8 animate-pulse" size={20} />
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                  <span className="text-gray-800">One</span> <span className="text-[#5851DB]">Step </span>
                </h1>
                <motion.div
                  className="h-1 w-24 mx-auto bg-gradient-to-r from-[#ff0000] to-[#5851DB] rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: 96, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <span className="absolute -bottom-3 right-0 text-sm top-16 font-bold tracking-widest text-[#5851DB] ">FOR THE NATION</span>
              </div>
            </div>
            <p className="text-gray-600 max-w-xl mx-auto mt-8 text-lg">
              At Saafi Ariel, we're making waves of change across our nation through dedicated 
              community initiatives that create lasting impact.
            </p>
          </div>
        </div>

        {/* Featured image with thumbnail gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main featured image - left side on larger screens */}
          <div className={`lg:col-span-2 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div 
              className="group relative h-96 lg:h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => openLightbox(activeIndex)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
              
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${activeIndex === idx ? "opacity-100" : "opacity-0"}`}
                >
                  <img 
                    src={img || "/api/placeholder/800/600"} 
                    alt={`Featured initiative ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full mb-3">
                      Featured Initiative
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">Making An Impact</h3>
                    <p className="text-gray-100 text-sm max-w-lg">
                      Our community-focused projects are transforming lives across the nation.
                    </p>
                  </div>
                  <button 
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm group-hover:opacity-100 opacity-0 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(activeIndex);
                    }}
                  >
                    <ExternalLink size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thumbnail gallery - right side on larger screens */}
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.slice(0, 6).map((img, idx) => (
                <div 
                  key={idx}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer relative transition-all duration-300 shadow-md ${
                    activeIndex === idx ? "ring-2 ring-red-500 scale-95" : "hover:scale-95"
                  }`}
                  onClick={() => {
                    setActiveIndex(idx);
                    openLightbox(idx);
                  }}
                >
                  <img 
                    src={img || "/api/placeholder/200/200"} 
                    alt={`Initiative thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity ${
                    activeIndex === idx ? "opacity-0" : "opacity-0 hover:opacity-100"
                  }`}>
                    <span className="text-white font-medium">View</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {activeIndex + 1} / {galleryImages.length}
              </span>
              <button 
                className="flex items-center space-x-1 text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-colors"
                onClick={() => openLightbox(0)}
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom gallery strip with horizontal scroll */}
        <div className={`transition-all duration-1000 delay-500  ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="relative">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
              <span className="mr-2">More Initiatives</span>
              <div className="h-px flex-grow bg-gradient-to-r from-red-500 to-transparent"></div>
            </h3>
            
            <div className="overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex space-x-4">
                {galleryImages.map((img, idx) => (
                  <div 
                    key={idx}
                    className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 shadow-md"
                    onClick={() => openLightbox(idx)}
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    <div className="relative h-full group">
                      <img 
                        src={img || "/api/placeholder/200/150"} 
                        alt={`Gallery image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-3">
                        <span className="text-white text-sm font-medium">Initiative #{idx + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <a
            href="https://www.instagram.com/arielsaafi/?igsh=MW5vZWtwMDEzNm1pag%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-full shadow-lg"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600 via-purple-600 to-blue-500"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition-all duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative flex items-center text-white">
              <Instagram className="mr-2" size={20} />
              Join Our Community
            </span>
          </a>
          <p className="mt-6 text-gray-500">Make a difference with Saafi Ariel</p>
        </div>
      </div>
      
      {/* Immersive Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black opacity-80"
            onClick={closeLightbox}
          ></div>
          
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          
          <div className="relative z-10 w-full max-w-5xl">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={galleryImages[lightboxIndex] || "/api/placeholder/1200/800"}
                alt={`Initiative fullscreen ${lightboxIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
              <button
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                onClick={() => navigateLightbox(-1)}
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                {lightboxIndex + 1} / {galleryImages.length}
              </div>
              
              <button
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                onClick={() => navigateLightbox(1)}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Thumbnail strip */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-4 ">
            <div className="max-w-6xl mx-auto overflow-x-auto hide-scrollbar px-4">
              <div className="flex space-x-2">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer transition-all ${
                      lightboxIndex === idx ? "ring-2 ring-red-500 scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <img
                      src={img || "/api/placeholder/80/80"}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom CSS for hiding scrollbars but allowing scroll */}
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Missing import from earlier code block
function X(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}