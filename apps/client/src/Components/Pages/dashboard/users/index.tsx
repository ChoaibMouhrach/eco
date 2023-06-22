import { ChangeEvent, useEffect, useState } from "react";
import { Column, Pagination, Table } from "ui";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import useGetUsers from "@/hooks/useGetUsers";
import { User } from "@/index";
import debounce from "@/utils/debounce";

interface UsersPageProps {
  user: User;
}

const columns: Column<User>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Email Address",
    accessorKey: "email",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
];

export default function UsersPage({ user }: UsersPageProps) {
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [search, setSearch] = useState<string | undefined>();

  const {
    data: users,
    isLoading,
    refetch,
  } = useGetUsers({ search, page: pagination.pageIndex });

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
      <Table<User>
        data={users?.data.data ?? []}
        columns={columns}
        pageCount={users ? Math.ceil(users.data.count / users.data.limit) : 0}
        pagination={pagination}
        setPagination={setPagination}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />
    </DashboardLayout>
  );
}
