'use client'

import { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
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
              />
              <button className="w-full sm:w-auto mt-2 sm:mt-0 bg-[#0171b6] py-2 sm:py-3 px-4 sm:px-6 md:px-8 text-white text-sm">
                Search
              </button>
            </div>

            <div className="flex items-center h-full w-full sm:w-auto justify-between sm:justify-end">
              <h1 className="text-xs font-light">NEP</h1>
              {/* Vertical Line */}
              <div className="h-full w-px bg-gray-300 self-stretch mx-4 hidden sm:block"></div>
              <button className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                <BsPersonFill size={25} className="text-[#0171b6]" />
              </button>
              <button className="ml-4 mt-2 sm:mt-0">
                <FaShoppingCart size={24} className="text-[#0171b6]" />
              </button>
              <button className="ml-4 mt-2 sm:mt-0">
                <IoGitCompareSharp size={24} className="text-[#0171b6]" />
              </button>
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
