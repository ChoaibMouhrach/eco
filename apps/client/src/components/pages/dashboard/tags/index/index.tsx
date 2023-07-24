import { useState } from "react";
import { useGetTags } from "@/hooks";
import { TagsTable } from "./TagsTable";
import { columns } from "./TagsTable/columns";

export default function DashboardTagsPage() {
  const [query, setQuery] = useState({
    search: "",
    page: 1,
  });

  const { data: tags, refetch } = useGetTags(query);

  return (
    <TagsTable
      refetch={refetch}
      query={query}
      setQuery={setQuery}
      columns={columns}
      tags={tags?.data}
    />
  );
}
