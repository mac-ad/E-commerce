import { BASE_URL } from "@/app/utils/constants/routes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  User } from "../states/authSlice";

import { RegisterData } from "@/app/utils/types/z.schema";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        login: builder.mutation<
            { data : {token: string; user: User,redirect: string}, message: string },
            { email: string; password: string }
        >({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
                // credentials: "include",
            }),
        }),
        logout : builder.mutation<{message:string},void>({
            query : () => ({
                url:"/auth/logout",
                method:"POST",
                credentials:"include"
            })
        }),
        register : builder.mutation<{message:string},{data:RegisterData}>({
            query : ({data}) => ({
                url:"/auth/register",
                method:"POST",
                body:data
            })
        }),
        sendOTP : builder.mutation<{data:any,message:string},{email:string}>({
            query : ({email}) => ({
                url:"/auth/reset-password/send-otp",
                method:"POST",
                body:{email}
            })
        }),
        verifyOTP : builder.mutation<{data:any,message:string},{email:string,otp:string}>({
            query : ({email,otp}) => ({
                url:"/auth/reset-password/verify-otp",
                method:"PUT",
                body:{email,otp}
            })
        }),
        resetPassword : builder.mutation<{data:any,message:string},{email:string,password:string}>({
            query : ({email,password}) => ({
                url:"/auth/reset-password",
                method:"PATCH",
                body:{email,password}
            })
        }),
        // getHomepageProducts : builder.query<{message:string,data:Product[],category:CategoryItem},void>({
        //     query : () => ({
        //         url:"/homepageProducts",
        //         method:"GET",
        //     })
        // })
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useSendOTPMutation, useVerifyOTPMutation, useResetPasswordMutation } = authApi;