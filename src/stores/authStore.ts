import { AppRole } from "@/api/api-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreData = {
  accessToken: string | null;
  user: {
    name: string;
    email: string;
    role: AppRole;
  } | null;
};

type AuthStoreActions = {
  reset: () => void;
  setAccessToken: (token: string) => void;
  setData: (data: AuthStoreData) => void;
};

type AuthStore = AuthStoreData & AuthStoreActions;

const INITIAL_AUTH_STORE_DATA: AuthStoreData = {
  accessToken: null,
  user: null,
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      ...INITIAL_AUTH_STORE_DATA,
      reset: () => set(() => ({ ...INITIAL_AUTH_STORE_DATA })),
      setAccessToken: (token: string) => set(() => ({ accessToken: token })),
      setData: (data: AuthStoreData) => set(() => ({ ...data })),
    }),
    { name: "auth-store" },
  ),
);
