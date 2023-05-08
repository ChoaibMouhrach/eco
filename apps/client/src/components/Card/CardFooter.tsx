export default function CardFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="border-b p-4 bg-gray-100">{children}</div>;
}
