import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardSidebar";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import DriverDashboard from "@/pages/driver/DriverDashboard";
import Faq from "@/pages/Faq";
import Features from "@/pages/Features";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import RiderDashboard from "@/pages/rider/RiderDashboard";
import { createBrowserRouter } from "react-router";
import { riderSidebar } from "./riderSidebar";
import { CheckAuth } from "@/utils/CheckAuth";
import { Role } from "@/constant";
import type { TUser } from "@/types";
import MapDemo from "@/pages/Mapdemo";
import { GenerateRoutes } from "@/utils/GenerateRoutes";
import { driverSidebar } from "./driverSidebar";
import { adminSidebar } from "./adminSidebar";
import Analytics from "@/pages/admin/Analytics";
import Unauthorized from "@/pages/UnAuthorized";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/features",
        Component: Features,
      },
      {
        path: "/faq",
        Component: Faq,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
    ],
  },
  {
    path: "/rider",
    Component: CheckAuth(DashboardLayout, Role.rider as TUser),
    children: [
      {
        index: true,
        Component: RiderDashboard,
      },
      ...GenerateRoutes(riderSidebar),
    ],
  },

  {
    path: "/driver",
    Component: CheckAuth(DashboardLayout, Role.driver as TUser),
    children: [
      { index: true, Component: DriverDashboard },
      ...GenerateRoutes(driverSidebar),
    ],
  },
  {
    path: "/admin",
    Component: CheckAuth(DashboardLayout, Role.admin as TUser),
    children: [
      { index: true, Component: Analytics },
      ...GenerateRoutes(adminSidebar),
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/map-demo",
    Component: MapDemo,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
