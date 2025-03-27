import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseQueryWithReauth } from "./common";
import { BASE_URL } from "@/utils/constants/routes";
import { Product } from "./productApiSlice";

export interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  qty: number;
  price: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;    
  createdAt: string;
  updatedAt: string;
}

interface CartResponse {
  message: string;
  data: Cart;
}

interface CartProductParam {
  productId: string;
  qty: number;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery:baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<
      CartResponse,
      { data: CartProductParam }
    >({
      query: ({data}) => ({
        url: "/cart",
        method: "POST",
        body : data,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<
      CartResponse,
      { productId: string; qty: number }
    >({
      query: (body) => ({
        url: "/cart",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<
      CartResponse,
      void
    >({
      query: () => ({   
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartMutation, useAddToCartMutation, useClearCartMutation } = cartApi;

export const {util:api} = cartApi;