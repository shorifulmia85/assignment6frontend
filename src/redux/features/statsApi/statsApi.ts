import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytics: builder.query({
      query: () => ({
        url: "/analytics",
      }),
    }),
  }),
});
export const { useGetDashboardAnalyticsQuery } = statsApi;
