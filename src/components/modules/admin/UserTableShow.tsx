import { cn } from "@/lib/utils";
import { formatDate } from "./ulits/formateDate";
import {
  RolePill,
  StatusSelect,
  type TableQuery,
  type UserDoc,
} from "./UsersTable";

// ---- Table + pagination ----
export function UsersTableView({
  rows,
  loading,
  query,
  totalPages,
  onPageChange,
  onStatusChange,
}: {
  rows: UserDoc[];
  total: number;
  loading: boolean;
  error: string | null | undefined;
  query: TableQuery;
  totalPages: number;
  onPageChange: (p: number) => void;
  onStatusChange?: (id: string, status: UserDoc["status"]) => void;
}) {
  return (
    <>
      <div className="rounded-xl overflow-x-auto border border-muted overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background text-left">
            <tr className="border-b border-muted">
              <th className="px-4 py-2 w-[220px]">User</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Rides</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr
                key={u._id}
                className={cn(
                  "border-b border-slate-100",
                  u.isDeleted && "opacity-60"
                )}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium capitalize">{u.name}</div>
                      <div className="text-xs text-slate-500">ID: {u._id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="block max-w-[220px] truncate"
                    title={u.email}
                  >
                    {u.email}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.66 12.66 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.66 12.66 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-foreground">
                      {u.phoneNumber || "—"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <RolePill role={u.role} />
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full border border-muted bg-background px-2 py-0.5 text-xs ">
                    {u.ride?.length ?? 0}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusSelect
                    value={u.status}
                    onChanged={(v) => onStatusChange?.(u._id, v)}
                    userId={u._id}
                  />
                </td>

                <td className="px-4 py-3">{formatDate(u.createdAt)}</td>
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
