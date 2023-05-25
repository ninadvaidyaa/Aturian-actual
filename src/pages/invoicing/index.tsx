import Loadable from "components/Loadable";
import { lazy } from "react";

export const ManagePrebillsPage = Loadable(
  lazy(async () => await import("./ManagePrebills"))
);

export const ManagePrebillDetailsPage = Loadable(
  lazy(async () => await import("./ManagePrebills/PrebillDetailPage"))
);
