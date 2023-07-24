import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/router";
import DataTable from "@/components/custom/data/table";
import { ICategory } from "@/interfaces/Category";
import { columns } from "./columns";
import { IPaginate } from "@/interfaces/Common";
import debounce from "@/lib/debounce";
import { DeleteCategoryDialog } from "./DeleteCategory";

interface IQuery {
  search: string;
  page: number;
}

interface CategoriesTableProps {
  query: IQuery;
  setQuery: React.Dispatch<React.SetStateAction<IQuery>>;

  categories?: IPaginate<ICategory>;
  refetch: () => any;
}

export function CategoriesTable({
  categories,
  query,
  refetch,
  setQuery,
}: CategoriesTableProps) {
  const router = useRouter();
  const [deleteCategory, setDeleteCategory] = useState<ICategory | null>(null);

  const onSearchChange = useCallback(
    debounce((search: string) =>
      setQuery({
        ...query,
        search,
      })
    ),
    []
  );

  const onPaginationChange = (pagination: PaginationState) => {
    setQuery({
      ...query,
      page: pagination.pageIndex + 1,
    });
  };

  return (
    <>
      <DataTable<ICategory>
        // data
        columns={columns}
        data={categories?.data ?? []}
        pageCount={
          categories ? Math.ceil(categories.count / categories.limit) : 1
        }
        // events
        onPaginationChange={onPaginationChange}
        onSearchChange={onSearchChange}
        actions={{
          Update: (category: ICategory) => {
            router.push(`/dashboard/categories/edit/${category.id}`);
          },
          Delete: (category: ICategory) => {
            setDeleteCategory(category);
          },
        }}
      />

      {deleteCategory && (
        <DeleteCategoryDialog
          category={deleteCategory}
          setCategory={setDeleteCategory}
          refetch={refetch}
        />
      )}
    </>
  );
}
