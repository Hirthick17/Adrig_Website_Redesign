"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

import {
  Boxes,
  Braces,
  Check,
  CloudCog,
  ScanSearch,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import type { MotionValue } from "framer-motion";

/* ============================================================
   TYPES
============================================================ */

type StageVisual =
  | "discover"
  | "architect"
  | "build"
  | "deploy";

type TraceDirection =
  | "vertical-left"
  | "horizontal-top"
  | "vertical-right"
  | "horizontal-bottom";

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
};

type Props = {
  stages?: ProcessStage[];
  className?: string;
};

/* ============================================================
   DATA
============================================================ */

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    label: "Discover",

    title:
      "Map the operation before building the system.",

    description:
      "We trace decisions, data, handoffs, workarounds, and failure points with the people who actually run the operation. Nothing gets automated until the operating reality is visible.",

    result:
      "A scoped problem with evidence, owners, boundaries, and success measures.",

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
      "Turn operating reality into a system everyone can verify.",

    description:
      "We define boundaries, integrations, intelligence layers, observability, security, and deployment constraints before expensive implementation begins.",

    result:
      "A buildable architecture the business and engineering teams can both inspect.",

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
      "Each cycle connects production-like data, tests one valuable workflow, and puts the result in front of stakeholders. Progress is demonstrated in working software, not presentation slides.",

    result:
      "Tested increments with visible progress, evaluation evidence, and accountable decisions.",

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
      "Release health, monitoring, alerts, rollback paths, documentation, and team handover are part of deployment itself — not work postponed until after launch.",

    result:
      "An observable production system your team can operate with confidence.",

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

const DIRECTIONS: TraceDirection[] = [
  "vertical-left",
  "horizontal-top",
  "vertical-right",
  "horizontal-bottom",
];

/* ============================================================
   MAIN
============================================================ */

