import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DataTable from "@/components/custom/DataTable";
import { DashboardLayout } from "@/components/layouts";
import { useDeleteCategory, useGetCategories } from "@/hooks";
import { ICategory } from "@/interfaces/Category";
import { IUser } from "@/interfaces/User";
import debounce from "@/lib/debounce";
import { withAuth } from "@/middlewares";

interface CategoriesProps {
  user: IUser;
}

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
  },
];

export default function Categories({ user }: CategoriesProps) {
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

  const { mutate: deleteCategory } = useDeleteCategory();

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
    <DashboardLayout
      user={user}
      title="Categories"
      description="You can manage your categories from here"
    >
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
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
