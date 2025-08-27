/* eslint-disable @typescript-eslint/no-explicit-any */
import PendingDriversTable from "@/components/modules/admin/PendingDriverTable";
import { useGetPendingDriverQuery } from "@/redux/features/driverApi/driverApi";

const PendingDrivers = () => {
  const { data, isLoading } = useGetPendingDriverQuery(undefined);

  return (
    <div className="max-7xl mx-auto px-4 mt-20">
      <PendingDriversTable
        rows={data?.data ?? []}
        loading={isLoading}
        error={Error ? String((Error as any)?.message || "Fetch failed") : null}
      />
    </div>
  );
};

export default PendingDrivers;
