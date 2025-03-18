import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryItem } from '../states/CategorySlice';
import { BASE_URL } from '@/app/utils/constants/routes';
import { baseQuery, baseQueryWithReauth } from './common';
// import { Category } from './category_types';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<{
      data: CategoryItem[];
      total: number;
    }, void>({
      query: () => ({
        url: '/category',
        method: 'GET',
        transformResponse: (response: any) => {
          if (!response) return [];
          return response.data.data;
        },
      }),
      providesTags: ['Category'],
    }),
    getCategory: builder.query<{data:CategoryItem,message:string}, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'GET',
      }),
    }),
    createCategory: builder.mutation<CategoryItem, {data:FormData}>({
      query: ({data}) => ({
        url: '/category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<CategoryItem, {data:FormData,id:string}>({
      query: ({data,id}) => ({
        url: `/category/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useLazyGetCategoryQuery,
} = categoryApi;

export const {util:api} = categoryApi;