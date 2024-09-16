"use client";

import { useSelector } from "react-redux";
import { Products } from "../components/TvCollection";
import CartItemCard from "../components/CartItemCard";
import CartTotal from "../components/CartTotal";
import Image from "next/image";

export default function Cart() {
  const products = useSelector((store: any) => store.cart.items);
  if (products.length == 0) {
    return (
      <div className=" p-5 w-full pt-[180px] bg-white ">
        <div className="flex justify-center">
          <Image
            className="flex justify-center"
            src="/images/empty_cart.png"
            width={150}
            height={150}
            alt="empty_cart"
          />
        </div>

        <h1 className="mt-3 font-semibold text-center">Your Cart is Empty</h1>
        <p className="text-center text-sm mt-3 font-light">Add something to make me happy :)</p>
      </div>
    );
  }
  console.log(products);
  return (
    <div className="pt-[150px] bg-gray-100 w-full flex justify-center space-x-2 px-4 pb-3">
      <div className="w-[70%] bg-white space-x-2  p-3 text-[#0171b6] shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-2xl font-light">Shopping Cart</h1>
          <h1 className=" text-sm font-medium mt-2 text-black">Price</h1>
        </div>

        <hr className="border border-[0.1px] border-gray-200 mt-3" />
        {products.map((item: Products) => (
          <CartItemCard key={item.$id} item={item} />
        ))}
      </div>
      <div className="w-[30%] ">
        <div className="w-full bg-white  py-3 text-white shadow-lg">
          <h1 className="text-lg font-medium text-gray-400 px-5">
            Price Details
          </h1>
          <hr className="border border-[0.1px] border-gray-200 mt-3" />
          <CartTotal />
        </div>
      </div>
    </div>
  );
}
