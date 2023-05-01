import MainLayout from "MainLayout";
import AuthGuard from "components/AuthGuard";
import Loadable from "components/Loadable";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const LoginPage = Loadable(lazy(async () => await import("pages/auth/login")));
const OrderPage = Loadable(lazy(async () => await import("pages/orders")));
const CustomerPage = Loadable(lazy(async () => await import("pages/customers")));

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element:
        <AuthGuard>
        <MainLayout />
       </AuthGuard>,
      
        children: [
          {
            path: "/",
            children: [
              {
                path: 'orders',
                element: <OrderPage />
              },
              {
                path: 'customers',
                element: <CustomerPage />
              },
            ]
          
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
