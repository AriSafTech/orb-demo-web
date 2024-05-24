import { Client } from "./../api/generated-api-types.d";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { getApiClient } from "@/api/client";
import { MUTATION_KEYS } from "@/constants/mutation-keys.constants";

export const transactionService = {
  useAllTransactions() {
    const { user } = useAuthStore();
    const query = useQuery({
      queryKey: [QUERY_KEYS.getAllTransactions],
      queryFn: async () => {
        // const client = await getApiClient(accessToken)
        const client = await getApiClient();
        const res = await client.getAllTransactions({ user: "hasib" });
        return res.data.data?.transactions;
      },
      //   enabled: !!user && user.role === "admin",
      //   enabled: !!accessToken,
      //   initialData: [],
    });
    return query;
  },

  // TODO: complete this for user (consumer, merchant)
  useSelfTransactions() {
    const { user } = useAuthStore();
    // console.log("user", user);
    const query = useQuery({
      queryKey: [QUERY_KEYS.getSelfTransactions],
      queryFn: async () => {
        // const client = await getApiClient(accessToken)
        const client = await getApiClient();
        const res = await client.getAllTransactions(user?.userName);
        return res.data.data?.transactions;
      },
      //   enabled: !!user && user.role === "admin",
      //   enabled: !!accessToken,
      //   initialData: [],
    });
    return query;
  },

  useChargeAccount() {
    return useMutation({
      mutationKey: [MUTATION_KEYS.chargeAccount],
      mutationFn: async ({
        amount,
        coinId,
        receiverOrbId,
      }: {
        amount: number;
        coinId: string;
        receiverOrbId: string;
      }) => {
        const client = await getApiClient();
        const res = await client.recharge(
          {},
          {
            amount,
            receiver: receiverOrbId,
            // @ts-ignore
            coin: coinId,
          },
        );
        return res.data?.data?.transaction;
      },
    });
  },
};
