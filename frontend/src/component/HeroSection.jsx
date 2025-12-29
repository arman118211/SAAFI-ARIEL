import { useState, useEffect } from "react"
import PosterCarousel from "./PosterCarousel"

const HeroSection = () => {
  const text =
    "TRUST SAAFI ARIEL RANGE OF DETERGENT TO TAKE CARE OF ALL YOUR LAUNDRY NEED!"

  const [displayText, setDisplayText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const speed = isDeleting ? 25 : 55

    const timeout = setTimeout(() => {
      if (!isDeleting && index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        setIndex(index + 1)
      } else if (isDeleting && index > 0) {
        setDisplayText(text.slice(0, index - 1))
        setIndex(index - 1)
      } else if (index === text.length) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (index === 0) {
        setIsDeleting(false)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [index, isDeleting, text])

  return (
    <section className="relative w-full overflow-hidden">
      {/* Animated Hero Text */}
      <div className="absolute top-0 left-0 w-full py-4 z-10 bg-white">
        <p className="text-center text-md md:text-3xl px-4 font-extrabold tracking-wide">
          <span className="relative inline-block bg-gradient-to-r from-red-600 via-purple-500 to-blue-600 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
            {displayText}
          </span>
          <span className="ml-1 text-purple-600 animate-blink">|</span>
        </p>
      </div>

      <PosterCarousel />

      {/* Custom Animations */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient {
            animation: gradient 4s ease infinite;
          }

          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }

          .animate-blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
    </section>
  )
}

export default HeroSection
