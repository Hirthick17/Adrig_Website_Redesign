"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import type { HeroState } from "./hero-story";

const STAGES = [
  { number: "01", label: "Healthcare", sub: "Primary operational signal" },
  { number: "02", label: "Connected Network", sub: "Seven industries, one system" },
];

export default function HeroStageInformation({ stateRef }: { stateRef: MutableRefObject<HeroState> }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    function frame() {
      const s = stateRef.current;
      const opacities = [s.stageHealthcareOpacity, s.stageNetworkOpacity];
      refs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = String(opacities[i]);
        el.style.visibility = opacities[i] > 0.02 ? "visible" : "hidden";
      });
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [stateRef]);

  return (
    <>
      {STAGES.map((stage, i) => (
        <div
          key={stage.number}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="hero-stage-info"
          style={{ opacity: 0 }}
        >
          <p className="hero-stage-info__number">{stage.number}</p>
          <p className="hero-stage-info__label">{stage.label}</p>
          <p className="hero-stage-info__sub">{stage.sub}</p>
        </div>
      ))}
    </>
  );
}
