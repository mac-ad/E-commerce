
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { CategoryItem } from "@/features/states/CategorySlice";
import NavSkeleton from "./skeleton/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBrandsQuery } from "@/features/api/brandApiSlice";
import { Brand } from "@/features/api/brandSlice";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const CategoriesNav = ({categories, isLoading}: {categories: CategoryItem[], isLoading: boolean}) => {

  // const brands = useSelector((state:RootState) => state.brand.data);
  const { data: brands, isLoading: isBrandLoading } = useGetBrandsQuery();

  const [showBrand, setShowBrand] = useState(true);
  const [showBrandInMobile, setShowBrandInMobile] = useState(false);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const navData = [
    ...categories,
    // {
    //   _id : "brand",
    //   type : "brand",
    //   name: "Brands",
    //   items : brands?.data?.map((brand:Brand) => ({
    //     _id : brand._id,
    //     name : brand.name,
    //     logo : brand.logo
    //   }))
    // }
  ]

  return (
      <div className="bg-primary relative">
            {
              isLoading ? (
                <div className = "hidden md:block">
                  <NavSkeleton  />
                  </div>
              ) : (
                <div className = "w-[90%] mx-auto flex flex-wrap items-center justify-start ">
                  {
                    navData?.map((item: any) => (
                      <Link 
                        key={item?._id} 
                        href={item?.type === "brand" ? `#` : `/categories/${item?._id}`} 
                        className="w-fits lg:w-auto" 
                        onMouseOver={() => {
                          if(item?.type === "brand") setShowBrand(true)
                        }} 
                        onMouseLeave={() => {
                          if(item?.type === "brand") setShowBrand(false)
                        }}
                        onClick={() => {
                          if(item?.type === "brand" && windowWidth < 768){
                            setShowBrandInMobile(prev => !prev);
                          }
                        }}
                      >
                        <p className="text-white group text-[12px] py-3 px-4 hover:bg-white hover:text-gray-500 text-center lg:text-left transition-all relative">
                          {item?.name}
                          {
                          item?.type === "brand" && (
                                <>
                                  <div className="fixed bg-white w-[90vw] border left-[50%] h-[80vh] translate-x-[-50%] mt-2 z-10 hidden md:group-hover:flex flex-wrap gap-4 p-4">
                                    {
                                      item?.items?.map((brand:Brand) => (
                                        <div key={brand._id} className = "aspect-square flex w-[170px] items-center justify-center h-fit hover:shadow-lg transition-all duration-300 p-4">
                                          <Image src={brand.logo} alt={brand.name} width={120} height={120} />
                                        </div>
                                      ))
                                    }
                                  </div>
                                </>
                          )
                        }
                        </p>
                       
                      </Link>
                  ))
                  }
                </div>
            )
            }
            {
              showBrandInMobile && windowWidth < 768 && (
                <Sheet
                      open = {showBrandInMobile}
                      onOpenChange = {setShowBrandInMobile}
                >
                      <SheetContent
                          side = "bottom"
                          className="md:hidden rounded-t-xl h-[90vh]"
                      >
                        <div className="flex flex-wrap bg-white gap-4">
                          {
                            brands?.data?.map((brand:Brand) => (
                              <div key={brand._id} className = "aspect-square flex items-center justify-center">
                                <Image src={brand.logo} alt={brand.name} width={100} height={100} />
                              </div>
                            ))
                          }
                        </div>
                          </SheetContent>
                    </Sheet>
                  )
                }
          </div>
  )
}

export default CategoriesNav
