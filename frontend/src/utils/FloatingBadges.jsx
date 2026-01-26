import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const fallbackBadges = [
  {
    _id: "1",
    title: "Mega Cash",
    description: "30 bora par ₹500–₹1000 cash reward",
    minPurchaseQty: 30,
    rewardMinAmount: 500,
    rewardMaxAmount: 1000,
    color: "from-amber-400 to-orange-500",
  },
  {
    _id: "2",
    title: "Scratch & Win",
    description: "Order complete hote hi scratch reward",
    minPurchaseQty: 20,
    rewardMinAmount: 200,
    rewardMaxAmount: 500,
    color: "from-blue-400 to-indigo-600",
  },
];

const FloatingBadges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const badgeWidth = 220; // Width of each badge card + gap
  const gap = 16; // gap-4 = 16px

  const BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchBadges = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE}/reward`);
        setBadges(false ? res.data.data : fallbackBadges);
      } catch (err) {
        setBadges(fallbackBadges);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchBadges();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (badges.length <= 3 || isPaused) return;

    const scroll = () => {
      if (!sliderRef.current) return;

      const container = sliderRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (container.scrollLeft >= maxScroll - 1) {
        // If at the end, scroll back to start smoothly
        container.scrollTo({ left: 0, behavior: 'smooth' });
        setCurrentIndex(0);
      } else {
        // Scroll to next item
        const nextIndex = currentIndex + 1;
        const scrollTo = nextIndex * (badgeWidth + gap);
        
        container.scrollTo({ left: scrollTo, behavior: 'smooth' });
        setCurrentIndex(nextIndex >= badges.length ? 0 : nextIndex);
      }
    };

    // Scroll every 3 seconds
    autoScrollRef.current = setInterval(scroll, 1000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [badges.length, isPaused, currentIndex]);

  // Mouse events for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    
    // Pause auto-scroll
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      // Resume auto-scroll after 2 seconds
      setTimeout(() => setIsPaused(false), 2000);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Resume auto-scroll after 2 seconds
      setTimeout(() => setIsPaused(false), 2000);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
    
    // Update current index based on scroll position
    const newIndex = Math.round(sliderRef.current.scrollLeft / (badgeWidth + gap));
    setCurrentIndex(Math.min(newIndex, badges.length - 1));
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
    
    const newIndex = Math.round(sliderRef.current.scrollLeft / (badgeWidth + gap));
    setCurrentIndex(Math.min(newIndex, badges.length - 1));
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => setIsPaused(false), 2000);
    }
  };

  // Handle container hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleMouseExit = () => {
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Scroll buttons with index-based navigation
  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    
    setIsPaused(true);
    
    const container = sliderRef.current;
    const scrollTo = index * (badgeWidth + gap);
    
    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
    
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  const scroll = (direction) => {
    const newIndex = direction === 'left' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(badges.length - 1, currentIndex + 1);
    
    scrollToIndex(newIndex);
  };

  // Handle scroll event to update current index
  const handleScroll = () => {
    if (!sliderRef.current || isDragging) return;
    
    const container = sliderRef.current;
    const scrollPos = container.scrollLeft;
    const newIndex = Math.round(scrollPos / (badgeWidth + gap));
    setCurrentIndex(Math.min(newIndex, badges.length - 1));
  };

  if (loading) {
    return (
      <div className="w-full overflow-hidden py-4 flex gap-4 px-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-[220px] shrink-0 h-32 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gray-50/50 py-6">
      {/* Auto-scroll indicator */}
      <div className="absolute top-2 right-4 flex items-center gap-2 z-20">
        <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-gray-400' : 'bg-green-500 animate-pulse'}`} />
        <span className="text-xs text-gray-500 font-medium">
          {isPaused ? 'Paused' : 'Auto-scrolling'}
        </span>
      </div>

      {/* Scroll Buttons */}
      {badges.length > 3 && (
        <>
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slider Container */}
      <div 
        ref={containerRef}
        className="relative overflow-x-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseExit}
      >
        {/* Scrollable Slider */}
        <div 
          ref={sliderRef}
          className="flex gap-4 px-4 overflow-x-auto scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onScroll={handleScroll}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {badges.map((badge, index) => (
            <div
              key={`${badge._id}-${index}`}
              onClick={() => {
                if (!isDragging) {
                  setSelected(badge);
                }
              }}
              className="relative w-[220px] shrink-0 overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-200 active:scale-[0.98]"
            >
              <div className={`absolute -right-4 -top-4 h-12 w-12 rounded-full opacity-10 bg-gradient-to-br ${badge.color || 'from-orange-400 to-red-500'}`} />
              
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[12px]">🎁</span>
                <h4 className="text-sm font-bold text-gray-800 truncate">{badge.title}</h4>
              </div>
              
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-[10px] font-medium uppercase text-gray-400">Up to</span>
                <span className="text-base font-black text-orange-600">₹{badge.rewardMaxAmount}</span>
              </div>
              
              <div className="mt-1 text-[11px] font-medium text-gray-500">
                Min. Order: <span className="text-gray-900">{badge.minPurchaseQty} units</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
      </div>

      {/* Scroll Indicator */}
      {badges.length > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          {/* Previous button for mobile */}
          <button 
            onClick={() => scroll('left')}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5">
            {badges.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`transition-all duration-300 ${index === currentIndex ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                style={{
                  width: index === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next button for mobile */}
          <button 
            onClick={() => scroll('right')}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* MODAL SECTION */}
      {selected && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
          onClick={() => setSelected(null)}
        >
          <div 
            className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${selected.color || 'from-orange-400 to-red-500'}`} />
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl">🏆</div>
              <h3 className="text-xl font-bold text-gray-900">{selected.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{selected.description}</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <span className="text-sm text-gray-500">Target</span>
                  <span className="font-bold text-gray-900">{selected.minPurchaseQty} Units</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3 border border-orange-100">
                  <span className="text-sm text-orange-700 font-medium">Reward</span>
                  <span className="font-bold text-orange-700">₹{selected.rewardMinAmount} - {selected.rewardMaxAmount}</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="mt-8 w-full rounded-xl bg-gray-900 py-3 font-bold text-white hover:bg-black transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingBadges;