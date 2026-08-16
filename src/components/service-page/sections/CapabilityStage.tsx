"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Zap, Shield, ArrowUpRight } from "lucide-react";
import type { CapabilityItem, ServiceKey } from "@/content/services";

export function CapabilityStage({
  capabilities,
  serviceKey,
}: {
  capabilities: CapabilityItem[];
  serviceKey: ServiceKey;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCap = capabilities[activeIdx] || capabilities[0];

  return (
    <section id="capabilities" className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/60 relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
      />

      <div className="shell relative z-10 max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-tight text-slate-950 max-w-3xl">
            Engineered capabilities. Measured by operational outcomes.
          </h2>
        </div>

        {/* 4 / 8 Split Capability Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: 4 Cols Selectable Capability Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {capabilities.map((cap, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={cap.id}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white border-blue-300/80 shadow-lg shadow-blue-950/[0.04]"
                      : "bg-white/60 border-slate-200/70 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  {/* layoutId active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-capability-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-[#0E5CEE]"
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        isActive ? "text-[#0E5CEE]" : "text-slate-400"
                      }`}
                    >
                      CAPABILITY 0{idx + 1}
                    </span>
                    {cap.metrics && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#0E5CEE] border border-blue-200/60">
                        {cap.metrics}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-normal tracking-tight transition-colors ${
                      isActive ? "text-slate-950 font-medium" : "text-slate-700"
                    }`}
                  >
                    {cap.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: 8 Cols Large Dynamic Capability Visual Stage */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-slate-900 text-white p-8 sm:p-10 shadow-xl overflow-hidden relative min-h-[440px]">
            {/* Top bar inside visual stage */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-300">
                <Zap className="w-4 h-4 text-[#347DFF]" />
                <span>SYSTEM CAPABILITY SPECIFICATION</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                0{activeIdx + 1} // 0{capabilities.length}
              </span>
            </div>

            {/* Crossfading Capability Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="my-auto py-6 space-y-6"
              >
                <div>
                  <span className="text-xs font-mono text-[#347DFF] uppercase tracking-widest block mb-2">
                    CORE DELIVERABLE
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-normal tracking-tight text-white leading-snug">
                    {activeCap.title}
                  </h4>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                    {activeCap.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-blue-300 uppercase tracking-wider block">
                    GUARANTEED OPERATIONAL OUTCOME:
                  </span>
                  <div className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#347DFF] shrink-0 mt-0.5" />
                    <span>{activeCap.outcome}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>AIR-GAPPED & OBSERVABLE</span>
              <span className="text-[#347DFF]">100% PRODUCTION READY</span>
            </div>

            {/* Ambient Corner Glow */}
            <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-[#1463FF] opacity-15 blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CapabilityStage;
