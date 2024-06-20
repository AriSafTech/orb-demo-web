import { Client } from "./../api/generated-api-types.d";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { getApiClient } from "@/api/client";
import { MUTATION_KEYS } from "@/constants/mutation-keys.constants";
import { authService } from "./auth.service";

export const transactionService = {
  useAllTransactions() {
    const { user } = useAuthStore();
    const query = useQuery({
      queryKey: [QUERY_KEYS.getAllTransactions],
      queryFn: async () => {
        // const client = await getApiClient(accessToken)
        const client = await getApiClient();
        const res = await client.getAllTransactions();
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
        // const res = await client.getAllTransactions(user?.userName);
        const res = await client.getAllTransactions();
        return res.data.data?.transactions;
      },
      //   enabled: !!user && user.role === "admin",
      //   enabled: !!accessToken,
      //   initialData: [],
    });
    return query;
  },

  useMakePayment() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: [MUTATION_KEYS.makePayment],
      mutationFn: async ({
        amount,
        coinId,
        senderOrbId,
        receiverOrbId,
      }: {
        amount: number;
        coinId: string;
        senderOrbId: string;
        receiverOrbId: string;
      }) => {
        const client = await getApiClient();
        const res = await client.payments(
          {},
          {
            amount,
            coin: coinId,
            receiver: receiverOrbId,
            sender: senderOrbId,
          },
        );
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getSelfTransactions],
        });
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getProfile],
        });
        return res.data?.data?.transaction;
      },
    });
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
            coin: coinId,
          },
        );
        return res.data?.data?.transaction;
      },
    });
  },

  useRefund() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: [MUTATION_KEYS.refund],
      mutationFn: async ({ transactionId }: { transactionId: string }) => {
        const client = await getApiClient();
        const res = await client.refund(
          {},
          {
            transaction_id: transactionId,
            transaction_type: "ctom-payment",
          },
        );
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getSelfTransactions],
        });
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getProfile],
        });
        return res.data?.data?.transaction;
      },
    });
  },
};
