import { useRef } from "react";
import { Item } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <Item
      onSelect={() => linkRef.current?.click()}
      className="group outline-none px-2"
    >
      <Link
        href={href}
        ref={linkRef}
        className="group-data-[highlighted]:bg-gray-100 py-2 block text-gray-600 pl-4 rounded-sm hover:bg-gray-50 font-medium"
      >
        {children}
      </Link>
    </Item>
  );
};

export default LinkItem;
