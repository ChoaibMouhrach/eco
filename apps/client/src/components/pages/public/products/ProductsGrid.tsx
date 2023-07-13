import { ChangeEvent } from "react";
import { Pagination, ProductCard } from "@/components/custom";
import { Input } from "@/components/ui/input";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";

interface PaginationProps {
  changed: boolean;
  pageIndex: number;
  pageSize: number;
}

interface ProductsGridProps {
  products: IPaginate<IProduct>;
  pagination: PaginationProps;
  setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>;
  search: { value: string; changed: boolean };
  setSearch: React.Dispatch<
    React.SetStateAction<{ value: string; changed: boolean }>
  >;
}

export function ProductsGrid({
  products,
  pagination,
  setPagination,
  setSearch,
  search,
}: ProductsGridProps) {
  return (
    <div className="flex flex-col gap-6">
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch({ value: e.target.value, changed: true })
        }
        value={search.value}
        placeholder="Search..."
      />
      <div className="grid lg:grid-cols-4 gap-4">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div>
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          pagesCount={Math.ceil(products.count / products.limit)}
        />
      </div>
    </div>
  );
}
