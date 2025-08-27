import { Check, X } from "lucide-react";

const featuresData = [
  { feature: "Ride requests", Rider: true, Driver: false, Admin: false },
  { feature: "Ride scheduling", Rider: true, Driver: false, Admin: true },
  { feature: "Ride tracking", Rider: true, Driver: true, Admin: true },
  { feature: "Payment processing", Rider: true, Driver: true, Admin: true },
  { feature: "Driver verification", Rider: false, Driver: true, Admin: true },
  { feature: "Vehicle verification", Rider: false, Driver: true, Admin: true },
  { feature: "User management", Rider: false, Driver: false, Admin: true },
  {
    feature: "Reporting and analytics",
    Rider: false,
    Driver: false,
    Admin: true,
  },
  {
    feature: "Customizable policies",
    Rider: false,
    Driver: false,
    Admin: true,
  },
  { feature: "Dedicated support", Rider: false, Driver: false, Admin: true },
];

function BoolIcon({ value }: { value: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-sm font-medium ${
        value ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
      }`}
      aria-label={value ? "true" : "false"}
    >
      {value ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      {value ? "true" : "false"}
    </span>
  );
}

const Features = () => {
  return (
    <div className="w-full">
      <div className="mx-auto mt-5 max-w-7xl px-4">
        <h1 className="text-xl font-semibold lg:text-4xl">
          Swift Ride Features
        </h1>

        <div className="bg-background mt-5 overflow-x-auto border rounded-2xl">
          <table className="min-w-full overflow-hidden rounded-2xl border border-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-700">
                <th className="px-5 py-3 text-sm font-semibold">Features</th>
                <th className="px-5 py-3 text-sm font-semibold text-center">
                  Rider
                </th>
                <th className="px-5 py-3 text-sm font-semibold text-center">
                  Driver
                </th>
                <th className="px-5 py-3 text-sm font-semibold text-center">
                  Admin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {featuresData.map((row) => (
                <tr key={row.feature} className="text-sm">
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {row.feature}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <BoolIcon value={row.Rider} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <BoolIcon value={row.Driver} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <BoolIcon value={row.Admin} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Features;
