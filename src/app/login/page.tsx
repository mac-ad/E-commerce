"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "../utils/types/z.schema";

export default function Login() {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const submitData = (data: LoginData) => {
    if (data.username === "Mikasha@316" && data.password === "12@Dharan") {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div className="pt-[130px] w-full bg-gray-200">
        <div className="flex justify-center p-4">
          <div className="w-[40%] bg-white py-12 px-12 flex flex-col rounded-sm shadow-lg">
          <h1 className="text-3xl mb-2 font-extralight text-[#0171b6]">
            Login
          </h1>
          <h1 className="text-sm mb-6 font-extralight text-gray-500">
            Welcome Back!
          </h1>

            <label className="text-sm font-light text-[#0171b6]">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="border border-gray-300 p-2 text-sm mt-3 font-extralight rounded-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}

            <label className="text-sm mt-3 font-light text-[#0171b6]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="border border-gray-300 p-2 text-sm mt-3 font-extralight rounded-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="mt-8 rounded-sm bg-[#0171b6] text-center flex justify-center w-full p-2 text-white font-light"
            >
              Login
            </button>

            <p className="flex justify-end text-xs mt-2 text-gray-400 font-light">
              Forgot password?
            </p>
            <p className="flex justify-center font-extralight">OR</p>
            <p className="mt-4 text-sm text-gray-500 font-extralight">
              Don't have an account?&nbsp;
              <span
                className="text-[#0171b6] font-semibold cursor-pointer"
                onClick={handleRoute}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
