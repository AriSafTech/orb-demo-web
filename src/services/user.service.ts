import { Client } from "./../api/generated-api-types.d";
import { getApiClient } from "@/api/client";
import { MUTATION_KEYS } from "@/constants/mutation-keys.constants";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { headers } from "next/headers";

export type User = {
  name: string;
  email: string;
  phone?: string;
  id: string;
  balance: number;
};

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
    // const { user } = useAuthStore();
    return useMutation({
      mutationKey: [MUTATION_KEYS.myInfo],
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
        const res = await client.paths["/api/v1/users/{id}"].put(
          userId,
          {
            name,
            phone,
            address,
            bank_details,
            gender,
            avatar,
          },
          // { headers: { "Content-Type": "multipart/form-data" } },
        );
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
        // return res.data.data?.user;
        //   if (user) {
        //     setData({
        //       user: {
        //         email: user.email!,
        //         // @ts-ignore
        //         name: user.name!,
        //         userName: user.username!,
        //         role: user.role!.name as AppRole,
        //       },
        //       tokens: {
        //         accessToken: user.token!.access_token!,
        //         refreshToken: user.token!.refresh_token!,
        //       },
        //     });
        //   }
        //   return res.data.data?.user;
      },
    });
  },
};
