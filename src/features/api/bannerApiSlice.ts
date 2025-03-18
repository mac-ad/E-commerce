import { BASE_URL } from '@/app/utils/constants/routes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Banner } from '../states/BannerSlice';
import { baseQuery, baseQueryWithReauth } from './common';

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBanners: builder.query<{data:Banner[],total:number}, void>({
      query: () => '/banner',
    }),
    getBannerById: builder.query<Banner, string>({
      query: (id) => `/banner/${id}`,
    }),
    createBanner: builder.mutation<Banner, Partial<Banner>>({
      query: (banner) => ({
        url: '/banner',
        method: 'POST',
        body: banner,
      }),
    }),
    updateBanner: builder.mutation<Banner, Partial<Banner>>({
      query: (banner) => ({
        url: `/banner/${banner._id}`,
        method: 'PUT',
        body: banner,
      }),
    }),
    deleteBanner: builder.mutation<void, string>({
      query: (id) => ({
        url: `/banner/${id}`,
        method: 'DELETE',
      }),
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
