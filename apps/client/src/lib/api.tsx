import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";

const instance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

const api = async (
  config: AxiosRequestConfig<any>,
  ctx?: GetServerSidePropsContext
): Promise<AxiosResponse> => {
  let accessToken: string | undefined;
  let refreshToken: string | undefined;

  if (ctx) {
    accessToken = ctx.req.cookies.accessToken;
    refreshToken = ctx.req.cookies.refreshToken;
  }

  try {
    return await instance({
      ...config,
      headers:
        accessToken && refreshToken
          ? {
              Cookie: [
                `accessToken=${accessToken}`,
                `refreshToken=${refreshToken}`,
              ],
            }
          : undefined,
    });
  } catch (err) {
    if (
      err instanceof AxiosError &&
      err.response &&
      "message" in err.response.data.content &&
      err.response?.data.content.message === "jwt expired"
    ) {
      const response = await instance({
        url: "/refresh",
        method: "POST",
        headers: refreshToken
          ? {
              Cookie: [`refreshToken=${refreshToken}`],
            }
          : undefined,
      });

      if (ctx && response.headers["set-cookie"]) {
        ctx.res.setHeader("set-cookie", response.headers["set-cookie"]);
      }

      return await instance({
        ...config,
        headers: {
          Cookie: response.headers["set-cookie"],
        },
      });
    }

    return Promise.reject(err);
  }
};

export default api;
