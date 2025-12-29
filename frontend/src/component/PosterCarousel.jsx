import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PosterCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 🖥 Desktop Posters (5)
  const desktopPosters = [
    { id: 1, src: "./web/web1.jpeg", alt: "Poster 1" },
    { id: 2, src: "./web/web2.jpeg", alt: "Poster 2" },
    { id: 3, src: "./web/web3.jpeg", alt: "Poster 3" },
    { id: 4, src: "./web/web4.jpeg", alt: "Poster 4" },
    { id: 5, src: "./web/web5.jpeg", alt: "Poster 5" },
  ];

  // 📱 Mobile Posters (ONLY 4)
  const mobilePosters = [
    { id: 1, src: "./mobile/mob1.jpeg", alt: "Poster 1" },
    { id: 2, src: "./mobile/mob2.jpeg", alt: "Poster 2" },
    { id: 3, src: "./mobile/mob3.jpeg", alt: "Poster 3" },
    { id: 4, src: "./mobile/mob4.jpeg", alt: "Poster 4" },
  ];

  // 🔁 Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      setCurrentSlide(0); // reset slide on resize
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 🔀 Active posters based on device
  const posters = isMobile ? mobilePosters : desktopPosters;

  // 🔁 Auto-play (respects image count)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posters.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posters.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % posters.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + posters.length) % posters.length);

  return (
    <div className="relative w-full overflow-hidden mt-20 px-4">
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {posters.map((poster) => (
            <div key={poster.id} className="w-full flex-shrink-0 ">
              <img
                src={poster.src}
                alt={poster.alt}
                className="w-full object-contain mt-12"
                style={{ minHeight: isMobile ? "100px" : "300px" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* ◀ ▶ Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:scale-110"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:scale-110"
        >
          <ChevronRight />
        </button>
      </div>

      {/* ● Dots (device-aware) */}
      <div className="flex justify-center mt-6 gap-2">
        {posters.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 transition-all ${
              currentSlide === index
                ? "w-8 bg-gray-800 rounded-lg"
                : "w-2 bg-gray-400 rounded-full"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PosterCarousel;
