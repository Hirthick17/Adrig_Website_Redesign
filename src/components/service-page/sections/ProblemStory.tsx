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
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 1100px"
      className="object-cover"
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
            <div className="mx-auto h-[calc(100svh-150px)] max-h-[790px] min-h-[620px] max-w-[1120px] overflow-hidden rounded-[32px] border border-slate-200 bg-[#FAFCFF] shadow-[0_30px_90px_rgba(15,23,42,0.06)]">
              {/* =============================================
                  TOP IMAGE
              ============================================== */}

              <div className="relative h-[65%] overflow-hidden bg-[#EEF3F9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeIndex}-${activeImage}`}
                    initial={{
                      opacity: 0,
                      scale: 1.025,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.985,
                    }}
                    transition={{
                      duration: 0.48,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="absolute inset-0"
                  >
                    <ResponsiveImage
                      src={activeImage}
                      alt={
                        activeStep?.title ??
                        title
                      }
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/10" />
                  </motion.div>
                </AnimatePresence>

                {/* INDEX */}

                <div className="absolute left-6 top-6 z-20 rounded-full border border-white/70 bg-white/80 px-4 py-2 backdrop-blur-md">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                    Problem{" "}
                    {String(
                      activeIndex + 1
                    ).padStart(2, "0")}
                    {" / "}
                    {String(
                      steps.length
                    ).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* =============================================
                  BOTTOM CONTENT LAYER
              ============================================== */}

              <div className="relative flex h-[35%] flex-col justify-between bg-white px-8 py-7 sm:px-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.title}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.38,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="grid grid-cols-[70px_1fr] gap-5"
                  >
                    <span className="pt-1 font-mono text-[10px] tracking-[0.18em] text-[#1463FF]">
                      {String(
                        activeIndex + 1
                      ).padStart(3, "0")}
                    </span>

                    <div>
                      <h3 className="max-w-[720px] text-[clamp(1.9rem,3vw,3.1rem)] font-medium leading-[1] tracking-[-0.05em] text-slate-950">
                        {activeStep.title}
                      </h3>

                      <p className="mt-4 max-w-[720px] text-sm leading-7 text-slate-600 sm:text-base">
                        {
                          activeStep.description
                        }
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* PROGRESS */}

                <div className="mt-6">
                  <div className="h-px w-full overflow-hidden bg-slate-200">
                    <motion.div
                      style={{
                        scaleX:
                          smoothProgress,
                        transformOrigin:
                          "left",
                      }}
                      className="h-full w-full bg-[#1463FF]"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {steps.map(
                      (step, index) => (
                        <button
                          key={`${step.title}-progress`}
                          type="button"
                          onClick={() => {
                            const root =
                              storyRef.current;

                            if (!root)
                              return;

                            const top =
                              root.offsetTop;

                            const available =
                              root.offsetHeight -
                              window.innerHeight;

                            const ratio =
                              steps.length <=
                              1
                                ? 0
                                : index /
                                  steps.length;

                            window.scrollTo({
                              top:
                                top +
                                available *
                                  ratio,
                              behavior:
                                "smooth",
                            });
                          }}
                          className={`font-mono text-[9px] uppercase tracking-[0.13em] transition-colors duration-300 ${
                            index ===
                            activeIndex
                              ? "text-[#1463FF]"
                              : "text-slate-300"
                          }`}
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </button>
                      )
                    )}
                  </div>
                </div>
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