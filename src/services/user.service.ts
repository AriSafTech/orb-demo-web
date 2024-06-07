import { Client } from "./../api/generated-api-types.d";
import { getApiClient } from "@/api/client";
import { MUTATION_KEYS } from "@/constants/mutation-keys.constants";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { useAuthStore } from "@/stores/authStore";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";

export type User = {
  name: string;
  email: string;
  phone?: string;
  id: string | undefined;
  balance: number;
};
// export type UserUpdate = {
//   name: string;
//   phone?: string;
//   address?: string;
//   bank_details?: string;
//   gender?: "male" | "female" | "other" | undefined;
//   avatar?: File;
// };

export const userService = {
  useAllUsers() {
    // const { tokens, user } = useAuthStore();
    const query = useQuery({
      queryKey: [QUERY_KEYS.getAllUsers],
      queryFn: async () => {
        // TODO: call actual API endpoint
        const client = await getApiClient();
        const res = await client.getAllUsers();
        return res?.data?.data?.users;
      },
      // enabled: !!tokens && !!user && user.role === "admin",
      //   initialData: [],
    });
    return query;
  },

  useUpdateUserInfo(userId: string) {
    const { setData, user } = useAuthStore();
    const queryClient = useQueryClient();
    // const { user } = useAuthStore();
    return useMutation({
      mutationKey: [MUTATION_KEYS.myInfo],
      //@ts-ignore
      mutationFn: async ({
        name,
        phone,
        address,
        bank_details,
        gender,
        avatar,
      }: any) => {
        const client = await getApiClient();

        // Without form data
        const res = await client.paths["/api/v1/users/{id}"].post(
          userId,
          {
            name,
            phone,
            address,
            bank_details,
            gender,
            avatar,
            _method: "PUT",
          },
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getProfile],
        });
        return res.data.data?.user;
        // With form data
        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("phone", phone);
        // formData.append("address", address);
        // formData.append("bank_details", bank_details);
        // formData.append("gender", gender);
        // formData.append("avatar", avatar);
        // //@ts-ignore
        // const res = await client.updateStatus({ id: userId }, formData);
      },
    });
  },
  // update user status

  useUpdateUserStatus(userId: string) {
    // const { user } = useAuthStore();
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: [MUTATION_KEYS.userStatus],
      mutationFn: async ({ is_active }: { is_active: boolean }) => {
        const client = await getApiClient();
        const res = await client.updateStatus(
          { id: userId },
          {
            is_active,
          },
        );

        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getAllUsers],
        });
        return res.data.data?.user;
      },
    });
  },
  // User notifications
  useUserNotifications() {
    const { tokens, user } = useAuthStore();
    const query = useQuery({
      queryKey: [QUERY_KEYS.getUserNotifications],
      queryFn: async () => {
        // TODO: call actual API endpoint
        const client = await getApiClient();
        const params = {
          //@ts-ignore
          user_id: user.id,
        };
        const res = await client.getAllNotifications(params);
        return res?.data?.data?.notifications;
      },
      // enabled: !!tokens && !!user && user.role === "admin",
      //   initialData: [],
    });
    return query;
  },
};
