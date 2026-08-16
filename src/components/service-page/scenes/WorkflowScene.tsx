"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Network, Database, Layers, ArrowRight, Activity, Zap } from "lucide-react";

const SYSTEMS = [
  {
    id: "crm",
    name: "HubSpot / Salesforce",
    role: "Order Generation",
    upstream: ["Web Portal"],
    downstream: ["Kafka Event Bus", "Billing Service"],
    status: "Active · 12ms",
  },
  {
    id: "bus",
    name: "ADRIG Event Broker",
    role: "Central State Router",
    upstream: ["All Microservices"],
    downstream: ["SAP ERP", "Warehouse Hub", "Analytics"],
    status: "99.99% Stream Uptime",
  },
  {
    id: "erp",
    name: "SAP S/4HANA ERP",
    role: "Financial Ledger",
    upstream: ["ADRIG Event Broker"],
    downstream: ["Auditing Service", "Tax Compliance"],
    status: "Synced · Real-Time",
  },
  {
    id: "warehouse",
    name: "WMS Logistics Node",
    role: "Dispatch & Freight",
    upstream: ["ADRIG Event Broker"],
    downstream: ["Carrier APIs", "Customer SMS"],
    status: "Connected · 0 dropped msgs",
  },
];

export default function WorkflowScene() {
  const [hoveredId, setHoveredId] = useState<string>("bus");
  const activeSystem = SYSTEMS.find((s) => s.id === hoveredId) || SYSTEMS[1];

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-blue-950/[0.06] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1463FF] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-900">
            EVENT BUS // DEPENDENCY GRAPH TELEMETRY
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#0E5CEE] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-blue-200/60 font-semibold flex items-center gap-1">
          <Activity className="w-3 h-3 text-[#0E5CEE]" />
          OBSERVABILITY 100%
        </span>
      </div>

      <p className="text-xs text-slate-500 my-2 font-medium">
        Hover any system node to trace real-time upstream & downstream propagation:
      </p>

      {/* Interactive System Nodes Grid */}
      <div className="grid grid-cols-2 gap-3 my-2">
        {SYSTEMS.map((sys) => {
          const isSelected = hoveredId === sys.id;
          return (
            <div
              key={sys.id}
              onMouseEnter={() => setHoveredId(sys.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                  : "bg-[#FAFCFF] text-slate-800 border-slate-200/80 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${isSelected ? "bg-blue-500/30 text-blue-200" : "bg-[#EEF4FF] text-[#0E5CEE]"}`}>
                  {sys.role}
                </span>
                <Zap className={`w-3.5 h-3.5 ${isSelected ? "text-[#347DFF]" : "text-slate-400"}`} />
              </div>
              <h4 className="text-xs sm:text-sm font-semibold tracking-tight">{sys.name}</h4>
              <p className={`text-[11px] font-mono mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                {sys.status}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live Dependency Inspection Panel */}
      <div className="my-2 p-5 rounded-2xl bg-[#FAFCFF] border border-blue-200/70 shadow-xs">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3 border-b border-slate-200/60 pb-2">
          <span>INSPECTING: {activeSystem.name.toUpperCase()}</span>
          <span className="text-[#0E5CEE] font-semibold">ZERO LAG</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              UPSTREAM DEPENDENCIES (SOURCES):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeSystem.upstream.map((u) => (
                <span key={u} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium text-slate-700">
                  {u}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#0E5CEE] uppercase tracking-wider block mb-1.5">
              DOWNSTREAM PROPAGATION (SINKS):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeSystem.downstream.map((d) => (
                <span key={d} className="px-2.5 py-1 rounded-lg bg-[#EEF4FF] border border-blue-200 font-medium text-[#0E5CEE]">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono">MESSAGE LOSS RATE: 0.000%</span>
        <span className="text-[#0E5CEE] font-semibold">SYNCHRONIZED</span>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#1463FF] opacity-[0.06] blur-2xl pointer-events-none" />
    </div>
  );
}
