"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import NotFound from "../../../components/not-found";
import { useGetProductQuery } from "@/features/api/productApiSlice";
import ProductCarousel from "@/app/components/ProductCarousel";
import { Button } from "@/components/ui/button";
import ProductDetailSkeleton from "@/app/components/skeleton/ProductDetailSkeleton";
import ProductDescription from "./ProductDescription";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useAddToCartMutation } from "@/features/api/cartApiSlice";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getCurrency, getDiscountAmount, getDiscountedPrice } from "@/app/utils/utilityFunctions";

export default function ProductById() {
  const params = useParams();

  const { data: product, isLoading, isError,error:errorData } = useGetProductQuery(params.id as string);

  const [addToCart, {isLoading:isAddingToCart}] = useAddToCartMutation();

  const router = useRouter();
  const loggedIn = useSelector((state:RootState) => state.auth.loggedIn);

  const productData = product?.data;

  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = async () => {
    try{
      if(!loggedIn){
        toast.error("Please login to add to cart");
        router.push("/login");
        return;
      }
      const response = await addToCart({
        data:{
          productId:productData?._id as string, 
          qty:1
        }
      }).unwrap();
      toast.success(response?.message);
    }catch(error:any){
      console.log({error});
      toast.error(error?.data?.message);
    }
  }

  if(isLoading){
    return (
      <ProductDetailSkeleton />
    )
  }

  if(isError && 'status' in errorData && errorData.status === 404){
    return <NotFound />
  }

  return (
    <div className="w-[90%] mx-auto  max-w-[1700px] bg-gray-100  flex justify-center">
      <div className="w-full bg-white p-4 py-10 flex flex-col gap-4 lg:flex-row ">
          <React.Fragment key={productData?._id}>
            <div className = "flex flex-col gap-4 md:min-w-[450px]  flex-1 max-w-[500px] mx-auto lg:ml-auto lg:order-2 self-start">
             <div className = "w-full h-[500px] ">
                <ProductCarousel images={productData?.images || []} />
             </div>
              <Button
                className = "rounded-none w-full max-w-[150px]  mx-auto md:hidden"
              >
                <FaShoppingCart size={18} className="text-white " />
                <p className=" text-white text-sm" onClick={handleAddToCart}>
                  Add To Cart
                </p>
              </Button>
            </div>

            <div className="lg:col-span-2 flex flex-col">
                <div className = " flex flex-col xl:flex-row gap-4 xl:justify-between " >
                    <h1 className="mt-2 text-3xl font-bold max-w-[20ch] "> {productData?.name} </h1>
                    <div className = "flex flex-col">

                        {productData?.discount ? (
                          <p className="text-sm font-semibold text-blue-400 mt-4 whitespace-nowrap">
                            
                            {`Save Extra ${getCurrency(getDiscountAmount({
                              originalPrice : productData?.price,
                              discount : productData?.discount
                            }))}`}
                          </p>
                        ) : null}

                      <div className="flex flex-col">
                        <p className="mt-1 font-semibold text-2xl">
                          {`${getCurrency(
                            getDiscountedPrice({
                              originalPrice : productData?.price ?? 0,
                              discount : productData?.discount ?? 0
                            })
                          )}`}
                        </p>
                        {productData?.discount ? (
                          <>
                            <p className="mt-1  font-light text-base text-gray-400 line-through">
                              {`${getCurrency(productData?.price)}`}
                            </p>
                            <p className="mt-1 bg-primary/80 text-white px-4 py-1 rounded-sm w-fit">
                              {productData?.discount}% off
                            </p>
                          </>
                        ) : null}
                        <>
                          <Button
                              className = {cn("rounded-none w-full max-w-[150px] mt-4 hidden md:flex",productData?.quantity === 0 && "bg-gray-400 cursor-not-allowed")}
                              onClick={handleAddToCart}
                              disabled  = {productData?.quantity === 0}
                          >
                              <FaShoppingCart size={18} className="text-white " />
                              <p className=" text-white text-sm" >
                                Add To Cart
                              </p>
                          </Button>
                          {productData?.quantity === 0 && (
                            <p className="text-sm text-red-500 mt-2">
                              (Out of Stock)
                            </p>
                          )}
                        </>
                      </div>
                    </div>
                </div>
              <p className = "  flex flex-col gap-4 mt-4 text-gray-600 font-normal max-w-[70ch] line-height-[1.4] xl:mt-10">
              {productData?.description && (
                <ProductDescription description={productData?.description} />
              )}
              </p>
            </div>
          </React.Fragment>
      </div>
    </div>
  );
}
