import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DataTable from "@/components/custom/data/table";
import { useDeleteUser, useGetUsers } from "@/hooks";
import { IUser } from "@/interfaces/User";
import debounce from "@/lib/debounce";

const columns: ColumnDef<IUser>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Name",
    cell: ({ row }) => (
      <span>
        {row.original.firstName} {row.original.lastName}
      </span>
    ),
  },
  {
    header: "Email Address",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => <span>{row.original.role?.name}</span>,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => moment(row.original.createdAt).fromNow(),
  },
];

export default function DashboardUsersPage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const { data: users, refetch } = useGetUsers({
    search,
    page: pagination.pageIndex + 1,
  });

  const { mutateAsync: deleteUser } = useDeleteUser();

  // useeffect
  useEffect(() => {
    refetch();
  }, [pagination, search]);

  // hooks
  const changeSearch = debounce((value: string) => {
    setSearch(value);
  });

  const handleSearch = (value: string) => {
    changeSearch(value);
  };

  const handleUpdate = (id: number) => {
    router.push(`/dashboard/users/edit/${id}`);
  };

  const handleDelete = (id: number) =>
    deleteUser(id, { onSuccess: () => refetch() });

  return (
    <DataTable<IUser>
      columns={columns}
      data={users?.data.data ?? []}
      pageCount={users ? Math.ceil(users.data.count / users.data.limit) : 0}
      pagination={pagination}
      setPagination={setPagination}
      handleSearch={handleSearch}
      onEdit={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
