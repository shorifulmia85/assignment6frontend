import { useGetMeQuery } from "@/redux/features/userApi/userApi";
import { Navigate, Outlet } from "react-router";

export default function GuestRoute() {
  const { data, isLoading } = useGetMeQuery(undefined);

  const role = data?.data?.role || data?.data?.userId?.role;

  if (isLoading) return <p>Loading...</p>;

  if (role) {
    const normalizeRole = role.toLowerCase();
    if (normalizeRole === "rider")
      return <Navigate to="/rider/dashboard" replace />;
    if (normalizeRole === "driver")
      return <Navigate to="/driver/dashboard" replace />;
    if (normalizeRole === "super_admin")
      return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
