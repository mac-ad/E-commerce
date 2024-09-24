"use client";
import { useEffect, useState } from "react";
import { Products } from "./TvCollection";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import {
  CatProdDetailCard,
  DiscountedProductDetailCard,
} from "./CatProdDetailCard";

export const fetchProducts = async () => {
  const data = await fetch("/api/products");
  if (!data.ok) {
    throw new Error("Network Response was not OK");
  }
  return data.json();
};
export default function AirConditionerCollection() {
  const {
    data: AirConditionerData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !AirConditionerData) {
    return <div>Error fetching summer collection data</div>;
  }

  console.log(AirConditionerData);
  return (
    <div className="w-full bg-gray-100 flex justify-center pb-8 pt-8">
      <div className="w-[90%] pt-4 bg-white">
        <h1 className="text-center text-xs font-light text-gray-600">
          <span className="text-base font-semibold text-[#0171b6]">
            Air Conditioner |
          </span>
          &nbsp; Stay Cool and Comfortable This Summer with Our Latest Range!
        </h1>
        <hr className="mt-3 text-gray-400" />
        <div className="grid lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-3 ">
          {AirConditionerData.filter(
            (prodouct: Products) => prodouct.type == "AC"
          ).map((productDetail: Products) =>
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
