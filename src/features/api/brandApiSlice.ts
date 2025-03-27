import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Brand } from './brandSlice';
import { BASE_URL } from '@/utils/constants/routes';
import { baseQuery, baseQueryWithReauth } from './common';

interface BrandResponse {
  data: Brand[];
  total: number;
  totalItems: number;
}

interface BrandParams {
  q?: string;
  pageIndex?: number;
  pageSize?: number;
  sort?: string;
  order?: string;
  category?: string;
  isActive?: boolean;
  search?: string;
}

export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Brand'],
  endpoints: (builder) => ({
    getBrands: builder.query<BrandResponse,BrandParams | void >({
      query: (params: BrandParams) => {
        const url = new URL("/brand", BASE_URL);

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
              url.searchParams.set(key, String(value));
            }
          });
        }

        return {
          url: url.pathname + url.search,
          credentials: 'include',
        };
      },
      providesTags: ['Brand']
    }),
    createBrand: builder.mutation<{message: string, brand: Brand}, {data: FormData}>({
      query: ({data}) => ({
        url: '/brand',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Brand']
    }),
    updateBrand: builder.mutation<{message: string, brand: Brand}, {data: FormData, id: string}>({
      query: ({id, data}) => ({
        url: `/brand/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Brand']
    }),
    deleteBrand: builder.mutation<{message: string}, string>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Brand']
    }),
    getBrand: builder.query<{data: Brand, message: string}, string>({
      query: (id) => `/brand/${id}`,
      providesTags: ['Brand']
    })
  })
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useLazyGetBrandQuery,
  useGetBrandQuery
} = brandApi;

export const {util:api} = brandApi;