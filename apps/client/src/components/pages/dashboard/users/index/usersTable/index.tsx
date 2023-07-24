import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/router";
import DataTable from "@/components/custom/data/table";
import { IUser } from "@/interfaces/User";
import { columns } from "./columns";
import { IPaginate } from "@/interfaces/Common";
import debounce from "@/lib/debounce";
import { DeleteUserDialog } from "./DeleteUserDialog";

interface IQuery {
  search: string;
  page: number;
}

interface UsersTableProps {
  query: IQuery;
  setQuery: React.Dispatch<React.SetStateAction<IQuery>>;

  users?: IPaginate<IUser>;
  refetch: () => any;
}

export function UsersTable({
  users,
  query,
  setQuery,
  refetch,
}: UsersTableProps) {
  const router = useRouter();
  const [deleteUser, setDeleteUser] = useState<IUser | null>(null);

  const onSearchChange = useCallback(
    debounce((search: string) => {
      setQuery({
        ...query,
        search,
      });
    }),
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
      <DataTable<IUser>
        // data
        columns={columns}
        data={users?.data ?? []}
        pageCount={users ? Math.ceil(users.count / users.limit) : 1}
        // events
        onPaginationChange={onPaginationChange}
        onSearchChange={onSearchChange}
        actions={{
          Update: (user: IUser) => {
            router.push(`/dashboard/users/edit/${user.id}`);
          },
          Delete: (user: IUser) => {
            setDeleteUser(user);
          },
        }}
      />

      {deleteUser && (
        <DeleteUserDialog
          user={deleteUser}
          setUser={setDeleteUser}
          refetch={refetch}
        />
      )}
    </>
  );
}
