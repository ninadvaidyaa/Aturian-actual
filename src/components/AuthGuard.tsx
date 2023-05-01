import { tokenStore } from "hooks/useAuth";
import type React from "react";
import { useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "zustand";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { token } = useStore(tokenStore);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!token) {
      navigate({
        pathname: "/login",
        search: createSearchParams({
          next: location.pathname,
      }).toString(),
      });
    }
  }, [token, navigate, location]);

  return <>{children}</>;
};

export default AuthGuard;
