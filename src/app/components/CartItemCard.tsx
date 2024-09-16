import Image from "next/image";
import { Products } from "./TvCollection";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseItem, increaseItem } from "../utils/cartSlice";
import { toast } from "sonner";
export default function CartItemCard({ item }: { item: Products }) {
  // const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newQuantity = parseInt(e.target.value, 10);
  //   if (!isNaN(newQuantity)) {
  //     setQuantity(newQuantity);
  //   }
  // };

  const adjustCartItem = (item: Products, actionType: any) => {
    if (actionType === "increase") {
      if (item.quantity < item.stock) {
        dispatch(increaseItem(item));
      } else {
        toast.error("Cannot add more, stock limit reached!");
      }
    } else if (actionType === "decrease") {
      if (item.quantity <= 1) {
        toast.error("Cannot reduce more");
      } else {
        dispatch(decreaseItem(item));
      }
    }
  };

  const totalDiscount = Math.round(item.discount / 100 * item.price);
  const priceAfterDiscount = item.price - totalDiscount

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
          <p className="text-xs text-[#0171b6] mt-1">
            <span className="text-black font-light">Sold By </span>
            {item.brand}
          </p>
          {item.discount !== 0 && (
            <p className="text-xs text-[#0171b6] mt-1">
              <span className="text-black font-light line-through">
                NPR {item.price}&nbsp;
              </span>
              &nbsp;{item.discount}% Off
            </p>
          )}

          <div className="flex mt-2">
            <button
              className="w-5 px-1 py-[0.5px] rounded-lg text-white bg-[#0171b6] 
            "
              onClick={() => {
                adjustCartItem(item, "increase");
              }}
            >
              +
            </button>
            <input
              className="text-xs mt-1 w-10 text-center"
              value={item.quantity}
              // onChange={handleQuantityChange}
            />
            <button
              className={`w-5 px-1 py-[0.5px] rounded-lg text-white bg-[#0171b6] ${
                item.quantity < 0
                  ? "disabled:cursor-not-allowed disabled:opacity-50"
                  : ""
              }`}
              onClick={() => {
                adjustCartItem(item, "decrease");
              }}
            >
              -
            </button>
          </div>
        </div>
        <p className="w-[30%] flex justify-end text-sm mt-6 font-semibold ">
          Rs {priceAfterDiscount}
        </p>
      </div>
      <hr className="border border-[0.1px] border-gray-200 mt-2" />
    </>
  );
}
