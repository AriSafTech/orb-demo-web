import OpenAPIClientAxios from "openapi-client-axios";
import definition from "./generated-api-doc.json";
import type { Client as DemoApiClient } from "./generated-api-types";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { prefix } from "./operation-transform";
import { refreshAuth } from "./refresh-auth";
import { useAuthStore } from "@/stores/authStore";

const api = new OpenAPIClientAxios({
  // @ts-ignore
  definition,
  withServer: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});

let client: DemoApiClient | null = null;

export const getApiClient = async () => {
  if (!client) {
    client = await api.getClient<DemoApiClient>();
    createAuthRefreshInterceptor(client, refreshAuth, {
      statusCodes: [401],
      shouldRefresh: (error) => {
        console.log(
          "ACCESS TOKEN INVALID:",
          useAuthStore.getState().tokens?.accessToken,
        );
        const refreshToken = useAuthStore.getState().tokens?.refreshToken;
        return !!refreshToken;
      },
      pauseInstanceWhileRefreshing: false,
    });
  }
  // if (accessToken == null) {
  //   delete client.defaults.headers["authorization"];
  // }
  const accessToken = useAuthStore.getState().tokens?.accessToken;
  if (
    accessToken &&
    client.defaults.headers.common.Authorization !== `Bearer ${accessToken}`
  ) {
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  return client;
};

export const setHeaderToken = async (accessToken: string) => {
  const client = await getApiClient();
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const removeHeaderToken = async () => {
  const client = await getApiClient();
  delete client.defaults.headers.common.Authorization;
};
