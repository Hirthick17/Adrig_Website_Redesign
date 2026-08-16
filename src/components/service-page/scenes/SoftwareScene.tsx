"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, TestTube, Cloud, GitCommit, CheckCircle2, ShieldCheck } from "lucide-react";

const STAGES = [
  {
    id: "spec",
    name: "1. Architecture & Code",
    icon: Code,
    summary: "API-first Next.js & Node.js microservices with strict TypeScript contracts.",
    evidence: [
      "Modular microservices with full OpenAPI spec generation",
      "Strict ESLint, Prettier & SOC2 security linting gates",
      "Multi-tenant PostgreSQL schema isolation with RLS",
    ],
    tag: "GIT // MAIN BRANCH",
  },
  {
    id: "test",
    name: "2. Automated Testing",
    icon: TestTube,
    summary: "End-to-end integration and load testing simulating 10,000 concurrent users.",
    evidence: [
      "94.2% unit and integration test coverage",
      "Load tested at 12,000 req/sec with p99 latency < 42ms",
      "Automated regression matrix verifying all API contracts",
    ],
    tag: "CI/CD // PASS 100%",
  },
  {
    id: "deploy",
    name: "3. Cloud Deployment",
    icon: Cloud,
    summary: "Canary rollout across multi-region Kubernetes clusters with zero-downtime.",
    evidence: [
      "Multi-region deployment across AWS us-east & ap-south",
      "Automated health checks with instant rollback triggers",
      "Real-time Grafana telemetry & structured JSON logging",
    ],
    tag: "PROD // LIVE HEALTHY",
  },
];

export default function SoftwareScene() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = STAGES[selectedIdx];

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-blue-950/[0.06] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1463FF] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-900">
            ENGINEERING EVIDENCE // CI/CD DEPLOYMENT PIPELINE
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#0E5CEE] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-blue-200/60 font-semibold">
          STABLE BUILD
        </span>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 my-4">
        {STAGES.map((s, idx) => {
          const Icon = s.icon;
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedIdx(idx)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                  : "bg-[#FAFCFF] text-slate-700 border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <Icon className={`w-4 h-4 mb-2 ${isSelected ? "text-[#347DFF]" : "text-[#0E5CEE]"}`} />
              <span className="text-xs font-semibold leading-tight">{s.name}</span>
            </button>
          );
        })}
      </div>

      {/* Engineering Evidence Deep Dive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="p-5 rounded-2xl bg-[#FAFCFF] border border-blue-200/70 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 text-xs font-mono">
            <span className="text-[#0E5CEE] font-semibold">{current.tag}</span>
            <span className="text-slate-500">AUDITABLE RECORD</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            {current.summary}
          </p>

          <div className="space-y-2 pt-1">
            {current.evidence.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0E5CEE] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom status */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono">UPTIME SLA: 99.99%</span>
        <span className="text-[#0E5CEE] font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          SOC2 ALIGNED
        </span>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#1463FF] opacity-[0.06] blur-2xl pointer-events-none" />
    </div>
  );
}
