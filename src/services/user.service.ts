import { getApiClient } from "@/api/client";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export type User = {
  name: string;
  email: string;
  phone?: string;
  id: string;
  balance: number;
};

export const userService = {
  useAllUsers() {
    const query = useQuery({
      queryKey: [QUERY_KEYS.getAllUsers],
      queryFn: async () => {
        // TODO: call actual API endpoint
        const client = await getApiClient();
        const res = await client.getAllUsers();
        return res?.data?.data?.users;
      },
      //   enabled: !!user && user.role === "admin",
      //   initialData: [],
    });
    return query;
  },
};
