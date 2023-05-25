import Loadable from "components/Loadable";
import { lazy } from "react";

export const ItemsListPage = Loadable(
  lazy(async () => await import("./inventoryitems"))
);
export const ItemDetailPage = Loadable(
  lazy(async () => await import("./itemDetail"))
);
export const PickPackOtherListPage = Loadable(
  lazy(async () => await import("./picklist/others"))
);
export const PickPackInventoryDetails = Loadable(
  lazy(async () => await import("./picklist/PickPackDetails"))
);
