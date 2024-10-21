"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  console.log(searchText);

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

  const cartItems = useSelector((store: any) => store.cart);
  console.log(cartItems.items.length);

  const handleAuthRoute = (authType: string) => {
    if (authType == "register") {
      router.push("/register");
      setVisible(!visible);
    } else if (authType == "login") {
      router.push("/login");
      setVisible(!visible);
    }
  };
  return (
    <>
      <div className="fixed fixed-top w-full z-50">
        <div className="w-full py-3 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="w-full flex flex-wrap lg:flex-nowrap justify-between items-center">
            <Link
              href="/"
              className="w-full sm:w-auto lg:w-[30%] text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-0"
            >
              <Image
                src="/images/my_electronics_logo.jpg"
                width={150}
                height={60}
                alt="Slide 1"
              />
            </Link>

            <div className="w-full flex flex-wrap lg:flex-nowrap items-center mb-2 sm:mb-0">
              <input
                placeholder="Search Products..."
                className="w-full sm:w-[60%] md:w-[70%] lg:w-[70%] p-2 sm:p-3 border border-t-0 text-sm shadow-lg"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="w-full sm:w-auto mt-2 sm:mt-0 bg-[#0171b6] py-2 sm:py-3 px-4 sm:px-6 md:px-8 text-white text-sm"
                onClick={searchProduct}
              >
                Search
              </button>
            </div>

            <div className="flex items-center h-full w-full sm:w-auto justify-between sm:justify-end">
              <h1 className="text-xs font-light">NEP</h1>
              {/* Vertical Line */}
              <div className="h-full w-px bg-gray-300 self-stretch mx-4 hidden sm:block"></div>
              <button
                className="ml-0 sm:ml-4 mt-2 sm:mt-0"
                onClick={toggleLoginRegister}
              >
                <BsPersonFill size={25} className="text-[#0171b6]" />
              </button>
              {visible && (
                <>
                  <div className="absolute  bg-white mt-[130px] p-5 border border-gray-200 mr-[60px]">
                    <h1 className="text-xs text-black font-semibold mb-3">
                      Welcome to MyHomeTechuniverse
                    </h1>
                    <div className="flex space-x-2">
                      <p
                        className="px-5 py-1 text-xs border border-gray-300 text-[#0171b6] cursor-pointer"
                        onClick={() => handleAuthRoute("login")}
                      >
                        Login
                      </p>
                      <p
                        className="px-5 py-1 text-xs border border-gray-300 text-[#0171b6] cursor-pointer"
                        onClick={() => handleAuthRoute("register")}
                      >
                        Register
                      </p>
                    </div>
                  </div>
                </>
              )}
              <Link href="/cart">
                <button className="ml-4 mt-2 sm:mt-0 flex relative">
                  <FaShoppingCart size={24} className="text-[#0171b6]" />
                  <p className=" absolute text-xs text-gray-500 font-semibold left-5 bottom-3 px-[7px] py-[2px] bg-[#0171b6] text-white rounded-full">
                    {cartItems?.items?.length}
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#0171b6] px-4 sm:px-6 lg:px-8 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between">
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/">
              <p className="text-white text-[12px] py-3 px-2 hover:bg-white hover:text-gray-500">
                TV & AUDIO
              </p>
            </Link>
            {showDropdown && (
              <div className="absolute left-0  w-48 bg-white shadow-lg rounded-lg z-10">
                <Link href="/category/tv">
                  <p className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">
                    Televisions
                  </p>
                </Link>
                <Link href="/category/audio">
                  <p className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">
                    Audio Systems
                  </p>
                </Link>
                <Link href="/category/soundbars">
                  <p className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">
                    Soundbars
                  </p>
                </Link>
              </div>
            )}
          </div>

          <Link href="/">
            <p className="text-white text-[12px] py-3 px-2 hover:bg-white hover:text-gray-500">
              HOME & APPLIANCES
            </p>
          </Link>
          <Link href="/">
            <p className="text-white text-[12px] py-3 px-2 hover:bg-white hover:text-gray-500">
              MOBILE & APPLIANCES
            </p>
          </Link>
          <Link href="/">
            <p className="text-white text-[12px] py-3 px-2 hover:bg-white hover:text-gray-500">
              SMART HOME APPLIANCE
            </p>
          </Link>
          <Link href="/">
            <p className="text-white text-[12px] py-3 px-2 hover:bg-white hover:text-gray-500">
              PURIFICATION & HYGIENE
            </p>
          </Link>
          <Link href="/">
            <p className="text-white text-[12px] py-3 px-2 hover:bg-white hover:text-gray-500">
              COMMERCIAL PRODUCTS
            </p>
          </Link>
          <Link href="/">
            <p className="text-white text-[12px] py-3 px-2 hover:bg-white hover:text-gray-500">
              ELECTRICAL VEHICLE
            </p>
          </Link>
          <Link href="/">
            <p className="text-white text-[12px] py-3 px-2 hover:bg-white hover:text-gray-500">
              BRANDS
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
