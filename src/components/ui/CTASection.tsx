import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection({
  title = "Let's build the future together.",
  description = "Have a project in mind? We're ready to bring it to life.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-t border-adrig-hairline bg-adrig-navy">
      <div className="shell flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center">
        <Reveal>
          <h2 className="max-w-lg text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight tracking-[-.02em] text-white">
            {title}
          </h2>
          <p className="mt-2 text-[15px] text-white/60">{description}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-none flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-adrig-blue px-6 py-3.5 text-[14.5px] font-semibold text-white transition hover:bg-adrig-blue-strong"
          >
            Let&apos;s Talk
          </Link>
          <Link
            href="/contact#schedule"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[14.5px] font-semibold text-white transition hover:bg-white/10"
          >
            Schedule a Call
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
