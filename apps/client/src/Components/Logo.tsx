import { RxVercelLogo } from "react-icons/rx";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/">
      <RxVercelLogo
        className={`text-3xl font-bold tracking-wide ${className}`}
      />
    </Link>
  );
}
