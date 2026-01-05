import ShimmerBlock from "./ShimmerBlock"

export default function SectionShimmer() {
  return (
    <div className="space-y-4">
      <ShimmerBlock className="h-6 w-56" />
      {[1, 2, 3].map((i) => (
        <ShimmerBlock key={i} className="h-4 w-full" />
      ))}
    </div>
  )
}
