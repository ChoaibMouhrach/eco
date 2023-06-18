import { RxVercelLogo } from "react-icons/rx";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <RxVercelLogo className="text-3xl font-bold tracking-wide" />
    </Link>
  );
}
