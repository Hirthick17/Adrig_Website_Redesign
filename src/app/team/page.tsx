"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

/* =============================================================================
   DATA
============================================================================= */

const HERO_PEOPLE = [
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85",
    label: "Leadership",
    className:
      "col-span-7 row-span-7 sm:col-span-5 sm:row-span-8 lg:col-span-5",
  },
  {
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1000&q=85",
    label: "Engineering",
    className:
      "col-span-5 row-span-4 sm:col-span-3 sm:row-span-4 lg:col-span-3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85",
    label: "AI",
    className:
      "col-span-5 row-span-3 sm:col-span-4 sm:row-span-4 lg:col-span-4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
    label: "Product",
    className:
      "col-span-6 row-span-4 sm:col-span-4 sm:row-span-4 lg:col-span-4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85",
    label: "Design",
    className:
      "col-span-6 row-span-4 sm:col-span-4 sm:row-span-4 lg:col-span-4",
  },
];

const STORY_BEATS = [
  {
    number: "01",
    title: "Start with the real operating problem.",
    text: "We begin with how the business actually works — not with a technology stack we want to sell.",
  },
  {
    number: "02",
    title: "Reduce complexity before adding intelligence.",
    text: "Good AI cannot rescue a broken workflow. We simplify the system first, then automate where leverage is real.",
  },
  {
    number: "03",
    title: "Keep engineering close to the decision.",
    text: "Architecture, product decisions and client context stay connected instead of being passed through layers of account management.",
  },
  {
    number: "04",
    title: "Ship systems that survive production.",
    text: "The outcome is not a presentation or prototype. It is a system designed around actual users, load and operational constraints.",
  },
];

const LEADERSHIP = [
  {
    name: "Leadership Member",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85",
    bio: "Leads ADRIG's product direction, client strategy and technology delivery.",
    linkedin: "#",
  },
  {
    name: "Leadership Member",
    role: "Technology Lead",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1200&q=85",
    bio: "Owns system architecture, engineering quality and production reliability.",
    linkedin: "#",
  },
  {
    name: "Leadership Member",
    role: "AI & Automation Lead",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
    bio: "Leads applied AI, intelligent workflows and automation implementation.",
    linkedin: "#",
  },
];

