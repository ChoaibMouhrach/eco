import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { ChangeEvent, useState } from "react";
import {
  MdOutlineChevronLeft,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineMoreVert,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../Button";
import { Input } from "../Input";
import {
  DropDown,
  DropDownItem,
  DropDownItemsWrapper,
  DropDownSeparator,
  DropDownTrigger,
} from "../DropDown";

interface ActionsProps {
  id: number;
  handleDelete?: (id: number) => void | Promise<void>;
  handleEdit?: (id: number) => void | Promise<void>;
}

function Actions({ id, handleDelete, handleEdit }: ActionsProps) {
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);

  const handleDeleteWrapper = async () => {
    setIsDeletingLoading(true);
    if (handleDelete) await handleDelete(id);
    setIsDeletingLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <DropDown>
        <DropDownTrigger>
          <Button variant="outlined">
            <MdOutlineMoreVert />
          </Button>
        </DropDownTrigger>
        <DropDownItemsWrapper>
          {handleEdit && (
            <DropDownItem>
              <button
                type="button"
                onClick={() => handleEdit(id)}
                className="px-3 py-1 text-start pr-16"
              >
                Edit
              </button>
            </DropDownItem>
          )}

          {handleDelete && handleEdit && <DropDownSeparator />}

          {handleDelete && (
            <DropDownItem>
              <button
                type="button"
                onClick={() => handleDeleteWrapper()}
                className="px-3 py-1 text-start pr-16 text-red-700"
              >
                Delete
                {isDeletingLoading && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
              </button>
            </DropDownItem>
          )}
        </DropDownItemsWrapper>
      </DropDown>
    </div>
  );
}

export interface Pagination extends PaginationState {}

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageCount: number;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  isLoading: boolean;
  handleEdit?: (id: number) => any;
  handleDelete?: (id: number) => any;
}

export type Column<T> = ColumnDef<T>;

export function Table<T extends {}>({
  data,
  pageCount,
  handleSearch,
  columns,
  pagination,
  setPagination,
  isLoading,
  handleEdit,
  handleDelete,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,

    pageCount,

    state: {
      sorting,
      pagination,
    },

    onSortingChange: setSorting,
    onPaginationChange: setPagination,

    // settings
    manualPagination: true,

    // models
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Search..." onChange={handleSearch} />
      <div className="w-full custom-scrollbar overflow-x-scroll">
        <div
          className={`border rounded-md ${
            data.length ? "w-fit lg:w-full" : ""
          } lg:w-full`}
        >
          <table className="w-full table-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className="text-start p-3 font-semibold tracking-wide"
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none flex items-center gap-2"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <MdOutlineChevronLeft className="rotate-90" />
                              ),
                              desc: (
                                <MdOutlineChevronLeft className="-rotate-90" />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </button>
                        )}
                      </th>
                    );
                  })}
                  {(handleEdit || handleDelete) && (
                    <th className="text-start p-3 font-semibold tracking-wide">
                      Actions
                    </th>
                  )}
                </tr>
              ))}
            </thead>
            <tbody>
              {!data.length && !isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-3 text-center">
                    Not found
                  </td>
                </tr>
              ) : null}
              {!isLoading &&
                table.getRowModel().rows.map((row) => (
                  <tr className="odd:bg-gray-50" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td className="p-3 tracking-wide" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    {(handleEdit || handleDelete) && (
                      <td className="p-3 tracking-wide">
                        <Actions
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          id={row.getValue("id")}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              {isLoading &&
                [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <tr key={index} className="border-b-2 border-white">
                    <td
                      className="p-3 bg-stone-200 animate-pulse"
                      colSpan={columns.length + 1}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!isLoading && data.length ? (
            <div className="p-3 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  <input
                    type="number"
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="border p-1 rounded w-16"
                  />
                  of {table.getPageCount()}
                </strong>
              </span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <MdOutlineKeyboardDoubleArrowLeft className="fill-white text-xl" />
                </Button>
                <Button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <MdOutlineKeyboardArrowLeft className="fill-white text-xl" />
                </Button>
                <Button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <MdOutlineKeyboardArrowRight className="fill-white text-xl" />
                </Button>
                <Button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <MdOutlineKeyboardDoubleArrowRight className="fill-white text-xl" />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
