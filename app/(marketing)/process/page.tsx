import { SectionHeading } from "@/components/marketing/section-heading";

export const metadata = { title: "Process" };

const steps = [
  {
    title: "Frame",
    when: "Week 1",
    body: "We start with a written brief. What's the product, who's it for, what does success look like in numbers. No ambiguity allowed past this step.",
    deliverable: "Signed brief and scope.",
  },
  {
    title: "Sketch",
    when: "Week 2–3",
    body: "Low-fidelity explorations. We generate more options than we need, then cut hard. By the end you see one direction, not three half-baked ones.",
    deliverable: "Design direction in Figma.",
  },
  {
    title: "Build",
    when: "Week 4–8",
    body: "Real code, real reviews. You get a staging URL by day three of build. Every Friday you see what shipped that week — nothing hidden.",
    deliverable: "Production build, weekly demos.",
  },
  {
    title: "Land",
    when: "Final week",
    body: "Handover documentation, a training session, and a 30-day support window. After that, we're still here if you need us — but you won't need us.",
    deliverable: "Docs, training, handover.",
  },
];

export default function ProcessPage() {
  return (
    <div className="container-page py-20 lg:py-28">
      <SectionHeading
        eyebrow="Process"
        title="Four steps. Nothing mysterious."
        copy="Every project runs on this rhythm. It's boring on purpose — the interesting part should be the work, not the process."
      />
      <ol className="mt-20 border-t border-line">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="grid gap-6 border-b border-line py-12 lg:grid-cols-[120px_1fr_1.5fr] lg:gap-12"
          >
            <div>
              <p className="font-display text-5xl text-ink-soft/30">
                0{i + 1}
              </p>
              <p className="eyebrow mt-2">{s.when}</p>
            </div>
            <h2 className="display-md">{s.title}</h2>
            <div>
              <p className="text-lg leading-relaxed text-ink-soft">{s.body}</p>
              <p className="mt-4 text-sm">
                <span className="text-ink-soft">You get: </span>
                <span className="font-medium">{s.deliverable}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}