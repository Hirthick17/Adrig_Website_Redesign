"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Check, X, ShieldAlert, FileCheck, ArrowRight, RefreshCw } from "lucide-react";

export default function AIAutomationScene() {
  const [actionState, setActionState] = useState<"idle" | "pending_approval" | "approved" | "rejected">("pending_approval");
  const [confidence, setConfidence] = useState(98.6);

  const handleApprove = () => {
    setActionState("approved");
  };

  const handleReject = () => {
    setActionState("rejected");
  };

  const handleReset = () => {
    setActionState("pending_approval");
  };

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-blue-950/[0.06] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1463FF] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-900">
            AGENTIC AUTOMATION // HUMAN-IN-THE-LOOP GATE
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#0E5CEE] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-blue-200/60 font-semibold">
          SWARM ACTIVE
        </span>
      </div>

      {/* Simulated Agent Payload Card */}
      <div className="my-4 p-5 rounded-2xl bg-[#FAFCFF] border border-slate-200/80">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3 border-b border-slate-200/60 pb-2">
          <span>TASK ID: #AGT-9821</span>
          <span className="text-[#0E5CEE] font-semibold">CONFIDENCE: {confidence}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">TRIGGER:</span>
            <span className="font-semibold text-slate-900">Vendor Invoice #INV-2026-88</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">PARSED TOTAL:</span>
            <span className="font-semibold text-slate-900">$34,850.00 USD</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">PO MATCH:</span>
            <span className="font-semibold text-emerald-600">PO-44091 (100% Match)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">ROUTING ACTION:</span>
            <span className="font-semibold text-[#0E5CEE]">Commit payment to ERP Ledger</span>
          </div>
        </div>
      </div>

      {/* Interactive Approval / Rejection Gateway */}
      <div className="my-2 p-5 rounded-2xl bg-slate-900 text-white shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-blue-300 flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-[#347DFF]" />
            AUTONOMOUS GATEWAY STATUS
          </span>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
            {actionState.replace("_", " ")}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {actionState === "pending_approval" && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="space-y-4"
            >
              <p className="text-xs text-slate-300 leading-relaxed">
                High-value threshold reached ($30k+). The agent swarm has validated all data fields and paused for human confirmation.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleApprove}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0E5CEE] text-white text-xs font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  Authorize & Commit
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-semibold hover:bg-white/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  Flag for Audit
                </button>
              </div>
            </motion.div>
          )}

          {actionState === "approved" && (
            <motion.div
              key="approved"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs space-y-2"
            >
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <FileCheck className="w-4 h-4" />
                TRANSACTION COMMITTED TO SAP ERP
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-200/90 font-normal">
                Payment committed. Ledger updated. Vendor notified in 0.04s. Audit log signed with cryptographic trace.
              </p>
            </motion.div>
          )}

          {actionState === "rejected" && (
            <motion.div
              key="rejected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs space-y-2"
            >
              <div className="flex items-center gap-2 font-bold text-red-400">
                <ShieldAlert className="w-4 h-4" />
                FLAGGED FOR SECONDARY REVIEW
              </div>
              <p className="text-[11px] leading-relaxed text-red-200/90 font-normal">
                Transaction held. Routing ticket generated and assigned to compliance lead with full provenance breakdown.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reset Simulation Control */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono">SIMULATION MODE</span>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E5CEE] hover:text-slate-900 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Subtle glow */}
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#1463FF] opacity-[0.06] blur-2xl pointer-events-none" />
    </div>
  );
}
