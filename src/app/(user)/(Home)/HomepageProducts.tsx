"use client"

import { CatProdDetailCard } from "@/app/components/CatProdDetailCard";
import ProductListSkeleton from "@/app/components/skeleton/ProductList";
import {  useGetProductsQuery } from "@/features/api/productApiSlice";

// displays recently added products on the homepage
const HomepageProducts = ({className}:{className?:string}) => {

  const {data,isLoading} = useGetProductsQuery({isActive:true});

  return (
    <div className = {`w-[90%]  mx-auto  bg-white ${className}`}>
        {
            isLoading ? (
                <ProductListSkeleton />
            ) : (
                <div>
                    <div className = "text-xl border border-gray-100 py-4 text-center">
                        <span className = "text-primary mr-2">
                            Recently Added Products
                        </span>
                        <span className = "text-xs text-gray-500">IN BEST PRICE - choose your TV 's</span>
                    </div>
                    <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3">
                        {data?.data?.map((product) => (
                            <CatProdDetailCard key={product._id} data={product} />
                        ))}
                    </div>
                </div>
            )
        }   
    </div>
  )
}

export default HomepageProducts
