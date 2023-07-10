import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface PriceFilterProp {
  min: number;
  max: number;
  changed: boolean;
}

interface FilterProps {
  prices: PriceFilterProp;
  setPrices: React.Dispatch<React.SetStateAction<PriceFilterProp>>;
}

export function Filter({ prices, setPrices }: FilterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPrices({ ...prices, changed: true, min: Number(e.target.value) })
        }
        type="number"
        min="1"
        value={prices.min}
      />
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPrices({ ...prices, changed: true, max: Number(e.target.value) })
        }
        type="number"
        min="1"
        value={prices.max}
      />
    </div>
  );
}
