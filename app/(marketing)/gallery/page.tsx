import { SectionHeading } from "@/components/marketing/section-heading";

export const metadata = { title: "Design gallery" };

const tiles = [
  { label: "Type study", tone: "bg-ink text-paper", span: "md:col-span-2 md:row-span-2" },
  { label: "Colour system", tone: "bg-accent text-paper" },
  { label: "Grid", tone: "bg-paper border border-line" },
  { label: "Iconography", tone: "bg-line" },
  { label: "Motion", tone: "bg-ink text-paper" },
  { label: "Package", tone: "bg-accent text-paper" },
  { label: "Editorial", tone: "bg-paper border border-line", span: "md:col-span-2" },
  { label: "Poster", tone: "bg-line" },
];

export default function GalleryPage() {
  return (
    <div className="container-page py-20 lg:py-28">
      <SectionHeading
        eyebrow="Design gallery"
        title="Details, colour, and craft."
        copy="Placeholder tiles — replace with real project imagery once you have permission to publish it."
      />
      <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[240px]">
        {tiles.map((t, i) => (
          <div
            key={i}
            className={`relative flex items-end overflow-hidden rounded-sm p-5 ${t.tone} ${t.span ?? ""}`}
          >
            <p className="eyebrow !text-current opacity-70">
              0{i + 1} — {t.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}