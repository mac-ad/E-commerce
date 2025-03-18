"use client";

import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "../../components/CartItemCard";
import CartTotal from "../../components/CartTotal";
import Image from "next/image";
import { AppDispatch } from "@/store/store";
import { useClearCartMutation } from "@/features/api/cartApiSlice";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Cart() {

  const dispatch = useDispatch<AppDispatch>();

  const [clearCart, {isLoading:isClearCartLoading}] = useClearCartMutation();


  const clearCarthandler = async () => {
    try{
      const res = await clearCart().unwrap();
      toast.success("Cart cleared successfully");
    }catch(error){
      toast.error("Failed to clear cart");
    }
  }

  const products = useSelector((store: any) => store.cart.items);
  const isCartLoading = useSelector((store: any) => store.cart.isLoading);

  // console.log(products);

  if(isCartLoading){
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4 bg-white p-4 rounded-lg">
                    <Skeleton className="w-24 h-24 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="w-3/4 h-4" />
                      <Skeleton className="w-1/4 h-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="w-20 h-6" />
                        <Skeleton className="w-24 h-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-6">
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (products.length == 0) {
    return (
      <div className="w-full  bg-white border px-4 py-20 ">
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
  return (
    <div className = "pt-10 pb-20 bg-gray-100">
      <div className="w-[90%] max-w-[1200px] mx-auto  p-4 h-full  flex flex-col md:flex-row justify-center space-x-2 px-4 pb-3">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[2fr_1.4fr] gap-4 text-[#0171b6]">
        <div className = "mb-2 md:col-span-2 flex justify-between items-center">
          <div className = "flex flex-col gap-1">
            <h1 className="text-2xl font-light">Shopping Cart</h1>
            <p className="text-sm font-light">
              {products.length} items in your cart
            </p>
          </div>
          <div className="flex justify-end">
            <button 
              className="text-red-500 hover:text-red-700 flex items-center gap-2 text-sm"
              onClick={clearCarthandler}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Clear Cart
            </button>
          </div>
        </div>
        <div className = "flex flex-col  gap-2">
          {products.map((item: any) => (
            <CartItemCard 
              key={item._id} 
              item={item} 
              className={`${products.indexOf(item) !== products.length - 1  ? 'border-b' : ''} bg-white`}
            />
          ))}
        </div>
        <div className="w-full py-4 bg-white self-start">
            <CartTotal />
        </div>
      </div>

      
     
    </div>
    </div>
  );
}
