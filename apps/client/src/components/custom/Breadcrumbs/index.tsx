import Link from "next/link";
import { Fragment } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface BreadcrumbsProps {
  items: { name: string; href: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {items.map((item, index) => (
        <Fragment key={item.name}>
          <Link
            className={`${
              items.length - 1 !== index ? "text-neutral-600" : ""
            } bg-gray-50 py-2 px-4 rounded-md`}
            href={item.href}
          >
            {item.name}
          </Link>
          {items.length - 1 !== index && <MdOutlineKeyboardArrowRight />}
        </Fragment>
      ))}
    </div>
  );
}
