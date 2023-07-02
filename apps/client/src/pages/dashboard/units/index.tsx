import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from "@/components/layouts";
import { IUnit } from "@/interfaces/Unit";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DataTable from "@/components/custom/DataTable";
import { useDeleteUnit, useGetUnits } from "@/hooks";
import debounce from "@/lib/debounce";

interface UnitsProps {
  user: IUser;
}

const columns: ColumnDef<IUnit>[] = [
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

export default function Units({ user }: UnitsProps) {
  // HOOKS
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 8,
    pageIndex: 0,
  });

  const { data: units, refetch } = useGetUnits({
    page: pagination.pageIndex + 1,
    search,
  });

  const { mutate: deleteUnit } = useDeleteUnit();

  // USEEFFECTS
  useEffect(() => {
    refetch();
  }, [pagination, search]);

  // HANDLERS
  const handleEdit = (id: number) => {
    router.push(`/dashboard/units/edit/${id}`);
  };

  const handleDelete = (id: number) =>
    deleteUnit(id, { onSuccess: () => refetch() });

  const changePage = debounce((value: string) => {
    setSearch(value);
    refetch();
  });

  const handleSearch = (value: string) => {
    changePage(value);
  };

  return (
    <DashboardLayout
      user={user}
      title="Units"
      description="You can manage your units from here"
    >
      <DataTable<IUnit>
        handleSearch={handleSearch}
        pageCount={units ? Math.ceil(units.data.count / units.data.limit) : 0}
        columns={columns}
        data={units?.data.data ?? []}
        pagination={pagination}
        setPagination={setPagination}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
