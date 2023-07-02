import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from "@/components/layouts";
import { withAuth } from "@/middlewares";
import { IUser } from "@/interfaces/User";
import DataTable from "@/components/custom/DataTable";
import { ITag } from "@/interfaces/Tag";
import debounce from "@/lib/debounce";
import { useDeleteTag, useGetTags } from "@/hooks";

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
  },
];

interface TagsProps {
  user: IUser;
}

export default function Tags({ user }: TagsProps) {
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

  const { mutate: deleteTag } = useDeleteTag();

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
    <DashboardLayout
      user={user}
      title="Tags"
      description="You can manage your tags from here."
    >
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
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