export default function AdrigProcessSection({
  stages = PROCESS_STAGES,
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-we-work"
      aria-labelledby="process-heading"
      className={`
        relative overflow-hidden
        border-y border-[#DCE5F2]
        bg-[#F7F9FC]
        ${className}
      `}
    >
      {/* subtle technical grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,rgba(14,92,238,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.035)_1px,transparent_1px)]
          bg-[size:72px_72px]
          [mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_92%,transparent)]
        "
      />

      <div
        className="
          relative z-10
          mx-auto
          max-w-[1600px]
          px-5 sm:px-8 lg:px-12
        "
      >
        {/* ======================================================
            INTRO
        ====================================================== */}

        <motion.header
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
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
          className="py-24 sm:py-32"
        >
          <div
            className="
              grid gap-10
              lg:grid-cols-[0.38fr_1.62fr]
            "
          >
            <p
              className="
                text-base
                font-medium
                text-[#0E5CEE]
              "
            >
              How ADRIG works
            </p>

            <div>
              <h2
                id="process-heading"
                className="
                  max-w-[1150px]
                  text-[clamp(3.4rem,6vw,7rem)]
                  font-normal
                  leading-[0.92]
                  tracking-[-0.07em]
                  text-[#0B1220]
                "
              >
                From operating reality

                <span
                  className="
                    block
                    text-[#0E5CEE]
                  "
                >
                  to controlled production.
                </span>
              </h2>

              <p
                className="
                  mt-8
                  max-w-[720px]
                  text-lg
                  leading-8
                  text-slate-500
                "
              >
                Four stages. One continuous evidence trail.
                The system becomes clearer as the line moves.
              </p>
            </div>
          </div>
        </motion.header>

        {/* ======================================================
            PROCESS
        ====================================================== */}

        <div>
          {stages.map((stage, index) => (
            <ProcessStage
              key={stage.number}
              stage={stage}
              index={index}
              direction={
                DIRECTIONS[index] ??
                "vertical-left"
              }
              reduceMotion={Boolean(
                reduceMotion
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STAGE
============================================================ */

function ProcessStage({
  stage,
  index,
  direction,
  reduceMotion,
}: {
  stage: ProcessStage;
  index: number;
  direction: TraceDirection;
  reduceMotion: boolean;
}) {
  const ref =
    useRef<HTMLElement>(null);

  const StageIcon =
    stage.icon;

  const {
    scrollYProgress,
  } = useScroll({
    target: ref,

    /*
     * Because the article itself is taller than
     * the sticky stage, this gives us a clean
     * 0 → 1 progress value while the viewport
     * remains visually locked.
     */
    offset: [
      "start start",
      "end end",
    ],
  });

  /* ----------------------------------------------------------
     TRACE

     Rail draws first.
     ---------------------------------------------------------- */

  const traceProgress =
    useTransform(
      scrollYProgress,
      [0.08, 0.46],
      [0, 1]
    );

  /* ----------------------------------------------------------
     COPY
  ---------------------------------------------------------- */

  const copyOpacity =
    useTransform(
      scrollYProgress,
      [
        0.12,
        0.28,
        0.84,
        0.98,
      ],
      [
        0.2,
        1,
        1,
        0.35,
      ]
    );

  const copyY =
    useTransform(
      scrollYProgress,
      [0.12, 0.34],
      [30, 0]
    );

  /* ----------------------------------------------------------
     SVG
  ---------------------------------------------------------- */

  const visualOpacity =
    useTransform(
      scrollYProgress,
      [
        0.20,
        0.38,
        0.88,
        1,
      ],
      [
        0.1,
        1,
        1,
        0.4,
      ]
    );

  const visualScale =
    useTransform(
      scrollYProgress,
      [
        0.18,
        0.48,
        0.88,
        1,
      ],
      [
        0.96,
        1,
        1,
        0.985,
      ]
    );

  /*
   * Passed into the SVG.
   *
   * Internal connectors therefore draw
   * from the SAME scroll signal as the
   * external process rail.
   */

  const svgProgress =
    useTransform(
      scrollYProgress,
      [0.26, 0.7],
      [0, 1]
    );

  const reverse =
    direction ===
    "vertical-right";

  return (
    <article
      ref={ref}
      id={`process-stage-${index}`}
      className="
        relative
        scroll-mt-28
        border-t border-[#DCE5F2]
        lg:min-h-[142svh]
      "
    >
      {/* sticky stage */}

      <div
        className="
          relative py-16
          sm:py-20
          lg:sticky
          lg:top-[102px]
          lg:flex
          lg:h-[calc(100svh-130px)]
          lg:items-center
          lg:py-5
        "
      >
        <div
          className="
            relative w-full
            overflow-hidden
            rounded-[34px]
            border border-[#C9D9F4]
            bg-white
            shadow-[0_28px_90px_rgba(15,23,42,0.055)]
          "
        >
          {/* LINE */}

          <ProcessTrace
            direction={direction}
            progress={
              traceProgress
            }
            number={stage.number}
            label={stage.label}
            reduceMotion={
              reduceMotion
            }
          />

          {/* CONTENT */}

          <div
            className={`
              relative grid
              min-h-[760px]
              items-center
              gap-12
              px-8 py-20

              sm:px-12

              lg:min-h-[690px]
              lg:grid-cols-2
              lg:gap-16
              lg:px-20

              ${
                direction ===
                "vertical-left"
                  ? "lg:pl-28"
                  : ""
              }

              ${
                direction ===
                "vertical-right"
                  ? "lg:pr-28"
                  : ""
              }

              ${
                direction ===
                "horizontal-top"
                  ? "lg:pt-28"
                  : ""
              }

              ${
                direction ===
                "horizontal-bottom"
                  ? "lg:pb-28"
                  : ""
              }
            `}
          >
            {/* ==================================================
                COPY
            ================================================== */}

            <motion.div
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity:
                        copyOpacity,

                      y: copyY,
                    }
              }
              className={
                reverse
                  ? "lg:order-2"
                  : ""
              }
            >
              <div
                className="
                  flex items-center
                  gap-3
                "
              >
                <span
                  className="
                    flex h-12 w-12
                    items-center
                    justify-center
                    rounded-full
                    border border-[#BFD3F4]
                    bg-[#EDF4FF]
                    text-[#0E5CEE]
                  "
                >
                  <StageIcon
                    className="h-5 w-5"
                  />
                </span>

                <span
                  className="
                    text-base
                    font-semibold
                    text-[#0E5CEE]
                  "
                >
                  {stage.duration}
                </span>
              </div>

              <h3
                className="
                  mt-9
                  max-w-[700px]
                  text-[clamp(2.8rem,4.7vw,5.6rem)]
                  font-normal
                  leading-[0.94]
                  tracking-[-0.062em]
                  text-[#0B1220]
                "
              >
                {stage.title}
              </h3>

              <p
                className="
                  mt-7
                  max-w-[650px]
                  text-[17px]
                  leading-8
                  text-slate-500
                  sm:text-lg
                "
              >
                {stage.description}
              </p>

              <div
                className="
                  mt-10
                  border-t
                  border-[#DCE5F2]
                  pt-7
                "
              >
                <p
                  className="
                    max-w-[640px]
                    text-[clamp(1.35rem,2vw,2rem)]
                    leading-[1.22]
                    tracking-[-0.035em]
                    text-[#0B1220]
                  "
                >
                  {stage.result}
                </p>
              </div>

              <div
                className="
                  mt-8
                  flex flex-wrap
                  gap-3
                "
              >
                {stage.outputs.map(
                  (output) => (
                    <span
                      key={output}
                      className="
                        inline-flex
                        min-h-11
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#C9D9F4]
                        bg-[#F8FAFD]
                        px-4
                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      <span
                        className="
                          flex h-5 w-5
                          items-center
                          justify-center
                          rounded-full
                          bg-[#0E5CEE]
                          text-white
                        "
                      >
                        <Check
                          className="h-3 w-3"
                          strokeWidth={3}
                        />
                      </span>

                      {output}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* ==================================================
                LIGHT SVG
            ================================================== */}

            <motion.div
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity:
                        visualOpacity,

                      scale:
                        visualScale,
                    }
              }
              className={
                reverse
                  ? "lg:order-1"
                  : ""
              }
            >
              <div
                className="
                  mx-auto
                  aspect-[4/3]
                  w-full
                  max-w-[760px]
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[#D8E5F7]
                  bg-[#F8FBFF]
                "
              >
                <StageVisual
                  visual={
                    stage.visual
                  }
                  progress={
                    svgProgress
                  }
                  reduceMotion={
                    reduceMotion
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   PROCESS TRACE
============================================================ */

function ProcessTrace({
  direction,
  progress,
  number,
  label,
  reduceMotion,
}: {
  direction: TraceDirection;
  progress: MotionValue<number>;
  number: string;
  label: string;
  reduceMotion: boolean;
}) {
  const scale =
    reduceMotion
      ? 1
      : progress;

  return (
    <>
      {/* MOBILE:
          always top → bottom
      */}

      <div
        className="
          absolute
          bottom-0
          left-6
          top-0
          z-20
          w-[2px]
          bg-[#DCE7F6]
          lg:hidden
        "
      >
        <motion.div
          style={{
            scaleY: scale,
          }}
          className="
            absolute inset-0
            origin-top
            bg-[#0E5CEE]
          "
        />
      </div>

      {/* DESKTOP */}

      <div className="hidden lg:block">

        {/* 01 */}

        {direction ===
          "vertical-left" && (
          <>
            <div
              className="
                absolute
                bottom-0
                left-12
                top-0
                z-20
                w-[2px]
                bg-[#DCE7F6]
              "
            >
              <motion.div
                style={{
                  scaleY: scale,
                }}
                className="
                  absolute inset-0
                  origin-top
                  bg-[#0E5CEE]
                "
              />
            </div>

            <div
              className="
                absolute
                left-[20px]
                top-1/2
                z-30
                -translate-y-1/2
                -rotate-90
                whitespace-nowrap
                text-base
                font-semibold
                tracking-[0.12em]
                text-[#0E5CEE]
              "
            >
              {number} · {label}
            </div>
          </>
        )}

        {/* 02 */}

        {direction ===
          "horizontal-top" && (
          <>
            <div
              className="
                absolute
                left-0
                right-0
                top-12
                z-20
                h-[2px]
                bg-[#DCE7F6]
              "
            >
              <motion.div
                style={{
                  scaleX: scale,
                }}
                className="
                  absolute inset-0
                  origin-left
                  bg-[#0E5CEE]
                "
              />
            </div>

            <div
              className="
                absolute
                left-16
                top-[28px]
                z-30
                bg-white
                px-4
                text-base
                font-semibold
                tracking-[0.12em]
                text-[#0E5CEE]
              "
            >
              {number} · {label}
            </div>
          </>
        )}

        {/* 03 */}

        {direction ===
          "vertical-right" && (
          <>
            <div
              className="
                absolute
                bottom-0
                right-12
                top-0
                z-20
                w-[2px]
                bg-[#DCE7F6]
              "
            >
              <motion.div
                style={{
                  scaleY: scale,
                }}
                className="
                  absolute inset-0
                  origin-top
                  bg-[#0E5CEE]
                "
              />
            </div>

            <div
              className="
                absolute
                right-[18px]
                top-1/2
                z-30
                -translate-y-1/2
                rotate-90
                whitespace-nowrap
                text-base
                font-semibold
                tracking-[0.12em]
                text-[#0E5CEE]
              "
            >
              {number} · {label}
            </div>
          </>
        )}

        {/* 04 */}

        {direction ===
          "horizontal-bottom" && (
          <>
            <div
              className="
                absolute
                bottom-12
                left-0
                right-0
                z-20
                h-[2px]
                bg-[#DCE7F6]
              "
            >
              <motion.div
                style={{
                  scaleX: scale,
                }}
                className="
                  absolute inset-0
                  origin-right
                  bg-[#0E5CEE]
                "
              />
            </div>

            <div
              className="
                absolute
                bottom-[28px]
                right-16
                z-30
                bg-white
                px-4
                text-base
                font-semibold
                tracking-[0.12em]
                text-[#0E5CEE]
              "
            >
              {number} · {label}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ============================================================
   SVG ROUTER
============================================================ */

function StageVisual({
  visual,
  progress,
  reduceMotion,
}: {
  visual: StageVisual;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  switch (visual) {
    case "discover":
      return (
        <DiscoverSVG
          progress={progress}
          reduceMotion={
            reduceMotion
          }
        />
      );

    case "architect":
      return (
        <ArchitectSVG
          progress={progress}
          reduceMotion={
            reduceMotion
          }
        />
      );

    case "build":
      return (
        <BuildSVG
          progress={progress}
          reduceMotion={
            reduceMotion
          }
        />
      );

    default:
      return (
        <DeploySVG
          progress={progress}
          reduceMotion={
            reduceMotion
          }
        />
      );
  }
}

/* ============================================================
   01 — DISCOVER

   Replaces the old sticky-note board.

   The new visual explicitly shows:
   source systems → workflow → bottleneck → owner.
============================================================ */

function DiscoverSVG({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const draw =
    useTransform(
      progress,
      [0.02, 0.75],
      [0, 1]
    );

  return (
    <svg
      viewBox="0 0 760 560"
      className="h-full w-full"
      role="img"
    >
      <title>
        Operating workflow mapping
      </title>

      <rect
        width="760"
        height="560"
        fill="#F8FBFF"
      />

      {/* GRID */}

      <g
        stroke="#E1EBF8"
        strokeWidth="1"
      >
        {Array.from({
          length: 12,
        }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 70}
            y1="0"
            x2={i * 70}
            y2="560"
          />
        ))}

        {Array.from({
          length: 9,
        }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 70}
            x2="760"
            y2={i * 70}
          />
        ))}
      </g>

      {/* OPERATION TRACE */}

      <motion.path
        d="
          M110 145
          H300
          V265
          H470
          V145
          H650

          M300 265
          V410
          H520
          V360
          H650
        "
        fill="none"
        stroke="#0E5CEE"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength:
            reduceMotion
              ? 1
              : draw,
        }}
      />

      <SVGNode
        x={55}
        y={105}
        title="CRM"
        subtitle="customer state"
      />

      <SVGNode
        x={560}
        y={105}
        title="ERP"
        subtitle="system state"
      />

      <SVGNode
        x={70}
        y={370}
        title="Review"
        subtitle="human handoff"
      />

      <SVGNode
        x={555}
        y={330}
        title="Outcome"
        subtitle="next action"
      />

      {/* BOTTLENECK */}

      <rect
        x="265"
        y="218"
        width="235"
        height="112"
        rx="26"
        fill="#0E5CEE"
      />

      <text
        x="296"
        y="265"
        fill="white"
        fontFamily="Inter, Arial"
        fontSize="22"
        fontWeight="700"
      >
        Bottleneck found
      </text>

      <text
        x="296"
        y="298"
        fill="#DCE8FF"
        fontFamily="Inter, Arial"
        fontSize="16"
      >
        manual approval loop
      </text>

      {/* OWNER */}

      <circle
        cx="375"
        cy="465"
        r="38"
        fill="#EDF4FF"
        stroke="#BFD3F4"
        strokeWidth="3"
      />

      <circle
        cx="375"
        cy="449"
        r="12"
        fill="#0E5CEE"
      />

      <path
        d="M350 486 Q375 458 400 486"
        fill="none"
        stroke="#0E5CEE"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <text
        x="430"
        y="459"
        fill="#0B1220"
        fontFamily="Inter, Arial"
        fontSize="18"
        fontWeight="700"
      >
        Owner identified
      </text>

      <text
        x="430"
        y="487"
        fill="#64748B"
        fontFamily="Inter, Arial"
        fontSize="15"
      >
        evidence attached
      </text>
    </svg>
  );
}

/* ============================================================
   02 — ARCHITECT
============================================================ */

function ArchitectSVG({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const draw =
    useTransform(
      progress,
      [0.05, 0.75],
      [0, 1]
    );

  return (
    <svg
      viewBox="0 0 760 560"
      className="h-full w-full"
      role="img"
    >
      <title>
        Verified system architecture
      </title>

      <rect
        width="760"
        height="560"
        fill="#F8FBFF"
      />

      {/* SYSTEM BOUNDARY */}

      <rect
        x="48"
        y="58"
        width="664"
        height="442"
        rx="34"
        fill="#FFFFFF"
        stroke="#BFD3F4"
        strokeWidth="3"
        strokeDasharray="10 10"
      />

      {/* CONNECTION GRAPH */}

      <motion.path
        d="
          M175 175
          H300
          H460
          H585

          M380 215
          V342
          H250

          M380 342
          H560
        "
        fill="none"
        stroke="#0E5CEE"
        strokeWidth="5"
        strokeLinecap="round"
        style={{
          pathLength:
            reduceMotion
              ? 1
              : draw,
        }}
      />

      <SVGNode
        x={70}
        y={128}
        title="Gateway"
        subtitle="requests"
      />

      <SVGNode
        x={302}
        y={128}
        title="Service"
        subtitle="business logic"
        active
      />

      <SVGNode
        x={535}
        y={128}
        title="Data"
        subtitle="state"
      />

      <SVGNode
        x={180}
        y={350}
        title="Policy"
        subtitle="identity"
      />

      <SVGNode
        x={490}
        y={350}
        title="Observe"
        subtitle="logs + traces"
      />

      <rect
        x="274"
        y="260"
        width="216"
        height="65"
        rx="18"
        fill="#EDF4FF"
        stroke="#BFD3F4"
        strokeWidth="3"
      />

      <text
        x="309"
        y="301"
        fill="#0E5CEE"
        fontFamily="Inter, Arial"
        fontSize="20"
        fontWeight="700"
      >
        verified boundary
      </text>
    </svg>
  );
}

/* ============================================================
   03 — BUILD

   Replaces generic Kanban with a meaningful
   evidence loop:
   module → test → review → evidence → accepted.
============================================================ */

function BuildSVG({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const draw =
    useTransform(
      progress,
      [0.04, 0.78],
      [0, 1]
    );

  return (
    <svg
      viewBox="0 0 760 560"
      className="h-full w-full"
      role="img"
    >
      <title>
        Reviewable software delivery cycle
      </title>

      <rect
        width="760"
        height="560"
        fill="#F8FBFF"
      />

      <rect
        x="110"
        y="82"
        width="540"
        height="105"
        rx="28"
        fill="#FFFFFF"
        stroke="#D5E3F6"
        strokeWidth="3"
      />

      <text
        x="150"
        y="128"
        fill="#0B1220"
        fontFamily="Inter, Arial"
        fontSize="24"
        fontWeight="700"
      >
        Working software enters review.
      </text>

      <text
        x="150"
        y="162"
        fill="#0E5CEE"
        fontFamily="Inter, Arial"
        fontSize="24"
        fontWeight="700"
      >
        Not another status slide.
      </text>

      <motion.path
        d="
          M100 275
          H220
          H355
          H500
          H650
        "
        fill="none"
        stroke="#0E5CEE"
        strokeWidth="6"
        strokeLinecap="round"
        style={{
          pathLength:
            reduceMotion
              ? 1
              : draw,
        }}
      />

      <BuildPoint
        x={100}
        index="01"
        label="Module"
      />

      <BuildPoint
        x={220}
        index="02"
        label="Test"
      />

      <BuildPoint
        x={355}
        index="03"
        label="Review"
      />

      <BuildPoint
        x={500}
        index="04"
        label="Evidence"
      />

      <BuildPoint
        x={650}
        index="05"
        label="Ready"
        active
      />

      {/* evaluation */}

      <rect
        x="130"
        y="365"
        width="220"
        height="110"
        rx="24"
        fill="#FFFFFF"
        stroke="#C9D9F4"
        strokeWidth="3"
      />

      <text
        x="160"
        y="410"
        fill="#0B1220"
        fontFamily="Inter, Arial"
        fontSize="19"
        fontWeight="700"
      >
        Evaluation
      </text>

      <rect
        x="160"
        y="435"
        width="135"
        height="14"
        rx="7"
        fill="#DCE7F6"
      />

      <rect
        x="160"
        y="435"
        width="108"
        height="14"
        rx="7"
        fill="#0E5CEE"
      />

      {/* stakeholder */}

      <rect
        x="410"
        y="365"
        width="220"
        height="110"
        rx="24"
        fill="#0E5CEE"
      />

      <circle
        cx="452"
        cy="420"
        r="19"
        fill="#FFFFFF"
      />

      <path
        d="
          M442 420
          l8 8
          15-18
        "
        fill="none"
        stroke="#0E5CEE"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="490"
        y="414"
        fill="#FFFFFF"
        fontFamily="Inter, Arial"
        fontSize="18"
        fontWeight="700"
      >
        Stakeholder
      </text>

      <text
        x="490"
        y="444"
        fill="#DDE8FF"
        fontFamily="Inter, Arial"
        fontSize="16"
      >
        accepted
      </text>
    </svg>
  );
}

/* ============================================================
   04 — DEPLOY

   Specifically redesigned around:
   EVIDENCE → CONTROLS → OWNERSHIP
============================================================ */

function DeploySVG({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const draw =
    useTransform(
      progress,
      [0.03, 0.75],
      [0, 1]
    );

  return (
    <svg
      viewBox="0 0 760 560"
      className="h-full w-full"
      role="img"
    >
      <title>
        Controlled production deployment
      </title>

      <rect
        width="760"
        height="560"
        fill="#F8FBFF"
      />

      {/* production perimeter */}

      <motion.path
        d="
          M105 120
          H655
          V440
          H105
          Z
        "
        fill="none"
        stroke="#0E5CEE"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength:
            reduceMotion
              ? 1
              : draw,
        }}
      />

      <rect
        x="145"
        y="172"
        width="470"
        height="225"
        rx="32"
        fill="#FFFFFF"
        stroke="#C9D9F4"
        strokeWidth="3"
      />

      {/* health */}

      <circle
        cx="265"
        cy="285"
        r="72"
        fill="#EDF4FF"
        stroke="#BFD3F4"
        strokeWidth="4"
      />

      <circle
        cx="265"
        cy="285"
        r="51"
        fill="#0E5CEE"
      />

      <path
        d="
          M240 286
          l18 18
          35-43
        "
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="377"
        y="225"
        fill="#0B1220"
        fontFamily="Inter, Arial"
        fontSize="22"
        fontWeight="700"
      >
        Production release
      </text>

      <ControlRow
        y={265}
        label="Monitoring active"
      />

      <ControlRow
        y={310}
        label="Rollback ready"
      />

      <ControlRow
        y={355}
        label="Owner assigned"
      />

      {/* proof strip */}

      <rect
        x="118"
        y="450"
        width="160"
        height="68"
        rx="22"
        fill="#FFFFFF"
        stroke="#C9D9F4"
        strokeWidth="3"
      />

      <text
        x="153"
        y="493"
        fill="#0B1220"
        fontFamily="Inter, Arial"
        fontSize="19"
        fontWeight="700"
      >
        Evidence
      </text>

      <rect
        x="300"
        y="450"
        width="160"
        height="68"
        rx="22"
        fill="#FFFFFF"
        stroke="#C9D9F4"
        strokeWidth="3"
      />

      <text
        x="334"
        y="493"
        fill="#0B1220"
        fontFamily="Inter, Arial"
        fontSize="19"
        fontWeight="700"
      >
        Controls
      </text>

      <rect
        x="482"
        y="450"
        width="160"
        height="68"
        rx="22"
        fill="#0E5CEE"
      />

      <text
        x="514"
        y="493"
        fill="#FFFFFF"
        fontFamily="Inter, Arial"
        fontSize="19"
        fontWeight="700"
      >
        Ownership
      </text>
    </svg>
  );
}

/* ============================================================
   SVG HELPERS
============================================================ */

function SVGNode({
  x,
  y,
  title,
  subtitle,
  active = false,
}: {
  x: number;
  y: number;
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="145"
        height="86"
        rx="22"
        fill={
          active
            ? "#0E5CEE"
            : "#FFFFFF"
        }
        stroke={
          active
            ? "#0E5CEE"
            : "#BFD3F4"
        }
        strokeWidth="3"
      />

      <text
        x={x + 23}
        y={y + 36}
        fill={
          active
            ? "#FFFFFF"
            : "#0B1220"
        }
        fontFamily="Inter, Arial"
        fontSize="19"
        fontWeight="700"
      >
        {title}
      </text>

      <text
        x={x + 23}
        y={y + 63}
        fill={
          active
            ? "#DCE8FF"
            : "#64748B"
        }
        fontFamily="Inter, Arial"
        fontSize="14"
      >
        {subtitle}
      </text>
    </g>
  );
}

function BuildPoint({
  x,
  index,
  label,
  active = false,
}: {
  x: number;
  index: string;
  label: string;
  active?: boolean;
}) {
  return (
    <g>
      <circle
        cx={x}
        cy="275"
        r="40"
        fill={
          active
            ? "#0E5CEE"
            : "#FFFFFF"
        }
        stroke="#0E5CEE"
        strokeWidth="4"
      />

      <text
        x={x}
        y="282"
        textAnchor="middle"
        fill={
          active
            ? "#FFFFFF"
            : "#0E5CEE"
        }
        fontFamily="Inter, Arial"
        fontSize="18"
        fontWeight="700"
      >
        {index}
      </text>

      <text
        x={x}
        y="340"
        textAnchor="middle"
        fill="#0B1220"
        fontFamily="Inter, Arial"
        fontSize="16"
        fontWeight="700"
      >
        {label}
      </text>
    </g>
  );
}

function ControlRow({
  y,
  label,
}: {
  y: number;
  label: string;
}) {
  return (
    <g>
      <circle
        cx="390"
        cy={y}
        r="10"
        fill="#0E5CEE"
      />

      <path
        d={`M384 ${y} l5 5 9-11`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="420"
        y={y + 7}
        fill="#334155"
        fontFamily="Inter, Arial"
        fontSize="18"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
}