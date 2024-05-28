import { getApiClient } from "@/api/client";
import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export const coinService = {
  useAllCoins() {
    return useQuery({
      queryKey: [QUERY_KEYS.getAllCoins],
      queryFn: async () => {
        const client = await getApiClient();
        // TODO: replace with working API
        const res = await client.coins({}, {});
        // console.log(res);

        return res.data?.data?.coins;
        // return [
        //   {
        //     id: "d54c5f88-1c4a-47df-ba9c-8362fc2abeb7",
        //     name: "Event Coin 1",
        //     coin_id: "event-coin1",
        //     exchange_rate: "120.00",
        //     start_date: "2024-05-01",
        //     validity: "2030-05-01",
        //     has_start_date: true,
        //     has_end_date: true,
        //   },
        //   {
        //     id: "d54c5f88-1c4a-47df-ba9c-8362fc2abeb2",
        //     name: "Event Coin 2",
        //     coin_id: "event-coin2",
        //     exchange_rate: "120.00",
        //     start_date: "2024-05-01",
        //     validity: "2030-05-01",
        //     has_start_date: true,
        //     has_end_date: true,
        //   },
        // ];
      },
    });
  },
};
