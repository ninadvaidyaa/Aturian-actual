import Loadable from "components/Loadable";
import { lazy } from "react";

export const CustomerPage = Loadable(
  lazy(async () => await import("./manage"))
);
