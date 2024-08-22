"use client";
import { CatProdDetailCard, DiscountedProductDetailCard } from "@/app/components/CatProdDetailCard";
import { Products } from "@/app/components/TvCollection";
import {
  DiscountedTvDetailCard,
  TVDetailCard,
} from "@/app/components/TVDetailCard";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function GetProductByCategory() {
  const params = useParams();
  const category = decodeURIComponent(params.categoriescategory.toString());
  const [productsByCategory, setProductsByCategory] = useState<Products[]>([]);

  const fetchDataByCategory = async () => {
    try {
      const data = await fetch(
        `http://localhost:2000/products?category=${category}`
      );
      if (!data.ok) {
        throw new Error("Failed to fetch products");
      }
      const response = await data.json();
      setProductsByCategory(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchDataByCategory();
  }, [category]);

  if (!productsByCategory) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full pt-[110px] bg-gray-100 flex justify-center">
      <div className="w-[90%] bg-white">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  ">
          <div className="lg:col-span-1 md:col-span-1">
            <div className="bg-white0 p-4  shadow">
              <p>Filter content goes here...</p>
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-1">
            <h1 className="text-[#888888] font-semibold text-xl p-4">
              {category}
            </h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {productsByCategory.map((productDetail) =>
                productDetail.discount === "0%" ? (
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
    </div>
  );
}
