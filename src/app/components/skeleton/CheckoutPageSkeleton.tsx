import { Skeleton } from "@/components/ui/skeleton";

const CheckoutPageSkeleton = () => {
  return (
    <div className="w-[90%] max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Skeleton className="h-6 w-40 mb-4" />
            
            <div className="space-y-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="border rounded-lg p-4">
              <div className="space-y-3">
                {Array.from({length:8}).map((_,i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CheckoutPageSkeleton
