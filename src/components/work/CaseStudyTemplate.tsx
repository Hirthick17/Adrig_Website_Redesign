import Link from "next/link";
import type { WorkItem } from "@/lib/site-data";
import { WORK_ITEMS } from "@/lib/site-data";

import Breadcrumb from "@/components/ui/Breadcrumb";
import CTASection from "@/components/ui/CTASection";

/* =============================================================================
   CONFIG
============================================================================= */

const IMPLEMENTATION_STEPS = [
  {
    title: "Planning",
    description:
      "Define the product objective, user roles, delivery boundaries and success criteria.",
  },
  {
    title: "Analysis",
    description:
      "Map workflows, dependencies, technical constraints and integration requirements.",
  },
  {
    title: "Development",
    description:
      "Build the core product modules and connect the system architecture.",
  },
  {
    title: "Testing",
    description:
      "Validate functionality, edge cases, usability and operational behaviour.",
  },
  {
    title: "Deployment",
    description:
      "Prepare the production environment and move the validated system live.",
  },
  {
    title: "Support",
    description:
      "Observe real-world usage, address issues and iterate where required.",
  },
];

/*
  VISUAL PLACEHOLDERS

  These are NOT meant to represent the client's actual product.

  Replace these URLs with:
  /work/<slug>/hero.webp
  /work/<slug>/feature-1.webp
  /work/<slug>/feature-2.webp
  /work/<slug>/gallery-1.webp
  ...

  once you have real screenshots/mockups.
*/

const PROJECT_VISUALS = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=85",
];

const NEXT_PROJECT_VISUALS = [
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=82",
];

function getVisual(index: number, slug?: string) {
  if (slug === "rail-rules" || slug === "ai-rule-clarifier") {
    return "/images/work/ai-rule-classifier.png";
  }
  if (slug === "trackon" || slug === "track-on") {
    return "/images/work/track-on.png";
  }
  return PROJECT_VISUALS[index % PROJECT_VISUALS.length];
}

/* =============================================================================
   PAGE
============================================================================= */

