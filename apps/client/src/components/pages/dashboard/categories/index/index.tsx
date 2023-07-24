import { useState } from "react";
import { useGetCategories } from "@/hooks";
import { CategoriesTable } from "./CategoriesTable";

export default function DashboardCategoriesPage() {
  const [query, setQuery] = useState({
    search: "",
    page: 1,
  });

  const { data: categories, refetch } = useGetCategories(query);

  return (
    <CategoriesTable
      query={query}
      setQuery={setQuery}
      categories={categories?.data}
      refetch={refetch}
    />
  );
}
