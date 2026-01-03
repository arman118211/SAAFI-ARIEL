import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ProductAbout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" mx-auto ">
      <div className=" rounded-lg ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between  text-left hover:bg-gray-50 transition-colors border-b border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">About Product</h2>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
        
        {isOpen && (
          <div className="pb-6 mt-2">
            <p className="text-gray-700 leading-relaxed">
              Autoimmunity Care Gluten Relief is a special supplement that helps you digest foods with gluten. It contains a special enzyme called DPP IV that works to break down gluten proteins and help with your digestion. This product is made to help people who are sensitive to gluten feel more comfortable by reducing bloating and gas. It also supports the overall health of your gut.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}