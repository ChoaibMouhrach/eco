import { useCallback, useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IProduct } from "@/interfaces/Product";
import { ProductsTable } from "./Table";
import { IPaginate } from "@/interfaces/Common";
import api from "@/api";
import debounce from "@/lib/debounce";

interface DashboardProductsPageProps {
  defaultProducts: IPaginate<IProduct>;
}

export default function DashboardProductsPage({
  defaultProducts,
}: DashboardProductsPageProps) {
  const [products, setProducts] =
    useState<IPaginate<IProduct>>(defaultProducts);

  const [page, setPage] = useState({
    value: 0,
    changed: false,
  });

  const [search, setSearch] = useState({
    value: "",
    changed: false,
  });

  const { data: newProducts, refetch: refetchProducts } = useQuery<
    AxiosResponse<IPaginate<IProduct>>
  >({
    queryKey: ["products"],
    queryFn: ({ queryKey }) => {
      console.log({ queryKey });
      return api({
        url: `/products?${new URLSearchParams({
          search: search.value,
          page: String(page.value),
        }).toString()}`,
      });
    },
    enabled: false,
    keepPreviousData: true,
  });

  const changeSearch = useCallback(
    debounce(() => {
      refetchProducts();
    }),
    []
  );

  const onPaginationChange = async (pagination: PaginationState) => {
    setPage({
      value: pagination.pageIndex + 1,
      changed: true,
    });
  };

  const onSearchChange = (value: string) => {
    setSearch({
      value,
      changed: true,
    });
  };

  useEffect(() => {
    if (newProducts) {
      setProducts(newProducts.data);
    }
  }, [newProducts]);

  useEffect(() => {
    if (search.changed) {
      changeSearch();
    }
  }, [search]);

  useEffect(() => {
    if (page.changed) {
      refetchProducts();
    }
  }, [page]);

  return (
    <ProductsTable
      onPaginationChange={onPaginationChange}
      onSearchChange={onSearchChange}
      products={products}
    />
  );
}
