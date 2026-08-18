"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, BarChart3, AlertTriangle, CheckCircle, Sliders, Database } from "lucide-react";

export default function DataAnalysisScene() {
  const [viewMode, setViewMode] = useState<"raw" | "insight">("insight");

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-blue-950/[0.06] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1463FF] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-900">
            STREAMING LAKEHOUSE // TELEMETRY TO DECISION
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#0E5CEE] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-blue-200/60 font-semibold">
          ANOMALY RADAR
        </span>
      </div>

      <div className="my-4 flex items-center justify-between bg-[#FAFCFF] p-1.5 rounded-2xl border border-slate-200/80">
        <button
          onClick={() => setViewMode("raw")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
            viewMode === "raw"
              ? "bg-white text-slate-950 shadow-sm border border-slate-200"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Raw Sensor Log (Noise)</span>
        </button>
        <button
          onClick={() => setViewMode("insight")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
            viewMode === "insight"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-[#347DFF]" />
          <span>ADRIG Predictive Signal (Foresight)</span>
        </button>
      </div>

      <div className="my-2 p-5 rounded-2xl bg-[#FAFCFF] border border-slate-200/80 min-h-[220px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {viewMode === "raw" ? (
            <motion.div
              key="raw"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-2 font-mono text-[11px] text-slate-600 bg-white p-4 rounded-xl border border-slate-200"
            >
              <p className="text-slate-400 font-medium pb-1 border-b border-slate-100">
                RAW SENSOR FEED / 50,000 EPS (UNINDEXED):
              </p>
              <p>2026-08-16T17:40:01.092Z SENSOR_441: temp=88.4C, vib_hz=142.1, amp=0.88, err_flag=0</p>
              <p>2026-08-16T17:40:01.093Z SENSOR_442: temp=91.2C, vib_hz=188.4, amp=1.42, err_flag=1</p>
              <p className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">2026-08-16T17:40:01.094Z SENSOR_443: temp=98.9C, vib_hz=240.2, amp=2.10, err_flag=1</p>
              <p className="text-slate-400 italic mt-2 text-[10px]">
                50,000 raw telemetry lines/sec — without streaming models, critical stress signatures are buried in noise.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="insight"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-4"
            >
              {/* Alert Card */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    PREDICTED BEARING FAILURE (72H LEAD TIME)
                  </span>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                    HIGH CONFIDENCE (97.4%)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Vibration harmonic drift on Motor Shaft #4 indicates premature bearing fatigue. Automated maintenance work-order #WO-7719 generated for scheduled overnight window.
                </p>
              </div>

              {/* Stat Matrix */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <p className="text-[10px] text-slate-500 font-mono">DOWNTIME SAVED</p>
                  <p className="text-sm font-bold text-emerald-600 mt-0.5">4.2 Hours</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <p className="text-[10px] text-slate-500 font-mono">FINANCIAL IMPACT</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">$84,000 USD</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <p className="text-[10px] text-slate-500 font-mono">EXECUTION</p>
                  <p className="text-sm font-bold text-[#0E5CEE] mt-0.5">Autonomous</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono">QUERY LATENCY: 14ms ON 10M ROWS</span>
        <span className="text-[#0E5CEE] font-semibold">CLICKHOUSE CLUSTER</span>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#1463FF] opacity-[0.06] blur-2xl pointer-events-none" />
    </div>
  );
}
