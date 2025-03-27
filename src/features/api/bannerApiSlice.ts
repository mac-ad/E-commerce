import { BASE_URL } from '@/utils/constants/routes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Banner } from '../states/BannerSlice';
import { baseQuery, baseQueryWithReauth } from './common';


interface BannerParams {
  q?: string;
  pageIndex?: number;
  pageSize?: number;
  sort?: string;
  order?: string;
  category?: string;
  isActive?: boolean;
  search?: string;
}

interface BannerResponse {
  data: Banner[];
  total: number;
  totalItems: number;
}

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Banner'],
  endpoints: (builder) => ({
    getBanners: builder.query<BannerResponse, BannerParams | void>({
      query: (params: BannerParams) => {
        const url = new URL("/banner", BASE_URL);

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
      providesTags: ['Banner']
    }),
    getBannerById: builder.query<{data:Banner,message:string}, string>({
      query: (id) => `/banner/${id}`,
      providesTags: ['Banner']
    }),
    createBanner: builder.mutation<Banner, { data: FormData }>({
      query: ({ data }) => ({
        url: '/banner',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Banner']
    }),
    updateBanner: builder.mutation<Banner, { data: FormData, id: string }>({
      query: ({ data, id }) => ({
        url: `/banner/${id}`,
        method: 'PUT',
        body: data,
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
  useLazyGetBannerByIdQuery
} = bannerApi;
