"use client";

import React from "react";
import Image from "next/image";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { UseCaseItem, ServiceKey } from "@/content/services";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function UseCaseGrid({
  items,
  serviceKey,
}: {
  items: UseCaseItem[];
  serviceKey: ServiceKey;
}) {
  return (
    <section id="use-cases" className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/60 relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
      />

      <div className="shell relative z-10 max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-tight text-slate-950 max-w-3xl">
            Proven use cases deployed in mission-critical environments.
          </h2>
        </div>

        {/* 7 / 5 Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {items.map((item, idx) => {
            const isWide = idx % 2 === 0;
            return (
              <div
                key={item.title}
                className={isWide ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <CardSpotlight className="h-full flex flex-col justify-between overflow-hidden">
                  {/* Optional Image */}
                  {item.image && (
                    <div className="relative h-48 sm:h-56 w-full mb-6 rounded-2xl overflow-hidden bg-[#F3F7FF] border border-slate-200/70">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover saturate-[0.8] hover:saturate-100 hover:scale-[1.035] transition duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0E5CEE] block mb-2">
                      USE CASE 0{idx + 1}
                    </span>
                    <h3 className="text-2xl font-normal tracking-tight text-slate-950 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.impact && (
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.impact}
                      </span>
                    </div>
                  )}
                </CardSpotlight>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default UseCaseGrid;
