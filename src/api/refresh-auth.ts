import { useAuthStore } from "@/stores/authStore";
import { getApiClient, removeHeaderToken, setHeaderToken } from "./client";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestConfig,
} from "axios";

export const fetchNewToken = async (refreshToken: string) => {
  // const client = await getApiClient();
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });
  try {
    console.log("FETCHING NEW TOKEN");
    // const res = await client.refreshToken({}, { refresh_token: refreshToken });
    // const res = await client.paths["/api/refresh"].post(
    //   {},
    //   { refresh_token: refreshToken },
    //   //@ts-ignore
    //   { skipAuthRefresh: true } as AxiosAuthRefreshRequestConfig,
    // );
    const res = await client.post(
      "/api/refresh",
      { refresh_token: refreshToken },
      { skipAuthRefresh: true } as AxiosAuthRefreshRequestConfig,
    );
    const newAccessToken = res.data.data?.token?.access_token;
    const newRefreshToken = res.data.data?.token?.refresh_token;
    console.log("NEW TOKEN:", newAccessToken);
    if (!newAccessToken || !newRefreshToken) {
      throw Error("Refresh token validity exceeded");
    }
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const refreshAuth = async (failedReq: AxiosError) => {
  console.log("FAILED REQ:", failedReq);
  const { refreshToken } = useAuthStore.getState().tokens || {};
  console.log("REFRESHING WITH REFRESH TOKEN:", refreshToken);
  if (!refreshToken) {
    console.log("No refresh token in store");
    throw Error("No refresh token in store.");
  }
  const newTokens = await fetchNewToken(refreshToken);
  if (newTokens) {
    useAuthStore.setState((draft) => {
      draft.tokens = newTokens;
    });
    failedReq.response!.config.headers["Authorization"] =
      `Bearer ${newTokens.accessToken}`;
    await setHeaderToken(newTokens.accessToken);
    return Promise.resolve(newTokens.accessToken);
  } else {
    useAuthStore.getState().reset();
    await removeHeaderToken();
    return Promise.reject();
  }
};
