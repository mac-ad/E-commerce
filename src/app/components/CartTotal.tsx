"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getCurrency } from "../utils/utilityFunctions";

const getNumber = (value:any) => {

  return Number(value.toFixed(2))
}

export default function CartTotal() {
  const cartProducts = useSelector((store: any) => store.cart);
  const router = useRouter();
  if (cartProducts.items.length == 0) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  const totalPrice = cartProducts.items.reduce(
    (acc: number, product: any) => acc + getNumber(product?.productId?.price * product.qty),
    0
  );

  const totalDiscount = cartProducts.items.reduce(
    (acc: number, product: any) => (
      acc + (getNumber((product?.productId?.discount / 100)) * product?.productId?.price) * product.qty
    ),
    0
  );

  const getDiscountedPrice = (price: number, discount: number) => {
    return getNumber(price - (discount / 100) * price);
  }

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  }

  const finalPrice = totalPrice - totalDiscount;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 pt-0">
      <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {cartProducts.items.map((item: any) => (
          <div key={item._id} className="flex items-center justify-between py-2">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{item?.productId?.name}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span>{item.qty} × NPR {getDiscountedPrice(item?.productId?.price, item?.productId?.discount)?.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-800">
              NPR {(getDiscountedPrice(item?.productId?.price, item?.productId?.discount) * item.qty)?.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between py-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">Subtotal ({cartProducts.items.length} items)</p>
          <p className="text-sm font-medium">{getCurrency(Number(totalPrice - totalDiscount))}</p>
        </div>

        {/* <div className="flex justify-between py-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">Discount</p>
          <p className="text-sm font-medium text-green-600">- NPR {totalDiscount?.toLocaleString("en-IN")}</p>
        </div> */}

        <div className="flex justify-between py-3 border-t border-gray-100">
          <p className="text-base font-semibold">Total</p>
          <p className="text-base font-semibold">{getCurrency(Number(finalPrice))}</p>
        </div>
      </div>

      <button 
        onClick={handleProceedToCheckout}
        className="w-full mt-6 bg-[#0171b6] text-white py-3 px-4 rounded-md hover:bg-[#015da1] transition-colors font-medium"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
