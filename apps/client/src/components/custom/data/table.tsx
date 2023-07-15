import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Actions } from "./Actions";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount: number;

  onSearchChange?: (value: string) => any;

  onPaginationChange?: (pagination: PaginationState) => Promise<void> | void;
  onEdit?: (id: number) => any;
  onDelete?: (id: number) => any;
}

export default function DataTable<TData>({
  onPaginationChange,
  onEdit,
  onDelete,
  columns,
  data,
  pageCount,
  onSearchChange,
}: DataTableProps<TData>) {
  const [paginationChanged, setPaginationChanged] = useState(false);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [search, setSearch] = useState({
    value: "",
    changed: false,
  });

  const table = useReactTable({
    columns,
    data,

    state: {
      pagination,
    },

    pageCount,

    manualPagination: true,
    onPaginationChange: (update: any) => {
      const newPagination = update(pagination);
      setPagination(newPagination);
      setPaginationChanged(true);
    },

    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  // useEffects
  useEffect(() => {
    if (paginationChanged && onPaginationChange) {
      onPaginationChange(pagination);
    }
  }, [paginationChanged, pagination]);

  useEffect(() => {
    if (search.changed && onSearchChange) {
      onSearchChange(search.value);
    }
  }, [search]);

  return (
    <div className="flex flex-col gap-4">
      {onSearchChange && (
        <Input
          value={search.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearch({
              value: e.target.value,
              changed: true,
            });
          }}
          placeholder="Search..."
        />
      )}
      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                {onDelete && onEdit && <TableHead>Actions</TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell>
                      <Actions
                        onEdit={onEdit}
                        onDelete={onDelete}
                        id={Number(row.getValue("id"))}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center gap-2">
          <Input
            value={pagination.pageIndex + 1}
            type="number"
            min="1"
            max={table.getPageCount()}
            className="text-center w-16"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              table.setPageIndex(Number(e.target.value) - 1)
            }
          />
          <span>of {table.getPageCount()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
