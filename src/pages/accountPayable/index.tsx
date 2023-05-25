import Loadable from "components/Loadable";
import { lazy } from "react";

export const ManageSupplierInvoiceListPage = Loadable(
  lazy(async () => await import("./manageSuppliesInvoice"))
);
export const ManagerSupplierInvoiceDetailPage = Loadable(
  lazy(
    async () =>
      await import("./manageSuppliesInvoice/ManageSuppliesInvoiceDetailsPage")
  )
);
