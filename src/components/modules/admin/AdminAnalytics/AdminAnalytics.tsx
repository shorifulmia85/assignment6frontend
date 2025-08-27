/* eslint-disable @typescript-eslint/no-explicit-any */
import KpiCard from "./KpiCard";
import {
  BadgeDollarSign,
  Car,
  Check,
  DollarSign,
  Users,
  X,
} from "lucide-react";
import RevenueChart from "./RevenueChart";
import StatusBreakdown from "./RidesChart";
import RideStatusChart from "./RideStatusChart";
import TopEarnedDriver from "./TopEarnedDriver";
const AdminAnalytics = (data: any) => {
  // store variable
  const kpisData = data?.data?.rides?.kpis;
  const usersData = data?.data?.users;
  // destructure data
  const {
    totalRides,
    completionRate,
    avgFare,
    cancelledRides,
    completedRides,
  } = kpisData;
  const { activeUsers, totalUsers, drivers } = usersData;

  return (
    <div className="w-full lg:w-5/6 mx-auto ">
      <div>
        <h1 className="text-2xl font-bold my-10">Admin Analytics Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <KpiCard
          title="Total Revenue"
          item={kpisData?.revenue ? kpisData!.revenue : ""}
          Icon={BadgeDollarSign}
          className="bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white border-0 shadow-lg ring-1 ring-white/10"
          iconClassName="text-white drop-shadow"
        />

        <KpiCard
          item={totalUsers}
          title="Total Users"
          Icon={Users}
          className="bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white border-0 shadow-lg ring-1 ring-white/10"
          iconClassName="text-white drop-shadow"
        />

        <KpiCard
          item={activeUsers}
          title="Active Users"
          Icon={Users}
          className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 text-white border-0 shadow-md ring-1 ring-white/10"
          iconClassName="text-white drop-shadow"
        />

        <KpiCard
          item={totalRides}
          title="Total Rides"
          Icon={Car}
          className="bg-gradient-to-br from-sky-500 via-indigo-600 to-blue-700 text-white border-0 shadow-md ring-1 ring-white/10"
          iconClassName="text-white drop-shadow"
        />

        <KpiCard
          item={completionRate.toFixed(2)}
          title="Rides Completion"
          Icon={Check}
          className="bg-gradient-to-br from-lime-500 via-emerald-600 to-green-700 text-white border-0 shadow-md ring-1 ring-white/10"
          iconClassName="text-white drop-shadow"
        />
      </div>

      {/* Revenue Chart  */}
      <div className="mt-10 grid grid-cols-12 gap-5 items-stretch">
        <div className="col-span-12 lg:col-span-6">
          <RevenueChart data={data?.data?.rides?.revenueByDay} />
        </div>
        {/* Rides By Day Chart  */}
        <div className="col-span-12 lg:col-span-6">
          <StatusBreakdown
            color="chart-1"
            data={data?.data?.rides?.ridesByDay}
          />
        </div>
      </div>

      {/* Rides history  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 space-y-2 mt-10">
        <KpiCard
          title="Average Fare"
          item={avgFare.toFixed(2)}
          Icon={DollarSign}
        />
        <KpiCard title="Complete Ride" item={completedRides} Icon={Check} />
        <KpiCard title="Cancelled Ride" item={cancelledRides} Icon={X} />
        <KpiCard title="Total Drivers" item={drivers} Icon={Car} />
      </div>

      {/* Rides status and Top Driver earner  */}
      <div className="mt-10 grid grid-cols-12 gap-5 items-stretch">
        <div className="col-span-12 lg:col-span-6">
          <RideStatusChart data={data?.data?.rides?.ridesByStatus} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <h1>
            <TopEarnedDriver data={data?.data?.rides?.topDriversByEarnings} />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
