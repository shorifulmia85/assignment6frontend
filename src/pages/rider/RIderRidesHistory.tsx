import { useMemo } from "react";
import RidesTable from "@/components/modules/Rider/HistoryTable";
import Loading from "@/components/ui/Loading";
import { useGetMyRidesQuery } from "@/redux/features/rideApi/rideApi";

const RiderRidesHistory = () => {
  const { data, isLoading, isError } = useGetMyRidesQuery(undefined);

  // array fallback so RidesTable always gets []
  const rides = useMemo(
    () => (Array.isArray(data?.data) ? data!.data : []),
    [data]
  );

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-sm text-red-600">Failed to load rides.</div>;

  return (
    <div>
      <RidesTable rides={rides} />
    </div>
  );
};

export default RiderRidesHistory;
