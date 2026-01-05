import React, { useEffect, useState } from 'react';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import CartSection from './CartSection';
import ProductAbout from './ProductAbout';
import ProductDetails from './ProductDetails';
import { useParams } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { fetchProducts } from "../../redux/slices/productSlice"
import { CheckCircle } from "lucide-react";
import ProductDetailShimmer from "./ProductDetailShimmer"

function KeyFeatures({ features = [] }) {
  if (!features.length) return null;

  return (
    <div >
      <h3 className="md:text-2xl text-xl font-semibold text-gray-900 mb-3">
        Key Features
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-lg"
          >
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-gray-800">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)
  const { seller } = useSelector((state) => state.auth)

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
      if (seller) {
        dispatch(fetchProducts(seller))
      }else{
        dispatch(fetchProducts("common"))

      }
    }, [products.length, seller, dispatch])

  const productData = products.find((p) => p._id === id)

 if (loading || products.length === 0) {
    return <ProductDetailShimmer />
  }

   if (!productData) {
    return <p>Product not found</p>
  }

  console.log("productData-->",productData)

  const product = {
    title: productData.name,
    description:
      productData.description,
    fullDescription: productData.usageInstruction
    ? [productData.usageInstruction]
    : [],
    price:  productData.price * productData.packSize,
    currency: "₹",
    deliveryTime: "3 Hours",
    returnWindow: "7 Days",
    seller: {
      name: "Saafi Ariel Udyog",
      storeLink: "#",
      vendorSource: "Direct",
      image: "/logo.jpg",
      productId : productData._id,
      productName: productData.name,
      imageUrl:productData.imageUrl
    },
    attributes: {
      countryOfOrigin: "Nepal",
      brand: "Saafi Ariel",
      availability: productData.stock > 0 ? "In Stock" : "Out of Stock"
    },
    images: [productData.imageUrl],
    packSize:productData.packSize,
    discount:productData.discount,
    pricePerProduct:productData.price,
    quantity:productData.quantity,
    category:productData.category,
    keyFeatures:productData.keyFeatures
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

        <div className="md:col-span-3 md:sticky md:top-24 h-fit">
        <CartSection 
            price={product.price}
            currency={product.currency}
            deliveryTime={product.deliveryTime}
            returnWindow={product.returnWindow}
            quantity={quantity}
            onQuantityChange={setQuantity}
            seller={product.seller}
            packSize={product.packSize}
            status={product.status}
            pricePerProduct={product.pricePerProduct}
            discount={product.discount}
        />
        </div>


          {/* ✅ Product About Section (Below Image + Info) */}
          <div className="md:col-span-9 w-full  ">
            <ProductAbout description={product.description}  heading={"About Product"} />
          </div>
          <div className="md:col-span-9 w-full  ">
            <KeyFeatures features={product.keyFeatures} />

          </div>
          <div className="md:col-span-9 w-full  ">
            <ProductDetails product={product} />
          </div>
          <div className="md:col-span-9 w-full  ">
            <ProductAbout description={product.fullDescription}  heading={"How To Use"} />
          </div>

        </div>
      </div>
    </div>
  );
}
