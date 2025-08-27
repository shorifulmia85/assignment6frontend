import { getStatusClasses } from "@/utils/RidesStatusColor";
import type { RidesTableQuery } from "./RidesTable";
import { formatDate } from "./ulits/formateDate";
import type { IRides } from "@/types/ride";

// ---- Table + pagination ----
export function RidesTableView({
  rows,
  loading,
  query,
  totalPages,
  onPageChange,
}: {
  rows: IRides[];
  total: number;
  loading: boolean;
  error: string | null | undefined;
  query: RidesTableQuery;
  totalPages: number;
  onPageChange: (p: number) => void;
  onStatusChange?: (id: string, status: IRides["status"]) => void;
}) {
  return (
    <>
      <div className="rounded-xl overflow-x-auto border border-muted ">
        <table className="w-full text-sm">
          <thead className="bg-background text-left">
            <tr className="border-b border-muted">
              <th className="px-4 py-2">Serial</th>
              <th className="px-4 py-2 w-[220px]">Rider</th>
              <th className="px-4 py-2 w-[220px]">Driver</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Distance</th>
              <th className="px-4 py-2">Fare</th>
              <th className="px-4 py-2">Ride Time</th>
              <th className="px-4 py-2 w-[350px]">Request</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="overflow-x-auto">
            {rows.map((u, index) => (
              <tr key={u._id}>
                <td className="px-4 py-3">
                  <div>{index + 1}.</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium capitalize">
                        Shoriful Islam
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium capitalize">
                        Jhonkar Mahbub
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="block max-w-[220px] truncate"
                    title={u?.pickup_address.label}
                  >
                    {u?.pickup_address.label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="text-foreground">
                      {u?.destinationAddress?.label || "—"}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span className="flex items-center rounded-full border border-muted bg-background px-2 py-0.5 text-xs ">
                    {u?.distance ?? 0} <span>km</span>
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center rounded-full border border-muted bg-background px-2 py-0.5 text-xs ">
                    {u?.fare ?? 0} BDT
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full border border-muted bg-background px-2 py-0.5 text-xs ">
                    {u?.estimatedRideTime ?? 0}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full border border-muted bg-background px-2 py-0.5 text-xs ">
                    {formatDate(u?.rideTimeStamps?.requestedAt)}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className={getStatusClasses(u?.status, "solid")}>
                    {u?.status}
                  </span>
                </td>
              </tr>
            ))}

            {!loading && rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-foreground"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-muted px-3 py-1.5 text-sm disabled:opacity-50"
            onClick={() => onPageChange(1)}
            disabled={query.page === 1}
          >
            « First
          </button>
          <button
            className="rounded-md border border-muted px-3 py-1.5 text-sm disabled:opacity-50"
            onClick={() => onPageChange(Math.max(1, query.page - 1))}
            disabled={query.page === 1}
          >
            ‹ Prev
          </button>
          <button
            className="rounded-md border border-muted px-3 py-1.5 text-sm disabled:opacity-50"
            onClick={() => onPageChange(query.page + 1)}
            disabled={query.page >= totalPages}
          >
            Next ›
          </button>
          <button
            className="rounded-md border border-muted px-3 py-1.5 text-sm disabled:opacity-50"
            onClick={() => onPageChange(totalPages)}
            disabled={query.page >= totalPages}
          >
            Last »
          </button>
        </div>
      </div>
    </>
  );
}
