/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Car,
  CreditCard,
  MapPin,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Sample data for chart
const ridesTrendData = [
  { month: "Jan", rides: 12, distance: 145 },
  { month: "Feb", rides: 18, distance: 220 },
  { month: "Mar", rides: 15, distance: 180 },
  { month: "Apr", rides: 22, distance: 280 },
  { month: "May", rides: 25, distance: 320 },
  { month: "Jun", rides: 20, distance: 250 },
];

const spendingData = [
  { month: "Jan", amount: 180 },
  { month: "Feb", amount: 270 },
  { month: "Mar", amount: 225 },
  { month: "Apr", amount: 330 },
  { month: "May", amount: 375 },
  { month: "Jun", amount: 300 },
];

export default function RiderAnalytics({
  data,
}: {
  data: {
    avgDistance: number;
    avgFare: number;
    cancelled: number;
    completed: number;
    completionRatePct: number;
    lastRideAt: number;
    ongoing: number;
    totalDistance: number;
    totalRides: number;
    totalSpent: number;
    uniqueDrivers: number;
  };
}) {
  const {
    avgDistance,
    avgFare,
    cancelled,
    completed,
    completionRatePct,
    ongoing,
    totalDistance,
    totalRides,
    totalSpent,
    uniqueDrivers,
  } = data;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Total Rides
              </CardTitle>
              <Car className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {totalRides}
              </div>
              <p className="text-xs">
                {completed} completed, {cancelled} cancelled
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Total Distance
              </CardTitle>
              <MapPin className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {totalDistance?.toFixed(2)} km
              </div>
              <p className="text-xs ">
                Avg: {avgDistance?.toFixed(2)} km per ride
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Total Spent
              </CardTitle>
              <CreditCard className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                ${totalSpent}
              </div>
              <p className="text-xs ">Avg: ${avgFare?.toFixed(2)} per ride</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Unique Drivers
              </CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {uniqueDrivers}
              </div>
              {/* <p className="text-xs ">Last ride: {formatDate(lastRideAt)}</p> */}
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-card-foreground">
                {completionRatePct?.toFixed(2)}%
              </div>
              <div className="flex justify-between text-sm ">
                <span>Completed: {completed}</span>
                <span>Cancelled: {cancelled}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                Ride Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-card-foreground">Current Status</span>
                <Badge variant={ongoing > 0 ? "default" : "secondary"}>
                  {ongoing > 0 ? "In Progress" : "Available"}
                </Badge>
              </div>
              <div className="text-sm  space-y-2">
                <div>Ongoing rides: {ongoing}</div>
                <div>Total completed: {completed}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-accent" />
                Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm  space-y-2">
                <div className="flex justify-between">
                  <span>Avg rides/month:</span>
                  <span className="text-card-foreground font-medium">8.3</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg distance/month:</span>
                  <span className="text-card-foreground font-medium">
                    100 km
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Avg spending/month:</span>
                  <span className="text-card-foreground font-medium">$131</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Rides & Distance Trend
              </CardTitle>
              <CardDescription className="">
                Monthly rides and distance traveled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ridesTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="rides"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="Rides"
                    />
                    <Line
                      type="monotone"
                      dataKey="distance"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      name="Distance (km)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Monthly Spending
              </CardTitle>
              <CardDescription className="">
                Your ride expenses over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="amount"
                      fill="#8b5cf6"
                      name="Amount ($)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
