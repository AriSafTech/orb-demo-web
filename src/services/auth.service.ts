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
import { useMutation, useQuery } from "@tanstack/react-query";

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
        const client = await getApiClient(null);
        const res = await client.login({}, { email, password });
        const user = res.data.data?.user;
        if (user) {
          setData({
            user: {
              email: user.email!,
              // @ts-ignore
              name: user.name!,
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
        const client = await getApiClient(null);
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
              email: user.email!,
              name: user.name!,
              role: user.role!.name as AppRole,
            },
            // TODO: replace with token from response
            tokens: null,
          });
        }
        return user;
      },
    });
  },

  useProfile() {
    const { tokens } = useAuthStore();
    const { accessToken } = tokens || {};
    return useQuery({
      queryKey: [QUERY_KEYS.getProfile],
      queryFn: async () => {
        const client = await getApiClient(accessToken!);
        const res = await client.getProfile();
        return res.data.data?.user;
      },
      enabled: !!accessToken,
    });
  },

  useLogout() {
    const { reset } = useAuthStore();
    return useMutation({
      mutationKey: [MUTATION_KEYS.logout],
      mutationFn: async () => {
        // TODO: call logout endpoint
        reset();
      },
    });
  },
};
