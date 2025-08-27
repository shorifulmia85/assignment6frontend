/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  Car,
  ChartSpline,
  CheckCircle,
  Clock,
  DollarSign,
  Slash,
  XCircle,
} from "lucide-react";
import KpiCard from "../admin/AdminAnalytics/KpiCard";
import KpiCard2 from "@/utils/KpiCard2";
import { formatDate } from "../admin/ulits/formateDate";

const DriverAnalytics = ({ data }: { data: any }) => {
  const {
    avgDistance,
    avgFare,
    cancelled,
    completed,
    completionRate,
    earnings,
    lastRideAt,
    ongoing,
    totalDistance,
    totalRides,
    uniqueRiders,
  } = data;

  return (
    <div className="lg:w-5/6 w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <KpiCard title="Total Earnings" item={earnings} Icon={DollarSign} />
        <KpiCard title="Total Rides" item={totalRides} Icon={Car} />
        <KpiCard
          title="Ride Completion"
          item={completionRate}
          Icon={ChartSpline}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        <KpiCard2 title="Avg Fare" item={avgFare} Icon={DollarSign} />
        <KpiCard2 title="Avg Distance" item={avgDistance} Icon={Car} />
        <KpiCard2
          title="Total Distance"
          item={totalDistance.toFixed(2)}
          Icon={Slash}
        />
        <KpiCard2 title="Unique Rider" item={uniqueRiders} Icon={ChartSpline} />
      </div>

      {/* ride activity  */}
      <div className="grid grid-cols-12 gap-5 mt-10">
        <div className="col-span-12 lg:col-span-6">
          <div>
            <div className="bg-background rounded-xl shadow-sm border border-muted p-6">
              <h3 className="text-lg font-semibold  mb-4">Ride Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span className="">Completed Rides</span>
                  </div>
                  <span className="text-lg font-semibold text-green-600">
                    {completed}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-3" />
                    <span className="">Cancelled Rides</span>
                  </div>
                  <span className="text-lg font-semibold text-red-600">
                    {cancelled}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-500 mr-3" />
                    <span className="">Ongoing Rides</span>
                  </div>
                  <span className="text-lg font-semibold text-orange-600">
                    {ongoing}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* recent activity  */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-background rounded-xl shadow-sm border border-muted p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                <div>
                  <p className="text-foreground font-medium">
                    Last Ride Completed
                  </p>
                  <p className="text-foreground text-sm">
                    {formatDate(lastRideAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAnalytics;
