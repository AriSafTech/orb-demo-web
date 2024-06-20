import { AppRole, RegistrationRoles } from "@/api/api-types";
import { getApiClient } from "@/api/client";
import {
  AuthenticationApi,
  AuthenticationApiFactory,
  AuthenticationApiFp,
  RegistrationRequestAttributeRoleNameEnum,
} from "@/api/generated";
import { MUTATION_KEYS } from "@/constants/mutation-keys.constants";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { ValueOf } from "@/lib/type-utils";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coinService } from "./coin.service";
import { useMemo } from "react";

export const authService = {
  useLogin() {
    const { setData } = useAuthStore();
    return useMutation({
      mutationKey: [MUTATION_KEYS.login],
      mutationFn: async ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        const client = await getApiClient();
        const res = await client.login({}, { email, password });
        const user = res.data.data?.user;
        if (user) {
          setData({
            user: {
              id: user.id as string,
              email: user.email!,
              // @ts-ignore
              name: user.name!,
              userName: user.username!,
              role: user.role!.name as AppRole,
            },
            tokens: {
              accessToken: user.token!.access_token!,
              refreshToken: user.token!.refresh_token!,
            },
          });
        }
        return res.data.data?.user;
      },
    });
  },

  useRegister() {
    const { setData } = useAuthStore();
    return useMutation({
      mutationKey: [MUTATION_KEYS.register],
      mutationFn: async ({
        email,
        name,
        password,
        role,
      }: {
        email: string;
        name: string;
        password: string;
        role: RegistrationRoles;
      }) => {
        const client = await getApiClient();
        const res = await client.paths["/api/register"].post(null, {
          email,
          name,
          password,
          phone: undefined,
          role_name: role,
        });
        const user = res.data.data?.user;
        if (user) {
          setData({
            user: {
              id: user.id as string,
              email: user.email!,
              name: user.name!,
              userName: user.username!,
              role: user.role!.name as AppRole,
            },
            tokens: {
              accessToken: user.token!.access_token!,
              refreshToken: user.token!.refresh_token!,
            },
          });
        }
        return user;
      },
    });
  },

  useMe() {
    const { tokens } = useAuthStore();
    const { accessToken } = tokens || {};
    return useQuery({
      queryKey: [QUERY_KEYS.getProfile],
      queryFn: async () => {
        const client = await getApiClient();
        const res = await client.getProfile();
        return res.data.data?.user;
      },
      enabled: !!accessToken,
    });
  },

  useProfile() {
    const profileQuery = this.useMe();
    const coinsQuery = coinService.useAllCoins();

    const balance = useMemo(() => {
      if (profileQuery.data && coinsQuery.data) {
        return Object.fromEntries(
          coinsQuery.data.map((coin) => [
            coin.coin_id!,
            {
              name: coin.name!,
              balance: parseFloat(
                // @ts-ignore
                profileQuery.data!.balance!.amounts![coin.coin_id!] ?? "0",
              ),
            },
          ]),
        );
      } else {
        return null;
      }
    }, [profileQuery.data, coinsQuery.data]);

    const status = useMemo<"success" | "error" | "pending">(() => {
      if (
        profileQuery.status === "success" &&
        coinsQuery.status === "success"
      ) {
        return "success";
      } else if (
        profileQuery.status === "error" ||
        coinsQuery.status === "error"
      ) {
        return "error";
      } else {
        return "pending";
      }
    }, [coinsQuery.status, profileQuery.status]);

    return { data: profileQuery.data, balance, status };
  },

  useLogout() {
    const { reset } = useAuthStore();
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: [MUTATION_KEYS.logout],
      mutationFn: async () => {
        const client = await getApiClient();
        await client.logout();
        reset();
        // queryClient.clear();
      },
    });
  },
};
