import { Bike, History, LayoutDashboard, MapPinned, User } from "lucide-react";
import { lazy } from "react";

const DriverDashboard = lazy(() => import("@/pages/driver/DriverDashboard"));
const DriverProfile = lazy(() => import("@/pages/driver/DriverProfile"));
const IncomingRequest = lazy(() => import("@/pages/driver/IncomingRequest"));
const RideLiveTracking = lazy(() => import("@/pages/driver/RideLiveTracking"));
const RidingHistory = lazy(() => import("@/pages/driver/RidingHistory"));

export const driverSidebar = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
    component: DriverDashboard,
  },
  {
    title: "Incoming Request",
    url: "incoming-request",
    icon: Bike,
    component: IncomingRequest,
  },
  {
    title: "Ride Live Tracking",
    url: "ride-live-tracking",
    icon: MapPinned,
    component: RideLiveTracking,
  },
  {
    title: "My Ride History",
    url: "my-ride-history",
    icon: History,
    component: RidingHistory,
  },
  {
    title: "Profile",
    url: "driver-profile",
    icon: User,
    component: DriverProfile,
  },
];
