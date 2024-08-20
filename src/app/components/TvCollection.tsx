"use client";
import { useEffect, useState } from "react";

type Television = {
  name: string;
  size: string;
  price: string;
  discount: string;
  category: string;
  image: string;
};

export default function TvCollection() {
  const [tvCollectionData, setTvCollectionData] = useState<Television[]>([]);

  useEffect(() => {
    fetchTvCollection();
  }, []);

  const fetchTvCollection = async () => {
    const response = await fetch("http://localhost:2000/Television");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Television[] = await response.json();
    setTvCollectionData(data);
  };

  if (tvCollectionData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full bg-gray-100 flex justify-center">
      <div className="w-[90%] py-4 bg-white">
        <h1 className="text-center text-xs font-light text-gray-600">
          <span className="text-base font-semibold text-[#0171b6]">
            SMART LED TV COLLECTION
          </span>
          IN BEST PRICE - choose your TV's
        </h1>
        <hr className="mt-3 text-gray-400" />
        <div className="grid grid-cols-6 gap-2">
          {tvCollectionData.map((tv) => (
            <div key={tv.name}>
              <img src={tv.image} alt={tv.name} className="w-full h-auto" />
              <h2>{tv.name}</h2>
              <p>{tv.size}</p>
              <p>{tv.price}</p>
              <p>{tv.discount}</p>
              <p>{tv.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
