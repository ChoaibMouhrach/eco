import { UseQueryResult } from "@tanstack/react-query";

interface IndexRequestHelper {
  page?: number;
  search?: string;
}

const indexRequestHelper = <T>(
  func: (query: Record<string, string>) => UseQueryResult<T, any>
) => {
  const useIndexHook = ({ page, search }: IndexRequestHelper) => {
    const query: Record<string, string> = {};

    if (page) {
      query.page = String(page);
    }

    if (search) {
      query.search = String(search);
    }

    return func(query);
  };

  return useIndexHook;
};

export default indexRequestHelper;
