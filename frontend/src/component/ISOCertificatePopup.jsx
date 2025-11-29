import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle, Shield, Star } from 'lucide-react';

const ISOCertificatePopup = ({ showOnHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (showOnHomePage) {
      setIsOpen(true);
    } else {
      const hasSeenPopup = localStorage.getItem('hasSeenISOPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }
  }, [showOnHomePage]);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    if (!showOnHomePage) {
      localStorage.setItem('hasSeenISOPopup', 'true');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal - Removed max-height and overflow */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full my-auto border border-gray-200 animate-scaleIn mx-3">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white hover:bg-gray-100 transition-all duration-200 border border-gray-300 shadow-sm group"
          type="button"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800" />
        </button>

        {/* Single Column Layout for Mobile, Two Column for Desktop */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-0">
          
          {/* Certificate Image Section - Made more compact for mobile */}
          <div className="relative bg-gradient-to-br from-blue-50 to-red-50 p-4 sm:p-6 md:p-8 flex items-center justify-center rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
            <div className="w-full max-w-[180px] sm:max-w-xs md:max-w-sm mx-auto">
              <img 
                src="/banner/iso.jpeg" 
                alt="ISO Certificate" 
                className="w-full h-auto rounded-lg shadow-lg border-2 border-white object-contain"
              />
            </div>
          </div>

          {/* Content Section - Compact spacing for mobile */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
            
            {/* Header - More compact */}
            <div className="mb-3 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="bg-gradient-to-br from-red-600 to-blue-600 p-1.5 sm:p-2 rounded-lg shadow-md">
                  <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">
                    ISO Certified
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">Quality Management System</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                We are proud to announce that our organization has been certified to meet international ISO standards.
              </p>
            </div>

            {/* Features - More compact */}
            <div className="space-y-2 mb-4 sm:mb-6">
              <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                <Shield className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Quality Assurance</h3>
                  <p className="text-xs text-gray-600">Consistent quality in all processes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-2 bg-red-50 rounded-lg border border-red-100">
                <Star className="w-3 h-3 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">International Recognition</h3>
                  <p className="text-xs text-gray-600">Globally accepted standards</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-2 bg-purple-50 rounded-lg border border-purple-100">
                <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Customer Trust</h3>
                  <p className="text-xs text-gray-600">Enhanced credibility</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              type="button"
              className="w-full py-2.5 px-4 sm:py-3.5 sm:px-6 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-base"
            >
              Continue to Website
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ISOCertificatePopup;