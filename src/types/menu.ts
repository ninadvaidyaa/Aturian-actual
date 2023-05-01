import { type ReactNode } from "react";

// material-ui
import { type ChipProps } from "@mui/material";

// ==============================|| MENU TYPES  ||============================== //

export interface NavItemType {
  breadcrumbs?: boolean;
  breadcrumbsArray?: string[];
  caption?: ReactNode | string;
  children?: NavItemType[];
  elements?: NavItemType[];
  chip?: ChipProps;
  color?: "primary" | "secondary" | "default" | undefined;
  disabled?: boolean;
  external?: boolean;
  icon?: any;
  id?: string;
  search?: string;
  target?: boolean;
  title?: ReactNode | string;
  type?: string;
  url?: string | undefined;
}

export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";

export interface MenuProps {
  openComponent: string;
  selectedID: string | null;
  drawerOpen: boolean;
  componentDrawerOpen: boolean;
  menuDashboard: NavItemType;
  error: null;
}
