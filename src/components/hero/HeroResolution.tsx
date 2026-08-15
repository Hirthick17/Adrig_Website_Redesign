"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_COPY } from "@/lib/site-data";
import { smoothRange, lerp } from "./hero-story";

function WordStagger({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-hidden>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.24em" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.66, delay: delay + i * 0.065, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Reuses same approved copy as HeroIntro — rendered as h2, never a second h1. */
export default function HeroResolution({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let raf = 0;
    function loop() {
      const el = rootRef.current;
      if (el) {
        const p = progressRef.current;
        const reveal = smoothRange(p, 0.875, 0.94);

        // Trigger word animation once
        if (reveal > 0.15 && !hasAnimated.current) {
          hasAnimated.current = true;
          el.dataset.revealed = "1";
        }

        el.style.opacity = String(reveal);
        el.style.transform = `translateY(${lerp(34, 0, reveal)}px)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div ref={rootRef} className="hero-resolution" style={{ opacity: 0 }}>
      {/* Accent bar */}
      <motion.div
        className="hero-resolution__bar"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />

      <p className="hero-resolution__eyebrow">{HERO_COPY.eyebrow}</p>

      <h2 aria-label={`${HERO_COPY.headline} ${HERO_COPY.headlineAccent}`}>
        <WordStagger text={HERO_COPY.headline} delay={0.12} />
        <span className="hero-headline-accent" style={{ display: "inline-block" }}>
          <WordStagger text={HERO_COPY.headlineAccent} delay={0.12 + HERO_COPY.headline.split(" ").length * 0.065} />
        </span>
      </h2>

      <p>{HERO_COPY.description}</p>

      <div className="hero-actions">
        <Link href={HERO_COPY.primaryCta.href} className="hero-cta-primary">
          {HERO_COPY.primaryCta.label}
        </Link>
        <Link href={HERO_COPY.secondaryCta.href} className="hero-cta-secondary">
          {HERO_COPY.secondaryCta.label}
        </Link>
      </div>
    </div>
  );
}
