"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, ShieldAlert, Cpu, Network, Database, Layers } from "lucide-react";

export function ProblemVisual({
  serviceKey,
  state,
}: {
  serviceKey: string;
  state: string;
}) {
  const isResolved =
    state === "resolved" ||
    state === "governed" ||
    state === "agent_orchestration" ||
    state === "synchronized" ||
    state === "realtime_insight" ||
    state === "custom_saas" ||
    state === "executable_blueprint";

  return (
    <div className="relative w-full h-full p-6 flex flex-col justify-between overflow-hidden">
      {/* Visual State Header */}
      <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
          SYSTEM STATE // {state.toUpperCase()}
        </span>
        <span
          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
            isResolved
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {isResolved ? "ENGINEERED" : "FRICTION POINT"}
        </span>
      </div>

      {/* Main Interactive State Geometry */}
      <div className="my-auto flex flex-col items-center justify-center text-center py-4">
        <AnimatePresence mode="wait">
          {isResolved ? (
            <motion.div
              key="resolved"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0E5CEE] text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Synchronized & Observable
              </p>
              <p className="text-[11px] text-slate-600 max-w-[200px] leading-relaxed">
                ADRIG architecture indexes and routes data with sub-second verified latency.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="friction"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 border border-red-200 flex items-center justify-center shadow-inner animate-pulse">
                <AlertCircle className="w-8 h-8" />
              </div>
              <p className="text-xs font-semibold text-red-900 uppercase tracking-wider">
                Operational Logjam Detected
              </p>
              <p className="text-[11px] text-slate-600 max-w-[200px] leading-relaxed">
                Manual handoffs, latency spikes, and fragmented data without real-time governance.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer telemetry */}
      <div className="pt-3 border-t border-blue-200/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>DOMAIN: {serviceKey.toUpperCase()}</span>
        <span className={isResolved ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
          {isResolved ? "99.99% FAULT TOLERANT" : "LATENCY BOTTLENECK"}
        </span>
      </div>
    </div>
  );
}

export default ProblemVisual;
