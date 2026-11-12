import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Pricing" };

const tiers = [
  {
    name: "Launch",
    price: "$6k–12k",
    tagline: "For founders getting a first version out the door.",
    features: [
      "Marketing website (5–8 pages)",
      "Design system + responsive build",
      "CMS or basic admin",
      "SEO + analytics setup",
      "30-day support",
    ],
    featured: false,
  },
  {
    name: "Product",
    price: "$15k–40k",
    tagline: "For teams shipping a real product to real users.",
    features: [
      "Web or mobile app",
      "Custom backend + database",
      "Auth, billing, roles",
      "Admin dashboard",
      "90-day support",
    ],
    featured: true,
  },
  {
    name: "Partner",
    price: "From $8k/mo",
    tagline: "For teams who want a studio on retainer.",
    features: [
      "Dedicated pod (design + dev)",
      "Weekly shipping cadence",
      "Ongoing product work",
      "Priority support",
      "Quarterly strategy reviews",
    ],
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="container-page py-20 lg:py-28">
      <SectionHeading
        eyebrow="Pricing"
        title="Fixed scope. Fixed price. No surprises."
        copy="Every engagement starts with a written scope. If the scope changes, we talk about it — in writing — before any work moves."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`flex flex-col rounded-sm border p-8 lg:p-10 ${
              t.featured
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper"
            }`}
          >
            <p className={`eyebrow ${t.featured ? "!text-paper/60" : ""}`}>
              {t.name}
            </p>
            <p className="mt-4 font-display text-4xl">{t.price}</p>
            <p
              className={`mt-2 text-sm ${
                t.featured ? "text-paper/70" : "text-ink-soft"
              }`}
            >
              {t.tagline}
            </p>
            <ul
              className={`mt-8 flex-1 space-y-3 text-sm ${
                t.featured ? "text-paper/85" : "text-ink-soft"
              }`}
            >
              {t.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button
              href="/contact"
              variant={t.featured ? "primary" : "outline"}
              className={`mt-10 ${
                t.featured ? "!bg-accent hover:!bg-accent-dark" : ""
              }`}
            >
              Start a project →
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}