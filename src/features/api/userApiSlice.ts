import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/app/utils/constants/routes";
import { RootState } from "@/store/store";
import { baseQueryWithReauth } from "./common";

interface UserProfile {
  _id?: string;
  fullName?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProfileResponse {
  data: UserProfile;
  message: string;
}

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse,void>({
      query: () => ({
        url: `/profile/`,
        method: "GET",
      }),
      providesTags: ['User'],
    }),
      getUsers: builder.query<{
        data: UserProfile[],
        total: number,
        totalItems: number
      }, GetUsersParams | void>({
          query: (params) => {
              const url = new URL("/users", BASE_URL);

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
          providesTags: ['User']
      }),
    getUser: builder.query<ProfileResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<ProfileResponse, {id: string, data: UserProfile }>({
        query: ({id, data }) => ({
          url: `/users/${id}`,
          method: "PUT",
          body: data,
        }), 
        invalidatesTags : ['User']
      }),
    deleteUser: builder.mutation<ProfileResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetProfileQuery,useLazyGetProfileQuery,  useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation,useLazyGetUserQuery } = userApi;

export const {util:api} = userApi;
