/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IDriver, IResponse, IUser, IUserResponse } from "@/types/auth";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerRider: builder.mutation<IResponse<IUserResponse>, IUser>({
      query: (userInfo) => {
        return {
          url: "/auth/register",
          method: "POST",
          data: userInfo,
        };
      },
    }),
    registerDriver: builder.mutation<IResponse<IUserResponse>, IDriver>({
      query: (userInfo) => {
        return {
          url: "/auth/register-driver",
          method: "POST",
          data: userInfo,
        };
      },
    }),

    getMe: builder.query({
      query: () => ({
        url: "/users/me",
      }),
      providesTags: ["USER"],
    }),
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    updateStatus: builder.mutation({
      query: (updateInfo) => {
        return {
          url: `/users/block/${updateInfo.id}`,
          method: "PATCH",
          data: updateInfo.status,
        };
      },
      invalidatesTags: ["USER"],
    }),
  }),
});
export const {
  useRegisterDriverMutation,
  useRegisterRiderMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
  useUpdateStatusMutation,
} = userApi;
