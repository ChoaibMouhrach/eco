interface AuthLayoutProps extends React.ComponentProps<"form"> {
  children: React.ReactNode;
}

export function AuthLayout({ children, ...rest }: AuthLayoutProps) {
  return (
    <main className="bg-gray-900 flex items-center justify-center h-screen w-screen">
      <form
        {...rest}
        className="bg-white rounded-md p-4 drop-shadow-md w-full mx-4 lg:mx-0 lg:max-w-sm flex flex-col gap-8"
      >
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl">ECO</h1>
          <p className="text-neutral-500 text-lg">Welcome back</p>
        </div>
        <div>{children}</div>
      </form>
    </main>
  );
}
