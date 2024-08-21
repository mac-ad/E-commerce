"use client";
import { Products } from "@/app/components/TvCollection";
import { DiscountedTvDetailCard, TVDetailCard } from "@/app/components/TVDetailCard";
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
    return <p>loading...</p>;
  }
  return (
    <div className="w-full pt-[110px] bg-gray-100 flex justify-center">
      <div className="w-[90%] bg-white ">
        <h1 className=" pt-4 px-8 text-[#888888] font-semibold text-xl">{category}</h1>
        <div className="grid grid-cols-4 ">
          {productsByCategory.map((tvDetail) =>
              tvDetail.discount == "0%" ? (
                <TVDetailCard key={tvDetail.name} tvDetail={tvDetail} />
              ) : (
                <DiscountedTvDetailCard
                  tvDetail={tvDetail}
                  key={tvDetail.name}
                />
              )
            )}

        </div>
      </div>

      {/* <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-6"> */}
        {/* {productsByCategory.length > 0 ? (
          productsByCategory.map((product) => (
            <div
              key={product.name}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p>Price: Rs {product.price}</p>
              <p>EMI Price: Rs {product.emiPrice}</p>
              <p>Discount: {product.discount}</p>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )} */}
      {/* </div> */}
    </div>
  );
}
