"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServiceCTA({ serviceName }: { serviceName: string }) {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
      />

      <div className="shell relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
          Ready to engineer {serviceName} for your enterprise?
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
          Talk directly with our senior systems architects to evaluate constraints, compliance standards, and feasibility before writing a line of code.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-slate-950 shadow-lg transition duration-300 hover:bg-[#1463FF] hover:text-white"
          >
            <span>Let&apos;s talk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/work"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <span>Explore case studies</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServiceCTA;
