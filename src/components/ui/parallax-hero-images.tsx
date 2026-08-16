"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Variant = "edge-focus" | "grid";

interface ParallaxHeroImagesProps {
  images: string[];
  variant?: Variant;
  className?: string;
}

// Predefined stable positions for edge-focus variant — deterministic, no Math.random on render
const EDGE_POSITIONS: { top: string; left?: string; right?: string; bottom?: string; width: string; height: string; depth: number; rotate: number }[] = [
  { top: "6%",  left:  "3%",  width: "42%", height: "52%", depth: 0.08, rotate: -4 },
  { top: "4%",  right: "2%",  width: "38%", height: "48%", depth: 0.14, rotate:  3 },
  { bottom: "6%", left: "2%", width: "36%", height: "44%", depth: 0.06, rotate:  2 },
  { bottom: "4%", right: "3%",width: "40%", height: "50%", depth: 0.11, rotate: -3 },
  { top: "30%", left: "28%",  width: "44%", height: "40%", depth: 0.05, rotate:  1 },
  { top: "18%", right: "30%", width: "32%", height: "38%", depth: 0.09, rotate: -2 },
];

export function ParallaxHeroImages({
  images,
  variant = "edge-focus",
  className = "",
}: ParallaxHeroImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouse({ x, y });
    };

    const handleLeave = () => setMouse({ x: 0, y: 0 });

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const displayImages = images.slice(0, 6);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      style={{ perspective: "1200px" }}
    >
      {displayImages.map((src, i) => {
        const pos = EDGE_POSITIONS[i] || EDGE_POSITIONS[0];
        const tx = mouse.x * pos.depth * 120;
        const ty = mouse.y * pos.depth * 80;

        return (
          <motion.div
            key={i}
            animate={{ x: tx, y: ty }}
            transition={{ type: "spring", stiffness: 60, damping: 22, mass: 0.8 }}
            className="absolute overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/25 border border-white/60"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              width: pos.width,
              height: pos.height,
              rotate: `${pos.rotate}deg`,
              zIndex: 10 + i,
            }}
          >
            <Image
              src={src}
              alt={`Service visual ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
              priority={i < 2}
            />
            {/* Subtle glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/5 pointer-events-none" />
          </motion.div>
        );
      })}

      {/* Center ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-[#1463FF]/10 blur-3xl" />
      </div>
    </div>
  );
}

export default ParallaxHeroImages;
