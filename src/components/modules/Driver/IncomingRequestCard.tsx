/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useUpdateRidesMutation } from "@/redux/features/rideApi/rideApi";
import type { IDriverRid } from "@/types/ride";
import { Banknote, Car, Circle, MapPin, User, Watch } from "lucide-react";
import toast from "react-hot-toast";

const IncomingRequestCard = ({
  rides,
}: {
  rides: IDriverRid;
  loading: boolean;
}) => {
  function getTimeAgo(requestedTime: string | Date) {
    const requestDate = new Date(requestedTime).getTime();
    const now = Date.now();
    const diffMs = now - requestDate;

    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  const [updateRides, { isLoading }] = useUpdateRidesMutation();

  const handleAcceptRequest = async (id: string) => {
    const payload = { status: "ACCEPTED" };

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
    <div className="bg-background rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <User size={32} className="rounded-full border p-1" />
          <div>
            <p className="font-medium">{rides?.riderId?.name}</p>
            <p className="text-sm">incoming ride request</p>
          </div>
        </div>

        <div>
          <p className="bg-accent rounded-full text-background text-sm px-3 py-0.5">
            {getTimeAgo(rides?.rideTimeStamps?.requestedAt)}
          </p>
        </div>
      </div>{" "}
      {/* pick up and destination ui  */}
      <div>
        <div className="flex items-center gap-2">
          <Circle size={16} />
          <p className="font-medium text-[14px]">
            Pickup: <span>{rides?.pickup_address?.label}</span>
          </p>
        </div>

        <div className="ml-[7px] my-2 h-5 w-[2px] bg-emerald-500/30" />
        <div className="flex items-center gap-3">
          <MapPin size={16} />
          <p className="font-medium text-[14px]">
            Drop: <span>{rides?.destinationAddress?.label}</span>
          </p>
        </div>
      </div>
      {/* action ui  */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm md:grid-cols-3">
        <div className="rounded-xl shadow-sm border border-muted p-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Fare</span>
            <Banknote className="h-4 w-4" />
          </div>
          <p className="mt-1 text-sm lg:text-lg font-semibold">
            {rides?.fare != null ? `${rides.fare} BDT` : "—"}
          </p>
        </div>

        <div className="rounded-xl shadow-sm border border-muted p-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Distance</span>
            <Car className="h-4 w-4" />
          </div>
          <p className="mt-1 text-sm lg:text-lg font-semibold">
            {rides?.distance} Km
          </p>
        </div>

        <div className=" rounded-xl shadow-sm border border-muted p-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Estimate</span>
            <Watch className="h-4 w-4" />
          </div>
          <p className="mt-1 text-sm lg:text-lg font-semibold">
            {rides?.estimatedRideTime} Min
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        {" "}
        <Button
          disabled={isLoading}
          onClick={() => handleAcceptRequest(rides?._id)}
        >
          {isLoading ? "Wait.." : "Accepted"}
        </Button>
      </div>
    </div>
  );
};

export default IncomingRequestCard;
