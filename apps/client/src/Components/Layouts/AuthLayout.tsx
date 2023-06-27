import Logo from "../Logo";

interface AuthLayoutProps extends React.ComponentProps<"form"> {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({
  title,
  description,
  children,
  ...rest
}: AuthLayoutProps) {
  return (
    <main className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <form
        {...rest}
        className="bg-white w-full mx-4 lg:mx-0 max-w-sm p-4 rounded-md drop-shadow-md flex flex-col gap-4"
      >
        <div className="flex flex-col items-center">
          <Logo />
          <p>{title}</p>
          <p className="text-neutral-500">{description}</p>
        </div>
        {children}
      </form>
    </main>
  );
}
