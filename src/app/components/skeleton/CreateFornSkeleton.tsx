import { Skeleton } from "@/components/ui/skeleton"

const CreateFormSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Name field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Price and Quantity row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Category and Brand row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[90px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Description field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Image upload area */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <div className="border-2 border-dashed rounded-lg p-4">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          {/* Image preview placeholders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Submit button */}
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default CreateFormSkeleton
