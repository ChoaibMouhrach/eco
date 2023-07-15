import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import DataTable from "@/components/custom/data/table";
import { IUnit } from "@/interfaces/Unit";
import { IPaginate } from "@/interfaces/Common";
import { useDeleteUnit, useGetUnits } from "@/hooks";
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

interface DashboardUnitsPageProps {
  defaultUnits: IPaginate<IUnit>;
}

export default function DashboardUnitsPage({
  defaultUnits,
}: DashboardUnitsPageProps) {
  const router = useRouter();
  const [units, setUnits] = useState<IPaginate<IUnit>>(defaultUnits);

  const [page, setPage] = useState({
    value: 1,
    changed: false,
  });

  const [search, setSearch] = useState({
    value: "",
    changed: false,
  });

  const { mutateAsync: deleteUnit } = useDeleteUnit();

  const { data: newUnits, refetch: refetchUnits } = useGetUnits(
    { page: page.value, search: search.value },
    { enabled: false }
  );

  const changeSearch = useCallback(
    debounce(() => refetchUnits()),
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
    router.push(`/dashboard/units/edit/${id}`);
  };

  const onDelete = (id: number) =>
    deleteUnit(id, {
      onSuccess: () => {
        refetchUnits();
      },
    });

  useEffect(() => {
    if (newUnits) {
      setUnits(newUnits.data);
    }
  }, [newUnits]);

  useEffect(() => {
    if (search.changed) {
      changeSearch();
    }
  }, [search]);

  useEffect(() => {
    if (page.changed) {
      refetchUnits();
    }
  }, [page]);

  return (
    <DataTable<IUnit>
      // data
      columns={columns}
      data={units.data}
      pageCount={Math.ceil(units.count / units.limit)}
      // handlers
      onPaginationChange={onPaginationChange}
      onSearchChange={onSearchChange}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
