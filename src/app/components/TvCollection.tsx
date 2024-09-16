"use client";
import { useEffect, useState } from "react";
import {
  CatProdDetailCard,
  DiscountedProductDetailCard,
} from "./CatProdDetailCard";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";

export interface Products {
  name: string;
  brand: string;
  discount: number;
  price: number;
  quantity: number;
  description: string;
  product_image?: string;
  emiprice: number;
  category: string;
  size: number;
  type: "TV" | "AirConditioner" | "Refrigerator";
  $id: string;
  stock:number;
}

export const fetchTVCollection = async () => {
  const res = await fetch(`/api/products`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function TvCollection() {
  // const [tvCollectionData, setTvCollectionData] = useState<Products[]>([]);

  const {
    data: tvCollectionData,
    isLoading,
    isError,
  }: UseQueryResult<Products[], Error> = useQuery({
    queryKey: ["products"],
    queryFn: fetchTVCollection,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !tvCollectionData) {
    return <div>Error fetching members</div>;
  }

  // useEffect(() => {
  //   fetchTvCollection();
  //   fetchAPI();
  // }, []);

  // const fetchTvCollection = async () => {
  //   const response = await fetch("/api/products");
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   const data: Products[] = await response.json();
  //   setTvCollectionData(data);
  // };

  // const fetchAPI = async() =>{
  //   const data = await fetch("/api/products");
  //   if(!data.ok){
  //     throw new Error("Network response was not ok")
  //   }
  //   const response = await data.json();
  //   console.log(response)
  // }

  // if (tvCollectionData.length === 0) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="w-full bg-gray-100 flex justify-center">
      <div className="w-[90%] pt-4 bg-white">
        <h1 className="text-center text-xs font-light text-gray-600">
          <span className="text-base font-semibold text-[#0171b6]">
            SMART LED TV COLLECTION
          </span>
          IN BEST PRICE - choose your TV's
        </h1>
        <hr className="mt-3 text-gray-400" />
        <div className="grid lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-3 ">
          {tvCollectionData
            .filter((product) => product.type == "TV")
            .map((productDetail) =>
              productDetail.discount === 0 ? (
                <CatProdDetailCard
                  key={productDetail.name}
                  productDetail={productDetail}
                />
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
  );
}
