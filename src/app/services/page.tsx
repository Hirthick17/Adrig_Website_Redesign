import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Card from "@/components/ui/Card";
import CTASection from "@/components/ui/CTASection";
import { SERVICES } from "@/lib/site-data";

export const metadata: Metadata = { title: "Services — ADRIG" };

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        headline="Eight capabilities."
        headlineAccent="One connected team."
        description="AI, automation, software and data engineering — engineered as one cohesive practice to transform enterprise operations."
      />
      <section className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/60 relative overflow-hidden">
        {/* Subtle Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="shell relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Card
              key={s.slug}
              href={`/services/${s.slug}`}
              index={s.number}
              title={s.name}
              description={s.overview}
              delay={(i % 4) * 0.05}
            />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
