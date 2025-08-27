import AdminProfile from "@/pages/admin/AdminProfile";
import AllRides from "@/pages/admin/AllRides";
import Analytics from "@/pages/admin/Analytics";
import PendingDrivers from "@/pages/admin/PendingDrivers";
import UserManagement from "@/pages/admin/UserManagement";
import { Bike, LayoutDashboard, User, Users } from "lucide-react";

export const adminSidebar = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
    component: Analytics,
  },
  {
    title: "User Management",
    url: "user-management",
    icon: Users,
    component: UserManagement,
  },
  {
    title: "Rides",
    url: "all-rides",
    icon: Bike,
    component: AllRides,
  },
  {
    title: "Pending Driver",
    url: "pending-drivers",
    icon: User,
    component: PendingDrivers,
  },
  {
    title: "Profile",
    url: "admin-profile",
    icon: User,
    component: AdminProfile,
  },
];
