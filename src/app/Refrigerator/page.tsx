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
  const [productType, setProductType] = useState<Products[]>([]);
  const [productFilter, setProductFilter] = useState<Products[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [uniquesize, setUniqueSize] = useState<number[]>([]);
  const [uniqueCategory, setUniqueCategory] = useState<string[]>([]);

  const fetchDataByCategory = async () => {
    try {
      const data = await fetch(`/api/products/type?type=${type}`);
      if (!data.ok) {
        throw new Error("Failed to fetch products");
      }
      const response = await data.json();
      setProductType(response.products);
      setProductFilter(response.products);

      const prices = response.products.map(
        (product: Products) => product.price
      );
      const sizes = Array.from(
        new Set(response.products.map((product: Products) => product.size))
      );
      const categories = Array.from(
        new Set(response.products.map((product: Products) => product.category))
      );

      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
      setUniqueSize(sizes);
      setUniqueCategory(categories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchDataByCategory();
  }, [type]);

  if (productType.length === 0) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const filterByCategory = (category: string) => {
    const filteredCategoryData = productType.filter(
      (product) => product.category === category
    );
    setProductFilter(filteredCategoryData);

    const prices = filteredCategoryData.map((product) => product.price);
    const sizes = Array.from(
      new Set(filteredCategoryData.map((product) => product.size))
    );

    setMinPrice(Math.min(...prices));
    setMaxPrice(Math.max(...prices));
    setPriceRange([Math.min(...prices), Math.max(...prices)]);
    setUniqueSize(sizes);
  };

  const filterByPrice = (minPrice: number, maxPrice: number) => {
    const filteredPriceData = productType.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setProductFilter(filteredPriceData);
  };

  return (
    <div className="w-full pt-[130px] bg-gray-100 flex justify-center">
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
              <p
                className="text-xs py-2 px-6 cursor-pointer hover:bg-gray-200"
                onClick={() => fetchDataByCategory()}
              >
                {type}
              </p>
            </div>

            <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
              <h1 className="font-semibold text-sm">Category</h1>
              <p>
                <FaAngleDown />
              </p>
            </div>
            <div className="bg-white border border-gray-200">
              {uniqueCategory.map((category) => (
                <div
                  className="py-2 px-6 flex cursor-pointer hover:bg-gray-200"
                  key={category}
                >
                  <input type="checkbox" className="mr-2" />
                  <p
                    className="text-xs"
                    onClick={() => filterByCategory(category)}
                  >
                    {category.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white py-2 px-3 border border-gray-200 flex justify-between">
              <h1 className="font-semibold text-sm">Size</h1>
              <p>
                <FaAngleDown />
              </p>
            </div>
            <div className="bg-white border border-gray-200">
              {uniquesize.map((size) => (
                <p
                  className="text-xs py-2 px-6 cursor-pointer hover:bg-gray-200"
                  key={size}
                  onClick={() =>
                    setProductFilter(
                      productType.filter((product) => product.size === size)
                    )
                  }
                >
                  {size}
                </p>
              ))}
            </div>

            <div className="py-2 px-6 border border-gray-200">
              <label
                htmlFor="price-range"
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                NPR {priceRange[0]} - NPR {priceRange[1]}
              </label>
              <input
                id="price-range"
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => {
                  const newMaxPrice = parseInt(e.target.value, 10);
                  setPriceRange([priceRange[0], newMaxPrice]);
                  filterByPrice(priceRange[0], newMaxPrice);
                }}
                className="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
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
