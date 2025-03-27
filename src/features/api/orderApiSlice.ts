import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseQueryWithReauth } from "./common";
import { BASE_URL } from "@/utils/constants/routes";
import { OrderStatus, PaymentStatus } from "@/utils/types/api/common";

export interface Order {
    _id: string;
    user: {
        _id: string;
        fullName: string;
        email: string;
    } | string;
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
    };
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
    phone: string;
}

export interface OrderParams {
    q?: string;
    pageIndex?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    search?: string;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    startDate?: string;
    endDate?: string;
}

export interface CreateOrderParams {
    data: {
        items: Array<{
            productId: string;
            quantity: number;
        }>;
        shippingAddress: {
            street: string;
            city: string;
            state: string;
            pincode: string;
        };
        phone: number;
    }
}

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery:baseQueryWithReauth,
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrders: builder.query<{ 
            data: Order[],
            total:number,
            totalItems:number
         }, OrderParams | void>({
            query: (params:OrderParams) => {
                const url = new URL("/order", BASE_URL);

                if(params) {
                    Object.entries(params).forEach(([key, value]) => {
                        if(value !== undefined) {
                            url.searchParams.set(key, value.toString());
                        }
                    });
                }

                return {
                    url: url.pathname + url.search,
                    credentials: 'include',
                }
            },
            providesTags: ['Order']
        }),
        
        getOrder: builder.query<{ data: Order }, string>({
            query: (id) => ({
                url: `/order/${id}`,
                method: "GET"
            }),
            providesTags: ['Order']
        }),

        createOrder: builder.mutation<{ data: Order }, CreateOrderParams>({
            query: ({data}) => ({    
                url: "/order",
                method: "POST",
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['Order']
        }),

        updateOrder: builder.mutation<{ data: Order }, { id: string, data: FormData }>({
            query: ({ id, data }) => ({
                url: `/order/${id}`,
                method: "PUT",
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['Order']
        }),

        deleteOrder: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/order/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Order']
        })
    })
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useLazyGetOrderQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = orderApi;
