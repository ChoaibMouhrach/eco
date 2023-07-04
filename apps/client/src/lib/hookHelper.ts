import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

interface IndexRequestHelper {
  page?: number;
  search?: string;
  enabled?: boolean;
}

const indexRequestHelper = <T>(
  func: (
    query: Record<string, string>,
    options?: Omit<UseQueryOptions<T, unknown, T>, "initialData">
  ) => UseQueryResult<T, any>
) => {
  const useIndexHook = (
    { page, search }: IndexRequestHelper,
    options?: Omit<UseQueryOptions<T>, "initialData">
  ) => {
    const query: Record<string, string> = {};

    if (page) {
      query.page = String(page);
    }

    if (search) {
      query.search = String(search);
    }

    return func(query, options);
  };

  return useIndexHook;
};

export default indexRequestHelper;
