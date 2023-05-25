import Loadable from "components/Loadable";
import { lazy } from "react";

export const SuppliersListPage = Loadable(
  lazy(async () => await import("./suppliersList"))
);
export const SuppliersDetailPage = Loadable(
  lazy(async () => await import("./detail"))
);
