/* eslint-disable @typescript-eslint/no-explicit-any */
import RiderAnalytics from "@/components/modules/Rider/Analytics";
import Loading from "@/components/ui/Loading";
import { useGetDashboardAnalyticsQuery } from "@/redux/features/statsApi/statsApi";

const RiderDashboard = () => {
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
      <RiderAnalytics data={payload} />
    </div>
  );
};

export default RiderDashboard;
