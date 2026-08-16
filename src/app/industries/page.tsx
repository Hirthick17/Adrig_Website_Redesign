import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/site-data";

export const metadata: Metadata = { title: "Industries — ADRIG" };

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        headline="Deep domain expertise,"
        headlineAccent="not generic tooling."
        description="ADRIG builds and deploys systems tailored to the operational realities, compliance standards, and workflows of each industry."
      />
      <section className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/60 relative overflow-hidden">
        {/* Subtle Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="shell relative z-10">
          <div className="mb-12">
            <SectionHeading
              title="Mission-critical systems across major sectors"
              description="From heavy transit and logistics to automated fintech and healthcare operations, our systems operate where precision matters."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind} delay={(i % 4) * 0.04}>
                <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-7 shadow-lg shadow-blue-950/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300/70 hover:shadow-xl hover:shadow-blue-900/[0.07]">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#1463FF] mb-3">
                      <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
                      SECTOR 0{i + 1}
                    </span>
                    <h3 className="text-[19px] font-normal tracking-tight text-slate-900 group-hover:text-[#0E5CEE] transition-colors">
                      {ind}
                    </h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Enterprise Deployments</span>
                    <span className="font-mono text-[#0E5CEE]">LIVE</span>
                  </div>
                  {/* Hover glow */}
                  <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[#1463FF] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.08] pointer-events-none" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Operating in a specialized industry?" description="Let's discuss your sector's regulatory constraints and operational workflows." />
    </>
  );
}
