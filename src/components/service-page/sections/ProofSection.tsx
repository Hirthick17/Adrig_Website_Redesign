"use client";

import React from "react";
import { ProofData } from "@/content/services";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProofSection({ proof }: { proof: ProofData }) {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="shell max-w-7xl mx-auto">
        <div className="rounded-3xl border border-slate-200/80 bg-[#FAFCFF] p-8 sm:p-12 lg:p-16 shadow-xl shadow-blue-950/[0.04] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-normal text-slate-950 tracking-tight leading-none">
              {proof.metric}
            </div>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#0E5CEE]">
              {proof.label}
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <p className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight leading-snug">
              "{proof.description}"
            </p>
            {proof.client && (
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  DEPLOYED WITH: {proof.client.toUpperCase()}
                </span>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E5CEE] hover:text-slate-900 transition-colors"
                >
                  <span>Read full case study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProofSection;
