import ShimmerBlock from "./ShimmerBlock"

export default function ProductImageShimmer() {
  return (
    <div className="space-y-4">
      <ShimmerBlock className="w-full h-80 rounded-lg" />
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <ShimmerBlock key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
