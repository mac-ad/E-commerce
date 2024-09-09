"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerSchema } from "../utils/types/z.schema";

type registerData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function Register() {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerData>({
    resolver: zodResolver(registerSchema),
  });

  const submitData = (data: registerData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div className="pt-[130px] w-full bg-gray-200">
        <div className="flex justify-center p-4">
          <div className="w-[40%] bg-white py-11 px-12 flex flex-col rounded-sm shadow-lg">
            <h1 className="text-3xl mb-2 font-extralight text-[#0171b6]">
              Register
            </h1>
            <h1 className="text-sm mb-6 font-extralight text-gray-500">
              Create your personal account today!
            </h1>
            <label className="text-sm font-light text-[#0171b6]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter  your fullname"
              {...register("fullname")}
              className="border border-gray-300 p-2 text-sm  mt-3 font-extralight rounded-sm"
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullname.message}
              </p>
            )}
            <label className="text-sm font-light text-[#0171b6] mt-3">
              E-mail
            </label>
            <input
              type="text"
              placeholder="Enter  your email"
              {...register("email")}
              className="border border-gray-300 p-2 text-sm  mt-3 font-extralight rounded-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
            <label className="text-sm mt-3 font-light  text-[#0171b6]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter  your password"
              {...register("password")}
              className="border border-gray-300 p-2 text-sm font-extralight mt-3 rounded-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
            <label className="text-sm mt-3 font-light  text-[#0171b6]">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              {...register("confirmPassword")}
              className="border border-gray-300 p-2 text-sm font-extralight mt-3 rounded-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            <button type="submit" className="mt-8 bg-[#0171b6] text-center flex justify-center w-full p-2 text-white font-light rounded-sm">
              Register
            </button>
            <p className="flex justify-end text-xs mt-2 text-gray-400 font-light">
              Forgot password ?
            </p>
            <p className="flex justify-center font-extralight">OR</p>
            <p className="mt-4 text-sm font-extralight text-gray-500 ">
              Already have an account ?&nbsp;
              <span
                className="text-[#0171b6] font-semibold cursor-pointer"
                onClick={handleRoute}
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
