import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import DataTable from "@/components/custom/data/table";
import { useDeleteUser, useGetUsers } from "@/hooks";
import { IUser } from "@/interfaces/User";
import debounce from "@/lib/debounce";
import { IPaginate } from "@/interfaces/Common";

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

interface DashboardUsersPageProps {
  defaultUsers: IPaginate<IUser>;
}

export default function DashboardUsersPage({
  defaultUsers,
}: DashboardUsersPageProps) {
  const router = useRouter();
  const [users, setUsers] = useState<IPaginate<IUser>>(defaultUsers);

  const [page, setPage] = useState({
    value: 1,
    changed: false,
  });

  const [search, setSearch] = useState({
    value: "",
    changed: false,
  });

  const { mutateAsync: deleteUser } = useDeleteUser();

  const { data: newUsers, refetch: refetchUsers } = useGetUsers(
    { page: page.value, search: search.value },
    { enabled: false }
  );

  const changeSearch = useCallback(
    debounce(() => refetchUsers()),
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

  const onEdit = (id: number) => {
    router.push(`/dashboard/users/edit/${id}`);
  };

  const onDelete = (id: number) =>
    deleteUser(id, {
      onSuccess: () => {
        refetchUsers();
      },
    });

  useEffect(() => {
    if (newUsers) {
      setUsers(newUsers.data);
    }
  }, [newUsers]);

  useEffect(() => {
    if (page.changed) {
      refetchUsers();
    }
  }, [page]);

  useEffect(() => {
    if (search.changed) {
      changeSearch();
    }
  }, [search]);

  return (
    <DataTable<IUser>
      columns={columns}
      data={users.data}
      pageCount={Math.ceil(users.count / users.limit)}
      // handlers
      onPaginationChange={onPaginationChange}
      onSearchChange={onSearchChange}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
