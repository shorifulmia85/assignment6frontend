/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IDriver, IResponse, IUser, IUserResponse } from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
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

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["USER"],
    }),
  }),
});
export const {
  useRegisterDriverMutation,
  useRegisterRiderMutation,
  useLoginMutation,
  useLogOutMutation,
  useChangePasswordMutation,
} = authApi;
