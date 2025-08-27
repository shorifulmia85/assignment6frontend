/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    isAvailable: builder.mutation({
      query: () => {
        return {
          url: "/drivers/status",
          method: "PATCH",
        };
      },
    }),
    changeDriverStatus: builder.mutation({
      query: (data) => {
        console.log(data?.payload);
        return {
          url: `/drivers/driveStatus/${data?.id}`,
          method: "PATCH",
          data: data?.payload,
        };
      },

      invalidatesTags: ["CHANGE_DRIVERS_STATUS"],
    }),
    getPendingDriver: builder.query({
      query: () => {
        return {
          url: "/drivers/pending-driver",
        };
      },
      providesTags: ["CHANGE_DRIVERS_STATUS"],
    }),
  }),
});
export const {
  useIsAvailableMutation,
  useChangeDriverStatusMutation,
  useGetPendingDriverQuery,
} = rideApi;
