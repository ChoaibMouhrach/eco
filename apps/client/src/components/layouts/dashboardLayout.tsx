import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { PublicLayout } from "./publicLayout";
import { IUser } from "@/interfaces/User";
import DashboardSideBar from "../custom/Navigation/DashboardSideBar";
import { Button } from "../ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: IUser;
  title: string;
  description: string;
}

export function DashboardLayout({
  children,
  title,
  description,
  user,
}: DashboardLayoutProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <PublicLayout footer={false} user={user}>
      <div>
        <div className="h-16 container flex lg:!hidden items-center border-b border-gray-200">
          <Button variant="outline" onClick={() => setOpen(!open)}>
            <MdOutlineMenu />
          </Button>
        </div>
        <section className="container h-[calc(100vh_-_176px)] lg:h-[calc(100vh_-_112px)] grid lg:grid-cols-5 py-4 gap-4">
          {open ? (
            <div className="overflow-y-scroll lg:pr-4">
              <DashboardSideBar />
            </div>
          ) : (
            <>
              <div className="overflow-y-scroll pr-4 hidden lg:block">
                <DashboardSideBar />
              </div>
              <div className="lg:col-start-2 lg:col-end-6 overflow-y-scroll pr-4">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold tracking-wide">
                      {title}
                    </h1>
                    <p className="text-neutral-500">{description}</p>
                  </div>
                  {children}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </PublicLayout>
  );
}
