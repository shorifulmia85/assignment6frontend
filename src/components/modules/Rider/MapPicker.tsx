/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import { haversineKm } from "@/utils/distance";
import { geocode, type GeoResult } from "@/utils/geoCode";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRequestRideMutation } from "@/redux/features/rideApi/rideApi";
import toast from "react-hot-toast";

// Debounce utility
function debounce<F extends (...args: any[]) => void>(func: F, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

type Point = { lat: number; lng: number };

function FitBounds({
  origin,
  destination,
}: {
  origin?: Point | null;
  destination?: Point | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (origin && destination) {
      const bounds: LatLngTuple[] = [
        [origin.lat, origin.lng],
        [destination.lat, destination.lng],
      ];
      map.fitBounds(bounds, { padding: [40, 40] });
    } else if (origin) {
      map.setView([origin.lat, origin.lng], 14);
    }
  }, [origin, destination, map]);
  return null;
}

export default function MapPicker() {
  const form = useForm();
  const [originInput, setOriginInput] = useState("");
  const [destInput, setDestInput] = useState("");
  const [origin, setOrigin] = useState<Point | null>(null);
  const [destination, setDestination] = useState<Point | null>(null);
  const [originSug, setOriginSug] = useState<GeoResult[]>([]);
  const [destSug, setDestSug] = useState<GeoResult[]>([]);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [line, setLine] = useState<LatLngTuple[] | null>(null);

  const center = useMemo<LatLngExpression>(() => [23.8103, 90.4125], []);

  // Debounced search
  const searchOrigin = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query) return setOriginSug([]);
        const res = await geocode(query);
        setOriginSug(res);
      }, 300),
    []
  );

  const searchDest = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query) return setDestSug([]);
        const res = await geocode(query);
        setDestSug(res);
      }, 300),
    []
  );

  // Pick a location
  const pick = (type: "o" | "d", g: GeoResult) => {
    const p = { lat: g.lat, lng: g.lng };
    if (type === "o") {
      setOrigin(p);
      setOriginInput(g.displayName);
      setOriginSug([]);
    } else {
      setDestination(p);
      setDestInput(g.displayName);
      setDestSug([]);
    }
  };
  // (Optional) OSRM দিয়ে road distance + polyline চাইলে:
  useEffect(() => {
    async function run() {
      if (!origin || !destination) return;
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        const route = data?.routes?.[0];
        if (route) {
          setDistanceKm(Number((route.distance / 1000).toFixed(2))); // meters → km
          // route.geometry.coordinates => [lng,lat][] → Polyline এ [lat,lng][]
          const coords: LatLngTuple[] = route.geometry.coordinates.map(
            (c: [number, number]) => [c[1], c[0]]
          );
          setLine(coords);
        }
      } catch (_) {}
    }
    run();
  }, [origin, destination]);
  // Distance + polyline
  useEffect(() => {
    if (origin && destination) {
      setDistanceKm(Number(haversineKm(origin, destination).toFixed(2)));
      setLine([
        [origin.lat, origin.lng],
        [destination.lat, destination.lng],
      ]);
    } else {
      setDistanceKm(null);
      setLine(null);
    }
  }, [origin, destination]);

  const [requestRide, { isLoading }] = useRequestRideMutation();

  const onSubmit = async () => {
    const payload = {
      pickup: {
        lat: origin!.lat,
        lng: origin!.lng,
      },
      destination: { lat: destination!.lat, lng: destination!.lng },
    };

    try {
      const res = await requestRide(payload).unwrap();
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
    <div className="max-w-7xl mx-auto  space-y-4">
      <div>
        <h1 className="text-2xl font-semibold my-10">Request a Ride</h1>
      </div>
      <div className="grid grid-cols-12 gap-5">
        {/* Search inputs */}
        <div className="sm:order-1 order-2 rounded-xl p-5 bg-card shadow-3xl col-span-12 lg:col-span-6 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Your Location */}
              <FormField
                control={form.control}
                name="origin"
                render={() => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel>Your location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your location..."
                        value={originInput}
                        onChange={(e) => {
                          setOriginInput(e.target.value);
                          searchOrigin(e.target.value);
                        }}
                      />
                    </FormControl>
                    {originSug.length > 0 && (
                      <ul className="mt-2 border rounded divide-y max-h-48 overflow-auto bg-background">
                        {originSug.map((g, i) => (
                          <li
                            key={i}
                            className="px-3 py-2 hover:bg-accent cursor-pointer"
                            onClick={() => pick("o", g)}
                          >
                            {g.displayName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </FormItem>
                )}
              />

              {/* Destination */}
              <FormField
                control={form.control}
                name="destination"
                render={() => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type destination..."
                        value={destInput}
                        onChange={(e) => {
                          setDestInput(e.target.value);
                          searchDest(e.target.value);
                        }}
                      />
                    </FormControl>
                    {destSug.length > 0 && (
                      <ul className="mt-2 border rounded divide-y max-h-48 overflow-auto bg-background">
                        {destSug.map((g, i) => (
                          <li
                            key={i}
                            className="px-3 py-2 hover:bg-accent cursor-pointer"
                            onClick={() => pick("d", g)}
                          >
                            {g.displayName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </FormItem>
                )}
              />

              {/* Summary + Submit */}
              <div className="flex items-center justify-between gap-4 mt-5">
                <div className="text-2xl font-semibold">
                  <h1>Distance :{distanceKm ? distanceKm : 0} km</h1>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button disabled={isLoading} type="submit">
                  {isLoading ? "wait..." : "Create Ride"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Map */}
        <div className="sm:order-2 shadow-lg rounded-xl col-span-12 lg:col-span-6 h-[420px] w-full z-9 overflow-hidden ">
          <MapContainer center={center} zoom={12} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
            />
            <FitBounds origin={origin} destination={destination} />
            {origin && <Marker position={[origin.lat, origin.lng]} />}
            {destination && (
              <Marker position={[destination.lat, destination.lng]} />
            )}
            {line && <Polyline positions={line} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
