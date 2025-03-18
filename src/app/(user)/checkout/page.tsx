"use client";

import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { useGetProfileQuery } from "@/features/api/userApiSlice";
import { useEffect, useState } from "react";
import CheckoutPageSkeleton from "@/app/components/skeleton/CheckoutPageSkeleton";
import CheckoutForm from "./CheckoutForm";
import { OrderConfirmed } from "./OrderConfirm";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useClearCartMutation } from "@/features/api/cartApiSlice";
import { toast } from "sonner";

export default function CheckoutPage() {
  const cartProducts = useSelector((store: any) => store.cart);
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const getDiscountedPrice = (price: number, discount: number) => {
    return Math.round(price - (discount / 100) * price);
  }

  const totalPrice = cartProducts.items.reduce(
    (acc: number, product: any) => acc + product?.productId?.price * product.qty,
    0
  );

  const totalDiscount = cartProducts.items.reduce(
    (acc: number, product: any) => (
      acc + Math.round((product?.productId?.discount / 100) * product?.productId?.price) * product.qty
    ),
    0
  );

  const finalPrice = totalPrice - totalDiscount;

  useEffect(() => {
    if(orderConfirmed){
      window.scrollTo(0, 0);
    }
  }, [orderConfirmed])

  const [clearCart, {isLoading: isClearCartLoading}] = useClearCartMutation();

  const afterOrderCreationHandler = async () => {
    try{
      setOrderConfirmed(true);
      await clearCart().unwrap();
      toast.success("Order placed successfully");
    }catch(error){
      toast.error("Failed to place order");
    }
  }

  if (!orderConfirmed && cartProducts.items.length === 0) {
   router.push("/");
  }

  if (isProfileLoading) {
    return (
        <CheckoutPageSkeleton />
    )
  }

  if(orderConfirmed){
    return (
      <OrderConfirmed />
    )
  }

  return (
    <div className="w-[90%] max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <CheckoutForm profile={profile} afterOrderCreated={afterOrderCreationHandler} isLoading={isClearCartLoading} />
        </div>

        <div className="order-1 md:order-2 bg-gray-100 p-6 rounded-lg self-start">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            {cartProducts.items.map((item: any) => (
              <div key={item._id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item?.productId?.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                </div>
                <p>NPR {(getDiscountedPrice(item?.productId?.price, item?.productId?.discount) * item.qty).toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>

          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>NPR {totalPrice.toLocaleString("en-IN")}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p>NPR {totalDiscount.toLocaleString("en-IN")}</p>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>NPR {finalPrice.toLocaleString("en-IN")}</p>
            </div>
            
          </div>
          <div className="mt-10 p-3 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Payment Method:</span> Cash on Delivery (COD)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Pay with cash upon delivery of your order
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}