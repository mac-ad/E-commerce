"use client"

import { CatProdDetailCard } from "@/app/components/CatProdDetailCard";
import ProductListSkeleton from "@/app/components/skeleton/ProductList";
import { useGetProductsQuery } from "@/features/api/productApiSlice";

const HomepageDiscounted = ({className}:{className?:string}) => {
  // Add discount filter to query
  const { data, isLoading } = useGetProductsQuery({
    discounted:true  // Sort by highest discount first
  });


  if (data?.data?.length === 0) {
    return null; // Don't render section if no discounted products
  }

  return (
    <div className={`w-[90%] mx-auto bg-white ${className}`}>
      {isLoading ? (
        <ProductListSkeleton />
      ) : (
        <div>
          <div className="text-xl border border-gray-100 py-4 text-center">
            <span className="text-primary mr-2">
              Special Discounts
            </span>
            <span className="text-xs text-gray-500">
              SAVE BIG ON THESE DEALS
            </span>
          </div>
          <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3">
            {data?.data?.map((product) => (
              <CatProdDetailCard key={product._id} data={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomepageDiscounted; 