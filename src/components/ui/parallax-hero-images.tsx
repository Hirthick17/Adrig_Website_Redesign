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

// Six-panel collage tuned to mimic a meme/reference storyboard: one central focus,
// with supporting frames pinned to the edges so the system feels alive without losing legibility.
const EDGE_POSITIONS: { top?: string; left?: string; right?: string; bottom?: string; width: string; height: string; depth: number; rotate: number }[] = [
  { top: "8%", left: "2%", width: "30%", height: "34%", depth: 0.08, rotate: -5 },
  { top: "10%", right: "3%", width: "28%", height: "38%", depth: 0.12, rotate: 5 },
  { top: "26%", left: "24%", width: "52%", height: "44%", depth: 0.16, rotate: 1 },
  { bottom: "8%", left: "5%", width: "36%", height: "32%", depth: 0.07, rotate: 3 },
  { bottom: "10%", right: "7%", width: "34%", height: "30%", depth: 0.1, rotate: -4 },
  { top: "18%", right: "30%", width: "24%", height: "26%", depth: 0.09, rotate: -2 },
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
        const isCenter = i === 2;

        return (
          <motion.div
            key={i}
            animate={{ x: tx, y: ty }}
            transition={{ type: "spring", stiffness: 60, damping: 22, mass: 0.8 }}
            className={`absolute overflow-hidden border border-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.18)] ${isCenter ? "rounded-[30px]" : "rounded-[22px]"}`}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              width: pos.width,
              height: pos.height,
              rotate: `${pos.rotate}deg`,
              zIndex: 10 + i,
              background: isCenter ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.08)",
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-white/10 pointer-events-none" />
            {isCenter && (
              <div className="absolute inset-x-5 bottom-5 h-12 rounded-full border border-white/60 bg-white/20 backdrop-blur-[2px]" />
            )}
          </motion.div>
        );
      })}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full bg-[#1463FF]/10 blur-3xl" />
      </div>
    </div>
  );
}

export default ParallaxHeroImages;
