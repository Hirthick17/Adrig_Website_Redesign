"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps homepage sections with subtle scroll-linked parallax.
 * 
 * As sections enter viewport:
 * - Slightly below (↑ ~70px)
 * - Dimmed (~0.55 opacity)
 * 
 * At center:
 * - Normal position
 * - Full opacity
 * - Full scale
 * 
 * As sections leave:
 * - Slightly upward (↓ ~55px)
 * - Dimmed (~0.55 opacity)
 * - Slight scale reduction
 * 
 * Motion is subtle to avoid visual noise.
 */
export function FlowSection({
  children,
  className = "",
  reduceMotion = false,
}: {
  children: React.ReactNode;
  className?: string;
  reduceMotion?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -55]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0.55, 1, 1, 0.55]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.99]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ y, opacity, scale }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
