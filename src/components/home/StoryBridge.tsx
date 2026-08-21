"use client";

import {
  Fragment,
  useMemo,
  useRef,
} from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ============================================================
   ADRIG STORY BRIDGE
   ------------------------------------------------------------
   DESIGN RULES

   • Same light ADRIG canvas across every bridge
   • Maximum two headline lines
   • Line 1 enters as one editorial statement
   • Line 2 reveals word-by-word
   • Connector line NEVER intersects typography
   • Supporting sentence appears only after headline
   • Exit connector begins only after story is understood
   • Whole bridge gently moves upward for the next section

   No extra dependencies.
   Existing framer-motion + Tailwind only.
============================================================ */

/* ============================================================
   BRAND
============================================================ */

const BRAND = {
  ink: "#0B1220",
  blue: "#0E5CEE",
  muted: "#64748B",
  background: "#F7F9FC",
  border: "#DCE5F2",
  paleBlue: "#EDF4FF",
  guide: "#CFDCF0",
};

/* ============================================================
   TYPES
============================================================ */

export type StoryBridgeId =
  | "hero-to-why"
  | "why-to-services"
  | "services-to-products"
  | "products-to-process"
  | "process-to-cases"
  | "cases-to-testimonials"
  | "testimonials-to-industries"
  | "industries-to-technologies"
  | "technologies-to-cta";

type StoryDefinition = {
  line1: string;
  line2: string;
  support?: string;

  /**
   * Determines which side the entrance / exit
   * connector uses.
   *
   * Alternating this across the homepage stops
   * every StoryBridge from feeling duplicated.
   */
  direction?: "left-right" | "right-left";
};

export type StoryBridgeProps = {
  story: StoryBridgeId;
  className?: string;

  /**
   * Floating ADRIG navbar offset.
   * Adjust once if your header changes.
   */
  headerOffset?: number;
};

/* ============================================================
   CONTENT
============================================================ */

const STORIES: Record<
  StoryBridgeId,
  StoryDefinition
> = {
  "hero-to-why": {
    line1:
      "Nothing is technically broken.",
    line2:
      "Someone is manually keeping everything alive.",
    support:
      "That works — until the business grows.",
    direction: "left-right",
  },

  "why-to-services": {
    line1:
      "Another tool? We already have enough.",
    line2:
      "Make the ones we have work together.",
    support:
      "The problem is rarely the number of tools.",
    direction: "right-left",
  },

  "services-to-products": {
    line1:
      "Great. It works.",
    line2:
      "Now can everyone stop babysitting it?",
    support:
      "Useful systems should keep moving when nobody is watching.",
    direction: "left-right",
  },

  "products-to-process": {
    line1:
      "Automation is easy to demo.",
    line2:
      "Operations are harder.",
    support:
      "So we start with the operation, not the technology.",
    direction: "right-left",
  },

  "process-to-cases": {
    line1:
      "Enough diagrams.",
    line2:
      "Did it actually work?",
    support:
      "Now architecture meets real business consequences.",
    direction: "left-right",
  },

  "cases-to-testimonials": {
    line1:
      "We could tell you it worked.",
    line2:
      "They can do that.",
    support:
      "Proof sounds different when it comes from the people using it.",
    direction: "right-left",
  },

  "testimonials-to-industries": {
    line1:
      "Different industries.",
    line2:
      "Suspiciously similar operational problems.",
    support:
      "Different vocabulary. Very familiar bottlenecks.",
    direction: "left-right",
  },

  "industries-to-technologies": {
    line1:
      "Different stack.",
    line2:
      "Same problem: work gets stuck between tools.",
    support:
      "Technology changes. Operational friction is remarkably consistent.",
    direction: "right-left",
  },

  "technologies-to-cta": {
    line1:
      "Technology is the implementation.",
    line2:
      "The operation is the product.",
    support:
      "Now we can talk about what yours should become.",
    direction: "left-right",
  },
};

/* ============================================================
   MAIN
============================================================ */

