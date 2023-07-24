import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChangeEvent, useEffect, useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount: number;

  // events
  onSearchChange?: (value: string) => any;
  onPaginationChange?: (pagination: PaginationState) => Promise<void> | void;

  actions?: Record<string, (data: TData) => any>;
}

export default function DataTable<TData>({
  // data
  columns,
  data,
  pageCount,

  // events
  onPaginationChange,
  onSearchChange,

  // actions
  actions,
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
                {actions && <TableHead>Actions</TableHead>}
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
                  {actions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MdOutlineMoreVert className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {Object.entries(actions).map(([name, func]) => (
                            <DropdownMenuItem
                              onClick={() => func(row.original)}
                            >
                              {name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
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
