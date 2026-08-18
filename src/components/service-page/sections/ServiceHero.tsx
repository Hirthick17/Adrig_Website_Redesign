"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import type { ServiceKey } from "@/content/services";

type HeroContent = {
  eyebrow?: string;
  title: string;
  emphasis: string;
  description: string;
  primaryCta: string;
};

const FALLBACK_IMAGES = [
  "/services/Ai_consultation.png",
  "/services/Ai_Automation.png",
  "/services/SoftwareDevelopment.png",
];

function VisualImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const isRemote = src.startsWith("http");

  if (isRemote) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 60vw"
      className={className}
    />
  );
}

export function ServiceHero({
  serviceKey,
  content,
  heroImages,
}: {
  serviceKey: ServiceKey;
  content: HeroContent;
  heroImages?: string[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const images =
    heroImages && heroImages.length
      ? heroImages
      : FALLBACK_IMAGES;

  const mainImage = images[0] ?? FALLBACK_IMAGES[0];
  const secondaryImage = images[1] ?? mainImage;
  const tertiaryImage = images[2] ?? secondaryImage;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mainY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 38]
  );

  const secondaryY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -30]
  );

  const tertiaryY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 22]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden border-b border-slate-200/70 bg-[#FAFCFF]"
    >
      <BlueprintBackground />

      <div className="pointer-events-none absolute left-[8%] top-[18%] h-[420px] w-[420px] rounded-full bg-[#1463FF]/[0.07] blur-[120px]" />

      <div className="relative z-10 mx-auto grid min-h-svh max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* =========================
            LEFT — EDITORIAL COPY
        ========================== */}

        <div className="lg:col-span-5">
          {content.eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#1463FF]" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1463FF]">
                {content.eyebrow}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[680px] text-[clamp(3.5rem,5.5vw,6.2rem)] font-normal leading-[0.93] tracking-[-0.065em] text-slate-950"
          >
            {content.title}{" "}
            <span className="text-[#1463FF]">
              {content.emphasis}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 max-w-[570px] text-base leading-8 text-slate-600 sm:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.22,
            }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex min-h-[50px] items-center gap-3 rounded-full bg-[#08142A] px-7 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1463FF]"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#problem"
              className="inline-flex min-h-[50px] items-center rounded-full border border-slate-300 bg-white/70 px-7 text-sm font-semibold text-slate-800 transition duration-300 hover:border-slate-400 hover:bg-white"
            >
              See the problem
            </a>
          </motion.div>

          {/* =========================
              SYSTEM META
          ========================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="mt-12 grid grid-cols-3 border-t border-slate-200 pt-6"
          >
            <div className="pr-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                Deployment
              </p>

              <p className="mt-2 text-xs font-medium text-slate-800 sm:text-sm">
                Private / Cloud
              </p>
            </div>

            <div className="border-x border-slate-200 px-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                Security
              </p>

              <p className="mt-2 text-xs font-medium text-slate-800 sm:text-sm">
                Enterprise Ready
              </p>
            </div>

            <div className="pl-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                Ownership
              </p>

              <p className="mt-2 text-xs font-medium text-slate-800 sm:text-sm">
                Client Owned
              </p>
            </div>
          </motion.div>
        </div>

        {/* =========================
            RIGHT — IMAGE SYSTEM
        ========================== */}

        <div className="relative lg:col-span-7">
          <div className="grid min-h-[560px] grid-cols-12 grid-rows-2 gap-4 sm:min-h-[650px]">
            {/* Main dominant visual */}

            <motion.div
              style={{ y: mainY }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative col-span-8 row-span-2 overflow-hidden rounded-[28px] border border-slate-200 bg-white"
            >
              <VisualImage
                src={mainImage}
                alt={`${content.eyebrow ?? serviceKey} main visual`}
                priority
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" />
            </motion.div>

            {/* Supporting visual 1 */}

            <motion.div
              style={{ y: secondaryY }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.2,
              }}
              className="relative col-span-4 overflow-hidden rounded-[24px] border border-slate-200 bg-white"
            >
              <VisualImage
                src={secondaryImage}
                alt={`${content.eyebrow ?? serviceKey} supporting visual`}
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Supporting visual 2 */}

            <motion.div
              style={{ y: tertiaryY }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.27,
              }}
              className="relative col-span-4 overflow-hidden rounded-[24px] border border-slate-200 bg-[#F4F7FB]"
            >
              <VisualImage
                src={tertiaryImage}
                alt={`${content.eyebrow ?? serviceKey} secondary supporting visual`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>

          <div className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-[250px] w-[250px] rounded-full bg-[#1463FF]/10 blur-[80px]" />
        </div>
      </div>
    </section>
  );
}

function BlueprintBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
    />
  );
}

export default ServiceHero;