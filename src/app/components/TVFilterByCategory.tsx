"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Products } from "./TvCollection";

export default function TVFilterByCategory() {
  const [products, setProducts] = useState<Products[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchTelevisionDetails();
  }, []);

  const fetchTelevisionDetails = async () => {
    const data = await fetch("http://localhost:2000/products");
    if (!data.ok) {
      throw new Error("Network response was not ok");
    }
    const response: Products[] = await data.json();
    setProducts(response);
  };

  if (products.length == 0) {
    return <p>Loading...</p>;
  }

  const filterByCategory = (category: string) => {
    router.push(`/categories/${category}`);
  };

  const uniqueCategories = Array.from(
    new Set(
      products
        .filter((product) => product.type === "Television")
        .map((product) => product.category)
    )
  );

  return (
    <div className="w-full bg-gray-100 flex justify-center pb-8">
      <div className="w-[90%] p-4 ">
        <h1 className="text-[#0171b6] font-bold text-xl">
          Easily browse through categories: Discover TVs ranging from 24" to 98"
          to find your ideal viewing experience.
        </h1>
        <hr className="border-[#0171b6] border-[1px] mt-1"></hr>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-6">
          {uniqueCategories.map((category) => (
            <button
              className="w-full bg-white py-3 px-6 rounded-lg text-[#0171b6] text-sm font-semibold hover:shadow-lg"
              key={category}
              onClick={() => filterByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
