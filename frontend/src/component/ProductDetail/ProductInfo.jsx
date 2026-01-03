import React from 'react';

const ProductInfo = ({ product, showFullDescription, onToggleDescription }) => {
  return (
    <div className="space-y-6">
      {/* Store Link */}
      <a 
        href={product.seller.storeLink} 
        className="text-blue-600 text-sm hover:underline inline-block"
      >
        Visit the {product.seller.name} Store
      </a>

      {/* Product Title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">
        {product.title}
      </h1>

      {/* Review Prompt */}
      <p className="text-sm text-blue-600 hover:underline cursor-pointer">
        Be the first to review this product
      </p>

      {/* Description */}
      <div className="text-gray-700">
        <p className="leading-relaxed text-sm md:text-base">
          {product.description}
        </p>
        <button 
          onClick={onToggleDescription}
          className="text-blue-600 text-sm hover:underline mt-2 transition-colors"
        >
          {showFullDescription ? 'Read Less' : 'Read More'}
        </button>
        
        {showFullDescription && (
          <div className="mt-4 space-y-3 text-sm">
            {product.fullDescription.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>

      {/* Key Attributes */}
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Key Attributes</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Country Of Origin</p>
            <p className="text-base font-medium text-gray-900">{product.attributes.countryOfOrigin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Brand</p>
            <p className="text-base font-medium text-gray-900">{product.attributes.brand}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Availability</p>
            <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1.5 rounded font-medium">
              {product.attributes.availability}
            </span>
          </div>
        </div>

        <button className="text-blue-600 text-sm hover:underline mt-6 transition-colors">
          View full attributes
        </button>
      </div>

      {/* Additional Product Details */}
      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
        <p className="text-gray-700 text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
          nostrud exercitation ullamco laboris.
        </p>
        <p className="text-gray-700 text-sm md:text-base">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;