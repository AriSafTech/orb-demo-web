import { Client } from "./../api/generated-api-types.d";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { getApiClient } from "@/api/client";
import { MUTATION_KEYS } from "@/constants/mutation-keys.constants";

export const transactionService = {
  useTransactionList() {
    const { accessToken, user } = useAuthStore();
    const query = useQuery({
      queryKey: [QUERY_KEYS.getTransactionList],
      queryFn: async () => {
        // TODO: call actual API endpoint
        // const client = await getApiClient(accessToken)
        const client = await getApiClient(accessToken);
        const res = await client.getAllTransactions();
        return res;
      },
      //   enabled: !!user && user.role === "admin",
      //   enabled: !!accessToken,
      //   initialData: [],
    });
    return query;
  },

  useChargeAccount() {
    const { accessToken } = useAuthStore();
    const mutation = useMutation({
      mutationKey: [MUTATION_KEYS.chargeAccount],
      mutationFn: async ({
        amount,
        coinId,
        receiverId,
      }: {
        amount: number;
        coinId: string;
        receiverId: string;
      }) => {
        const client = await getApiClient(accessToken);
        const res = await client.recharge(
          {},
          {
            amount,
            // @ts-ignore
            receiver_id: receiverId,
            // @ts-ignore
            coin_id: coinId,
          },
        );
        return res.data?.data?.transaction;
      },
    });
  },
};
