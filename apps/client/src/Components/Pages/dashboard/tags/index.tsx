import { ChangeEvent, useEffect, useState } from "react";
import { Column, Pagination, Table } from "ui";
import { useRouter } from "next/router";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import useGetTags from "@/hooks/useGetTags";
import { Tag, User } from "@/index";
import debounce from "@/utils/debounce";
import useDestroyTag from "@/hooks/useDestroyTag";

interface TagsPageProps {
  user: User;
}

const columns: Column<Tag>[] = [
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

export default function TagsPage({ user }: TagsPageProps) {
  const router = useRouter();
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [search, setSearch] = useState<string | undefined>();

  const {
    data: tags,
    isLoading,
    refetch,
  } = useGetTags({ search, page: pagination.pageIndex });

  const { mutateAsync: destroyTag } = useDestroyTag();

  const handleDestroyTag = async (id: number) => {
    try {
      await destroyTag(id);
      await refetch();
    } catch (err) {
      // toast goes here
    }
  };

  const handleEditTag = (id: number) => {
    router.push(`/dashboard/tags/edit/${id}`);
  };

  const mutateSearch = debounce((v: string) => {
    setSearch(v);
  });

  useEffect(() => {
    refetch();
  }, [search, pagination]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    mutateSearch(e.target.value);
  };

  return (
    <DashboardLayout user={user}>
      <Table<Tag>
        data={tags?.data.data ?? []}
        columns={columns}
        pageCount={tags ? Math.ceil(tags.data.count / tags.data.limit) : 0}
        pagination={pagination}
        setPagination={setPagination}
        handleSearch={handleSearch}
        isLoading={isLoading}
        handleDelete={handleDestroyTag}
        handleEdit={handleEditTag}
      />
    </DashboardLayout>
  );
}
