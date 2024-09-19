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

export default function Refrigerator() {
  const pathname = usePathname();
  const type = pathname.split("/").pop();
  console.log(type);
  console.log(pathname);
  // const type = decodeURIComponent(params.Refrigerator.toString());
  const [productType, setProductType] = useState<Products[]>([]);
  const [productFilter, setProductFilter] = useState<Products[]>([]);

  const fetchDataByCategory = async () => {
    try {
      const data = await fetch(`/api/products/type?type=${type}`);
      if (!data.ok) {
        throw new Error("Failed to fetch products");
      }
      const response = await data.json();
      setProductType(response.products);
      setProductFilter(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchDataByCategory();
  }, [type]);

  if (productType.length == 0) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  console.log(productType);

  const filterBySize = (size:number) =>{
    const filteredBrandData = productType.filter(
      (product) => product.size == size
    );
    return setProductFilter(filteredBrandData);
  }

  const uniquesize = Array.from(
    new Set(productType.map((product) => product.size))
  );
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
              <h1 className="font-semibold text-sm">Brand</h1>
              <p>
                <FaAngleDown />
              </p>
            </div>
            <div className="bg-white  border border-gray-200 ">
              {/* {uniqueBrand.map((brand) => (
                <div
                  className="py-2 px-6 flex  cursor-pointer hover:bg-gray-200"
                  key={brand}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    // onClick={() => filterByBrand(brand)}
                  />
                  <p className="text-xs ">{brand.toUpperCase()}</p>
                </div>
              ))} */}
            </div>
            <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
              <h1 className="font-semibold text-sm">Filter</h1>
              <p>
                <FaAngleDown />
              </p>
            </div>
            <div className="bg-white  border border-gray-200">
              {uniquesize.map((size) => (
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

          <div className="lg:col-span-3 md:col-span-1">
            <h1 className="text-[#888888] font-semibold text-xl p-4">{type}</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {productFilter.map((productDetail) =>
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
