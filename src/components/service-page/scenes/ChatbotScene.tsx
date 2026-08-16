"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Database, CheckCircle2, Sparkles, Send } from "lucide-react";

const SAMPLE_QUERIES = [
  {
    q: "What is our enterprise SLA on cluster failover?",
    answer: "Section 4.2: High-availability clusters initiate automated failover within 45 seconds with zero data loss.",
    source: "SLA_Framework_v3.pdf · Page 14",
    latency: "0.84s",
  },
  {
    q: "How are confidential patient records indexed?",
    answer: "Clause 9.1: All medical telemetry is encrypted via AES-256 and vector-embedded in dedicated air-gapped VPCs.",
    source: "Compliance_Standard_HIPAA.docx · Clause 9",
    latency: "0.92s",
  },
  {
    q: "What is the threshold for automated invoice routing?",
    answer: "Rule 12: Invoices under $50,000 with matching POs are committed autonomously; anomalies route to Tier-2 finance leads.",
    source: "Finance_Operating_Rules.pdf · Rule 12",
    latency: "0.76s",
  },
];

export default function ChatbotScene() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const current = SAMPLE_QUERIES[selectedIdx];

  const handleSelect = (idx: number) => {
    if (idx === selectedIdx) return;
    setIsProcessing(true);
    setSelectedIdx(idx);
    setTimeout(() => setIsProcessing(false), 450);
  };

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-blue-950/[0.06] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1463FF] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-900">
            RAG // KNOWLEDGE RETRIEVAL SIMULATOR
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#0E5CEE] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-blue-200/60 font-semibold">
          LIVE INDEX
        </span>
      </div>

      {/* Query Selector Tabs */}
      <div className="my-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
          Select sample operational query:
        </p>
        <div className="grid gap-2">
          {SAMPLE_QUERIES.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`text-left text-xs sm:text-sm p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedIdx === i
                  ? "bg-[#EEF4FF] border-blue-300 text-[#0E5CEE] font-medium shadow-sm"
                  : "bg-[#FAFCFF] border-slate-200/80 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="truncate pr-2">"{item.q}"</span>
              <Send className={`w-3.5 h-3.5 shrink-0 ${selectedIdx === i ? "text-[#0E5CEE]" : "text-slate-400"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Path Flow Visualization */}
      <div className="my-2 p-4 rounded-2xl bg-[#FAFCFF] border border-slate-200/80">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3 border-b border-slate-200/60 pb-2">
          <span>RETRIEVAL PIPELINE</span>
          <span className="text-[#0E5CEE] font-semibold">LATENCY: {current.latency}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center">
            <MessageSquare className="w-4 h-4 text-[#0E5CEE] mb-1" />
            <span className="font-semibold text-slate-900">1. Query</span>
            <span className="text-[10px] text-slate-500">Semantic parsing</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center">
            <Database className="w-4 h-4 text-[#0E5CEE] mb-1" />
            <span className="font-semibold text-slate-900">2. Vector Match</span>
            <span className="text-[10px] text-slate-500">Cosine 0.94 score</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#071A33] text-white shadow-xs flex flex-col items-center">
            <Sparkles className="w-4 h-4 text-[#347DFF] mb-1" />
            <span className="font-semibold text-white">3. Verified</span>
            <span className="text-[10px] text-blue-200">Grounded answer</span>
          </div>
        </div>
      </div>

      {/* Dynamic Answer Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-2 p-4 rounded-2xl bg-slate-900 text-white shadow-inner"
        >
          <div className="flex items-center justify-between text-xs text-blue-300 font-mono mb-2">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#347DFF]" />
              VERIFIED RESPONSE
            </span>
            <span className="text-[10px] text-slate-400">100% CITED</span>
          </div>
          <p className="text-xs sm:text-[13.5px] leading-relaxed text-slate-200 font-normal">
            {current.answer}
          </p>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono text-blue-300/80">SOURCE: {current.source}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Subtle bottom glow */}
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#1463FF] opacity-[0.06] blur-2xl pointer-events-none" />
    </div>
  );
}
