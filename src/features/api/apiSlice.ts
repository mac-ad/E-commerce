import { BASE_URL } from "@/app/utils/constants/routes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser, User } from "../states/authSlice";
import { RootState } from "@/store/store";
import { baseQuery } from "./common";
import { Product } from "./productApiSlice";
import { CategoryItem } from "../states/CategorySlice";
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
        // getHomepageProducts : builder.query<{message:string,data:Product[],category:CategoryItem},void>({
        //     query : () => ({
        //         url:"/homepageProducts",
        //         method:"GET",
        //     })
        // })
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;