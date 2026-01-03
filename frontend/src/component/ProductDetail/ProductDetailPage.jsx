import React, { useState } from 'react';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import CartSection from './CartSection';
import ProductAbout from './ProductAbout';

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const product = {
    title: "Sreshta Farms Instant Brown Rice Dosa Powder",
    description:
      "Sreshta Farms Instant Brown Rice Dosa Powder combines the natural goodness of brown rice with the ease of instant cooking.",
    fullDescription: [
      "This premium instant dosa powder is crafted from carefully selected brown rice.",
      "Perfect for busy mornings and health-conscious individuals."
    ],
    price: 249,
    currency: "₹",
    deliveryTime: "3 Hours",
    returnWindow: "7 Days",
    seller: {
      name: "Umme Kulsum",
      storeLink: "#",
      vendorSource: "prod-bridge.sellersetu.in/ondc/wcommerce",
      image: "/api/placeholder/40/40"
    },
    attributes: {
      countryOfOrigin: "India",
      brand: "Sreshta Farms",
      availability: "In Stock"
    },
    status: {
      cancellable: false,
      returnable: true
    },
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400"
    ]
  };

  return (
    <div className="bg-gray-50 p-4 md:px-20">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Product Image */}
          <div className="md:col-span-3">
            <ProductImageGallery
              images={product.images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
            />
          </div>

          {/* Product Info */}
          <div className="md:col-span-6">
            <ProductInfo
              product={product}
              showFullDescription={showFullDescription}
              onToggleDescription={() =>
                setShowFullDescription(!showFullDescription)
              }
            />
          </div>

          {/* Cart Section */}
          {/* Sticky Cart Section */}
        <div className="md:col-span-3 md:sticky md:top-24 h-fit">
        <CartSection 
            price={product.price}
            currency={product.currency}
            deliveryTime={product.deliveryTime}
            returnWindow={product.returnWindow}
            quantity={quantity}
            onQuantityChange={setQuantity}
            seller={product.seller}
            status={product.status}
        />
        </div>


          {/* ✅ Product About Section (Below Image + Info) */}
          <div className="md:col-span-9 w-full  ">
            <ProductAbout product={product} />
          </div>

        </div>
      </div>
    </div>
  );
}