export default function CaseStudyTemplate({
  item,
}: {
  item: WorkItem;
}) {
  const currentIndex = WORK_ITEMS.findIndex(
    (work) => work.slug === item.slug
  );

  const safeCurrentIndex =
    currentIndex >= 0 ? currentIndex : 0;

  const next =
    WORK_ITEMS[
      (safeCurrentIndex + 1) %
        WORK_ITEMS.length
    ];

  /*
    These are intentionally factual delivery stats,
    NOT invented business-result numbers.

    Replace them later when actual project KPIs exist.
  */

  const deliveryStats = [
    {
      value: String(item.keyFeatures.length),
      label: "Core capabilities delivered",
    },
    {
      value: String(item.technologies.length),
      label: "Technologies in the delivery stack",
    },
    {
      value: String(IMPLEMENTATION_STEPS.length),
      label: "Structured delivery phases",
    },
    {
      value: "01",
      label: "Connected product system",
    },
  ];

  const featureImages = item.keyFeatures.map(
    (_, index) =>
      getVisual(index + 1, item.slug)
  );

  return (
    <>
      <main className="overflow-x-clip bg-[#F9FBFF] text-slate-950">
        {/* ================================================================= */}
        {/* BREADCRUMB                                                       */}
        {/* ================================================================= */}

        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Work",
              href: "/work",
            },
            {
              label: item.name,
            },
          ]}
        />

        {/* ================================================================= */}
        {/* 01 — CASE STUDY HERO                                             */}
        {/* ================================================================= */}

        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#F9FBFF]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at 82% 22%,
                  rgba(20,99,255,.14),
                  transparent 34%
                ),
                radial-gradient(
                  circle at 14% 90%,
                  rgba(107,164,255,.09),
                  transparent 32%
                ),
                linear-gradient(
                  180deg,
                  #ffffff 0%,
                  #f9fbff 100%
                )
              `,
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(14,92,238,.08) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(14,92,238,.08) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "72px 72px",
            }}
          />

          <div className="shell relative z-10 pt-16 sm:pt-20">
            {/* ------------------------------------------------------------ */}
            {/* TITLE                                                        */}
            {/* ------------------------------------------------------------ */}

            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.21em] text-[#1463FF]">
                  {item.category} / {item.client}
                </p>

                <h1 className="mt-6 max-w-[1000px] text-[clamp(4rem,7vw,8.5rem)] font-normal leading-[0.86] tracking-[-0.073em]">
                  {item.name}
                </h1>
              </div>

              <div className="lg:pb-2">
                <p className="max-w-[520px] text-base leading-8 text-slate-500 sm:text-lg">
                  {item.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex min-h-[50px] items-center gap-3 rounded-full bg-[#0E5CEE] px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#084FD1]"
                  >
                    Start a project

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  <a
                    href="#showcase"
                    className="inline-flex min-h-[50px] items-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  >
                    View the work ↓
                  </a>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* META                                                         */}
            {/* ------------------------------------------------------------ */}

            <div className="mt-14 grid border-y border-slate-200 md:grid-cols-4">
              {[
                [
                  "Client",
                  item.client,
                ],
                [
                  "Category",
                  item.category,
                ],
                [
                  "Scope",
                  `${item.keyFeatures.length} core capabilities`,
                ],
                [
                  "Technology",
                  item.technologies
                    .slice(0, 3)
                    .join(" · "),
                ],
              ].map(
                (
                  [label, value],
                  index
                ) => (
                  <div
                    key={label}
                    className="border-b border-slate-200 px-0 py-5 md:border-b-0 md:border-r md:px-6 md:first:pl-0"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-slate-400">
                      {label}
                    </p>

                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {value}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* ------------------------------------------------------------ */}
            {/* PRIMARY PRODUCT VISUAL                                       */}
            {/* ------------------------------------------------------------ */}

            <div className="case-visual mt-12 overflow-hidden rounded-t-[30px] border border-b-0 border-white bg-[#E9F0FA] p-2 shadow-[0_35px_100px_rgba(14,53,110,.14)]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-[24px] bg-slate-950">
                <img
                  src={getVisual(
                    safeCurrentIndex,
                    item.slug
                  )}
                  alt={`${item.name} product interface`}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#03142F]/65 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 p-6 sm:p-9">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-200">
                      ADRIG / Live Deployment
                    </p>

                    <p className="mt-3 max-w-[680px] text-2xl font-normal tracking-[-0.04em] text-white sm:text-3xl">
                      {item.name}
                    </p>
                  </div>

                  <span className="hidden font-mono text-[9px] uppercase tracking-[0.15em] text-white/50 md:block">
                    ADRIG / Case Study
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 02 — OVERVIEW                                                    */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-white py-20 sm:py-28">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[0.45fr_1.55fr] lg:gap-[8vw]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                  Overview
                </p>
              </div>

              <div>
                <h2 className="max-w-[1050px] text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                  {item.name} for{" "}

                  <span className="text-[#1463FF]">
                    {item.client}.
                  </span>
                </h2>

                <p className="mt-8 max-w-[820px] text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
                  {item.summary}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 03 — CHALLENGE                                                   */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-[#F9FBFF] py-20 sm:py-28">
          <div className="shell">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[7vw]">
              {/* ---------------------------------------------------------- */}
              {/* PROBLEM COPY                                               */}
              {/* ---------------------------------------------------------- */}

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                  The Challenge
                </p>

                <h2 className="mt-6 max-w-[700px] text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                  What needed
                  <span className="block text-[#1463FF]">
                    to be solved.
                  </span>
                </h2>

                <div className="mt-10 border-t border-slate-200">
                  {item.challenge.map(
                    (
                      challenge,
                      index
                    ) => (
                      <div
                        key={challenge}
                        className="case-reveal grid gap-5 border-b border-slate-200 py-6 sm:grid-cols-[58px_1fr]"
                        style={{
                          animationDelay: `${index * 70}ms`,
                        }}
                      >
                        <span className="font-mono text-[10px] text-[#1463FF]">
                          0
                          {index + 1}
                        </span>

                        <p className="max-w-[650px] text-xl leading-7 tracking-[-0.035em] text-slate-900 sm:text-2xl sm:leading-8">
                          {challenge}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* BEFORE-STATE DIAGRAM                                       */}
              {/* ---------------------------------------------------------- */}

              <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_25px_70px_rgba(15,43,90,.07)] sm:p-10">
                <div
                  className="absolute inset-0 opacity-[0.24]"
                  style={{
                    backgroundImage: `
                      linear-gradient(
                        rgba(14,92,238,.08) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        90deg,
                        rgba(14,92,238,.08) 1px,
                        transparent 1px
                      )
                    `,
                    backgroundSize:
                      "46px 46px",
                  }}
                />

                <div className="relative z-10">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
                    Before / Fragmented state
                  </p>

                  <div className="relative mt-10 h-[390px]">
                    {/* connectors */}

                    <div className="absolute left-[20%] top-[29%] h-px w-[55%] rotate-[8deg] bg-slate-200" />

                    <div className="absolute left-[25%] top-[63%] h-px w-[47%] -rotate-[11deg] bg-slate-200" />

                    <div className="absolute left-[46%] top-[20%] h-[56%] w-px rotate-[15deg] bg-slate-200" />

                    {/* nodes */}

                    {[
                      {
                        label:
                          "Tool 01",
                        className:
                          "left-[4%] top-[8%]",
                      },
                      {
                        label:
                          "Workflow",
                        className:
                          "right-[4%] top-[20%]",
                      },
                      {
                        label:
                          "Data",
                        className:
                          "left-[12%] bottom-[10%]",
                      },
                      {
                        label:
                          "Manual step",
                        className:
                          "right-[8%] bottom-[8%]",
                      },
                      {
                        label:
                          "Disconnected",
                        className:
                          "left-[39%] top-[42%]",
                      },
                    ].map(
                      (node) => (
                        <div
                          key={
                            node.label
                          }
                          className={`absolute ${node.className} flex min-h-[72px] min-w-[120px] items-center justify-center rounded-[16px] border border-slate-200 bg-[#F9FBFF] px-4 text-center shadow-[0_12px_30px_rgba(15,43,90,.05)]`}
                        >
                          <span className="text-xs font-medium text-slate-500">
                            {
                              node.label
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 04 — OUR SOLUTION                                                */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-white py-20 sm:py-28">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[0.45fr_1.55fr] lg:gap-[8vw]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                  Our Solution
                </p>
              </div>

              <div>
                <h2 className="max-w-[980px] text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                  A system built around
                  <span className="block text-[#1463FF]">
                    the operating reality.
                  </span>
                </h2>

                <p className="mt-8 max-w-[860px] text-xl leading-9 tracking-[-0.02em] text-slate-700">
                  {item.solution}
                </p>

                <p className="mt-6 max-w-[790px] text-base leading-8 text-slate-500 sm:text-lg">
                  The implementation was structured around the project&apos;s
                  actual workflow rather than simply translating requirements
                  into disconnected features. Each major capability was treated
                  as part of the same operating system so data, access and user
                  actions could work together predictably.
                </p>
              </div>
            </div>

            <div className="case-visual mt-14 overflow-hidden rounded-[28px] bg-[#07162D]">
              <div className="relative aspect-[16/7] min-h-[380px]">
                <img
                  src={getVisual(
                    safeCurrentIndex +
                      2
                  )}
                  alt={`${item.name} solution visual placeholder`}
                  className="h-full w-full object-cover opacity-90"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#04142D]/85 via-[#04142D]/15 to-transparent" />

                <div className="absolute bottom-0 left-0 max-w-[730px] p-7 sm:p-10">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-200">
                    Solution direction
                  </p>

                  <p className="mt-4 text-3xl font-normal leading-tight tracking-[-0.045em] text-white sm:text-4xl">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 05 — WHAT WE BUILT                                               */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-[#F9FBFF] py-20 sm:py-28">
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.6fr] lg:items-end">
              <h2 className="max-w-[900px] text-[clamp(3rem,5vw,5.7rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                What we
                <span className="text-[#1463FF]">
                  {" "}
                  built.
                </span>
              </h2>

              <p className="max-w-[470px] text-sm leading-7 text-slate-500">
                Each core capability becomes easier to understand when it is
                tied to a specific product surface instead of presented as a
                feature label alone.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {item.keyFeatures.map(
                (
                  feature,
                  index
                ) => (
                  <article
                    key={feature}
                    className="case-reveal group overflow-hidden rounded-[24px] border border-slate-200 bg-white"
                    style={{
                      animationDelay: `${index * 70}ms`,
                    }}
                  >
                    <div className="relative aspect-[1.18/1] overflow-hidden bg-[#E9F0FA]">
                      <img
                        src={
                          featureImages[
                            index %
                              featureImages.length
                          ]
                        }
                        alt={`${feature} UI placeholder`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#06162F]/32 via-transparent to-transparent" />

                      <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-slate-950/15 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.17em] text-white backdrop-blur-md">
                        Feature 0
                        {index + 1}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-normal tracking-[-0.045em] text-slate-950">
                        {feature}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        Designed as part of the connected {item.name} workflow,
                        with behaviour aligned to the project&apos;s users,
                        access model and operational requirements.
                      </p>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 06 — VISUAL SHOWCASE                                             */}
        {/* ================================================================= */}

        <section
          id="showcase"
          className="border-b border-slate-200/70 bg-white py-20 sm:py-28"
        >
          <div className="shell">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                Product Showcase
              </p>

              <h2 className="mt-6 max-w-[980px] text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                The work should
                <span className="block text-[#1463FF]">
                  be visible.
                </span>
              </h2>

              <p className="mt-6 max-w-[650px] text-base leading-8 text-slate-500">
                These are visual placeholders. Replace them with actual
                dashboards, mobile screens and key workflow views from{" "}
                {item.name} before publishing the case study.
              </p>
            </div>

            <div className="space-y-5">
              {/* LARGE */}

              <div className="gallery-reveal overflow-hidden rounded-[28px] bg-[#EAF0FA] p-2">
                <img
                  src={getVisual(0)}
                  alt={`${item.name} dashboard placeholder`}
                  className="aspect-[16/8] w-full rounded-[22px] object-cover"
                />
              </div>

              {/* SPLIT */}

              <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="gallery-reveal overflow-hidden rounded-[28px] bg-[#EAF0FA] p-2">
                  <img
                    src={getVisual(2)}
                    alt={`${item.name} workflow placeholder`}
                    className="aspect-[1.15/1] h-full w-full rounded-[22px] object-cover"
                  />
                </div>

                <div className="gallery-reveal overflow-hidden rounded-[28px] bg-[#EAF0FA] p-2">
                  <img
                    src={getVisual(4)}
                    alt={`${item.name} mobile placeholder`}
                    className="aspect-[0.9/1] h-full w-full rounded-[22px] object-cover"
                  />
                </div>
              </div>

              {/* WIDE */}

              <div className="gallery-reveal overflow-hidden rounded-[28px] bg-[#06162F]">
                <div className="relative aspect-[16/7] min-h-[340px]">
                  <img
                    src={getVisual(5)}
                    alt={`${item.name} final interface placeholder`}
                    className="h-full w-full object-cover opacity-80"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#06162F]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-8 left-8 max-w-[620px]">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-blue-200">
                      Actual final screen goes here
                    </p>

                    <p className="mt-3 text-3xl leading-tight tracking-[-0.045em] text-white">
                      Visual documentation turns a project description into
                      proof.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 07 — TECHNOLOGY STACK                                            */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-[#F9FBFF] py-20 sm:py-24">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-[7vw]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                  Technology Stack
                </p>

                <h2 className="mt-6 text-[clamp(3rem,4.5vw,5rem)] font-normal leading-[0.93] tracking-[-0.055em]">
                  Built with the
                  <span className="block text-[#1463FF]">
                    right tools for the job.
                  </span>
                </h2>
              </div>

              <div>
                <p className="max-w-[720px] text-base leading-8 text-slate-500 sm:text-lg">
                  The stack was selected to support the project&apos;s
                  application architecture and delivery requirements rather
                  than to create a longer technology list.
                </p>

                <div className="mt-8 border-t border-slate-200">
                  {item.technologies.map(
                    (
                      technology,
                      index
                    ) => (
                      <div
                        key={
                          technology
                        }
                        className="group flex items-center justify-between border-b border-slate-200 py-5"
                      >
                        <div className="flex items-center gap-5">
                          {/* icon fallback */}

                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F0FF] text-sm font-bold text-[#0E5CEE]">
                            {technology
                              .charAt(
                                0
                              )
                              .toUpperCase()}
                          </span>

                          <span className="text-lg font-medium tracking-[-0.025em]">
                            {
                              technology
                            }
                          </span>
                        </div>

                        <span className="font-mono text-[9px] text-slate-400">
                          0
                          {index + 1}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 08 — IMPLEMENTATION                                              */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-white py-20 sm:py-28">
          <div className="shell">
            <div className="max-w-[900px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                Implementation Approach
              </p>

              <h2 className="mt-6 text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                How it moved from
                <span className="block text-[#1463FF]">
                  planning to production.
                </span>
              </h2>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* CONNECTED PROCESS                                            */}
            {/* ------------------------------------------------------------ */}

            <div className="relative mt-16">
              {/* desktop rail */}

              <div className="absolute left-0 right-0 top-[24px] hidden h-px bg-slate-200 lg:block" />

              <div className="grid gap-8 lg:grid-cols-6 lg:gap-4">
                {IMPLEMENTATION_STEPS.map(
                  (
                    step,
                    index
                  ) => (
                    <article
                      key={
                        step.title
                      }
                      className="process-step relative"
                    >
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#1463FF]/25 bg-white font-mono text-[10px] font-semibold text-[#1463FF] shadow-[0_7px_20px_rgba(14,92,238,.08)]">
                        0
                        {index + 1}
                      </div>

                      <h3 className="mt-6 text-xl font-medium tracking-[-0.04em]">
                        {
                          step.title
                        }
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {
                          step.description
                        }
                      </p>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 09 — RESULTS / IMPACT                                            */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-[#06162F] py-20 text-white sm:py-28">
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
                  Results / Impact
                </p>

                <h2 className="mt-6 max-w-[880px] text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                  What was actually
                  <span className="block text-[#75A8FF]">
                    delivered.
                  </span>
                </h2>
              </div>

              <p className="max-w-[470px] text-sm leading-7 text-white/50">
                Real business KPIs are not currently present in your WorkItem
                data. These values intentionally show verifiable delivery facts
                instead of invented percentage improvements.
              </p>
            </div>

            <div className="mt-12 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {deliveryStats.map(
                (
                  stat,
                  index
                ) => (
                  <div
                    key={
                      stat.label
                    }
                    className="impact-stat min-h-[250px] border-b border-white/10 p-6 sm:border-r lg:border-b-0"
                  >
                    <span className="font-mono text-[9px] text-white/30">
                      0
                      {index + 1}
                    </span>

                    <p className="mt-14 text-[clamp(3.5rem,5vw,5.7rem)] font-normal leading-none tracking-[-0.07em] text-[#75A8FF]">
                      {
                        stat.value
                      }
                    </p>

                    <p className="mt-4 max-w-[220px] text-sm leading-6 text-white/55">
                      {
                        stat.label
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 10 — CLIENT TESTIMONIAL PLACEHOLDER                              */}
        {/* ================================================================= */}

        {/*
          DO NOT fabricate a client testimonial.

          Once you have a verified client quote, replace this section's
          placeholder state with:

          quote
          client name
          job title
          company
          real headshot
        */}

        <section className="border-b border-slate-200/70 bg-white py-20 sm:py-28">
          <div className="shell">
            <div className="grid gap-10 border-y border-slate-200 py-12 lg:grid-cols-[0.45fr_1.55fr] lg:gap-[7vw]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                  Client Perspective
                </p>
              </div>

              <div>
                <p className="max-w-[950px] text-[clamp(2rem,3.8vw,4rem)] font-normal leading-[1.03] tracking-[-0.05em] text-slate-300">
                  Add a verified testimonial from the {item.client} team here
                  before publishing this case study.
                </p>

                <p className="mt-8 text-sm text-slate-400">
                  Client quote intentionally not fabricated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 11 — NEXT PROJECT                                                */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-[#F9FBFF] py-16 sm:py-20">
          <div className="shell">
            <Link
              href={`/work/${next.slug}`}
              className="next-project group grid overflow-hidden rounded-[26px] border border-slate-200 bg-white lg:grid-cols-[0.7fr_1.3fr]"
            >
              {/* image */}

              <div className="relative min-h-[260px] overflow-hidden bg-[#EAF0FA] lg:min-h-[380px]">
                <img
                  src={
                    NEXT_PROJECT_VISUALS[
                      (safeCurrentIndex +
                        1) %
                        NEXT_PROJECT_VISUALS.length
                    ]
                  }
                  alt={`${next.name} preview`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06162F]/35 via-transparent to-transparent" />
              </div>

              {/* copy */}

              <div className="flex min-h-[300px] flex-col justify-between p-7 sm:p-10">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1463FF]">
                    Next Project
                  </p>

                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>

                <div>
                  <p className="text-[clamp(2.5rem,4.3vw,5rem)] font-normal leading-[0.93] tracking-[-0.06em]">
                    {next.name}
                  </p>

                  <p className="mt-3 text-base text-slate-500">
                    {next.client} / {next.category}
                  </p>
                </div>

                <span className="mt-7 text-sm font-semibold">
                  View case study →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 12 — FINAL CTA                                                   */}
        {/* ================================================================= */}

        <CTASection
          title="Have a project in mind?"
          description="Let's build something impactful together."
        />
      </main>

      {/* =================================================================== */}
      {/* MOTION                                                             */}
      {/* =================================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /*
              ONE SHARED MOTION LANGUAGE:
              - fade
              - 14px rise
              - restrained duration

              No parallax.
              No scroll hijacking.
              No over-animation.
            */

            .case-reveal,
            .process-step,
            .impact-stat {
              opacity: 1;
              transform: translate3d(0,0,0);
            }

            @supports (animation-timeline: view()) {

              .case-reveal,
              .process-step,
              .impact-stat {
                animation:
                  caseStudyReveal
                  linear
                  both;

                animation-timeline:
                  view();

                animation-range:
                  entry 4%
                  cover 30%;
              }

              /*
                Gallery receives the same language,
                just slightly slower / more deliberate.
              */

              .gallery-reveal,
              .case-visual {
                animation:
                  caseStudyGalleryReveal
                  linear
                  both;

                animation-timeline:
                  view();

                animation-range:
                  entry 3%
                  cover 38%;
              }
            }


            @keyframes caseStudyReveal {

              from {
                opacity:
                  0;

                transform:
                  translate3d(
                    0,
                    14px,
                    0
                  );
              }

              to {
                opacity:
                  1;

                transform:
                  translate3d(
                    0,
                    0,
                    0
                  );
              }
            }


            @keyframes caseStudyGalleryReveal {

              from {
                opacity:
                  0;

                transform:
                  translate3d(
                    0,
                    20px,
                    0
                  )
                  scale(.99);
              }

              to {
                opacity:
                  1;

                transform:
                  translate3d(
                    0,
                    0,
                    0
                  )
                  scale(1);
              }
            }


            /* ============================================================
               NEXT PROJECT
            ============================================================ */

            .next-project {
              transition:
                transform 350ms cubic-bezier(.22,1,.36,1),
                box-shadow 350ms ease,
                border-color 350ms ease;
            }

            .next-project:hover {
              transform:
                translateY(-4px);

              border-color:
                rgba(
                  20,
                  99,
                  255,
                  .22
                );

              box-shadow:
                0
                28px
                80px
                rgba(
                  15,
                  55,
                  110,
                  .10
                );
            }


            /* ============================================================
               MOBILE PROCESS CONNECTION
            ============================================================ */

            @media (
              max-width:
              1023px
            ) {

              .process-step {
                padding-left:
                  70px;

                min-height:
                  130px;
              }

              .process-step > div:first-child {
                position:
                  absolute;

                left:
                  0;

                top:
                  0;
              }

              .process-step:not(:last-child)::after {
                content:
                  "";

                position:
                  absolute;

                left:
                  23px;

                top:
                  48px;

                bottom:
                  -32px;

                width:
                  1px;

                background:
                  #e2e8f0;
              }

              .process-step h3 {
                margin-top:
                  0;
              }
            }


            /* ============================================================
               REDUCED MOTION
            ============================================================ */

            @media (
              prefers-reduced-motion:
              reduce
            ) {

              .case-reveal,
              .process-step,
              .impact-stat,
              .gallery-reveal,
              .case-visual {
                animation:
                  none !important;

                opacity:
                  1 !important;

                transform:
                  none !important;
              }

              .next-project {
                transition:
                  none;
              }

              .next-project:hover {
                transform:
                  none;
              }
            }
          `,
        }}
      />
    </>
  );
}