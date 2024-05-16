import OpenAPIClientAxios from "openapi-client-axios";
import definition from "./generated-api-doc.json";
import type { Client as DemoApiClient } from "./generated-api-types";
import { prefix } from "./operation-transform";

const api = new OpenAPIClientAxios({
  // @ts-ignore
  definition,
  withServer: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});

export const getApiClient = async (
  accessToken: string | null,
): Promise<DemoApiClient> => {
  const client = await api.getClient<DemoApiClient>();
  if (accessToken == null) {
    delete client.defaults.headers["authorization"];
  } else {
    client.defaults.headers["authorization"] = `Bearer ${accessToken}`;
  }
  return client;
};
