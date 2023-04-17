import { useState } from "react";
import Nav from "../Nav";
import SideNav from "../SideNav";
import Button from "../Button";
import { useSendConfirmationEmailMutation } from "@/features/apis/authApi";
import { getUser } from "@/features/slices/userSlice";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [navBarShown, setNavBarShown] = useState<boolean>(false);
  const [sendConfirmationEmail, { isLoading }] = useSendConfirmationEmailMutation();
  const user = useSelector(getUser);

  return (
    <main className="h-screen flex flex-col">
      <Nav navBarShown={navBarShown} setNavBarShown={setNavBarShown} />
      <section className="relative h-[calc(100vh_-_64px)] pt-4 overflow-scroll container mx-auto flex items-stretch">
        <SideNav navBarShown={navBarShown} />
        <article className="w-full overflow-scroll px-4">
          {user && !user.verifiedAt && (
            <div className="border border-gray-200 p-4 mb-4 rounded-md flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
              <span>Please Verify your Email Address</span>
              <Button state={isLoading ? "loading" : undefined} onClick={() => sendConfirmationEmail()}>
                Send confirmation email
              </Button>
            </div>
          )}
          {children}
        </article>
      </section>
    </main>
  );
}
