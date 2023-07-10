import { useCallback, useEffect, useState } from "react";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";
import { useGetProducts } from "@/hooks";
import debounce from "@/lib/debounce";
import { ProductsGrid } from "./ProductsGrid";
import { Filter } from "./Filter";

interface ProductsPageProps {
  products: IPaginate<IProduct>;
}

export default function ProductsPage({
  products: defaultProducts,
}: ProductsPageProps) {
  const [products, setProducts] =
    useState<IPaginate<IProduct>>(defaultProducts);

  const [search, setSearch] = useState({
    value: "",
    changed: false,
  });

  const [prices, setPrices] = useState({
    min: 0,
    max: 99999,
    changed: false,
  });

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 8,
    changed: false,
  });

  const { data: newProducts, refetch: refetchNewProducts } = useGetProducts(
    {
      search: search.value,
      page: pagination.pageIndex,
      price: prices,
    },
    {
      enabled: false,
    }
  );

  const changeProducts = useCallback(
    debounce(() => {
      refetchNewProducts();
    }),
    []
  );

  // useEffects
  useEffect(() => {
    if (search.changed) {
      changeProducts();
      return;
    }

    if (pagination.changed) {
      refetchNewProducts();
      return;
    }

    if (prices.changed) {
      changeProducts();
    }
  }, [search, pagination, prices]);

  useEffect(() => {
    if (newProducts) {
      setProducts(newProducts.data);
    }
  }, [newProducts]);

  return (
    <div className="grid lg:grid-cols-6 gap-4">
      <div className="flex flex-col gap-4">
        <span>Price</span>
        <Filter prices={prices} setPrices={setPrices} />
      </div>
      <div className="lg:col-start-2 lg:col-end-7 flex flex-col gap-4">
        <span>Products</span>
        <ProductsGrid
          setSearch={setSearch}
          products={products}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}
