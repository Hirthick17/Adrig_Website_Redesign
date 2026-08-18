"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import {
  Boxes,
  Braces,
  Check,
  ChevronDown,
  CloudCog,
  Database,
  Gauge,
  GitBranch,
  Network,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type StageVisual =
  | "discover"
  | "architect"
  | "build"
  | "deploy";

export type ProcessStage = {
  number: string;
  label: string;
  title: string;
  description: string;
  result: string;
  duration: string;
  outputs: string[];
  visual: StageVisual;
  icon: LucideIcon;

  /*
   * Kept for backward compatibility.
   * This redesign does not require stage images.
   */
  image?: {
    src: string;
    alt: string;
  };
};

type AdrigProcessSectionProps = {
  stages?: ProcessStage[];
  className?: string;
};

/* ============================================================
   PROCESS CONTENT
============================================================ */

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    label: "Discover",
    title: "Map the operation before shaping the system.",
    description:
      "We trace decisions, data, handoffs, and failure points with the people who run the operation. The result is a shared picture of what must change—and what should stay untouched.",
    result:
      "A scoped problem with evidence, owners, and success measures.",
    duration: "1–2 weeks",
    outputs: [
      "Operational map",
      "Data inventory",
      "Decision brief",
    ],
    visual: "discover",
    icon: ScanSearch,
  },

  {
    number: "02",
    label: "Architect",
    title:
      "Turn the operating reality into a buildable system.",
    description:
      "We define boundaries, integrations, intelligence layers, observability, security, and deployment constraints before expensive implementation begins.",
    result:
      "An architecture the business and engineering teams can both verify.",
    duration: "1–2 weeks",
    outputs: [
      "System architecture",
      "Integration plan",
      "Risk register",
    ],
    visual: "architect",
    icon: Boxes,
  },

  {
    number: "03",
    label: "Build",
    title:
      "Ship working modules in short, reviewable cycles.",
    description:
      "Each cycle connects production-like data, tests one valuable workflow, and puts the result in front of stakeholders. Progress is demonstrated in software—not slides.",
    result:
      "Tested modules with visible progress and accountable decisions.",
    duration: "2-week cycles",
    outputs: [
      "Working increments",
      "Evaluation results",
      "Technical record",
    ],
    visual: "build",
    icon: Braces,
  },

  {
    number: "04",
    label: "Deploy",
    title:
      "Enter production with evidence, controls, and ownership.",
    description:
      "Monitoring, alerts, rollback paths, documentation, and team handover are part of deployment—not work postponed until after launch.",
    result:
      "An observable production system your team can operate confidently.",
    duration: "Release + handover",
    outputs: [
      "Production release",
      "Observability pack",
      "Runbook & handover",
    ],
    visual: "deploy",
    icon: CloudCog,
  },
];

/* ============================================================
   MAIN SECTION
============================================================ */

