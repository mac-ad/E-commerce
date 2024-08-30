import { FC } from "react";
import { Products } from "./TvCollection";

export const CatProdDetailCard: FC<{ productDetail: Products }> = ({ productDetail }) => {
  return (
    <div className="border border-gray-100 bg-white px-[7px] shadow-lg flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl relative hover:z-10">
      <img
        src={productDetail.product_image}
        alt={productDetail.name}
        className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
      <div className="flex flex-col justify-between flex-1 pb-3 px-2">
        <h2 className={`text-sm ${productDetail.discount !== 0 ? 'mt-6':"mt-2"} font-light`}>{productDetail.name}</h2>
        <div className="mt-2">
          <p className="font-semibold text-xs flex justify-end">
            NPR {productDetail.price}
          </p>
          <p className="text-xs font-light mt-2">
            EMI: NPR {productDetail.emiprice}
          </p>
        </div>
        <p className="text-sm font-light mt-2">
          <span className="text-green-500">●</span> &nbsp;In stock
        </p>
      </div>
    </div>
  );
};

interface WithDiscountTagProps {
  productDetail: Products;
}

const WithDiscountTag = (Component: FC<WithDiscountTagProps>) => {
  const EnhancedComponent: FC<WithDiscountTagProps> = ({ productDetail }) => {
    return (
      <div className="relative group">
       <div className="absolute top-[200px] z-20 transition-transform duration-300 ease-in-out transform group-hover:scale-110 hover:z-10">
          <span className="inline-block p-2 text-xs text-white bg-[#0171b6] -z-10 rounded-r-lg rounded-t-none ">
            SAVE {productDetail.discount}
          </span>
        </div>
        <Component productDetail={productDetail} />
      </div>
    );
  };

  return EnhancedComponent;
};

export const DiscountedProductDetailCard = WithDiscountTag(CatProdDetailCard);
