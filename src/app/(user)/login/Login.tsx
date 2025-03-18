"use client"

import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/features/api/apiSlice';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import {useDispatch} from 'react-redux';
import { LoginData, loginSchema } from '../../utils/types/z.schema';
import { logUser } from '@/features/states/authSlice';

const Login = () => {
    const router = useRouter();
    const handleRoute = () => {
      router.push("/register");
    };
  
    const dispatch = useDispatch<AppDispatch>();
  
    const [login, { isLoading: logging }] = useLoginMutation();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginData>({
      resolver: zodResolver(loginSchema),
    });
  
  
  
    const submitData = async (data: LoginData) => {
      // if (data.email === "Mikasha@316" && data.password === "12@Dharan") {
      //   router.push("/dashboard");
      // }
      console.log("tryy logging in");
      try {
        const res = await login(data).unwrap();
        console.log("res = ", res)
        const user = res.data.user;
        const token = res.data.token;
        dispatch(logUser({user}))
        toast.success("Login successful")
      } catch (err:any) {
        console.log("err = ", err)
        toast.error(err?.data?.message)
       }
    };
  
    return (
      <>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="w-full bg-gray-200 py-5">
            <div className="flex justify-center p-4">
              <div className="w-full md:w-[60%] lg:w-[40%] bg-white py-6 sm:py-8 md:py-12 px-6 sm:px-8 md:px-12 flex flex-col rounded-sm shadow-lg mx-4 sm:mx-0">
                <h1 className="text-2xl sm:text-3xl mb-2 font-extralight text-[#0171b6]">
                  Login
                </h1>
                <h1 className="text-xs sm:text-sm mb-4 sm:mb-6 font-extralight text-gray-500">
                  Welcome Back!
                </h1>
  
                <label className="text-xs sm:text-sm font-light text-[#0171b6]">
                  E-mail
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="border border-gray-300 p-2 text-xs sm:text-sm mt-2 sm:mt-3 font-extralight rounded-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
  
                <label className="text-xs sm:text-sm mt-2 sm:mt-3 font-light text-[#0171b6]">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className="border border-gray-300 p-2 text-xs sm:text-sm mt-2 sm:mt-3 font-extralight rounded-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
  
                <button
                  type="submit"
                  disabled={logging}
                  className="mt-6 sm:mt-8 bg-[#0171b6] text-center flex justify-center w-full p-2 text-white text-sm font-light rounded-sm hover:bg-[#015da1] transition-colors"
                >
                  {
                    logging ? <Icon icon = "line-md:loading-loop" fontSize={20}/> : "Login"
                  }
                </button>
  
                <p className="flex justify-end text-[10px] sm:text-xs mt-2 text-gray-400 font-light">
                  Forgot password?
                </p>
                <p className="flex justify-center text-xs sm:text-sm font-extralight my-2">
                  OR
                </p>
                <p className="mt-2 sm:mt-4 text-xs sm:text-sm font-extralight text-gray-500 text-center">
                  Don't have an account?&nbsp;
                  <span
                    className="text-[#0171b6] font-semibold cursor-pointer hover:text-[#015da1] transition-colors"
                    onClick={handleRoute}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
  
      </>
    );
}

export default Login
