import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { INDUSTRIES } from "@/lib/site-data";

export const metadata: Metadata = { title: "Industries We Serve" };

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        headline="Domain expertise,"
        headlineAccent="not generic tooling."
        description="ADRIG builds for the operational reality of each industry it works in."
      />
      <section className="py-16 sm:py-24">
        <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind} delay={(i % 4) * 0.06} className="rounded-2xl border border-adrig-hairline bg-white p-6">
              <p className="text-[16px] font-semibold text-adrig-ink">{ind}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
