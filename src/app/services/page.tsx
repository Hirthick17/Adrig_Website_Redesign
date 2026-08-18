import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import CTASection from "@/components/ui/CTASection";
import { SERVICES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services — ADRIG",
  description:
    "AI, automation, software and data engineering capabilities designed as one connected technology practice.",
};

export default function ServicesIndex() {
  return (
    <>
      <main className="overflow-hidden bg-[#FAFCFF] text-slate-950">
        {/* ============================================================
            01 — SERVICES HERO
        ============================================================ */}

        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#FAFCFF]">
          <BlueprintBackground />

          {/* restrained ambient light */}
          <div className="pointer-events-none absolute left-[12%] top-[22%] h-[520px] w-[520px] rounded-full bg-[#1463FF]/[0.055] blur-[140px]" />

          <div className="shell relative z-10 mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
            {/* top label */}

            <div className="services-reveal flex items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#1463FF]" />

                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1463FF]">
                  ADRIG Services
                </p>
              </div>

              <p className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:block">
                {String(SERVICES.length).padStart(2, "0")} capabilities
              </p>
            </div>

            {/* headline */}

            <div className="mt-9 grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-[8vw]">
              <div className="services-reveal services-delay-1">
                <h1 className="max-w-[950px] text-[clamp(4rem,7.5vw,8.5rem)] font-normal leading-[0.86] tracking-[-0.075em] text-slate-950">
                  Different
                  <span className="block">capabilities.</span>

                  <span className="block text-[#1463FF]">
                    One system mindset.
                  </span>
                </h1>
              </div>

              <div className="services-reveal services-delay-2 pb-2">
                <p className="max-w-[470px] text-base leading-8 text-slate-600 sm:text-lg">
                  AI, automation, software and data engineering designed as one
                  connected practice — from the first operating constraint to
                  production deployment.
                </p>

                <a
                  href="#capabilities"
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-slate-950"
                >
                  Explore capabilities

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 transition-all duration-300 group-hover:border-[#1463FF] group-hover:bg-[#1463FF] group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>

            {/* bottom system line */}

            <div className="services-reveal services-delay-3 mt-16 grid grid-cols-2 border-t border-slate-200 pt-6 sm:grid-cols-4">
              <HeroMetric
                label="Approach"
                value="Problem → System"
              />

              <HeroMetric
                label="Architecture"
                value="Production First"
                bordered
              />

              <HeroMetric
                label="Deployment"
                value="Cloud / Private"
                bordered
              />

              <HeroMetric
                label="Ownership"
                value="Client Controlled"
                bordered
              />
            </div>
          </div>
        </section>

        {/* ============================================================
            02 — CAPABILITY DIRECTORY
        ============================================================ */}

        <section
          id="capabilities"
          className="relative border-b border-slate-200/70 bg-white py-20 sm:py-28"
        >
          <div className="shell mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            {/* intro */}

            <div className="service-scroll-reveal mb-14 grid gap-8 lg:grid-cols-[0.48fr_1.52fr] lg:gap-[7vw]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                  Capability directory
                </p>
              </div>

              <div>
                <h2 className="max-w-[850px] text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.94] tracking-[-0.06em] text-slate-950">
                  Start with the problem,
                  <span className="block text-slate-500">
                    not the technology.
                  </span>
                </h2>

                <p className="mt-6 max-w-[650px] text-base leading-8 text-slate-600">
                  Each capability is designed around a different operational
                  constraint, but they share the same engineering principles:
                  reliability, observability, security and measurable outcomes.
                </p>
              </div>
            </div>

            {/* ========================================================
                SERVICE ROWS
            ======================================================== */}

            <div className="border-t border-slate-200">
              {SERVICES.map((service, index) => (
                <ServiceRow
                  key={service.slug}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            03 — CONNECTED PRACTICE STATEMENT
        ============================================================ */}

        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#FAFCFF] py-24 sm:py-32">
          <BlueprintBackground />

          <div className="shell relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="service-scroll-reveal grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-[9vw]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
                  One connected practice
                </p>
              </div>

              <div>
                <h2 className="max-w-[900px] text-[clamp(3.2rem,5.3vw,6rem)] font-normal leading-[0.93] tracking-[-0.065em] text-slate-950">
                  The service changes.
                  <span className="block text-[#1463FF]">
                    The engineering standard doesn&apos;t.
                  </span>
                </h2>

                <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-slate-200 bg-slate-200 sm:grid-cols-2">
                  <Principle
                    index="01"
                    title="Architecture before implementation"
                    description="System boundaries, failure states and operating constraints are defined before production code."
                  />

                  <Principle
                    index="02"
                    title="Observable by default"
                    description="Telemetry, auditability and failure visibility are treated as architecture, not post-launch add-ons."
                  />

                  <Principle
                    index="03"
                    title="Built for ownership"
                    description="Infrastructure, code and intellectual property remain understandable and controllable by the client."
                  />

                  <Principle
                    index="04"
                    title="Measured by outcomes"
                    description="The system is judged by operational improvement rather than feature count or technical novelty."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      {/* ============================================================
          LOCAL PAGE MOTION
      ============================================================ */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .services-reveal {
              animation: servicesHeroReveal 800ms cubic-bezier(.22,1,.36,1) both;
            }

            .services-delay-1 {
              animation-delay: 80ms;
            }

            .services-delay-2 {
              animation-delay: 160ms;
            }

            .services-delay-3 {
              animation-delay: 240ms;
            }

            @keyframes servicesHeroReveal {
              from {
                opacity: 0;
                transform: translateY(24px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .service-scroll-reveal {
              opacity: 1;
              transform: none;
            }

            @supports (animation-timeline: view()) {
              .service-scroll-reveal {
                opacity: 0;
                transform: translateY(28px);
                animation: serviceViewReveal linear both;
                animation-timeline: view();
                animation-range: entry 5% cover 25%;
              }

              @keyframes serviceViewReveal {
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            }

            .service-directory-row {
              position: relative;
              isolation: isolate;
            }

            .service-directory-row::before {
              content: "";
              position: absolute;
              inset: 0;
              z-index: -1;
              background: #f8fbff;
              transform: scaleY(0);
              transform-origin: bottom;
              transition: transform 420ms cubic-bezier(.22,1,.36,1);
            }

            .service-directory-row:hover::before {
              transform: scaleY(1);
            }

            .service-directory-row .service-arrow {
              transition:
                transform 350ms cubic-bezier(.22,1,.36,1),
                background 350ms ease,
                border-color 350ms ease,
                color 350ms ease;
            }

            .service-directory-row:hover .service-arrow {
              transform: translate(3px,-3px);
              background: #1463ff;
              border-color: #1463ff;
              color: white;
            }

            .service-directory-row .service-title {
              transition:
                color 300ms ease,
                transform 350ms cubic-bezier(.22,1,.36,1);
            }

            .service-directory-row:hover .service-title {
              color: #1463ff;
              transform: translateX(5px);
            }

            .service-directory-row .service-index {
              transition: color 300ms ease;
            }

            .service-directory-row:hover .service-index {
              color: #1463ff;
            }

            @media (prefers-reduced-motion: reduce) {
              .services-reveal,
              .service-scroll-reveal {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
              }

              .service-directory-row::before,
              .service-directory-row .service-arrow,
              .service-directory-row .service-title {
                transition: none !important;
              }
            }
          `,
        }}
      />
    </>
  );
}

/* ================================================================
   SERVICE ROW
================================================================ */

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="service-directory-row service-scroll-reveal group grid min-h-[250px] border-b border-slate-200 py-9 sm:py-11 lg:grid-cols-[0.22fr_0.78fr_1fr_auto] lg:items-center lg:gap-8"
    >
      {/* NUMBER */}

      <div>
        <span className="service-index font-mono text-[10px] tracking-[0.18em] text-slate-400">
          {String(index + 1).padStart(3, "0")}
        </span>
      </div>

      {/* SERVICE NAME */}

      <div className="mt-5 lg:mt-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
          Capability
        </p>

        <h3 className="service-title mt-3 max-w-[390px] text-[clamp(1.9rem,2.7vw,3.3rem)] font-medium leading-[0.98] tracking-[-0.05em] text-slate-950">
          {service.name}
        </h3>
      </div>

      {/* OVERVIEW */}

      <div className="mt-6 lg:mt-0">
        <p className="max-w-[570px] text-sm leading-7 text-slate-600 sm:text-base">
          {service.overview}
        </p>
      </div>

      {/* ACTION */}

      <div className="mt-8 flex items-center justify-between lg:mt-0 lg:block">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 lg:hidden">
          View capability
        </span>

        <span className="service-arrow flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/* ================================================================
   HERO META ITEM
================================================================ */

function HeroMetric({
  label,
  value,
  bordered = false,
}: {
  label: string;
  value: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`py-2 ${
        bordered
          ? "border-l border-slate-200 pl-5 sm:pl-7"
          : "pr-5"
      }`}
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-xs font-medium tracking-[-0.015em] text-slate-800 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   ENGINEERING PRINCIPLE
================================================================ */

function Principle({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-7 sm:p-8">
      <span className="font-mono text-[9px] text-[#1463FF]">
        {index}
      </span>

      <h3 className="mt-8 max-w-[320px] text-xl font-medium leading-tight tracking-[-0.035em] text-slate-950">
        {title}
      </h3>

      <p className="mt-4 max-w-[340px] text-sm leading-7 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* ================================================================
   BACKGROUND
================================================================ */

function BlueprintBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
    />
  );
}