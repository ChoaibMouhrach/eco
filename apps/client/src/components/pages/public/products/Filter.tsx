import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface PriceFilterProp {
  min: number;
  max: number;
  changed: boolean;
}

interface FilterProps {
  price: PriceFilterProp;
  setPrice: React.Dispatch<React.SetStateAction<PriceFilterProp>>;
}

export function Filter({ price, setPrice }: FilterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPrice({ ...price, changed: true, min: Number(e.target.value) })
        }
        type="number"
        min="1"
        value={price.min}
      />
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPrice({ ...price, changed: true, max: Number(e.target.value) })
        }
        type="number"
        min="1"
        value={price.max}
      />
    </div>
  );
}
