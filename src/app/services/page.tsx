import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Card from "@/components/ui/Card";
import CTASection from "@/components/ui/CTASection";
import { SERVICES } from "@/lib/site-data";

export const metadata: Metadata = { title: "Services" };

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        headline="Eight capabilities."
        headlineAccent="One team."
        description="AI, automation, software and data engineering — engineered as one connected practice."
      />
      <section className="py-16 sm:py-24">
        <div className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Card
              key={s.slug}
              href={`/services/${s.slug}`}
              index={s.number}
              title={s.name}
              description={s.overview}
              delay={(i % 4) * 0.06}
            />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
