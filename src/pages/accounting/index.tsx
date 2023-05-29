import Loadable from "components/Loadable";
import { lazy } from "react";

export const AccountingGLDetails = Loadable(
  lazy(async () => await import("./generalAccounting/displayGLDetails"))
);
export const SingleGLLinePage = Loadable(
  lazy(async () => await import("./generalAccounting/singleGLLineList"))
);
