import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdPhone } from "react-icons/md";
import { TbMailFilled } from "react-icons/tb";

export default function Complaint() {
  return (
    <div className="pt-[150px] pb-[30px] w-full h-screen bg-gray-100 flex px-8 ">
      <div className="w-[60%] bg-white p-10 shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-[#0171b6]">
          Reach Out to Us with Your Complaint
        </h1>
        <div className="w-full flex justify-between mt-6">
          <div className="w-[70%]">
            <p className="font-semibold text-sm">Leave us a message</p>
          </div>
          <div>
            <p className="flex text-sm mt-8">
              <FaLocationDot className="mr-3 mt-2" size={18} />
              Technology Building 5th Street Tokyo, Japan
            </p>
            <p className="flex text-sm mt-3">
              <MdPhone className="mr-3" size={18} />
              +260-673482834
            </p>
            <p className="flex text-sm mt-3">
              <TbMailFilled className="mr-3" size={18} />
              myhometechuniverse@gmail.com
            </p>
            <div className="flex">

            </div>
          </div>
        </div>
      </div>
      <Image src='/images/complaint.png' width={400} height={50} alt="complaint"/>
    </div>
  );
}
