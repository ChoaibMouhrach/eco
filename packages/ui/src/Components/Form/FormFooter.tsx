interface FormFooterProps {
  children: React.ReactNode;
}

export function FormFooter({ children }: FormFooterProps) {
  return <div className="p-4">{children}</div>;
}
