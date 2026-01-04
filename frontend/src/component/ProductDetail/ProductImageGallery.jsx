import React from 'react';
import { Heart, Share2 } from 'lucide-react';

const ProductImageGallery = ({ images, selectedImage, onImageSelect }) => {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={images[selectedImage]} 
          alt="Product" 
          className="w-full h-80 sm:h-64 md:h-100 object-cover"
        />
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-3 gap-2 ">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onImageSelect(idx)}
            className={`border-2 rounded-lg overflow-hidden transition-all duration-200 ${
              selectedImage === idx 
                ? 'border-blue-500 scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              className="w-full h-15 md:h-18 object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;