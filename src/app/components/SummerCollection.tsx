"use client";
import { useEffect, useState } from "react";
import { CatProdDetailCard, DiscountedProductDetailCard } from "./CatProdDetailCard";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export interface Products {
  name: string;
  brand: string;
  discount: number;
  price: number;
  quantity: number;
  description: string;
  product_image?: string;
  emiprice: number;
  category:string;
  size: number;
  type: "TV" | "AirConditioner" | "Refrigerator";
}

export const fetchSummerCollection = async() =>{
  const res = await fetch(`/api/products`)
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}
export default function SummerCollection() {
  // const [summerCollectionData, setSummerCollectionData] = useState<Products[]>(
  //   []
  // );
  const {
    data: summerCollectionData,
    isLoading,
    isError,
  }: UseQueryResult<Products[], Error> = useQuery({
    queryKey: ["products"],
    queryFn: fetchSummerCollection,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        {/* <Spinner /> */}
        Loading...
      </div>
    );
  }

  if (isError || !summerCollectionData) {
    return <div>Error fetching summer collection data</div>;
  }


  // useEffect(() => {
  //   fetchSummerCollection();
  // }, []);

  // const fetchSummerCollection = async () => {
  //   const response = await fetch("/api/products");
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   const data: Products[] = await response.json();
  //   setSummerCollectionData(data);
  // };

  // if (summerCollectionData.length === 0) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="w-full bg-gray-100">
      <div className="w-full bg-gray-100 flex justify-center">
        <div className="w-[90%] pt-4 bg-white">
          <h1 className="text-center text-xs font-light text-gray-600">
            <span className="text-base font-semibold text-[#0171b6]">
              EMBRACE THE HEAT | Explore Our Products for Imminent Summer Season
              !
            </span>
          </h1>
          <hr className="mt-3 text-gray-400" />
          <div className="grid lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-3 ">
            {summerCollectionData
              .filter(
                (product) =>
                  product.type == "Refrigerator"               )
              .map((productDetail) =>
                productDetail.discount === 0 ? (
                  <CatProdDetailCard key={productDetail.name} productDetail={productDetail} />
                ) : (
                  <DiscountedProductDetailCard
                    productDetail={productDetail}
                    key={productDetail.name}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
