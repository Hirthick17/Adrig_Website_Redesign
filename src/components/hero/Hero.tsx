"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Cinema, arcPoint } from "./cinema-engine";
import { HERO_COPY, HERO_STORY_BEATS, HERO_PROBLEM_BUBBLES } from "@/lib/site-data";

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}
function range(t: number, a: number, b: number) {
  return clamp((t - a) / (b - a), 0, 1);
}
function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Total autoplay length — tune here if the assembly should feel faster/slower. */
const DURATION_MS = 15000;
const CHAPTERS = [
  { label: "Awakening", p: 0.03 },
  { label: "Formation", p: 0.22 },
  { label: "The Core", p: 0.46 },
  { label: "Transformation", p: 0.64 },
  { label: "Ecosystem", p: 0.9 },
];

/** One staggered window per district — the problem bubble is born large at
    the building, HOLDS there fully readable for ~1.5s, then travels the same
    route the data-flow line draws and shrinks into the tower. */
const BUBBLE_START = 0.5;
const BUBBLE_STAGGER = 0.048;
const BUBBLE_DURATION = 0.16; // ≈2.4s of the 15s timeline
const BUBBLE_ENTER_END = 0.08; // fraction of BUBBLE_DURATION spent fading/scaling in
const BUBBLE_HOLD_END = 0.7; // fraction where the hold ends and travel begins (~1.5s hold)

function easeInOutCubic(x: number) {
  const v = clamp(x, 0, 1);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
}
function smoothstep(x: number) {
  const v = clamp(x, 0, 1);
  return v * v * (3 - 2 * v);
}

