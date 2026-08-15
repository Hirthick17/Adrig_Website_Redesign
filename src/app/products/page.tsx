import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { PRODUCTS } from "@/lib/site-data";

export const metadata: Metadata = { title: "Our Products" };

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        headline="Platforms we've"
        headlineAccent="built and shipped."
        description="ADRIG products in production today, across railways, fintech and automation."
      />
      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Products" title="Six platforms, one engineering team" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <div id={p.slug} className="flex h-full scroll-mt-24 flex-col gap-3 rounded-2xl border border-adrig-hairline bg-white p-6">
                  <span className="text-[11.5px] font-semibold uppercase tracking-[.14em] text-adrig-faint">{p.tagline}</span>
                  <h3 className="text-[19px] font-semibold tracking-[-.01em] text-adrig-ink">{p.name}</h3>
                  <p className="text-[14px] leading-[1.55] text-adrig-muted">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
