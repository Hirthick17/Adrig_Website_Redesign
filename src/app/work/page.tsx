import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Card from "@/components/ui/Card";
import CTASection from "@/components/ui/CTASection";
import { WORK_ITEMS } from "@/lib/site-data";

export const metadata: Metadata = { title: "Our Work — ADRIG" };

export default function WorkIndex() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        headline="Proven deployments."
        headlineAccent="Real operational impact."
        description="Explore how we engineer and deploy high-throughput AI, automation, and software systems for leading enterprises."
      />
      <section className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/60 relative overflow-hidden">
        {/* Subtle Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="shell relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORK_ITEMS.map((w, i) => (
            <Card
              key={w.slug}
              href={`/work/${w.slug}`}
              eyebrow={w.category}
              title={`${w.name} · ${w.client}`}
              description={w.summary}
              delay={(i % 3) * 0.05}
            />
          ))}
        </div>
      </section>
      <CTASection title="Let's build the next success story together." description="Have a mission-critical project in mind? We're ready to engineer it." />
    </>
  );
}
