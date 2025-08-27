/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { MapPin, MoveRight, Phone, Clock, Car, User } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IRide } from "@/types/ride";
import LiveTrackingRides from "@/components/LiveRideTracking";
import LiveDot from "@/components/ui/LiveUpdateDot";
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

export default function LiveRideTrackingPage({ ride }: { ride: IRide }) {
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

  const driverName = ride?.driverId?.name;
  const phoneNumber = ride?.driverId?.phoneNumber;
  const vehicle =
    (ride as any)?.driver?.vehicleInfo ?? (ride as any)?.vehicleInfo;

  const distanceKm = useMemo(
    () => (ride?.distance ? `${ride.distance} km` : undefined),
    [ride?.distance]
  );
  const [updateRides, { isLoading }] = useUpdateRidesMutation();

  const handleAcceptRequest = async (id: string) => {
    const payload = { status: "CANCELLED" };

    try {
      const res = await updateRides({ payload, id }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "something went wrong");
    }
  };
  return (
    <div className=" rounded-2xl">
      {/* Top bar */}
      <div className="sticky top-0 z-20 rounded-2xl bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="mx-auto max-w-7xl  py-3 flex flex-col lg:flex-row items-center  gap-3">
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

          {/* Driver Card */}
          <Card className="border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Driver</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{driverName}</p>
                  <p className="text-sm font-medium">{phoneNumber}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Car className="size-3.5" />
                    <span>{vehicle ?? "—"}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 size-4" />
                  Call
                </Button>
                <Button size="sm">Share Trip</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-2">
          <Card className="h-full border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Ride Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Your existing timeline component */}
              <LiveTrackingRides ride={ride} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom sticky actions */}
      <div className="sticky bottom-0 z-20 shadow-lg bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-2">
          <Button
            variant="destructive"
            disabled={isLoading || ride?.status === "cancelled"}
            onClick={() => handleAcceptRequest(ride?._id)}
          >
            {isLoading ? "Wait.." : "Accepted"}
          </Button>
          <Button className="rounded-xl">Message Driver</Button>
          <div className="ml-auto text-xs text-muted-foreground">
            Last update: {formatDate(ride?.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