/**
 * The hero — an authored software-3D "Industry City" (see cinema-engine.ts,
 * ported as-is from the approved hero.html) that assembles itself
 * automatically on load, like a trailer, rather than being scroll-scrubbed.
 */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cinemaRef = useRef<Cinema | null>(null);

  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagCoreRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const railBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const finalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bubbleTextRefs = useRef<(HTMLDivElement | null)[]>([]);

  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  function applyOverlay(t: number) {
    HERO_STORY_BEATS.forEach((b, i) => {
      const el = beatRefs.current[i];
      if (!el) return;
      const inn = ease(range(t, b.in[0], b.in[1]));
      const out = ease(range(t, b.out[0], b.out[1]));
      const live = inn * (1 - out);
      if (live <= 0.002) {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        return;
      }
      el.style.visibility = "visible";
      const span = clamp((t - b.in[0]) / (b.out[1] - b.in[0]), 0, 1);
      const y = (1 - inn) * 54 - span * 40 + out * -30;
      const scale = 0.94 + inn * 0.06 + out * 0.1;
      const blur = (1 - inn) * 9 + out * 13;
      el.style.opacity = String(live);
      el.style.filter = `blur(${blur.toFixed(2)}px)`;
      el.style.transform = `translateY(calc(-50% + ${y.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
    });

    const cinema = cinemaRef.current;
    if (tagCoreRef.current && cinema) {
      const el = tagCoreRef.current;
      const L = cinema.labels.core;
      const lin = ease(range(t, 0.4, 0.48));
      const lout = ease(range(t, 0.52, 0.6));
      const lv = lin * (1 - lout);
      if (L && L.vis && lv > 0.002) {
        el.style.opacity = String(lv);
        el.style.transform = `translate(-50%,-50%) translate(${L.x.toFixed(1)}px,${L.y.toFixed(1)}px) scale(${(0.9 + lv * 0.1).toFixed(3)})`;
        el.style.filter = `blur(${((1 - lin) * 7 + lout * 10).toFixed(2)}px)`;
      } else {
        el.style.opacity = "0";
      }
    }

    const f0 = 0.84;
    finalRefs.current.forEach((el, k) => {
      if (!el) return;
      const fv = ease(range(t, f0 + k * 0.035, f0 + 0.1 + k * 0.035));
      el.style.opacity = String(fv);
      el.style.transform = `translateY(${((1 - fv) * 26).toFixed(1)}px)`;
    });

    if (railRef.current) railRef.current.style.opacity = t >= 0.04 && t < 0.98 ? "1" : "0";

    if (cinema) {
      HERO_PROBLEM_BUBBLES.forEach((_, i) => {
        const el = bubbleRefs.current[i];
        if (!el) return;
        const start = BUBBLE_START + i * BUBBLE_STAGGER;
        const end = start + BUBBLE_DURATION;
        const u = range(t, start, end);
        const active = t >= start - 0.01 && t <= end + 0.02;

        if (!active) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          return;
        }

        // Three phases: fade/scale in at the district, HOLD there fully
        // readable, then travel the arc into the tower while shrinking.
        const travelU = range(u, BUBBLE_HOLD_END, 1);
        const posU = u <= BUBBLE_HOLD_END ? 1 : 1 - easeInOutCubic(travelU);
        const worldPos = arcPoint(i, posU);
        const projected = cinema.projectWorld(worldPos);
        if (!projected || !projected.vis) {
          el.style.opacity = "0";
          return;
        }

        const enter = smoothstep(range(u, 0, BUBBLE_ENTER_END));
        const exit = smoothstep(range(u, 0.93, 1));
        const opacity = enter * (1 - exit);
        const growScale = 0.8 + enter * 0.5; // grows up to 1.3 through enter + hold
        const scale = u <= BUBBLE_HOLD_END ? growScale : 1.3 - easeInOutCubic(travelU) * 1.0;

        el.style.opacity = String(opacity);
        el.style.pointerEvents = "none";
        el.style.transform = `translate3d(${projected.x.toFixed(1)}px, ${projected.y.toFixed(1)}px, 0) translate(-50%, -100%) translateY(-16px) scale(${scale.toFixed(3)})`;

        const textEl = bubbleTextRefs.current[i];
        if (textEl) textEl.style.opacity = String(1 - smoothstep(range(u, BUBBLE_HOLD_END, BUBBLE_HOLD_END + 0.12)));
      });
    }

    const act = t < 0.14 ? 0 : t < 0.38 ? 1 : t < 0.56 ? 2 : t < 0.8 ? 3 : 4;
    railBtnRefs.current.forEach((btn, i) => {
      if (btn) btn.dataset.on = i === act ? "1" : "0";
    });
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cinema = new Cinema(canvasRef.current);
    cinemaRef.current = cinema;

    if (reduce) {
      cinema.render(1);
      applyOverlay(1);
      return () => cinema.destroy();
    }

    function frame(now: number) {
      if (startRef.current === null) startRef.current = now;
      const elapsedMs = now - (startRef.current as number);
      const t = clamp(elapsedMs / DURATION_MS, 0, 1);

      // Independent of the story timeline: a slow, continuous dolly toward
      // the tower at 0.2% of the remaining distance per second, so the shot
      // keeps quietly tightening even after the city has finished forming.
      // Capped well short of 1 so it never pushes the camera through the tower.
      const extraZoom = clamp((elapsedMs / 1000) * 0.002, 0, 0.35);

      cinema.render(t, extraZoom);
      applyOverlay(t);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      cinema.destroy();
    };
  }, []);

  useEffect(() => {
    let isLocked = false;
    let touchStartY = 0;

    const scrollToNext = () => {
      const target = document.getElementById("why-adrig");
      if (target && !isLocked) {
        isLocked = true;
        target.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          isLocked = false;
        }, 800);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isLocked) return;
      const currentScroll = window.scrollY;
      const heroHeight = window.innerHeight;

      // Single scroll down gesture while in hero
      if (currentScroll < heroHeight * 0.4 && e.deltaY > 15) {
        scrollToNext();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isLocked) return;
      const currentScroll = window.scrollY;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Swiped up (user wants to scroll down to next section)
      if (currentScroll < window.innerHeight * 0.4 && deltaY > 35) {
        scrollToNext();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  function seek(p: number) {
    startRef.current = performance.now() - p * DURATION_MS;
  }

  return (
    <section className="hero-stage snap-section relative" aria-label="ADRIG — Engineering Intelligent Systems">
      <canvas ref={canvasRef} className="hero-canvas" aria-label="ADRIG intelligent business ecosystem, assembling automatically" />
      <div className="hero-scrim" aria-hidden="true" />

      <div ref={tagCoreRef} className="hero-tag3d" aria-hidden="true">
        <div className="hero-tag3d__rule" />
        <div className="hero-tag3d__t">The Intelligent Business Core</div>
        <div className="hero-tag3d__h">Understanding before engineering.</div>
      </div>

      <div className="hero-type">
        <div className="shell">
          {HERO_STORY_BEATS.map((b, i) => (
            <div
              key={b.eyebrow}
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              className="hero-tb"
            >
              <div className="hero-tb__eyebrow">{b.eyebrow}</div>
              <h2>
                {b.heading}
                <b>{b.accent}</b>
              </h2>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {HERO_PROBLEM_BUBBLES.map((b, i) => (
        <div
          key={b.label}
          ref={(el) => {
            bubbleRefs.current[i] = el;
          }}
          className="hero-bubble"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <span className="hero-bubble__label">{b.label}</span>
          <div
            className="hero-bubble__text"
            ref={(el) => {
              bubbleTextRefs.current[i] = el;
            }}
          >
            {b.text}
          </div>
        </div>
      ))}

      <div className="hero-final">
        <div className="shell">
          <div className="hero-final__in">
            <h1
              ref={(el) => {
                finalRefs.current[0] = el;
              }}
              style={{ opacity: 0 }}
            >
              {HERO_COPY.headline} <b>{HERO_COPY.headlineAccent}</b>
              <br />
              {HERO_COPY.headlineLine2}
            </h1>
            <p
              className="hero-final__sub"
              ref={(el) => {
                finalRefs.current[1] = el;
              }}
              style={{ opacity: 0 }}
            >
              {HERO_COPY.description}
            </p>
            <div
              className="hero-final__cta"
              ref={(el) => {
                finalRefs.current[2] = el;
              }}
              style={{ opacity: 0 }}
            >
              <Link className="hero-btn hero-btn--primary" href={HERO_COPY.primaryCta.href}>
                {HERO_COPY.primaryCta.label}
              </Link>
              <Link className="hero-btn hero-btn--secondary" href={HERO_COPY.secondaryCta.href}>
                {HERO_COPY.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="hero-rail" ref={railRef} aria-label="Story chapters" style={{ opacity: 0 }}>
        {CHAPTERS.map((c, i) => (
          <button
            key={c.label}
            type="button"
            data-on={i === 0 ? "1" : "0"}
            onClick={() => seek(c.p)}
            ref={(el) => {
              railBtnRefs.current[i] = el;
            }}
          >
            <span>{c.label}</span>
            <i />
          </button>
        ))}
      </nav>

      {/* Floating single-click / visual cue scroll down button */}
      <button
        type="button"
        onClick={() => {
          document.getElementById("why-adrig")?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll down to Why ADRIG"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-slate-500 hover:text-[#0E5CEE] transition-all cursor-pointer group"
      >
        <span className="opacity-75 group-hover:opacity-100 transition-opacity">Scroll Down</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce text-[#0E5CEE]"
        >
          <path d="M7 13l5 5 5-5" />
          <path d="M7 6l5 5 5-5" />
        </svg>
      </button>
    </section>
  );
}
