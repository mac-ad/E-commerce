"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CatProdDetailCard,
  DiscountedProductDetailCard,
} from "../components/CatProdDetailCard";
import { Products } from "../components/TvCollection";
import Spinner from "../ui/Spinner";
import { FaAngleDown } from "react-icons/fa";

export default function AirConditioner() {
  const pathname = usePathname();
  const type = pathname.split("/").pop();

  const [productType, setProductType] = useState<Products[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Products[]>([]);

  const fetchDataByCategory = async () => {
    try {
      const data = await fetch(`/api/products/type?type=${type}`);
      if (!data.ok) {
        throw new Error("Failed to fetch products");
      }
      const response = await data.json();
      setProductType(response.products);
      setFilteredProduct(response.products)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchDataByCategory();
  }, [type]);

  if (filteredProduct.length == 0) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const fetchByCategory = (category: string) => {
    const data = productType.filter((product) => product.category == category);
    return setFilteredProduct(data);
  };

  console.log(filteredProduct)

  return (
    <div className="w-full pt-[130px] bg-gray-100 flex justify-center">
      <div className="w-[90%] bg-white">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  ">
          <div className="lg:col-span-1 md:col-span-1">
            <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
              <h1 className="font-semibold text-sm">Shop By</h1>
              <p>
                <FaAngleDown />
              </p>
            </div>
            <div className="bg-white border border-gray-200">
              <p
                className="text-xs py-2 px-6 cursor-pointer hover:bg-gray-200"
                onClick={() => fetchDataByCategory()}
              >
                {type}
              </p>
            </div>
            <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
              <h1 className="font-semibold text-sm">Categories</h1>
              <p>
                <FaAngleDown />
              </p>
            </div>
            <div className="bg-white border border-gray-200">
              {Array.from(
                new Set(productType.map((product) => product.category))
              ).map((category) => (
                <p
                  className="text-xs py-2 px-6 cursor-pointer hover:bg-gray-200"
                  key={category}
                  onClick={() => fetchByCategory(category)}
                >
                  {category}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-1">
            <h1 className="text-[#888888] font-semibold text-xl p-4">{type}</h1>
            <div className="flex justify-between">
              <p className="text-[#888888] px-4 pb-4 text-sm">
                Showing {filteredProduct.length} Results
              </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {filteredProduct.map((productDetail) =>
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
      </div>
    </div>
  );
}
