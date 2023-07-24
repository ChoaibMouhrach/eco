import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import DataTable from "@/components/custom/data/table";
import { IProduct } from "@/interfaces/Product";
import { columns } from "./columns";
import { MakeProductExclusiveDialog } from "./MakeProductExclusiveDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";

interface ProductsTableProps {
  handlePagination: (pagination: PaginationState) => any;
  handleSearch: (value: string) => any;
  products: IProduct[];
  pageCount: number;
  refetchProducts: () => any;
}

export function ProductsTable({
  // data
  products,
  pageCount,

  // handlers
  handlePagination,
  handleSearch,

  refetchProducts,
}: ProductsTableProps) {
  const [deleteProduct, setDeleteProduct] = useState<IProduct | null>(null);
  const [exclusiveProduct, setExclusiveProduct] = useState<IProduct | null>(
    null
  );

  return (
    <>
      <DataTable<IProduct>
        // data
        columns={columns}
        data={products}
        pageCount={pageCount}
        // events
        onSearchChange={handleSearch}
        onPaginationChange={handlePagination}
        // actions
        actions={{
          Delete: (product: IProduct) => setDeleteProduct(product),
          "Toggle exclusive": (product: IProduct) =>
            setExclusiveProduct(product),
        }}
      />

      {/* alerts */}
      {exclusiveProduct && (
        <MakeProductExclusiveDialog
          product={exclusiveProduct}
          setProduct={setExclusiveProduct}
          refetch={refetchProducts}
        />
      )}

      {deleteProduct && (
        <DeleteProductDialog
          product={deleteProduct}
          setProduct={setDeleteProduct}
          refetch={refetchProducts}
        />
      )}
    </>
  );
}
