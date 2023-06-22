interface FormBodyProps {
  children: React.ReactNode;
}

export function FormBody({ children }: FormBodyProps) {
  return <div className="p-4 border-y border-gray-300">{children}</div>;
}
