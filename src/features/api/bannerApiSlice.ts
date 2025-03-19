import { BASE_URL } from '@/app/utils/constants/routes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Banner } from '../states/BannerSlice';
import { baseQuery, baseQueryWithReauth } from './common';

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Banner'],
  endpoints: (builder) => ({
    getBanners: builder.query<{data:Banner[],total:number}, void>({
      query: () => '/banner',
      providesTags: ['Banner']
    }),
    getBannerById: builder.query<Banner, string>({
      query: (id) => `/banner/${id}`,
      providesTags: ['Banner']
    }),
    createBanner: builder.mutation<Banner, Partial<Banner>>({
      query: (banner) => ({
        url: '/banner',
        method: 'POST',
        body: banner,
      }),
      invalidatesTags: ['Banner']
    }),
    updateBanner: builder.mutation<Banner, Partial<Banner>>({
      query: (banner) => ({
        url: `/banner/${banner._id}`,
        method: 'PUT',
        body: banner,
      }),
      invalidatesTags: ['Banner']
    }),
    deleteBanner: builder.mutation<void, string>({
      query: (id) => ({
        url: `/banner/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner']
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetBannerByIdQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
