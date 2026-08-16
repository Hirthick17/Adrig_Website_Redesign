"use client";

/**
 * ADRIG interactive process section for Next.js 15 + Tailwind CSS v4.
 *
 * Prebuilt foundation:
 *   Timeline from @/components/ui/timeline
 *
 * Runtime dependencies:
 *   framer-motion, lucide-react
 */

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Braces,
  Check,
  ChevronDown,
  CloudCog,
  Database,
  FileSearch,
  Gauge,
  GitBranch,
  MessageSquareText,
  Network,
  ScanSearch,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useState } from "react";

import { Timeline } from "@/components/ui/timeline";
import { Heading, Paragraph, Price, PricingWrapper } from "@/components/ui/pricing";

type StageVisual = "discover" | "architect" | "build" | "deploy";

type StageIcon = LucideIcon;

export type ProcessStage = {
  number: string;
  label: string;
  title: string;
  description: string;
  result: string;
  duration: string;
  outputs: string[];
  visual: StageVisual;
  icon: StageIcon;
  image?: {
    src: string;
    alt: string;
  };
};

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    label: "Discover",
    title: "Map the operation before shaping the system.",
    description:
      "We trace decisions, data, handoffs, and failure points with the people who run the operation. The result is a shared picture of what must change—and what should stay untouched.",
    result: "A scoped problem with evidence, owners, and success measures.",
    duration: "1–2 weeks",
    outputs: ["Operational map", "Data inventory", "Decision brief"],
    visual: "discover",
    icon: ScanSearch,
  },
  {
    number: "02",
    label: "Architect",
    title: "Turn the operating reality into a buildable system.",
    description:
      "We define boundaries, integrations, intelligence layers, observability, security, and deployment constraints before expensive implementation begins.",
    result: "An architecture the business and engineering teams can both verify.",
    duration: "1–2 weeks",
    outputs: ["System architecture", "Integration plan", "Risk register"],
    visual: "architect",
    icon: Boxes,
  },
  {
    number: "03",
    label: "Build",
    title: "Ship working modules in short, reviewable cycles.",
    description:
      "Each cycle connects production-like data, tests one valuable workflow, and puts the result in front of stakeholders. Progress is demonstrated in software—not slides.",
    result: "Tested modules with visible progress and accountable decisions.",
    duration: "2-week cycles",
    outputs: ["Working increments", "Evaluation results", "Technical record"],
    visual: "build",
    icon: Braces,
  },
  {
    number: "04",
    label: "Deploy",
    title: "Enter production with evidence, controls, and ownership.",
    description:
      "Monitoring, alerts, rollback paths, documentation, and team handover are part of deployment—not work postponed until after launch.",
    result: "An observable production system your team can operate confidently.",
    duration: "Release + handover",
    outputs: ["Production release", "Observability pack", "Runbook & handover"],
    visual: "deploy",
    icon: CloudCog,
  },
];

type AdrigProcessSectionProps = {
  stages?: ProcessStage[];
  className?: string;
};

