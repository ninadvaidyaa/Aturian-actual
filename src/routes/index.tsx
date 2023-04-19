import AuthGuard from "components/AuthGuard";
import Loadable from "components/Loadable";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const LoginPage = Loadable(lazy(async () => await import("pages/auth/login")));
const Home = Loadable(lazy(async () => await import("pages/home")));
const OrderPage = Loadable(lazy(async () => await import("pages/orders")));

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "orders",
            element: (
              <AuthGuard>
                <OrderPage />
              </AuthGuard>
            ),
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
