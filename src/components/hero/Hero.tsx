"use client";

import { useEffect, useRef, useState } from "react";
import { createHeroState, smoothRange } from "./hero-story";
import HeroCanvas from "./HeroCanvas";
import HeroIntro from "./HeroIntro";
import HeroStageInformation from "./HeroStageInformation";
import PainBubbleLayer from "./PainBubbleLayer";
import HeroResolution from "./HeroResolution";
import HeroProgressIndicator from "./HeroProgressIndicator";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function calculateHeroProgress(section: HTMLElement, scrollY: number, viewportHeight: number) {
  const sectionTop = section.offsetTop;
  const scrollableDistance = section.offsetHeight - viewportHeight;
  if (scrollableDistance <= 0) return 0;
  return clamp01((scrollY - sectionTop) / scrollableDistance);
}

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const stateRef = useRef(createHeroState());
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cueRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(detectWebGL());

    const mobileQuery = matchMedia("(max-width: 767px)");
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const applyMobile = () => setIsMobile(mobileQuery.matches);
    const applyMotion = () => setReducedMotion(motionQuery.matches);
    applyMobile();
    applyMotion();
    mobileQuery.addEventListener("change", applyMobile);
    motionQuery.addEventListener("change", applyMotion);
    return () => {
      mobileQuery.removeEventListener("change", applyMobile);
      motionQuery.removeEventListener("change", applyMotion);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return; // §24 — no scroll-controlled transforms

    let target = 0;
    let current = 0;
    let lastTime = performance.now();
    let raf = 0;
    const dampingStrength = 8;

    function readScroll() {
      const section = heroRef.current;
      if (!section) return;
      target = calculateHeroProgress(section, window.scrollY, window.innerHeight);
    }

    function loop(now: number) {
      const delta = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const alpha = 1 - Math.exp(-dampingStrength * delta);
      current += (target - current) * alpha;
      progressRef.current = current;
      if (cueRef.current) cueRef.current.style.opacity = String(1 - smoothRange(current, 0.01, 0.06));
      raf = requestAnimationFrame(loop);
    }

    readScroll();
    current = target;
    progressRef.current = current;
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section ref={heroRef} id="home-hero" className="hero-story" aria-labelledby="hero-title">
      <div className="hero-sticky">
        {webglAvailable && (
          <div className="hero-canvas-layer">
            <HeroCanvas
              progressRef={progressRef}
              stateRef={stateRef}
              bubbleRefs={bubbleRefs}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          </div>
        )}
        <div className="hero-atmosphere" aria-hidden="true" />

        <HeroIntro progressRef={progressRef} />
        {!reducedMotion && <HeroStageInformation stateRef={stateRef} />}
        {!reducedMotion && <PainBubbleLayer stateRef={stateRef} bubbleRefs={bubbleRefs} />}
        <HeroResolution progressRef={progressRef} />
        {!reducedMotion && <HeroProgressIndicator progressRef={progressRef} />}

        {!reducedMotion && (
          <div ref={cueRef} className="hero-scroll-cue" aria-hidden="true">
            <div className="hero-scroll-cue__label">Scroll to connect</div>
            <div className="hero-scroll-cue__line" />
          </div>
        )}

        <div className="hero-bottom-handoff" aria-hidden="true" />
      </div>
    </section>
  );
}
