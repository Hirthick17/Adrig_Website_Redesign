"use client";

import React, {
  forwardRef,
  useMemo,
  useRef,
  type ComponentType,
  type ReactNode,
} from "react";

import {
  Boxes,
  Braces,
  Check,
  ClipboardCheck,
  CloudUpload,
  Cog,
  Database,
  Factory,
  FileSpreadsheet,
  Gauge,
  GitBranch,
  Network,
  PackageCheck,
  RotateCcw,
  ScanSearch,
  Server,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { Timeline } from "@/components/ui/timeline";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ============================================================================
   ADRIG PROCESS SECTION
   ----------------------------------------------------------------------------
   VISUAL DIRECTION

   The stage visual is adapted from the supplied scanner/tool-stack component:
   - five circular system nodes
   - staggered node sizes
   - a vertical scanning beam moving horizontally
   - a pixel/noise trail adjacent to the scanner
   - radial fade/mask around the engineering stage

   IMPORTANT:
   - No hand-authored SVGs in this file.
   - All system glyphs use Lucide components.
   - Aceternity Timeline remains the page-level process backbone.
   - Build retains the kanban information architecture.
   - Architect retains the API / service / data / policy / observability context.
============================================================================ */

const BRAND = {
  blue: "#1463FF",
  blueSoft: "#EAF2FF",
  blueFaint: "#F6F9FF",
  ink: "#071126",
  muted: "#5D6C84",
  border: "#CFE0FA",
  line: "#DCE8F8",
  canvas: "#FAFCFF",
};

type IconType = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

type ScanItem = {
  icon: IconType;
  label: string;
  detail?: string;
};

type Stage = {
  number: string;
  label: string;
  title: string;
  description: string;
  result: string;
  duration: string;
  outputs: string[];
  content: ReactNode;
};

/* ============================================================================
   ROOT
============================================================================ */

export default function AdrigProcessSection() {
  const reduceMotion = useReducedMotion();

  const stages = useMemo<Stage[]>(
    () => [
      {
        number: "01",
        label: "Discover",
        title: "Map the operation before shaping the system.",
        description:
          "We trace decisions, data, handoffs, and failure points with the people who run the operation. The result is a shared picture of what must change—and what should stay untouched.",
        result:
          "A scoped problem with evidence, owners, and success measures.",
        duration: "1–2 weeks",
        outputs: ["Operational map", "Data inventory", "Decision brief"],
        content: <DiscoverSystem reduceMotion={Boolean(reduceMotion)} />,
      },
      {
        number: "02",
        label: "Architect",
        title: "Turn the operating reality into a buildable system.",
        description:
          "We define boundaries, integrations, intelligence layers, observability, security, and deployment constraints before expensive implementation begins.",
        result:
          "An architecture the business and engineering teams can both verify.",
        duration: "1–2 weeks",
        outputs: ["System architecture", "Integration plan", "Risk register"],
        content: <ArchitectSystem reduceMotion={Boolean(reduceMotion)} />,
      },
      {
        number: "03",
        label: "Build",
        title: "Ship working modules in short, reviewable cycles.",
        description:
          "Each cycle connects production-like data, tests one valuable workflow, and puts the result in front of stakeholders. Progress is demonstrated in software—not slides.",
        result:
          "Tested modules with visible progress and accountable decisions.",
        duration: "2-week cycles",
        outputs: ["Working increments", "Evaluation results", "Technical record"],
        content: <BuildSystem reduceMotion={Boolean(reduceMotion)} />,
      },
      {
        number: "04",
        label: "Deploy",
        title: "Enter production with evidence, controls, and ownership.",
        description:
          "Monitoring, alerts, rollback paths, documentation, and team handover are part of deployment—not work postponed until after launch.",
        result:
          "An observable production system your team can operate confidently.",
        duration: "Release + handover",
        outputs: ["Production release", "Observability pack", "Runbook & handover"],
        content: <DeploySystem reduceMotion={Boolean(reduceMotion)} />,
      },
    ],
    [reduceMotion],
  );

  const timelineData = stages.map((stage) => ({
    title: `${stage.number}  ${stage.label}`,
    content: <StageContent stage={stage} />,
  }));

  return (
    <section
      id="how-we-work"
      aria-labelledby="adrig-process-heading"
      className="relative overflow-hidden border-y border-slate-200/70 bg-[#FAFCFF]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.035)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-8 pt-24 sm:px-8 sm:pt-32 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[1120px] text-center"
        >
          <p className="text-sm font-semibold text-[#1463FF]">How we work</p>

          <h2
            id="adrig-process-heading"
            className="mt-5 text-[clamp(3rem,5.3vw,5.9rem)] font-normal leading-[0.93] tracking-[-0.065em] text-[#071126]"
          >
            One engineering process.
            <span className="block text-[#1463FF]">
              Evidence moves with the system.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[720px] text-base leading-8 text-slate-600 sm:text-lg">
            Discover, architect, build, and deploy are one production path—not
            four disconnected workshops.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}

/* ============================================================================
   STAGE COPY
============================================================================ */

function StageContent({ stage }: { stage: Stage }) {
  const reduceMotion = useReducedMotion();

  if (stage.label === "Architect") {
    return (
      <ArchitectStageContent
        stage={stage}
        reduceMotion={Boolean(reduceMotion)}
      />
    );
  }

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pb-16 sm:pb-24 [font-family:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-12 xl:gap-16">
        <div className="min-w-0 max-w-[620px]">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-[#CFE0FA] bg-white px-4 py-2 text-sm font-semibold text-[#1463FF]"
            >
              {stage.duration}
            </Badge>

            <span className="text-sm font-semibold text-[#1463FF]">
              {stage.label}
            </span>
          </div>

          <h3 className="mt-7 max-w-[620px] text-[clamp(2.45rem,4.2vw,4.95rem)] font-normal leading-[0.96] tracking-[-0.06em] text-[#071126]">
            {stage.title}
          </h3>

          <p className="mt-6 max-w-[600px] text-base leading-8 text-[#5D6C84] sm:text-lg">
            {stage.description}
          </p>

          <Separator className="my-7 max-w-[620px] bg-[#DCE8F8]" />

          <div className="border-l-2 border-[#1463FF] pl-5 sm:pl-6">
            <p className="max-w-[590px] text-xl leading-8 tracking-[-0.03em] text-[#172033] sm:text-2xl">
              {stage.result}
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {stage.outputs.map((output) => (
              <li
                key={output}
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#EAF2FF] px-4 text-sm font-medium text-[#164EA9]"
              >
                <Check className="h-4 w-4 text-[#1463FF]" strokeWidth={2.4} />
                {output}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <div className="rounded-[28px] border border-[#DCE8F8] bg-white/40 p-4 shadow-[0_20px_60px_-48px_rgba(13,66,170,0.24)] backdrop-blur-[2px] sm:p-6">
            {stage.content}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ArchitectStageContent({
  stage,
  reduceMotion,
}: {
  stage: Stage;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="pb-16 sm:pb-24 [font-family:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
        {/* COPY — deliberately clean: no output chips / dialog pills. */}
        <div className="min-w-0 max-w-[620px]">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#1463FF]">
            <span>{stage.label}</span>
            <span className="h-1 w-1 rounded-full bg-[#9CBDF5]" />
            <span className="text-[#657995]">{stage.duration}</span>
          </div>

          <h3 className="mt-6 text-[clamp(2.65rem,4.25vw,5rem)] font-normal leading-[0.95] tracking-[-0.06em] text-[#071126]">
            {stage.title}
          </h3>

          <p className="mt-7 max-w-[580px] text-base leading-8 text-[#5D6C84] sm:text-lg">
            {stage.description}
          </p>

          <div className="mt-8 border-l-2 border-[#1463FF] pl-5 sm:pl-6">
            <p className="max-w-[560px] text-xl leading-8 tracking-[-0.03em] text-[#172033] sm:text-2xl">
              {stage.result}
            </p>
          </div>
        </div>

        {/* INFOGRAPHIC — 2D, wider for optimal readability. */}
        <div className="min-w-0">
          <div className="rounded-[28px] border border-[#DCE8F8] bg-white/40 p-4 shadow-[0_20px_60px_-48px_rgba(13,66,170,0.24)] backdrop-blur-[2px] sm:p-6">
            {stage.content}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================================
   SCANNER PRIMITIVE
   ----------------------------------------------------------------------------
   This is the reusable adaptation of the supplied component.
   The system nodes are Lucide icons, not embedded custom SVG logos.
============================================================================ */

function EngineeringScanner({
  items,
  status,
  substatus,
  reduceMotion,
  centerLabel,
}: {
  items: ScanItem[];
  status: string;
  substatus: string;
  reduceMotion: boolean;
  centerLabel?: string;
}) {
  const sizes = [
    "h-10 w-10 sm:h-12 sm:w-12",
    "h-12 w-12 sm:h-16 sm:w-16",
    "h-16 w-16 sm:h-20 sm:w-20",
    "h-12 w-12 sm:h-16 sm:w-16",
    "h-10 w-10 sm:h-12 sm:w-12",
  ];

  return (
    <div className="relative isolate min-h-[250px] overflow-hidden py-6 sm:min-h-[290px] sm:py-8">
      {/* radial engineering field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[4%] top-4 h-[270px] rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(20,99,255,0.075),rgba(20,99,255,0.015)_46%,transparent_76%)] [mask-image:radial-gradient(60%_64%_at_50%_50%,black_0%,transparent_100%)] sm:h-[320px]"
      />

      {/* system nodes */}
      <div className="relative z-20 mx-auto flex max-w-[860px] items-center justify-center gap-3 px-2 sm:gap-5 md:gap-8">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={`${item.label}-${index}`}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, index === 2 ? -5 : -3, 0],
                      scale: [1, index === 2 ? 1.035 : 1.02, 1],
                    }
              }
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.16,
              }}
              className="flex min-w-0 flex-col items-center"
            >
              <div
                className={[
                  "relative flex shrink-0 items-center justify-center rounded-full border border-[#BFD3F3] bg-white text-[#1463FF]",
                  "shadow-[0_14px_34px_-24px_rgba(20,99,255,0.65),inset_0_0_0_1px_rgba(20,99,255,0.035)]",
                  sizes[index] ?? sizes[2],
                  index === 2 ? "border-[#1463FF] bg-[#EAF2FF]" : "",
                ].join(" ")}
              >
                <Icon
                  className={
                    index === 2
                      ? "h-7 w-7 sm:h-9 sm:w-9"
                      : "h-5 w-5 sm:h-6 sm:w-6"
                  }
                  strokeWidth={1.75}
                />

                {index === 2 ? (
                  <span className="absolute -bottom-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#1463FF]" />
                ) : null}
              </div>

              <span
                className={[
                  "mt-3 max-w-[110px] text-center text-[11px] font-semibold leading-4 sm:text-xs",
                  index === 2 ? "text-[#164EA9]" : "text-[#6D7D95]",
                ].join(" ")}
              >
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* moving scanner + pixel trail */}
      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-7 left-1/2 z-30 w-full -translate-x-1/2"
          animate={{ x: ["-43%", "43%", "-43%"] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-1/2 top-0 h-[230px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#1463FF] to-transparent sm:h-[280px]" />

          <div className="absolute left-[calc(50%-44px)] top-1/2 grid h-[118px] w-[42px] -translate-y-1/2 grid-cols-4 gap-[3px] opacity-70 [mask-image:linear-gradient(to_left,black,transparent)]">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="block h-[4px] w-[4px] rounded-[1px] bg-[#1463FF]"
                style={{
                  opacity:
                    i % 7 === 0
                      ? 0.9
                      : i % 5 === 0
                        ? 0.68
                        : i % 3 === 0
                          ? 0.46
                          : 0.22,
                }}
              />
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* machine rail */}
      <div className="relative z-10 mx-auto mt-12 flex max-w-[860px] items-center px-4 sm:mt-16">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#1463FF] bg-white" />
        <div className="h-px flex-1 bg-[#CFE0FA]" />
        <span className="mx-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#7890B8]">
          {centerLabel ?? "system scan"}
        </span>
        <div className="h-px flex-1 bg-[#CFE0FA]" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#1463FF]" />
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45 }}
        className="relative z-20 mx-auto mt-7 max-w-[720px] text-center"
      >
        <p className="text-lg font-semibold tracking-[-0.025em] text-[#123365] sm:text-xl">
          {status}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#71809A] sm:text-base">
          {substatus}
        </p>
      </motion.div>
    </div>
  );
}

/* ============================================================================
   01 DISCOVER
============================================================================ */

function DiscoverSystem({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <EngineeringScanner
        reduceMotion={reduceMotion}
        centerLabel="operating surface"
        status="Turn tribal knowledge into an inspectable operating model."
        substatus="People, spreadsheets, handoffs, and source systems are scanned as one real workflow—not as separate departments."
        items={[
          { icon: Factory, label: "Operating floor" },
          { icon: FileSpreadsheet, label: "Manual records" },
          { icon: ScanSearch, label: "Inspect + map" },
          { icon: Users, label: "Human handoffs" },
          { icon: Database, label: "Source systems" },
        ]}
      />

      <div className="mx-auto grid max-w-[760px] gap-3 px-1 pb-2 sm:grid-cols-3">
        <SignalFact icon={Workflow} value="Flow" label="What moves where" />
        <SignalFact icon={Users} value="Owners" label="Who decides" />
        <SignalFact icon={ClipboardCheck} value="Evidence" label="What proves it" />
      </div>
    </div>
  );
}

/* ============================================================================
   02 ARCHITECT
   ----------------------------------------------------------------------------
   2D VERTICAL ARCHITECTURE STACK

   - Copy is rendered on the left by ArchitectStageContent.
   - This component owns ONLY the right-side infographic.
   - No isometric transforms, no oversized blocks, no floating dialog boxes.
   - Lucide icons provide the vector language; no hand-authored SVGs.
============================================================================ */

function ArchitectSystem({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="[font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      {/* Desktop / tablet topology */}
      <div className="hidden md:block">
        <DesktopArchitectureMap reduceMotion={reduceMotion} />
      </div>

      {/* Mobile: same architecture, reflowed for readability */}
      <div className="md:hidden">
        <MobileArchitectureMap reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

function DesktopArchitectureMap({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <div className="relative mx-auto min-h-[480px] w-full max-w-[780px] overflow-hidden bg-transparent px-2 py-6">
      {/* Light engineering grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.045)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(ellipse_92%_92%_at_50%_50%,black_30%,transparent_100%)]"
      />

      {/* ------------------------------------------------------------------
          TOP RUNTIME LAYERS
          API GATEWAY -> SERVICE LAYER -> DATA LAYER
      ------------------------------------------------------------------- */}
      <div className="relative z-20 grid grid-cols-3 items-center gap-6 px-4 pt-6">
        <ArchitectNode
          icon={Network}
          title="API Gateway"
          detail="EDGE REQUESTS"
        />

        <ArchitectNode
          icon={Boxes}
          title="Service Layer"
          detail="BUSINESS LOGIC"
          active
        />

        <ArchitectNode
          icon={Database}
          title="Data Layer"
          detail="STATE + STORAGE"
        />
      </div>

      {/* API -> SERVICE */}
      <DesktopHorizontalConnector
        className="left-[31%] top-[86px] w-[5%]"
        label="REQUEST"
        reduceMotion={reduceMotion}
        delay={0}
      />

      {/* SERVICE -> DATA */}
      <DesktopHorizontalConnector
        className="left-[64%] top-[86px] w-[5%]"
        label="QUERY"
        reduceMotion={reduceMotion}
        delay={0.35}
      />

      {/* ------------------------------------------------------------------
          CONTROL / OBSERVABILITY PLANE (Aligned with Service & Data layers)
      ------------------------------------------------------------------- */}
      <div className="relative z-20 mt-16 grid grid-cols-3 gap-6 px-4">
        <div className="hidden sm:block" />

        <ArchitectNode
          icon={ShieldCheck}
          title="Auth / Policy"
          detail="IDENTITY + RULES"
          compact
        />

        <ArchitectNode
          icon={Gauge}
          title="Observability"
          detail="LOGS + TRACES"
          compact
        />
      </div>

      {/* SERVICE -> POLICY */}
      <DesktopVerticalConnector
        className="left-[50%] top-[158px] h-[48px]"
        label="POLICY"
        reduceMotion={reduceMotion}
        delay={0.5}
      />

      {/* DATA -> OBSERVABILITY */}
      <DesktopVerticalConnector
        className="left-[83.3%] top-[158px] h-[48px]"
        label="METRICS"
        reduceMotion={reduceMotion}
        delay={0.7}
      />

      {/* AUTH -> OBSERVABILITY */}
      <DesktopHorizontalConnector
        className="left-[64%] top-[252px] w-[5%]"
        label="AUDIT"
        reduceMotion={reduceMotion}
        delay={0.9}
      />

      {/* Bottom architecture datum */}
      <div className="relative z-20 mx-4 mt-12 flex items-center gap-3 border-t border-[#DCE8F8] pt-5">
        <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
        <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#6F8EBB]">
          Live data connection layer
        </span>
        <div className="h-px flex-1 bg-[#CFE0FA]" />
      </div>
    </div>
  );
}

function MobileArchitectureMap({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-[440px] py-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="relative z-10 py-2">
        <div>
          <ArchitectNode
            icon={Network}
            title="API Gateway"
            detail="EDGE REQUESTS"
          />
        </div>

        <MobileConnector
          label="REQUEST"
          reduceMotion={reduceMotion}
          delay={0}
        />

        <ArchitectNode
          icon={Boxes}
          title="Service Layer"
          detail="BUSINESS LOGIC"
          active
        />

        <MobileConnector
          label="QUERY"
          reduceMotion={reduceMotion}
          delay={0.25}
        />

        <ArchitectNode
          icon={Database}
          title="Data Layer"
          detail="STATE + STORAGE"
        />

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#CFE0FA]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7891B6]">
            Control plane
          </span>
          <div className="h-px flex-1 bg-[#CFE0FA]" />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <ArchitectNode
            icon={ShieldCheck}
            title="Auth / Policy"
            detail="IDENTITY + RULES"
            compact
          />
          <ArchitectNode
            icon={Gauge}
            title="Observability"
            detail="LOGS + TRACES"
            compact
          />
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6F8EBB]">
            Live data connection layer
          </span>
          <div className="h-px flex-1 bg-[#CFE0FA]" />
        </div>
      </div>
    </div>
  );
}

function ArchitectNode({
  icon: Icon,
  title,
  detail,
  active = false,
  compact = false,
}: {
  icon: IconType;
  title: string;
  detail: string;
  active?: boolean;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "relative z-20 min-w-0 rounded-[18px] border transition-all",
        "bg-white shadow-[0_10px_30px_-15px_rgba(7,26,51,0.06)]",
        active
          ? "border-[#1463FF] bg-[#F7FAFF] shadow-[0_14px_36px_-16px_rgba(20,99,255,0.2)]"
          : "border-[#D6E3F5] hover:border-[#B5CEF7]",
        compact ? "px-4 py-4 sm:px-4.5 sm:py-4.5" : "px-4 py-5 sm:px-5 sm:py-5",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            active
              ? "bg-[#1463FF] text-white"
              : "bg-[#EAF2FF] text-[#1463FF]",
          ].join(" ")}
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
        </span>

        <span
          className={[
            "mt-1.5 h-2 w-2 rounded-full",
            active ? "bg-[#1463FF]" : "bg-[#D0DFFA]",
          ].join(" ")}
        />
      </div>

      <p
        className={[
          "font-semibold tracking-[-0.03em] whitespace-nowrap",
          compact ? "mt-3.5 text-[14.5px] sm:text-[15.5px]" : "mt-4 text-[15.5px] sm:text-[16.5px]",
          active ? "text-[#1463FF]" : "text-[#071126]",
        ].join(" ")}
      >
        {title}
      </p>

      <p className="mt-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#657995]">
        {detail}
      </p>
    </motion.div>
  );
}

function DesktopHorizontalConnector({
  className,
  label,
  reduceMotion,
  delay,
}: {
  className: string;
  label: string;
  reduceMotion: boolean;
  delay: number;
}) {
  return (
    <div className={`absolute z-10 h-px bg-[#CFE0FA] ${className}`}>
      <span className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full border border-white bg-[#1463FF]" />
      <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full border border-white bg-[#1463FF]" />

      <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#6F8EBB]">
        {label}
      </span>

      {!reduceMotion ? (
        <motion.span
          className="absolute -top-[3px] h-2 w-2 rounded-full bg-[#1463FF]"
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{
            duration: 3.2,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : null}
    </div>
  );
}

function DesktopVerticalConnector({
  className,
  label,
  reduceMotion,
  delay,
}: {
  className: string;
  label: string;
  reduceMotion: boolean;
  delay: number;
}) {
  return (
    <div className={`absolute z-10 w-px bg-[#CFE0FA] ${className}`}>
      <span className="absolute -left-[3px] -top-1 h-2 w-2 rounded-full border border-white bg-[#1463FF]" />
      <span className="absolute -bottom-1 -left-[3px] h-2 w-2 rounded-full border border-white bg-[#1463FF]" />

      <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#6F8EBB]">
        {label}
      </span>

      {!reduceMotion ? (
        <motion.span
          className="absolute -left-[3px] h-2 w-2 rounded-full bg-[#1463FF]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : null}
    </div>
  );
}

function MobileConnector({
  label,
  reduceMotion,
  delay,
}: {
  label: string;
  reduceMotion: boolean;
  delay: number;
}) {
  return (
    <div className="relative mx-auto h-12 w-px bg-[#9DBCF0]">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#6F8EBB]">
        {label}
      </span>

      {!reduceMotion ? (
        <motion.span
          className="absolute -left-[3px] h-2 w-2 rounded-full bg-[#1463FF]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{
            duration: 2.8,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : (
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1463FF]" />
      )}
    </div>
  );
}

/* ============================================================================
   03 BUILD
   Scanner = engineering inspection layer.
   Kanban = retained delivery information architecture.
============================================================================ */

function BuildSystem({ reduceMotion }: { reduceMotion: boolean }) {
  const columns = [
    {
      title: "Backlog",
      tasks: ["Auth boundary", "Search API", "Audit model"],
    },
    {
      title: "In Progress",
      tasks: ["RAG pipeline", "Webhook sync"],
    },
    {
      title: "Review",
      tasks: ["Evaluation suite", "Access rules"],
    },
    {
      title: "Done",
      tasks: ["Schema design", "CI pipeline"],
    },
  ];

  return (
    <div className="relative overflow-hidden py-2 sm:py-3">
      <div className="mx-auto max-w-[760px] px-1 pb-3 sm:px-2">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE8F8] pb-5">
          <div className="flex items-center gap-3">
            <Braces className="h-5 w-5 text-[#1463FF]" />
            <span className="text-base font-semibold text-[#18315F]">
              Sprint 12
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#71809A]">
            <GitBranch className="h-4 w-4 text-[#1463FF]" />
            main
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {columns.map((column, columnIndex) => (
            <section key={column.title} className="min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1463FF]" />
                  <h4 className="text-sm font-semibold text-[#18315F]">
                    {column.title}
                  </h4>
                </div>

                <span className="font-mono text-[10px] text-[#8DA0BC]">
                  {String(column.tasks.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-5 space-y-1">
                {column.tasks.map((task, taskIndex) => {
                  const active = columnIndex === 1 && taskIndex === 0;

                  return (
                    <motion.div
                      layout
                      key={task}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.36,
                        delay: columnIndex * 0.055 + taskIndex * 0.035,
                      }}
                      className={[
                        "flex min-h-14 items-center justify-between gap-3 px-3 py-3",
                        active ? "bg-[#EAF2FF]" : "bg-transparent",
                      ].join(" ")}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={[
                            "h-2.5 w-2.5 shrink-0 rounded-full",
                            active ? "bg-[#1463FF]" : "bg-[#BFD3F3]",
                          ].join(" ")}
                        />
                        <span className="text-sm font-medium text-[#224579]">
                          {task}
                        </span>
                      </div>

                      <span className="font-mono text-[9px] text-[#98A9C1]">
                        ADR-{Math.floor(task.length * 13)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-[#DCE8F8] pt-5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1463FF]" />
          <div className="h-px flex-1 bg-[#CFE0FA]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F88AF]">
            working increment → review → release
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   04 DEPLOY
   ----------------------------------------------------------------------------
   Production engineering pipeline.
   RELEASE PACKAGE ↓ QUALITY GATE ↓ CONTROLLED RELEASE ↓ OBSERVE + OWN
   AnimatedBeam carries the production signal between real DOM nodes.
   One reverse beam communicates the rollback path.
============================================================================ */

function DeploySystem({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const releaseRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden py-3 sm:py-5">
      {/* =====================================================
          ENGINEERING SURFACE
      ====================================================== */}
      <div
        ref={containerRef}
        className="relative mx-auto min-h-[520px] w-full max-w-[760px] overflow-hidden px-2 py-6 sm:px-4 md:min-h-[420px] lg:px-6"
      >
        {/* ---------------------------------------------------
            VERY LIGHT TECHNICAL FIELD
            No card/background enclosure. Just enough geometry to make
            the pipeline readable.
        ---------------------------------------------------- */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_90%)]"
        />

        {/* ---------------------------------------------------
            PIPELINE
            Mobile: vertical
            Desktop: horizontal
            AnimatedBeam reads actual DOM coordinates, so no manually
            drawn responsive SVG is needed.
        ---------------------------------------------------- */}
        <div className="relative z-20 grid min-h-[420px] grid-cols-1 items-center gap-8 md:min-h-[320px] md:grid-cols-4 md:gap-4">
          {/* 01 ------------------------------------------------ */}
          <DeployNode
            ref={packageRef}
            index="01"
            icon={PackageCheck}
            title="Release package"
            description="Versioned and reproducible."
          />

          {/* 02 ------------------------------------------------ */}
          <DeployNode
            ref={gateRef}
            index="02"
            icon={ShieldCheck}
            title="Quality gate"
            description="Tests, policy and approval."
            active
          />

          {/* 03 ------------------------------------------------ */}
          <DeployNode
            ref={releaseRef}
            index="03"
            icon={CloudUpload}
            title="Controlled release"
            description="Progressive and rollback-ready."
          />

          {/* 04 ------------------------------------------------ */}
          <DeployNode
            ref={runtimeRef}
            index="04"
            icon={Gauge}
            title="Observe + own"
            description="Telemetry, alerts and handover."
          />
        </div>

        {/* =====================================================
            ANIMATED PRODUCTION SIGNAL
        ====================================================== */}
        {!reduceMotion && (
          <>
            {/* package -> quality */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={packageRef}
              toRef={gateRef}
              duration={5.2}
              delay={0}
              pathColor="#CFE0FA"
              pathWidth={2}
              pathOpacity={0.75}
              gradientStartColor="#1463FF"
              gradientStopColor="#79A7FF"
            />

            {/* quality -> release */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={gateRef}
              toRef={releaseRef}
              duration={5.2}
              delay={0.45}
              pathColor="#CFE0FA"
              pathWidth={2}
              pathOpacity={0.75}
              gradientStartColor="#1463FF"
              gradientStopColor="#79A7FF"
            />

            {/* release -> observability */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={releaseRef}
              toRef={runtimeRef}
              duration={5.2}
              delay={0.9}
              pathColor="#CFE0FA"
              pathWidth={2}
              pathOpacity={0.75}
              gradientStartColor="#1463FF"
              gradientStopColor="#79A7FF"
            />

            {/* -------------------------------------------------
                ROLLBACK / FEEDBACK PATH
                This is intentionally subtler. It communicates:
                observe → detect → rollback/release control
                without adding another diagram.
            -------------------------------------------------- */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={releaseRef}
              toRef={runtimeRef}
              reverse
              curvature={82}
              duration={7}
              delay={1.4}
              pathColor="#DCE8F8"
              pathWidth={1.25}
              pathOpacity={0.35}
              gradientStartColor="#8EB5FF"
              gradientStopColor="#1463FF"
            />
          </>
        )}

        {/* =====================================================
            PRODUCTION STATE
        ====================================================== */}
        <div className="relative z-20 mx-auto mt-1 flex max-w-[820px] flex-col items-center justify-center gap-3 border-t border-[#DCE8F8] pt-7 sm:flex-row sm:gap-8 md:mt-10">
          <ProductionState icon={Check}>
            Release controlled
          </ProductionState>
          <ProductionState icon={RotateCcw}>
            Rollback ready
          </ProductionState>
          <ProductionState icon={Gauge}>
            Runtime visible
          </ProductionState>
          <ProductionState icon={Server}>
            Ownership handed over
          </ProductionState>
        </div>
      </div>
    </div>
  );
}

type DeployNodeProps = {
  index: string;
  icon: ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  title: string;
  description: string;
  active?: boolean;
};

const DeployNode = forwardRef<HTMLDivElement, DeployNodeProps>(
  (
    {
      index,
      icon: Icon,
      title,
      description,
      active = false,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className="relative z-20 flex flex-col items-center text-center"
      >
        {/* NUMBER */}
        <span className="mb-4 font-mono text-[10px] tracking-[0.16em] text-[#7D94B9]">
          {index}
        </span>

        {/* =====================================================
            MACHINE NODE
        ====================================================== */}
        <div
          className={`relative flex h-[116px] w-[116px] items-center justify-center rounded-[28px] border transition-colors sm:h-[132px] sm:w-[132px] ${
            active
              ? `border-[#1463FF] bg-[#EAF2FF]`
              : `border-[#BFD3F3] bg-white`
          }`}
        >
          {/* MACHINE CORNER */}
          <span className="absolute left-3 top-3 font-mono text-[8px] tracking-[0.12em] text-[#8EA2C1]">
            SYS/{index}
          </span>

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${
              active
                ? `bg-[#1463FF] text-white`
                : `bg-[#F4F8FF] text-[#1463FF]`
            }`}
          >
            <Icon className="h-7 w-7" strokeWidth={1.65} />
          </div>

          {/* ACTIVE STATUS */}
          {active && (
            <span className="absolute bottom-3 right-3 h-2.5 w-2.5 rounded-full bg-[#1463FF]" />
          )}
        </div>

        {/* =====================================================
            LABEL
        ====================================================== */}
        <h4 className="mt-5 text-lg font-semibold tracking-[-0.035em] text-[#122B55] sm:text-xl">
          {title}
        </h4>
        <p className="mt-2 max-w-[190px] text-sm leading-6 text-[#71809A]">
          {description}
        </p>
      </div>
    );
  },
);
DeployNode.displayName = "DeployNode";

function ProductionState({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-[#486284]">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1463FF]">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
      <span>{children}</span>
    </div>
  );
}

/* ============================================================================
   SMALL SUPPORTING FACT
============================================================================ */

function SignalFact({
  icon: Icon,
  value,
  label,
}: {
  icon: IconType;
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-h-20 items-center gap-3 border-t border-[#DCE8F8] px-2 pt-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1463FF]">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>

      <div>
        <p className="text-sm font-semibold text-[#173A72]">{value}</p>
        <p className="mt-0.5 text-xs leading-5 text-[#71809A]">{label}</p>
      </div>
    </div>
  );
}