/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckIcon,
  XCircle,
  MapPin,
  Car,
  Clock,
  CreditCard,
} from "lucide-react";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import type { IRide } from "@/types/ride";

type RideStatus =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled";

const NORMAL_FLOW: RideStatus[] = [
  "requested",
  "accepted",
  "picked_up",
  "in_transit",
  "completed",
];

const CANCELLED_FLOW: RideStatus[] = [
  "requested",
  "accepted",
  "picked_up",
  "in_transit",
  "cancelled", // completed-এর বদলে cancelled
];

const LABELS: Record<RideStatus, string> = {
  requested: "Ride requested",
  accepted: "Driver accepted",
  picked_up: "Picked up",
  in_transit: "In transit",
  completed: "Completed",
  cancelled: "Cancelled",
};

function normalizeStatus(s?: string): RideStatus | undefined {
  if (!s) return undefined;
  const v = s.toLowerCase();
  if (v === "pickedup" || v === "picked_up") return "picked_up";
  if (v === "intransit" || v === "in_transit") return "in_transit";
  if (["requested", "accepted", "completed", "cancelled"].includes(v)) {
    return v as RideStatus;
  }
  return undefined;
}

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

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
}) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {icon}
      <span className="font-medium text-foreground">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

type Props = { ride: IRide };

export default function LiveTrackingRides({ ride }: Props) {
  const status = normalizeStatus(ride?.status) ?? "requested";

  const FLOW = status === "cancelled" ? CANCELLED_FLOW : NORMAL_FLOW;

  const tsKeyFor = (s: RideStatus) =>
    s === "requested"
      ? "requestedAt"
      : s === "accepted"
      ? "acceptedAt"
      : s === "picked_up"
      ? "pickedUpAt"
      : s === "in_transit"
      ? "inTransitAt"
      : s === "completed"
      ? "completedAt"
      : "cancelledAt";

  const steps = FLOW.map((s) => {
    // @ts-expect-error dynamic
    const when = ride?.rideTimeStamps?.[tsKeyFor(s)];
    const date = when ? formatDate(when) : "";

    const content: React.ReactNode = (
      <div className="space-y-1">
        {s === "requested" && (
          <>
            <Row
              icon={<MapPin size={14} />}
              label="Pickup"
              value={
                ride?.pickup_address?.label ??
                (ride?.pickup
                  ? `${ride?.pickup?.lat}, ${ride?.pickup?.lng}`
                  : undefined)
              }
            />
            <Row
              icon={<MapPin size={14} />}
              label="Destination"
              value={
                ride?.destinationAddress?.label ??
                (ride?.destination
                  ? `${ride?.destination?.lat}, ${ride?.destination?.lng}`
                  : undefined)
              }
            />
            <Row icon={<Clock size={14} />} label="Requested at" value={date} />
          </>
        )}

        {s === "accepted" && (
          <>
            <Row
              icon={<Car size={14} />}
              label="Driver"
              value={(ride as any)?.driver?.name}
            />
            <Row
              icon={<Car size={14} />}
              label="Vehicle"
              value={
                (ride as any)?.driver?.vehicleInfo ?? (ride as any)?.vehicleInfo
              }
            />
            <Row icon={<Clock size={14} />} label="Accepted at" value={date} />
          </>
        )}

        {s === "picked_up" && (
          <Row icon={<Clock size={14} />} label="Picked up at" value={date} />
        )}

        {s === "in_transit" && (
          <>
            <Row icon={<Clock size={14} />} label="Started at" value={date} />
            <Row
              icon={<MapPin size={14} />}
              label="Distance"
              value={ride?.distance ? `${ride.distance} km` : undefined}
            />
            <Row
              icon={<Clock size={14} />}
              label="ETA"
              value={
                ride?.estimatedRideTime
                  ? `${Math.round(ride.estimatedRideTime)} min`
                  : undefined
              }
            />
          </>
        )}

        {s === "completed" && (
          <>
            <Row icon={<Clock size={14} />} label="Completed at" value={date} />
            <Row
              icon={<CreditCard size={14} />}
              label="Fare"
              value={ride?.fare ? `${ride.fare}` : undefined}
            />
          </>
        )}

        {s === "cancelled" && (
          <Row icon={<Clock size={14} />} label="Cancelled at" value={date} />
        )}
      </div>
    );

    return { key: s as RideStatus, title: LABELS[s], date, content };
  });

  // current step
  const currentStep =
    status === "cancelled"
      ? steps.length // last = cancelled
      : Math.max(1, NORMAL_FLOW.indexOf(status as any) + 1);

  return (
    <Timeline value={currentStep}>
      {steps.map((step, idx) => {
        const stepNumber = idx + 1;
        const isCancelledStep = step.key === "cancelled";
        const isCompletedFinal =
          status === "completed" && step.key === "completed";

        //  ride cancel: accepted/picked_up/in_transit ===> danger X
        const isDangerCompletedStep =
          status === "cancelled" &&
          (step.key === "accepted" ||
            step.key === "picked_up" ||
            step.key === "in_transit");

        const showXIcon = isCancelledStep || isDangerCompletedStep;

        return (
          <TimelineItem
            key={`${ride?._id}-${step.key}`}
            step={stepNumber}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />

              <TimelineDate
                className={
                  isCompletedFinal
                    ? "text-emerald-600"
                    : isCancelledStep
                    ? "text-rose-600"
                    : undefined
                }
              >
                {step.date}
              </TimelineDate>

              <TimelineTitle
                className={
                  isCompletedFinal
                    ? "text-emerald-700"
                    : isCancelledStep
                    ? "text-rose-700"
                    : undefined
                }
              >
                {step.title}
              </TimelineTitle>

              <TimelineIndicator
                className={[
                  "flex size-6 items-center justify-center group-data-[orientation=vertical]/timeline:-left-7",

                  !isCompletedFinal &&
                    !isDangerCompletedStep &&
                    !isCancelledStep &&
                    "group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-completed/timeline-item:border-none",

                  isCompletedFinal &&
                    "bg-emerald-600 text-emerald-50 border-none",

                  isCancelledStep && "bg-rose-600 text-rose-50 border-none",

                  isDangerCompletedStep && "text-rose-600 border-rose-300",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {showXIcon ? (
                  <XCircle size={16} />
                ) : (
                  <CheckIcon
                    className="group-not-data-completed/timeline-item:hidden"
                    size={16}
                  />
                )}
              </TimelineIndicator>
            </TimelineHeader>

            {step.content ? (
              <TimelineContent>{step.content}</TimelineContent>
            ) : null}
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
