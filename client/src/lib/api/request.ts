import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const request = async (
  config: AxiosRequestConfig<any>,
  ctx: GetServerSidePropsContext
): Promise<AxiosResponse | null> => {
  const tokens = ctx.req.cookies as {
    accessToken?: string;
    refreshToken?: string;
  };

  try {
    /* Run the first request */
    return await api({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  } catch (err: any) {
    /* Check if the roken has expired */
    if (err.response.data?.message === "token expired") {
      try {
        /* refresh the token */
        const response = await api({
          url: "/refresh",
          method: "post",
          headers: {
            Authorization: `Bearer ${tokens?.refreshToken}`,
          },
        });

        /* Extract the tokens from the response */
        const { refreshToken, accessToken } = response.data as {
          refreshToken: string;
          accessToken: string;
        };

        /* update the headers */
        ctx.res.setHeader("set-cookie", [
          `refreshToken=${refreshToken}`,
          `accessToken=${accessToken}`,
        ]);

        /* rerun the first request with the new token */
        return await api({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        /* return null if the refresh token failed and clear cookies */
        ctx.res.setHeader("set-cookie", [
          `refreshToken=;Max-Age=0`,
          `accessToken=;Max-Age=0`,
        ]);
        return null;
      }
    }

    /* if the token is not expired */
    return null;
  }
};

export default request;

