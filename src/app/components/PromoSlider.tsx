"use client";
import { useEffect } from "react";
export default function PromoSlider() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-carousel-item]");
    const prevButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");
    let currentIndex = 0;

    const showItem = (index: number) => {
      items.forEach((item, i) => {
        if (item instanceof HTMLElement) {
          item.classList.toggle("hidden", i !== index);
        }
      });
    };

    prevButton?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(currentIndex);
    });

    nextButton?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    });

    showItem(currentIndex);
  }, []);

  return (
    <div className="w-full flex justify-center bg-gray-100 pb-8 pt-[130px]">
      <div
        id="controls-carousel"
        className="relative w-[90%]"
        data-carousel="static"
      >
        <div className="relative  overflow-hidden ">
          <div className="duration-700 ease-in-out" data-carousel-item>
            <img
              src='/images/my_electronics_logo.jpg'
              style={{ width: "100%", objectFit: "cover", height:'340px' }}
              alt="Slide 1"
            />
          </div>
          <div className="duration-700 ease-in-out" data-carousel-item="active">
            <img
              src="https://www.cgdigital.com.np/api/images/product_brands//PvFX3P_1720348707-1920-x-565-px - Optimize.jpg"
              style={{ width: "100%", objectFit: "cover" }}
              alt="Slide 2"
            />
          </div>
          <div className="duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://www.cgdigital.com.np/api/images/layouts/banners/YOolGw_1717909240-Midea.jpg"
              style={{ width: "100%", objectFit: "cover" }}
              alt="Slide 3"
            />
          </div>
          <div className="duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://www.cgdigital.com.np/api/images/layouts/banners/zGsWFv_1718189475-Beko-1920-x-565-px.jpg"
              style={{ width: "100%", objectFit: "cover" }}
              alt="Slide 4"
            />
          </div>
        </div>
        <button
          type="button"
          className="absolute inset-y-0 left-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-800/30   group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute inset-y-0 right-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-800/30   group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}
