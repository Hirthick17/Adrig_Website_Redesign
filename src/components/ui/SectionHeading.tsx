"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  const base = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <div ref={ref} className={base}>

      {/* Heading — font-normal, tracking-tight, slate-950 */}
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(1.8rem,3.2vw,2.75rem)] font-normal leading-[1.08] tracking-tight text-slate-950"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-[15.5px] leading-[1.65] text-slate-600 font-normal"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
