import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { GetServerSidePropsContext } from "next";

const instance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

const api = async (
  config: AxiosRequestConfig,
  ctx?: GetServerSidePropsContext
) => {
  const { accessToken, refreshToken } = ctx
    ? ctx.req.cookies
    : { accessToken: undefined, refreshToken: undefined };

  try {
    const response = await instance({
      ...config,
      headers: {
        ...config.headers,
        Cookie: ctx
          ? `accessToken=${accessToken}; refreshToken=${refreshToken}`
          : undefined,
      },
    });

    if (ctx && response.headers["set-cookie"]) {
      console.log(response.headers["set-cookie"]);
      ctx.res.setHeader("set-cookie", response.headers["set-cookie"] ?? []);
    }

    return response;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 401) {
      const content = err.response?.data.content;

      if ("message" in content && content.message === "jwt expired") {
        try {
          const response = await instance({
            url: "/refresh",
            method: "POST",
            headers: ctx
              ? {
                  Cookie: [
                    `accessToken=${accessToken}`,
                    `refreshToken=${refreshToken}`,
                  ],
                }
              : config.headers,
          });

          if (ctx)
            ctx.res.setHeader("set-cookie", response.headers["set-cookie"]!);

          return await instance({
            ...config,
            headers: {
              ...config.headers,
              Cookie: response.headers["set-cookie"],
            },
          });
          // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (err) {
          /* empty */
        }
      }

      if (ctx) {
        ctx.res.setHeader("set-cookie", [
          "refreshToken=; path=/; MAX-AGE=0",
          "accessToken=; path=/; MAX-AGE=0",
        ]);
      }
    }

    return Promise.reject(err);
  }
};

export default api;
