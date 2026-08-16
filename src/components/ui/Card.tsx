"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Card({
  href,
  eyebrow,
  title,
  description,
  index,
  delay = 0,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
  index?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.15, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={href}
        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-7 shadow-lg shadow-blue-950/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-900/[0.08]"
      >
        {/* index */}
        {index && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#1463FF]">
            <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
            {index}
          </span>
        )}

        {/* Title */}
        <h3 className="text-[18px] font-normal leading-snug tracking-tight text-slate-900 group-hover:text-[#0E5CEE] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="flex-1 text-[14px] leading-[1.6] text-slate-600 font-normal">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-2 flex items-center gap-2 border-t border-slate-100 pt-4">
          <span className="text-[13px] font-semibold text-slate-800 group-hover:text-[#0E5CEE] transition-colors duration-300">
            Learn more
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#0E5CEE] transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Corner blue glow on hover */}
        <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-[#1463FF] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.08] pointer-events-none" />
      </Link>
    </motion.div>
  );
}
