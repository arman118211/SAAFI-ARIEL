import ProductImageShimmer from "./ProductImageShimmer"
import ProductInfoShimmer from "./ProductInfoShimmer"
import CartSectionShimmer from "./CartSectionShimmer"
import SectionShimmer from "./SectionShimmer"

export default function ProductDetailShimmer() {
  return (
    <div className="bg-gray-50 p-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Image */}
        <div className="md:col-span-3">
          <ProductImageShimmer />
        </div>

        {/* Info */}
        <div className="md:col-span-6">
          <ProductInfoShimmer />
        </div>

        {/* Cart */}
        <div className="md:col-span-3">
          <CartSectionShimmer />
        </div>

        {/* Sections */}
        <div className="md:col-span-9 space-y-8">
          <SectionShimmer />
          <SectionShimmer />
          <SectionShimmer />
        </div>
      </div>
    </div>
  )
}
