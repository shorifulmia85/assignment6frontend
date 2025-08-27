import type { TSidebarItems } from "@/types";

export const GenerateRoutes = (sidebarItems: TSidebarItems[]) => {
  return sidebarItems?.map((item) => ({
    path: item?.url,
    Component: item?.component,
  }));
};
