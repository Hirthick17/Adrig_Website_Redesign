import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { WHY_ADRIG } from "@/lib/site-data";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="About ADRIG"
        headline="The team behind"
        headlineAccent="ADRIG AI Technologies."
        description="ADRIG is an engineering-first AI, automation, software and data company, built by people who ship."
      />

      <section id="story" className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell max-w-2xl">
          <SectionHeading
            eyebrow="Our Story & Approach"
            title="Precision before code"
            description="Every engagement starts with understanding how the business actually works, then designs the system that fits it — not the other way round."
          />
        </div>
      </section>

      <section className="border-b border-adrig-hairline bg-adrig-bg py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Why Choose ADRIG" title="What sets us apart" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_ADRIG.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="rounded-2xl border border-adrig-hairline bg-white p-5">
                <p className="text-[15px] font-semibold text-adrig-ink">{item.title}</p>
                <p className="mt-2 text-[13.5px] leading-[1.5] text-adrig-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-dashed border-adrig-hairline p-8">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[.18em] text-adrig-blue">Careers</p>
            <p className="mt-2 text-[18px] font-semibold text-adrig-ink">We&apos;re not hiring publicly yet — but we&apos;re building the team.</p>
          </div>
          <Link href="/careers" className="inline-flex items-center gap-2 rounded-full border border-adrig-hairline px-5 py-3 text-[14px] font-semibold text-adrig-ink transition hover:border-adrig-navy">
            See Careers →
          </Link>
        </div>
      </section>

      <CTASection title="Want to partner with ADRIG?" description="Let's talk about what you're building." />
    </>
  );
}
