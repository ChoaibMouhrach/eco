import Link from "next/link";
import LogoIcon from "@/components/icons/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300">
      <div className="container mx-auto py-16 grid gap-16 lg:gap-4 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/">
            <LogoIcon />
          </Link>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold tracking-wide">Title</span>
          <Link href="/"> Contact Us</Link>
          <Link href="/"> Delivery Information</Link>
          <Link href="/"> Guides & News</Link>
          <Link href="/"> FAQ</Link>
          <Link href="/"> Get A Quote</Link>
          <Link href="/"> insulation4less.co.uk</Link>
          <Link href="/"> tiles4less.co.uk</Link>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold tracking-wide">Title</span>
          <Link href="/"> My Account</Link>
          <Link href="/"> Shipping Protection</Link>
          <Link href="/"> Returns</Link>
          <Link href="/"> Klarna FAQ</Link>
          <Link href="/"> Rewards</Link>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold tracking-wide">Title</span>
          <Link href="/"> 3rd Floor</Link>
          <Link href="/"> 207 Regent Street</Link>
          <Link href="/"> London</Link>
          <Link href="/"> W1B 3HH</Link>
          <Link href="/"> England</Link>
        </div>
      </div>
    </footer>
  );
}
