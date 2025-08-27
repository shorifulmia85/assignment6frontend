/* eslint-disable @typescript-eslint/no-explicit-any */
export type GeoResult = { displayName: string; lat: number; lng: number };

export async function geocode(
  address: string,
  limit = 5
): Promise<GeoResult[]> {
  if (!address?.trim()) return [];
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", address);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url.toString(), {
    headers: {
      // browser নিজেই user-agent পাঠায়; rate-limit এড়াতে হালকা ব্যবহার করুন
      "Accept-Language": "en",
      Referer: window.location.origin,
    },
  });
  const data = (await res.json()) as any[];
  return data.map((d) => ({
    displayName: d.display_name,
    lat: parseFloat(d.lat),
    lng: parseFloat(d.lon),
  }));
}
