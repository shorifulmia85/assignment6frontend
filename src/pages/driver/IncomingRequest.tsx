import IncomingRequestCard from "@/components/modules/Driver/IncomingRequestCard";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetAllRidesQuery } from "@/redux/features/rideApi/rideApi";
import type { IDriverRid } from "@/types/ride";

const IncomingRequest = () => {
  const { data, isLoading } = useGetAllRidesQuery(undefined);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="bg-background rounded-2xl p-5 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full mt-20 max-w-7xl">
      <h1 className="text-lg font-medium">
        <span className="inline-flex items-center gap-2">
          {data?.data?.length > 0 ? (
            <p className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              {data?.data?.length} Active Requests
            </p>
          ) : (
            <p className="inline-flex items-center justify-center rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">
              No requested ride found
            </p>
          )}
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {data?.data?.map((item: IDriverRid) => (
          <IncomingRequestCard rides={item} loading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default IncomingRequest;
