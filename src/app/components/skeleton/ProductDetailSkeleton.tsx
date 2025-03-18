import { Skeleton } from '@/components/ui/skeleton'

const ProductDetailSkeleton = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col md:flex-row gap-2 md:gap-6 my-5 h-full">
        <div className="md:w-[450px] space-y-2 md:order-2">
          <Skeleton className="mx-auto h-[350px] rounded-0" />
          <Skeleton className="mx-auto h-[50px] rounded-0" />
        </div>
       <div className="w-full space-y-2" >
        <div className="space-y-2 ">
            <Skeleton className="h-[80px] w-3/4 rounded-0" />
            <Skeleton className="h-6 w-1/2 rounded-0" />
          </div>
          <div className="space-y-2 ">
            <Skeleton className="h-6 w-3/4 rounded-0" />
            <Skeleton className="h-[50px] w-1/2 rounded-0" />
            <Skeleton className="h-6 w-2/3 rounded-0" />
          </div>
          <div className="space-y-2 ">
            <Skeleton className="h-6 w-3/4 rounded-0" />
            <Skeleton className="h-[40px] w-1/2 rounded-0" />
            <Skeleton className="h-6 w-2/3 rounded-0" />
          </div>
          <div className="space-y-2 ">
            <Skeleton className="h-6 w-3/4 rounded-0" />
            <Skeleton className="h-6 w-1/2 rounded-0" />
            <Skeleton className="h-6 w-2/3 rounded-0" />
          </div>
          <div className="space-y-2 ">
            <Skeleton className="h-[150px] w-3/4 rounded-0" />
          </div>
       </div>
      </div>
  )
}

export default ProductDetailSkeleton
