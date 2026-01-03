import React from 'react';
import { Minus, Plus, Check, X, Download, Share2 } from 'lucide-react';

const CartSection = ({ 
  price, 
  currency, 
  deliveryTime, 
  returnWindow, 
  quantity, 
  onQuantityChange,
  seller,
  status 
}) => {
  const DeliveryIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );

  const handleDecrement = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="md:sticky md:top-22 space-y-6 border-2 border-gray-200 p-4 md:p-6 rounded-md bg-white shadow-sm">
      {/* Price */}
      <div className="flex items-center justify-between">
        <span className="text-2xl md:text-3xl font-bold text-gray-900">
          {currency}{price}
        </span>
        <span className="text-sm text-gray-500 line-through">₹299</span>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center gap-2 text-green-600">
        <DeliveryIcon />
        <span className="font-semibold">{deliveryTime} Delivery</span>
      </div>

      {/* Return Window */}
      <div className="text-sm text-gray-600">
        Return Window: <span className="font-semibold text-gray-900">{returnWindow}</span>
      </div>

      {/* Quantity Selector */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Quantity</p>
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg w-fit">
          <button 
            onClick={handleDecrement}
            className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 font-semibold min-w-[40px] text-center">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-gray-600">Total:</span>
        <span className="text-xl font-bold text-gray-900">{currency}{price * quantity}</span>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
        ADD TO CART
      </button>

      {/* Seller Info */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center gap-3">
          <img 
            src={seller.image} 
            alt={seller.name} 
            className="w-12 h-12 rounded-full border-2 border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 truncate">
              Sold By: <a href={seller.storeLink} className="text-blue-600 hover:underline">{seller.name}</a>
            </p>
            <p className="text-xs text-gray-500 truncate hidden sm:block">
              Vendor Source: {seller.vendorSource}
            </p>
            <p className="text-xs text-gray-500 sm:hidden truncate">
              Source: {seller.vendorSource.substring(0, 15)}...
            </p>
          </div>
        </div>
      </div>

      {/* Product Status */}
      <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-6">
        <div className={`flex items-center gap-2 ${status.cancellable ? 'text-gray-600' : 'text-red-500'}`}>
          {status.cancellable ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          <span>Cancellable</span>
        </div>
        <div className={`flex items-center gap-2 ${status.returnable ? 'text-green-600' : 'text-gray-600'}`}>
          {status.returnable ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          <span>Returnable</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <button className="flex items-center gap-2 text-blue-600 text-sm hover:underline transition-colors">
          <Download className="w-4 h-4" />
          <span>Download QR</span>
        </button>
        <button className="flex items-center gap-2 text-blue-600 text-sm hover:underline transition-colors">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default CartSection;