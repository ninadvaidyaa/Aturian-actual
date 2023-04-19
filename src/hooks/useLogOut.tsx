import { useStore } from "zustand";
import { refreshTokenStore, tokenStore } from "./useAuth";

const useLogOut = () => {
  const { setToken } = useStore(tokenStore);
  const { setTokenRefresh } = useStore(refreshTokenStore);
  const onLogout = () => {
    setToken(null);
    setTokenRefresh(null);
  };
  return { onLogout };
};

export default useLogOut;
