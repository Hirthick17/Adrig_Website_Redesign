"use client";

import React from "react";
import { HomeFlowBackground } from "./HomeFlowBackground";

/**
 * Wraps all homepage sections after Hero in a shared persistent background environment.
 * 
 * Architecture:
 * - Sticky background layer (1 viewport tall)
 * - Normal-flow content scrolling over it
 * - No content is fixed or pinned
 * - Background remains continuous throughout
 */
export function HomeFlowEnvironment({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      {/* 
        Sticky background layer — stays pinned at top while content scrolls over it.
        One viewport tall so it doesn't extend unnecessarily.
      */}
      <div
        className="
          sticky
          top-0
          z-0
          h-screen
          w-full
          overflow-hidden
          pointer-events-none
        "
      >
        <HomeFlowBackground />
      </div>

      {/* 
        Main content container — normal document flow.
        Uses negative margin to overlap the sticky background.
        Content remains interactive and scrollable.
      */}
      <main
        className="
          relative
          z-10
          -mt-[100vh]
          w-full
          bg-transparent
        "
      >
        {children}
      </main>
    </div>
  );
}
