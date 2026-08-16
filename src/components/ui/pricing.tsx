"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "text-xs font-mono uppercase tracking-widest text-[#0E5CEE] font-bold mb-3 flex items-center gap-2",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#0E5CEE] animate-pulse" />
      {children}
    </h4>
  );
}

export function Price({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 leading-tight mb-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Paragraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm text-slate-600 font-normal leading-relaxed mb-6",
        className
      )}
    >
      {children}
    </p>
  );
}

export function PricingWrapper({
  children,
  contactHref = "/contact",
  type = "crosses",
  className,
}: {
  children: React.ReactNode;
  contactHref?: string;
  type?: "crosses" | "dots" | "grid";
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(20, 99, 255, 0.12), transparent 75%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group flex flex-col justify-between p-7 sm:p-8 rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl shadow-blue-950/[0.04] hover:shadow-2xl hover:shadow-blue-950/[0.1] hover:border-blue-400/80 transition-all duration-500 overflow-hidden backdrop-blur-xl cursor-default",
        className
      )}
    >
      {/* Interactive Cursor Spotlight Motion */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: spotlightBg,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Animated Crosses Grid Background Motion */}
      {type === "crosses" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-500 bg-[radial-gradient(#0E5CEE_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
        />
      )}

      {/* Floating Animated Crosshair Marks */}
      <motion.div
        animate={{ rotate: isHovered ? 90 : 0, scale: isHovered ? 1.25 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute top-3.5 left-3.5 text-[11px] font-mono text-slate-400 group-hover:text-[#0E5CEE] pointer-events-none select-none font-bold transition-colors"
      >
        +
      </motion.div>
      <motion.div
        animate={{ rotate: isHovered ? -90 : 0, scale: isHovered ? 1.25 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute top-3.5 right-3.5 text-[11px] font-mono text-slate-400 group-hover:text-[#0E5CEE] pointer-events-none select-none font-bold transition-colors"
      >
        +
      </motion.div>
      <motion.div
        animate={{ rotate: isHovered ? -90 : 0, scale: isHovered ? 1.25 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute bottom-3.5 left-3.5 text-[11px] font-mono text-slate-400 group-hover:text-[#0E5CEE] pointer-events-none select-none font-bold transition-colors"
      >
        +
      </motion.div>
      <motion.div
        animate={{ rotate: isHovered ? 90 : 0, scale: isHovered ? 1.25 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute bottom-3.5 right-3.5 text-[11px] font-mono text-slate-400 group-hover:text-[#0E5CEE] pointer-events-none select-none font-bold transition-colors"
      >
        +
      </motion.div>

      {/* Card Content */}
      <div className="relative z-10 flex-1">{children}</div>

      {contactHref && (
        <div className="relative z-10 mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={contactHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 group-hover:text-[#0E5CEE] transition-colors"
          >
            <span>Explore solutions</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0E5CEE]" />
          </Link>
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            ENTERPRISE
          </span>
        </div>
      )}

      {/* Top subtle moving beam glow on hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#1463FF]/0 group-hover:via-[#1463FF]/80 to-transparent transition-all duration-700 pointer-events-none" />
    </div>
  );
}

export default PricingWrapper;
