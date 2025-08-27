/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminAnalytics from "@/components/modules/admin/AdminAnalytics/AdminAnalytics";
import Loading from "@/components/ui/Loading";
import { useGetDashboardAnalyticsQuery } from "@/redux/features/statsApi/statsApi";

const Analytics = () => {
  const { data, isLoading, isError } = useGetDashboardAnalyticsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    const msg =
      (isError as any)?.data?.message ??
      (isError as any)?.error ??
      "Failed to load analytics";
    return <div className="p-4 text-red-600">Error: {msg}</div>;
  }

  const payload = data?.data;
  if (!payload) {
    return <div className="p-4 text-muted-foreground">No analytics data.</div>;
  }

  return (
    <div>
      <AdminAnalytics data={payload} />
    </div>
  );
};

export default Analytics;
