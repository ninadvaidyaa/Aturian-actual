import MainLayout from "MainLayout";
import AuthGuard from "components/AuthGuard";
import ErrorPage from "components/ErrorPage";
import Loadable from "components/Loadable";
import PickPackPage from "pages/inventory/picklist";
import {
  ItemDetailPage,
  ItemsListPage,
  PickPackInventoryDetails,
} from "pages/inventory";
import {
  ManageSupplierInvoiceListPage,
  ManagerSupplierInvoiceDetailPage,
} from "pages/accountPayable";
import { VendorListPage, OrderDetailPage } from "pages/orders";
import {
  ManageProposalPage,
  ManageQuotePage,
  ProposalDetailPage,
  QuoteDetailPage,
} from "pages/proposal";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { SuppliersDetailPage, SuppliersListPage } from "pages/suppliers";
import { CustomerPage } from "pages/customers";
import {
  ManagePrebillsPage,
  ManagePrebillDetailsPage,
  // ManageCustInvoicePage,
  // ManageCustInvoiceDetailPage,
} from "pages/invoicing";
import { SingleGLLinePage, AccountingGLDetails } from "pages/accounting";
import ManageCustInvoicePage from "pages/invoicing/ManageCustomerInvoices";
import ManageCustInvoiceDetailPage from "pages/invoicing/ManageCustomerInvoices/CustInvoiceDetailPage";
import QuotesDetailPage from "pages/proposal/ManageQuotes/QuotesDetailPage";
import MultiGLLinePage from "pages/accounting/generalAccounting/multipleGLLineList";
import TrailBalancePage from "pages/accounting/generalAccounting/trialBalance";
const LoginPage = Loadable(lazy(async () => await import("pages/auth/login")));

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
                children: [
                  {
                    index: true,
                    element: <VendorListPage />,
                  },
                  {
                    path: ":orderId",
                    element: <OrderDetailPage />,
                  },
                ],
              },
              {
                path: "customers",
                children: [
                  {
                    index: true,
                    element: <CustomerPage />,
                  },

                  { path: ":orderId", element: <OrderDetailPage /> },
                ],
              },

              {
                path: "proposals",
                children: [
                  {
                    index: true,
                    element: <ManageProposalPage />,
                  },

                  {
                    path: ":proposalId",
                    element: <ProposalDetailPage />,
                  },
                  {
                    path: "quotes",
                    element: <ManageQuotePage />,
                  },
                  {
                    path: "quotes/:quoteId",
                    element: <QuoteDetailPage />,
                  },
                ],
              },
              {
                path: "items",
                children: [
                  {
                    index: true,
                    element: <ItemsListPage />,
                  },
                  { path: ":itemId", element: <ItemDetailPage /> },
                ],
              },
              {
                path: "pick-packs",
                children: [
                  {
                    index: true,

                    element: <PickPackPage />,
                  },

                  {
                    path: ":orderId",
                    element: <PickPackInventoryDetails />,
                  },

                  {
                    path: "other/:pickListOtherlId",
                    element: <PickPackInventoryDetails />,
                  },
                ],
              },

              {
                path: "supplier-invoices",
                children: [
                  {
                    index: true,
                    element: <ManageSupplierInvoiceListPage />,
                  },

                  {
                    path: "supplier-invoices/:invoiceId",
                    element: <ManagerSupplierInvoiceDetailPage />,
                  },
                ],
              },
              {
                path: "suppliers",
                children: [
                  {
                    index: true,
                    element: <SuppliersListPage />,
                  },
                  {
                    path: "suppliers/:supplierId",
                    element: <SuppliersDetailPage />,
                  },
                ],
              },
              {
                path: "invoices",
                children: [
                  {
                    // TODO: update when new page is created
                    index: true,
                    element: <ManagePrebillsPage />,
                  },
                  {
                    path: "cust-invoices",
                    element: <ManageCustInvoicePage />,
                  },
                  {
                    path: "cust-invoices/:invoiceId",
                    element: <ManageCustInvoiceDetailPage />,
                  },
                  {
                    path: ":prebillId",
                    element: <ManagePrebillDetailsPage />,
                  },
                ],
              },
              {
                path: "accounting",
                children: [
                  {
                    path: "ga",
                    children: [
                      {
                        index: true,
                        element: <AccountingGLDetails />,
                      },
                      {
                        path: "single",
                        element: <SingleGLLinePage />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "quotes/:quoteId",
                element: <QuotesDetailPage />,
              },
              {
                path: "gl-details",
                element: <AccountingGLDetails />,
              },

              {
                path: "single-gl-details",
                element: <SingleGLLinePage />,
              },
              {
                path: "multi-gl-details",
                element: <MultiGLLinePage />,
              },

              {
                path: "trial-balance",
                element: <TrailBalancePage />,
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
