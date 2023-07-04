import { BiLoaderAlt } from "react-icons/bi";
import { Button } from "./button";

interface LoadingButtonProps {
  children: React.ReactNode;
}

export default function LoadingButton({ children }: LoadingButtonProps) {
  return (
    <Button disabled className="flex items-center gap-4">
      <BiLoaderAlt className="animate-spin" /> {children}
    </Button>
  );
}
