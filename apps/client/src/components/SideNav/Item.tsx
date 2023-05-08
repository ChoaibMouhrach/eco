import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface Item extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: IconType;
}

const Item = ({ href, icon, children }: Item) => {
  const Icon = icon;

  href = href ? "/dashboard" + href : "/dashboard";
  let pathName = useRouter().pathname;

  return (
    <Link
      href={href}
      className={`py-3 px-4 rounded-md text-sm text-gray-800 tracking-lighter font-medium flex items-center gap-2 hover:bg-gray-100 ${
        pathName === "/dashboard" && href === "/dashboard"
          ? "bg-gray-200"
          : pathName.includes(href) &&
            href !== "/dashboard" &&
            pathName !== "/dashboard"
          ? "bg-gray-200"
          : ""
      }`}
    >
      <Icon className="h-5 w-5 fill-gray-800" />
      {children}
    </Link>
  );
};

export default Item;
