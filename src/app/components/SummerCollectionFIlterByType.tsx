"use client";
import React, { useEffect, useState } from "react";
import { Products } from "./TvCollection";
import { useRouter } from "next/navigation";
import Spinner from "../ui/Spinner";

export default function SummerCollectionFilterByType() {
  const [categorizedProduct, setCategorizedProduct] = useState<Products[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchSummerCollectionDetails();
  }, []);

  const fetchSummerCollectionDetails = async () => {
    const data = await fetch("/api/products");
    if (!data.ok) {
      throw new Error("Network response was not ok");
    }
    const response: Products[] = await data.json();
    setCategorizedProduct(response);
  };

  if (categorizedProduct.length === 0) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const uniqueTypes = Array.from(
    new Set(
      categorizedProduct
        .filter(
          (product) =>
            product.type == "Refrigerator" || product.type == "AirConditioner"
        )
        .map((product) => product.type)
    )
  );

  const filterByType = (type: string) => {
    router.push(`/${type}`);
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center pb-8 pt-8">
      <div className="w-[90%] p-4">
        <h1 className="text-[#0171b6] font-bold text-xl">
          Beat the Heat: Presenting Your Must-Have Summer Essential!
        </h1>
        <hr className="border-[#0171b6] border-[1px] mt-1"></hr>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-6">
          {uniqueTypes.map((type) => (
            <button
              key={type}
              className="w-full bg-white py-3 px-6 rounded-lg text-[#0171b6] text-sm font-semibold hover:shadow-lg"
              onClick={() => filterByType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
