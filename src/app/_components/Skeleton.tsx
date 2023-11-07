import React from "react"

interface SkeletonProps {
  width?: string
}

export default function Skeleton({ width = "w-3/4" }: SkeletonProps) {
  return (
    <div className="animate-pulse">
      <div
        className={`${width} h-10 bg-gray-300 dark:bg-gray-700 rounded-md`}
      />
    </div>
  )
}
