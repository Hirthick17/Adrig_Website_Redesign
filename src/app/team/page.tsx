import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { WHY_ADRIG } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "About & Team — ADRIG" };

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="About ADRIG"
        headline="The engineering team behind"
        headlineAccent="ADRIG AI Technologies."
        description="ADRIG is an engineering-first AI, automation, and enterprise systems company built by architects and builders who ship."
      />

      {/* Story & Approach */}
      <section id="story" className="border-b border-slate-200/60 bg-white py-20 sm:py-28 relative overflow-hidden">
        <div className="shell max-w-4xl mx-auto text-center">
          <SectionHeading
            eyebrow="Our Story & Approach"
            title="Precision before code. Architecture before scale."
            description="Every engagement starts with understanding how the business actually operates — mapping data, friction points, and constraints before designing a system that delivers measurable impact."
            align="center"
          />
        </div>
      </section>

      {/* Why Choose ADRIG — WhyAdrig card treatment */}
      <section className="border-b border-slate-200/60 bg-[#FAFCFF] py-20 sm:py-28 relative overflow-hidden">
        {/* Subtle Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="shell relative z-10">
          <div className="mb-12">
            <SectionHeading eyebrow="Why Choose ADRIG" title="What sets our engineering apart" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_ADRIG.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-7 sm:p-8 shadow-lg shadow-blue-950/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-900/[0.08]">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#1463FF] mb-4">
                      <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
                      0{i + 1} // PRINCIPLE
                    </span>
                    <h3 className="text-[20px] font-normal leading-snug tracking-tight text-slate-900 group-hover:text-[#0E5CEE] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600 font-normal">
                      {item.body}
                    </p>
                  </div>
                  {/* Subtle hover glow */}
                  <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-[#1463FF] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.08] pointer-events-none" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Banner */}
      <section className="border-b border-slate-200/60 bg-white py-16 sm:py-24">
        <div className="shell flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-slate-200/80 bg-[#FAFCFF] p-8 sm:p-12 shadow-sm">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E5CEE]" />
              Careers
            </span>
            <p className="text-[20px] sm:text-[24px] font-normal text-slate-950 tracking-tight">
              We&apos;re building an elite engineering and AI systems team.
            </p>
            <p className="text-sm text-slate-600 mt-1">
              Interested in solving complex operational challenges with us?
            </p>
          </div>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#0E5CEE] shadow-md"
          >
            <span>See Careers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection title="Want to partner with ADRIG?" description="Let's talk about the operational systems you want to build." />
    </>
  );
}
