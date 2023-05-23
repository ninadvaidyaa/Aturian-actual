import MainLayout from "MainLayout";
import AuthGuard from "components/AuthGuard";
import ErrorPage from "components/ErrorPage";
import Loadable from "components/Loadable";
import PickPackPage from "pages/inventory/picklist";




import ManagePrebillsPage from "pages/invoicing/ManagePrebills";
import ManagePrebillDetailPage from "pages/invoicing/ManagePrebills/PrebillDetailPage";







import ManageSupplierInvoiceListPage from "pages/manageSuppliesInvoice";
import ManagerSupplierInvoiceDetailPage from "pages/manageSuppliesInvoice/ManageSuppliesInvoiceDetalisPage";
import ManageProposalPage from "pages/proposal/ManageProposal";
import ProposalDetailPage from "pages/proposal/ManageProposal/ProposalDetalisPage";

import ManageQuotePage from "pages/proposal/ManageQuotes/index";
import QuotesDetailPage from "pages/proposal/ManageQuotes/QuotesDetailPage";


import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PickPackInventoryDetails from "pages/inventory/picklist/PickPackDetails";
const LoginPage = Loadable(lazy(async () => await import("pages/auth/login")));
const OrderPage = Loadable(lazy(async () => await import("pages/orders")));
const SuppliersPage = Loadable(
  lazy(
    async () =>
      await import("pages/suppliers").then((m) => ({ default: m.SupplierPage }))
  )
);
const SupplierDetail = Loadable(
  lazy(
    async () =>
      await import("pages/suppliers").then((m) => ({
        default: m.SupplierDetail,
      }))
  )
);
const OrderDetailPage = Loadable(
  lazy(async () => await import("pages/orders/OrderDetailPage"))
);
const CustomerPage = Loadable(
  lazy(async () => await import("pages/customers"))
);

const ItemsListPage = Loadable(
  lazy(
    async () =>
      await import("pages/inventory").then((m) => ({
        default: m.ItemsListPage,
      }))
  )
);

const ItemDetailPage = Loadable(
  lazy(
    async () =>
      await import("pages/inventory").then((m) => ({
        default: m.ItemDetailPage,
      }))
  )
);
// const PickPackOtherListPage = Loadable(
//   lazy(
//     async () =>
//       await import("pages/inventory").then((m) => ({
//         default: m.PickPackOtherListPage,
//       }))
//   )
// );

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: (
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        ),

        children: [
          {
            path: "/",
            errorElement: <ErrorPage />,
            children: [
              {
                path: "orders",
                element: <OrderPage />,
              },
              { path: "orders/:orderId", element: <OrderDetailPage /> },
              {
                path: "customers",
                element: <CustomerPage />,
              },
              { path: "customers/:orderId", element: <OrderDetailPage /> }, // TODO: change it

              {
                path: "proposals",
                element: <ManageProposalPage />,
              },
            
              {
                path: "proposals/:proposalId",
                element: <ProposalDetailPage />,
              },
              {
                path: "items",
                element: <ItemsListPage />,
              },
              

              { path: "items/:itemId", element: <ItemDetailPage /> },
              {
                path: "pick-packs",
                element: <PickPackPage />,
              },
               {
                path: "pick-packs/:orderId",
                element: <PickPackInventoryDetails />,
              },

              

              {
                path: "supplier-invoices",
                element: <ManageSupplierInvoiceListPage />,
              },

              {
                path: "supplier-invoices/:invoiceId",
                element: <ManagerSupplierInvoiceDetailPage />,
              },
              {
                path: "suppliers",
                element: <SuppliersPage />,
              },
              {
                path: "suppliers/:supplierId",
                element: <SupplierDetail />,
              },


              {
                path: "prebills",
                element: <ManagePrebillsPage />,
              },

              {
                path: "prebills/:prebillId",
                element: <ManagePrebillDetailPage />,
              },
              {
                path: "quotes",
                element: <ManageQuotePage />,
              },
              {
                path: "quotes/:quoteId",
                element: <QuotesDetailPage />,
              },


              
            ],
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

export default router;
