/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IRides } from "@/types/ride";
import { RidesTableView } from "./RidesTableShow";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

export type StatusFilter = "ALL" | IRides["status"];

export type RidesTableQuery = {
  page: number;
  limit: number;
  status: StatusFilter;
  dateFrom: string;
  dateTo: string;
};

export type FetchParams = RidesTableQuery;
export type FetchResult = { data: IRides[]; total: number };

// ---- Toolbar (Tailwind inputs/selects) ----
function RidesToolbar({
  query,
  pageSizeOptions,
  onChange,
}: {
  query: RidesTableQuery;
  pageSizeOptions: number[];
  onChange: (q: RidesTableQuery) => void;
}) {
  const toYMD = (d: Date) => d.toISOString().slice(0, 10);

  const form = useForm<{ dateFrom: Date | null; dateTo: Date | null }>({
    defaultValues: { dateFrom: null, dateTo: null },
  });

  const onApply = form.handleSubmit(({ dateFrom, dateTo }) => {
    if (!dateFrom || !dateTo) return;

    const [from, to] =
      dateFrom > dateTo ? [dateTo, dateFrom] : [dateFrom, dateTo];

    onChange({
      ...query,
      dateFrom: toYMD(from),
      dateTo: toYMD(to),
      page: 1,
    });
  });
  const onReset = () => {
    form.reset({ dateFrom: null, dateTo: null });
    onChange({ ...query, dateFrom: "", dateTo: "", page: 1 });
  };
  const fromVal = form.watch("dateFrom");
  const toVal = form.watch("dateTo");
  const canApply = !!fromVal && !!toVal;
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <Form {...form}>
          <form className="space-y-6 flex flex-col lg:flex-row items-center gap-5 lg:gap-6">
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Start Date */}
              <FormField
                control={form.control}
                name="dateFrom"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(d) => field.onChange(d ?? null)}
                          disabled={(d) =>
                            d > new Date() || d < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="dateTo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(d) => field.onChange(d ?? null)}
                          disabled={(d) => {
                            const from = form.getValues("dateFrom");
                            return (
                              d > new Date() ||
                              d < new Date("1900-01-01") ||
                              (!!from && d < from)
                            );
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button type="button" onClick={onApply} disabled={!canApply}>
                Apply
              </Button>
              <Button type="button" variant="outline" onClick={onReset}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div>
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
          <option value="requested">Requested</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
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
              status: "ALL",
              dateFrom: "",
              dateTo: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ---- Main component (controlled + uncontrolled) ----
export type RidesTableProps = {
  controlled?: {
    rows: IRides[];
    total: number;
    loading?: boolean;
    error?: string | null;
    query: RidesTableQuery;
    onQueryChange: (q: RidesTableQuery) => void;
    onStatusChange?: (id: string, status: IRides["status"]) => void;
  };
  fetchUsers?: (params: FetchParams) => Promise<FetchResult>;
  pageSizeOptions?: number[];
  initialPageSize?: number;
};

export default function RideTable({
  controlled,
  pageSizeOptions = [5, 10, 20, 50],
}: RidesTableProps) {
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
          <h2 className="text-xl font-semibold mt-5">Rides</h2>

          <RidesToolbar
            query={query}
            pageSizeOptions={pageSizeOptions}
            onChange={onQueryChange}
          />
        </div>
        <RidesTableView
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
