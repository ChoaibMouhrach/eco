import { useState } from "react";
import Nav from "../Nav";
import SideNav from "../SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navBarShown, setNavBarShown] = useState<boolean>(false)

  return (
    <main className="h-screen flex flex-col">
      <Nav navBarShown={navBarShown} setNavBarShown={setNavBarShown} />
      <section className="relative h-[calc(100vh_-_64px)] pt-4 overflow-scroll container mx-auto flex items-stretch">
        <SideNav navBarShown={navBarShown} />
        <article className="w-full overflow-scroll px-4">{children}</article>
      </section>
    </main>
  );
}
