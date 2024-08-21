import { FC } from "react";
import { Products } from "./TvCollection";

export const SummerDetailCard: FC<{ summerDetail: Products }> = ({ summerDetail }) => {
  return (
    <div className="border border-gray-100 bg-white px-[7px] shadow-lg flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl relative hover:z-10">
      <img
        src={summerDetail.image}
        alt={summerDetail.name}
        className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-110 pb-4"
      />
      <div className="flex flex-col justify-between flex-1 pb-3 px-2">
        <h2 className={`text-sm ${summerDetail.discount !== "0%" ? 'mt-6':"mt-2"} font-light`}>{summerDetail.name}</h2>
        <div className="mt-2">
          <p className="font-semibold text-xs flex justify-end">
            NPR {summerDetail.price}
          </p>
          <p className="text-xs font-light mt-2">
            EMI: NPR {summerDetail.emiPrice}
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
  summerDetail: Products;
}

const WithDiscountTag = (Component: FC<WithDiscountTagProps>) => {
  const EnhancedComponent: FC<WithDiscountTagProps> = ({ summerDetail }) => {
    return (
      <div className="relative group">
       <div className="absolute top-[175px] z-20 transition-transform duration-300 ease-in-out transform group-hover:scale-110 hover:z-10">
          <span className="inline-block p-2 text-xs text-white bg-[#0171b6] -z-10 rounded-r-lg rounded-t-none ">
            SAVE {summerDetail.discount}
          </span>
        </div>
        <Component summerDetail={summerDetail} />
      </div>
    );
  };

  return EnhancedComponent;
};

export const DiscountedSummerDetailCard = WithDiscountTag(SummerDetailCard);
