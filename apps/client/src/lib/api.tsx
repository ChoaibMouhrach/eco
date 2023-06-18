import axios from "axios";
import { HttpError } from "..";

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.response.use(
  (r) => r,
  async (err: HttpError) => {
    if (
      err.response &&
      !(err.response.data.content instanceof Array) &&
      err.response.data.content.message === "jwt expired"
    ) {
      const response = await api({
        url: "/refresh",
        method: "post",
        headers: {
          Cookie: err.config?.headers.Cookie,
        },
      });

      if (response.status === 204) {
        return await api({
          url: err.config?.url,
          method: err.config?.method,
          headers: {
            ...err.config?.headers,
            Cookie: response.headers["set-cookie"],
            "set-cookie": response.headers["set-cookie"],
          },
        });
      }
    }

    return Promise.reject(err);
  }
);

export default api;
