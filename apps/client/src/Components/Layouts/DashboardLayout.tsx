import { useState } from "react";
import { Button } from "ui";
import { MdOutlineMenu } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import PublicLayout from "./PublicLayout";
import { SideNavLinkItem, User } from "@/index";
import { sideNavLinks } from "@/lib/constants";

interface SideNavLinkProps {
  link: Required<Omit<SideNavLinkItem, "children">>;
}

function SideNavLink({ link }: SideNavLinkProps) {
  const router = useRouter();

  return (
    <Link
      key={link.href + Math.random()}
      className={`flex items-center text-sm p-3 hover:bg-gray-50 font-semibold rounded-md tracking-wide text-gray-800 gap-4 ${
        router.pathname === link.href ? "bg-gray-100" : ""
      }`}
      href={link.href}
    >
      <link.Icon className="fill-gray-900 text-lg" /> <span>{link.name}</span>
    </Link>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function DashboardLayout({
  children,
  user,
}: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <PublicLayout user={user}>
      <div className="h-16 px-4 flex items-center lg:hidden border-b border-gray-200">
        <Button onClick={() => setOpen(!open)} variant="text">
          <MdOutlineMenu className="text-lg" />
        </Button>
      </div>
      <div className="h-[calc(100vh_-_128px)] py-4 lg:px-0 lg:h-[calc(100vh_-_64px)] grid lg:gap-4 lg:grid-cols-6 container mx-auto">
        <div
          className={`overflow-y-scroll custom-scrollbar px-4 lg:px-0 flex flex-col gap-2 ${
            open ? "" : "hidden lg:flex lg:col-start-1 lg:col-end-2"
          }`}
        >
          {sideNavLinks.map((link) => (
            <SideNavLink key={link.href} link={link} />
          ))}
        </div>
        <div
          className={`overflow-y-scroll px-4 lg:px-0 custom-scrollbar lg:col-start-2 lg:col-end-7 ${
            open ? "hidden" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </PublicLayout>
  );
}
