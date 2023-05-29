import Loadable from "components/Loadable";
import { lazy } from "react";

export const ManagePrebillsPage = Loadable(
  lazy(async () => await import("./ManagePrebills"))
);

export const ManagePrebillDetailsPage = Loadable(
  lazy(async () => await import("./ManagePrebills/PrebillDetailPage"))
);
export const ManageCustInvoicePage = Loadable(
  lazy(async () => await import("./ManageCustomerInvoices"))
);
export const ManageCustInvoiceDetailPage = Loadable(
  lazy(
    async () => await import("./ManageCustomerInvoices/CustInvoiceDetailPage")
  )
);
