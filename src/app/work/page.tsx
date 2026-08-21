import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { WORK_ITEMS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Work — ADRIG",
};

/* =============================================================================
   PROJECT VISUALS
============================================================================= */

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=82",
];

const getProjectImage = (index: number, slug?: string) => {
  if (slug === "rail-rules" || slug === "ai-rule-clarifier") {
    return "/images/work/ai-rule-classifier.png";
  }
  if (slug === "trackon" || slug === "track-on") {
    return "/images/work/track-on.png";
  }
  return PROJECT_IMAGES[index % PROJECT_IMAGES.length];
};

/* =============================================================================
   PROJECT SCREEN
   BASED DIRECTLY ON YOUR PROVIDED CSS
============================================================================= */

const PROJECT_SCREEN_STYLE: CSSProperties = {
  width: "1440px",
  height: "min-content",

  display: "flex",
  flexDirection: "column",

  justifyContent: "flex-start",
  alignItems: "center",

  backgroundColor: "#ffffff",

  overflow: "hidden",

  padding: "0px",

  alignContent: "center",
  flexWrap: "nowrap",

  gap: "0px",

  /*
   * Relative is intentional.
   *
   * Absolute would put every WORK_ITEMS entry
   * on top of each other.
   */
  position: "relative",

  borderRadius: "0px",
};

/* =============================================================================
   PAGE
============================================================================= */

