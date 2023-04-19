import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  credentials: "include",
});

const baseQueryWithAuth = async (
  args: FetchArgs | string,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error && response.error.status === 401) {
    const errorData = response.error.data as { message?: string };
    if (errorData.message === "token expired") {
      const refreshResponse = await baseQuery(
        {
          url: "/refresh",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("refreshToken")}`,
          },
        },
        api,
        extraOptions
      );

      if (refreshResponse.error) {
        return response;
      }

      const { accessToken, refreshToken } = refreshResponse.data as {
        accessToken: string;
        refreshToken: string;
      };

      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      if (typeof args === "string") {
        args = {
          url: args,
        };
      } else {
        args.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
      }

      response = await baseQuery(
        {
          ...args,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        api,
        extraOptions
      );

      return response;
    }
  }

  return response;
};

const api = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});

export default api;
