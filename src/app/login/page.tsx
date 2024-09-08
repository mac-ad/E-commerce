"use client";

import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()
    const handleRoute = () =>{
        router.push('/register')
    }
  return (
    <div className="pt-[130px] w-full bg-gray-200">
      <div className="flex justify-center p-4">
        <div className="w-[40%] bg-white py-12 px-12 flex flex-col rounded-sm shadow-lg ">
          <h1 className="text-3xl mb-8 font-extralight text-[#0171b6]">
            Login
          </h1>

          <label className="text-sm font-light text-[#0171b6]">Username</label>
          <input
            type="text"
            placeholder="Enter  your username"
            className="border border-gray-300 p-2 text-sm  mt-3 font-extralight rounded-sm"
          />
          <label className="text-sm mt-3 font-light  text-[#0171b6]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter  your password"
            className="border border-gray-300 p-2 text-sm  mt-3 font-extralight rounded-sm"
          />
          <button className="mt-8 rounded-sm bg-[#0171b6] text-center flex justify-center w-full p-2 text-white font-light">
            Login
          </button>
          <p className="flex justify-end text-xs mt-2 text-gray-400 font-light">
            Forgot password ?
          </p>
          <p className="flex justify-center font-extralight">OR</p>
          <p className="mt-4 text-sm text-gray-500 font-extralight">
            Don't have an account ?&nbsp;
            <span className="text-[#0171b6] font-semibold cursor-pointer" onClick={handleRoute}>SIgn Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
