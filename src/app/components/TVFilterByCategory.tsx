import React from "react";

export default function TVFilterByCategory() {
  return (
    <div className="w-full bg-gray-100 flex justify-center pb-8">
      <div className="w-[90%] p-4 ">
        <h1 className="text-[#0171b6] font-bold text-xl">
          Easily browse through categories: Discover TVs ranging from 24" to 98"
          to find your ideal viewing experience.
        </h1>
        <hr className="border-[#0171b6] border-[1px] mt-1"></hr>
        <div className="grid grid-cols-4 gap-5 mt-6">
          <button className="w-full bg-white py-3 px-6 rounded-lg text-[#0171b6] text-sm font-semibold">OLED TV</button>
          <button className="w-full bg-white py-3 px-6 rounded-lg text-[#0171b6] text-sm font-semibold">QNED TV</button>
          <button className="w-full bg-white py-3 px-6 rounded-lg text-[#0171b6] text-sm font-semibold">QLED TV</button>
          <button className="w-full bg-white py-3 px-6 rounded-lg text-[#0171b6] text-sm font-semibold">4K UHD LED TV</button>
          <button className="w-full bg-white py-3 px-6 rounded-lg text-[#0171b6] text-sm font-semibold">Smart LED TV</button>
          <button className="w-full bg-white py-3 px-6 rounded-lg text-[#0171b6] text-sm font-semibold">Normal TV</button>
        </div>
      </div>
    </div>
  );
}
