// imports
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { ICategory } from "@/interfaces/Category";
import { useDeleteCategory, useGetCategories } from "@/hooks";
import debounce from "@/lib/debounce";
import DataTable from "@/components/custom/data/table";
import { IPaginate } from "@/interfaces/Common";

// table columns
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
    // x minutes ago
    cell: ({ row }) => moment(row.original.createdAt).fromNow(),
  },
];

interface DashboardCategoriesPageProps {
  defaultCategories: IPaginate<ICategory>;
}

export default function DashboardCategoriesPage({
  defaultCategories,
}: DashboardCategoriesPageProps) {
  const router = useRouter();
  const [categories, setCategories] =
    useState<IPaginate<ICategory>>(defaultCategories);

  // query params
  const [search, setSearch] = useState({
    value: "",
    changed: false,
  });

  const [page, setPage] = useState({
    value: 1,
    changed: false,
  });

  const { data: newCategories, refetch: refetchCategories } = useGetCategories(
    {
      page: page.value,
      search: search.value,
      // disabled on component mount
    },
    { enabled: false }
  );

  const { mutate: deleteCategory } = useDeleteCategory();

  // handlers
  const changeSearch = useCallback(
    debounce(() => refetchCategories()),
    []
  );

  const handlePage = (pagination: PaginationState) => {
    setPage({
      value: pagination.pageIndex + 1,
      changed: true,
    });
  };

  const handleSearch = (value: string) => {
    setSearch({
      value,
      changed: true,
    });
  };

  const handleDelete = (id: number) =>
    deleteCategory(id, {
      onSuccess: () => {
        refetchCategories();
      },
    });

  const handleEdit = (id: number) => {
    router.push(`/dashboard/categories/edit/${id}`);
  };

  // useEffects
  useEffect(() => {
    if (newCategories) {
      setCategories(newCategories.data);
    }
  }, [newCategories]);

  useEffect(() => {
    if (page.changed) {
      refetchCategories();
    }
  }, [page]);

  useEffect(() => {
    if (search.changed) {
      changeSearch();
    }
  }, [search]);

  return (
    <DataTable<ICategory>
      // data
      data={categories.data}
      columns={columns}
      pageCount={Math.ceil(categories.count / categories.limit)}
      // handlers
      onPaginationChange={handlePage}
      onSearchChange={handleSearch}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
}
