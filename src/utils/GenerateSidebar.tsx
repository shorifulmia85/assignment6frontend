import { Role } from "@/constant";
import { adminSidebar } from "@/routes/adminSidebar";
import { driverSidebar } from "@/routes/driverSidebar";
import { riderSidebar } from "@/routes/riderSidebar";
import type { TUser } from "@/types";

export const GenerateSidebar = (role: TUser) => {
  const normalizeRole = role?.toLowerCase();

  switch (normalizeRole) {
    case Role.rider:
      return [...riderSidebar];
    case Role.driver:
      return [...driverSidebar];
    case Role.admin:
      return [...adminSidebar];
    default:
      return;
  }
};
