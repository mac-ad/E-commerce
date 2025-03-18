"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { HiMenu } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "@/features/states/authSlice";
import { useGetCategoriesQuery } from "@/features/api/categoryApiSlice";
import { setCategories } from "@/features/states/CategorySlice";
import CategoriesNav from "./CategoriesNav";
import { useLogoutMutation } from "@/features/api/apiSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLazyGetProfileQuery, userApi } from "@/features/api/userApiSlice";
import { cartApi } from "@/features/api/cartApiSlice";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)
  const isAdmin = useSelector((state: RootState) => state.auth.user?.role) === "admin";

  const categories = useSelector((state: RootState) => state.category.data);
  const categoriesLoading = useSelector((state: RootState) => state.category.isLoading);

  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  const logoutHandler = async () => {
    try{
      const res = await logout().unwrap();
      dispatch(logoutUser({}));
      toast.success("You are logged out. Please log back in");
      router.push("/");
    }catch(err){
      console.log(err);
    }
  }


  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const searchProduct = () => {
    router.push(`/search/${searchText}`);
  };

  const toggleLoginRegister = () => {
    setVisible(!visible);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const userId = useSelector((state: RootState) => state.auth.user?._id);

  const [getProfile, {data:profile, isLoading:isProfileLoading, isError:isProfileError, error:profileError}] = useLazyGetProfileQuery();

  const handleAuthRoute = (authType: string) => {
    if (authType == "register") {
      router.push("/register");
      setVisible(!visible);
    } else if (authType == "login") {
      router.push("/login");
      setVisible(!visible);
    }
  };

  const adminDashboardHandler = async () => {
    try{
      const res = await getProfile().unwrap();
      if(res.data.role === "admin"){
        router.push("/admin");
      }else{
        toast.error("You are not authorized to access this page");
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="w-full sticky top-0 z-20 bg-white">
        <div className="py-4 w-[90%] mx-auto bg-white">
          <div className="w-full flex flex-wrap lg:flex-nowrap justify-between items-center">
            <div className="flex justify-between items-center w-full">
              <Link
                href="/"
                className="text-base sm:text-lg md:text-xl font-semibold"
              >
                <Image
                  src="/images/my_electronics_logo.jpg"
                  width={150}
                  height={60}
                  alt="Slide 1"
                />
              </Link>
              <div className="flex items-center gap-4">
                {
                  isAdmin && <Button variant="outline" onClick = {adminDashboardHandler} className = "border-primary text-primary hover:bg-primary hover:text-white">Admin Dashboard</Button>
                }
               <div className="flex items-center gap-2 border-r border-gray-300 pr-5 py-4">
                  <Image src="/images/nepal_flag.svg" width={12} height={12} alt="Nepal Flag" />
                <span className="text-xs">NEP</span>
               </div>
                <div className="flex items-center gap-2">
                  <button onClick={toggleLoginRegister} className="">
                    <BsPersonFill size={25} className="text-primary" />
                  </button>
                  <Link href="/cart">
                    <button className="flex relative">
                      <FaShoppingCart size={24} className="text-primary" />
                      <p className="absolute text-xs text-gray-500 font-semibold left-5 bottom-3 px-[7px] py-[2px] bg-[#0171b6] text-white rounded-full">
                        {cartQuantity}
                      </p>
                    </button>
                  </Link>
                </div>
                {/* <button onClick={toggleMenu}>
                  <HiMenu size={24} className="text-[#0171b6]" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <CategoriesNav 
          categories={categories}
          isLoading={categoriesLoading}
        />
      </div>
      
      {/* Welcome Modal */}
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h1 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Welcome to MyHomeTechuniverse
            </h1>
            <div className="flex flex-col space-y-4">
              {
                loggedIn ? (
                  <button
                    className="w-full py-3 text-white bg-[#0171b6] rounded-lg hover:bg-[#015da1] transition"
                    onClick={() => { 
                        // dispatch(logoutUser())
                        logoutHandler();
                        setVisible(false);
                      }}
                  >
                    Logout
                  </button>
                ) : <>
                <button
                className="w-full py-3 text-white bg-[#0171b6] rounded-lg hover:bg-[#015da1] transition"
                onClick={() => handleAuthRoute("login")}
              >
                Login
              </button>
              <button
                className="w-full py-3 text-[#0171b6] border-2 border-[#0171b6] rounded-lg hover:bg-gray-50 transition"
                onClick={() => handleAuthRoute("register")}
              >
                Register
              </button>
                </>
              }
              <button
                className="w-full py-2 text-gray-600 hover:text-gray-800"
                onClick={toggleLoginRegister}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


// const categories = [
//   {
//     "_id": "67cd9e69c1f3ce043e6c7bec",
//     "name": "Toys",
//     "createdAt": "2025-03-09T13:58:01.106Z",
//     "updatedAt": "2025-03-09T13:58:01.106Z",
//     "__v": 0
//   },
//   {
//     "_id": "67cd9e59c1f3ce043e6c7bea",
//     "name": "Laptops",
//     "createdAt": "2025-03-09T13:57:45.573Z",
//     "updatedAt": "2025-03-09T13:57:45.573Z",
//     "__v": 0
//   },
//   {
//     "_id": "67cc22a72e872387e6dc0f6d",
//     "name": "Chargewwrs",
//     "createdAt": "2025-03-08T10:57:43.354Z",
//     "updatedAt": "2025-03-08T11:00:53.507Z",
//     "__v": 0
//   },
//   {
//     "_id": "67cc09563aef6ffa5917c055",
//     "name": "Mobile & accecssories",
//     "createdAt": "2025-03-08T09:09:42.291Z",
//     "updatedAt": "2025-03-08T09:09:57.908Z",
//     "__v": 0
//   },
//   {
//     "_id": "67cc094e3aef6ffa5917c053",
//     "name": "TV and appliances",
//     "createdAt": "2025-03-08T09:09:34.449Z",
//     "updatedAt": "2025-03-08T09:09:34.449Z",
//     "__v": 0
//   },
//   {
//     "_id": "67cc093c3aef6ffa5917c051",
//     "name": "Home appliances",
//     "createdAt": "2025-03-08T09:09:16.932Z",
//     "updatedAt": "2025-03-08T09:09:16.932Z",
//     "__v": 0
//   }
// ]