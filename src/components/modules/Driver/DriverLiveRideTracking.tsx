/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from "react";
import { MapPin, MoveRight, Clock } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IRide } from "@/types/ride";
import LiveTrackingRides from "@/components/LiveRideTracking";
import LiveDot from "@/components/ui/LiveUpdateDot";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useUpdateRidesMutation } from "@/redux/features/rideApi/rideApi";
import toast from "react-hot-toast";

function formatDate(dt?: string | Date) {
  if (!dt) return "";
  const d = typeof dt === "string" ? new Date(dt) : dt;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function StatusBadge({ status }: { status?: IRide["status"] }) {
  const map: Record<string, string> = {
    requested: "bg-yellow-100 text-yellow-700 border-yellow-200",
    accepted: "bg-blue-100 text-blue-700 border-blue-200",
    picked_up: "bg-indigo-100 text-indigo-700 border-indigo-200",
    in_transit: "bg-purple-100 text-purple-700 border-purple-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  };
  const cls = map[String(status ?? "")] ?? "bg-muted text-foreground";
  return (
    <Badge variant="outline" className={cls + " px-2 py-0.5"}>
      {String(status ?? "").replace("_", " ")}
    </Badge>
  );
}

const rideStatus = [
  {
    id: 1,
    label: "Accepted",
    value: "ACCEPTED",
  },
  {
    id: 2,
    label: "Picked Up",
    value: "PICKED_UP",
  },
  {
    id: 3,
    label: "In Transit",
    value: "IN_TRANSIT",
  },
  {
    id: 4,
    label: "Completed",
    value: "COMPLETED",
  },
];

export default function DriverLiveRideTracking({ ride }: { ride: IRide }) {
  const createdAt = formatDate(ride?.createdAt);
  const etaMinutes = ride?.estimatedRideTime
    ? Math.round(ride.estimatedRideTime)
    : undefined;

  const pickupLabel =
    ride?.pickup_address?.label ??
    (ride?.pickup ? `${ride.pickup.lat}, ${ride.pickup.lng}` : "");
  const destLabel =
    ride?.destinationAddress?.label ??
    (ride?.destination
      ? `${ride.destination.lat}, ${ride.destination.lng}`
      : "");

  const distanceKm = useMemo(
    () => (ride?.distance ? `${ride.distance} km` : undefined),
    [ride?.distance]
  );

  const [updateRides, { isLoading }] = useUpdateRidesMutation();
  const form = useForm<{ status: string }>({
    defaultValues: { status: ride?.status?.toUpperCase() ?? "" },
  });
  useEffect(() => {
    form.setValue("status", ride?.status?.toUpperCase() ?? "");
  }, [ride?.status, form]);

  return (
    <div className=" rounded-2xl">
      {/* Top bar */}
      <div className="sticky top-0 z-20 rounded-2xl bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="mx-auto max-w-6xl  py-3 flex flex-col lg:flex-row items-center  gap-3">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <LiveDot active={true} size={14} />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold">Live Ride Tracking</h1>
              <StatusBadge status={ride?.status} />
            </div>
            <p className="text-xs text-muted-foreground">
              Ride ID: <span className="font-mono">{ride?._id}</span> · Created{" "}
              {createdAt}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {etaMinutes ? (
              <Badge variant="outline" className="px-2 py-0.5">
                <Clock className="mr-1 size-3.5" /> ETA {etaMinutes} min
              </Badge>
            ) : null}
            {distanceKm ? (
              <Badge variant="outline" className="px-2 py-0.5">
                <MoveRight className="mr-1 size-3.5" /> {distanceKm}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl py-5 grid grid-cols-1 lg:grid-cols-5 gap-5 ">
        {/* Left: Map + ride summary */}
        <div className="lg:col-span-3 space-y-5">
          {/* Map Card */}
          <Card className="overflow-hidden border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Replace this with your actual map (react-leaflet / mapbox-gl etc.) */}
              <div
                id="map"
                className="h-[360px] w-full bg-[linear-gradient(45deg,var(--tw-prose-invert-headings,rgba(0,0,0,0.04))_25%,transparent_25%),linear-gradient(-45deg,var(--tw-prose-invert-headings,rgba(0,0,0,0.04))_25%,transparent_25%),linear-gradient(45deg,transparent_75%,var(--tw-prose-invert-headings,rgba(0,0,0,0.04))_75%),linear-gradient(-45deg,transparent_75%,var(--tw-prose-invert-headings,rgba(0,0,0,0.04))_75%)] [background-size:20px_20px] rounded-b-xl"
              />
            </CardContent>
          </Card>

          {/* Route summary */}
          <Card className="border-none">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full p-1.5 bg-primary/10 text-primary">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pickup</p>
                      <p className="text-sm font-medium">{pickupLabel}</p>
                    </div>
                  </div>

                  <div className="my-3 ml-6 h-6 w-px bg-border" />

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full p-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Destination
                      </p>
                      <p className="text-sm font-medium">{destLabel}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border p-3">
                    <p className="text-xs text-muted-foreground">Fare</p>
                    <p className="text-sm font-semibold">
                      {ride?.fare ? `${ride.fare} ৳` : "—"}
                    </p>
                  </div>
                  <div className="rounded-xl border p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm font-semibold capitalize">
                      {String(ride?.status ?? "").replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-2">
          <Card className="h-full border-none">
            <div className="flex items-center justify-between px-4">
              <h1 className="font-semibold">Ride Progress</h1>
              <div>
                <div>
                  <Form {...form}>
                    <form>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Update status</FormLabel>
                            <Select
                              disabled={isLoading}
                              value={field.value}
                              onValueChange={async (nextVal) => {
                                if (nextVal === field.value) return;

                                const prev = field.value;

                                field.onChange(nextVal);
                                const payload = { status: nextVal };
                                try {
                                  const res = await updateRides({
                                    id: ride?._id,
                                    payload,
                                  }).unwrap();
                                  if (res?.success) {
                                    toast.success(res?.message);
                                  }
                                } catch (e: any) {
                                  field.onChange(prev);
                                  toast.error(e?.data?.message);
                                }
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {rideStatus?.map((item) => (
                                  <SelectItem
                                    defaultValue={ride?.status}
                                    key={item?.id}
                                    value={item?.value}
                                  >
                                    {item?.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
            </div>
            <div className="h-1 border-b border-muted" />
            <CardContent>
              {/* Your existing timeline component */}
              <LiveTrackingRides ride={ride} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
