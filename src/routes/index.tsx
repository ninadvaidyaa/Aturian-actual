import MainLayout from "MainLayout";
import AuthGuard from "components/AuthGuard";
import ErrorPage from "components/ErrorPage";
import Loadable from "components/Loadable";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
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
                path: "suppliers",
                element: <SuppliersPage />,
              },
              {
                path: "suppliers/:supplierId",
                element: <SupplierDetail />,
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
