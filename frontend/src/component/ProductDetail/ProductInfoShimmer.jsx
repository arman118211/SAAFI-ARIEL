import ShimmerBlock from "./ShimmerBlock"

export default function ProductInfoShimmer() {
  return (
    <div className="space-y-5">
      <ShimmerBlock className="h-4 w-40" />
      <ShimmerBlock className="h-7 w-3/4" />
      <ShimmerBlock className="h-4 w-48" />

      <div className="space-y-2">
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-4 w-11/12" />
        <ShimmerBlock className="h-4 w-10/12" />
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-6">
            <ShimmerBlock className="h-4 w-40" />
            <ShimmerBlock className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  )
}
