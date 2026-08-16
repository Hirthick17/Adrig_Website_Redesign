import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import { TECHNOLOGIES } from "@/lib/site-data";
import { EnterpriseToolsMarquee } from "@/components/ui/marquee-logos";

export const metadata: Metadata = { title: "Technologies — ADRIG" };

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        headline="A modern stack,"
        headlineAccent="chosen deliberately."
        description="Production-grade tools, enterprise frameworks, and battle-tested infrastructure ADRIG uses to build, train, and deploy."
      />
      <section className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/60 relative overflow-hidden">
        {/* Subtle Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="shell relative z-10">
          <div className="mb-12">
            <SectionHeading
              title="Built for throughput, security, and scale"
              description="Every technology in our stack is evaluated for operational reliability, long-term support, and air-gapped security."
            />
          </div>

          {/* Marquee Banner */}
          <div className="mb-12">
            <EnterpriseToolsMarquee />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TECHNOLOGIES.map((tech, i) => (
              <Reveal key={tech} delay={(i % 4) * 0.04}>
                <div className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/70 hover:shadow-md hover:shadow-blue-900/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#1463FF]" />
                    <p className="text-[16px] font-normal text-slate-900 group-hover:text-[#0E5CEE] transition-colors">
                      {tech}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    PROD
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Looking for a specific architecture?" description="We integrate with your existing technology stack, cloud, or on-premise infrastructure." />
    </>
  );
}
