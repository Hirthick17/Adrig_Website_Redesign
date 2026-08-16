"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { ArchitectureNode, ServiceKey } from "@/content/services";

export function ArchitectureReveal({
  architecture,
}: {
  architecture: {
    title: string;
    nodes: ArchitectureNode[];
  };
  serviceKey?: ServiceKey;
}) {
  return (
    <section id="architecture" className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/60 relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
      />

      <div className="shell relative z-10 max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-tight text-slate-950 max-w-3xl">
            {architecture.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            A deterministic, observable system pipeline designed with verifiable bounds, sub-second latency, and zero single points of failure.
          </p>
        </div>

        {/* Horizontal Multi-Row Architecture Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {architecture.nodes.map((node, index) => {
            const isLast = index === architecture.nodes.length - 1;
            return (
              <div
                key={node.id}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl shadow-blue-950/[0.03] hover:shadow-2xl hover:shadow-blue-950/[0.08] hover:border-blue-300 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Top header with step number and node id */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-[#0E5CEE] text-white text-xs font-mono font-bold flex items-center justify-center shadow-sm">
                        0{index + 1}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                        // {node.id}
                      </span>
                    </div>

                    {!isLast && (
                      <div className="hidden lg:flex items-center text-[#0E5CEE] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-slate-950 mb-3">
                    {node.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {node.description}
                  </p>
                </div>

                {/* Bottom telemetry footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    VERIFIED
                  </span>
                  <span className="text-[#0E5CEE] font-medium uppercase">
                    STAGE 0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ArchitectureReveal;
