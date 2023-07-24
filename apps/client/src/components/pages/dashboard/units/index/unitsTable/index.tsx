import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/router";
import DataTable from "@/components/custom/data/table";
import { IUnit } from "@/interfaces/Unit";
import { columns } from "./columns";
import { IPaginate } from "@/interfaces/Common";
import debounce from "@/lib/debounce";
import { DeleteUnitDialog } from "./DeleteUnitDialog";

interface IQuery {
  search: string;
  page: number;
}

interface UnitsTableProps {
  units?: IPaginate<IUnit>;
  query: IQuery;

  refetch: () => any;
  setQuery: React.Dispatch<React.SetStateAction<IQuery>>;
}

export function UnitsTable({
  units,
  query,
  refetch,
  setQuery,
}: UnitsTableProps) {
  const router = useRouter();
  const [deleteUnit, setDeleteUnit] = useState<IUnit | null>(null);

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
      <DataTable<IUnit>
        // data
        columns={columns}
        data={units?.data ?? []}
        pageCount={units ? Math.ceil(units.count / units.limit) : 1}
        // handlers
        onPaginationChange={onPaginationChange}
        onSearchChange={onSearchChange}
        // actions
        actions={{
          Update: (unit: IUnit) => {
            router.push(`/dashboard/units/edit/${unit.id}`);
          },
          Delete: (unit: IUnit) => {
            setDeleteUnit(unit);
          },
        }}
      />

      {deleteUnit && (
        <DeleteUnitDialog
          unit={deleteUnit}
          setUnit={setDeleteUnit}
          refetch={refetch}
        />
      )}
    </>
  );
}
