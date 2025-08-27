/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRides: builder.query({
      query: (params) => ({
        url: "/rides",
        method: "GET",
        params,
      }),
      providesTags: ["RIDES"],
    }),
    requestRide: builder.mutation({
      query: (rideInfo) => {
        return {
          url: "/rides/requested",
          method: "POST",
          data: rideInfo,
        };
      },

      invalidatesTags: ["RIDES"],
    }),
    getMyRides: builder.query({
      query: () => {
        return {
          url: "/rides/me",
        };
      },
      providesTags: (_res, _err, id) => [{ type: "RIDES", id }],
    }),
    getSingleRide: builder.query({
      query: (id) => {
        return {
          url: `/rides/${id}`,
          method: "GET",
        };
      },
      providesTags: (_res, _err, id) => [{ type: "RIDES", id }],
    }),

    updateRides: builder.mutation({
      query: (data) => {
        return {
          url: `/rides/${data?.id}/status`,
          method: "PATCH",
          data: data?.payload,
        };
      },

      invalidatesTags: ["RIDES"],
    }),
  }),
});
export const {
  useGetMyRidesQuery,
  useRequestRideMutation,
  useGetAllRidesQuery,
  useGetSingleRideQuery,
  useUpdateRidesMutation,
} = rideApi;
