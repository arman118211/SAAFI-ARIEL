import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import { 
  Droplet, 
  Shirt, 
  ThermometerSun, 
  Waves, 
  Hourglass, 
  Wind, 
  CheckCircle, 
  ChevronRight,
  ChevronLeft,
  Pause,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NeNavbar from './NeNavbar';
import NeFooter from './NeFooter';

const NeWashCloth = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayIntervalRef = useRef(null);
  const AUTO_PLAY_INTERVAL = 5000; // 5 seconds per step
  
  const steps = [
    {
      title: "कपडा छुट्याउनुहोस्",
      icon: <Shirt size={36} />,
      description: "सर्वोत्तम परिणामका लागि आफ्नो लुगा रंग (सेतो, गाढा, रंगीन) र कपडाको प्रकार अनुसार छुट्याउनुहोस्।",
      tip: "धुनु अघि खल्तीहरू जाँच गर्नुहोस् र जिपरहरू बन्द गर्नुहोस्।",
      image: "/clothProcess/sort1.jpg",
      color: "blue"
    },
    {
      title: "गाय छाप डिटर्जेन्ट नाप्नुहोस्",
      icon: <Droplet size={36} />,
      description: "मानक लोडको लागि, २ चम्चा गाय छाप डिटर्जेन्ट प्रयोग गर्नुहोस्। धेरै फोहोर कपडाको लागि, ३ चम्चा प्रयोग गर्नुहोस्।",
      tip: "हाम्रो सान्द्र फर्मुलाले अन्य ब्रान्डहरू भन्दा कम डिटर्जेन्ट आवश्यक पर्छ!",
      image: "/clothProcess/sort2.jpg",
      color: "teal"
    },
    {
      title: "पानीको तापक्रम सेट गर्नुहोस्",
      icon: <ThermometerSun size={36} />,
      description: "गाढा रंगका लागि चिसो पानी, हल्का रंगका लागि तातो पानी, र सेतो र धेरै फोहोर वस्तुहरूका लागि तातो पानी प्रयोग गर्नुहोस्।",
      tip: "गाय छाप चिसो पानीमा पनि प्रभावकारी ढंगले काम गर्छ, ऊर्जा बचत गर्नुहोस्!",
      image: "/clothProcess/sort3.svg",
      color: "red"
    },
    {
      title: "धुने चक्र सुरु गर्नुहोस्",
      icon: <Waves size={36} />,
      description: "वासिङ मेसिनमा कपडा राख्नुहोस्, डिस्पेन्सरमा गाय छाप डिटर्जेन्ट थप्नुहोस्, र उपयुक्त वाश साइकल चयन गर्नुहोस्।",
      tip: "नाजुक कपडाका लागि, हाम्रो डिटर्जेन्टसँग कोमल साइकल प्रयोग गर्नुहोस्।",
      image: "/clothProcess/sort4.jpg",
      color: "indigo"
    },
    {
      title: "धुने समय",
      icon: <Hourglass size={36} />,
      description: "तपाईंको वासिङ मेसिनलाई चक्र पूरा गर्न दिनुहोस्। गाय छापको शक्तिशाली फर्मुला कडा दागहरूमा तुरुन्तै काम गर्न सुरु गर्छ।",
      tip: "धुनु अघि कडा दागहरूलाई थोरै मात्रामा गाय छापले उपचार गर्नुहोस्।",
      image: "/clothProcess/sort5.svg",
      color: "purple"
    },
    {
      title: "सुकाउने",
      icon: <Wind size={36} />,
      description: "धुइसकेपछि कपडाहरू तुरुन्तै निकाल्नुहोस्। नाजुक कपडाहरू हावामा सुकाउन झुण्ड्याउनुहोस्, र अन्य वस्तुहरू उपयुक्त ढंगले टम्बल ड्राई गर्नुहोस्।",
      tip: "गाय छापको फर्मुलाले धेरै पटक धुएपछि पनि रंग फिक्का हुनबाट बचाउँछ!",
      image: "/clothProcess/sort6.jpg",
      color: "amber"
    },
    {
      title: "ताजा सफा कपडा उपभोग गर्नुहोस्",
      icon: <CheckCircle size={36} />,
      description: "तपाईंको कपडाहरू अब सफा, ताजा, र लगाउन तयार छन्! हरेक धुलाइमा गाय छापको फरक अनुभव गर्नुहोस्।",
      tip: "गाय छापलाई चिसो, सुख्खा ठाउँमा प्रत्यक्ष सूर्यको प्रकाशबाट टाढा राख्नुहोस्।",
      image: "/clothProcess/sort7.jpg",
      color: "green"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-500 text-white",
      teal: "bg-teal-500 text-white",
      red: "bg-red-500 text-white",
      indigo: "bg-indigo-500 text-white",
      purple: "bg-purple-500 text-white",
      amber: "bg-amber-500 text-white",
      green: "bg-green-500 text-white"
    };
    return colorMap[color] || colorMap.blue;
  };

  const getBgGradient = (color) => {
    const gradientMap = {
      blue: "from-blue-50 to-blue-100",
      teal: "from-teal-50 to-teal-100",
      red: "from-red-50 to-red-100",
      indigo: "from-indigo-50 to-indigo-100",
      purple: "from-purple-50 to-purple-100",
      amber: "from-amber-50 to-amber-100",
      green: "from-green-50 to-green-100"
    };
    return gradientMap[color] || gradientMap.blue;
  };

  const getLightBg = (color) => {
    const bgMap = {
      blue: "bg-blue-100",
      teal: "bg-teal-100",
      red: "bg-red-100",
      indigo: "bg-indigo-100",
      purple: "bg-purple-100",
      amber: "bg-amber-100",
      green: "bg-green-100"
    };
    return bgMap[color] || bgMap.blue;
  };

  const getTipBorder = (color) => {
    const borderMap = {
      blue: "border-blue-500 bg-blue-50",
      teal: "border-teal-500 bg-teal-50",
      red: "border-red-500 bg-red-50",
      indigo: "border-indigo-500 bg-indigo-50",
      purple: "border-purple-500 bg-purple-50",
      amber: "border-amber-500 bg-amber-50",
      green: "border-green-500 bg-green-50"
    };
    return borderMap[color] || borderMap.blue;
  };

  const getTipText = (color) => {
    const textMap = {
      blue: "text-blue-800",
      teal: "text-teal-800",
      red: "text-red-800",
      indigo: "text-indigo-800",
      purple: "text-purple-800",
      amber: "text-amber-800",
      green: "text-green-800"
    };
    return textMap[color] || textMap.blue;
  };

  const getButtonColor = (color) => {
    const buttonMap = {
      blue: "bg-blue-600 hover:bg-blue-700",
      teal: "bg-teal-600 hover:bg-teal-700",
      red: "bg-red-600 hover:bg-red-700",
      indigo: "bg-indigo-600 hover:bg-indigo-700",
      purple: "bg-purple-600 hover:bg-purple-700",
      amber: "bg-amber-600 hover:bg-amber-700",
      green: "bg-green-600 hover:bg-green-700"
    };
    return buttonMap[color] || buttonMap.blue;
  };

  const getProgressColor = (color) => {
    const progressMap = {
      blue: "bg-blue-600",
      teal: "bg-teal-600",
      red: "bg-red-600",
      indigo: "bg-indigo-600",
      purple: "bg-purple-600",
      amber: "bg-amber-600",
      green: "bg-green-600"
    };
    return progressMap[color] || progressMap.blue;
  };

  useEffect(() => {
    if (isAutoPlay && !isHovered) {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev === steps.length - 1) {
            return 0; // Loop back to the first step
          }
          return prev + 1;
        });
      }, AUTO_PLAY_INTERVAL);
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlay, isHovered, steps.length]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.4, ease: "easeIn" } }
  };

  const currentColor = steps[currentStep].color;

  return (
    <div>
      <NeNavbar/>
      <div className={`bg-gradient-to-b ${getBgGradient(currentColor)} min-h-screen p-6 transition-all duration-700`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              <span className="text-[#5851DB]">गाय छापसँग</span> तपाईंको कपडा कसरी धुने
            </h2>
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            हरेक पटक चम्किलो सफा कपडाका लागि यी सरल चरणहरू पालना गर्नुहोस्!
          </motion.p>
        </div>

        {/* Auto Play Controls */}
        <div className="flex justify-center items-center mb-6">
          <button 
            onClick={toggleAutoPlay}
            className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-full border transition-all duration-300 ${isAutoPlay ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
          >
            {isAutoPlay ? (
              <>
                <Pause size={16} />
                <span>स्वत: प्ले रोक्नुहोस्</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>स्वत: प्ले सुरु गर्नुहोस्</span>
              </>
            )}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`${getProgressColor(currentColor)} h-2.5 rounded-full transition-all duration-700 ease-in-out`} 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>सुरु</span>
            <span>समाप्त</span>
          </div>
        </div>

        {/* Step Content */}
        <div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col md:flex-row">
            {/* Image section */}
            <div className={`w-full md:w-2/5 ${getLightBg(currentColor)} flex items-center justify-center p-6 transition-all duration-700`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`image-${currentStep}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  className="rounded-lg overflow-hidden"
                >
                  <img 
                    src={steps[currentStep].image} 
                    alt={`चरण ${currentStep + 1}: ${steps[currentStep].title}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md" 
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content section */}
            <div className="w-full md:w-3/5 p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentStep}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                >
                  <div className="flex items-center mb-6">
                    <div className={`${getColorClasses(currentColor)} rounded-full w-12 h-12 flex items-center justify-center mr-4 transition-all duration-700`}>
                      {steps[currentStep].icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      चरण {currentStep + 1}: {steps[currentStep].title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6 text-lg">
                    {steps[currentStep].description}
                  </p>
                  
                  <div className={`border-l-4 p-4 rounded mb-8 ${getTipBorder(currentColor)} transition-all duration-700`}>
                    <p className={`${getTipText(currentColor)} transition-all duration-700`}>
                      <span className="font-bold">विशेषज्ञ सुझाव:</span> {steps[currentStep].tip}
                    </p>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button 
                      onClick={prevStep} 
                      disabled={currentStep === 0}
                      className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                        currentStep === 0 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : `text-${currentColor}-600 hover:bg-${currentColor}-50`
                      }`}
                    >
                      <ChevronLeft size={20} />
                      <span className="ml-1">अघिल्लो</span>
                    </button>
                    
                    <button 
                      onClick={nextStep} 
                      disabled={currentStep === steps.length - 1}
                      className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                        currentStep === steps.length - 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : `text-${currentColor}-600 hover:bg-${currentColor}-50`
                      }`}
                    >
                      <span className="mr-1">अर्को</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                currentStep === index 
                ? `${getProgressColor(step.color)} w-6` 
                : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`चरण ${index + 1} मा जानुहोस्`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">गाय छापको फरक अनुभव गर्न तयार हुनुहुन्छ?</h3>
          <p className="text-gray-600 mb-6">हाम्रो वातावरण-मैत्री फर्मुलाले तपाईंको कपडाहरू धुलाइ पछि धुलाइ नयाँ जस्तै राख्छ।</p>
          <Link to='/Ne-shop'>
          <button className={`${getButtonColor(currentColor)} text-white font-bold py-3 px-8 rounded-full transition-all duration-700 shadow-lg transform hover:scale-105`}>
            अहिले नै गाय छाप किन्नुहोस्
          </button>
          </Link>
        </motion.div>

        {/* Floating quick nav */}
        <div className="fixed bottom-6 right-6 z-10">
          <div className="bg-white shadow-lg rounded-full p-2 flex flex-col space-y-2">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0}
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                currentStep === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : `text-gray-600 hover:bg-gray-100`
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={toggleAutoPlay}
              className="rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={nextStep} 
              disabled={currentStep === steps.length - 1}
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                currentStep === steps.length - 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : `text-gray-600 hover:bg-gray-100`
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
      <NeFooter/>
    </div>
  );
};

export default NeWashCloth;