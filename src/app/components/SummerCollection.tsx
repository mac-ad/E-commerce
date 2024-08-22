"use client";
import { useEffect, useState } from "react";
import {
  DiscountedSummerDetailCard,
  SummerDetailCard,
} from "./SummerDetailCard";

export interface Products {
  name: string;
  size: string;
  price: string;
  emiPrice: string;
  discount: string;
  category: string;
  image: string;
  type: "Television" | "Air Conditioner" | "Refrigerator";
}

export default function SummerCollection() {
  const [summerCollectionData, setSummerCollectionData] = useState<Products[]>(
    []
  );

  useEffect(() => {
    fetchSummerCollection();
  }, []);

  const fetchSummerCollection = async () => {
    const response = await fetch("http://localhost:2000/Products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Products[] = await response.json();
    setSummerCollectionData(data);
  };

  if (summerCollectionData.length === 0) {
    return <p>Loading...</p>;
  }

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
          <div className="grid lg:grid-cols-6 sm:grid-cols-1 md:grid-cols-3 ">
            {summerCollectionData
              .filter(
                (product) =>
                  product.type == "Refrigerator" ||
                  product.type == "Air Conditioner"
              )
              .map((summerDetail) =>
                summerDetail.discount == "0%" ? (
                  <SummerDetailCard
                    key={summerDetail.name}
                    summerDetail={summerDetail}
                  />
                ) : (
                  <DiscountedSummerDetailCard
                    summerDetail={summerDetail}
                    key={summerDetail.name}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
