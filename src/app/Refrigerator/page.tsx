'use client'
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Products } from '../components/TvCollection';
import { CatProdDetailCard, DiscountedProductDetailCard } from '../components/CatProdDetailCard';

export default function Refrigerator() {
    const pathname = usePathname();
    const type = pathname.split('/').pop();
    console.log(type)
    console.log(pathname)
    // const type = decodeURIComponent(params.Refrigerator.toString());
    const [productType, setProductType] = useState<Products[]>([]);
  
    const fetchDataByCategory = async () => {
      try {
        const data = await fetch(
          `http://localhost:2000/products?type=${type}`
        );
        if (!data.ok) {
          throw new Error("Failed to fetch products");
        }
        const response = await data.json();
        setProductType(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    useEffect(() => {
      fetchDataByCategory();
    }, [type]);
  
    if (!productType) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="w-full pt-[110px] bg-gray-100 flex justify-center">
        <div className="w-[90%] bg-white">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  ">
            <div className="lg:col-span-1 md:col-span-1">
              <div className="bg-white0 p-4  shadow">
                <p>Filter content goes here...</p>
              </div>
            </div>
            <div className="lg:col-span-3 md:col-span-1">
              <h1 className="text-[#888888] font-semibold text-xl p-4">
                {type}
              </h1>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {productType.map((productDetail) =>
                  productDetail.discount === "0%" ? (
                    <CatProdDetailCard key={productDetail.name} productDetail={productDetail} />
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
  