import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";

const instance = axios.create({
  baseURL: process.env.API_URL,
});

const newApi = async (
  config: AxiosRequestConfig<any>,
  ctx: GetServerSidePropsContext
): Promise<AxiosResponse> => {
  const { accessToken, refreshToken } = ctx.req.cookies;

  try {
    return await instance({
      ...config,
      headers: {
        Cookie: [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`],
      },
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
        headers: {
          Cookie: [`refreshToken=${refreshToken}`],
        },
      });

      if (response.headers["set-cookie"]) {
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

export default newApi;
