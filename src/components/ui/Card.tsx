import Link from "next/link";
import Reveal from "./Reveal";

export default function Card({
  href,
  eyebrow,
  title,
  description,
  index,
  delay = 0,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
  index?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        href={href}
        className="group flex h-full flex-col gap-3 rounded-2xl border border-adrig-hairline bg-white p-6 transition hover:-translate-y-1 hover:border-adrig-blue/30 hover:shadow-[0_24px_50px_-30px_rgba(14,92,238,0.35)]"
      >
        {index && <span className="text-[11.5px] font-bold tracking-[.2em] text-adrig-blue">{index}</span>}
        {eyebrow && <span className="text-[11.5px] font-semibold uppercase tracking-[.14em] text-adrig-faint">{eyebrow}</span>}
        <h3 className="text-[18px] font-semibold tracking-[-.01em] text-adrig-ink">{title}</h3>
        <p className="flex-1 text-[14px] leading-[1.55] text-adrig-muted">{description}</p>
        <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-adrig-blue">
          Learn more
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition group-hover:translate-x-1">
            <path d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}
