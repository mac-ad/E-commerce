import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProductListSkeleton = () => {
  return (
    <div className = "w-full mx-auto">
      <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {
          Array.from({length: 20}).map((_, index) => (
            <Skeleton key={index} className = "w-full h-[200px] rounded-none" />
          ))
        }
      </div>
    </div>
  )
}

export default ProductListSkeleton
