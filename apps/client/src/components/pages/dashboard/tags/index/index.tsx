import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import DataTable from "@/components/custom/data/table";
import { useDeleteTag, useGetTags } from "@/hooks";
import { ITag } from "@/interfaces/Tag";
import debounce from "@/lib/debounce";
import { IPaginate } from "@/interfaces/Common";

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

interface DashboardTagsPageProps {
  defaultTags: IPaginate<ITag>;
}

export default function DashboardTagsPage({
  defaultTags,
}: DashboardTagsPageProps) {
  const [tags, setTags] = useState<IPaginate<ITag>>(defaultTags);
  const router = useRouter();
  const [page, setPage] = useState({
    value: 1,
    changed: false,
  });

  const [search, setSearch] = useState({
    value: "",
    changed: false,
  });

  const { data: newTags, refetch: refetchTags } = useGetTags(
    { page: page.value, search: search.value },
    { enabled: false }
  );

  const { mutateAsync: deleteTag } = useDeleteTag();

  const changeTags = useCallback(
    debounce(() => refetchTags()),
    []
  );

  const onPaginationChange = (pagination: PaginationState) => {
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

  const onDelete = (id: number) =>
    deleteTag(id, {
      onSuccess: () => {
        refetchTags();
      },
    });

  const onEdit = (id: number) => {
    router.push(`/dashboard/tags/edit/${id}`);
  };

  useEffect(() => {
    if (newTags) {
      setTags(newTags.data);
    }
  }, [newTags]);

  useEffect(() => {
    if (page.changed) {
      refetchTags();
    }
  }, [page]);

  useEffect(() => {
    if (search.changed) {
      changeTags();
    }
  }, [search]);

  return (
    <DataTable<ITag>
      columns={columns}
      data={tags.data}
      pageCount={Math.ceil(tags.count / tags.limit)}
      // handlers
      onPaginationChange={onPaginationChange}
      onSearchChange={onSearchChange}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
}
