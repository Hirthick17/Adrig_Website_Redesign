import React from "react";

export function SceneFallback() {
  return (
    <div className="absolute inset-0 rounded-3xl bg-[#F3F7FF] border border-blue-100 flex items-center justify-center animate-pulse">
      <div className="flex items-center gap-2 text-xs font-mono text-[#0E5CEE]">
        <span className="w-2 h-2 rounded-full bg-[#0E5CEE] animate-ping" />
        LOADING SCENE TELEMETRY...
      </div>
    </div>
  );
}

export default SceneFallback;
