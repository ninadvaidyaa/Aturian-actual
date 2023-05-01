import { type ComponentClass, type FunctionComponent } from "react";

import { type SvgIconTypeMap } from "@mui/material";
import { type OverridableComponent } from "@mui/material/OverridableComponent";

import { type AuthProps } from "./auth";

import { type MenuProps } from "./menu";

import { type an } from "vitest/dist/types-e3c9754d";

// ==============================|| ROOT TYPES  ||============================== //

export interface RootStateProps {
  auth: AuthProps;
  menu: MenuProps;
}

export interface KeyedObject {
  [key: string]: string | number | KeyedObject | any;
}

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<an, "svg">> & {
      muiName: string;
    })
  | ComponentClass<any>
  | FunctionComponent<any>;

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}
