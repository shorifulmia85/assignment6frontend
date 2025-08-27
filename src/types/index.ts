import type { ComponentType } from "react";

export type { IUser } from "./auth";
export type { IResponse } from "./auth";
export type { IUserResponse } from "./auth";

export type TUser = "super_admin" | "driver" | "rider";
export type TSidebarItems = {
  title: string;
  url: string;
  icon: ComponentType;
  component: ComponentType;
  isActive?: boolean;
};
