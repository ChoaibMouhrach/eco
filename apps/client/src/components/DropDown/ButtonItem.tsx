import { Item } from "@radix-ui/react-dropdown-menu";
import { useRef } from "react";

export default function ButtonItem({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  return (
    <Item
      onSelect={() => linkRef.current?.click()}
      className="group outline-none px-2"
    >
      <button
        {...props}
        className="group-data-[highlighted]:bg-gray-100 rounded-md w-full py-2 text-left pl-4"
      >
        {children}
      </button>
    </Item>
  );
}
