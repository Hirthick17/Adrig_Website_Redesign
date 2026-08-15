import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Card from "@/components/ui/Card";
import CTASection from "@/components/ui/CTASection";
import { WORK_ITEMS } from "@/lib/site-data";

export const metadata: Metadata = { title: "Work" };

export default function WorkIndex() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        headline="Real solutions."
        headlineAccent="Real impact."
        description="Explore how we turn complex challenges into powerful, scalable solutions."
      />
      <section className="py-16 sm:py-24">
        <div className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORK_ITEMS.map((w, i) => (
            <Card
              key={w.slug}
              href={`/work/${w.slug}`}
              eyebrow={w.category}
              title={`${w.name} · ${w.client}`}
              description={w.summary}
              delay={(i % 3) * 0.06}
            />
          ))}
        </div>
      </section>
      <CTASection title="Let's build the next success story together." description="Have a project in mind? We're ready to bring it to life." />
    </>
  );
}
