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
    <section className="relative overflow-hidden border-t border-[#D9E2EE] bg-[#F4F8FF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,99,255,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(52,125,255,0.08),transparent_28%)]" />

      <div className="shell relative z-10 py-16 lg:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[clamp(2.1rem,4vw,4rem)] font-medium leading-[0.98] tracking-tighter text-[#071A33]">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#1B293D]/75 sm:text-lg">
              {description}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-adrig-blue px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-adrig-blue-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adrig-blue focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F8FF]"
              >
                Let&apos;s Talk
              </Link>
              <Link
                href="/contact#schedule"
                className="inline-flex items-center justify-center rounded-full border border-[#D9E2EE] bg-white px-6 py-3.5 text-sm font-semibold text-[#071A33] transition duration-300 hover:bg-adrig-blue-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adrig-blue focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F8FF]"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
