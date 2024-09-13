import Image from "next/image";
import { Products } from "./TvCollection";

export default function CartItemCard({ item }: { item: Products }) {
  return (
    <>
    <div className="w-full flex p-3">
      <Image
        src={item?.product_image}
        height={140}
        width={140}
        alt="product_image"
      />
      <div className="ml-3 mt-6 w-[100%]">
        <p className="font-medium text-[#0171b6]">{item.name}</p>
        <p className="text-xs text-[#0171b6] mt-1"><span className="text-black font-light">Sold By </span>{item.brand}</p>
        <p className="text-xs">{item.quantity}</p>

      </div>
      <p className="w-[30%] flex justify-end text-sm mt-6 font-semibold ">Rs {item.price}</p>
    </div>
    <hr className="border border-[0.1px] border-gray-200 mt-2" />

    </>
  );
}
