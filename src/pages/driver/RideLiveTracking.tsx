import { useMemo } from "react";
import {
  useGetMyRidesQuery,
  useGetSingleRideQuery,
} from "@/redux/features/rideApi/rideApi";
import type { IRide } from "@/types/ride";
import Loading from "@/components/ui/Loading";
import DriverLiveRideTracking from "@/components/modules/Driver/DriverLiveRideTracking";

const RideLiveTracking = () => {
  const { data, isLoading } = useGetMyRidesQuery(undefined);

  const latestRide: IRide | undefined = useMemo(() => {
    const ts = (r: IRide) => new Date(r.updatedAt ?? r.createdAt).getTime();

    return data?.data
      ?.slice()
      ?.sort((a: IRide, b: IRide) => ts(b) - ts(a))?.[0];
  }, [data]);

  const { data: singleRide, isLoading: rideLoading } = useGetSingleRideQuery(
    latestRide?._id,
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  if (isLoading || rideLoading) return <Loading />;

  if (!latestRide) {
    return <div className="text-sm text-muted-foreground">No rides found.</div>;
  }

  return <DriverLiveRideTracking ride={singleRide?.data} />;
};

export default RideLiveTracking;
