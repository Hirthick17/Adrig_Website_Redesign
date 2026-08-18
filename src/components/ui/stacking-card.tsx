"use client";

import type { ReactNode } from "react";
import {
  forwardRef,
  useRef,
} from "react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ============================================================
   PROJECT DATA
============================================================ */

export interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  href?: string;
  tags?: string[];
}

/* ============================================================
   MEME STORY CONFIG
============================================================ */

type ServiceStory = {
  match: string[];

  image: string;

  hook: string;

  imagePosition: string;
};

const SERVICE_STORIES: ServiceStory[] = [
  {
    match: [
      "chatbot",
      "chatbot development",
      "conversational ai",
    ],

    image:
      "/visuals/services/meme-posters/01-chatbot.png",

    hook:
      "Your support team has answered this question 847 times.",

    imagePosition:
      "50% 45%",
  },

  {
    match: [
      "software development",
      "software",
      "full stack",
    ],

    image:
      "/visuals/services/meme-posters/02-software-development.png",

    hook:
      "You fixed one bug. Apparently its entire family lives here now.",

    imagePosition:
      "50% 43%",
  },

  {
    match: [
      "workflow automation",
      "workflow",
    ],

    image:
      "/visuals/services/meme-posters/03-workflow-automation.png",

    hook:
      "Your PDF has travelled farther than most employees.",

    imagePosition:
      "50% 45%",
  },

  {
    match: [
      "ai automation",
      "automation ai",
    ],

    image:
      "/visuals/services/meme-posters/04-ai-automation.png",

    hook:
      "Eight tabs. Seven repetitive tasks. One very tired human API.",

    imagePosition:
      "50% 43%",
  },

  {
    match: [
      "generative ai",
      "llm",
      "large language model",
    ],

    image:
      "/visuals/services/meme-posters/05-generative-ai.png",

    hook:
      "The AI sounds extremely sure. The documents strongly disagree.",

    imagePosition:
      "50% 43%",
  },

  {
    match: [
      "artificial intelligence & ml",
      "artificial intelligence",
      "machine learning",
      "ai & ml",
      "ai/ml",
      "ai-ml",
      "ai consultation",
      "consultation",
      "consulting",
    ],

    image:
      "/visuals/services/meme-posters/07-ai-consultation.png",

    hook:
      "Everyone has an AI roadmap. Nobody can explain where it is going.",

    imagePosition:
      "50% 44%",
  },

  {
    match: [
      "data engineering",
      "data pipeline",
      "pipeline",
      "etl",
      "data architecture",
    ],

    image:
      "/visuals/services/meme-posters/06-data-analysis.png",

    hook:
      "The pipeline ran successfully. Finding the data is a different story.",

    imagePosition:
      "50% 45%",
  },

  {
    match: [
      "data analysis",
      "predictive analytics",
      "analytics",
    ],

    image:
      "/visuals/services/meme-posters/06-data-analysis.png",

    hook:
      "The insight is definitely here somewhere.",

    imagePosition:
      "50% 45%",
  },

  {
    match: [
      "blockchain",
      "distributed ledger",
    ],

    image:
      "/visuals/services/meme-posters/08-blockchain.png",

    hook:
      "Everybody has the correct transaction. Somehow none of them match.",

    imagePosition:
      "50% 44%",
  },
];

/* ============================================================
   STORY RESOLVER
============================================================ */

function resolveStory(
  title: string,
  fallbackImage: string
) {
  const normalized =
    title.toLowerCase();

  const story =
    SERVICE_STORIES.find((item) =>
      item.match.some((match) =>
        normalized.includes(
          match.toLowerCase()
        )
      )
    );

  return (
    story ?? {
      image: fallbackImage,

      hook:
        "The technology is working. The workflow clearly is not.",

      imagePosition:
        "50% 44%",
    }
  );
}

/* ============================================================
   CARD PROPS
============================================================ */

export interface CardProps {
  i: number;

  title: string;

  description: string;

  url: string;

  color: string;

  href?: string;

  progress: MotionValue<number>;

  range: [
    number,
    number
  ];

  targetScale: number;

  totalCards: number;
}

/* ============================================================
   CARD
============================================================ */

