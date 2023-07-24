import { useState } from "react";
import { UsersTable } from "./usersTable";
import { useGetUsers } from "@/hooks";

export default function DashboardUsersPage() {
  const [query, setQuery] = useState({
    search: "",
    page: 1,
  });

  const { data: users, refetch } = useGetUsers(query);

  return (
    <UsersTable
      users={users?.data}
      query={query}
      setQuery={setQuery}
      refetch={refetch}
    />
  );
}
