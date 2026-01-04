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
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Key Attributes
        </h2>

        <div className="space-y-3">
          {/* Country of Origin */}
          <div className="flex items-center">
            <p className="w-40 text-sm text-gray-600">
              Country of Origin
            </p>
            <p className="text-base font-medium text-gray-900">
              {product.attributes.countryOfOrigin}
            </p>
          </div>

          {/* Brand */}
          <div className="flex items-center">
            <p className="w-40 text-sm text-gray-600">
              Brand
            </p>
            <p className="text-base font-medium text-gray-900">
              {product.attributes.brand}
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center">
            <p className="w-40 text-sm text-gray-600">
              Availability
            </p>
            <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded font-medium">
              {product.attributes.availability}
            </span>
          </div>
        </div>

        <button className="text-blue-600 text-sm hover:underline mt-5 transition-colors">
          View full attributes
        </button>
      </div>

    </div>
  );
};

export default ProductInfo;