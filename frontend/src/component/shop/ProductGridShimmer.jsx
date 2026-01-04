"use client"
import ProductCardShimmer from "./ProductCardShimmer"

export default function ProductGridShimmer({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardShimmer key={idx} />
      ))}
    </div>
  )
}