export default function StoryBridge({
  story,
  className = "",
  headerOffset = 92,
}: StoryBridgeProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const reducedMotion =
    useReducedMotion();

  const definition =
    STORIES[story];

  const words = useMemo(
    () =>
      definition.line2
        .trim()
        .split(/\s+/),
    [definition.line2]
  );

  /* ==========================================================
     ONE MOTION SIGNAL

     Everything inside the bridge uses this same
     scroll progress.

     This is what keeps it feeling like ONE scene
     rather than several independent animations.
  ========================================================== */

  const {
    scrollYProgress:
      rawProgress,
  } = useScroll({
    target: sectionRef,

    offset: [
      "start start",
      "end end",
    ],
  });

  /*
   * Small spring smoothing.
   *
   * Still scroll-controlled.
   * Scroll backwards = animation reverses.
   */

  const progress =
    useSpring(
      rawProgress,
      {
        stiffness: 135,
        damping: 30,
        mass: 0.18,
      }
    );

  /* ==========================================================
     01 — ENTRANCE CONNECTOR
  ========================================================== */

  const entranceProgress =
    useTransform(
      progress,
      [0.01, 0.18],
      [0, 1]
    );

  const entranceNodeScale =
    useTransform(
      progress,
      [0.08, 0.17],
      [0, 1]
    );

  /* ==========================================================
     02 — FIRST LINE
  ========================================================== */

  const line1Opacity =
    useTransform(
      progress,
      [0.10, 0.23],
      [0, 1]
    );

  const line1Y =
    useTransform(
      progress,
      [0.10, 0.24],
      [28, 0]
    );

  /* ==========================================================
     03 — SUPPORTING LINE
  ========================================================== */

  const supportOpacity =
    useTransform(
      progress,
      [
        0.63,
        0.72,
        0.88,
        0.97,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const supportY =
    useTransform(
      progress,
      [0.63, 0.73],
      [16, 0]
    );

  /* ==========================================================
     04 — EXIT CONNECTOR

     It begins only after the headline has largely
     completed.

     The visitor reads first.
     Motion continues second.
  ========================================================== */

  const exitProgress =
    useTransform(
      progress,
      [0.70, 0.96],
      [0, 1]
    );

  const exitNodeScale =
    useTransform(
      progress,
      [0.88, 0.97],
      [0, 1]
    );

  /* ==========================================================
     05 — ZERO-DISTANCE STACK-LIKE HANDOFF

     Instead of visually stacking cards:

     current scene
           ↓
     slightly recedes
           ↓
     next real section enters naturally

     Equivalent visual intent:

     stackDistance = 0
     rotation = 0
     blur = 0
  ========================================================== */

  const sceneY =
    useTransform(
      progress,
      [0.82, 1],
      [0, -42]
    );

  const sceneScale =
    useTransform(
      progress,
      [0.82, 1],
      [1, 0.988]
    );

  const sceneOpacity =
    useTransform(
      progress,
      [
        0,
        0.06,
        0.87,
        1,
      ],
      [
        0.94,
        1,
        1,
        0.38,
      ]
    );

  /* ==========================================================
     REDUCED MOTION
  ========================================================== */

  if (reducedMotion) {
    return (
      <StaticBridge
        definition={
          definition
        }
        className={
          className
        }
      />
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label={`${definition.line1} ${definition.line2}`}
      className={`
        relative
        h-[138svh]
        bg-[#F7F9FC]
        ${className}
      `}
    >
      {/* ======================================================
          STICKY STAGE
      ====================================================== */}

      <motion.div
        style={{
          top: headerOffset,
          height: `calc(100svh - ${headerOffset}px)`,

          y: sceneY,
          scale:
            sceneScale,
          opacity:
            sceneOpacity,
        }}
        className="
          sticky
          origin-top
          overflow-hidden
          border-y
          border-[#DCE5F2]
          bg-[#F7F9FC]
        "
      >
        {/* ====================================================
            SUBTLE GRID

            Much softer than your previous screenshot.
            It should be felt, not noticed.
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0

            bg-[linear-gradient(to_right,rgba(14,92,238,0.026)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.026)_1px,transparent_1px)]

            bg-[size:96px_96px]

            [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_10%,transparent_92%)]
          "
        />

        {/* ====================================================
            TOP CONNECTOR

            Lives only in the upper margin.
            Never enters headline territory.
        ==================================================== */}

        <EntranceConnector
          direction={
            definition.direction ??
            "left-right"
          }
          progress={
            entranceProgress
          }
          nodeScale={
            entranceNodeScale
          }
        />

        {/* ====================================================
            STORY
        ==================================================== */}

        <div
          className="
            relative z-10
            mx-auto
            flex h-full
            max-w-[1440px]
            items-center
            justify-center

            px-6
            sm:px-8
            lg:px-12
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1080px]
              text-center
            "
          >
            {/* ----------------------------------------------
                LINE ONE

                Enters as one confident editorial unit.
            ---------------------------------------------- */}

            <motion.h2
              style={{
                opacity:
                  line1Opacity,

                y: line1Y,

                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}
              className="
                text-[clamp(2.6rem,5vw,5.35rem)]
                font-medium
                leading-[0.96]
                tracking-[-0.058em]
                text-[#0B1220]

                [text-wrap:balance]
              "
            >
              {
                definition.line1
              }
            </motion.h2>

            {/* ----------------------------------------------
                LINE TWO

                Motion-style word-by-word reveal.
            ---------------------------------------------- */}

            <h3
              aria-label={
                definition.line2
              }
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}
              className="
                mt-2

                text-[clamp(2.6rem,5vw,5.35rem)]
                font-medium
                leading-[0.96]
                tracking-[-0.058em]

                text-[#0E5CEE]

                [text-wrap:balance]
              "
            >
              {words.map(
                (
                  word,
                  index
                ) => (
                  <Fragment
                    key={`${word}-${index}`}
                  >
                    <RevealWord
                      word={
                        word
                      }
                      index={
                        index
                      }
                      total={
                        words.length
                      }
                      progress={
                        progress
                      }
                    />

                    {index <
                    words.length -
                      1
                      ? " "
                      : null}
                  </Fragment>
                )
              )}
            </h3>

            {/* ----------------------------------------------
                SUPPORT

                Only after the visitor already understood
                the punchline.
            ---------------------------------------------- */}

            {definition.support && (
              <motion.p
                style={{
                  opacity:
                    supportOpacity,

                  y: supportY,
                }}
                className="
                  mx-auto
                  mt-8

                  max-w-[720px]

                  text-[clamp(1rem,1.35vw,1.2rem)]
                  leading-8
                  tracking-[-0.015em]

                  text-slate-500
                "
              >
                {
                  definition.support
                }
              </motion.p>
            )}
          </div>
        </div>

        {/* ====================================================
            EXIT CONNECTOR

            Lives only in bottom margin.

            It visually says:
            "the argument continues..."
        ==================================================== */}

        <ExitConnector
          direction={
            definition.direction ??
            "left-right"
          }
          progress={
            exitProgress
          }
          nodeScale={
            exitNodeScale
          }
        />
      </motion.div>
    </section>
  );
}

/* ============================================================
   WORD REVEAL
============================================================ */

function RevealWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  /*
   * Word reveal occupies roughly:
   *
   * 22% → 66%
   *
   * This leaves:
   *
   * 0–20%   connector + line 1
   * 22–66%  word reveal
   * 66–78%  support
   * 72–100% exit/handoff
   */

  const revealStart =
    0.22;

  const revealEnd =
    0.66;

  const availableRange =
    revealEnd -
    revealStart;

  const position =
    total <= 1
      ? 0
      : index /
        (total - 1);

  const start =
    revealStart +
    position *
      availableRange *
      0.82;

  const end =
    Math.min(
      revealEnd,
      start + 0.13
    );

  const opacity =
    useTransform(
      progress,
      [start, end],
      [0.12, 1]
    );

  const y =
    useTransform(
      progress,
      [start, end],
      [18, 0]
    );

  const blur =
    useTransform(
      progress,
      [start, end],
      [5, 0]
    );

  const filter =
    useTransform(
      blur,
      (value) =>
        `blur(${value}px)`
    );

  return (
    <motion.span
      aria-hidden="true"
      style={{
        opacity,
        y,
        filter,

        willChange:
          "transform, opacity, filter",
      }}
      className="
        inline-block
        text-[#0E5CEE]
      "
    >
      {word}
    </motion.span>
  );
}

/* ============================================================
   ENTRANCE CONNECTOR
============================================================ */

function EntranceConnector({
  direction,
  progress,
  nodeScale,
}: {
  direction:
    | "left-right"
    | "right-left";

  progress: MotionValue<number>;
  nodeScale: MotionValue<number>;
}) {
  const reverse =
    direction ===
    "right-left";

  const path = reverse
    ? `
      M1320 0
      V54
      H1140
      V88
    `
    : `
      M120 0
      V54
      H300
      V88
    `;

  const nodeX =
    reverse
      ? 1140
      : 300;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="
        pointer-events-none
        absolute
        left-0 right-0 top-0
        z-20
        h-[104px]
        w-full
      "
    >
      {/* faint guide */}

      <path
        d={path}
        fill="none"
        stroke="#D1DEEF"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* active line */}

      <motion.path
        d={path}
        fill="none"
        stroke="#0E5CEE"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{
          pathLength:
            progress,
        }}
      />

      <motion.circle
        cx={nodeX}
        cy="88"
        r="7"
        fill="#F7F9FC"
        stroke="#0E5CEE"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        style={{
          scale:
            nodeScale,

          transformOrigin:
            `${nodeX}px 88px`,
        }}
      />
    </svg>
  );
}

/* ============================================================
   EXIT CONNECTOR
============================================================ */

function ExitConnector({
  direction,
  progress,
  nodeScale,
}: {
  direction:
    | "left-right"
    | "right-left";

  progress: MotionValue<number>;
  nodeScale: MotionValue<number>;
}) {
  const reverse =
    direction ===
    "right-left";

  /*
   * Entrance:
   *
   * left  → right
   *
   * Exit:
   *
   * right → bottom
   *
   * Alternating stories reverse it.
   */

  const path = reverse
    ? `
      M300 20
      V54
      H120
      V120
    `
    : `
      M1140 20
      V54
      H1320
      V120
    `;

  const nodeX =
    reverse
      ? 300
      : 1140;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="
        pointer-events-none
        absolute
        bottom-0
        left-0 right-0
        z-20
        h-[104px]
        w-full
      "
    >
      {/* inactive future path */}

      <path
        d={path}
        fill="none"
        stroke="#D1DEEF"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* live path */}

      <motion.path
        d={path}
        fill="none"
        stroke="#0E5CEE"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{
          pathLength:
            progress,
        }}
      />

      <motion.circle
        cx={nodeX}
        cy="20"
        r="7"
        fill="#F7F9FC"
        stroke="#0E5CEE"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        style={{
          scale:
            nodeScale,

          transformOrigin:
            `${nodeX}px 20px`,
        }}
      />
    </svg>
  );
}

