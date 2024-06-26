import { Client } from "./../api/generated-api-types.d";
import { getApiClient } from "@/api/client";
import { MUTATION_KEYS } from "@/constants/mutation-keys.constants";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { useAuthStore } from "@/stores/authStore";
import Pusher from "pusher-js";
import { coinService } from "@/services/coin.service";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { notifyUser } from "@/components/custom/Echo";
import { useMemo } from "react";
import { NotificationItem } from "@/lib/notirfication-utils";

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
        const client = await getApiClient();
        const res = await client.getAllUsers();
        return res?.data?.data?.users;
      },
      // enabled: !!tokens && !!user && user.role === "admin",
      //   initialData: [],
    });
    return query;
  },

  useSingleUser(id: string | null) {
    const query = useQuery({
      queryKey: [QUERY_KEYS.getSingleUser, id],
      queryFn: async () => {
        const client = await getApiClient();
        const res = await client.getSingleUserById(id);
        return res?.data?.data?.user;
      },
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
          queryKey: [QUERY_KEYS.getProfile, QUERY_KEYS.getAllUsers],
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
    const { data: coinsData } = coinService.useAllCoins();
    const coins = useMemo(
      () =>
        coinsData
          ? Object.fromEntries(coinsData.map((c) => [c.coin_id!, c.name!]))
          : null,
      [coinsData],
    );

    const queryClient = useQueryClient();
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    const query = useQuery({
      queryKey: [QUERY_KEYS.getUserNotifications],
      queryFn: async () => {
        const client = await getApiClient();
        const params = {
          // @ts-ignore
          user_id: user.id,
        };
        const res = await client.getAllNotifications(params);

        var channel = pusher.subscribe(`notification-${user?.id}`);
        channel.bind("notification-event", async function (data: any) {
          if (data) {
            const coinName = coins ? coins[data.notification.coin_id] : null;
            // notifyUser(data.notification, coinName);

            await queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.getUserNotifications],
            });
          }
        });

        return res?.data?.data?.notifications as NotificationItem[];
      },
    });

    return query;
  },

  // useUpdateUserIsSeenNotifications(id: string) {
  //   const queryClient = useQueryClient();
  //   return useMutation({
  //     mutationKey: [MUTATION_KEYS.userNotificationsSeen],
  //     mutationFn: async ({ is_seen }: { is_seen: boolean }) => {
  //       const client = await getApiClient();
  //       const res = await client.updateNotification(
  //         { id },
  //         {
  //           is_seen,
  //         },
  //       );

  //       await queryClient.invalidateQueries({
  //         queryKey: [QUERY_KEYS.getUserNotifications],
  //       });
  //       return res.data.data;
  //     },
  //   });
  // },

  useUpdateUserIsSeenNotifications(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: [MUTATION_KEYS.userNotificationsSeen],
      mutationFn: async ({ is_seen }: { is_seen: boolean }) => {
        const client = await getApiClient();
        const res = await client.updateNotification(
          { id },
          {
            is_seen,
          },
        );
        return res.data.data;
      },
      onMutate: async ({ is_seen }: { is_seen: boolean }) => {
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.getUserNotifications],
        });

        const previousNotifications = queryClient.getQueryData([
          QUERY_KEYS.getUserNotifications,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          [QUERY_KEYS.getUserNotifications],
          (old: { id: string }) => {
            if (Array.isArray(old)) {
              return old.map((notification) =>
                notification.id === id
                  ? { ...notification, is_seen }
                  : notification,
              );
            }
            return old;
          },
        );

        // Return a context object with the snapshotted value
        return { previousNotifications };
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          [QUERY_KEYS.getUserNotifications],
          context?.previousNotifications,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getUserNotifications],
        });
      },
    });
  },

  // Single user name from id
  useSingleUserName(username: string | null) {
    const query = useQuery({
      queryKey: [QUERY_KEYS.getSingleUserName, username],
      queryFn: async () => {
        const client = await getApiClient();
        const res = await client.getSingleUserByUsername(username);
        return res?.data?.data?.user;
      },
    });
    return query;
  },
};
