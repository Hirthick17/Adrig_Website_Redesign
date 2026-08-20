"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import CTASection from "@/components/ui/CTASection";
import ServicesHero from "@/components/services/ServicesHero";
import { SERVICES } from "@/lib/site-data";

/* ============================================================================
   ADRIG SERVICES
   ----------------------------------------------------------------------------
   Structure intentionally follows the motion language of the reference repo:

   01. Custom ADRIG hero
       - NO complex scene
       - NO text inside SVG
       - white background
       - employee + outlined tools
       - huge bottom editorial text

   02. Craft-style section
       - large scroll-reveal statement
       - vertical relatable problem cards

   03. Real-style section
       - vertical scroll drives horizontal capability movement
       - one service at a time
       - problem-first storytelling

   04. Impact-style section
       - replaced "trust / impact" with relatable operational friction

   05. Paragraph-style editorial statement

   06. Capsule-style resolution section

   07. Existing ADRIG CTA

   NOTE:
   No screenshots.
   No scene keyframes.
   No Three.js.
   No 3D.
   SVG is used only as clean infographic illustration.
   ========================================================================== */

type Service = (typeof SERVICES)[number];

type GlyphType =
  | "chat"
  | "software"
  | "workflow"
  | "automation"
  | "llm"
  | "consulting"
  | "data"
  | "talent";

type ServiceStory = {
  question: string;
  paragraph: string;
  metricNumber: string;
  metricLabel: string;
  glyph: GlyphType;
};

/* ============================================================================
   STORY COPY
   ========================================================================== */

function getServiceStory(service: Service): ServiceStory {
  const slug = service.slug.toLowerCase();
  const name = service.name.toLowerCase();

  if (slug.includes("chatbot") || name.includes("chatbot")) {
    return {
      question: "How many times did we answer this today?",
      paragraph:
        "Customer questions repeat while your team manually types the same answers. ADRIG builds intelligent conversational AI grounded in your knowledge base, resolving requests instantly across web, WhatsApp, and social.",
      metricNumber: "70%",
      metricLabel: "Reduction in repetitive customer support tickets",
      glyph: "chat",
    };
  }

  if (slug.includes("software") || name.includes("software")) {
    return {
      question: "At what point did the spreadsheet become the entire product?",
      paragraph:
        "Generic SaaS and endless manual spreadsheets create operational drag. We engineer custom cloud software and internal platforms built specifically around your team's real workflows, access rules, and business logic.",
      metricNumber: "4x",
      metricLabel: "Faster operational workflow throughput",
      glyph: "software",
    };
  }

  if (slug.includes("workflow") || name.includes("workflow")) {
    return {
      question: "One update. Five systems. Why is someone still re-entering it?",
      paragraph:
        "The work is finished, but someone still has to notify every tool. We connect event triggers, business rules, and multi-system integrations so data flows automatically through your entire stack.",
      metricNumber: "100%",
      metricLabel: "Automated cross-system data synchronization",
      glyph: "workflow",
    };
  }

  if (slug.includes("ai-automation") || name.includes("ai automation")) {
    return {
      question: "Why is your smartest employee moving values between browser tabs?",
      paragraph:
        "Nobody was hired for repetitive copy-pasting, yet it dominates the workweek. ADRIG implements intelligent autonomous agents and RPA pipelines that handle complex document workflows and routine operational decisions.",
      metricNumber: "15+ hrs",
      metricLabel: "Saved per team member every single week",
      glyph: "automation",
    };
  }

  if (slug.includes("generative") || name.includes("generative") || slug.includes("llm")) {
    return {
      question: "The AI demo worked. How do we make it enterprise production-ready?",
      paragraph:
        "Moving from prototype to production demands security, permissions, and zero hallucinations. We ground large language models directly into your enterprise data with audited, private RAG pipelines.",
      metricNumber: "99.2%",
      metricLabel: "Factual retrieval accuracy with enterprise RAG",
      glyph: "llm",
    };
  }

  if (slug.includes("ai-ml") || name.includes("artificial intelligence") || name.includes("ml")) {
    return {
      question: "How do we turn historical data into proactive operational decisions?",
      paragraph:
        "Traditional software reports on the past; machine learning anticipates what comes next. We design custom predictive models and inference pipelines that detect anomalies and optimize resources automatically.",
      metricNumber: "< 50ms",
      metricLabel: "Real-time predictive inference latency",
      glyph: "consulting",
    };
  }

  if (slug.includes("data-engineering") || name.includes("data engineering")) {
    return {
      question: "Why does every team look at a different version of the truth?",
      paragraph:
        "Siloed databases and brittle ETL pipelines cause conflicting metrics and delayed decisions. ADRIG designs unified data pipelines, lakehouses, and real-time streaming architectures that keep your organization in sync.",
      metricNumber: "10x",
      metricLabel: "Faster data ingestion and warehouse readiness",
      glyph: "data",
    };
  }

  if (slug.includes("predictive") || name.includes("analytics") || name.includes("data analysis")) {
    return {
      question: "The dashboard answered yesterday's question — what about tomorrow?",
      paragraph:
        "Reports are only valuable if they arrive in time to influence the outcome. We structure advanced data analytics and predictive forecasting models that turn complex data streams into clear next actions.",
      metricNumber: "35%",
      metricLabel: "Improvement in demand and forecast precision",
      glyph: "data",
    };
  }

  return {
    question: "Somebody is still doing work the system should understand.",
    paragraph:
      "Manual coordination gave way to workarounds long before anyone decided it should. ADRIG designs repeatable, production-grade systems engineered around your exact operating constraints.",
    metricNumber: "60%",
    metricLabel: "Reduction in end-to-end process turnaround time",
    glyph: "workflow",
  };
}

/* ============================================================================
   PAGE
   ========================================================================== */

export default function ServicesIndex() {
  return (
    <main className="overflow-x-clip bg-white text-[#0B1220]">
      <ServicesHero />

      <CraftProblemSection />

      <HorizontalServices />

      <RelatabilitySection />

      <ManifestoSection />

      <CapsuleResolution />

      <CTASection />
    </main>
  );
}

