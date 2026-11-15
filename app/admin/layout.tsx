import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-paper p-6 lg:block">
        <Link href="/" className="font-display text-2xl">
          Studio<span className="text-accent">.</span>
        </Link>
        <p className="eyebrow mt-8">Admin</p>
        <nav className="mt-4 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block rounded-sm px-3 py-2 text-sm hover:bg-ink/5"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6 border-t border-line pt-4">
          <p className="text-xs text-ink-soft">{session.email}</p>
          <LogoutButton />
        </div>
      </aside>

      <main className="p-6 lg:ml-64 lg:p-10">{children}</main>
    </div>
  );
}