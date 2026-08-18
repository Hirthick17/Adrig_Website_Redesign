"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroGeometricShaderBackground } from "@/components/ui/hero-geometric";

/**
 * Shared persistent background for all homepage sections after Hero.
 * Features:
 * - Single WebGL canvas (HeroGeometricShaderBackground)
 * - Soft radial glows
 * - Blueprint grid overlay
 * - Subtle parallax movement tied to page scroll
 */
export function HomeFlowBackground() {
  const { scrollYProgress } = useScroll();

  // Background moves much slower than foreground (5-12% of scroll speed)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const gridOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.3, 0.5, 0.3]
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* WebGL shader background — moves very slowly */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <HeroGeometricShaderBackground
          color1="#93C5FD"
          color2="#FFFFFF"
          speed={0.5}
          className="opacity-60"
        />
      </motion.div>

      {/* Top-left radial glow — subtle parallax */}
      <div
        className="
          absolute
          top-[18%]
          left-1/2
          -translate-x-1/2
          w-[850px]
          h-[450px]
          rounded-full
          bg-blue-300/15
          blur-[130px]
          pointer-events-none
        "
      />

      {/* Bottom-right radial glow — subtle parallax */}
      <motion.div
        style={{ x: glowX }}
        className="
          absolute
          bottom-[8%]
          right-[3%]
          w-[500px]
          h-[300px]
          rounded-full
          bg-blue-200/20
          blur-[110px]
          pointer-events-none
        "
      />

      {/* Blueprint grid overlay — centered with radial mask */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,rgba(14,92,238,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.04)_1px,transparent_1px)]
          bg-[size:48px_48px]
          [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,#000_58%,transparent_100%)]
          pointer-events-none
        "
      />

      {/* Smooth gradient transition at top (optional, for Hero → Strengths) */}
      <div
        className="
          absolute
          top-0
          inset-x-0
          h-32
          bg-gradient-to-b
          from-white/20
          to-transparent
          pointer-events-none
        "
      />
    </div>
  );
}
