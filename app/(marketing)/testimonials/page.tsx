import { SectionHeading } from "@/components/marketing/section-heading";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <div className="container-page py-20 lg:py-28">
      <SectionHeading
        eyebrow="Testimonials"
        title="What clients say."
        copy="We don't invent quotes. If this page is empty, we're still earning the right to fill it."
      />
      <div className="mt-16 rounded-sm border border-line p-12 text-center">
        <p className="font-display text-2xl text-ink-soft">
          No published testimonials yet.
        </p>
        <p className="mt-4 text-ink-soft">
          When we have real, attributable client quotes with written
          permission, they will appear here.
        </p>
      </div>
    </div>
  );
}