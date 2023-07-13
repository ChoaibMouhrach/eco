import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import DataTable from "@/components/custom/data/table";
import { useDeleteUnit, useGetUnits } from "@/hooks";
import { IUnit } from "@/interfaces/Unit";
import debounce from "@/lib/debounce";

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
    cell: ({ row }) => moment(row.original.createdAt).fromNow(),
  },
];

export default function DashboardUnitsPage() {
  // HOOKS
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 8,
    pageIndex: 0,
  });

  const { data: units, refetch } = useGetUnits(
    {
      page: pagination.pageIndex + 1,
      search,
    },
    { cacheTime: 600000 }
  );

  const { mutateAsync: deleteUnit } = useDeleteUnit();

  // HANDLERS
  const handleEdit = (id: number) => {
    router.push(`/dashboard/units/edit/${id}`);
  };

  const handleDelete = (id: number) =>
    deleteUnit(id, { onSuccess: () => refetch() });

  const changeSearch = debounce((value: string) => {
    setSearch(value);
  });

  const handleSearch = (value: string) => {
    changeSearch(value);
  };

  return (
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
  );
}
