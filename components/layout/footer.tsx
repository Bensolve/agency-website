import Link from "next/link";

const cols = [
  {
    heading: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/process", label: "Process" },
      { href: "/team", label: "Team" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/services/website-development", label: "Websites" },
      { href: "/services/mobile-app-development", label: "Mobile apps" },
      { href: "/services/graphic-design-branding", label: "Branding" },
      { href: "/services/saas-development", label: "SaaS" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { href: "/portfolio", label: "Portfolio" },
      { href: "/pricing", label: "Pricing" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl leading-tight">
              Ready to build something that{" "}
              <span className="text-accent">earns its keep</span>?
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
            >
              Start a project →
            </Link>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow mb-4">{col.heading}</p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-ink-soft hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-line pt-8 text-xs text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} Studio. All rights reserved.</p>
          <p>
            hello@your-agency.com ·{" "}
            <a className="hover:text-ink" href="https://wa.me/15551234567">
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}