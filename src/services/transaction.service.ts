import { Client } from "./../api/generated-api-types.d";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { getApiClient } from "@/api/client";

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
};
