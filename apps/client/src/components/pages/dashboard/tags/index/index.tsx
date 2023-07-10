import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DataTable from "@/components/custom/data/table";
import { useDeleteTag, useGetTags } from "@/hooks";
import { ITag } from "@/interfaces/Tag";
import debounce from "@/lib/debounce";

const columns: ColumnDef<ITag>[] = [
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

export default function DashboardTagsPage() {
  // hooks
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 8,
    pageIndex: 0,
  });

  const { data: tags, refetch } = useGetTags({
    search,
    page: pagination.pageIndex + 1,
  });

  const { mutateAsync: deleteTag } = useDeleteTag();

  // useEffects
  useEffect(() => {
    refetch();
  }, [pagination, search]);

  // handlers
  const changeSearch = debounce((value: string) => {
    setSearch(value);
  });

  const handleSearch = (value: string) => {
    changeSearch(value);
  };

  const handleEdit = (id: number) => {
    router.push(`/dashboard/tags/edit/${id}`);
  };

  const handleDelete = (id: number) =>
    deleteTag(id, { onSuccess: () => refetch() });

  return (
    <DataTable<ITag>
      columns={columns}
      data={tags?.data.data ?? []}
      pageCount={tags ? Math.ceil(tags.data.count / tags.data.limit) : 0}
      handleSearch={handleSearch}
      onDelete={handleDelete}
      onEdit={handleEdit}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
