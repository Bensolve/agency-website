import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/marketing/section-heading";
import Link from "next/link";

const services = [
  {
    slug: "website-development",
    title: "Website development",
    tagline:
      "Fast, accessible marketing sites that turn attention into pipeline.",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile app development",
    tagline: "iOS and Android apps from one codebase, without the compromise.",
  },
  {
    slug: "graphic-design-branding",
    title: "Graphic design and branding",
    tagline: "A visual identity that holds up across every surface.",
  },
  {
    slug: "saas-development",
    title: "SaaS development",
    tagline:
      "Multi-tenant platforms built to survive your first thousand customers.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-page pb-24 pt-16 lg:pb-40 lg:pt-28">
        <p className="eyebrow">Digital product studio · Working globally</p>
        <h1 className="display-2xl mt-8 max-w-[14ch]">
          We build digital products<span className="text-accent">.</span>
          <br />
          Ones that actually
          <br />
          <span className="italic">earn their keep.</span>
        </h1>
        <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="body-lg max-w-xl">
            Websites, mobile apps, brand systems and SaaS platforms — designed
            with intent, engineered to last, and measured against the outcome
            you actually care about.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Start a project →
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              See the work
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-line">
        <div className="container-page py-24 lg:py-32">
          <SectionHeading
            eyebrow="What we do"
            title="Four disciplines. One accountable team."
          />
          <div className="mt-16 border-t border-line">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-start justify-between gap-6 border-b border-line py-10 transition-colors hover:bg-ink/[0.02]"
              >
                <div className="flex items-start gap-6 lg:gap-12">
                  <span className="w-12 shrink-0 font-display text-2xl text-ink-soft/40">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="display-md transition-colors group-hover:text-accent">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-ink-soft">{s.tagline}</p>
                  </div>
                </div>
                <span className="hidden shrink-0 text-2xl transition-transform group-hover:translate-x-1 lg:block">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="border-t border-line">
        <div className="container-page py-24 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <SectionHeading
              eyebrow="How we work"
              title="No handoffs. No black boxes."
              copy="You work with the people doing the work. Every project runs on the same four-step rhythm — visible, honest, and short enough that momentum never drops."
            />
            <ol className="border-t border-line">
              {[
                [
                  "Frame",
                  "We agree what success looks like before touching a pixel. Written, measurable, signed off.",
                ],
                [
                  "Sketch",
                  "Low-fidelity explorations, quickly. We remove options until one remains.",
                ],
                [
                  "Build",
                  "Real code, real reviews, weekly shipping. You see it growing every Friday.",
                ],
                [
                  "Land",
                  "Handover with docs, training and a 30-day support window. No surprises.",
                ],
              ].map(([title, copy], i) => (
                <li
                  key={title}
                  className="flex gap-6 border-b border-line py-8"
                >
                  <span className="w-8 shrink-0 font-display text-xl text-ink-soft/40">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="mt-2 text-ink-soft">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="container-page py-24 text-center lg:py-40">
          <p className="eyebrow">Let&apos;s talk</p>
          <h2 className="display-xl mx-auto mt-6 max-w-[18ch]">
            Have a project worth building?
          </h2>
          <p className="body-lg mx-auto mt-6 max-w-xl">
            Send us a short brief. We&apos;ll reply with whether we&apos;re the
            right studio for it — and if not, we&apos;ll tell you who is.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">
              Start a project →
            </Button>
            <Button
              href="mailto:hello@your-agency.com"
              variant="outline"
              size="lg"
            >
              hello@your-agency.com
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}