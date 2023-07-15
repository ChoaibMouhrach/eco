import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";
import { useGetProducts } from "@/hooks";
import debounce from "@/lib/debounce";
import { ProductsGrid } from "./ProductsGrid";
import { Filter } from "./Filter";

interface ProductsPageProps {
  products: IPaginate<IProduct>;
}

// handles price query param
const handlePrice = (query: ParsedUrlQuery) => {
  const price: Record<"min" | "max", number> = {
    min: 0,
    max: 99999,
  };

  if (!query.price) return price;

  const queryPrice =
    query.price instanceof Array ? query.price[0] : query.price;

  if (/^\d+-\d+$/gi.test(queryPrice)) {
    const [min, max] = queryPrice.split("-").map(Number);
    price.min = min;
    price.max = max;
  }

  return price;
};

// handle query search
const handleSearch = (query: ParsedUrlQuery) => {
  return query?.search instanceof Array
    ? query?.search[0]
    : query?.search ?? "";
};

// handle query page
const handlePage = (query: ParsedUrlQuery) => {
  const page = 1;

  if (!query.page) return page;

  const queryPage = query.page instanceof Array ? query.page[0] : query.page;

  if (!/^\d+$/gi.test(queryPage)) return page;

  return Number(queryPage);
};

export default function ProductsPage({
  products: defaultProducts,
}: ProductsPageProps) {
  const router = useRouter();
  const [products, setProducts] =
    useState<IPaginate<IProduct>>(defaultProducts);

  const [search, setSearch] = useState({
    value: handleSearch(router.query),
    changed: false,
  });

  const [price, setPrice] = useState({
    ...handlePrice(router.query),
    changed: false,
  });

  const [pagination, setPagination] = useState({
    pageIndex: handlePage(router.query),
    pageSize: 8,
    changed: false,
  });

  const { data: newProducts, refetch: refetchNewProducts } = useGetProducts(
    {
      search: search.value,
      page: pagination.pageIndex,
      price,
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
      router.push(
        {
          query: {
            ...router.query,
            search: search.changed ? search.value : undefined,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [search]);

  useEffect(() => {
    if (price.changed) {
      changeProducts();
      router.push({
        query: {
          ...router.query,
          price: `${price.min}-${price.max}`,
        },
      });
    }
  }, [price]);

  useEffect(() => {
    if (pagination.changed) {
      router.push({
        query: {
          ...router.query,
          page: pagination.pageIndex,
        },
      });
    }
  }, [pagination]);

  useEffect(() => {
    if (newProducts) {
      setProducts(newProducts.data);
    }
  }, [newProducts]);

  return (
    <div className="grid lg:grid-cols-6 gap-4">
      <div className="flex flex-col gap-4">
        <span>Price</span>
        <Filter price={price} setPrice={setPrice} />
      </div>
      <div className="lg:col-start-2 lg:col-end-7 flex flex-col gap-4">
        <span>Products</span>
        <ProductsGrid
          search={search}
          setSearch={setSearch}
          products={products}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}
