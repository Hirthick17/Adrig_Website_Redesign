"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Gsap from "/gsap"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/* ============================================================================
   ADRIG SERVICES HERO
   ----------------------------------------------------------------------------
   - Light theme
   - Relatable B2B pain point
   - Humour through operational truth
   - High-fidelity Hero Illustration
   - No navbar inside hero
   - Scroll-driven subtle motion
   ========================================================================== */

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* --------------------------------------------------------------------------
     Subtle page-exit parallax.
     ----------------------------------------------------------------------- */

  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -28],
  );

  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [1, 1, 0.45],
  );

  const illustrationY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 22],
  );

  const illustrationScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 0.985],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-hero-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        px-4
        pb-10
        pt-28
        sm:px-6
        sm:pb-14
        sm:pt-32
        lg:px-10
      "
    >
      <div
        className="
          relative
          mx-auto
          max-w-[1560px]
          overflow-hidden
          rounded-[34px]
          border
          border-[#E6EDF6]
          bg-[#F8FAFE]
          px-5
          pb-8
          pt-14
          shadow-[0_26px_80px_rgba(20,48,86,0.045)]
          sm:px-8
          sm:pb-10
          sm:pt-16
          lg:px-14
          lg:pb-12
          lg:pt-16
          xl:px-[4.5rem]
        "
      >
        {/* ==================================================================
            AMBIENT BACKGROUND
            ================================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[5%]
            top-[18%]
            h-[500px]
            w-[600px]
            rounded-full
            bg-[#0E5CEE]/[0.035]
            blur-[130px]
          "
        />

        {/* ==================================================================
            MAIN HERO GRID
            ================================================================== */}

        <div
          className="
            relative
            z-10
            grid
            min-h-[600px]
            items-center
            gap-10
            lg:grid-cols-[0.86fr_1.14fr]
            lg:gap-[4vw]
          "
        >
          {/* ================================================================
              LEFT — COPY
              ================================================================ */}

          <motion.div
            style={{
              y: copyY,
              opacity: copyOpacity,
            }}
            className="relative z-20"
          >
            {/* --------------------------------------------------------------
                EYEBROW
                ----------------------------------------------------------- */}

            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#0E5CEE]" />

              <span
                className="
                  font-mono
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#0E5CEE]
                  sm:text-[10px]
                "
              >
                ADRIG / Services
              </span>
            </motion.div>

            {/* --------------------------------------------------------------
                MAIN HEADLINE
                ----------------------------------------------------------- */}

            <motion.h1
              id="services-hero-heading"
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 28,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.76,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-7
                max-w-[680px]
                text-[clamp(3rem,5.15vw,6.4rem)]
                font-semibold
                leading-[0.93]
                tracking-[-0.058em]
                text-[#102544]
              "
            >
              Your team shouldn&apos;t
              <span className="block">
                be the{" "}
                <span className="text-[#0E5CEE]">
                  API
                </span>{" "}
                between
              </span>

              <span className="block">
                your tools.
              </span>
            </motion.h1>

            {/* --------------------------------------------------------------
                SUPPORTING COPY
                ----------------------------------------------------------- */}

            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.68,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7"
            >
              <p
                className="
                  max-w-[560px]
                  text-[15px]
                  leading-7
                  tracking-[-0.01em]
                  text-[#5D718F]
                  sm:text-[16px]
                  sm:leading-8
                "
              >
                Manual updates. Repeated follow-ups. Disconnected tools.
              </p>

              <p
                className="
                  mt-1
                  max-w-[560px]
                  text-[15px]
                  leading-7
                  tracking-[-0.01em]
                  text-[#5D718F]
                  sm:text-[16px]
                  sm:leading-8
                "
              >
                Somewhere between the files, tabs and meetings, one person is
                still holding everything together.
              </p>

              <p
                className="
                  mt-3
                  text-[14px]
                  font-medium
                  text-[#0E5CEE]
                  sm:text-[15px]
                "
              >
                It&apos;s time to fix the plumbing.
              </p>
            </motion.div>

            {/* --------------------------------------------------------------
                CTA
                ----------------------------------------------------------- */}

            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 16,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.65,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-3
                  rounded-[9px]
                  bg-[#0E5CEE]
                  px-6
                  text-[13px]
                  font-semibold
                  text-white
                  shadow-[0_10px_28px_rgba(14,92,238,0.2)]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:bg-[#0A50D3]
                  hover:shadow-[0_14px_34px_rgba(14,92,238,0.25)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0E5CEE]
                  focus-visible:ring-offset-2
                  sm:px-7
                  sm:text-[14px]
                "
              >
                Streamline My Workflow

                <span
                  aria-hidden="true"
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#0E5CEE]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>

              <Link
                href="/contact"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-[9px]
                  border
                  border-[#0E5CEE]
                  bg-white
                  px-6
                  text-[13px]
                  font-semibold
                  text-[#0E5CEE]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:bg-[#F4F8FF]
                  sm:px-7
                  sm:text-[14px]
                "
              >
                Book a Demo
              </Link>
            </motion.div>

            {/* --------------------------------------------------------------
                TRUST STRIP
                ----------------------------------------------------------- */}

            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.6,
                delay: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-10
                flex
                flex-wrap
                gap-x-7
                gap-y-4
              "
            >
              <SignalItem icon="shield">
                Secure by design
              </SignalItem>

              <SignalItem icon="check">
                Enterprise grade
              </SignalItem>

              <SignalItem icon="bolt">
                Built for scale
              </SignalItem>
            </motion.div>
          </motion.div>

          {/* ================================================================
              RIGHT — ILLUSTRATION
              ================================================================ */}

          <motion.div
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 32,
                    scale: 0.975,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.95,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              y: illustrationY,
              scale: illustrationScale,
            }}
            className="
              relative
              z-10
              flex
              min-h-[430px]
              items-center
              justify-center
              lg:min-h-[580px]
            "
          >
          <div className="relative w-full max-w-[640px] flex items-center justify-center">
              <Image
                src="/services/remove_bg/ChatGPT Image Aug 11, 2026, 07_43_44 PM (1).png"
                alt="ADRIG AI — intelligent systems ready to handle your business operations"
                width={900}
                height={900}
                priority
                className="h-auto w-full max-w-[540px] object-contain drop-shadow-[0_32px_64px_rgba(14,92,238,0.10)]"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   TRUST SIGNAL
   ========================================================================== */

function SignalItem({
  children,
  icon,
}: {
  children: ReactNode;
  icon: "shield" | "check" | "bolt";
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5
        text-[11px]
        font-medium
        text-[#4E6482]
        sm:text-[12px]
      "
    >
      <span
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-[7px]
          bg-[#EAF2FF]
          text-[#0E5CEE]
        "
      >
        {icon === "shield" && <ShieldIcon />}

        {icon === "check" && <CheckIcon />}

        {icon === "bolt" && <BoltIcon />}
      </span>

      {children}
    </div>
  );
}

/* ============================================================================
   SMALL ICONS
   ========================================================================== */

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M10 2.5 L16 5 V9.5 C16 13.2 13.6 16 10 17.5 C6.4 16 4 13.2 4 9.5 V5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M7.2 9.8 L9.2 11.8 L13.2 7.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <circle
        cx="10"
        cy="10"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M6.8 10.2 L9 12.4 L13.5 7.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M11.3 2.5 L5.8 10 H9.4 L8.7 17.5 L14.4 8.9 H10.8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
