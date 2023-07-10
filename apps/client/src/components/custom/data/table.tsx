import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChangeEvent, useEffect } from "react";
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
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pageCount: number;
  onPaginationChange?: (pagination: PaginationState) => Promise<void> | void;
  onEdit?: (id: number) => void | Promise<void>;
  onDelete?: (id: number) => any | Promise<any>;
  handleSearch?: (value: string) => any | Promise<any>;
}

export default function DataTable<TData>({
  onPaginationChange,
  onEdit,
  onDelete,
  columns,
  data,
  pagination,
  setPagination,
  pageCount,
  handleSearch,
}: DataTableProps<TData>) {
  const table = useReactTable({
    columns,
    data,

    state: {
      pagination,
    },

    pageCount,

    onPaginationChange: setPagination,
    manualPagination: true,

    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (onPaginationChange) onPaginationChange(pagination);
  }, [pagination]);

  return (
    <div className="flex flex-col gap-4">
      {handleSearch && (
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
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
