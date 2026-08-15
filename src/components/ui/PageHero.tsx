import Link from "next/link";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  headline,
  headlineAccent,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="border-b border-adrig-hairline bg-gradient-to-br from-adrig-blue-soft via-adrig-bg to-white">
      <div className="shell py-20 sm:py-28">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[.2em] text-adrig-blue">{eyebrow}</p>
          <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-[-.035em] text-adrig-ink">
            {headline} {headlineAccent && <span className="text-adrig-blue">{headlineAccent}</span>}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-adrig-muted">{description}</p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-adrig-navy px-6 py-3.5 text-[14.5px] font-semibold text-white transition hover:bg-adrig-blue"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-adrig-hairline bg-white px-6 py-3.5 text-[14.5px] font-semibold text-adrig-ink transition hover:border-adrig-navy"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
