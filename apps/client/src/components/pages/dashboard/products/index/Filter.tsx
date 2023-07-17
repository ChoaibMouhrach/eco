import { ChangeEvent, useCallback } from "react";
import { ComboxUi, ComboxUiItem } from "@/components/ui/ComboxUi";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import debounce from "@/lib/debounce";

export interface Query {
  price?: {
    min: number;
    max: number;
  };
  page?: number;
  search?: string;
  sort: string;
  order?: "asc" | "desc";
  isExclusive?: boolean;
}

const items: ComboxUiItem[] = [
  {
    label: "Id",
    value: "id",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Quantity",
    value: "quantity",
  },
  {
    label: "Created At",
    value: "createdAt",
  },
];

interface FilterProps {
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
}

export function Filter({ query, setQuery }: FilterProps) {
  const handleExclusiveProducts = (isExclusive: boolean) =>
    setQuery({
      ...query,
      isExclusive,
    });

  const handleSorting = (sort: string) =>
    setQuery({
      ...query,
      sort,
    });

  const handleOrder = (order: "asc" | "desc") =>
    setQuery({
      ...query,
      order,
    });

  const handlePrice = useCallback(
    debounce(({ min, max }: Record<"min" | "max", number>) => {
      setQuery({
        ...query,
        price: {
          min,
          max,
        },
      });
    }),
    []
  );

  return (
    <div className="flex items-center flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handlePrice(
              query.price
                ? {
                    ...query.price,
                    min: Number(e.target.value),
                  }
                : {
                    min: Number(e.target.value),
                    max: 999999999999,
                  }
            );
          }}
          className="w-16 text-center"
          type="number"
          defaultValue={0}
        />

        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handlePrice(
              query.price
                ? {
                    ...query.price,
                    max: Number(e.target.value),
                  }
                : {
                    min: 0,
                    max: Number(e.target.value),
                  }
            );
          }}
          className="w-16 text-center"
          type="number"
          defaultValue={9999}
        />
      </div>

      <ComboxUi
        items={items}
        placeholder="Sort with"
        onValueChange={handleSorting}
      />

      <Select onValueChange={handleOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="desc">Desc</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) =>
          handleExclusiveProducts(value === "true")
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Exclusive" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="false">False</SelectItem>
          <SelectItem value="true">true</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