export function AdrigProcessSection({
  stages = PROCESS_STAGES,
  className = "",
}: AdrigProcessSectionProps) {
  const timelineData = stages.map((stage) => ({
    title: `${stage.number} — ${stage.label}`,
    content: <ProcessStageCard key={stage.number} stage={stage} />,
  }));

  return (
    <section
      id="how-we-work"
      aria-labelledby="process-heading"
      className={`relative isolate overflow-hidden bg-[#FAFCFF] py-20 sm:py-28 border-b border-slate-200/60 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black_0%,black_86%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[18vw] top-12 -z-10 h-[620px] w-[620px] rounded-full bg-[#EAF2FF] opacity-70 blur-[120px]"
      />

      <header className="shell mb-12 grid grid-cols-1 gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2
            id="process-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.08]"
          >
            Four stages from operational reality to production.
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed lg:col-span-5 lg:justify-self-end">
          A disciplined engineering process that reduces uncertainty early and
          keeps your team inside every important decision.
        </p>
      </header>

      {/* Aceternity owns the sticky labels and scroll-following beam. */}
      <Timeline data={timelineData} />

      <div className="shell mt-10 flex justify-end lg:mt-16">
        <a
          href="/contact"
          className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-lg transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0E5CEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5CEE] focus-visible:ring-offset-2"
        >
          Discuss your system
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </section>
  );
}

function ProcessStageCard({ stage }: { stage: ProcessStage }) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0, visible: false });
  const StageIcon = stage.icon;

  function updateSpotlight(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      visible: true,
    });
  }

  return (
    <motion.article
      onPointerMove={updateSpotlight}
      onPointerEnter={updateSpotlight}
      onPointerLeave={() =>
        setPointer((current) => ({ ...current, visible: false }))
      }
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-lg shadow-blue-950/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-blue-300/70 hover:shadow-xl hover:shadow-blue-900/[0.07]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: pointer.visible ? 1 : 0,
          background: `radial-gradient(440px circle at ${pointer.x}px ${pointer.y}px, rgba(20, 99, 255, 0.12), transparent 58%)`,
        }}
      />

      <div className="relative z-10 grid min-h-[420px] grid-cols-1 lg:grid-cols-12">
        <div className="relative min-h-[260px] overflow-hidden border-b border-slate-200/70 lg:col-span-7 lg:min-h-full lg:border-b-0 lg:border-r">
          {stage.image ? (
            <StageImage stage={stage} />
          ) : (
            <StageDiagram stage={stage} reduceMotion={Boolean(reduceMotion)} />
          )}

          <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-md">
            <StageIcon aria-hidden="true" className="size-4 text-[#0E5CEE]" />
            {stage.duration}
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div className="mb-7 flex items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase leading-[1.2] tracking-[.18em] text-[#0E5CEE]">
              Stage {stage.number}
            </p>
            <span className="text-sm font-medium text-slate-500">
              {stage.label}
            </span>
          </div>

          <h3 className="text-2xl font-normal leading-snug tracking-tight text-slate-950">
            {stage.title}
          </h3>
          <p className="mt-4 text-[14.5px] font-normal leading-relaxed text-slate-600">
            {stage.description}
          </p>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Stage result
            </p>
            <p className="mt-2 text-[14.5px] font-medium leading-relaxed text-slate-800">
              {stage.result}
            </p>
          </div>

          <div className="mt-auto pt-6">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
              className="group/button inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 text-xs font-semibold text-slate-900 transition duration-200 hover:border-blue-300 hover:bg-[#EEF4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5CEE] focus-visible:ring-offset-2 cursor-pointer"
            >
              {expanded ? "Hide stage outputs" : "View stage outputs"}
              <ChevronDown
                aria-hidden="true"
                className={`size-3.5 transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pt-4"
                >
                  <PricingWrapper
                    type="crosses"
                    contactHref="/contact"
                    className="p-5 sm:p-6 bg-[#FAFCFF] border-blue-200/70"
                  >
                    <Heading>STAGE 0{stage.number} DELIVERABLES</Heading>
                    <Price className="text-lg sm:text-xl font-normal">
                      Verified Outputs
                    </Price>
                    <Paragraph className="text-xs mb-4">
                      Every deliverable is auditable, version-controlled, and ready for enterprise operations.
                    </Paragraph>
                    <ul className="grid gap-2 border-t border-slate-200/70 pt-3">
                      {stage.outputs.map((output) => (
                        <li
                          key={output}
                          className="flex items-center gap-2 text-xs font-medium text-slate-800"
                        >
                          <span className="grid size-4 shrink-0 place-items-center rounded-full bg-[#0E5CEE] text-white">
                            <Check aria-hidden="true" className="size-2.5" strokeWidth={3} />
                          </span>
                          {output}
                        </li>
                      ))}
                    </ul>
                  </PricingWrapper>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function StageImage({ stage }: { stage: ProcessStage }) {
  if (!stage.image) return null;

  return (
    <div className="absolute inset-0 bg-[#F3F7FF]">
      <img
        src={stage.image.src}
        alt={stage.image.alt}
        loading="lazy"
        className="h-full w-full object-cover saturate-[0.65] transition duration-700 ease-out group-hover:scale-[1.035] group-hover:saturate-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,26,51,0.12),transparent_52%),linear-gradient(to_top,rgba(7,26,51,0.34),transparent_55%)] mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#1463FF] opacity-[0.08] mix-blend-color"
      />
    </div>
  );
}

function StageDiagram({
  stage,
  reduceMotion,
}: {
  stage: ProcessStage;
  reduceMotion: boolean;
}) {
  const visualClass = {
    discover:
      "bg-[radial-gradient(circle_at_48%_44%,#ffffff_0%,#F3F7FF_46%,#EEF4FF_100%)]",
    architect:
      "bg-[linear-gradient(145deg,#F3F7FF_0%,#ffffff_48%,#EEF4FF_100%)]",
    build:
      "bg-[linear-gradient(145deg,#071A33_0%,#0B213F_62%,#0E5CEE_155%)]",
    deploy:
      "bg-[radial-gradient(circle_at_50%_28%,#ffffff_0%,#F3F7FF_45%,#CFE0FF_130%)]",
  }[stage.visual];

  return (
    <div className={`absolute inset-0 ${visualClass}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.06)_1px,transparent_1px)] opacity-70 [background-size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]"
      />

      <div className="absolute inset-0 grid place-items-center p-8 sm:p-12">
        {stage.visual === "discover" ? (
          <DiscoverVisual reduceMotion={reduceMotion} />
        ) : null}
        {stage.visual === "architect" ? (
          <ArchitectVisual reduceMotion={reduceMotion} />
        ) : null}
        {stage.visual === "build" ? (
          <BuildVisual reduceMotion={reduceMotion} />
        ) : null}
        {stage.visual === "deploy" ? (
          <DeployVisual reduceMotion={reduceMotion} />
        ) : null}
      </div>

      <p className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        ADRIG / {stage.label} system view
      </p>
    </div>
  );
}

function DiscoverVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const nodes = [
    { label: "Data", Icon: Database, className: "left-[8%] top-[20%]" },
    { label: "People", Icon: MessageSquareText, className: "right-[6%] top-[14%]" },
    { label: "Systems", Icon: Network, className: "bottom-[10%] left-[12%]" },
    { label: "Decisions", Icon: FileSearch, className: "bottom-[8%] right-[8%]" },
  ];

  return (
    <div className="relative aspect-square w-full max-w-[360px]">
      {[0.98, 0.7, 0.42].map((scale, index) => (
        <motion.div
          key={scale}
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : { scale: [scale, scale + 0.035, scale], opacity: [0.45, 0.8, 0.45] }
          }
          transition={{
            duration: 3.4 + index * 0.45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 m-auto aspect-square rounded-full border border-[#A9C8FF]"
          style={{ width: `${scale * 100}%` }}
        />
      ))}

      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[16%] rounded-full border border-dashed border-[#347DFF]/60"
      />

      <div className="absolute inset-[34%] grid place-items-center rounded-full border border-[#A9C8FF] bg-white shadow-[0_18px_55px_rgba(20,99,255,0.18)]">
        <ScanSearch className="size-8 text-[#0E5CEE]" strokeWidth={1.7} />
      </div>

      {nodes.map(({ label, Icon, className }, index) => (
        <motion.div
          key={label}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 + index * 0.08 }}
          className={`absolute ${className} flex items-center gap-2 rounded-full border border-white bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur`}
        >
          <Icon className="size-3.5 text-[#0E5CEE]" />
          {label}
        </motion.div>
      ))}
    </div>
  );
}

function ArchitectVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const modules = [
    { label: "Experience", className: "left-[5%] top-[8%]" },
    { label: "Intelligence", className: "right-[3%] top-[8%]" },
    { label: "Data layer", className: "bottom-[6%] left-[5%]" },
    { label: "Controls", className: "bottom-[6%] right-[3%]" },
  ];

  return (
    <div className="relative h-[250px] w-full max-w-[430px]">
      <svg
        aria-hidden="true"
        viewBox="0 0 430 250"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {[
          "M78 48 C150 48 150 125 215 125",
          "M352 48 C282 48 282 125 215 125",
          "M78 202 C150 202 150 125 215 125",
          "M352 202 C282 202 282 125 215 125",
        ].map((path, index) => (
          <g key={path}>
            <path
              d={path}
              fill="none"
              stroke="#A9C8FF"
              strokeWidth="1.5"
            />
            <motion.path
              d={path}
              fill="none"
              stroke="#0E5CEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="14 140"
              animate={reduceMotion ? undefined : { strokeDashoffset: [154, 0] }}
              transition={{
                duration: 2.4,
                delay: index * 0.22,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-[#A9C8FF] bg-slate-900 text-white shadow-[0_22px_70px_rgba(7,26,51,0.18)]">
        <Waypoints className="size-8 text-[#A9C8FF]" strokeWidth={1.6} />
        <span className="-mt-4 text-[10px] font-semibold uppercase tracking-[0.14em]">
          Core
        </span>
      </div>

      {modules.map(({ label, className }, index) => (
        <motion.div
          key={label}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className={`absolute ${className} grid h-16 w-[128px] place-items-center rounded-2xl border border-slate-200/80 bg-white text-xs font-semibold text-slate-800 shadow-sm`}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

function BuildVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const rows = [
    { label: "Connect production-like data", progress: "w-[92%]" },
    { label: "Evaluate the workflow", progress: "w-[74%]" },
    { label: "Review with stakeholders", progress: "w-[58%]" },
  ];

  return (
    <div className="w-full max-w-[430px] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] shadow-[0_28px_90px_rgba(0,0,0,0.25)] backdrop-blur">
      <div className="flex h-12 items-center justify-between border-b border-white/10 px-5">
        <div className="flex gap-2" aria-hidden="true">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-[#347DFF]" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#CFE0FF]">
          Sprint / live
        </span>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        {rows.map((row, index) => (
          <div key={row.label}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-white/90">{row.label}</span>
              <span className="text-xs font-semibold text-[#A9C8FF]">
                0{index + 1}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  delay: 0.18 + index * 0.12,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`h-full origin-left rounded-full bg-[#347DFF] ${row.progress}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4 text-xs font-medium text-white/65 sm:px-8">
        <GitBranch className="size-4 text-[#A9C8FF]" />
        Evidence recorded with every release
      </div>
    </div>
  );
}

function DeployVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const orbitNodes = [
    { Icon: Gauge, className: "left-[2%] top-1/2 -translate-y-1/2" },
    { Icon: ShieldCheck, className: "right-[2%] top-1/2 -translate-y-1/2" },
    { Icon: Network, className: "left-1/2 top-[2%] -translate-x-1/2" },
  ];

  return (
    <div className="relative aspect-[1.45] w-full max-w-[430px]">
      <svg
        aria-hidden="true"
        viewBox="0 0 430 295"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M28 210 C92 198 110 152 164 166 C218 180 238 88 292 112 C333 130 350 73 402 62"
          fill="none"
          stroke="#CFE0FF"
          strokeWidth="7"
          strokeLinecap="round"
          opacity=".55"
        />
        <motion.path
          d="M28 210 C92 198 110 152 164 166 C218 180 238 88 292 112 C333 130 350 73 402 62"
          fill="none"
          stroke="#0E5CEE"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { boxShadow: [
                "0 18px 50px rgba(20,99,255,.12)",
                "0 22px 80px rgba(20,99,255,.28)",
                "0 18px 50px rgba(20,99,255,.12)",
              ] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#A9C8FF] bg-white"
      >
        <CloudCog className="size-10 text-[#0E5CEE]" strokeWidth={1.6} />
        <span className="-mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-900">
          Production
        </span>
      </motion.div>

      {orbitNodes.map(({ Icon, className }, index) => (
        <motion.div
          key={index}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 + index * 0.12 }}
          className={`absolute ${className} grid size-14 place-items-center rounded-2xl border border-slate-200/80 bg-white shadow-sm`}
        >
          <Icon className="size-5 text-[#0E5CEE]" />
        </motion.div>
      ))}
    </div>
  );
}

export default AdrigProcessSection;
