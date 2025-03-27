import { FC } from "react";
import Link from "next/link";
import { Product } from "@/features/api/productApiSlice";
import { getCurrency, getDiscountedPrice } from "@/utils/utilityFunctions";

export const CatProdDetailCard: FC<{ data: Product }> = ({ data }) => {
  return (
      <Link href={`/product/${data._id}`} className = "min-h-[380px]">
        <div className="border border-gray-100 bg-white px-[7px] shadow-lg flex flex-col h-full ease-in-out transform md:hover:shadow-xl md:hover:z-10 md:hover:scale-[1.01] transition-all duration-100 relative ">
          <div
            className = "relative py-4"
          >
            <img
              src={data.images[0]}
              alt={data.name}
              className="w-[80%] mx-auto h-auto transition-transform duration-300 ease-in-out transform"
            />
            {
              data?.discount !== 0 && (
                <div className="absolute bottom-[0%] z-20 transition-transform duration-300 ease-in-out transform">
                  <span className="inline-block p-2 text-xs text-white flex gap-2 bg-[#0171b6] -z-10 rounded-sm rounded-l-none ">
                    SAVE
                    {data.discount}
                    %
                  </span>
                </div>
            )}
          </div>
          <div className="flex flex-col justify-between flex-1 p-4">
            <h2 className={`text-sm font-light`}>{data.name}</h2>
            <div className="mt-2">
              <div className="flex flex-col items-end">
                {data.discount ? (
                  <p className="text-xs text-gray-400 line-through">
                   {getCurrency(data?.price)}
                  </p>
                ) : null}
                <p className="font-semibold text-xs">
                  {
                      getCurrency(
                        getDiscountedPrice({
                        originalPrice:data?.price,
                        discount : data?.discount
                      })
                    )
                  }
                </p>
                
              </div>
            </div>
            <p className="text-sm font-light mt-2">
              {
                data.quantity > 0 ? (
                  <>
                    <span className="text-green-500">●</span> &nbsp;In stock
                  </> 
                ) : (
                  <>
                    <span className="text-red-500">●</span> &nbsp;Out of stock
                  </>
                )
              }
            </p>
          </div>
        </div>
      </Link>
  );
};

// interface WithDiscountTagProps {
//   productDetail: Product;
// }

// const WithDiscountTag = (Component: FC<WithDiscountTagProps>) => {
//   const EnhancedComponent: FC<WithDiscountTagProps> = ({ productDetail }) => {
//     return (
//       <div className="relative group">
//        <div className="absolute top-[200px] z-20 transition-transform duration-300 ease-in-out transform group-hover:scale-110 hover:z-10">
//           <span className="inline-block p-2 text-xs text-white bg-[#0171b6] -z-10 rounded-r-lg rounded-t-none ">
//             SAVE
//              {/* {productDetail.discount} */}
//           </span>
//         </div>
//         <Component productDetail={productDetail} />
//       </div>
//     );
//   };

//   return EnhancedComponent;
// };

// export const DiscountedProductDetailCard = WithDiscountTag(CatProdDetailCard);
