import { Bike, History, LayoutDashboard, MapPinned, User } from "lucide-react";
import { lazy } from "react";

const RiderDashboard = lazy(() => import("@/pages/rider/RiderDashboard"));
const RiderRidesHistory = lazy(() => import("@/pages/rider/RIderRidesHistory"));
const RiderRideTracking = lazy(() => import("@/pages/rider/RiderRideTracking"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const RequestRide = lazy(() => import("@/pages/rider/RequestRide"));

export const riderSidebar = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
    component: RiderDashboard,
  },
  {
    title: "Request Ride",
    url: "ride-request",
    icon: Bike,
    component: RequestRide,
  },
  {
    title: "Ride Tracking",
    url: "ride-tracking",
    icon: MapPinned,
    component: RiderRideTracking,
  },
  {
    title: "Ride History",
    url: "ride-history",
    icon: History,
    component: RiderRidesHistory,
  },
  {
    title: "Profile",
    url: "rider-profile",
    icon: User,
    component: ProfilePage,
  },
];