export const Card = ({
  i,
  title,
  url,
  href = "#",
  progress,
  range,
  targetScale,
  totalCards,
}: CardProps) => {
  const container =
    useRef<HTMLDivElement>(
      null
    );

  const {
    scrollYProgress,
  } = useScroll({
    target: container,

    offset: [
      "start end",
      "start start",
    ],
  });

  const story =
    resolveStory(
      title,
      url
    );

  /* ==========================================================
     SUBTLE IMAGE MOVEMENT
  ========================================================== */

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [1.035, 1]
    );

  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [5, -5]
    );

  const scale =
    useTransform(
      progress,
      range,
      [1, targetScale]
    );

  /*
   * Controlled stack peek.
   *
   * The stack does not keep moving down forever.
   */
  const stackOffset =
    Math.min(i, 5) * 25;

  return (
    <div
      ref={container}
      style={{
        zIndex: i + 1,
      }}
      className="
        sticky
        top-0
        flex
        h-[105svh]
        w-full
        items-start
        justify-center
        px-4
        pt-[5svh]
        sm:px-8
        lg:px-12
      "
    >
      <motion.article
        style={{
          scale,
          y: stackOffset,
        }}
        className="
          relative
          flex
          h-[min(680px,82svh)]
          w-full
          max-w-7xl
          origin-top
          flex-col
          overflow-hidden
          rounded-[30px]
          border
          border-white/[0.13]
          bg-[#06162F]
          shadow-[0_30px_80px_rgba(4,18,42,0.34)]
        "
      >
        {/* ==================================================
            DELIBERATE STACK PEEK
        ================================================== */}

        <div
          className="
            flex
            h-[32px]
            shrink-0
            items-center
            justify-between
            border-b
            border-white/[0.07]
            px-6
            sm:px-8
          "
        >
          <span className="font-mono text-[8px] tracking-[0.16em] text-white/25">
            ADRIG
          </span>

          <span className="font-mono text-[8px] tracking-[0.16em] text-white/30">
            {String(
              i + 1
            ).padStart(2, "0")}
            {" / "}
            {String(
              totalCards
            ).padStart(2, "0")}
          </span>
        </div>

        {/* ==================================================
            MAIN 80 / 20 CONTENT SYSTEM
        ================================================== */}

        <div
          className="
            grid
            min-h-0
            flex-1
            grid-cols-1
            gap-5
            p-5
            sm:p-7
            lg:grid-cols-12
            lg:gap-8
            lg:p-8
          "
        >
          {/* =================================================
              LEFT — SERVICE + ONE HEADLINE
          ================================================= */}

          <div
            className="
              order-2
              flex
              min-h-0
              flex-col
              lg:order-1
              lg:col-span-7
            "
          >
            {/* SERVICE */}

            <div
              className="
                flex
                items-center
                gap-4
                border-b
                border-white/[0.08]
                pb-5
              "
            >
              <span className="font-mono text-[9px] font-medium tracking-[0.16em] text-[#75A5FF]">
                {String(
                  i + 1
                ).padStart(2, "0")}
              </span>

              <span className="h-px w-7 bg-[#1463FF]" />

              <span
                className="
                  text-sm
                  font-semibold
                  tracking-[-0.02em]
                  text-white/80
                  sm:text-[15px]
                "
              >
                {title}
              </span>
            </div>

            {/* =================================================
                GIANT MEME HEADLINE
            ================================================= */}

            <div
              className="
                flex
                flex-1
                items-center
                py-6
                sm:py-8
                lg:py-10
              "
            >
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.55,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  max-w-[720px]
                  text-[clamp(2.7rem,5vw,5.7rem)]
                  font-normal
                  leading-[0.9]
                  tracking-[-0.07em]
                  text-white
                "
              >
                {story.hook}
              </motion.h2>
            </div>

            {/* =================================================
                CTA ONLY
            ================================================= */}

            <div
              className="
                flex
                items-center
                border-t
                border-white/[0.08]
                pt-5
              "
            >
              <Link
                href={href}
                className="
                  group
                  inline-flex
                  min-h-[50px]
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-6
                  text-sm
                  font-semibold
                  text-[#06162F]
                  transition-all
                  duration-300
                  ease-in-out
                  hover:bg-[#1463FF]
                  hover:text-white
                "
              >
                <span>
                  Explore service
                </span>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-[#1463FF]
                    transition-all
                    duration-300
                    ease-in-out
                    group-hover:translate-x-1
                    group-hover:text-white
                  "
                />
              </Link>
            </div>
          </div>

          {/* =================================================
              RIGHT — LARGE MEME IMAGE
          ================================================= */}

          <div
            className="
              order-1
              min-h-0
              lg:order-2
              lg:col-span-5
            "
          >
            <div
              className="
                relative
                h-[280px]
                w-full
                overflow-hidden
                rounded-[22px]
                border
                border-white/[0.12]
                bg-[#0A2548]
                sm:h-[340px]
                lg:h-full
              "
            >
              <motion.div
                style={{
                  scale:
                    imageScale,

                  y: imageY,
                }}
                className="absolute inset-0"
              >
                <img
                  src={
                    story.image
                  }
                  alt={`${title} operational pain point`}
                  loading={
                    i <= 1
                      ? "eager"
                      : "lazy"
                  }
                  decoding="async"
                  style={{
                    objectPosition:
                      story.imagePosition,
                  }}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />
              </motion.div>

              {/* SUBTLE CONTRAST ONLY */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#06162F]/25
                  via-transparent
                  to-transparent
                "
              />

              {/* INNER POSTER FRAME */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-[9px]
                  rounded-[15px]
                  border
                  border-white/[0.09]
                "
              />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

/* ============================================================
   ROOT
============================================================ */

export interface StackingCardRootProps {
  projects: ProjectData[];

  headingTitle?: ReactNode;

  headingSubtitle?: string;
}

/* ============================================================
   STACKING CARDS
============================================================ */

const StackingCards =
  forwardRef<
    HTMLElement,
    StackingCardRootProps
  >(
    (
      {
        projects,
        headingTitle,
        headingSubtitle,
      },
      ref
    ) => {
      const container =
        useRef<HTMLDivElement>(
          null
        );

      const {
        scrollYProgress,
      } = useScroll({
        target: container,

        offset: [
          "start start",
          "end end",
        ],
      });

      return (
        <main
          ref={container}
          className="relative bg-transparent"
        >
          {/* ==================================================
              SECTION HEADER
          ================================================== */}

          {headingTitle !==
            null && (
            <section
              ref={ref}
              className="
                relative
                flex
                min-h-[48vh]
                w-full
                items-center
                justify-center
                overflow-hidden
                px-6
                py-16
                text-center
                sm:min-h-[52vh]
                sm:py-20
              "
            >
              {/* Blueprint */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[linear-gradient(to_right,rgba(20,99,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.05)_1px,transparent_1px)]
                  bg-[size:48px_48px]
                  [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)]
                "
              />

              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
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
                  duration: 0.65,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  relative
                  z-10
                  mx-auto
                  max-w-5xl
                "
              >
                <h2
                  className="
                    text-[clamp(3rem,5.2vw,6rem)]
                    font-normal
                    leading-[0.94]
                    tracking-[-0.065em]
                    text-slate-950
                  "
                >
                  {headingTitle ||
                    "Problems you probably recognise."}
                </h2>

                {headingSubtitle && (
                  <p
                    className="
                      mx-auto
                      mt-5
                      max-w-2xl
                      text-sm
                      leading-7
                      text-slate-600
                      sm:text-base
                    "
                  >
                    {
                      headingSubtitle
                    }
                  </p>
                )}
              </motion.div>
            </section>
          )}

          {/* ==================================================
              STACK
          ================================================== */}

          <section className="relative w-full pb-24">
            {projects.map(
              (
                project,
                i
              ) => {
                /*
                 * Restrained scaling.
                 */
                const targetScale =
                  1 -
                  (projects.length -
                    i) *
                    0.012;

                const step =
                  1 /
                  Math.max(
                    projects.length,
                    1
                  );

                return (
                  <Card
                    key={`stack_${project.title}_${i}`}
                    i={i}
                    url={
                      project.link
                    }
                    title={
                      project.title
                    }
                    description={
                      project.description
                    }
                    color={
                      project.color
                    }
                    href={
                      project.href
                    }
                    progress={
                      scrollYProgress
                    }
                    range={[
                      i * step,
                      Math.min(
                        1,
                        i *
                          step +
                          step *
                            1.12
                      ),
                    ]}
                    targetScale={
                      targetScale
                    }
                    totalCards={
                      projects.length
                    }
                  />
                );
              }
            )}
          </section>
        </main>
      );
    }
  );

StackingCards.displayName =
  "StackingCards";

export default StackingCards;