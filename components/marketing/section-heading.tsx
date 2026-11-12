interface Props {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className = "",
}: Props) {
  const alignCls =
    align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl";
  return (
    <div className={alignCls + " " + className}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="display-lg">{title}</h2>
      {copy && <p className="body-lg mt-6">{copy}</p>}
    </div>
  );
}