const TEAM = [
  {
    name: "Team Member",
    role: "AI Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Team Member",
    role: "Full Stack Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Team Member",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Team Member",
    role: "Automation Engineer",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Team Member",
    role: "Frontend Engineer",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Team Member",
    role: "Backend Engineer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Team Member",
    role: "AI Research Engineer",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Team Member",
    role: "Business Analyst",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARISON = [
  {
    typical: "Starts with a preferred stack.",
    adrig: "Starts with your operating problem.",
  },
  {
    typical: "Adds AI because it sounds valuable.",
    adrig: "Adds AI only where it removes measurable friction.",
  },
  {
    typical: "Architecture is separated from client context.",
    adrig: "Engineers stay close to the business decision.",
  },
  {
    typical: "Success means delivery completed.",
    adrig: "Success means the system works in production.",
  },
];

const IMPACT = [
  ["20+", "Products & systems shipped"],
  ["8+", "Technology domains"],
  ["100%", "Build-to-deployment focus"],
  ["24/7", "Production-minded systems"],
];

/* =============================================================================
   STORY TRACK COMPONENT (Container-Scoped, Natural Scroll)
============================================================================= */

function StoryTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Exactly translates through the 4 panels (0% to -75%) strictly when inside this section
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="story-track relative h-[300vh] bg-[#06162F] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-6 top-8 z-20 sm:left-10 lg:left-[6vw]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
            Our Story
          </p>
        </div>

        <motion.div style={{ x }} className="flex h-full w-[400vw]">
          {STORY_BEATS.map((beat) => (
            <article
              key={beat.number}
              className="story-panel flex h-screen w-screen shrink-0 items-center px-6 sm:px-10 lg:px-[8vw]"
            >
              <div className="grid w-full gap-10 lg:grid-cols-[180px_1fr] lg:items-end">
                <span className="font-mono text-[clamp(4rem,8vw,8rem)] leading-none tracking-[-0.08em] text-white/[0.08]">
                  {beat.number}
                </span>

                <div>
                  <h2 className="max-w-[1100px] text-[clamp(2.6rem,5.5vw,6.5rem)] font-normal leading-[0.9] tracking-[-0.065em]">
                    {beat.title}
                  </h2>

                  <p className="mt-8 max-w-[700px] text-base leading-8 text-white/50 sm:text-lg">
                    {beat.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-6 right-6 z-20 sm:left-10 sm:right-10 lg:left-[6vw] lg:right-[6vw]">
          <div className="h-px bg-white/10 overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-[#4D8EFF]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   PAGE
============================================================================= */

export default function TeamPage() {
  return (
    <>
      <main className="overflow-x-clip bg-[#F8FBFF] text-slate-950">
        {/* ================================================================= */}
        {/* 01 — TEAM HERO                                                   */}
        {/* ================================================================= */}

        <section className="relative min-h-[88svh] overflow-hidden border-b border-slate-200/70">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 82% 25%, rgba(20,99,255,.14), transparent 34%),
                radial-gradient(circle at 15% 90%, rgba(115,170,255,.10), transparent 30%),
                linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)
              `,
            }}
          />

          <div className="shell relative z-10 grid min-h-[88svh] items-center gap-14 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-[6vw]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1463FF]">
                ADRIG / Team
              </p>

              <h1 className="mt-6 max-w-[720px] text-[clamp(3.7rem,6.7vw,7.6rem)] font-normal leading-[0.88] tracking-[-0.07em]">
                People who
                <span className="block">build close to</span>

                <span className="block bg-gradient-to-r from-[#0E5CEE] via-[#1463FF] to-[#75A8FF] bg-clip-text text-transparent">
                  the problem.
                </span>
              </h1>

              <p className="mt-8 max-w-[560px] text-base leading-8 text-slate-500 sm:text-lg">
                Engineering, AI, automation and product thinking working as one
                delivery team — without the layers that usually separate
                technical decisions from business context.
              </p>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-5">
                <span className="text-xs text-slate-500">
                  Engineering-led
                </span>

                <span className="text-xs text-slate-500">
                  Production-focused
                </span>

                <span className="text-xs text-slate-500">
                  Client-close
                </span>
              </div>
            </div>

            {/* BENTO PEOPLE GRID */}
            <div className="team-bento grid h-[610px] grid-cols-12 grid-rows-12 gap-3">
              {HERO_PEOPLE.map((person, index) => (
                <div
                  key={index}
                  className={`${person.className} team-bento-cell group relative overflow-hidden rounded-[24px] bg-[#EAF1FC]`}
                >
                  <img
                    src={person.image}
                    alt={person.label}
                    className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.045] group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#06162F]/60 via-transparent to-transparent opacity-70" />

                  <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-full border border-white/30 bg-slate-950/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {person.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 02 — OUR STORY / CONTAINER-SCOPED SMOOTH HORIZONTAL SCROLL       */}
        {/* ================================================================= */}
        <StoryTrack />

        {/* ================================================================= */}
        {/* 03 — LEADERSHIP                                                  */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-[#F8FBFF] py-24 sm:py-32">
          <div className="shell">
            <div className="mb-14 grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <h2 className="max-w-[950px] text-[clamp(3rem,5.4vw,6.3rem)] font-normal leading-[0.9] tracking-[-0.065em]">
                Leadership that stays
                <span className="block text-[#1463FF]">
                  close to the work.
                </span>
              </h2>

              <p className="max-w-[480px] text-base leading-7 text-slate-500">
                Technical and product decisions do not disappear through layers
                of management. The people responsible for direction remain
                involved in delivery.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {LEADERSHIP.map((member, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <article className="leadership-card group relative min-h-[580px] overflow-hidden rounded-[26px] bg-[#06162F] shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#06162F]/95 via-[#06162F]/15 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-blue-200">
                        Leadership / 0{index + 1}
                      </span>

                      <h3 className="mt-4 text-3xl tracking-[-0.045em] text-white">
                        {member.name}
                      </h3>

                      <p className="mt-2 text-sm text-blue-200">{member.role}</p>

                      <div className="leadership-reveal">
                        <p className="mt-5 max-w-[400px] text-sm leading-6 text-white/65">
                          {member.bio}
                        </p>

                        <a
                          href={member.linkedin}
                          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-blue-300 transition-colors"
                        >
                          LinkedIn ↗
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 04 — THE TEAM                                                    */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-white py-24 sm:py-32">
          <div className="shell">
            <div className="mb-12 flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
              <h2 className="text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                Different disciplines.
                <span className="block text-[#1463FF]">One delivery team.</span>
              </h2>

              <p className="max-w-[430px] text-sm leading-7 text-slate-500">
                Hover for identity. The page stays visual first — bios belong to
                leadership, not every team member.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {TEAM.map((member, index) => (
                <Reveal key={index} delay={(index % 4) * 0.04}>
                  <article
                    className={`team-cell group relative overflow-hidden rounded-2xl bg-[#EDF3FC] ${
                      index === 0 || index === 5
                        ? "aspect-[1.15/1]"
                        : "aspect-[0.82/1]"
                    }`}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#06162F]/75 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />

                    <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 transition-transform duration-400 group-hover:translate-y-0">
                      <h3 className="text-lg font-medium tracking-[-0.03em] text-white">
                        {member.name}
                      </h3>

                      <p className="mt-1 text-xs text-white/60">{member.role}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 05 — WHY ADRIG / COMPARISON                                     */}
        {/* ================================================================= */}

        <section className="relative border-b border-slate-200/70 bg-[#F8FBFF] py-24 sm:py-32">
          <div className="shell">
            <div className="max-w-[900px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                Why ADRIG
              </p>

              <h2 className="mt-6 text-[clamp(3rem,5.3vw,6rem)] font-normal leading-[0.91] tracking-[-0.06em]">
                Don&apos;t trust the claim.
                <span className="block text-[#1463FF]">
                  Look at the contrast.
                </span>
              </h2>
            </div>

            <div className="mt-14 overflow-hidden border-y border-slate-200">
              <div className="grid grid-cols-[1fr_1fr] border-b border-slate-200">
                <div className="border-r border-slate-200 px-5 py-4 sm:px-8">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    Typical delivery model
                  </span>
                </div>

                <div className="px-5 py-4 sm:px-8">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#1463FF]">
                    ADRIG
                  </span>
                </div>
              </div>

              {COMPARISON.map((item, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="comparison-row grid min-h-[140px] grid-cols-[1fr_1fr] border-b border-slate-100 last:border-b-0">
                    <div className="flex items-center border-r border-slate-200 px-5 py-7 sm:px-8">
                      <p className="max-w-[520px] text-[clamp(1.2rem,2vw,2.1rem)] leading-tight tracking-[-0.04em] text-slate-400">
                        {item.typical}
                      </p>
                    </div>

                    <div className="flex items-center px-5 py-7 sm:px-8">
                      <p className="max-w-[560px] text-[clamp(1.2rem,2vw,2.1rem)] leading-tight tracking-[-0.04em] text-slate-950">
                        {item.adrig}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 06 — IMPACT                                                      */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-white py-20 sm:py-28">
          <div className="shell">
            <div className="grid border-y border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {IMPACT.map(([value, label], index) => (
                <Reveal key={label} delay={index * 0.05}>
                  <div className="impact-cell min-h-[220px] border-b border-slate-200 p-6 sm:border-r lg:border-b-0">
                    <span className="font-mono text-[9px] text-slate-400">
                      0{index + 1}
                    </span>

                    <p className="mt-12 text-[clamp(3.2rem,4.8vw,5.5rem)] leading-none tracking-[-0.07em] text-[#0E5CEE]">
                      {value}
                    </p>

                    <p className="mt-4 max-w-[220px] text-sm leading-6 text-slate-500">
                      {label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 07 — CAREERS                                                     */}
        {/* ================================================================= */}

        <section className="border-b border-slate-200/70 bg-[#F8FBFF] py-14">
          <div className="shell">
            <div className="flex flex-col gap-8 border-y border-slate-200 py-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#1463FF]">
                  Careers / Opening Soon
                </p>

                <h2 className="mt-3 text-2xl tracking-[-0.04em] sm:text-3xl">
                  Want to build difficult things with us?
                </h2>
              </div>

              <form className="flex w-full max-w-[520px] border-b border-slate-300">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="min-h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />

                <button
                  type="submit"
                  className="text-sm font-semibold text-[#0E5CEE]"
                >
                  Notify me →
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 08 — CTA                                                         */}
        {/* ================================================================= */}

        <section className="relative overflow-hidden bg-[#06162F] py-24 text-white sm:py-32">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 82% 16%, rgba(55,120,255,.30), transparent 36%)",
            }}
          />

          <div className="shell relative z-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <h2 className="max-w-[1000px] text-[clamp(3.8rem,7vw,8rem)] font-normal leading-[0.87] tracking-[-0.07em]">
              Want to work
              <span className="block text-[#75A8FF]">with this team?</span>
            </h2>

            <div>
              <p className="max-w-[430px] text-base leading-7 text-white/55">
                Bring the real problem. We&apos;ll work out what the system
                needs to become.
              </p>

              <Link
                href="/contact"
                className="group mt-7 inline-flex min-h-[52px] items-center gap-4 rounded-full bg-white px-6 text-sm font-semibold text-[#06162F] transition-transform hover:-translate-y-1"
              >
                Start a conversation
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .team-bento-cell {
              transform: translateZ(0);
            }

            .leadership-reveal {
              max-height: 0;
              opacity: 0;
              transform: translateY(14px);
              transition:
                max-height 500ms cubic-bezier(.22,1,.36,1),
                opacity 350ms ease,
                transform 450ms cubic-bezier(.22,1,.36,1);
            }

            .leadership-card:hover .leadership-reveal {
              max-height: 220px;
              opacity: 1;
              transform: translateY(0);
            }

            @media (prefers-reduced-motion: reduce) {
              .story-track {
                height: auto;
              }
              .story-track > div {
                position: relative;
                height: auto;
              }
              .leadership-reveal {
                max-height: 220px;
                opacity: 1;
                transform: none;
              }
            }
          `,
        }}
      />
    </>
  );
}