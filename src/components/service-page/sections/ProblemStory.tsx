"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";

import type { ProblemStep } from "@/content/services";

const FALLBACK_IMAGES = [
  "/services/Ai_consultation.png",
  "/services/Ai_Automation.png",
  "/services/SoftwareDevelopment.png",
];

function ResponsiveImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  if (src.startsWith("http")) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 1100px"
      className="object-contain"
    />
  );
}

export function ProblemStory({
  title,
  description,
  steps,
  problemImages,
}: {
  title: string;
  description: string;
  steps: ProblemStep[];
  serviceKey?: string;
  problemImages?: string[];
}) {
  const storyRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const images =
    problemImages && problemImages.length
      ? problemImages
      : FALLBACK_IMAGES;

  const activeImage =
    images[activeIndex % images.length] ??
    FALLBACK_IMAGES[0];

  const activeStep =
    steps[activeIndex] ?? steps[0];

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 90,
      damping: 24,
      mass: 0.35,
    }
  );

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (progress) => {
      if (!steps.length) return;

      const rawIndex = Math.floor(
        progress * steps.length
      );

      const nextIndex = Math.max(
        0,
        Math.min(
          steps.length - 1,
          rawIndex
        )
      );

      setActiveIndex(nextIndex);
    }
  );

  if (!steps.length) return null;

  return (
    <section
      id="problem"
      className="relative border-b border-slate-200/70 bg-white"
    >
      {/* =====================================================
          INTRO
      ====================================================== */}

      <div className="shell mx-auto max-w-7xl px-6 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[940px]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#1463FF]">
            Operational friction
          </p>

          <h2 className="mt-5 max-w-[920px] text-[clamp(3rem,5.3vw,6rem)] font-normal leading-[0.93] tracking-[-0.065em] text-slate-950">
            {title}
          </h2>

          <p className="mt-7 max-w-[720px] text-base leading-8 text-slate-600 sm:text-lg">
            {description}
          </p>
        </motion.div>
      </div>

      {/* =====================================================
          DESKTOP STICKY STORY
      ====================================================== */}

      <div
        ref={storyRef}
        className="relative hidden lg:block"
        style={{
          height: `${Math.max(
            steps.length * 92,
            276
          )}vh`,
        }}
      >
        <div className="sticky top-[88px] flex h-[calc(100svh-88px)] items-center py-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="shell mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12"
          >
            <div className="mx-auto grid h-[calc(100svh-140px)] max-h-[760px] min-h-[580px] max-w-[1320px] grid-cols-1 overflow-hidden rounded-[32px] border border-[#C9D9F4] bg-white shadow-[0_30px_90px_rgba(14,92,238,0.10)] lg:grid-cols-12">
              {/* =============================================
                  LEFT CONTENT PANEL (Brand Blue + White Text)
              ============================================== */}
              <div className="relative flex flex-col justify-between bg-[#0E5CEE] p-8 text-white sm:p-10 lg:col-span-5 lg:p-12">
                {/* TOP: Problem counter pill */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      Problem {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* MIDDLE: Animated Problem Narrative */}
                <div className="my-auto py-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep.title}
                      initial={{
                        opacity: 0,
                        x: -16,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 16,
                      }}
                      transition={{
                        duration: 0.38,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="font-mono text-xs font-semibold tracking-[0.2em] text-white/70">
                        {String(activeIndex + 1).padStart(3, "0")}
                      </span>

                      <h3 className="mt-3 text-[clamp(2rem,2.8vw,3.2rem)] font-medium leading-[1.04] tracking-[-0.05em] text-white">
                        {activeStep.title}
                      </h3>

                      <p className="mt-5 text-base leading-8 text-white/85 sm:text-lg">
                        {activeStep.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* BOTTOM: Progress bar & step switcher */}
                <div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <motion.div
                      style={{
                        scaleX: smoothProgress,
                        transformOrigin: "left",
                      }}
                      className="h-full w-full bg-white"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {steps.map((step, index) => (
                      <button
                        key={`${step.title}-progress`}
                        type="button"
                        onClick={() => {
                          const root = storyRef.current;
                          if (!root) return;
                          const top = root.offsetTop;
                          const available = root.offsetHeight - window.innerHeight;
                          const ratio = steps.length <= 1 ? 0 : index / (steps.length - 1);
                          window.scrollTo({
                            top: top + available * ratio,
                            behavior: "smooth",
                          });
                        }}
                        className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                          index === activeIndex
                            ? "font-bold text-white"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            index === activeIndex ? "bg-white" : "bg-white/40"
                          }`}
                        />
                        {String(index + 1).padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* =============================================
                  RIGHT IMAGE PANEL (Full Image, No Border Box)
              ============================================== */}
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white p-4 sm:p-6 lg:col-span-7 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeIndex}-${activeImage}`}
                    initial={{
                      opacity: 0,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative z-10 flex h-full w-full items-center justify-center"
                  >
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                      <ResponsiveImage
                        src={activeImage}
                        alt={activeStep?.title ?? title}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          MOBILE
      ====================================================== */}

      <div className="shell mx-auto max-w-7xl space-y-16 px-6 pb-20 sm:px-8 lg:hidden">
        {steps.map((step, index) => {
          const image =
            images[index % images.length] ??
            FALLBACK_IMAGES[0];

          return (
            <motion.article
              key={step.title}
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#EEF3F9]">
                <ResponsiveImage
                  src={image}
                  alt={step.title}
                />
              </div>

              <div className="mt-6 grid grid-cols-[45px_1fr] gap-4">
                <span className="pt-1 font-mono text-[9px] tracking-[0.16em] text-[#1463FF]">
                  {String(
                    index + 1
                  ).padStart(3, "0")}
                </span>

                <div>
                  <h3 className="text-2xl font-medium leading-tight tracking-[-0.04em] text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default ProblemStory;