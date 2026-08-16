"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, Clock, Target, CheckCircle } from "lucide-react";

const ROADMAP_ITEMS = [
  {
    id: "phase1",
    phase: "Phase 1 (Weeks 1–6)",
    title: "High-Impact Data Audit & Core RAG Pilot",
    impact: "High ROI",
    complexity: "Low Complexity",
    deliverable: "Indexed 10,000 internal documents into private vector store; verified 98% retrieval precision.",
    status: "Immediate Quick Win",
  },
  {
    id: "phase2",
    phase: "Phase 2 (Weeks 7–12)",
    title: "ERP Event Bus & Agent Swarm Integration",
    impact: "Strategic Scale",
    complexity: "Medium Complexity",
    deliverable: "Bi-directional SAP connector and autonomous invoice/PO validation agent pipeline.",
    status: "Operational Automation",
  },
  {
    id: "phase3",
    phase: "Phase 3 (Weeks 13–18)",
    title: "Air-Gapped Sovereign Model Deployment",
    impact: "Total Sovereignty",
    complexity: "Enterprise Scale",
    deliverable: "Dedicated GPU cluster fine-tuned on company data with continuous drift telemetry.",
    status: "Enterprise Defense",
  },
];

export default function ConsultationScene() {
  const [filter, setFilter] = useState<"all" | "quick_win" | "strategic">("all");

  const filteredItems = ROADMAP_ITEMS.filter((item) => {
    if (filter === "quick_win") return item.impact === "High ROI";
    if (filter === "strategic") return item.impact !== "High ROI";
    return true;
  });

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-blue-950/[0.06] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1463FF] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-900">
            SYSTEMS ARCHITECTURE // PHASED ROI ROADMAP
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#0E5CEE] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-blue-200/60 font-semibold">
          DE-RISKED
        </span>
      </div>

      {/* Interactive Filter Pills */}
      <div className="my-4 flex items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
            filter === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-[#FAFCFF] text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          All 3 Phases
        </button>
        <button
          onClick={() => setFilter("quick_win")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
            filter === "quick_win"
              ? "bg-[#0E5CEE] text-white shadow-xs"
              : "bg-[#FAFCFF] text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Phase 1 Quick Wins
        </button>
        <button
          onClick={() => setFilter("strategic")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
            filter === "strategic"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-[#FAFCFF] text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Phases 2 & 3 Scale
        </button>
      </div>

      {/* Dynamic Roadmap Items Stack */}
      <div className="space-y-2.5 my-2">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="p-4 rounded-2xl bg-[#FAFCFF] border border-slate-200/80 hover:border-blue-300 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className="font-mono font-bold text-[#0E5CEE]">{item.phase}</span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-blue-50 text-[#0E5CEE] border border-blue-200/50">
                  {item.impact}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-950 mb-1">{item.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">{item.deliverable}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom status */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono">RISK MITIGATION SCORE: 98.2%</span>
        <span className="text-[#0E5CEE] font-semibold">DELIVERY GUARANTEED</span>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#1463FF] opacity-[0.06] blur-2xl pointer-events-none" />
    </div>
  );
}
