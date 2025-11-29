import { useState, useEffect } from "react"
import { ShoppingBag } from "lucide-react"
import {Link} from 'react-router-dom'

const heroBackgrounds = [
  "/banner/cow11.webp",
  "/banner/i2.webp",
  "/banner/cow12.webp",
]

const NeHeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Message */}
      <div className="absolute top-0 left-0 w-full bg-white py-4 z-10">
        <p className="text-center text-lg md:text-3xl px-4">
          <span className="font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            तपाईंको सबै लन्ड्री
          </span>{" "}
          आवश्यकताहरूको हेरचाह गर्न{" "}
          <span className="font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
          साफि एरियलको डिटर्जेन्ट रेंजमा विश्वास गर्नुहोस्!
          </span>
        </p>
      </div>

      {/* Background Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentBg === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%"
            }}
          />
        ))}
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-5"></div>

      {/* Hero Content - Now Left Aligned */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="text-left text-white px-8 md:px-16 lg:px-24 max-w-3xl">
          <h1 className="text-4xl md:text-4xl font-bold mb-6 leading-tight drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            सफाईको शक्ति मुक्त गर्नुहोस्
              <br />
              जहाँ दागहरूले समर्पण गर्छन् र
              <br />
              ताजगीको शासन हुन्छ।
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200">हाम्रो डिटर्जेन्ट, तपाईंको सफा पृष्ठ</p>
          <Link to='/Ne-shop'>
            <button
              className="bg-gradient-to-r from-red-500 to-purple-500 px-8 py-4 rounded-full text-lg font-bold flex items-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ShoppingBag className="mr-2" size={20} />
              अहिले किन्नुहोस्
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NeHeroSection