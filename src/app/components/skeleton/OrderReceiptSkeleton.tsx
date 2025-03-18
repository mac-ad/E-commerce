import { Skeleton } from "@/components/ui/skeleton"

const OrderReceiptSkeleton = () => {
  return (
    <div>
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Skeleton className="w-32 h-8" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6 bg-white">
          <div className="text-center border-b pb-6">
            <Skeleton className="h-8 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto mt-2" />
            <Skeleton className="h-6 w-20 mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid gap-6">
            <section className="p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            </section>

            <section className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
                <div className="flex justify-end mt-4">
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </section>

            <section className="p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderReceiptSkeleton
