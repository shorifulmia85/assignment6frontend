/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router"; // আপনার প্রজেক্ট যেমন আছে তেমনই রাখলাম
import Logo from "@/assets/Logo";
import { useGetMeQuery } from "@/redux/features/userApi/userApi";
import { cn } from "@/lib/utils";
import { GenerateSidebar } from "@/utils/GenerateSidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: GenerateSidebar(
      userData?.data?.role || userData?.data?.userId?.role
    ),
  };

  const location = useLocation();

  const normalize = (p?: string) => {
    const raw = (p ?? "/").replace(/^\/rider(?=\/|$)/, "").replace(/\/+$/, "");
    return raw === "" ? "/" : raw;
  };

  const current = normalize(location?.pathname);

  return (
    <div className="z-[999] ">
      <Sidebar {...props} className="border-none">
        <SidebarHeader className="p-5">
          <div className="flex items-center gap-2">
            <Logo />
            <Link className="text-lg font-semibold" to="/">
              Swift Ride
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent className="gap-0 p-5">
          {data?.navMain?.map((item: any) => {
            const Icon = item?.icon;

            const target = normalize(item?.url);
            const active = typeof item?.url === "string" && current === target;

            return (
              <Collapsible
                key={item.title}
                title={item.title}
                defaultOpen
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                  />
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            className={cn(
                              "text-[16px] w-full",
                              "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                            )}
                          >
                            <Link
                              to={item.url}
                              className="flex items-center gap-2 w-full rounded-md"
                              aria-current={active ? "page" : undefined}
                            >
                              {Icon ? <Icon /> : null}
                              <span className="font-medium">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          })}
        </SidebarContent>

        <SidebarRail />
      </Sidebar>
    </div>
  );
}
