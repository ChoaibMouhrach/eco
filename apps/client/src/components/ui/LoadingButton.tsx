import { BiLoaderAlt } from "react-icons/bi";
import { Button } from "./button";

interface LoadingButtonProps {
  children: React.ReactNode;
}

export default function LoadingButton({ children }: LoadingButtonProps) {
  return (
    <Button>
      <BiLoaderAlt className="animate-spin" /> {children}
    </Button>
  );
}
