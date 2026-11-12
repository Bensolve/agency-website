import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="container-page py-20 lg:py-28">
      <SectionHeading
        eyebrow="About"
        title="A small studio, on purpose."
        copy="We're a five-person team. We take on three projects at a time. That's the whole strategy — stay small enough that everyone who touches your project knows your project."
      />

      <div className="mt-20 grid gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">What we believe</p>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Good digital products come from small teams that argue openly,
              ship quickly, and measure what matters. Not from any particular
              stack, methodology or slide deck.
            </p>
            <p>
              We think the work should be legible: code you can maintain,
              design systems your team can extend, and copy your customers
              actually understand.
            </p>
            <p>
              We turn down more work than we take. When we take something on,
              it&apos;s because we&apos;re confident we can move the number that
              matters.
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">How we&apos;re set up</p>
          <dl className="divide-y divide-line border-y border-line">
            {[
              ["Team size", "5 people"],
              ["Active projects", "3 at a time"],
              ["Typical engagement", "6–10 weeks"],
              ["Time zones", "EU and US overlap"],
              ["Engagement model", "Fixed scope, fixed price"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-4">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-20 rounded-sm bg-ink p-12 text-paper lg:p-16">
        <p className="font-display text-3xl leading-tight lg:text-4xl">
          &ldquo;If we can&apos;t tell you how your project will move the number
          — we shouldn&apos;t take it.&rdquo;
        </p>
        <p className="mt-6 text-sm text-paper/60">
          — The one rule we don&apos;t break
        </p>
        <Button
          href="/contact"
          variant="outline"
          size="lg"
          className="mt-10 border-paper/30 text-paper hover:bg-paper hover:text-ink"
        >
          Work with us →
        </Button>
      </div>
    </div>
  );
}