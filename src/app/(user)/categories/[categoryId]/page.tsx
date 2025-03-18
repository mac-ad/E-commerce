"use client";
import {
  CatProdDetailCard,
} from "@/app/components/CatProdDetailCard";
import FilterSection from "@/app/components/FilterSection";
import Pagination from "@/app/components/Pagination";
import ProductsNotFound from "@/app/components/productsNotFound";
import ProductListSkeleton from "@/app/components/skeleton/ProductList";
import { PAGE, PAGE_SIZE } from "@/app/utils/constants/common";
import { getFullUrl } from "@/app/utils/utilityFunctions";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/features/api/productApiSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function GetProductByCategory() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [pageIndex, setPageIndex] = useState(PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [filter, setFilter] = useState({
    category: categoryId,
    isActive: true,
    brand: [],
  });


  const { data: products, isLoading, error } = useGetProductsQuery({...filter, pageIndex, pageSize });
  const categories = useSelector((state: RootState) => state?.category?.data);

  const currentCategory = categories.find((category: any) => category._id === categoryId);

  useEffect(() => {
    if(products?.total) {
      setTotalPages(Math.ceil(products?.total / PAGE_SIZE));
      setHasNext(products?.hasNext);
    }
  }, [products]);

  return (
    <div className=" bg-gray-100 flex flex-col items-end md:items-start py-5 bg-white w-[90%] mx-auto md:flex-row md:items-start md:gap-5">
      {/* filter section */}
      <div className="ml-auto md:w-[300px] hidden md:block">
          <FilterSection categoryId={categoryId} loading ={isLoading} setFilter = {setFilter} filter = {filter} resetPagination={() => setPageIndex(PAGE)}/>
      </div>
      <div className="w-full flex flex-col">
        <div className="ml-auto w-[fit-content] block md:hidden pb-4 order-2">
          {
            isLoading ? <Skeleton className="h-8 w-full rounded-0 w-[100px]" /> : 
              <FilterSection categoryId={categoryId} loading ={isLoading} setFilter = {setFilter} filter = {filter} resetPagination={() => setPageIndex(PAGE)}/>
          }
        </div>
        <div className="relative mb-5 w-full order-1">
          {
            !currentCategory ? <div >
              <Skeleton className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-none" />
            </div> :  currentCategory?.bannerImage && (
              <Image 
                src={getFullUrl(currentCategory?.bannerImage)} 
                alt={`${currentCategory?.name} banner`}
                width={1920}
                height={100}
                className="object-cover w-full h-[150px] md:h-[200px] lg:h-[300px]"
              />
            )
          }
        </div>
        <div className = "w-full order-3">
          {
            isLoading ? (
              <ProductListSkeleton />
            ) : (
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                { products?.data && products?.data?.length > 0 ? products?.data?.map((product) => (
                    <>
                      <CatProdDetailCard
                          key={product.name}
                          data={product}
                      />
                     
                    </>
                )) : (
                    <ProductsNotFound />
                )}
            </div>
            )
          }
          <div className="flex justify-center items-center mt-5">
            <Pagination 
              currentPage={pageIndex}
              totalPages={totalPages}
              onPageChange={(page) => setPageIndex(page)}
              hasNext={hasNext}
            />
          </div>

        </div>
        </div>
          
    </div>
  );
}
