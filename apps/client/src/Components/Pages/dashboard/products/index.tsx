import { ChangeEvent, useEffect, useState } from "react";
import { Column, Pagination, Table } from "ui";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import useGetProducts from "@/hooks/useGetProducts";
import { Product, User } from "@/index";
import debounce from "@/utils/debounce";

interface ProductsPageProps {
  user: User;
}

const columns: Column<Product>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
];

export default function ProductsPage({ user }: ProductsPageProps) {
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [search, setSearch] = useState<string | undefined>();

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProducts({ search, page: pagination.pageIndex });

  const mutateSearch = debounce((v: string) => {
    setSearch(v);
  });

  useEffect(() => {
    refetch();
  }, [search, pagination]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    mutateSearch(e.target.value);
  };

  return (
    <DashboardLayout user={user}>
      <Table<Product>
        data={products?.data.data ?? []}
        columns={columns}
        pageCount={
          products ? Math.ceil(products.data.count / products.data.limit) : 0
        }
        pagination={pagination}
        setPagination={setPagination}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />
    </DashboardLayout>
  );
}
