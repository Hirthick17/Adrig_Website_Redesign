"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_COPY } from "@/lib/site-data";
import { smoothRange, lerp } from "./hero-story";

/** Split a string into word-level motion.span elements with staggered reveal */
function WordStagger({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.72,
            delay: delay + i * 0.072,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.26em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/** The approved hero headline — server-visible immediately (SEO/LCP), fades as story begins. */
export default function HeroIntro({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    function loop() {
      const el = rootRef.current;
      if (el) {
        const p = progressRef.current;
        const exit = smoothRange(p, 0.065, 0.135);
        el.style.opacity = String(1 - exit);
        el.style.transform = `translateY(${lerp(0, -28, exit)}px) scale(${lerp(1, 0.965, exit)})`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div ref={rootRef} className="hero-intro" style={{ willChange: "transform, opacity", transformOrigin: "left center" }}>
      {/* Eyebrow */}
      <motion.p
        className="hero-eyebrow"
        initial={{ opacity: 0, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, letterSpacing: "0.18em" }}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {HERO_COPY.eyebrow}
      </motion.p>

      {/* Headline — word by word */}
      <h1 id="hero-title">
        <WordStagger text={HERO_COPY.headline} delay={0.28} />
        <WordStagger text={HERO_COPY.headlineAccent} className="hero-headline-accent" delay={0.28 + HERO_COPY.headline.split(" ").length * 0.072} />
      </h1>

      {/* Description */}
      <motion.p
        className="hero-description"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {HERO_COPY.description}
      </motion.p>

      {/* CTAs */}
      <div className="hero-actions">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={HERO_COPY.primaryCta.href} className="hero-cta-primary">
            {HERO_COPY.primaryCta.label}
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={HERO_COPY.secondaryCta.href} className="hero-cta-secondary">
            {HERO_COPY.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
