import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="font-display text-2xl tracking-tight">
          Studio<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact">Start a project</Button>
        </div>

        <MobileNav items={nav} />
      </div>
    </header>
  );
}