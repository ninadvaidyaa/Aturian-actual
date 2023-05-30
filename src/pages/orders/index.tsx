import Loadable from "components/Loadable";
import { lazy } from "react";

export const VendorListPage = Loadable(
  lazy(async () => await import("./vendorList"))
);
export const OrderDetailPage = Loadable(
  lazy(async () => await import("./OrderDetailPage"))
);
export const OrderPOListPage = Loadable(
  lazy(async () => await import("./tracking"))
);
