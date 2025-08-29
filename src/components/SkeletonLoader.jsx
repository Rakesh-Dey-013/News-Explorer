const SkeletonLoader = () => {
  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 animate-pulse">
      <div className="w-full h-48 bg-zinc-700"></div>
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <div className="h-4 w-20 bg-zinc-700 rounded"></div>
          <div className="h-4 w-16 bg-zinc-700 rounded"></div>
        </div>
        <div className="h-5 w-full bg-zinc-700 rounded mb-3"></div>
        <div className="h-4 w-full bg-zinc-700 rounded mb-2"></div>
        <div className="h-4 w-4/5 bg-zinc-700 rounded mb-4"></div>
        <div className="h-3 w-16 bg-zinc-700 rounded"></div>
      </div>
    </div>
  )
}

export default SkeletonLoader