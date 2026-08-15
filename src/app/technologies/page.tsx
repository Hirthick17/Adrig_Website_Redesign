import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { TECHNOLOGIES } from "@/lib/site-data";

export const metadata: Metadata = { title: "Technologies We Use" };

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technologies We Use"
        headline="A modern stack,"
        headlineAccent="chosen deliberately."
        description="Tools and frameworks ADRIG uses to build, train and ship."
      />
      <section className="py-16 sm:py-24">
        <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNOLOGIES.map((tech, i) => (
            <Reveal key={tech} delay={(i % 4) * 0.06} className="rounded-2xl border border-adrig-hairline bg-white p-6">
              <p className="text-[16px] font-semibold text-adrig-ink">{tech}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
