"use client";

import React, {
  forwardRef,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Activity,
  BarChart3,
  Blocks,
  Bot,
  Braces,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  FileSearch,
  FileText,
  Gauge,
  GitBranch,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Network,
  Route,
  ScanText,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { AnimatedBeam } from "@/components/ui/animated-beam";

import type {
  CapabilityItem,
  ServiceKey,
} from "@/content/services";

type VisualPreset = {
  center: string;
  sources: [
    string,
    string,
    string,
    string
  ];
  output: string;
};

const VISUALS: Record<
  ServiceKey,
  VisualPreset[]
> = {
  chatbot: [
    {
      center: "Retrieval Engine",
      sources: [
        "Notion",
        "Zendesk",
        "PDFs",
        "Knowledge Base",
      ],
      output: "Grounded Answer",
    },
    {
      center: "Unified Agent",
      sources: [
        "WhatsApp",
        "Web",
        "Slack",
        "Zendesk",
      ],
      output: "One Conversation",
    },
    {
      center: "Intent Router",
      sources: [
        "Billing",
        "Support",
        "Product",
        "Escalation",
      ],
      output: "Resolved / Routed",
    },
  ],

  llm: [
    {
      center: "Fine-Tuning",
      sources: [
        "Domain Corpus",
        "Examples",
        "Ontology",
        "Policies",
      ],
      output: "Domain Model",
    },
    {
      center: "Evaluation",
      sources: [
        "Factuality",
        "Safety",
        "Format",
        "Regression",
      ],
      output: "Release Gate",
    },
    {
      center: "Private Runtime",
      sources: [
        "Model Weights",
        "Private GPU",
        "RBAC",
        "Observability",
      ],
      output: "Secure API",
    },
  ],

  "ai-automation": [
    {
      center: "Agent Swarm",
      sources: [
        "Extractor",
        "Validator",
        "Planner",
        "Executor",
      ],
      output: "Completed Task",
    },
    {
      center: "Vision Engine",
      sources: [
        "PDF",
        "Scans",
        "Tables",
        "Email",
      ],
      output: "Structured Data",
    },
    {
      center: "Confidence Gate",
      sources: [
        "Score",
        "Policy",
        "Risk",
        "Exception",
      ],
      output: "Approve / Review",
    },
  ],

  workflow: [
    {
      center: "Event Bus",
      sources: [
        "Webhook",
        "ERP",
        "CRM",
        "Database",
      ],
      output: "Execution",
    },
    {
      center: "ERP Bridge",
      sources: [
        "SAP",
        "Oracle",
        "Legacy DB",
        "Cloud API",
      ],
      output: "Synced State",
    },
    {
      center: "Telemetry",
      sources: [
        "Latency",
        "Retries",
        "Errors",
        "Throughput",
      ],
      output: "Live Alert",
    },
  ],

  "data-analysis": [
    {
      center: "Lakehouse",
      sources: [
        "Events",
        "Sensors",
        "Transactions",
        "Logs",
      ],
      output: "Live Query",
    },
    {
      center: "Anomaly Model",
      sources: [
        "Temperature",
        "Vibration",
        "History",
        "Thresholds",
      ],
      output: "Prediction",
    },
    {
      center: "Decision Layer",
      sources: [
        "Revenue",
        "Operations",
        "Risk",
        "Inventory",
      ],
      output: "Executive View",
    },
  ],

  software: [
    {
      center: "Application Core",
      sources: [
        "Next.js",
        "Node.js",
        "Postgres",
        "Cloud",
      ],
      output: "Production App",
    },
    {
      center: "Tenant Core",
      sources: [
        "Auth",
        "Billing",
        "Audit",
        "Data",
      ],
      output: "Isolated Tenant",
    },
    {
      center: "API Gateway",
      sources: [
        "REST",
        "GraphQL",
        "Webhooks",
        "Events",
      ],
      output: "Platform API",
    },
  ],

  consultation: [
    {
      center: "Feasibility Audit",
      sources: [
        "Data",
        "Security",
        "Infra",
        "Business",
      ],
      output: "Go / No-Go",
    },
    {
      center: "Architecture",
      sources: [
        "Models",
        "APIs",
        "Compute",
        "Governance",
      ],
      output: "System Blueprint",
    },
    {
      center: "Execution Plan",
      sources: [
        "Impact",
        "Complexity",
        "Budget",
        "Risk",
      ],
      output: "Roadmap",
    },
  ],

  blockchain: [
    {
      center: "Smart Contracts",
      sources: [
        "Solidity",
        "Oracles",
        "Security",
        "Ledger",
      ],
      output: "Verified Contract",
    },
    {
      center: "Consensus Node",
      sources: [
        "Transactions",
        "State",
        "Signatures",
        "Validators",
      ],
      output: "Immutable Block",
    },
    {
      center: "Settlement Bridge",
      sources: [
        "Multi-Party",
        "Escrow",
        "Audit Log",
        "Webhooks",
      ],
      output: "Instant Settlement",
    },
  ],

  "data-engineering": [
    {
      center: "Streaming Core",
      sources: [
        "Kafka",
        "Spark",
        "CDC",
        "REST API",
      ],
      output: "Continuous Stream",
    },
    {
      center: "Governed Lakehouse",
      sources: [
        "Iceberg",
        "Parquet",
        "Delta Lake",
        "Schema Registry",
      ],
      output: "Governed Data",
    },
    {
      center: "Sub-Second Engine",
      sources: [
        "Trino",
        "ClickHouse",
        "BI Queries",
        "ML Inference",
      ],
      output: "Sub-100ms Query",
    },
  ],
};

const Node = forwardRef<
  HTMLDivElement,
  {
    label: string;
    variant?: "normal" | "center" | "output";
    icon?: React.ReactNode;
  }
>(function Node(
  {
    label,
    variant = "normal",
    icon,
  },
  ref
) {
  if (variant === "center") {
    return (
      <div
        ref={ref}
        className="relative z-20 flex min-h-[108px] min-w-[150px] max-w-[180px] flex-col items-center justify-center rounded-[24px] border border-[#1463FF] bg-white px-5 text-center shadow-[0_18px_50px_rgba(20,99,255,0.10)]"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FF] text-[#1463FF]">
          {icon}
        </div>

        <span className="mt-3 text-sm font-semibold tracking-[-0.02em] text-slate-950">
          {label}
        </span>
      </div>
    );
  }

  if (variant === "output") {
    return (
      <div
        ref={ref}
        className="relative z-20 flex min-h-[78px] min-w-[130px] max-w-[160px] items-center justify-center rounded-[18px] border border-[#1463FF]/40 bg-[#F4F7FF] px-4 text-center"
      >
        <span className="text-xs font-semibold text-[#1463FF]">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative z-20 flex min-h-[58px] min-w-[110px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-4 text-center shadow-[0_7px_22px_rgba(15,23,42,0.035)]"
    >
      <span className="text-[11px] font-medium text-slate-600">
        {label}
      </span>
    </div>
  );
});

function CapabilityCanvas({
  preset,
  serviceKey,
}: {
  preset: VisualPreset;
  serviceKey: ServiceKey;
}) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const source1 =
    useRef<HTMLDivElement>(null);

  const source2 =
    useRef<HTMLDivElement>(null);

  const source3 =
    useRef<HTMLDivElement>(null);

  const source4 =
    useRef<HTMLDivElement>(null);

  const center =
    useRef<HTMLDivElement>(null);

  const output =
    useRef<HTMLDivElement>(null);

  const CenterIcon =
    serviceKey === "chatbot"
      ? MessageSquareText
      : serviceKey === "llm"
        ? Cpu
        : serviceKey ===
            "ai-automation"
          ? Bot
          : serviceKey ===
              "workflow"
            ? Workflow
            : serviceKey ===
                "data-analysis"
              ? BarChart3
              : serviceKey ===
                  "software"
                ? Blocks
                : Layers3;

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[380px] w-full items-center justify-between overflow-hidden px-3 py-10 sm:px-8"
    >
      {/* SOURCES */}

      <div className="relative z-20 flex flex-col gap-5">
        <Node
          ref={source1}
          label={preset.sources[0]}
        />

        <Node
          ref={source2}
          label={preset.sources[1]}
        />

        <Node
          ref={source3}
          label={preset.sources[2]}
        />

        <Node
          ref={source4}
          label={preset.sources[3]}
        />
      </div>

      {/* CENTER */}

      <Node
        ref={center}
        label={preset.center}
        variant="center"
        icon={
          <CenterIcon className="h-4 w-4" />
        }
      />

      {/* OUTPUT */}

      <Node
        ref={output}
        label={preset.output}
        variant="output"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={source1}
        toRef={center}
        curvature={-80}
        endYOffset={-18}
        duration={4}
        pathColor="#CBD5E1"
        pathOpacity={0.45}
        gradientStartColor="#1463FF"
        gradientStopColor="#75A8FF"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={source2}
        toRef={center}
        curvature={-28}
        endYOffset={-7}
        duration={4.4}
        delay={0.25}
        pathColor="#CBD5E1"
        pathOpacity={0.45}
        gradientStartColor="#1463FF"
        gradientStopColor="#75A8FF"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={source3}
        toRef={center}
        curvature={28}
        endYOffset={7}
        duration={4.2}
        delay={0.5}
        pathColor="#CBD5E1"
        pathOpacity={0.45}
        gradientStartColor="#1463FF"
        gradientStopColor="#75A8FF"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={source4}
        toRef={center}
        curvature={80}
        endYOffset={18}
        duration={4.6}
        delay={0.75}
        pathColor="#CBD5E1"
        pathOpacity={0.45}
        gradientStartColor="#1463FF"
        gradientStopColor="#75A8FF"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={center}
        toRef={output}
        duration={3.4}
        pathColor="#CBD5E1"
        pathOpacity={0.5}
        gradientStartColor="#1463FF"
        gradientStopColor="#1463FF"
      />
    </div>
  );
}

export function CapabilityStage({
  capabilities,
  serviceKey,
}: {
  capabilities: CapabilityItem[];
  serviceKey: ServiceKey;
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeCapability =
    capabilities[activeIndex] ??
    capabilities[0];

  if (!activeCapability) return null;

  const presets =
    VISUALS[serviceKey] ??
    VISUALS.consultation;

  const preset =
    presets[
      activeIndex % presets.length
    ];

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden border-b border-slate-200/70 bg-[#FAFCFF] py-20 sm:py-28"
    >
      <Grid />

      <div className="shell relative z-10 mx-auto max-w-7xl">
        {/* INTRO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 max-w-[950px]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1463FF]">
            Core capabilities
          </p>

          <h2 className="mt-5 text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.93] tracking-[-0.065em] text-slate-950">
            Engineered capabilities.
            <span className="block text-slate-500">
              Visible as systems.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 34,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:gap-[7vw]"
        >
          {/* LEFT LIST */}

          <div className="border-t border-slate-200">
            {capabilities.map(
              (capability, index) => {
                const active =
                  index === activeIndex;

                return (
                  <button
                    key={capability.id}
                    type="button"
                    onMouseEnter={() =>
                      setActiveIndex(index)
                    }
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    className="relative block w-full border-b border-slate-200 py-7 text-left"
                  >
                    {active && (
                      <motion.div
                        layoutId="capability-active"
                        className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#1463FF]"
                        transition={{
                          duration: 0.35,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      />
                    )}

                    <motion.div
                      animate={{
                        opacity: active
                          ? 1
                          : 0.36,
                        x: active ? 10 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="grid grid-cols-[46px_1fr] gap-3"
                    >
                      <span className="pt-1 font-mono text-[9px] text-[#1463FF]">
                        {String(
                          index + 1
                        ).padStart(3, "0")}
                      </span>

                      <div>
                        <h3 className="text-lg font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:text-xl">
                          {
                            capability.title
                          }
                        </h3>

                        <p className="mt-2 max-w-[440px] text-sm leading-6 text-slate-600">
                          {
                            capability.description
                          }
                        </p>
                      </div>
                    </motion.div>
                  </button>
                );
              }
            )}
          </div>

          {/* RIGHT PANEL */}

          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.045)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                System view
              </span>

              <span className="font-mono text-[9px] text-[#1463FF]">
                {String(
                  activeIndex + 1
                ).padStart(2, "0")}
                {" / "}
                {String(
                  capabilities.length
                ).padStart(2, "0")}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={
                  activeCapability.id
                }
                initial={{
                  opacity: 0,
                  scale: 0.985,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.985,
                }}
                transition={{
                  duration: 0.42,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <CapabilityCanvas
                  preset={preset}
                  serviceKey={serviceKey}
                />

                <div className="grid gap-6 border-t border-slate-200 px-6 py-6 sm:grid-cols-[0.38fr_0.62fr] sm:px-8">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                      Performance
                    </p>

                    <p className="mt-2 text-lg font-medium tracking-[-0.035em] text-[#1463FF]">
                      {activeCapability.metrics ??
                        "Production ready"}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                      Operational outcome
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {
                        activeCapability.outcome
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Grid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.035)_1px,transparent_1px)] [background-size:48px_48px]"
    />
  );
}

export default CapabilityStage;