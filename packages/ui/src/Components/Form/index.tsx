interface FormProps extends React.ComponentProps<"form"> {
  children: React.ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return (
    <form {...rest} className="border border-gray-300 rounded-md">
      {children}
    </form>
  );
}