/* ============================================================================
   02 — CRAFT-STYLE PROBLEM SECTION
   ========================================================================== */

function CraftProblemSection() {
  const headline =
    "We build around the work everyone keeps doing twice.";

  return (
    <section
      className="
        services-craft relative border-b border-slate-300
        bg-[#EEF5FF] py-24 sm:py-32 lg:py-40
      "
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
    

        {/* main layout */}

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[7vw]">
          {/* ==============================================================
              LARGE TEXT
             ============================================================== */}

          <div className="self-start lg:sticky lg:top-28">
            <h2
              className="
                max-w-[900px]
                text-[clamp(3.5rem,6.2vw,7rem)]
                font-normal leading-[0.96]
                tracking-[-0.066em]
                text-[#0B1220]
              "
            >
              {headline.split(" ").map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="craft-word mr-[0.22em] inline-block"
                >
                  {word}
                </span>
              ))}
            </h2>

            <a
              href="#capabilities"
              className="
                mt-10 inline-flex items-center gap-4
                border border-[#0B1220]
                px-5 py-4 text-xs font-semibold uppercase
                tracking-[0.08em]
                transition-colors
                hover:bg-[#0B1220] hover:text-white
              "
            >
              Our Services

              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* ==============================================================
              RELATABLE CARDS
             ============================================================== */}

          <div className="space-y-7">
            <RelatableCard
              number="01"
              title="The copy-it-again problem"
              body="One system changed. Four others are waiting for a person to notice."
              glyph="copy"
            />

            <RelatableCard
              number="02"
              title="The follow-up loop"
              body="The workflow technically works — once somebody reminds everybody involved."
              glyph="loop"
            />

            <RelatableCard
              number="03"
              title="The one-person dependency"
              body="Everything is documented. Everything is also somehow inside one employee’s head."
              glyph="person"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatableCard({
  number,
  title,
  body,
  glyph,
}: {
  number: string;
  title: string;
  body: string;
  glyph: "copy" | "loop" | "person";
}) {
  return (
    <article
      className="
        craft-card grid min-h-[220px]
        grid-cols-[80px_1fr]
        items-center gap-6
        border border-[#0B1220]/60
        bg-transparent p-7 sm:p-9
      "
    >
      <ProblemGlyph type={glyph} />

      <div>
        <span className="font-mono text-[9px] tracking-[0.17em] text-[#0E5CEE]">
          {number}
        </span>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#0B1220]">
          {title}
        </h3>

        <p className="mt-4 max-w-[430px] text-base leading-7 text-slate-600">
          {body}
        </p>
      </div>
    </article>
  );
}

/* ============================================================================
   03 — REAL-STYLE HORIZONTAL SERVICES
   ========================================================================== */

/* ============================================================================
   SERVICE ILLUSTRATIONS
   ----------------------------------------------------------------------------
   Put assets in:
   /public/images/services/

   No circles.
   No visual cards.
   No background behind illustration.

   Each illustration:
   - transparent PNG
   - human / workflow centered
   - ADRIG blue + white line-art
   - emotion communicates the service benefit
   ========================================================================== */

const SERVICE_ILLUSTRATIONS = [
  {
    match: ["chatbot"],
    src: "/images/services/chatbot-development.png",
    alt:
      "Conversational AI chatbot interface streamlining customer inquiries and support workflows",
  },
  {
    match: ["software development", "software"],
    src: "/images/services/software-development.png",
    alt:
      "Custom software engineering and resilient cloud systems architecture",
  },
  {
    match: ["workflow automation", "workflow"],
    src: "/images/services/workflow-automation.png",
    alt:
      "Automated enterprise workflow pipelines connecting business systems seamlessly",
  },
  {
    match: ["ai-automation", "ai automation"],
    src: "/images/services/ai-automation.png",
    alt:
      "Intelligent process automation and autonomous agent execution",
  },
  {
    match: ["generative ai", "generative", "llm"],
    src: "/images/services/generative-ai.png",
    alt:
      "Enterprise generative AI and private LLM systems grounded in proprietary data",
  },
  {
    match: [
      "ai and ml",
      "ai ml",
      "machine learning",
      "artificial intelligence machine learning",
      "ai-ml",
      "consultation",
    ],
    src: "/images/services/ai-ml.png",
    alt:
      "Machine learning model training and predictive computer vision intelligence",
  },
  {
    match: ["data engineering", "data-engineering"],
    src: "/images/services/data-engineering.png",
    alt:
      "Unified streaming data pipelines and high-performance lakehouse infrastructure",
  },
  {
    match: [
      "predictive",
      "data analysis",
      "predictive analytics",
      "data-analysis",
    ],
    src: "/images/services/data-predictive-analysis.png",
    alt:
      "Executive decision dashboards and real-time predictive analytics",
  },
];

function getServiceIllustration(serviceName: string, slug: string) {
  const target = `${serviceName} ${slug}`.toLowerCase();
  const found = SERVICE_ILLUSTRATIONS.find((item) =>
    item.match.some((pattern) => target.includes(pattern))
  );
  if (found) return found;
  return {
    src: "/images/services/software-development.png",
    alt: "ADRIG AI — intelligent systems ready to handle your business challenges",
  };
}

/* ============================================================================
   03 — REAL-STYLE HORIZONTAL SERVICES
   ========================================================================== */

function HorizontalServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(SERVICES.length - 1) * 100}vw`],
  );

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="services-real relative bg-white"
      style={{
        height: `${SERVICES.length * 100}vh`,
      }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="services-track flex h-full w-full"
        >
          {SERVICES.map((service, index) => (
            <ServiceSlide
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceSlide({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const story = getServiceStory(service);
  const illustration = getServiceIllustration(service.name, service.slug);
  const question =
    story.question ??
    "Still solving this manually every single week?";

  const result =
    story.metricLabel
      ? `Result: ${story.metricNumber} ${story.metricLabel}`
      : "Result: the workflow moves forward without your team becoming the middleware.";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="service-motion-slide relative flex h-screen w-screen flex-none items-center justify-center overflow-hidden border-r border-slate-200 bg-white"
    >
      <Link
        href={`/services/${service.slug}`}
        className="
          group relative isolate flex h-full w-full items-center overflow-hidden
          bg-white
          transition-colors duration-300
          hover:bg-[#F8FAFE]
        "
      >
        {/* Subtle ambient blue glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute right-[10%] top-[20%]
            h-[500px] w-[500px] rounded-full
            bg-[#0E5CEE]/[0.035] blur-[140px]
          "
        />

        <div
          className="
            relative mx-auto w-full max-w-[1600px]
            px-6 py-10
            sm:px-8 sm:py-12
            lg:px-12 lg:py-14
          "
        >
          <div
            className="
              grid items-center gap-10
              lg:grid-cols-[minmax(0,1fr)_460px]
              xl:grid-cols-[minmax(0,1fr)_560px]
            "
          >
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 max-w-[760px]"
            >
              {/* INDEX */}
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#0E5CEE]" />
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#0E5CEE]">
                  {String(index + 1).padStart(3, "0")}
                </span>
              </div>

              {/* QUESTION */}
              <p
                className="
                  mt-6 max-w-[620px]
                  text-[clamp(1.1rem,1.4vw,1.4rem)]
                  font-medium leading-[1.45]
                  tracking-[-0.02em]
                  text-slate-500
                "
              >
                {question}
              </p>

              {/* SERVICE */}
              <h3
                className="
                  mt-5 max-w-[700px]
                  text-[clamp(2.4rem,4vw,4.8rem)]
                  font-medium leading-[0.96]
                  tracking-[-0.055em]
                  text-[#0B1220]
                "
              >
                {service.name}
              </h3>

              {/* EXPLANATION */}
              <p
                className="
                  mt-6 max-w-[620px]
                  text-[15px] leading-8 text-slate-600
                  sm:text-[17px]
                "
              >
                {story.paragraph || service.overview}
              </p>

              {/* RESULT */}
              <p
                className="
                  mt-6 max-w-[660px]
                  text-[15px] font-medium leading-7
                  text-[#0E5CEE] sm:text-[16px]
                "
              >
                {result}
              </p>

              {/* ACTION (Solid royal blue button with white text and arrow badge) */}
              <div className="mt-9 flex items-center">
                <span
                  className="
                    inline-flex h-14 items-center justify-center gap-3.5
                    rounded-full bg-[#0E5CEE] px-8 py-3.5
                    text-[15px] sm:text-[16px] font-semibold text-white
                    shadow-[0_12px_32px_rgba(14,92,238,0.22)]
                    transition-all duration-300
                    group-hover:-translate-y-0.5 group-hover:bg-[#0A50D3]
                    group-hover:shadow-[0_18px_44px_rgba(14,92,238,0.32)]
                    group-hover:scale-[1.03]
                  "
                >
                  <span>View capability</span>
                  <span
                    className="
                      flex h-7 w-7 items-center justify-center
                      rounded-full bg-white/20 text-white
                      transition-transform duration-300
                      group-hover:translate-x-1 group-hover:-translate-y-0.5
                    "
                  >
                    <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                  </span>
                </span>
              </div>
            </motion.div>

            {/* RIGHT VISUAL - Human/Workflow Centered Transparent Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative hidden items-center justify-center lg:flex"
            >
              <div className="relative h-[340px] w-[340px] xl:h-[440px] xl:w-[440px] 2xl:h-[480px] 2xl:w-[480px]">
                <Image
                  src={illustration.src}
                  alt={illustration.alt}
                  fill
                  className="object-contain drop-shadow-[0_24px_48px_rgba(14,92,238,0.08)]"
                  sizes="(max-width: 1280px) 440px, 480px"
                  priority={index === 0}
                />
              </div>
            </motion.div>
          </div>

          {/* MOBILE VISUAL */}
          <div className="mt-8 flex justify-center lg:hidden">
            <div className="relative h-[240px] w-[240px] sm:h-[280px] sm:w-[280px]">
              <Image
                src={illustration.src}
                alt={illustration.alt}
                fill
                className="object-contain drop-shadow-[0_16px_32px_rgba(14,92,238,0.08)]"
                sizes="(max-width: 640px) 240px, 280px"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ============================================================================
   04 — IMPACT LAYOUT → RELATABILITY
   ========================================================================== */

function RelatabilitySection() {
  return (
    <section
      className="
        services-relatable relative min-h-[100svh]
        overflow-hidden border-y border-[#0E5CEE]/20
        bg-[#EAF2FF]
      "
    >
      <div className="mx-auto flex min-h-[100svh] max-w-[1600px] items-center justify-center px-6 py-24 sm:px-8 lg:px-12">
        {/* floating cropped icon circles */}

        <div
          className="
            relatable-orb orb-left absolute
            -left-24 top-[28%]
            flex h-[340px] w-[340px]
            items-center justify-center
            rounded-full border border-[#0E5CEE]/30
            bg-white
          "
        >
          <div className="w-28">
            <ServiceGlyph type="workflow" />
          </div>
        </div>

        <div
          className="
            relatable-orb absolute
            left-[43%] -top-32
            flex h-[330px] w-[330px]
            items-center justify-center
            rounded-full border border-[#0E5CEE]/30
            bg-white
          "
        >
          <div className="w-28">
            <ServiceGlyph type="data" />
          </div>
        </div>

        <div
          className="
            relatable-orb orb-right absolute
            -right-24 top-[32%]
            flex h-[330px] w-[330px]
            items-center justify-center
            rounded-full border border-[#0E5CEE]/30
            bg-white
          "
        >
          <div className="w-28">
            <ServiceGlyph type="chat" />
          </div>
        </div>

        <div
          className="
            relatable-orb absolute
            bottom-[-190px] right-[17%]
            flex h-[390px] w-[390px]
            items-start justify-center
            rounded-full border border-[#0E5CEE]/30
            bg-white pt-16
          "
        >
          <div className="w-32">
            <ServiceGlyph type="software" />
          </div>
        </div>

        {/* central copy */}

        <div className="relative z-10 max-w-[1050px] text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0E5CEE]">
            Familiar?
          </p>

          <div
            className="
              mt-6 text-[clamp(6rem,13vw,13rem)]
              font-normal leading-[0.78]
              tracking-[-0.085em]
              text-[#0E5CEE]
            "
          >
            1 → 5
          </div>

          <h2
            className="
              mx-auto mt-10 max-w-[900px]
              text-[clamp(2.5rem,4vw,4.5rem)]
              font-normal leading-[1.02]
              tracking-[-0.055em]
            "
          >
            One change.
            <span className="block">
              Five places to update.
            </span>

            <span className="block text-[#0E5CEE]">
              Perfect.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-[630px] text-base leading-8 text-slate-600">
            The problem is rarely that the business has no software. It is that
            the software still expects a person to carry context between every
            system.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   05 — PARAGRAPH SECTION: SCROLL-DRIVEN MANIFESTO
   ========================================================================== */

const MANIFESTO_TEXT =
  "If a process only works because somebody remembers every step, the process does not work.";

function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Smooth the raw scroll progress slightly.
     Enough to remove jitter without making the section feel delayed. */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  const words = MANIFESTO_TEXT.split(" ");

  /* Small supporting copy appears after the main sentence resolves */
  const supportOpacity = useTransform(
    smoothProgress,
    [0.72, 0.86],
    [0, 1],
  );

  const supportY = useTransform(
    smoothProgress,
    [0.72, 0.86],
    [18, 0],
  );

  /* Whole statement moves up just a tiny amount over the scene */
  const statementY = useTransform(
    smoothProgress,
    [0, 1],
    [18, -12],
  );

  return (
    <section
      ref={sectionRef}
      className="
        services-manifesto
        relative
        h-[180vh]
        border-y border-slate-200
        bg-white
      "
    >
      {/* ================================================================
          ONE STICKY EDITORIAL CANVAS
         ================================================================ */}

      <div
        className="
          sticky top-0
          flex h-[100svh]
          items-center
          overflow-hidden
        "
      >
        {/* restrained ambient blue */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[-10%]
            top-1/2
            h-[620px]
            w-[620px]
            -translate-y-1/2
            rounded-full
            bg-[#0E5CEE]/[0.035]
            blur-[150px]
          "
        />

        <div
          className="
            relative z-10
            mx-auto
            w-full
            max-w-[1600px]
            px-6
            py-24
            sm:px-8
            lg:px-12
          "
        >
          {/* ============================================================
              SECTION LABEL
             ============================================================ */}

          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: useTransform(
                      smoothProgress,
                      [0, 0.08],
                      [0, 1],
                    ),
                    y: useTransform(
                      smoothProgress,
                      [0, 0.08],
                      [12, 0],
                    ),
                  }
            }
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#0E5CEE]" />

            <p
              className="
                font-mono
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-[#0E5CEE]
              "
            >
              The point
            </p>
          </motion.div>

          {/* ============================================================
              SCROLL-REVEALED STATEMENT
             ============================================================ */}

          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    y: statementY,
                  }
            }
            className="mt-10 sm:mt-12"
          >
            <p
              className="
                max-w-[1480px]
                text-[clamp(3.1rem,6.15vw,7.35rem)]
                font-normal
                leading-[0.96]
                tracking-[-0.068em]
                text-[#0B1220]
              "
            >
              {words.map((word, index) => (
                <ManifestoWord
                  key={`${word}-${index}`}
                  word={word}
                  index={index}
                  total={words.length}
                  progress={smoothProgress}
                  reducedMotion={Boolean(reduceMotion)}
                />
              ))}
            </p>

            {/* ==========================================================
                SMALL RESOLUTION
               ========================================================== */}

            <motion.div
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity: supportOpacity,
                      y: supportY,
                    }
              }
              className="
                mt-10
                flex
                max-w-[760px]
                items-start
                gap-5
                border-t
                border-slate-200
                pt-6
              "
            >
              <span
                aria-hidden="true"
                className="
                  mt-[9px]
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-[#0E5CEE]
                "
              />

              <p
                className="
                  text-[15px]
                  leading-7
                  tracking-[-0.012em]
                  text-slate-500
                  sm:text-[17px]
                  sm:leading-8
                "
              >
                Good systems don&apos;t ask people to remember the workflow.
                They make the right next step part of the workflow.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ==============================================================
            SCROLL PROGRESS
           ============================================================== */}

        {!reduceMotion && (
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              h-[2px]
              w-full
              bg-[#0E5CEE]/10
            "
          >
            <motion.div
              style={{
                scaleX: smoothProgress,
                transformOrigin: "left",
              }}
              className="
                h-full
                w-full
                bg-[#0E5CEE]
              "
            />
          </div>
        )}
      </div>
    </section>
  );
}

function ManifestoWord({
  word,
  index,
  total,
  progress,
  reducedMotion,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  /*
   * Spread the sentence over approximately 10% → 76% of the scroll.
   * This prevents the reveal from feeling too fast.
   */
  const start = 0.09 + (index / total) * 0.61;
  const end = Math.min(start + 0.11, 0.82);

  const opacity = useTransform(
    progress,
    [start, end],
    [0.12, 1],
  );

  const y = useTransform(
    progress,
    [start, end],
    [30, 0],
  );

  const blur = useTransform(
    progress,
    [start, end],
    [7, 0],
  );

  const filter = useTransform(
    blur,
    (value) => `blur(${value}px)`,
  );

  /*
   * The last three words become ADRIG blue as the conclusion lands:
   * "does not work."
   */
  const isConclusion = index >= total - 3;

  const conclusionColor = useTransform(
    progress,
    [0.69, 0.82],
    ["#0B1220", "#0E5CEE"],
  );

  if (reducedMotion) {
    return (
      <span
        className={`
          mr-[0.21em]
          inline
          ${isConclusion ? "text-[#0E5CEE]" : ""}
        `}
      >
        {word}
      </span>
    );
  }

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter,
        color: isConclusion
          ? conclusionColor
          : "#0B1220",
      }}
      className="
        mr-[0.21em]
        inline-block
        will-change-transform
      "
    >
      {word}
    </motion.span>
  );
}

/* ============================================================================
   06 — CAPSULE RESOLUTION: GEOMETRIC SYSTEM PIPELINE
   ----------------------------------------------------------------------------

   NO:
   - pills
   - blobs
   - cards
   - gradients
   - shadows
   - icons
   - eyebrows
   - body-copy paragraphs

   ONE continuous technical line.
   THREE system outcomes.
   Scroll controls line drawing directly.

   Story:
   01  No more copy / chase / re-enter
   02  Workflow remembers the next step
   03  Work moves / people decide
   ========================================================================== */

const PIPELINE_POINTS = [
  {
    statement: "No more copy. Chase. Re-enter.",
    enter: 0.18,
    focusEnd: 0.43,
    recedeEnd: 0.52,
  },
  {
    statement: "The workflow remembers what happens next.",
    enter: 0.47,
    focusEnd: 0.73,
    recedeEnd: 0.82,
  },
  {
    statement: "Work moves. People decide.",
    enter: 0.78,
    focusEnd: 1,
    recedeEnd: 1,
    final: true,
  },
] as const;

function CapsuleResolution() {
  const reduceMotion = useReducedMotion();

  /*
   * Reduced-motion users should NOT have to scroll through 300vh
   * of an animation that isn't animating.
   */
  if (reduceMotion) {
    return <StaticSystemPipeline />;
  }

  return <AnimatedSystemPipeline />;
}

/* ============================================================================
   ANIMATED VERSION
   ========================================================================== */

function AnimatedSystemPipeline() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Keep this directly scroll-linked.
   * No spring intentionally:
   * scroll forward = draw
   * scroll backward = retract
   */
  const lineProgress = useTransform(
    scrollYProgress,
    [0.04, 0.96],
    [0, 1],
  );

  return (
    <section
      ref={sectionRef}
      aria-label="How ADRIG changes the workflow"
      className="
        relative
        h-[300vh]
        border-y border-[#DCE3EC]
        bg-white
      "
    >
      <div
        className="
          sticky
          top-0
          h-[100svh]
          overflow-hidden
          bg-white
        "
      >
        {/* ==============================================================
            MOBILE — PRIMARY DESIGN
            ============================================================== */}

        <div className="relative h-full w-full md:hidden">
          <MobilePipelineSVG
            progress={lineProgress}
            scrollProgress={scrollYProgress}
          />

          <MobilePipelineContent
            progress={scrollYProgress}
          />
        </div>

        {/* ==============================================================
            DESKTOP
            ============================================================== */}

        <div
          className="
            relative
            mx-auto
            hidden
            h-full
            w-full
            max-w-[1600px]
            md:block
          "
        >
          <DesktopPipelineSVG
            progress={lineProgress}
            scrollProgress={scrollYProgress}
          />

          <DesktopPipelineContent
            progress={scrollYProgress}
          />
        </div>

        {/* ==============================================================
            BOTTOM PROGRESS

            Just the schematic's completion state.
            No label.
            ============================================================== */}

        <div
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-0
            h-[2px]
            w-full
            bg-[#0B1220]/10
          "
        >
          <motion.div
            style={{
              scaleX: scrollYProgress,
              transformOrigin: "left",
            }}
            className="
              h-full
              w-full
              bg-[#0B1220]
            "
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   DESKTOP SVG

   One continuous path:

             ┌───────────────┐
             │               │
   ──────────┘               └─────────────┐
                                           │
                    ───────────────────────┘

   Actual geometry:
   start
   → right
   → up
   → right
   → down
   → right
   → up
   → right

   Marker fractions approximately:
   01 = 25%
   02 = 55%
   03 = 86%
   ========================================================================== */

function DesktopPipelineSVG({
  progress,
  scrollProgress,
}: {
  progress: MotionValue<number>;
  scrollProgress: MotionValue<number>;
}) {
  return (
    <svg
      viewBox="0 0 1200 650"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        h-full
        w-full
      "
    >
      {/* --------------------------------------------------------------
          UNDRAWN GUIDE
          -------------------------------------------------------------- */}

      <path
        d="
          M 50 170
          H 300
          V 390
          H 900
          V 170
          H 1150
        "
        fill="none"
        stroke="#0B1220"
        strokeOpacity="0.12"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* --------------------------------------------------------------
          LIVE DRAWN PATH
          -------------------------------------------------------------- */}

      <motion.path
        d="
          M 50 170
          H 300
          V 390
          H 900
          V 170
          H 1150
        "
        fill="none"
        stroke="#0B1220"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        style={{
          pathLength: progress,
        }}
      />

      {/* --------------------------------------------------------------
          MARKERS
          -------------------------------------------------------------- */}

      <DesktopMarker
        cx={300}
        cy={170}
        progress={scrollProgress}
        enter={0.18}
        exit={0.52}
      />

      <DesktopMarker
        cx={600}
        cy={390}
        progress={scrollProgress}
        enter={0.47}
        exit={0.82}
      />

      <DesktopMarker
        cx={900}
        cy={170}
        progress={scrollProgress}
        enter={0.78}
        exit={1}
        final
      />
    </svg>
  );
}

/* ============================================================================
   DESKTOP CONTENT
   ========================================================================== */

function DesktopPipelineContent({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <>
      {/* POINT 01 */}

      <PipelineStatement
        progress={progress}
        enter={PIPELINE_POINTS[0].enter}
        focusEnd={PIPELINE_POINTS[0].focusEnd}
        recedeEnd={PIPELINE_POINTS[0].recedeEnd}
        className="
          absolute
          left-[5%]
          top-[34%]
          w-[24%]
          max-w-[320px]
        "
      >
        No more copy.
        <br />
        Chase.
        <br />
        Re-enter.
      </PipelineStatement>

      {/* POINT 02 */}

      <PipelineStatement
        progress={progress}
        enter={PIPELINE_POINTS[1].enter}
        focusEnd={PIPELINE_POINTS[1].focusEnd}
        recedeEnd={PIPELINE_POINTS[1].recedeEnd}
        className="
          absolute
          left-1/2
          -translate-x-1/2
          top-[66%]
          w-full
          max-w-[540px]
          text-center
        "
      >
        The workflow
        <br />
        remembers what
        <br />
        happens next.
      </PipelineStatement>

      {/* POINT 03 */}

      <PipelineStatement
        progress={progress}
        enter={PIPELINE_POINTS[2].enter}
        focusEnd={PIPELINE_POINTS[2].focusEnd}
        recedeEnd={PIPELINE_POINTS[2].recedeEnd}
        final
        className="
          absolute
          right-[5%]
          top-[34%]
          w-[24%]
          max-w-[320px]
        "
      >
        Work moves.
        <br />
        People decide.
      </PipelineStatement>
    </>
  );
}

/* ============================================================================
   MOBILE SVG
   ----------------------------------------------------------------------------

   Same concept.
   Geometry simply becomes vertical.

        │
        ○
        │
        ├──
        │
        ○
        │
        ├──
        │
        ○
        │

   ========================================================================== */

function MobilePipelineSVG({
  progress,
  scrollProgress,
}: {
  progress: MotionValue<number>;
  scrollProgress: MotionValue<number>;
}) {
  return (
    <svg
      viewBox="0 0 390 800"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        h-full
        w-full
      "
    >
      {/* GUIDE */}

      <path
        d="
          M 52 55
          V 210
          H 72
          V 395
          H 52
          V 580
          H 72
          V 745
        "
        fill="none"
        stroke="#0B1220"
        strokeOpacity="0.12"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* DRAW */}

      <motion.path
        d="
          M 52 55
          V 210
          H 72
          V 395
          H 52
          V 580
          H 72
          V 745
        "
        fill="none"
        stroke="#0B1220"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        style={{
          pathLength: progress,
        }}
      />

      <MobileMarker
        cx={72}
        cy={210}
        progress={scrollProgress}
        enter={0.18}
        exit={0.52}
      />

      <MobileMarker
        cx={52}
        cy={395}
        progress={scrollProgress}
        enter={0.47}
        exit={0.82}
      />

      <MobileMarker
        cx={72}
        cy={580}
        progress={scrollProgress}
        enter={0.78}
        exit={1}
        final
      />
    </svg>
  );
}

/* ============================================================================
   MOBILE CONTENT
   ========================================================================== */

function MobilePipelineContent({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <>
      <PipelineStatement
        progress={progress}
        enter={PIPELINE_POINTS[0].enter}
        focusEnd={PIPELINE_POINTS[0].focusEnd}
        recedeEnd={PIPELINE_POINTS[0].recedeEnd}
        className="
          absolute
          left-[24%]
          right-[7%]
          top-[16%]
        "
        mobile
      >
        No more copy.
        <br />
        Chase.
        <br />
        Re-enter.
      </PipelineStatement>

      <PipelineStatement
        progress={progress}
        enter={PIPELINE_POINTS[1].enter}
        focusEnd={PIPELINE_POINTS[1].focusEnd}
        recedeEnd={PIPELINE_POINTS[1].recedeEnd}
        className="
          absolute
          left-[24%]
          right-[7%]
          top-[42%]
        "
        mobile
      >
        The workflow remembers what happens next.
      </PipelineStatement>

      <PipelineStatement
        progress={progress}
        enter={PIPELINE_POINTS[2].enter}
        focusEnd={PIPELINE_POINTS[2].focusEnd}
        recedeEnd={PIPELINE_POINTS[2].recedeEnd}
        final
        className="
          absolute
          left-[24%]
          right-[7%]
          top-[70%]
        "
        mobile
      >
        Work moves.
        <br />
        People decide.
      </PipelineStatement>
    </>
  );
}

/* ============================================================================
   STATEMENT
   ----------------------------------------------------------------------------
   Current statement:
   - full opacity
   - ADRIG blue

   Previous statement:
   - stays visible
   - drops to ~24% opacity
   - returns to neutral ink

   Upcoming:
   - invisible

   Nothing is removed from DOM.
   Screen readers always have access to all content.
   ========================================================================== */

function PipelineStatement({
  children,
  progress,
  enter,
  focusEnd,
  recedeEnd,
  final = false,
  mobile = false,
  className,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  enter: number;
  focusEnd: number;
  recedeEnd: number;
  final?: boolean;
  mobile?: boolean;
  className?: string;
}) {
  const revealStart = Math.max(0, enter - 0.07);

  const opacity = final
    ? useTransform(
        progress,
        [revealStart, enter, 1],
        [0, 1, 1],
      )
    : useTransform(
        progress,
        [
          revealStart,
          enter,
          focusEnd,
          recedeEnd,
        ],
        [0, 1, 1, 0.24],
      );

  const y = useTransform(
    progress,
    [revealStart, enter],
    [16, 0],
  );

  const color = final
    ? useTransform(
        progress,
        [revealStart, enter],
        ["#0B1220", "#0E5CEE"],
      )
    : useTransform(
        progress,
        [
          revealStart,
          enter,
          focusEnd,
          recedeEnd,
        ],
        [
          "#0B1220",
          "#0E5CEE",
          "#0E5CEE",
          "#0B1220",
        ],
      );

  return (
    <motion.p
      style={{
        opacity,
        y,
        color,
      }}
      className={`
        ${className ?? ""}

        font-normal
        tracking-[-0.06em]

        ${
          mobile
            ? `
              text-[clamp(1.9rem,7.5vw,2.8rem)]
              leading-[1.02]
            `
            : `
              text-[clamp(2.2rem,3.2vw,3.6rem)]
              leading-[1.02]
            `
        }
      `}
    >
      {children}
    </motion.p>
  );
}

/* ============================================================================
   DESKTOP MARKER
   ========================================================================== */

function DesktopMarker({
  cx,
  cy,
  progress,
  enter,
  exit,
  final = false,
}: {
  cx: number;
  cy: number;
  progress: MotionValue<number>;
  enter: number;
  exit: number;
  final?: boolean;
}) {
  const start = Math.max(0, enter - 0.055);

  const opacity = final
    ? useTransform(
        progress,
        [start, enter],
        [0.25, 1],
      )
    : useTransform(
        progress,
        [start, enter, exit - 0.06, exit],
        [0.25, 1, 1, 0.38],
      );

  const scale = useTransform(
    progress,
    [start, enter],
    [0.65, 1],
  );

  const stroke = final
    ? useTransform(
        progress,
        [start, enter],
        ["#0B1220", "#0E5CEE"],
      )
    : useTransform(
        progress,
        [start, enter, exit - 0.06, exit],
        [
          "#0B1220",
          "#0E5CEE",
          "#0E5CEE",
          "#0B1220",
        ],
      );

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="10"
      fill="white"
      strokeWidth="2"
      style={{
        opacity,
        scale,
        stroke,
      }}
    />
  );
}

/* ============================================================================
   MOBILE MARKER
   ========================================================================== */

function MobileMarker({
  cx,
  cy,
  progress,
  enter,
  exit,
  final = false,
}: {
  cx: number;
  cy: number;
  progress: MotionValue<number>;
  enter: number;
  exit: number;
  final?: boolean;
}) {
  const start = Math.max(0, enter - 0.055);

  const opacity = final
    ? useTransform(
        progress,
        [start, enter],
        [0.25, 1],
      )
    : useTransform(
        progress,
        [start, enter, exit - 0.06, exit],
        [0.25, 1, 1, 0.38],
      );

  const scale = useTransform(
    progress,
    [start, enter],
    [0.65, 1],
  );

  const stroke = final
    ? useTransform(
        progress,
        [start, enter],
        ["#0B1220", "#0E5CEE"],
      )
    : useTransform(
        progress,
        [start, enter, exit - 0.06, exit],
        [
          "#0B1220",
          "#0E5CEE",
          "#0E5CEE",
          "#0B1220",
        ],
      );

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="9"
      fill="white"
      strokeWidth="2"
      style={{
        opacity,
        scale,
        stroke,
      }}
    />
  );
}

/* ============================================================================
   REDUCED MOTION

   No 300vh scroll track.
   No animation.
   No content removed.
   Same schematic argument rendered statically.
   ========================================================================== */

function StaticSystemPipeline() {
  return (
    <section
      aria-label="How ADRIG changes the workflow"
      className="
        relative
        overflow-hidden
        border-y border-[#DCE3EC]
        bg-white
        px-6
        py-24
        sm:px-8
        lg:px-12
        lg:py-32
      "
    >
      <div
        className="
          mx-auto
          max-w-[1500px]
        "
      >
        {/* ==============================================================
            MOBILE STATIC
            ============================================================== */}

        <div className="relative md:hidden">
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-2
              left-[9px]
              top-2
              w-[2px]
              bg-[#0B1220]
            "
          />

          <StaticPoint>
            No more copy.
            <br />
            Chase.
            <br />
            Re-enter.
          </StaticPoint>

          <StaticPoint>
            The workflow remembers what happens next.
          </StaticPoint>

          <StaticPoint final>
            Work moves.
            <br />
            People decide.
          </StaticPoint>
        </div>

        {/* ==============================================================
            DESKTOP STATIC
            ============================================================== */}

        <div
          className="
            relative
            hidden
            min-h-[620px]
            md:block
          "
        >
          <svg
            viewBox="0 0 1200 650"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="
              absolute
              inset-0
              h-full
              w-full
            "
          >
            <path
              d="
                M 50 170
                H 300
                V 390
                H 900
                V 170
                H 1150
              "
              fill="none"
              stroke="#0B1220"
              strokeWidth="2"
            />

            <circle
              cx="300"
              cy="170"
              r="10"
              fill="white"
              stroke="#0E5CEE"
              strokeWidth="2"
            />

            <circle
              cx="600"
              cy="390"
              r="10"
              fill="white"
              stroke="#0E5CEE"
              strokeWidth="2"
            />

            <circle
              cx="900"
              cy="170"
              r="10"
              fill="white"
              stroke="#0E5CEE"
              strokeWidth="2"
            />
          </svg>

          <p
            className="
              absolute
              left-[5%]
              top-[34%]
              max-w-[320px]
              text-[clamp(2.2rem,3.2vw,3.6rem)]
              leading-[1.02]
              tracking-[-0.06em]
              text-[#0B1220]
            "
          >
            No more copy.
            <br />
            Chase.
            <br />
            Re-enter.
          </p>

          <p
            className="
              absolute
              left-1/2
              -translate-x-1/2
              top-[66%]
              w-full
              max-w-[540px]
              text-center
              text-[clamp(2.2rem,3.2vw,3.6rem)]
              leading-[1.02]
              tracking-[-0.06em]
              text-[#0B1220]
            "
          >
            The workflow
            <br />
            remembers what
            <br />
            happens next.
          </p>

          <p
            className="
              absolute
              right-[5%]
              top-[34%]
              max-w-[320px]
              text-[clamp(2.2rem,3.2vw,3.6rem)]
              leading-[1.02]
              tracking-[-0.06em]
              text-[#0E5CEE]
            "
          >
            Work moves.
            <br />
            People decide.
          </p>
        </div>
      </div>
    </section>
  );
}

function StaticPoint({
  children,
  final = false,
}: {
  children: React.ReactNode;
  final?: boolean;
}) {
  return (
    <div
      className="
        relative
        py-14
        pl-14
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute
          left-0
          top-[4.2rem]
          h-5
          w-5
          rounded-full
          border-2
          border-[#0E5CEE]
          bg-white
        "
      />

      <p
        className={`
          text-[clamp(2.3rem,9vw,3.4rem)]
          leading-[0.97]
          tracking-[-0.06em]

          ${
            final
              ? "text-[#0E5CEE]"
              : "text-[#0B1220]"
          }
        `}
      >
        {children}
      </p>
    </div>
  );
}

/* ============================================================================
   SMALL SVG GLYPHS
   ========================================================================== */

function ProblemGlyph({
  type,
}: {
  type: "copy" | "loop" | "person";
}) {
  const stroke = "#0B1220";

  if (type === "copy") {
    return (
      <svg viewBox="0 0 70 70" className="h-16 w-16">
        <rect
          x="17"
          y="12"
          width="30"
          height="38"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
        />

        <rect
          x="25"
          y="20"
          width="30"
          height="38"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === "loop") {
    return (
      <svg viewBox="0 0 70 70" className="h-16 w-16">
        <path
          d="M18 25 C22 13 43 12 51 23"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
        />

        <path
          d="M51 23 L44 20 M51 23 L49 16"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
        />

        <path
          d="M52 45 C46 57 25 57 18 46"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
        />

        <path
          d="M18 46 L25 48 M18 46 L20 53"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 70 70" className="h-16 w-16">
      <circle
        cx="35"
        cy="22"
        r="10"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
      />

      <path
        d="M16 57 C18 41 27 34 35 34 C43 34 52 41 54 57"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
      />

      <path
        d="M10 29 H19 M51 29 H60 M35 2 V10"
        stroke={stroke}
        strokeWidth="1.8"
      />
    </svg>
  );
}

/* ============================================================================
   SERVICE GLYPHS
   ========================================================================== */

function ServiceGlyph({ type }: { type: GlyphType }) {
  const blue = "#0E5CEE";

  const common = {
    fill: "none",
    stroke: blue,
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "chat") {
    return (
      <svg viewBox="0 0 120 120" className="h-auto w-full">
        <path
          d="M19 25 H92 C99 25 104 30 104 37 V72 C104 79 99 84 92 84 H53 L31 103 L35 84 H19 C12 84 8 79 8 72 V37 C8 30 12 25 19 25Z"
          {...common}
        />

        <circle cx="38" cy="55" r="4" fill={blue} />
        <circle cx="58" cy="55" r="4" fill={blue} />
        <circle cx="78" cy="55" r="4" fill={blue} />
      </svg>
    );
  }

  if (type === "software") {
    return (
      <svg viewBox="0 0 120 120" className="h-auto w-full">
        <rect
          x="14"
          y="20"
          width="92"
          height="77"
          rx="8"
          {...common}
        />

        <line x1="14" y1="38" x2="106" y2="38" {...common} />

        <path d="M45 55 L32 68 L45 81" {...common} />
        <path d="M75 55 L88 68 L75 81" {...common} />
        <path d="M67 48 L54 87" {...common} />
      </svg>
    );
  }

  if (type === "workflow") {
    return (
      <svg viewBox="0 0 120 120" className="h-auto w-full">
        <circle cx="24" cy="30" r="11" {...common} />
        <circle cx="94" cy="30" r="11" {...common} />
        <circle cx="59" cy="91" r="11" {...common} />

        <path d="M35 30 H83" {...common} />
        <path d="M88 39 L65 81" {...common} />
        <path d="M53 81 L30 39" {...common} />

        <path d="M75 25 L83 30 L75 35" {...common} />
      </svg>
    );
  }

  if (type === "automation") {
    return (
      <svg viewBox="0 0 120 120" className="h-auto w-full">
        <circle cx="60" cy="60" r="25" {...common} />

        <path
          d="M60 20 V10 M60 110 V100 M20 60 H10 M110 60 H100"
          {...common}
        />

        <path
          d="M31 31 L23 23 M97 97 L89 89 M89 31 L97 23 M23 97 L31 89"
          {...common}
        />

        <path d="M50 59 L58 67 L74 48" {...common} />
      </svg>
    );
  }

  if (type === "llm") {
    return (
      <svg viewBox="0 0 120 120" className="h-auto w-full">
        <circle cx="60" cy="60" r="42" {...common} />

        <path
          d="M39 48 C47 36 55 38 60 47 C65 38 74 36 82 48"
          {...common}
        />

        <path
          d="M39 72 C47 84 55 82 60 73 C65 82 74 84 82 72"
          {...common}
        />

        <path d="M60 47 V73" {...common} />
      </svg>
    );
  }

  if (type === "consulting") {
    return (
      <svg viewBox="0 0 120 120" className="h-auto w-full">
        <circle cx="60" cy="43" r="27" {...common} />

        <path d="M48 75 H72" {...common} />
        <path d="M51 84 H69" {...common} />
        <path d="M55 93 H65" {...common} />

        <path d="M60 8 V1 M26 19 L20 13 M94 19 L100 13" {...common} />
      </svg>
    );
  }

  if (type === "data") {
    return (
      <svg viewBox="0 0 120 120" className="h-auto w-full">
        <ellipse cx="60" cy="27" rx="34" ry="12" {...common} />

        <path d="M26 27 V87" {...common} />
        <path d="M94 27 V87" {...common} />

        <path
          d="M26 48 C26 55 41 60 60 60 C79 60 94 55 94 48"
          {...common}
        />

        <path
          d="M26 68 C26 75 41 80 60 80 C79 80 94 75 94 68"
          {...common}
        />

        <path
          d="M26 87 C26 94 41 99 60 99 C79 99 94 94 94 87"
          {...common}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className="h-auto w-full">
      <circle cx="42" cy="40" r="17" {...common} />
      <circle cx="83" cy="48" r="13" {...common} />

      <path
        d="M12 99 C15 73 27 62 42 62 C57 62 69 73 72 99"
        {...common}
      />

      <path
        d="M68 99 C70 81 77 72 87 72 C98 72 105 82 108 99"
        {...common}
      />

      <path d="M74 23 L80 29 L94 14" {...common} />
    </svg>
  );
}