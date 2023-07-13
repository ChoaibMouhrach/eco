import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { sideBarNavigation } from "@/constants";
import { SideBarNavigation } from "@/interfaces/Common";

interface SideBarDropDownItemProps {
  link: SideBarNavigation;
}

function SideBarDropDownItem({ link }: SideBarDropDownItemProps) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(
    Boolean(link.children?.find((child) => child.href === router.pathname))
  );

  return (
    <li
      className={`${
        open ? "rounded-md overflow-hidden bg-gray-900 text-white" : ""
      }`}
    >
      <ul>
        <li>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`${
              open ? "hover:bg-gray-800" : "hover:bg-gray-50"
            } w-full flex items-center gap-4 p-3`}
          >
            <link.icon />
            {link.name}
          </button>
        </li>
        <li className={`${open ? "" : "hidden"}`}>
          <ul>
            {link.children?.map((child) => (
              <li key={child.name} className="hover:bg-gray-800">
                <Link
                  className="flex items-center gap-4 p-3"
                  href={child.href ?? ""}
                >
                  <child.icon />
                  <p>{child.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </li>
  );
}

export default function DashboardSideBar() {
  const router = useRouter();
  return (
    <ul className="flex flex-col gap-2">
      {sideBarNavigation.map((link) =>
        link.href ? (
          <li
            className={`${
              router.pathname === link.href
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "hover:bg-gray-50"
            } rounded-md`}
            key={link.name}
          >
            <Link
              href={link.href ?? ""}
              className="flex items-center gap-4 p-3"
            >
              <link.icon />
              <p>{link.name}</p>
            </Link>
          </li>
        ) : (
          <SideBarDropDownItem key={link.name} link={link} />
        )
      )}
    </ul>
  );
}
