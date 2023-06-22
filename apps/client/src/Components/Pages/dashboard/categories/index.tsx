import { ChangeEvent, useEffect, useState } from "react";
import { Column, Pagination, Table } from "ui";
import { useRouter } from "next/router";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Category, User } from "@/index";
import useGetCategories from "@/hooks/useGetCategories";
import debounce from "@/utils/debounce";
import useDestroyCategory from "@/hooks/useDestroyCategory";

interface CategoriesPageProps {
  user: User;
}

const columns: Column<Category>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
];

export default function CategoriesPage({ user }: CategoriesPageProps) {
  // HOOKS
  const router = useRouter();
  const [search, setSearch] = useState<string | undefined>();
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 8,
  });
  const {
    data: categories,
    isLoading,
    refetch,
  } = useGetCategories({ search, page: pagination.pageIndex });

  const { mutateAsync: destroyCategory } = useDestroyCategory();

  // USEEFFECT
  useEffect(() => {
    refetch();
  }, [search, pagination]);

  //  HANDLERS
  const mutateSearch = debounce((v: string) => {
    setSearch(v);
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    mutateSearch(e.target.value);
  };

  const handleDestroyCategory = async (id: number) => {
    try {
      await destroyCategory(id);
      await refetch();
    } catch (err) {
      // TOAST GOES HERE
    }
  };

  const handleEditCategory = (id: number) => {
    router.push(`/dashboard/categories/edit/${id}`);
  };

  return (
    <DashboardLayout user={user}>
      <Table<Category>
        data={categories?.data.data ?? []}
        columns={columns}
        pageCount={
          categories
            ? Math.ceil(categories.data.count / categories.data.limit)
            : 0
        }
        pagination={pagination}
        setPagination={setPagination}
        handleSearch={handleSearch}
        isLoading={isLoading}
        handleDelete={handleDestroyCategory}
        handleEdit={handleEditCategory}
      />
    </DashboardLayout>
  );
}
