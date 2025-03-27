import { BASE_URL } from '@/utils/constants/routes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth } from './common';
import { ItemType } from '@/utils/types/api/common';

export interface Product {
    _id: string;
    name: string;
    brand: string | {
      _id: string;
      name: string;
    };
    discount: number;
    price: number;
    quantity: number;
    description: string;
    images: string[];
    category: string | {
      _id: string;
      name: string;
    };
    isActive: boolean;
}

export interface ProductParams {
  q?: string;
  pageIndex?: number;
  pageSize?: number;
  sort?: string;
  order?: string;
  search?: string;
  category?: string;
  brand?: string | string[];
  isActive?: boolean;
  discounted?: boolean;
  sortBy?: string;
  sortOrder?: string;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<{
        data: Product[] | [];
        total: number;
        totalItems: number;
        hasNext: boolean;
    }, ProductParams | void>({
      query: (params : ProductParams) => {
        const url = new URL("/products", BASE_URL);

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
              url.searchParams.set(
                key,
                typeof value === 'boolean' || typeof value === 'number' 
                  ? value.toString() 
                  : value
              );
            }
          });
        }

        return {
          url: url.pathname + url.search,
          credentials: 'include',
        }
      },
      providesTags: ['Product'],
      keepUnusedDataFor: 0
    }),

    getProduct: builder.query<{data: Product}, string>({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),

    createProduct: builder.mutation<{data: Product}, {data: FormData}>({
      query: ({data}) => ({
        url: '/products',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<{data: Product}, {data: FormData, id: string}>({
      query: ({data, id}) => ({
        url: `/products/${encodeURIComponent(id)}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation<{message: string}, string>({
      query: (id) => ({
        url: `/products/${encodeURIComponent(id)}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
 useGetProductsQuery,
 useGetProductQuery,
 useLazyGetProductQuery,
 useCreateProductMutation,
 useUpdateProductMutation,
 useDeleteProductMutation,
} = productApi;

export const {util:api} = productApi;
