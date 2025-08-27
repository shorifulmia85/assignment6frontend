/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeDriverStatusMutation } from "@/redux/features/driverApi/driverApi";
import toast from "react-hot-toast";

type VehicleInfo = { model?: string; license?: string };
type UserMini = {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: "DRIVER" | "RIDER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED" | "PENDING";
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PendingDriverRow = {
  _id: string; // Driver doc id
  userId: UserMini; // populated user
  isApproved: "PENDING" | "APPROVED" | "SUSPENDED" | "REJECTED"; // should be false here
  isAvailable: boolean;
  drivingLicense?: string;
  totalEarnings?: number;
  vehicleInfo?: VehicleInfo;
  createdAt: string;
  updatedAt: string;
};

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs",
        className
      )}
    >
      {children}
    </span>
  );
}

function formatBDT(n?: number) {
  if (n == null) return "৳0";
  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `৳${Math.round(n).toLocaleString()}`;
  }
}

function formatDateISO(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export type PendingDriversTableProps = {
  rows: PendingDriverRow[];
  loading?: boolean;
  error?: string | null;
  onToggleAvailable?: () => void | Promise<void>;
};

export default function PendingDriversTable({
  rows,
  loading,
  error,
}: PendingDriversTableProps) {
  const [changeDriverStatus, { isLoading }] =
    useChangeDriverStatusMutation(undefined);

  const handleDriverStatus = async (value: string, id: string) => {
    const payload = {
      isApproved: value,
    };
    try {
      const res = await changeDriverStatus({ payload, id }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error: any) {
      if (!error?.data?.success) {
        toast.error(error?.data?.message);
      }
    }
  };
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pending Drivers</h2>
        <div className="text-sm text-muted-foreground">
          {loading
            ? "Loading…"
            : error
            ? `Error: ${error}`
            : `Total: ${rows.length}`}
        </div>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr className="border-b border-border">
              <th className="px-4 py-2 w-[260px]">Driver</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">License</th>
              <th className="px-4 py-2">Vehicle</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Earnings</th>
              <th className="px-4 py-2">Joined</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && rows.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No pending drivers
                </td>
              </tr>
            )}

            {rows.map((r) => (
              <tr key={r._id} className="border-b border-border/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/80">
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
                      <div className="font-medium">{r.userId?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ID: {r._id}
                      </div>
                      <div className="mt-1">
                        <Pill className="border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                          Pending approval
                        </Pill>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div
                      className="max-w-[220px] truncate"
                      title={r.userId?.email}
                    >
                      {r.userId?.email}
                    </div>
                    <div className="text-muted-foreground">
                      {r.userId?.phoneNumber || "—"}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">{r.drivingLicense || "—"}</td>
                <td className="px-4 py-3">
                  {r.vehicleInfo?.model ? (
                    <>
                      <div className="font-medium">{r.vehicleInfo.model}</div>
                      <div className="text-xs text-muted-foreground">
                        {r.vehicleInfo.license}
                      </div>
                    </>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="px-4 py-3">
                  {r.isAvailable ? (
                    <Pill className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      Available
                    </Pill>
                  ) : (
                    <Pill className="border-slate-200 bg-slate-50 text-slate-700 dark:bg-slate-500/15 dark:text-slate-200">
                      Unavailable
                    </Pill>
                  )}
                </td>

                <td className="px-4 py-3">{formatBDT(r.totalEarnings)}</td>
                <td className="px-4 py-3">{formatDateISO(r.createdAt)}</td>

                <td className="px-4 py-3 flex items-center justify-end gap-2">
                  <Select
                    value={r?.isApproved}
                    disabled={isLoading}
                    onValueChange={(v) => handleDriverStatus(v, r?.userId?._id)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Set Status</SelectLabel>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="SUSPENDED">Suspended</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="md:hidden divide-y divide-border">
        {!loading && rows.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No pending drivers
          </div>
        )}

        {rows.map((r) => (
          <div key={r._id}>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{r.userId?.name}</div>
                <div className="text-xs text-muted-foreground">ID: {r._id}</div>
              </div>
              <Pill className="border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                Pending
              </Pill>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Email</div>
                <div className="truncate">{r.userId?.email}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Phone</div>
                <div>{r.userId?.phoneNumber || "—"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">License</div>
                <div>{r.drivingLicense || "—"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Vehicle</div>
                <div>{r.vehicleInfo?.model || "—"}</div>
                <div className="text-xs text-muted-foreground">
                  {r.vehicleInfo?.license}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Earnings</div>
                <div>{formatBDT(r.totalEarnings)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Joined</div>
                <div>{formatDateISO(r.createdAt)}</div>
              </div>

              <div className="block">
                {" "}
                <Select
                  value={r?.isApproved}
                  disabled={isLoading}
                  onValueChange={(v) => handleDriverStatus(v, r?.userId?._id)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Set Status</SelectLabel>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="APPROVE">Approved</SelectItem>
                      <SelectItem value="SUSPENDED">Suspended</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