export function AdrigProcessSection({
  stages = PROCESS_STAGES,
  className = "",
}: AdrigProcessSectionProps) {
  function scrollToStage(index: number) {
    document
      .getElementById(`process-stage-${index}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }

  return (
    <section
      id="how-we-work"
      aria-labelledby="process-heading"
      className={`relative overflow-hidden border-b border-slate-200/70 bg-[#FAFCFF] py-20 sm:py-28 ${className}`}
    >
      {/* background grid */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.03)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="shell relative z-10 mx-auto max-w-7xl">
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.header
          initial={{
            opacity: 0,
            y: 26,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
          className="mb-16 lg:mb-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1463FF]">
            How we work
          </p>

          <h2
            id="process-heading"
            className="mt-5 max-w-[980px] text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.94] tracking-[-0.065em] text-slate-950"
          >
            Four stages from operational reality
            <span className="block text-slate-500">
              to production.
            </span>
          </h2>

          <p className="mt-7 max-w-[720px] text-base leading-8 text-slate-600 sm:text-lg">
            Each phase mirrors the real working environment of
            the professionals involved — from mapping the
            problem to operating the production system.
          </p>
        </motion.header>

        {/* ==================================================
            QUICK NAV
        ================================================== */}

        <div className="mb-12 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-[620px] border-y border-slate-200">
            {stages.map((stage, index) => (
              <button
                key={stage.number}
                type="button"
                onClick={() => scrollToStage(index)}
                className="group flex flex-1 items-center gap-3 border-r border-slate-200 px-4 py-5 text-left last:border-r-0"
              >
                <span className="font-mono text-[9px] text-[#1463FF]">
                  {stage.number}
                </span>

                <span className="text-sm font-medium text-slate-600 transition-colors duration-300 group-hover:text-slate-950">
                  {stage.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ==================================================
            STAGES
        ================================================== */}

        <div className="space-y-14 sm:space-y-18">
          {stages.map((stage, index) => (
            <ProcessStageCard
              key={stage.number}
              stage={stage}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SHARED STAGE FRAME
============================================================ */

function ProcessStageCard({
  stage,
  index,
}: {
  stage: ProcessStage;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  const [expanded, setExpanded] =
    useState(false);

  const StageIcon = stage.icon;

  return (
    <motion.article
      id={`process-stage-${index}`}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 36,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: 0.72,
        ease: "easeInOut",
      }}
      className="scroll-mt-24 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.055)]"
    >
      <div className="grid lg:grid-cols-[1.62fr_0.72fr]">
        {/* ==================================================
            LEFT — NATIVE ARTIFACT
        ================================================== */}

        <div className="relative min-h-[600px] overflow-hidden border-b border-slate-200 bg-[#0E5CEE] lg:min-h-[690px] lg:border-b-0 lg:border-r">
          {/* duration */}

          <div className="absolute left-6 top-6 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-[#0A4BCB] px-4 py-2.5 text-white">
            <StageIcon className="h-4 w-4" />

            <span className="text-[11px] font-semibold">
              {stage.duration}
            </span>
          </div>

          {/* visual */}

          <div className="absolute inset-0 pt-16">
            {stage.visual === "discover" && (
              <DiscoverArtifact
                reduceMotion={Boolean(
                  reduceMotion
                )}
              />
            )}

            {stage.visual === "architect" && (
              <ArchitectArtifact
                reduceMotion={Boolean(
                  reduceMotion
                )}
              />
            )}

            {stage.visual === "build" && (
              <BuildArtifact
                reduceMotion={Boolean(
                  reduceMotion
                )}
              />
            )}

            {stage.visual === "deploy" && (
              <DeployArtifact
                reduceMotion={Boolean(
                  reduceMotion
                )}
              />
            )}
          </div>

          {/* bottom label */}

          <div className="absolute bottom-6 left-7 z-40">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
              ADRIG / {stage.label} workspace
            </p>
          </div>
        </div>

        {/* ==================================================
            RIGHT — STAGE INFORMATION
        ================================================== */}

        <div className="flex min-h-[560px] flex-col p-7 sm:p-9 lg:min-h-[690px] lg:p-10">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1463FF] font-mono text-[10px] font-semibold text-white">
                {stage.number}
              </span>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-slate-400">
                  Stage
                </p>

                <p className="mt-0.5 text-sm font-semibold text-slate-950">
                  {stage.label}
                </p>
              </div>
            </div>

            <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
          </div>

          <div className="py-8">
            <h3 className="text-[clamp(2rem,3vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-slate-950">
              {stage.title}
            </h3>

            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
              {stage.description}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#1463FF]">
              Stage result
            </p>

            <p className="mt-3 text-lg leading-7 tracking-[-0.025em] text-slate-800">
              {stage.result}
            </p>
          </div>

          <div className="mt-auto pt-8">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() =>
                setExpanded((value) => !value)
              }
              className="group inline-flex min-h-[48px] items-center gap-3 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:border-[#1463FF] hover:text-[#1463FF]"
            >
              {expanded
                ? "Hide stage outputs"
                : "View stage outputs"}

              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          height: 0,
                          opacity: 0,
                        }
                  }
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          height: 0,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 rounded-[20px] border border-slate-200 bg-[#F8FAFD] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                      Verified outputs
                    </p>

                    <ul className="mt-4 space-y-3">
                      {stage.outputs.map(
                        (output) => (
                          <li
                            key={output}
                            className="flex items-center gap-3 text-sm font-medium text-slate-700"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1463FF] text-white">
                              <Check
                                className="h-3 w-3"
                                strokeWidth={3}
                              />
                            </span>

                            {output}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   01 — DISCOVER
   LARGE RESEARCH / MAPPING BOARD
============================================================ */

function DiscoverArtifact({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const notes = [
    {
      label: "DATA",
      title: "Customer records",
      detail: "CRM · tickets · history",
      x: "6%",
      y: "14%",
      rotate: -2,
    },

    {
      label: "SYSTEM",
      title: "Legacy ERP",
      detail: "SAP · internal APIs",
      x: "67%",
      y: "13%",
      rotate: 2,
    },

    {
      label: "WORKFLOW",
      title: "Manual review",
      detail: "4 handoffs · 2 approvals",
      x: "7%",
      y: "65%",
      rotate: 2,
    },

    {
      label: "SIGNAL",
      title: "Slow response",
      detail: "34 min average delay",
      x: "69%",
      y: "65%",
      rotate: -2,
    },
  ];

  return (
    <div className="relative h-full min-h-[600px] w-full overflow-hidden bg-[#0E5CEE] px-6 py-8 sm:px-10">
      {/* dotted working canvas */}

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:26px_26px]" />

      {/* relationship lines */}

      <div className="absolute left-[22%] top-[31%] h-px w-[28%] rotate-[8deg] border-t border-dashed border-white/35" />

      <div className="absolute right-[24%] top-[31%] h-px w-[25%] -rotate-[8deg] border-t border-dashed border-white/35" />

      <div className="absolute bottom-[27%] left-[22%] h-px w-[28%] -rotate-[8deg] border-t border-dashed border-white/35" />

      <div className="absolute bottom-[27%] right-[24%] h-px w-[25%] rotate-[8deg] border-t border-dashed border-white/35" />

      {/* larger notes */}

      {notes.map((note, index) => (
        <motion.div
          key={note.title}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                  rotate: 0,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: note.rotate,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.55,
            delay: index * 0.08,
            ease: "easeInOut",
          }}
          style={{
            left: note.x,
            top: note.y,
          }}
          className="absolute z-10 w-[160px] rounded-[18px] border border-white/20 bg-[#0A4BCB] p-5 text-white shadow-[0_12px_28px_rgba(4,30,92,0.20)] sm:w-[240px] sm:p-6"
        >
          <p className="font-mono text-[9px] tracking-[0.15em] text-white/60 sm:text-[10px]">
            {note.label}
          </p>

          <p className="mt-3 text-base font-semibold tracking-[-0.025em] text-white sm:text-xl">
            {note.title}
          </p>

          <p className="mt-2 text-[10px] text-white/55 sm:text-xs">
            {note.detail}
          </p>

          <div className="mt-5 h-1.5 w-[76%] rounded-full bg-white/14" />

          <div className="mt-2 h-1.5 w-[52%] rounded-full bg-white/10" />
        </motion.div>
      ))}

      {/* central focus — around 40% larger */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 0.94,
                y: 18,
              }
        }
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.65,
          delay: 0.24,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 z-20 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/30 bg-[#073B9B] p-6 text-white shadow-[0_24px_55px_rgba(3,27,81,0.28)] sm:w-[420px] sm:p-8"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-white/60">
            Current focus
          </span>

          <ScanSearch className="h-5 w-5 text-white" />
        </div>

        <p className="mt-5 text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl">
          Support workflow analysis
        </p>

        <p className="mt-2 max-w-[320px] text-xs leading-5 text-white/60 sm:text-sm">
          Mapping where fragmented knowledge creates
          response latency.
        </p>

        <div className="mt-7 space-y-3">
          <div className="h-2 w-full rounded-full bg-white/15" />

          <div className="h-2 w-[88%] rounded-full bg-white/15" />

          <div className="rounded-[8px] border border-white/15 bg-white/10 px-3 py-2.5">
            <div className="h-2 w-[75%] rounded-full bg-white/55" />
          </div>

          <div className="h-2 w-[62%] rounded-full bg-white/15" />
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[8px] text-white/75">
            owner identified
          </span>

          <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[8px] font-semibold text-[#0E5CEE]">
            bottleneck
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   02 — ARCHITECT
   FULLY CONNECTED SYSTEM ARCHITECTURE
============================================================ */

function ArchitectArtifact({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <div className="relative h-full min-h-[610px] w-full overflow-hidden bg-[#0E5CEE]">
      {/* architecture grid */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* canvas is horizontally safe on narrow screens */}

      <div className="absolute inset-0 overflow-x-auto px-5 pb-16 pt-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative mx-auto min-h-[500px] min-w-[920px] max-w-[980px]">
          {/* SYSTEM BOUNDARY */}

          <div className="absolute inset-x-4 bottom-5 top-2 rounded-[26px] border border-dashed border-white/30">
            <span className="absolute left-6 top-4 bg-[#0E5CEE] px-3 font-mono text-[9px] uppercase tracking-[0.17em] text-white/50">
              ADRIG production boundary
            </span>
          </div>

          {/* ==================================================
              GRID
          ================================================== */}

          <div className="absolute inset-x-10 bottom-12 top-16 grid grid-cols-[220px_70px_240px_70px_220px] grid-rows-[150px_78px_150px] items-center justify-center">
            {/* ----------------------------------------------
                TOP ROW
            ---------------------------------------------- */}

            <div className="col-start-1 row-start-1 flex justify-center">
              <ArchitectureBox
                label="API Gateway"
                sublabel="Edge requests"
                icon={Network}
                delay={0}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="col-start-2 row-start-1 flex items-center">
              <HorizontalDataConnector
                label="REQUEST"
                delay={0.25}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="col-start-3 row-start-1 flex justify-center">
              <ArchitectureBox
                label="Service Layer"
                sublabel="Business logic"
                icon={Boxes}
                active
                delay={0.08}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="col-start-4 row-start-1 flex items-center">
              <HorizontalDataConnector
                label="QUERY"
                delay={0.42}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="col-start-5 row-start-1 flex justify-center">
              <ArchitectureBox
                label="Data Layer"
                sublabel="State + storage"
                icon={Database}
                delay={0.16}
                reduceMotion={reduceMotion}
              />
            </div>

            {/* ----------------------------------------------
                VERTICAL CONNECTIONS
            ---------------------------------------------- */}

            <div className="col-start-3 row-start-2 flex h-full justify-center">
              <VerticalDataConnector
                label="POLICY"
                delay={0.6}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="col-start-5 row-start-2 flex h-full justify-center">
              <VerticalDataConnector
                label="METRICS"
                delay={0.74}
                reduceMotion={reduceMotion}
              />
            </div>

            {/* ----------------------------------------------
                BOTTOM ROW
            ---------------------------------------------- */}

            <div className="col-start-3 row-start-3 flex justify-center">
              <ArchitectureBox
                label="Auth / Policy"
                sublabel="Identity + rules"
                icon={ShieldCheck}
                delay={0.24}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="col-start-4 row-start-3 flex items-center">
              <HorizontalDataConnector
                label="AUDIT"
                delay={0.9}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="col-start-5 row-start-3 flex justify-center">
              <ArchitectureBox
                label="Observability"
                sublabel="Logs + traces"
                icon={Gauge}
                delay={0.32}
                reduceMotion={reduceMotion}
              />
            </div>
          </div>

          {/* DATA CONNECTION LABEL */}

          <div className="absolute bottom-5 left-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-white" />

            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
              live data connection layer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ARCHITECTURE BOX
   ~40% LARGER THAN PREVIOUS VERSION
============================================================ */

function ArchitectureBox({
  label,
  sublabel,
  icon: Icon,
  active = false,
  delay,
  reduceMotion,
}: {
  label: string;
  sublabel: string;
  icon: LucideIcon;
  active?: boolean;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.93,
              y: 12,
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeInOut",
      }}
      className={`relative z-20 flex min-h-[118px] w-full max-w-[220px] flex-col justify-center rounded-[18px] border px-6 py-5 text-white shadow-[0_14px_32px_rgba(3,25,78,0.22)] ${
        active
          ? "border-white bg-[#073B9B]"
          : "border-white/25 bg-[#0A4BCB]"
      }`}
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-white" />

        <span
          className={`h-2 w-2 rounded-full ${
            active
              ? "bg-white"
              : "bg-white/45"
          }`}
        />
      </div>

      <p className="mt-4 text-[17px] font-semibold tracking-[-0.035em] text-white">
        {label}
      </p>

      <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/50">
        {sublabel}
      </p>
    </motion.div>
  );
}

/* ============================================================
   HORIZONTAL DATA CONNECTOR
============================================================ */

function HorizontalDataConnector({
  label,
  delay,
  reduceMotion,
}: {
  label: string;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative h-[42px] w-full">
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                scaleX: 0,
              }
        }
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.55,
          delay,
          ease: "easeInOut",
        }}
        className="absolute left-0 right-0 top-1/2 h-px origin-left bg-white/55"
      />

      {/* arrow */}

      <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-white/70" />

      {/* moving data */}

      {!reduceMotion && (
        <motion.span
          animate={{
            left: ["3%", "88%", "3%"],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
        />
      )}

      <span className="absolute left-1/2 top-[3px] -translate-x-1/2 font-mono text-[7px] tracking-[0.13em] text-white/40">
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   VERTICAL DATA CONNECTOR
============================================================ */

function VerticalDataConnector({
  label,
  delay,
  reduceMotion,
}: {
  label: string;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative h-full w-[50px]">
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                scaleY: 0,
              }
        }
        whileInView={{
          scaleY: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.55,
          delay,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/2 top-0 w-px origin-top bg-white/55"
      />

      <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-[135deg] border-r border-t border-white/70" />

      {!reduceMotion && (
        <motion.span
          animate={{
            top: ["4%", "84%", "4%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white"
        />
      )}

      <span className="absolute left-[31px] top-1/2 -translate-y-1/2 font-mono text-[7px] tracking-[0.12em] text-white/40">
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   03 — BUILD
   BLUE KANBAN / SPRINT BOARD
============================================================ */

function BuildArtifact({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const columns = [
    {
      title: "Backlog",
      tasks: [
        "Auth boundary",
        "Search API",
        "Audit model",
      ],
    },

    {
      title: "In Progress",
      tasks: [
        "RAG pipeline",
        "Webhook sync",
      ],
    },

    {
      title: "Review",
      tasks: [
        "Evaluation suite",
        "Access rules",
      ],
    },

    {
      title: "Done",
      tasks: [
        "Schema design",
        "CI pipeline",
      ],
    },
  ];

  return (
    <div className="relative h-full min-h-[610px] w-full overflow-hidden bg-[#0E5CEE] px-5 py-8 sm:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* board chrome */}

      <div className="relative z-10 mb-5 flex items-center justify-between rounded-[16px] border border-white/20 bg-[#0A4BCB] px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <Braces className="h-4 w-4" />

          <span className="text-sm font-semibold">
            Sprint 12
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[9px] text-white/55">
          <GitBranch className="h-3.5 w-3.5" />
          main
        </div>
      </div>

      <div className="relative z-10 grid min-h-[440px] grid-cols-2 gap-3 sm:grid-cols-4">
        {columns.map((column, columnIndex) => (
          <div
            key={column.title}
            className="rounded-[16px] border border-white/15 bg-[#0A46BE] p-3 sm:p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-white sm:text-xs">
                {column.title}
              </p>

              <span className="font-mono text-[8px] text-white/45">
                {column.tasks.length}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {column.tasks.map(
                (task, taskIndex) => {
                  const highlighted =
                    columnIndex === 1 &&
                    taskIndex === 0;

                  if (highlighted) {
                    return (
                      <motion.div
                        key={task}
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                y: [0, -7, 0],
                                x: [0, 4, 0],
                              }
                        }
                        transition={{
                          duration: 3.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="rounded-[12px] border border-white/45 bg-[#073B9B] p-4 text-white shadow-[0_15px_30px_rgba(3,24,73,0.25)]"
                      >
                        <TaskCardContent
                          task={task}
                          accent
                        />
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={task}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 8,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                        delay:
                          columnIndex * 0.07 +
                          taskIndex * 0.05,
                        ease: "easeInOut",
                      }}
                      className="rounded-[12px] border border-white/15 bg-[#0A4BCB] p-4 text-white"
                    >
                      <TaskCardContent
                        task={task}
                      />
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCardContent({
  task,
  accent = false,
}: {
  task: string;
  accent?: boolean;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span
          className={`h-1.5 w-8 rounded-full ${
            accent
              ? "bg-white"
              : "bg-white/25"
          }`}
        />

        <span className="font-mono text-[7px] text-white/45">
          ADR-{Math.floor(
            task.length * 13
          )}
        </span>
      </div>

      <p className="mt-3 text-[11px] font-semibold leading-4 text-white">
        {task}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 font-mono text-[7px] text-white/65">
          engineering
        </span>

        <span
          className={`h-4 w-4 rounded-full border ${
            accent
              ? "border-white bg-white"
              : "border-white/30 bg-white/10"
          }`}
        />
      </div>
    </>
  );
}

/* ============================================================
   04 — DEPLOY
   BLUE OBSERVABILITY DASHBOARD
============================================================ */

function DeployArtifact({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <div className="relative h-full min-h-[610px] w-full overflow-hidden bg-[#0E5CEE] px-5 py-8 sm:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* dashboard header */}

      <div className="relative z-10 flex items-center justify-between rounded-[16px] border border-white/20 bg-[#0A4BCB] px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <Gauge className="h-4 w-4" />

          <span className="text-sm font-semibold">
            Production overview
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white" />

          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/65">
            Healthy
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-4 grid gap-4 sm:grid-cols-[1fr_1.45fr]">
        {/* main gauge */}

        <div className="flex min-h-[390px] flex-col rounded-[18px] border border-white/15 bg-[#0A46BE] p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/50">
              Service health
            </p>

            <ShieldCheck className="h-5 w-5" />
          </div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.9,
                  }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
            className="relative mx-auto mt-10 flex h-[190px] w-[190px] items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(#FFFFFF 0deg 359.64deg, rgba(255,255,255,0.14) 359.64deg 360deg)",
            }}
          >
            <div className="flex h-[154px] w-[154px] flex-col items-center justify-center rounded-full bg-[#0A46BE]">
              <span className="text-[38px] font-semibold tracking-[-0.065em] text-white">
                99.9
              </span>

              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">
                uptime %
              </span>
            </div>
          </motion.div>

          <div className="mt-auto flex justify-between border-t border-white/15 pt-5 text-[9px]">
            <span className="text-white/45">
              region
            </span>

            <span className="font-medium text-white">
              ap-south-1
            </span>
          </div>
        </div>

        {/* telemetry */}

        <div className="grid gap-4">
          <MetricPanel
            label="Latency"
            value="84ms"
            status="Monitoring"
          >
            <SparkBars
              values={[
                28, 34, 30, 48, 44, 58,
                51, 62, 55, 67, 60, 72,
              ]}
              reduceMotion={reduceMotion}
            />
          </MetricPanel>

          <MetricPanel
            label="Error rate"
            value="0.08%"
            status="Healthy"
          >
            <SparkBars
              values={[
                16, 12, 14, 10, 18, 9,
                8, 11, 7, 10, 8, 6,
              ]}
              reduceMotion={reduceMotion}
            />
          </MetricPanel>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[16px] border border-white/15 bg-[#0A46BE] p-4 text-white">
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4" />

                <span className="font-mono text-[8px] uppercase text-white/45">
                  Requests
                </span>
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-white">
                18.4k
              </p>

              <p className="mt-1 text-[9px] text-white/45">
                last 15 min
              </p>
            </div>

            <div className="rounded-[16px] border border-white/15 bg-[#0A46BE] p-4 text-white">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />

                <span className="font-mono text-[8px] uppercase text-white/45">
                  Release
                </span>
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-white">
                v2.4.1
              </p>

              <p className="mt-1 text-[9px] text-white/65">
                stable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DEPLOY METRIC PANEL
============================================================ */

function MetricPanel({
  label,
  value,
  status,
  children,
}: {
  label: string;
  value: string;
  status: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[16px] border border-white/15 bg-[#0A46BE] p-5 text-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/45">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-white">
            {value}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />

          <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/50">
            {status}
          </span>
        </div>
      </div>

      <div className="mt-5 h-[52px]">
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   SPARK BAR CHART
============================================================ */

function SparkBars({
  values,
  reduceMotion,
}: {
  values: number[];
  reduceMotion: boolean;
}) {
  return (
    <div className="flex h-full items-end gap-1.5">
      {values.map((value, index) => (
        <motion.span
          key={`${value}-${index}`}
          initial={
            reduceMotion
              ? false
              : {
                  height: 0,
                }
          }
          whileInView={{
            height: `${value}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.03,
            ease: "easeInOut",
          }}
          className={`min-w-0 flex-1 rounded-t-[2px] ${
            index === values.length - 1
              ? "bg-white"
              : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default AdrigProcessSection;