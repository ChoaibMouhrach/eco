import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICategory } from "@/interfaces/Category";
import { useDeleteCategory, useGetCategories } from "@/hooks";
import debounce from "@/lib/debounce";
import DataTable from "@/components/custom/data/table";

const columns: ColumnDef<ICategory>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => moment(row.original.createdAt).fromNow(),
  },
];

export default function DashboardCategoriesPage() {
  // hooks
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 8,
    pageIndex: 0,
  });

  const { data: categories, refetch } = useGetCategories({
    search,
    page: pagination.pageIndex + 1,
  });

  const { mutateAsync: deleteCategory } = useDeleteCategory();

  // useeffects
  useEffect(() => {
    refetch();
  }, [pagination, search]);

  // handlers
  const handleEdit = (id: number) => {
    router.push(`/dashboard/categories/edit/${id}`);
  };

  const handleDelete = (id: number) =>
    deleteCategory(id, { onSuccess: () => refetch() });

  const changeSearch = debounce((value: string) => {
    setSearch(value);
  });

  const handleSearch = (value: string) => {
    changeSearch(value);
  };

  return (
    <DataTable<ICategory>
      pageCount={
        categories
          ? Math.ceil(categories.data.count / categories.data.limit)
          : 0
      }
      columns={columns}
      data={categories?.data.data ?? []}
      pagination={pagination}
      setPagination={setPagination}
      handleSearch={handleSearch}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
