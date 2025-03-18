import { useUpdateCartMutation } from "@/features/api/cartApiSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function CartItemCard({ item, className }: { item: any, className: string }) {
  const dispatch = useDispatch();
  const totalDiscount = Math.round((item.productId.discount / 100) * item.productId.price);
  const priceAfterDiscount = item.productId.price - totalDiscount;

  const [updateCart, {isLoading}] = useUpdateCartMutation();

  const router = useRouter();

  const incrementHandler = async () => {
    try{
      await updateCart({productId: item.productId._id, qty: 1}).unwrap();
      toast.success("Product incremented successfully");
    }catch(error){
      toast.error("Failed to increment product");
    }
  }

  const decrementHandler = async () => {
    try{
      await updateCart({productId: item.productId._id, qty: -1}).unwrap();
      toast.success("Product decremented successfully");
    }catch(error){
      toast.error("Failed to decrement product");
    }
  }

  return (
    <div className={`w-full rounded-lg bg-white shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row p-4 gap-4">
        <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px] flex-shrink-0 cursor-pointer" onClick={() => router.push(`/product/${item?.productId?._id}`)}>
          <Image
            src={item?.productId?.images[0]}
            fill
            style={{objectFit: 'contain'}}
            alt={item?.productId?.name}
            className="rounded-md"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-gray-900 text-lg">{item?.productId?.name}</h3>
            
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-gray-500">Sold by</span>
              <span className="text-sm font-medium text-[#0171b6]">{item?.productId?.brand?.name}</span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-semibold text-[#0171b6]">
                NPR {priceAfterDiscount?.toLocaleString("en-IN")}
              </span>
              {item?.productId?.discount > 0 && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    NPR {item?.productId?.price?.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {item?.productId?.discount}% Off
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={decrementHandler}
            >
              <span className="text-gray-600 text-lg">−</span>
            </button>

            <span className="w-12 text-center font-medium text-gray-900">
              {item?.qty}
            </span>

            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={incrementHandler}
            >
              <span className="text-gray-600 text-lg">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
