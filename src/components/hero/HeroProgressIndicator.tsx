"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";

export default function HeroProgressIndicator({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    function frame() {
      const p = progressRef.current;
      if (fillRef.current) fillRef.current.style.height = `${(p * 100).toFixed(1)}%`;
      if (railRef.current) railRef.current.style.opacity = p > 0.02 && p < 0.98 ? "1" : "0";
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div ref={railRef} className="hero-progress-rail" style={{ opacity: 0, transition: "opacity 0.4s ease" }} aria-hidden="true">
      <div ref={fillRef} className="hero-progress-rail__fill" style={{ height: "0%" }} />
    </div>
  );
}
