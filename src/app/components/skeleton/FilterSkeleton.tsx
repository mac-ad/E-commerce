import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FilterSkeleton = () => {
  return (
    <>
      <div className="w-full  space-y-4  rounded-0">
        <Skeleton className="h-8 w-full rounded-0" />
        
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4 rounded-0" />
          <Skeleton className="h-6 w-1/2 rounded-0" />
          <Skeleton className="h-6 w-2/3 rounded-0" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4 rounded-0" />
          <Skeleton className="h-6 w-1/2 rounded-0" />
          <Skeleton className="h-6 w-2/3 rounded-0" />
        </div>

        <Skeleton className="h-10 w-full rounded-0" />
      </div>
    </>
  )
}

export default FilterSkeleton
