import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ProductDetails({product}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const productInfo = [
    { label: 'Brand', value: product.attributes.brand },
    { label: 'Quantity', value: product.quantity },
    { label: 'Category', value: product.category },
    { label: 'Pack of one bag', value: `${product.packSize} Items` },
    { label: 'Contact details consumer care', value: 'Mayadevi-01, Pakadi Kapilvastu, Nepal +977-982-6448200' },
    { label: 'Seller pickup return', value: 'Yes' },
    { label: 'common or generic name of commodity', value: 'Gaay Chaap' },
    { label: 'Manufacturer or packer address', value: 'Mayadevi-01, Pakadi Kapilvastu, Nepal' },
    { label: 'Time to ship', value: '3 Hours' },
  ];

  return (
    <div className="w-full  mx-auto">
      <div 
        className="flex items-center justify-between cursor-pointer border-b border-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="md:text-2xl text-xl font-semibold mb-2">Product details</h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {productInfo.map((item, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-[200px_1fr] gap-4 py-3 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'
              }`}
            >
              <div className="px-4 text-sm text-gray-700">
                {item.label}
              </div>
              <div className="px-4 text-sm text-gray-900">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}