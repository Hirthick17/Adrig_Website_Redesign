"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Cpu, ShieldCheck, Check, Layers, ArrowRight } from "lucide-react";

const PIPELINE_STAGES = [
  {
    id: "ingest",
    name: "1. Ingestion & Tokenization",
    icon: FileText,
    badge: "50k+ Docs",
    desc: "Multi-format document ingestion, semantic chunking, and metadata tagging.",
    telemetry: "Chunk Size: 512 tokens · Overlap: 10% · Anonymization: Active",
  },
  {
    id: "retrieve",
    name: "2. Vector Retrieval",
    icon: Layers,
    badge: "HNSW Index",
    desc: "Top-k nearest neighbor retrieval with multi-vector reranking.",
    telemetry: "Recall: 99.4% · Top-K: 5 chunks · Hybrid BM25: Enabled",
  },
  {
    id: "generate",
    name: "3. Sovereign Generation",
    icon: Cpu,
    badge: "Air-Gapped",
    desc: "Domain-tuned open weights running in isolated high-throughput vLLM containers.",
    telemetry: "Model: Llama 3 70B Quantized · Inference: 38ms/token",
  },
  {
    id: "eval",
    name: "4. Fact Verification & Guardrail",
    icon: ShieldCheck,
    badge: "100% Verified",
    desc: "Deterministic factual consistency check verifying citations before user display.",
    telemetry: "Factual Accuracy: 99.8% · Hallucination Filter: 0 anomalies",
  },
];

export default function LLMScene() {
  const [activeStep, setActiveStep] = useState(0);
  const current = PIPELINE_STAGES[activeStep];

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-blue-950/[0.06] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0E5CEE] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-900">
            LLM // SOVEREIGN GENERATION PIPELINE
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#0E5CEE] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-blue-200/60 font-semibold">
          AIR-GAPPED
        </span>
      </div>

      {/* Pipeline Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
        {PIPELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                  : "bg-[#FAFCFF] text-slate-700 border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? "text-[#347DFF]" : "text-[#0E5CEE]"}`} />
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? "bg-white/15 text-blue-200" : "bg-[#EEF4FF] text-[#0E5CEE]"}`}>
                  {stage.badge}
                </span>
              </div>
              <span className="text-xs font-semibold leading-tight">{stage.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep Dive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
          className="p-5 rounded-2xl bg-[#FAFCFF] border border-blue-200/70 shadow-xs"
        >
          <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0E5CEE]">
              Active Pipeline Stage
            </span>
            <span className="text-xs font-mono text-slate-500">STAGE 0{activeStep + 1} OF 04</span>
          </div>

          <h4 className="text-base sm:text-lg font-normal text-slate-950 mb-2">
            {current.name}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {current.desc}
          </p>

          <div className="mt-4 p-3 rounded-xl bg-slate-900 text-slate-300 font-mono text-[11px] flex items-center justify-between">
            <span className="text-blue-300">TELEMETRY:</span>
            <span>{current.telemetry}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom controls */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono">VERIFIED BY ADRIG ARCHITECTURE</span>
        <button
          onClick={() => setActiveStep((prev) => (prev + 1) % PIPELINE_STAGES.length)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E5CEE] hover:text-slate-900 cursor-pointer"
        >
          <span>Next Stage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Ambient Blue Radial Glow */}
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#1463FF] opacity-[0.06] blur-2xl pointer-events-none" />
    </div>
  );
}
