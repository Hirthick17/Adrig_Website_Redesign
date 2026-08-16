import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { PRODUCTS } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Products — ADRIG" };

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        headline="Platforms engineered from"
        headlineAccent="real enterprise operations."
        description="Every product emerged from solving a high-stakes operational problem — then engineered into an enterprise platform."
      />
      <section className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/60 relative overflow-hidden">
        {/* Subtle Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="shell relative z-10">
          <div className="mb-12">
            <SectionHeading eyebrow="Production Platforms" title="Six platforms deployed across enterprises" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                <div id={p.slug} className="group relative flex h-full scroll-mt-28 flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-7 sm:p-8 shadow-lg shadow-blue-950/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-900/[0.08]">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#1463FF] mb-3">
                      <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
                      {p.tagline}
                    </span>
                    <h3 className="text-[22px] font-normal tracking-tight text-slate-950 group-hover:text-[#0E5CEE] transition-colors duration-300">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600 font-normal">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/contact?product=${p.slug}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#0E5CEE] transition-colors duration-300"
                    >
                      <span>Request deployment</span>
                      <ArrowRight className="w-4 h-4 text-[#0E5CEE] transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Corner glow */}
                  <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-[#1463FF] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.08] pointer-events-none" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Deploy an ADRIG platform in your enterprise" description="Talk to our systems architects to evaluate deployment requirements and timelines." />
    </>
  );
}
