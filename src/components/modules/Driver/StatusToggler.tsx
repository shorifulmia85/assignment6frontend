import Loading from "@/components/ui/Loading";
import { Switch } from "@/components/ui/switch";
import { useIsAvailableMutation } from "@/redux/features/driverApi/driverApi";
import { useGetMeQuery } from "@/redux/features/userApi/userApi";
import { CirclePower } from "lucide-react";
import { useEffect, useState } from "react";

const pillBase =
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium";

const StatusToggler = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  const serverAvailable = Boolean(data?.data?.isAvailable);

  const [isAvailable, { isLoading: statusLoading }] = useIsAvailableMutation();

  // Local optimistic state so UI feels instant
  const [available, setAvailable] = useState<boolean>(serverAvailable);

  useEffect(() => {
    setAvailable(serverAvailable);
  }, [serverAvailable]);

  const handleToggle = async (next: boolean) => {
    const prev = available;
    setAvailable(next);

    try {
      await isAvailable(undefined).unwrap();
    } catch (e) {
      setAvailable(prev);
      console.error("Failed to toggle availability", e);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div>
      {/* Header Card */}
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-background">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative grid place-items-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10">
                <CirclePower
                  className={`h-6 w-6 ${
                    available ? "text-emerald-500" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full ring-4 ring-background ${
                  available ? "bg-emerald-500" : "bg-muted-foreground"
                }`}
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                {available ? "You’re Online" : "You’re Offline"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {available
                  ? "You can receive new ride requests now."
                  : "Go online to start receiving ride requests."}
              </p>

              <span
                className={`${pillBase} mt-3 ${
                  available
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20"
                    : "bg-muted text-muted-foreground ring-1 ring-border"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    available ? "bg-emerald-500" : "bg-muted-foreground"
                  }`}
                />
                {available ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Availability</p>
              <p className="text-sm font-medium">{available ? "On" : "Off"}</p>
            </div>

            <Switch
              checked={available}
              onCheckedChange={handleToggle}
              disabled={statusLoading}
              aria-label="Toggle availability"
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusToggler;
