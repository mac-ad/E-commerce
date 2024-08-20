"use client";
import { useEffect, useState } from "react";
import { DiscountedTvDetailCard, TVDetailCard } from "./TVDetailCard";

export interface Products {
  name: string;
  size: string;
  price: string;
  emiPrice: string;
  discount: string;
  category: string;
  image: string;
  type: 'Television' | 'AC' | 'Refrigerator';
}

export default function TvCollection() {
  const [tvCollectionData, setTvCollectionData] = useState<Products[]>([]);

  useEffect(() => {
    fetchTvCollection();
  }, []);

  const fetchTvCollection = async () => {
    const response = await fetch("http://localhost:2000/Products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Products[] = await response.json();
    setTvCollectionData(data);
  };

  if (tvCollectionData.length === 0) {
    return <p>Loading...</p>;
  }

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
        <div className="grid lg:grid-cols-6 sm:grid-cols-1 md:grid-cols-3 ">
          {tvCollectionData.filter((product)=>product.type =="Television").map((tvDetail) =>
            tvDetail.discount == "0%"? (
              <TVDetailCard key={tvDetail.name} tvDetail={tvDetail} />
            ) : (
              <DiscountedTvDetailCard tvDetail={tvDetail} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
