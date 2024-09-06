"use client";
import {
  CatProdDetailCard,
  DiscountedProductDetailCard,
} from "@/app/components/CatProdDetailCard";
import { Products } from "@/app/components/TvCollection";
import Spinner from "@/app/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function GetResultBySearch() {
  const params = useParams();
  const [searchedResult, setSearchResult] = useState<Products[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await fetch("/api/products");
      if (!data.ok) {
        throw new Error("Data is not okay");
      }
      const result = await data.json();
      setSearchResult(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const result = searchedResult.map((result: Products) => result);
  const searchedOutput = result.filter((output) =>
    output.name.toLowerCase().includes(params.searchText.toLowerCase())
  );

  if (searchedResult.length === 0) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const filterByBrand = (brand: string) => {
    const filteredBrandData = searchedOutput.filter(
      (product) => product.brand === brand
    );
    setSearchResult(filteredBrandData);
  };

  const filterBySize = (size: number) => {
    const filteredSizeData = searchedOutput.filter(
      (product) => product.size === size
    );
    setSearchResult(filteredSizeData);
  };

  // Extract unique brands and sizes
  const uniqueBrands = Array.from(
    new Set(searchedOutput.map((product) => product.brand))
  );
  const uniqueSizes = Array.from(
    new Set(searchedOutput.map((product) => product.size))
  );

  return (
    <>
      <div className="w-full pt-[130px] bg-gray-100 flex justify-center pb-8">
        <div className="w-[90%] bg-white">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            <div className="lg:col-span-1 md:col-span-1">
              <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
                <h1 className="font-semibold text-sm">Shop By</h1>
                <p>
                  <FaAngleDown />
                </p>
              </div>
              <div className="bg-white border border-gray-200">
                <p className="text-xs py-2 px-6 cursor-pointer hover:bg-gray-200">
                  {params.searchText}
                </p>
              </div>

              <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
                <h1 className="font-semibold text-sm">Brand</h1>
                <p>
                  <FaAngleDown />
                </p>
              </div>
              <div className="bg-white border border-gray-200">
                {uniqueBrands.map((brand) => (
                  <div
                    className="py-2 px-6 flex cursor-pointer hover:bg-gray-200"
                    key={brand}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      onClick={() => filterByBrand(brand)}
                    />
                    <p className="text-xs">{brand.toUpperCase()}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
                <h1 className="font-semibold text-sm">Filter</h1>
                <p>
                  <FaAngleDown />
                </p>
              </div>
              <div className="bg-white border border-gray-200">
                {uniqueSizes.map((size) => (
                  <p
                    className="text-xs py-2 px-6 cursor-pointer hover:bg-gray-200"
                    key={size}
                    onClick={() => filterBySize(size)}
                  >
                    {size}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 md:col-span-1 border border-gray-200">
              <h1 className="text-[#888888] font-semibold text-xl p-4">
                Search Results: "{params.searchText}"
              </h1>
              <div className="flex justify-between">
                <p className="text-[#888888] px-4 pb-4 text-sm">
                  Showing {searchedOutput.length} Results
                </p>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {searchedOutput.map((productDetail) =>
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
    </>
  );
}
