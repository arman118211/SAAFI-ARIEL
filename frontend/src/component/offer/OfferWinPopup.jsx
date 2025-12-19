import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Gift, X, Star, Zap } from 'lucide-react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"

const OfferWinPopup = () => {
  const { seller, token } = useSelector((state) => state.auth)
  const [isVisible, setIsVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [apiResponse,setApiResponse] = useState({})

  // Sample data - replace with your actual API response
  const getWinnerNotification = async () => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/offers/winner-notification/${seller._id}`)
      console.log("notification response -->", res.data)
      setApiResponse(res.data)
    }catch(err){
      console.log("something went wrong could not found notification")
    }
  }

//   const apiResponse = {
//     "success": true,
//     "show": true,
//     "offer": {
//       "_id": "6945a2fd67606751c8b57b8c",
//       "title": "NEW MEGA SALE",
//       "description": "Win a motor cycle",
//       "startDate": "2025-12-20T00:00:00.000Z",
//       "endDate": "2025-12-21T00:00:00.000Z"
//     }
//   };
  
console.log("api response-->",apiResponse)

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

  const handleClose = async() => {
    try {
        setAnimate(false);

        await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/offers/mark-win-seen`,
        { offerId: apiResponse?.offer?._id,
          sellerId: seller._id
         },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        setTimeout(() => setIsVisible(false), 300);
    } catch (err) {
        console.error("Failed to mark notification as seen", err);
    }
    
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/30">
      {/* Falling stars and particles - rain from top to bottom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => {
          const starSize = Math.random() * 18 + 6;
          const colors = [
            'text-yellow-300/70',
            'text-yellow-400/60', 
            'text-orange-300/70',
            'text-pink-300/70',
            'text-purple-300/60',
            'text-blue-300/70',
            'text-yellow-500/60',
            'text-orange-400/60',
            'text-pink-400/70',
            'text-purple-400/60'
          ];
          
          const icons = [
            <Star className={colors[i % colors.length]} size={starSize} />,
            <Star className={colors[i % colors.length]} size={starSize} />,
            <Star className={colors[i % colors.length]} size={starSize} />,
            <Sparkles className={colors[i % colors.length]} size={starSize * 0.9} />,
            <Sparkles className={colors[i % colors.length]} size={starSize * 0.9} />,
            <Zap className={colors[i % colors.length]} size={starSize * 0.85} />,
          ];
          
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
              {icons[i % icons.length]}
            </div>
          );
        })}
      </div>

      {/* Main popup with glassmorphism */}
      <div
        className={`relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-w-lg w-full overflow-hidden transform transition-all duration-700 border border-white/50 ${
          animate ? 'scale-100 opacity-100 rotate-0' : 'scale-90 opacity-0 rotate-3'
        }`}
      >
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-50 blur-xl animate-pulse"></div>
        
        {/* Inner content container */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl m-[2px]">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-yellow-200/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-pink-200/40 to-transparent rounded-full blur-3xl"></div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-10 bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 hover:rotate-90 shadow-lg"
          >
            <X className="text-gray-600" size={20} />
          </button>

          {/* Content */}
          <div className="relative p-10 text-center">
            {/* Trophy section */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                {/* Glow rings */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-2xl opacity-40 animate-pulse scale-150"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full blur-xl opacity-60 animate-pulse scale-125"></div>
                
                {/* Trophy container */}
                <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full p-8 shadow-2xl border-4 border-white">
                  <Trophy className="text-gradient-to-br from-yellow-600 to-orange-600" size={72} style={{
                    filter: 'drop-shadow(0 4px 6px rgba(251, 191, 36, 0.3))'
                  }} />
                </div>
                
                {/* Orbiting stars */}
                <Star className="absolute -top-2 -right-2 text-yellow-400 animate-bounce" size={24} />
                <Star className="absolute -bottom-2 -left-2 text-pink-400 animate-bounce" size={20} style={{ animationDelay: '0.2s' }} />
                <Sparkles className="absolute top-0 -left-4 text-blue-400 animate-bounce" size={20} style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3 leading-tight">
                Congratulations!
              </h1>
              <p className="text-2xl font-bold text-gray-700 flex items-center justify-center gap-2">
                <Zap className="text-yellow-500" size={24} />
                You're the Winner!
                <Zap className="text-yellow-500" size={24} />
              </p>
            </div>

            {/* Offer card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 shadow-lg border border-purple-100/50">
              <div className="flex items-center justify-center mb-4 gap-2">
                <Gift className="text-purple-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">
                  {apiResponse.offer.title}
                </h2>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-xl font-semibold text-gray-700">
                  {apiResponse.offer.description}
                </p>
              </div>
              
              <div className="flex justify-center gap-2">
                <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 border border-purple-200/50">
                  <p className="text-xs font-mono text-gray-600">
                    ID: {apiResponse.offer._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 text-lg relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Gift size={20} />
                  Claim Your Prize Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
              
              <p className="text-sm text-gray-500 font-medium">
                Offer valid until {new Date(apiResponse.offer.endDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Bottom sparkles */}
            <div className="flex justify-center gap-3 mt-6">
              {[...Array(5)].map((_, i) => (
                <Sparkles 
                  key={i}
                  className="text-purple-400 animate-pulse" 
                  size={16}
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes starRain {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OfferWinPopup;