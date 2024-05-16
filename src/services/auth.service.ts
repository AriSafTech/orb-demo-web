import {
  AuthenticationApi,
  AuthenticationApiFactory,
  AuthenticationApiFp,
  RegistrationRequestAttributeRoleNameEnum,
} from "@/api/generated";
import { MUTATION_KEYS } from "@/constants/mutation-keys.constants";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { ValueOf } from "@/lib/type-utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const authService = {
  useLogin() {
    return useMutation({
      mutationKey: [MUTATION_KEYS.login],
      mutationFn: async ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        const res = await AuthenticationApiFactory(
          undefined,
          process.env.NEXT_PUBLIC_API_BASE_URL,
        ).login({ email, password });
        return res.data.data?.user;
      },
    });
  },

  useRegister({ role }: { role: RegistrationRequestAttributeRoleNameEnum }) {
    return useMutation({
      mutationKey: [MUTATION_KEYS.register],
      mutationFn: async ({
        email,
        name,
        password,
      }: {
        email: string;
        name: string;
        password: string;
      }) => {
        const res = await AuthenticationApiFactory(
          undefined,
          process.env.NEXT_PUBLIC_API_BASE_URL,
        ).register({
          name,
          email,
          password,
          role_name: role,
          phone: undefined,
        });
      },
    });
  },

  useProfile() {
    const res = useQuery({
      queryKey: [QUERY_KEYS.getProfile],
    });
  },
};
