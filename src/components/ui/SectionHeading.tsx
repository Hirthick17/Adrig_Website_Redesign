import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="mb-3 text-[12px] font-bold uppercase tracking-[.18em] text-adrig-blue">{eyebrow}</p>
      <h2 className="text-[clamp(1.8rem,3.2vw,2.75rem)] font-bold leading-[1.08] tracking-[-.03em] text-adrig-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15.5px] leading-[1.65] text-adrig-muted">{description}</p>
      )}
    </Reveal>
  );
}
