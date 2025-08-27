import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { Outlet } from "react-router";

import UserProfileDropdown from "../UserProfileDropdown";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 z-999 px-4">
          <div className="w-full flex items-center justify-between">
            <SidebarTrigger className="-ml-1" />
            <UserProfileDropdown />
          </div>
        </header>
        <div className="min-h-screen bg-muted flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
