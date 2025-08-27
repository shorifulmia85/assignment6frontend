/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import Loading from "@/components/ui/Loading";
import { useGetAllRidesQuery } from "@/redux/features/rideApi/rideApi";
import type { IRides } from "@/types/ride";
import RideTable, {
  type RidesTableQuery,
} from "@/components/modules/admin/RidesTable";

const INITIAL: RidesTableQuery = {
  page: 1,
  limit: 10,
  status: "ALL",
  dateFrom: "",
  dateTo: "",
};

export default function UserManagement() {
  const [query, setQuery] = useState<RidesTableQuery>(INITIAL);

  const params = useMemo(
    () => ({
      page: query.page,
      limit: query.limit,
      status: query.status === "ALL" ? undefined : query.status,
      dateFrom: query?.dateFrom,
      dateTo: query?.dateTo,
    }),
    [query.page, query.limit, query.status, query?.dateFrom, query?.dateTo]
  );

  const { data, isLoading, isError, error } = useGetAllRidesQuery(params, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    // pollingInterval: POLL_MS,
  });

  const rows: IRides[] = data?.data ?? [];
  const total: number = data?.meta ?? 0;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <RideTable
      controlled={{
        rows,
        total,
        loading: isLoading,
        error: isError
          ? String((error as any)?.message || "Fetch failed")
          : null,
        query,
        onQueryChange: setQuery,
      }}
    />
  );
}
