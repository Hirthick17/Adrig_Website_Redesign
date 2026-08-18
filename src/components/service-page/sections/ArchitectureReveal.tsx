"use client";

import React, {
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { AnimatedBeam } from "@/components/ui/animated-beam";

import type {
  ArchitectureNode,
  ServiceKey,
} from "@/content/services";

export function ArchitectureReveal({
  architecture,
}: {
  architecture: {
    title: string;
    nodes: ArchitectureNode[];
  };
  serviceKey?: ServiceKey;
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [paused, setPaused] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const nodeRefs = useMemo(
    () =>
      architecture.nodes.map(() =>
        createRef<HTMLDivElement>()
      ),
    [architecture.nodes.length]
  );

  const activeNode =
    architecture.nodes[activeIndex];

  useEffect(() => {
    if (
      paused ||
      architecture.nodes.length <= 1
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setActiveIndex((current) => {
          return (
            (current + 1) %
            architecture.nodes.length
          );
        });
      }, 4200);

    return () =>
      window.clearInterval(timer);
  }, [
    paused,
    architecture.nodes.length,
  ]);

  if (!activeNode) return null;

  return (
    <section
      id="architecture"
      className="relative overflow-hidden border-b border-slate-200/70 bg-white py-20 sm:py-28"
    >
      <Grid />

      <div className="shell relative z-10 mx-auto max-w-7xl">
        {/* INTRO */}

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
            amount: 0.3,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-14 max-w-[900px]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1463FF]">
            System architecture
          </p>

          <h2 className="mt-5 text-[clamp(3rem,5vw,5.7rem)] font-normal leading-[0.94] tracking-[-0.06em] text-slate-950">
            {architecture.title}
          </h2>

          <p className="mt-6 max-w-[700px] text-base leading-8 text-slate-600 sm:text-lg">
            Follow one continuous production
            path from the first system event to
            the final verified output.
          </p>
        </motion.div>

        {/* MAIN SYSTEM */}

        <motion.div
          initial={{
            opacity: 0,
            y: 36,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseEnter={() =>
            setPaused(true)
          }
          onMouseLeave={() =>
            setPaused(false)
          }
          className="overflow-hidden rounded-[32px] border border-slate-200 bg-[#FAFCFF] shadow-[0_28px_90px_rgba(15,23,42,0.045)]"
        >
          {/* SYSTEM CANVAS */}

          <div
            ref={containerRef}
            className="relative min-h-[330px] overflow-hidden border-b border-slate-200 px-6 py-12 sm:px-10 lg:px-12"
          >
            <div className="absolute left-6 top-6 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:left-10">
              Production pipeline
            </div>

            <div className="relative z-20 flex min-w-[760px] items-center justify-between gap-7 pt-10">
              {architecture.nodes.map(
                (node, index) => {
                  const active =
                    index === activeIndex;

                  const passed =
                    index < activeIndex;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() =>
                        setActiveIndex(index)
                      }
                      className="group flex flex-1 flex-col items-center"
                    >
                      <motion.div
                        ref={
                          nodeRefs[index]
                        }
                        animate={{
                          y: active
                            ? -5
                            : 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        className={`relative z-20 flex min-h-[125px] w-full max-w-[180px] flex-col items-center justify-center rounded-[26px] border px-5 text-center transition-colors duration-300 ${
                          active
                            ? "border-[#1463FF] bg-white shadow-[0_18px_50px_rgba(20,99,255,0.12)]"
                            : passed
                              ? "border-blue-200 bg-white"
                              : "border-slate-200 bg-white"
                        }`}
                      >
                        <span
                          className={`font-mono text-[24px] ${
                            active ||
                            passed
                              ? "text-[#1463FF]"
                              : "text-slate-400"
                          }`}
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span
                          className={`mt-3 text-[18px] font-Italic leading-tight tracking-[-0.01em] ${
                            active
                              ? "text-slate-950"
                              : passed
                                ? "text-slate-700"
                                : "text-slate-400"
                          }`}
                        >
                          {node.label}
                        </span>

                        {active && (
                          <motion.span
                            layoutId="active-pipeline-dot"
                            className="absolute -bottom-1.5 h-3 w-3 rounded-full border-[3px] border-white bg-[#1463FF]"
                          />
                        )}
                      </motion.div>

                      <span
                        className={`mt-5 font-Italic uppercase text-[12px] ${
                          active
                            ? "text-[#1463FF]"
                            : "text-slate-300"
                        }`}
                      >
                        {node.id.replace(
                          /_/g,
                          " "
                        )}
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            {/* OPEN SOURCE BEAMS */}

            {architecture.nodes
              .slice(0, -1)
              .map((_, index) => (
                <AnimatedBeam
                  key={`beam-${index}`}
                  containerRef={
                    containerRef
                  }
                  fromRef={
                    nodeRefs[index]
                  }
                  toRef={
                    nodeRefs[
                      index + 1
                    ]
                  }
                  duration={
                    3.6 +
                    index * 0.25
                  }
                  delay={
                    index * 0.18
                  }
                  pathColor="#CBD5E1"
                  pathOpacity={0.55}
                  pathWidth={1.4}
                  gradientStartColor={
                    index <
                    activeIndex
                      ? "#1463FF"
                      : "#94A3B8"
                  }
                  gradientStopColor={
                    index <
                    activeIndex
                      ? "#75A8FF"
                      : "#CBD5E1"
                  }
                />
              ))}
          </div>

          {/* ACTIVE DETAIL */}

          <div className="relative min-h-[260px] bg-white px-7 py-8 sm:px-10 sm:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.4,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr]"
              >
                {/* INDEX */}

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#1463FF]">
                    Stage{" "}
                    {String(
                      activeIndex + 1
                    ).padStart(2, "0")}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-3xl">
                    {activeNode.label}
                  </h3>
                </div>

                {/* RESPONSIBILITY */}

                <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                      Responsibility
                    </p>

                    <p className="mt-3 max-w-[620px] text-lg leading-8 tracking-[-0.025em] text-slate-700 sm:text-xl">
                      {
                        activeNode.description
                      }
                    </p>
                  </div>

                  <div className="min-w-[150px] border-l border-slate-200 pl-6">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />

                      <span className="font-mono text-[8px] uppercase tracking-[0.15em]">
                        Active stage
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                      {activeIndex + 1} of{" "}
                      {
                        architecture.nodes
                          .length
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* MANUAL NAVIGATION */}

            <div className="mt-9 flex gap-2">
              {architecture.nodes.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show architecture stage ${
                      index + 1
                    }`}
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index ===
                      activeIndex
                        ? "w-12 bg-[#1463FF]"
                        : "w-5 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Grid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.03)_1px,transparent_1px)] [background-size:48px_48px]"
    />
  );
}

export default ArchitectureReveal;