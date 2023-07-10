import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Paginate {
  pageIndex: number;
  pageSize: number;
  changed: boolean;
}

interface PaginatioProps {
  pagination: Paginate;
  setPagination: React.Dispatch<React.SetStateAction<Paginate>>;
  pagesCount: number;
}

export function Pagination({
  pagination,
  setPagination,
  pagesCount,
}: PaginatioProps) {
  const handlePaginationInputChnage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPagination({
      ...pagination,
      changed: true,
      pageIndex: Number(e.target.value),
    });
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <Input
          value={pagination.pageIndex}
          className="w-16 text-center"
          onChange={handlePaginationInputChnage}
          type="number"
          min={1}
          max={pagesCount}
        />
        <span>of {pagesCount} pages</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() =>
            setPagination({ ...pagination, changed: true, pageIndex: 1 })
          }
          disabled={pagination.pageIndex === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </Button>
        <Button
          onClick={() =>
            setPagination({
              ...pagination,
              changed: true,
              pageIndex: pagination.pageIndex - 1,
            })
          }
          disabled={pagination.pageIndex === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Button>
        <Button
          onClick={() =>
            setPagination({
              ...pagination,
              changed: true,
              pageIndex: pagination.pageIndex + 1,
            })
          }
          disabled={pagination.pageIndex === pagesCount}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
        <Button
          onClick={() =>
            setPagination({
              ...pagination,
              changed: true,
              pageIndex: pagination.pageIndex + 1,
            })
          }
          disabled={pagination.pageIndex === pagesCount}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
