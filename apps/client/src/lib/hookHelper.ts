import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

const indexRequestHelper = <T>(
  func: (
    query: Record<string, string>,
    options?: Omit<UseQueryOptions<T, unknown, T>, "initialData">
  ) => UseQueryResult<T, any>
) => {
  const useIndexHook = (
    indexQuery: Record<string, any>,
    options?: Omit<UseQueryOptions<T>, "initialData">
  ) => {
    const query: Record<string, string> = {};

    Object.entries(indexQuery).forEach(([key, value]) => {
      if (value) {
        query[key] = String(value);
      }
    });

    return func(query, options);
  };

  return useIndexHook;
};

export default indexRequestHelper;
