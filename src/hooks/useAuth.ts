import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand";

export const tokenStore = createStore<{
  token: string | null;
  setToken: (token: string | null) => void;
}>((set) => ({
  token: "",
  setToken: (token) => {
    set({ token });
  },
}));

export const userVanillaToken = tokenStore.getState;

export const refreshTokenStore = createStore<{
  tokenRefresh: string | null;
  setTokenRefresh: (tokenRefresh: string | null) => void;
}>()(
  persist(
    (set, get) => ({
      tokenRefresh: "",
      setTokenRefresh: (tokenRefresh) => {
        set({ tokenRefresh });
      },
    }),
    {
      name: "_at",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useVanillaRefreshToken = refreshTokenStore.getState;
