import { BiLoaderAlt } from "react-icons/bi";
import { Button } from "./button";

interface LoadingButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function LoadingButton({
  children,
  className,
}: LoadingButtonProps) {
  return (
    <Button disabled className={`flex items-center gap-4 ${className}`}>
      <BiLoaderAlt className="animate-spin" /> {children}
    </Button>
  );
}
