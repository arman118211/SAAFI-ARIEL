import ShimmerBlock from "./ShimmerBlock"

export default function CartSectionShimmer() {
  return (
    <div className="space-y-6 p-6  md:sticky md:top-24">
      <ShimmerBlock className="h-8 w-40" />
      <ShimmerBlock className="h-4 w-56" />

      <ShimmerBlock className="h-10 w-40" />

      <div className="space-y-2">
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-6 w-full" />
      </div>

      <ShimmerBlock className="h-12 w-full rounded-lg" />

      <div className="flex items-center gap-3 pt-4">
        <ShimmerBlock className="w-12 h-12 rounded-md" />
        <div className="space-y-2 flex-1">
          <ShimmerBlock className="h-4 w-32" />
          <ShimmerBlock className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}
