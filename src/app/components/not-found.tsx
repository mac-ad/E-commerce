"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  // console.log(router)

  // useEffect(() => {
  //  const timer = setTimeout(() => {
  //     router.push("/");  
  //   }, 3000); 

  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-blue-500">404</h1>
        <p className="text-xl text-gray-600 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
          >
            Go Back to Home
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          You'll be redirected to the home page in a few seconds.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