/* ============================================================
   REDUCED MOTION VERSION
============================================================ */

function StaticBridge({
  definition,
  className,
}: {
  definition: StoryDefinition;
  className: string;
}) {
  return (
    <section
      className={`
        relative
        overflow-hidden
        border-y
        border-[#DCE5F2]
        bg-[#F7F9FC]
        ${className}
      `}
    >
      {/* TOP CONNECTOR */}

      <div
        aria-hidden="true"
        className="
          absolute
          left-[8%]
          top-0
          h-20
          w-px
          bg-[#0E5CEE]
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[calc(8%-5px)]
          top-[76px]
          h-[10px]
          w-[10px]
          rounded-full
          border-2
          border-[#0E5CEE]
          bg-[#F7F9FC]
        "
      />

      <div
        className="
          mx-auto
          flex min-h-[72svh]
          max-w-[1440px]
          items-center
          justify-center
          px-6
          py-28
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            mx-auto
            max-w-[1080px]
            text-center
          "
        >
          <h2
            className="
              text-[clamp(2.6rem,5vw,5.35rem)]
              font-medium
              leading-[0.96]
              tracking-[-0.058em]
              text-[#0B1220]
              [text-wrap:balance]
            "
          >
            {
              definition.line1
            }

            <span
              className="
                block
                text-[#0E5CEE]
              "
            >
              {
                definition.line2
              }
            </span>
          </h2>

          {definition.support && (
            <p
              className="
                mx-auto
                mt-8
                max-w-[720px]
                text-lg
                leading-8
                text-slate-500
              "
            >
              {
                definition.support
              }
            </p>
          )}
        </div>
      </div>
    </section>
  );
}