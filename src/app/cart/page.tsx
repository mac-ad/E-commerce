"use client";

import { useSelector } from "react-redux";
import { Products } from "../components/TvCollection";
import CartItemCard from "../components/CartItemCard";

export default function Cart() {
  const products = useSelector((store:any)=> store.cart.items)
  console.log(products)
  return (
    <div className="pt-[150px] bg-gray-100 w-full flex justify-center space-x-2 px-4 pb-3">
      <div className="w-[70%] bg-white space-x-2  p-3 text-[#0171b6] shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-2xl font-light">Shopping Cart</h1>
          <h1 className=" text-sm font-medium mt-2 text-black">Price</h1>
        </div>

        <hr className="border border-[0.1px] border-gray-200 mt-3" />
        {products.map((item:Products)=> (
          <CartItemCard key={item.$id} item={item}/>
        ))}
      </div>
      <div className="w-[30%] bg-white space-x-3 p-3 text-white shadow-lg">
        This is the cart page
      </div>
    </div>
  );
}
