"use client";

import { useSelector } from "react-redux";
import { Products } from "./TvCollection";

export default function CartTotal() {
  const cartProducts = useSelector((store: any) => store.cart);
  if (cartProducts.items.length == 0) {
    return (
      <p className="text-black p-3">
        will show something here if the cart items are empty
      </p>
    );
  }

  const totalPrice = cartProducts.items.reduce(
    (acc: number, product: Products) => {
      return acc + product.price * product.quantity;
    },
    0
  );

  const totalDiscount = cartProducts.items.reduce(
    (acc: number, product: Products) => {
      return (
        acc +
        Math.round((product.discount / 100) * product.price) * product.quantity
      );
    },
    0
  );
  console.log(totalDiscount);

  const finalPrice = totalPrice - totalDiscount;
  return (
    <div className="px-5 py-3">
      <div className="flex justify-between">
        <p className="text-black text-sm">
          Price ({cartProducts.items.length} item)
        </p>
        <p className="text-black text-sm">NPR {totalPrice}</p>
      </div>
      <div className="flex justify-between py-4">
        <p className="text-black text-sm">Discount</p>
        <p className="text-black text-sm">NPR {totalDiscount}</p>
      </div>
      <hr className="border border-[0.1px] border-gray-200 mb-3" />
      <div className="flex justify-between">
        <h1 className="text-lg font-medium text-black">Total Price</h1>
        <p className="text-black">NPR {finalPrice}</p>
      </div>
    </div>
  );
}
