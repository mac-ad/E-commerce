"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "../../utils/types/z.schema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRegisterMutation } from "@/features/api/apiSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleRoute = () => {
    router.push("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, {isLoading:registerLoading}] = useRegisterMutation();

  const submitData = async (data: RegisterData) => {
    console.log("tryy registering in");
    try {
      // dispatch(registerUser(data));
      const res = await registerUser({data}).unwrap();
      console.log("res = ", res)  
      toast.success(res.message)
      router.push("/login")
    } catch (err:any) {
      console.log("err = ", err)
      toast.error(err?.data?.message)
    }
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div className="w-full bg-gray-200 min-h-screen">
        <div className="flex justify-center p-4">
          <div className="w-full md:w-[60%] lg:w-[40%] bg-white py-6 sm:py-8 md:py-11 px-6 sm:px-8 md:px-12 flex flex-col rounded-sm shadow-lg mx-4 sm:mx-0">
            <h1 className="text-2xl sm:text-3xl mb-2 font-extralight text-[#0171b6]">
              Register
            </h1>
            <h1 className="text-xs sm:text-sm mb-4 sm:mb-6 font-extralight text-gray-500">
              Create your personal account today!
            </h1>
            <label className="text-xs sm:text-sm font-light text-[#0171b6]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your fullname"
              {...register("fullName")}
              className="border border-gray-300 p-2 text-xs sm:text-sm mt-2 sm:mt-3 font-extralight rounded-sm"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
            <label className="text-xs sm:text-sm font-light text-[#0171b6] mt-2 sm:mt-3">
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
              className="border border-gray-300 p-2 text-xs sm:text-sm font-extralight mt-2 sm:mt-3 rounded-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
            <label className="text-xs sm:text-sm mt-2 sm:mt-3 font-light text-[#0171b6]">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              {...register("confirmPassword")}
              className="border border-gray-300 p-2 text-xs sm:text-sm font-extralight mt-2 sm:mt-3 rounded-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            <Button type="submit" className="mt-6 sm:mt-8 w-full" disabled={registerLoading}>
              {registerLoading ? <Loader2 className="animate-spin" /> : "Register"}
            </Button>
            <p className="flex justify-end text-[10px] sm:text-xs mt-2 text-gray-400 font-light">
              Forgot password ?
            </p>
            <p className="flex justify-center text-xs sm:text-sm font-extralight my-2">OR</p>
            <p className="mt-2 sm:mt-4 text-xs sm:text-sm font-extralight text-gray-500 text-center">
              Already have an account ?&nbsp;
              <span
                className="text-[#0171b6] font-semibold cursor-pointer hover:text-[#015da1] transition-colors"
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
