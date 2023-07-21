import { ChangeEvent } from "react";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import { IProduct } from "@/interfaces/Product";

interface QuantityProps {
  item: { product: IProduct; quantity: number };
  setItem: React.Dispatch<
    React.SetStateAction<{ product: IProduct; quantity: number }>
  >;
}

export function Quantity({ item, setItem }: QuantityProps) {
  const handleDecreaseQuantity = () => {
    setItem({ ...item, quantity: item.quantity - 1 });
  };

  const handleIncreaseQuantity = () => {
    setItem({ ...item, quantity: item.quantity + 1 });
  };

  const handleSetQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);
    setItem({ ...item, quantity: quantity < 1 ? 1 : quantity });
  };

  return (
    <div className="flex items-stretch text-lg">
      <button
        type="button"
        onClick={handleDecreaseQuantity}
        disabled={item.quantity === 1}
        className="disabled:bg-gray-100 p-2 border border-gray-300 px-4 rounded-md hover:bg-gray-50 rounded-r-none outline-none"
      >
        <MdOutlineRemove />
      </button>
      <input
        type="number"
        min="1"
        className="outline-none text-center w-12 border-y text-md border-gray-300"
        value={item.quantity}
        onChange={handleSetQuantity}
      />
      <button
        type="button"
        onClick={handleIncreaseQuantity}
        className="outline-none border border-gray-300 py-2 hover:bg-gray-50 px-4 rounded-md rounded-l-none"
      >
        <MdOutlineAdd />
      </button>
    </div>
  );
}
