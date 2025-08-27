import MapPicker from "@/components/modules/Rider/MapPicker";

export default function MapDemo() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Location Picker (Free OSM)</h1>
      <MapPicker />
    </div>
  );
}