export default function WorkIndex() {
  return (
    <>
      <main className="overflow-x-clip bg-[#F9FBFF] text-slate-950">
        {/* ================================================================= */}
        {/* 01 — HERO                                                        */}
        {/* ================================================================= */}

        <section className="relative min-h-[76svh] overflow-hidden border-b border-slate-200/70 bg-[#F9FBFF]">
          {/* Ambient background */}

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at 78% 35%,
                  rgba(20,99,255,0.12),
                  transparent 34%
                ),

                radial-gradient(
                  circle at 20% 80%,
                  rgba(110,165,255,0.10),
                  transparent 32%
                ),

                linear-gradient(
                  180deg,
                  #ffffff 0%,
                  #f9fbff 55%,
                  #f5f9ff 100%
                )
              `,
            }}
          />

          {/* Grid */}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(14,92,238,0.08) 1px,
                  transparent 1px
                ),

                linear-gradient(
                  90deg,
                  rgba(14,92,238,0.08) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "72px 72px",
            }}
          />

          <div className="shell relative z-10 grid min-h-[76svh] items-center gap-12 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            {/* ------------------------------------------------------------- */}
            {/* LEFT                                                         */}
            {/* ------------------------------------------------------------- */}

            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1463FF]">
                Selected Work
              </p>

              <h1 className="mt-6 max-w-[650px] text-[clamp(3.8rem,6.3vw,7rem)] font-normal leading-[0.87] tracking-[-0.07em]">
                Proven
                <span className="block">deployments.</span>

                <span className="mt-2 block bg-gradient-to-r from-[#0E5CEE] via-[#1463FF] to-[#74A9FF] bg-clip-text text-transparent">
                  Real impact.
                </span>
              </h1>

              <p className="mt-8 max-w-[500px] text-base leading-7 text-slate-500 sm:text-lg">
                AI, automation and software systems engineered around real
                operational constraints.
              </p>

              <a
                href="#deployments"
                className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-slate-950"
              >
                Explore deployments

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E5CEE] text-white transition-transform duration-300 group-hover:translate-y-1">
                  ↓
                </span>
              </a>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT HERO VISUAL                                             */}
            {/* ------------------------------------------------------------- */}

            <div className="relative mx-auto w-full max-w-[760px] [perspective:1200px]">
              <div className="work-hero-visual relative overflow-hidden rounded-[30px] border border-white bg-white p-1.5 shadow-[0_45px_110px_rgba(13,57,124,0.16)]">
                <div className="relative aspect-[1.25/1] overflow-hidden rounded-[25px] bg-slate-950">
                  <img
                    src={getProjectImage(0)}
                    alt="ADRiG project interface"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#03142F]/80 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="flex items-end justify-between gap-8">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-200">
                          ADRiG / Deployment
                        </p>

                        <p className="mt-3 max-w-[470px] text-2xl font-normal leading-tight tracking-[-0.04em] text-white sm:text-3xl">
                          Systems designed around the operation — not around a
                          template.
                        </p>
                      </div>

                      <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-xl text-white sm:flex">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 -z-10 h-[70%] w-[70%] rounded-[36px] bg-[#DCEAFF]/70" />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 02 — OVERVIEW                                                    */}
        {/* ================================================================= */}

        <section className="overview-reveal-section relative h-[180vh] border-b border-slate-200/70 bg-[#F9FBFF]">
  <div className="sticky top-0 flex h-screen items-center overflow-hidden">
    <div className="shell w-full">
      <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
        {/* Left utility rail */}
        <div className="flex flex-col justify-between py-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1463FF]">
              Our Work
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="h-28 w-px bg-slate-200" />
          </div>
        </div>

        {/* Main text reveal area */}
        <div className="max-w-[1180px]">
          <h2 className="text-[clamp(3rem,6vw,7rem)] font-normal leading-[0.92] tracking-[-0.065em]">
            <span className="overview-line-wrap block overflow-hidden">
              <span className="overview-line-animate overview-line-1 block text-slate-400">
                We don&apos;t build technology
              </span>
            </span>

            <span className="overview-line-wrap block overflow-hidden">
              <span className="overview-line-animate overview-line-2 block text-slate-400">
                to fill a portfolio.
              </span>
            </span>

            <span className="overview-line-wrap mt-4 block overflow-hidden">
              <span className="overview-line-animate overview-line-3 block text-[#1463FF]">
                We build it to remove
              </span>
            </span>

            <span className="overview-line-wrap block overflow-hidden">
              <span className="overview-line-animate overview-line-4 block text-[#1463FF]">
                operational friction.
              </span>
            </span>
          </h2>

          <div className="mt-10 max-w-[720px] overflow-hidden">
            <p className="overview-copy-animate text-base leading-8 text-slate-500 sm:text-lg">
              Each engagement starts with the actual workflow, bottleneck,
              constraints and business outcome. The system is then engineered
              around that operating reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* ================================================================= */}
        {/* 03 — REAL DEPLOYMENTS INTRO                                      */}
        {/* ================================================================= */}

        <section
          id="deployments"
          className="relative border-b border-slate-200/70 bg-[#F9FBFF] py-20 sm:py-28"
        >
          <div className="shell">
            <div className="flex flex-col gap-8 border-b border-slate-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[880px] text-[clamp(3rem,5.3vw,6rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                Real deployments.
                <span className="block text-[#1463FF]">
                  One project at a time.
                </span>
              </h2>

              <div className="max-w-[420px] lg:pb-2">
                <p className="text-sm leading-7 text-slate-500 sm:text-base">
                  Each project enters as its own screen. Scroll through the
                  deployment, understand the context, then open the complete case
                  study.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 04 — INDIVIDUAL PROJECT SCREENS                                  */}
        {/* ================================================================= */}

        <section className="relative bg-[#EEF4FF]">
          {WORK_ITEMS.map((work, index) => (
            <div
              key={work.slug}
              className="project-screen-entry mx-auto w-full max-w-[1440px]"
              style={PROJECT_SCREEN_STYLE}
            >
              <Link
                href={`/work/${work.slug}`}
                className="group grid min-h-[calc(100svh-72px)] w-full overflow-hidden bg-white lg:grid-cols-[0.82fr_1.18fr]"
              >
                {/* ========================================================= */}
                {/* LEFT PROJECT INFORMATION                                  */}
                {/* ========================================================= */}

                <div className="relative flex min-h-[520px] flex-col justify-between px-6 py-10 sm:px-10 sm:py-12 lg:min-h-[calc(100svh-72px)] lg:px-[5.5vw] lg:py-[6vh]">
                  {/* Top */}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-[#1463FF]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {work.category}
                      </span>
                    </div>

                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300">
                      ADRiG / Work
                    </span>
                  </div>

                  {/* Center */}

                  <div className="my-auto py-10">
                    <h3 className="max-w-[610px] text-[clamp(3rem,5vw,5.9rem)] font-normal leading-[0.89] tracking-[-0.065em] text-slate-950 transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {work.name}
                    </h3>

                    <p className="mt-5 text-lg font-medium text-[#1463FF]">
                      {work.client}
                    </p>

                    <p className="mt-7 max-w-[520px] text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                      {work.summary}
                    </p>
                  </div>

                  {/* Bottom */}

                  <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                    <div className="flex items-center gap-4 text-sm font-semibold text-slate-950">
                      View case study

                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E5CEE] text-white transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </div>

                    <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-slate-300 sm:block">
                      Scroll / Explore
                    </span>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* RIGHT PROJECT VISUAL                                      */}
                {/* ========================================================= */}

                <div className="relative h-[52vh] min-h-[420px] w-full overflow-hidden bg-[#E9F0FB] lg:h-auto lg:min-h-[calc(100svh-72px)]">
                  <img
                    src={getProjectImage(index, work.slug)}
                    alt={`${work.name} project`}
                    className="project-entry-image h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                  />

                  {/* Light tint */}

                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-[#06162F]/10" />

                  {/* Bottom readability */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#03142F]/45 via-transparent to-transparent" />

                  {/* Upper counter */}

                  <div className="absolute right-6 top-6 flex items-center gap-3 sm:right-8 sm:top-8">
                    <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.15)]" />

                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/80">
                      Deployment {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom information */}

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                    <div className="flex items-end justify-between gap-8 border-t border-white/20 pt-5">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                          {work.category}
                        </p>

                        <p className="mt-2 max-w-[500px] text-2xl font-normal leading-tight tracking-[-0.04em] text-white sm:text-3xl">
                          {work.name}
                        </p>
                      </div>

                      <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm sm:flex">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>

        

        {/* ================================================================= */}
        {/* 06 — CLOSING STATEMENT                                           */}
        {/* ================================================================= */}

        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#F9FBFF] py-24 sm:py-32">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at 15% 30%,
                  rgba(20,99,255,0.10),
                  transparent 30%
                ),

                radial-gradient(
                  circle at 88% 70%,
                  rgba(116,169,255,0.12),
                  transparent 32%
                )
              `,
            }}
          />

          <div className="shell relative z-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <h2 className="max-w-[960px] text-[clamp(3.4rem,6vw,7rem)] font-normal leading-[0.9] tracking-[-0.065em]">
                Different problems.
                <span className="block text-[#1463FF]">
                  Same engineering discipline.
                </span>
              </h2>

              <p className="max-w-[450px] text-base leading-7 text-slate-500 lg:pb-2">
                The interface changes. The architecture changes. The operating
                constraint changes. The standard of execution does not.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 07 — CTA                                                         */}
        {/* ================================================================= */}

        <section className="relative overflow-hidden bg-[#06162F] py-24 text-white sm:py-32">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at 82% 15%,
                  rgba(48,113,255,0.26),
                  transparent 34%
                ),

                radial-gradient(
                  circle at 12% 95%,
                  rgba(35,103,255,0.14),
                  transparent 32%
                )
              `,
            }}
          />

          <div className="shell relative z-10">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <h2 className="max-w-[1000px] text-[clamp(3.7rem,7vw,8rem)] font-normal leading-[0.87] tracking-[-0.07em]">
                Let&apos;s build the
                <span className="block text-[#75A8FF]">
                  next success story.
                </span>
              </h2>

              <div className="lg:pb-3">
                <p className="max-w-[420px] text-base leading-7 text-white/55">
                  Have a mission-critical project in mind? We&apos;re ready to
                  engineer it.
                </p>

                <Link
                  href="/contact"
                  className="group mt-7 inline-flex min-h-[52px] items-center gap-4 rounded-full bg-white px-6 text-sm font-semibold text-[#06162F] transition-transform duration-300 hover:-translate-y-1"
                >
                  Start a project

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Huge background moving typography */}

          <div className="cta-marquee pointer-events-none mt-20 flex w-max whitespace-nowrap opacity-[0.055]">
            <span className="pr-16 text-[clamp(8rem,18vw,18rem)] font-semibold leading-none tracking-[-0.08em]">
              BUILD WITH ADRIG
            </span>

            <span className="pr-16 text-[clamp(8rem,18vw,18rem)] font-semibold leading-none tracking-[-0.08em]">
              BUILD WITH ADRIG
            </span>
          </div>
        </section>
      </main>

      {/* =================================================================== */}
      {/* ANIMATION + LAYOUT CSS                                              */}
      {/* =================================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ============================================================
               HERO 3D DEPTH
            ============================================================ */


            .work-hero-visual {
              transform:
                perspective(1200px)
                rotateX(2deg)
                rotateY(-4deg);

              transform-origin: center;

              transition:
                transform 600ms cubic-bezier(.22,1,.36,1),
                box-shadow 600ms cubic-bezier(.22,1,.36,1);
            }

            .work-hero-visual:hover {
              transform:
                perspective(1200px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(-6px);

              box-shadow:
                0 55px 130px rgba(13,57,124,.20);
            }


            /* ============================================================
               OVERVIEW TEXT
            ============================================================ */

            @supports (animation-timeline: view()) {

              .overview-line {
                animation:
                  overviewReveal linear both;

                animation-timeline:
                  view();

                animation-range:
                  entry 12% cover 62%;
              }

              .overview-line:nth-child(2) {
                animation-range:
                  entry 20% cover 66%;
              }

              .overview-line:nth-child(3) {
                animation-range:
                  entry 28% cover 72%;
              }

              .overview-line:nth-child(4) {
                animation-range:
                  entry 36% cover 78%;
              }

              .overview-support {
                animation:
                  overviewSupport linear both;

                animation-timeline:
                  view();

                animation-range:
                  entry 32% cover 74%;
              }
            }


            @keyframes overviewReveal {

              from {
                opacity: .12;

                transform:
                  translate3d(
                    0,
                    36px,
                    0
                  );

                filter:
                  blur(5px);
              }

              to {
                opacity: 1;

                transform:
                  translate3d(
                    0,
                    0,
                    0
                  );

                filter:
                  blur(0);
              }
            }


            @keyframes overviewSupport {

              from {
                opacity: 0;

                transform:
                  translate3d(
                    0,
                    25px,
                    0
                  );
              }

              to {
                opacity: 1;

                transform:
                  translate3d(
                    0,
                    0,
                    0
                  );
              }
            }


            /* ============================================================
               PROJECT SCREEN STRUCTURE
               YOUR PROVIDED CSS MODEL
            ============================================================ */

            .project-screen-entry {
              width:
                min(
                  1440px,
                  100%
                );

              height:
                min-content;

              display:
                flex;

              flex-direction:
                column;

              justify-content:
                flex-start;

              align-items:
                center;

              background-color:
                #ffffff;

              overflow:
                hidden;

              padding:
                0;

              align-content:
                center;

              flex-wrap:
                nowrap;

              gap:
                0;

              position:
                relative;

              border-radius:
                0;
            }


            /* ============================================================
               DIVIDER BETWEEN SCREENS
            ============================================================ */

            .project-screen-entry +
            .project-screen-entry {
              border-top:
                1px solid
                rgba(
                  148,
                  163,
                  184,
                  0.22
                );
            }


            /* ============================================================
               INDIVIDUAL PROJECT SCREEN ENTRY
            ============================================================ */

            @supports (animation-timeline: view()) {

              .project-screen-entry {
                animation:
                  projectScreenEntry
                  linear
                  both;

                animation-timeline:
                  view();

                animation-range:
                  entry 0%
                  cover 38%;
              }
            }


            @keyframes projectScreenEntry {

              0% {
                opacity:
                  0;

                transform:
                  translate3d(
                    0,
                    105px,
                    0
                  )
                  scale(.968);

                filter:
                  blur(7px);
              }


              25% {
                opacity:
                  .35;

                transform:
                  translate3d(
                    0,
                    65px,
                    0
                  )
                  scale(.978);

                filter:
                  blur(5px);
              }


              55% {
                opacity:
                  .78;

                transform:
                  translate3d(
                    0,
                    24px,
                    0
                  )
                  scale(.992);

                filter:
                  blur(2px);
              }


              100% {
                opacity:
                  1;

                transform:
                  translate3d(
                    0,
                    0,
                    0
                  )
                  scale(1);

                filter:
                  blur(0);
              }
            }


            /* ============================================================
               IMAGE INTERNAL DEPTH
            ============================================================ */

            .project-entry-image {
              transform:
                scale(1.015);

              will-change:
                transform;
            }

            @supports (animation-timeline: view()) {

              .project-screen-entry
              .project-entry-image {
                animation:
                  projectImageDepth
                  linear
                  both;

                animation-timeline:
                  view();

                animation-range:
                  entry 0%
                  exit 100%;
              }
            }


            @keyframes projectImageDepth {

              0% {
                transform:
                  scale(1.08)
                  translate3d(
                    0,
                    30px,
                    0
                  );
              }

              45% {
                transform:
                  scale(1.025)
                  translate3d(
                    0,
                    0,
                    0
                  );
              }

              100% {
                transform:
                  scale(1.065)
                  translate3d(
                    0,
                    -26px,
                    0
                  );
              }
            }


            /* ============================================================
               CATEGORY MARQUEE
            ============================================================ */

            .work-marquee {
              animation:
                workMarquee
                26s
                linear
                infinite;
            }


            @keyframes workMarquee {

              from {
                transform:
                  translate3d(
                    0,
                    0,
                    0
                  );
              }

              to {
                transform:
                  translate3d(
                    -50%,
                    0,
                    0
                  );
              }
            }


            /* ============================================================
               CTA MARQUEE
            ============================================================ */

            .cta-marquee {
              animation:
                ctaMarquee
                24s
                linear
                infinite;
            }


            @keyframes ctaMarquee {

              from {
                transform:
                  translate3d(
                    0,
                    0,
                    0
                  );
              }

              to {
                transform:
                  translate3d(
                    -50%,
                    0,
                    0
                  );
              }
            }


            /* ============================================================
               LARGE DESKTOP — PRESENT PROJECTS LIKE 1440 DESIGN FRAMES
            ============================================================ */

            @media (
              min-width:
              1500px
            ) {

              .project-screen-entry {
                margin-top:
                  28px;

                margin-bottom:
                  28px;

                box-shadow:
                  0
                  24px
                  80px
                  rgba(
                    15,
                    55,
                    115,
                    0.08
                  );
              }
            }


            /* ============================================================
               MOBILE
            ============================================================ */

            @media (
              max-width:
              1023px
            ) {

              .project-screen-entry {
                width:
                  100%;
              }

              @keyframes projectScreenEntry {

                0% {
                  opacity:
                    0;

                  transform:
                    translate3d(
                      0,
                      55px,
                      0
                    );

                  filter:
                    blur(3px);
                }

                100% {
                  opacity:
                    1;

                  transform:
                    translate3d(
                      0,
                      0,
                      0
                    );

                  filter:
                    blur(0);
                }
              }
            }


            /* ============================================================
               REDUCED MOTION
            ============================================================ */

            @media (
              prefers-reduced-motion:
              reduce
            ) {

              html {
                scroll-behavior:
                  auto;
              }

              .work-hero-visual,
              .overview-line,
              .overview-support,
              .project-screen-entry,
              .project-entry-image,
              .work-marquee,
              .cta-marquee {
                animation:
                  none !important;

                transition:
                  none !important;

                transform:
                  none !important;

                filter:
                  none !important;
              }

              .overview-line,
              .overview-support,
              .project-screen-entry {
                opacity:
                  1 !important;
              }

              
            }
          `,
        }}
      />
    </>
  );
}