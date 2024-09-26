"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CatProdDetailCard,
  DiscountedProductDetailCard,
} from "../components/CatProdDetailCard";
import { Products } from "../components/TvCollection";
import Spinner from "../ui/Spinner";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function AirConditioner() {
  const pathname = usePathname();
  const type = pathname.split("/").pop();

  const [productType, setProductType] = useState<Products[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Products[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [visibility, setVisibility] = useState({
    shopBy: false,
    categories: false,
    sizes: false,
  });

  const fetchDataByCategory = async () => {
    try {
      const data = await fetch(`/api/products/type?type=${type}`);
      if (!data.ok) {
        throw new Error("Failed to fetch products");
      }
      const response = await data.json();
      setProductType(response.products);
      setFilteredProduct(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchDataByCategory();
  }, [type]);

  if (filteredProduct.length === 0) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const fetchByCategory = (category: string) => {
    const data = productType.filter((product) => product.category === category);
    setFilteredProduct(data);
  };

  const fetchBySize = (size: number) => {
    const data = productType.filter((product) => product.size === size);
    setFilteredProduct(data);
  };

  const toggleVisibility = (section: keyof typeof visibility) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [section]: !prevVisibility[section],
    }));
  };

  return (
    <div className="w-full pt-[130px] bg-gray-100 flex justify-center">
      <div className="w-[90%] bg-white">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  ">
          <div className="lg:col-span-1 md:col-span-1">
            <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
              <h1 className="font-semibold text-sm">Shop By</h1>
              <p onClick={() => toggleVisibility("shopBy")}>
                {visibility.shopBy ? <FaAngleUp /> : <FaAngleDown />}
              </p>
            </div>
            {!visibility.shopBy && (
              <div className="bg-white border border-gray-200">
                <p
                  className="text-xs py-2 px-6 cursor-pointer hover:bg-gray-200"
                  onClick={() => fetchDataByCategory()}
                >
                  {type}
                </p>
              </div>
            )}

            <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
              <h1 className="font-semibold text-sm">Categories</h1>
              <p onClick={() => toggleVisibility("categories")}>
                {visibility.categories ? <FaAngleUp /> : <FaAngleDown />}
              </p>
            </div>
            {!visibility.categories && (
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
            )}

            <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
              <h1 className="font-semibold text-sm">Sizes</h1>
              <p onClick={() => toggleVisibility("sizes")}>
                {visibility.sizes ? <FaAngleUp /> : <FaAngleDown />}
              </p>
            </div>
            {!visibility.sizes && (
              <div className="bg-white border border-gray-200">
                {Array.from(
                  new Set(productType.map((product) => product.size))
                ).map((size) => (
                  <p
                    className="text-xs py-2 px-6 cursor-pointer hover:bg-gray-200"
                    key={size}
                    onClick={() => fetchBySize(size)}
                  >
                    {size} Ton
                  </p>
                ))}
              </div>
            )}
            <div className="bg-white py-2 px-3 border border-gray-200  justify-between">
                <p className="">
                  NPR {priceRange[0]} - NPR {priceRange[1]}
                </p>
              <input type="range" className="w-full" />
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
                    key={productDetail.$id}
                    productDetail={productDetail}
                  />
                ) : (
                  <DiscountedProductDetailCard
                    productDetail={productDetail}
                    key={productDetail.$id}
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
