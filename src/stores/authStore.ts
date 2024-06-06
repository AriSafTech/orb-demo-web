import { AppRole } from "@/api/api-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthStoreData = {
  tokens: Tokens | null;
  user: {
    id: string;
    name: string;
    email: string;
    userName: string;
    role: AppRole;
  } | null;
};

type AuthStoreActions = {
  reset: () => void;
  setAccessToken: (token: string) => void;
  setTokens: (tokens: Tokens) => void;
  setData: (data: AuthStoreData) => void;
};

type AuthStore = AuthStoreData & AuthStoreActions;

const INITIAL_AUTH_STORE_DATA: AuthStoreData = {
  tokens: null,
  user: null,
};

export const useAuthStore = create(
  persist(
    immer<AuthStore>((set, get) => ({
      ...INITIAL_AUTH_STORE_DATA,
      reset: () => set(() => ({ ...INITIAL_AUTH_STORE_DATA })),
      setAccessToken: (token: string) =>
        set((draft) => {
          if (draft.tokens == null) {
            throw Error("Cannot only set access token without refresh token");
          } else {
            draft.tokens.accessToken = token;
          }
        }),
      setTokens: (tokens: Tokens) =>
        set((draft) => {
          draft.tokens = tokens;
        }),
      setData: (data: AuthStoreData) => set(() => ({ ...data })),
    })),
    { name: "auth-store" },
  ),
);
