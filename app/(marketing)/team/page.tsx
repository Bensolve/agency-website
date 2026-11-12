import { SectionHeading } from "@/components/marketing/section-heading";

export const metadata = { title: "Team" };

const members = [
  {
    role: "Founder & Design Lead",
    initials: "FL",
    bio: "Placeholder — replace with real name, background and years of experience.",
  },
  {
    role: "Engineering Lead",
    initials: "EL",
    bio: "Placeholder — replace with real name and technical background.",
  },
  {
    role: "Product Strategist",
    initials: "PS",
    bio: "Placeholder — replace with real name and relevant experience.",
  },
];

export default function TeamPage() {
  return (
    <div className="container-page py-20 lg:py-28">
      <SectionHeading
        eyebrow="Team"
        title="Small on purpose."
        copy="Placeholder profiles — replace with your actual team before launch."
      />
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {members.map((m) => (
          <div key={m.role}>
            <div className="flex aspect-[4/5] items-center justify-center rounded-sm bg-line font-display text-6xl text-ink-soft/40">
              {m.initials}
            </div>
            <p className="eyebrow mt-6">{m.role}</p>
            <p className="mt-3 text-ink-soft">{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}