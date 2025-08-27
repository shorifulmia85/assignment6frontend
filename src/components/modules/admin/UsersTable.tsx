/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUpdateStatusMutation } from "@/redux/features/userApi/userApi";
import toast from "react-hot-toast";
import { UsersTableView } from "./UserTableShow";

// ---- Types ----
export type UserDoc = {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: "RIDER" | "DRIVER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED" | "PENDING";
  isDeleted?: boolean;
  ride?: string[];
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type RoleFilter = "ALL" | UserDoc["role"];
export type StatusFilter = "ALL" | UserDoc["status"];

export type TableQuery = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  page: number;
  limit: number;
  searchTerm: string;
  role: RoleFilter;
  status: StatusFilter;
  sort: string;
};

export type FetchParams = TableQuery;
export type FetchResult = { data: UserDoc[]; total: number };

// ---- Utils ----
function cn(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

export function RolePill({ role }: { role: UserDoc["role"] }) {
  const style =
    role === "ADMIN"
      ? "bg-red-100 text-red-700 border-red-200"
      : "bg-slate-100 text-slate-700 border-slate-200";
  return (
    <span className={cn("px-2 py-0.5 text-xs border rounded-full", style)}>
      {role}
    </span>
  );
}

export function StatusSelect({
  value,
  userId,
  onChanged,
}: {
  value: UserDoc["status"];
  userId: string;
  onChanged?: (next: UserDoc["status"]) => void;
}) {
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();

  return (
    <select
      className="w-36 rounded-md border border-muted bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60"
      value={value}
      disabled={isLoading}
      onChange={async (e) => {
        const next = e.target.value as UserDoc["status"];
        try {
          const payload = {
            status: next,
          };
          const res = await updateStatus({
            status: payload,
            id: userId,
          }).unwrap();
          if (res?.success) {
            toast.success(res?.message);
          }

          onChanged?.(next);
        } catch (err) {}
      }}
    >
      <option value="ACTIVE">ACTIVE</option>
      <option value="BLOCKED">BLOCKED</option>
      <option value="INACTIVE">INACTIVE</option>
    </select>
  );
}

// ---- Toolbar (Tailwind inputs/selects) ----
function UsersToolbar({
  query,
  pageSizeOptions,
  onChange,
}: {
  query: TableQuery;
  pageSizeOptions: number[];
  onChange: (q: TableQuery) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative w-64">
        <input
          className="w-full rounded-md border border-muted bg-background pl-8 pr-7 py-2 text-sm focus:outline-none focus:ring-2"
          placeholder="Search name, email, phone..."
          value={query.searchTerm}
          onChange={(e) =>
            onChange({ ...query, searchTerm: e.target.value, page: 1 })
          }
        />
        <svg
          className="absolute left-2 top-2.5 h-4 w-4 text-slate-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        {/* Clear button */}
        {query.searchTerm && (
          <button
            className="absolute right-2 top-2 text-slate-500 hover:text-slate-700"
            onClick={() => onChange({ ...query, searchTerm: "", page: 1 })}
            aria-label="Clear search"
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Role */}
      <select
        className="rounded-md border border-muted bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        value={query.role}
        onChange={(e) =>
          onChange({ ...query, role: e.target.value as RoleFilter, page: 1 })
        }
      >
        <option value="ALL">Role: All</option>
        <option value="RIDER">RIDER</option>
        <option value="DRIVER">DRIVER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      {/* Status */}
      <select
        className="rounded-md border border-muted bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        value={query.status}
        onChange={(e) =>
          onChange({
            ...query,
            status: e.target.value as StatusFilter,
            page: 1,
          })
        }
      >
        <option value="ALL">Status: All</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="BLOCKED">BLOCKED</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>

      {/* Sort */}
      <select
        className="rounded-md border border-muted bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        value={query.sort}
        onChange={(e) => onChange({ ...query, sort: e.target.value, page: 1 })}
      >
        <option value="-createdAt">Newest first</option>
        <option value="createdAt">Oldest first</option>
      </select>

      {/* Page size */}
      <select
        className="rounded-md border border-muted bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        value={String(query.limit)}
        onChange={(e) =>
          onChange({ ...query, limit: Number(e.target.value), page: 1 })
        }
      >
        {pageSizeOptions.map((n) => (
          <option key={n} value={n}>
            {n} / page
          </option>
        ))}
      </select>

      {/* Reset all */}
      <button
        className="rounded-md border border-muted px-3 py-2 text-sm hover:bg-slate-50"
        onClick={() =>
          onChange({
            page: 1,
            limit: 10,
            searchTerm: "",
            role: "ALL",
            status: "ALL",
            sort: "createdAt:desc",
          })
        }
      >
        Reset
      </button>
    </div>
  );
}

// ---- Main component (controlled + uncontrolled) ----
export type UsersTableProps = {
  controlled?: {
    rows: UserDoc[];
    total: number;
    loading?: boolean;
    error?: string | null;
    query: TableQuery;
    onQueryChange: (q: TableQuery) => void;
    onStatusChange?: (id: string, status: UserDoc["status"]) => void;
  };
  fetchUsers?: (params: FetchParams) => Promise<FetchResult>;
  pageSizeOptions?: number[];
  initialPageSize?: number;
};

export default function UsersTable({
  controlled,
  pageSizeOptions = [5, 10, 20, 50],
}: UsersTableProps) {
  if (controlled) {
    const {
      rows,
      total,
      loading,
      error,
      query,
      onQueryChange,
      onStatusChange,
    } = controlled;
    const totalPages = Math.max(1, Math.ceil(total / Math.max(1, query.limit)));

    return (
      <div className="bg-background rounded-2xl w-full lg:w-5/6 mx-auto md:p-6">
        <div className="mb-4 flex flex-col lg:flex-row  justify-between px-4 space-y-5">
          <h2 className="text-xl font-semibold mt-5">Users</h2>

          <UsersToolbar
            query={query}
            pageSizeOptions={pageSizeOptions}
            onChange={onQueryChange}
          />
        </div>
        <UsersTableView
          rows={rows}
          total={total}
          loading={!!loading}
          error={error}
          query={query}
          totalPages={totalPages}
          onPageChange={(p) => onQueryChange({ ...query, page: p })}
          onStatusChange={onStatusChange}
        />
      </div>
    );
  }
}
