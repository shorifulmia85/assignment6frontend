/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Ride = {
  _id: string;
  createdAt?: string;
  rcreatedAt?: string;
  updatedAt?: string;
  rideTimeStamps?: { requestedAt?: string };
  driverId?: string;
  riderId?: string;
  fare?: number;
  status?: string;
  pickup_address?: { label?: string };
  destinationAddress?: { label?: string };
  // optional:
  vehicleInfo?: string;
  driver?: { name?: string; vehicleInfo?: string };
};

const dateOf = (r: Ride) =>
  r.createdAt ||
  r.rcreatedAt ||
  r.rideTimeStamps?.requestedAt ||
  r.updatedAt ||
  "";

const fmtDate = (s?: string) => {
  if (!s) return "—";
  const d = new Date(s);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
};

const money = (n?: number) =>
  typeof n === "number" ? `৳${n.toFixed(2)}` : "—";

function StatusBadge({ s }: { s?: string }) {
  const v = (s || "").toLowerCase();
  const map: Record<string, string> = {
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200",
    requested: "bg-sky-100 text-sky-700 border-sky-200",
    accepted: "bg-amber-100 text-amber-700 border-amber-200",
    picked_up: "bg-amber-100 text-amber-700 border-amber-200",
    in_transit: "bg-amber-100 text-amber-700 border-amber-200",
  };
  const cls = map[v] || "bg-gray-100 text-gray-700 border-gray-200";
  const label =
    v === "picked_up"
      ? "Picked up"
      : v === "in_transit"
      ? "In progress"
      : v.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase()) || "—";
  return (
    <Badge variant="outline" className={`px-2 py-0.5 ${cls}`}>
      {label}
    </Badge>
  );
}

type Props = { rides: Ride[]; pageSize?: number };

export default function RidesTable({ rides = [], pageSize = 8 }: Props) {
  const [query, setQuery] = useState("");
  const [dateOrder, setDateOrder] = useState<"desc" | "asc">("desc");
  const [status, setStatus] = useState<
    | "all"
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "cancelled"
    | "in_progress"
  >("all");
  const [driver] = useState("all");
  const [rider] = useState("all");
  const [page, setPage] = useState(1);

  // filter + sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const statusMatch = (s?: string) => {
      if (status === "all") return true;
      if (status === "in_progress")
        return ["accepted", "picked_up", "in_transit"].includes(
          (s || "").toLowerCase()
        );
      return (s || "").toLowerCase() === status;
    };

    const byQuery = (r: Ride) => {
      if (!q) return true;
      return (
        r._id?.toLowerCase().includes(q) ||
        r.driverId?.toLowerCase().includes(q) ||
        r.riderId?.toLowerCase().includes(q) ||
        r.pickup_address?.label?.toLowerCase().includes(q) ||
        r.destinationAddress?.label?.toLowerCase().includes(q)
      );
    };

    const byDriver = (r: Ride) =>
      driver === "all" ? true : r.driverId === driver;
    const byRider = (r: Ride) => (rider === "all" ? true : r.riderId === rider);

    return rides
      .map((r) => ({ ...r, _when: dateOf(r) }))
      .filter((r) => statusMatch(r.status))
      .filter(byDriver)
      .filter(byRider)
      .filter(byQuery)
      .sort((a: any, b: any) => {
        const ta = new Date(a._when || 0).getTime();
        const tb = new Date(b._when || 0).getTime();
        return dateOrder === "desc" ? tb - ta : ta - tb;
      });
  }, [rides, query, status, driver, rider, dateOrder]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  useEffect(
    () => setPage(1),
    [query, status, driver, rider, dateOrder, pageSize, rides.length]
  );
  const rows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-3 max-w-7xl mx-auto ">
      <div>
        <h1 className="text-2xl font-semibold my-5">My History</h1>
      </div>
      {/* Toolbar */}
      <div className="bg-background rounded-lg p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ID, driver, rider, or address"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date sort */}
          <Select
            value={dateOrder}
            onValueChange={(v: "asc" | "desc") => setDateOrder(v)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Date ↓</SelectItem>
              <SelectItem value="asc">Date ↑</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={status} onValueChange={(v: any) => setStatus(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="requested">Requested</SelectItem>
              <SelectItem value="in_progress">In progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Responsive table (scrolls on small screens) */}
      <div className="overflow-x-auto rounded-xl p-3 bg-background">
        <Table className="min-w-[900px]">
          <TableHeader className="bg-muted/60 sticky top-0 z-[1]">
            <TableRow>
              <TableHead className="w-[110px]">RIDE ID</TableHead>
              <TableHead>DATE</TableHead>

              <TableHead className="hidden md:table-cell">PICKUP</TableHead>
              <TableHead className="hidden md:table-cell">
                DESTINATION
              </TableHead>
              <TableHead className="text-right">AMOUNT</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-muted-foreground"
                >
                  No results
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r._id} className="hover:bg-muted/40">
                  <TableCell className="font-medium whitespace-nowrap">
                    #{r._id.slice(-5)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {fmtDate(dateOf(r))}
                  </TableCell>

                  <TableCell className="hidden md:table-cell max-w-[320px] truncate">
                    {r.pickup_address?.label || "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[320px] truncate">
                    {r.destinationAddress?.label || "—"}
                  </TableCell>

                  <TableCell className="text-right whitespace-nowrap">
                    {money(r.fare)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge s={r.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          Showing {rows.length ? (currentPage - 1) * pageSize + 1 : 0}–
          {(currentPage - 1) * pageSize + rows.length} of {filtered.length}{" "}
          results
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            const n = i + 1;
            return (
              <Button
                key={n}
                variant={n === currentPage ? "default" : "ghost"}
                className="h-7 px-2"
                onClick={() => setPage(n)}
              >
                {n}
              </Button>
            );
          })}
          {totalPages > 5 && <span className="px-1">…</span>}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
