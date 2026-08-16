"use client";

import React from "react";
import { BlueprintGrid } from "./BlueprintGrid";

export function CinematicSection({
  children,
  id,
  className = "",
  hasGrid = true,
  bgClass = "bg-[#FAFCFF]",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  hasGrid?: boolean;
  bgClass?: string;
}) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-20 sm:py-28 border-b border-slate-200/60 ${bgClass} ${className}`}
    >
      {hasGrid && <BlueprintGrid />}
      <div className="shell relative z-10">{children}</div>
    </section>
  );
}

export function TechnicalLine({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full bg-[linear-gradient(to_right,transparent,var(--adrig-line),transparent)] ${className}`}
    />
  );
}
