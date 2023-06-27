import { ChangeEvent, useEffect, useState } from "react";
import { Column, Pagination, Table } from "ui";
import { useRouter } from "next/router";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import useGetUnits from "@/hooks/useGetUnits";
import { Unit, User } from "@/index";
import debounce from "@/utils/debounce";
import useDestroyUnit from "@/hooks/useDestroyUnit";

interface UnitsPageProps {
  user: User;
}

const columns: Column<Unit>[] = [
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

export default function UnitsPage({ user }: UnitsPageProps) {
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 8,
  });

  const router = useRouter();

  const [search, setSearch] = useState<string | undefined>();

  const {
    data: units,
    isLoading,
    refetch,
  } = useGetUnits({ search, page: pagination.pageIndex });

  const mutateSearch = debounce((v: string) => {
    setSearch(v);
  });

  const { mutateAsync: destroyUnit } = useDestroyUnit();

  useEffect(() => {
    refetch();
  }, [search, pagination]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    mutateSearch(e.target.value);
  };

  const handleDestroyUnit = async (id: number) => {
    try {
      await destroyUnit(id);
      await refetch();
    } catch (err) {
      // toast
    }
  };

  const handleUpdateUnit = (id: number) => {
    router.push(`/dashboard/units/edit/${id}`);
  };

  return (
    <DashboardLayout user={user}>
      <Table<Unit>
        data={units?.data.data ?? []}
        columns={columns}
        pageCount={units ? Math.ceil(units.data.count / units.data.limit) : 0}
        pagination={pagination}
        setPagination={setPagination}
        handleSearch={handleSearch}
        isLoading={isLoading}
        handleDelete={handleDestroyUnit}
        handleEdit={handleUpdateUnit}
      />
    </DashboardLayout>
  );
}
