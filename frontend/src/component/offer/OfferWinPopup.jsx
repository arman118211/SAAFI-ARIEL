import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Gift, X, Star, Zap } from 'lucide-react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"

const OfferWinPopup = () => {
  const { seller, token } = useSelector((state) => state.auth)
  const [isVisible, setIsVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [apiResponse, setApiResponse] = useState({})

  const getWinnerNotification = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/offers/winner-notification/${seller._id}`)
      setApiResponse(res.data)
    } catch (err) {
      console.log("something went wrong could not found notification")
    }
  }

  useEffect(() => {
    if (seller?._id) {
      getWinnerNotification();
    }
  }, [seller]);

  useEffect(() => {
    if (apiResponse?.success && apiResponse?.show) {
      setIsVisible(true);
      setTimeout(() => setAnimate(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [apiResponse]);

  const handleClose = async () => {
    try {
      setAnimate(false);
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/offers/mark-win-seen`,
        { offerId: apiResponse?.offer?._id, sellerId: seller._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTimeout(() => setIsVisible(false), 300);
    } catch (err) {
      console.error("Failed to mark notification as seen", err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/30">
      
      {/* Falling stars - Reduced count on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(window.innerWidth < 640 ? 30 : 60)].map((_, i) => {
          const starSize = Math.random() * (window.innerWidth < 640 ? 12 : 18) + 6;
          const leftPosition = Math.random() * 100;
          const duration = 2.5 + Math.random() * 4;
          const delay = Math.random() * 6;
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${leftPosition}%`,
                top: '-5%',
                animation: `starRain ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            >
              <Star className="text-yellow-400/60" size={starSize} />
            </div>
          );
        })}
      </div>

      {/* Main popup */}
      <div
        className={`relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-700 border border-white/50 ${
          animate ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-0 rotate-1'
        }`}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-30 blur-xl animate-pulse"></div>
        
        <div className="relative bg-white/95 rounded-3xl m-[2px]">
          {/* Close button - adjusted size for touch targets */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 bg-gray-100/80 hover:bg-gray-200/80 rounded-full p-2 transition-all shadow-md"
          >
            <X className="text-gray-600" size={18} />
          </button>

          <div className="relative p-6 sm:p-10 text-center">
            {/* Trophy section - Responsive scaling */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse scale-150"></div>
                <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full p-5 sm:p-8 border-4 border-white shadow-xl">
                  <Trophy className="text-yellow-600 w-12 h-12 sm:w-16 sm:h-16" />
                </div>
              </div>
            </div>

            {/* Title - Fluid typography */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2 leading-tight">
                Congratulations!
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-gray-700 flex items-center justify-center gap-2">
                <Zap className="text-yellow-500" size={20} />
                Winner!
                <Zap className="text-yellow-500" size={20} />
              </p>
            </div>

            {/* Offer card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 mb-6 border border-purple-100/50">
              <div className="flex items-center justify-center mb-3 gap-2">
                <Gift className="text-purple-600" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                  {apiResponse?.offer?.title}
                </h2>
              </div>
              
              <div className="bg-white/80 rounded-xl p-3 sm:p-4 mb-3">
                <p className="text-base sm:text-lg font-semibold text-gray-700">
                  {apiResponse?.offer?.description}
                </p>
              </div>
              
              <div className="inline-block bg-purple-100/50 rounded-full px-3 py-1">
                <p className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase">
                  ID: {apiResponse?.offer?._id?.slice(-8)}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 sm:py-4 px-6 rounded-2xl shadow-lg active:scale-95 transition-all text-base sm:text-lg"
              >
                Claim Prize Now
              </button>
              
              <p className="text-xs sm:text-sm text-gray-500">
                Valid until {new Date(apiResponse?.offer?.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes starRain {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default OfferWinPopup;