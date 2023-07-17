import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { ProductsTable } from "./Table";
import { Filter, Query } from "./Filter";
import api from "@/api";

const clearQuery = (rawQuery: Record<string, any>) => {
  const query: Record<string, string> = {};

  Object.entries(rawQuery).forEach(([key, value]) => {
    if (value) {
      query[key] = String(value);
    }
  });

  return query;
};

export default function DashboardProductsPage() {
  const [query, setQuery] = useState<Query>({
    price: undefined,
    page: undefined,
    search: undefined,
    sort: "id",
    order: undefined,
    isExclusive: undefined,
  });

  const { data: products, refetch: refetchProducts } = useQuery({
    queryKey: ["products", query],
    queryFn: () => {
      return api({
        url: `/products?${new URLSearchParams(
          clearQuery({
            page: query.page,
            search: query.search,
            sort: query.sort
              ? `${query.sort}-${query.order ?? "asc"}`
              : undefined,
            isExclusive: query.isExclusive,
            price: query.price
              ? `${query.price.min}-${query.price.max}`
              : undefined,
          })
        ).toString()}`,
      });
    },
    keepPreviousData: true,
  });

  const handleSearch = (value: string) =>
    setQuery({
      ...query,
      search: value,
    });

  const handlePagination = (pagination: PaginationState) =>
    setQuery({
      ...query,
      page: pagination.pageIndex + 1,
    });

  return (
    <div className="flex flex-col gap-4">
      <Filter query={query} setQuery={setQuery} />
      <ProductsTable
        pageCount={
          products ? Math.ceil(products.data.count / products.data.limit) : 1
        }
        products={products?.data.data ?? []}
        // handlers
        handlePagination={handlePagination}
        handleSearch={handleSearch}
        refetchProducts={refetchProducts}
      />
    </div>
  );
}
