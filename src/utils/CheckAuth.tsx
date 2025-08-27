import { useGetMeQuery } from "@/redux/features/userApi/userApi";
import type { TUser } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const CheckAuth = (Component: ComponentType, allowRole: TUser) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);

    const userRole = data?.data?.role || data?.data?.userId?.role;
    const userEmail = data?.data?.email || data?.data?.userId?.email;
    const normalizeRole = userRole?.toLowerCase();

    if (!userEmail && !isLoading) {
      return <Navigate to="/login" />;
    }

    if (allowRole && !isLoading && normalizeRole !== allowRole) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
};
