"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Terminal, ShieldCheck, Cpu } from "lucide-react";
import type { Service } from "@/lib/site-data";
import { WORK_ITEMS, INDUSTRIES, WHY_ADRIG } from "@/lib/site-data";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";

/* ─────────────────────────────────────────────────────────────────────────────
   Service 3D Asset & Pain Point Mapping
───────────────────────────────────────────────────────────────────────────── */

interface PainPointDetails {
  scenarioTitle: string;
  sender: string;
  role: string;
  avatar: string;
  timestamp: string;
  messages: { text: string; isAlert?: boolean }[];
  impactTitle: string;
  impactMetrics: string[];
  solutionTitle: string;
  solutionHighlights: string[];
  asset3D: string;
  systemTag: string;
}

const SERVICE_CINEMATIC_DATA: Record<string, PainPointDetails> = {
  "chatbot-development": {
    scenarioTitle: "Customer Support & Knowledge Fragmentation",
    sender: "Head of Customer Experience",
    role: "Enterprise SaaS Ops",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    timestamp: "10:42 AM · Internal Slack #ops-escalations",
    messages: [
      { text: "Support queue has 450+ unanswered tickets. Average response time is up to 34 minutes.", isAlert: true },
      { text: "Users are asking the same 12 recurring integration questions, but our docs live across Notion, Jira, and Zendesk." },
      { text: "Human reps are burning out copying & pasting standard answers manually all day." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "34m average ticket response delay",
      "78% of tickets are repetitive Tier-1 queries",
      "High agent burnout and churn rates",
    ],
    solutionTitle: "The ADRIG Conversational Architecture",
    solutionHighlights: [
      "Omnichannel RAG engine trained on internal docs & live APIs",
      "Instant, context-aware resolution in < 1.2 seconds across WhatsApp, Web & Slack",
      "Autonomous triage with deterministic escalation to human leads",
    ],
    asset3D: "/services/Ai_consultation.png",
    systemTag: "RAG // INTENT REASONING",
  },
  "software-development": {
    scenarioTitle: "Legacy Monolith & Feature Delivery Stagnation",
    sender: "VP of Engineering",
    role: "Fintech Logistics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    timestamp: "09:15 AM · Engineering Incident Room",
    messages: [
      { text: "The monthly deployment broke three legacy billing microservices again during peak volume.", isAlert: true },
      { text: "Our engineers spend 70% of sprint capacity fixing regressions rather than shipping new revenue features." },
      { text: "We need an API-first SaaS platform built for high-throughput concurrency and zero-downtime scaling." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "4-week release cycles with high regression rates",
      "Unpredictable infrastructure downtime during peaks",
      "Technical debt blocking business roadmap",
    ],
    solutionTitle: "The ADRIG Cloud Native Platform",
    solutionHighlights: [
      "Modular event-driven microservices engineered with Next.js, Node & PostgreSQL",
      "Fully isolated multi-tenant architecture with sub-second API responses",
      "Automated CI/CD pipelines with canary deployments and instant rollbacks",
    ],
    asset3D: "/services/SoftawareDevelopment.png",
    systemTag: "CLOUD NATIVE // DISTRIBUTED",
  },
  "workflow-automation": {
    scenarioTitle: "Manual Cross-System Data Re-Entry & Delays",
    sender: "Chief Operating Officer",
    role: "Supply Chain & Transport",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    timestamp: "02:18 PM · Operations Command Center",
    messages: [
      { text: "Field inspection reports are being manually retyped from paper PDFs into the SAP ERP system.", isAlert: true },
      { text: "A mismatch in inventory logging delayed 4 container shipments at Chennai port by 48 hours." },
      { text: "We need autonomous event triggers that sync across field apps, databases, and reporting in real-time." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "16+ human hours lost per week to manual re-keying",
      "High human error rate in invoice and compliance auditing",
      "Delayed decision making due to batch processing",
    ],
    solutionTitle: "The ADRIG Autonomous Workflow Engine",
    solutionHighlights: [
      "End-to-end event-triggered pipeline connecting field sensors, APIs & ERPs",
      "Automated rule clarification and validation with audit-trail logging",
      "Zero manual handoffs — updates propagate instantly with 99.99% accuracy",
    ],
    asset3D: "/services/Workflow_Automation.png",
    systemTag: "AUTONOMOUS // EVENT PIPELINES",
  },
  "ai-automation": {
    scenarioTitle: "Repetitive Unstructured Document Processing",
    sender: "Director of Risk & Compliance",
    role: "Enterprise Banking",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    timestamp: "11:05 AM · Compliance Review",
    messages: [
      { text: "We receive over 2,000 unstructured multi-page vendor contracts and KYC docs daily.", isAlert: true },
      { text: "Our compliance analysts are manually highlighting clauses and cross-referencing regulatory guidelines." },
      { text: "Turnaround time per file is over 4 business days, creating massive onboarding bottlenecks." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "4-day manual document verification turnaround",
      "Compliance exposure due to human oversight",
      "Inability to scale volume without linear hiring",
    ],
    solutionTitle: "The ADRIG Intelligent Agent Swarm",
    solutionHighlights: [
      "Specialized LLM vision & extraction agents parsing complex document layouts",
      "Automated compliance scoring citing exact regulatory clauses",
      "Private on-premise inference with zero external data leaks",
    ],
    asset3D: "/services/Ai_Automation.png",
    systemTag: "AGENTIC // ZERO LEAKAGE",
  },
  "generative-ai-solutions": {
    scenarioTitle: "Enterprise GenAI Hallucination & Security Risks",
    sender: "Chief Information Security Officer",
    role: "Healthcare & Defense",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    timestamp: "04:30 PM · AI Governance Committee",
    messages: [
      { text: "Employees are testing public LLMs with sensitive proprietary clinical and customer records.", isAlert: true },
      { text: "Off-the-shelf models produce hallucinations on critical operational safety protocols." },
      { text: "We need custom fine-tuned foundational models deployed in an air-gapped sovereign VPC." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "Severe regulatory fines for unmonitored data sharing",
      "Unreliable hallucinated outputs in high-stakes decisions",
      "Vendor lock-in and uncontrollable token billing spikes",
    ],
    solutionTitle: "The ADRIG Sovereign GenAI Framework",
    solutionHighlights: [
      "Domain-tuned open weights running entirely in your air-gapped infrastructure",
      "Deterministic verification layers that cross-check every model output against facts",
      "Full intellectual property and model weight ownership",
    ],
    asset3D: "/services/LLM_Development.png",
    systemTag: "SOVEREIGN // FINE-TUNED",
  },
  "generative-ai": {
    scenarioTitle: "Enterprise GenAI Hallucination & Security Risks",
    sender: "Chief Information Security Officer",
    role: "Healthcare & Defense",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    timestamp: "04:30 PM · AI Governance Committee",
    messages: [
      { text: "Employees are testing public LLMs with sensitive proprietary clinical and customer records.", isAlert: true },
      { text: "Off-the-shelf models produce hallucinations on critical operational safety protocols." },
      { text: "We need custom fine-tuned foundational models deployed in an air-gapped sovereign VPC." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "Severe regulatory fines for unmonitored data sharing",
      "Unreliable hallucinated outputs in high-stakes decisions",
      "Vendor lock-in and uncontrollable token billing spikes",
    ],
    solutionTitle: "The ADRIG Sovereign GenAI Framework",
    solutionHighlights: [
      "Domain-tuned open weights running entirely in your air-gapped infrastructure",
      "Deterministic verification layers that cross-check every model output against facts",
      "Full intellectual property and model weight ownership",
    ],
    asset3D: "/services/LLM_Development.png",
    systemTag: "SOVEREIGN // FINE-TUNED",
  },
  "ai-ml-development": {
    scenarioTitle: "Predictive Model Drift & Deployment Bottlenecks",
    sender: "Head of AI Research",
    role: "Industrial Automation",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    timestamp: "01:45 PM · ML Platform Sync",
    messages: [
      { text: "Our Jupyter notebook models have 94% accuracy in training, but fail under real production latency.", isAlert: true },
      { text: "We have no automated retraining pipeline when sensor data drifts under changing environmental conditions." },
      { text: "We need edge-ready inference with sub-10ms latency directly on industrial hardware." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "Months required to move models from lab to factory floor",
      "Unmonitored accuracy degradation in live conditions",
      "High inference latency causing production pauses",
    ],
    solutionTitle: "The ADRIG Production ML Pipeline",
    solutionHighlights: [
      "Optimized TensorRT / ONNX models quantized for low-power edge execution",
      "Continuous ML telemetry detecting data drift and triggering automated retraining",
      "Robust containerized serving infrastructure with active failover",
    ],
    asset3D: "/services/remove_bg/ChatGPT Image Aug 11, 2026, 07_43_44 PM (1).png",
    systemTag: "EDGE ML // REAL-TIME INFERENCE",
  },
  "data-engineering": {
    scenarioTitle: "Data Silos & Stale Analytics Pipelines",
    sender: "Chief Data Officer",
    role: "Multi-Region Retail",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    timestamp: "08:50 AM · Data Architecture Review",
    messages: [
      { text: "Nightly ETL batch jobs take 7 hours and frequently fail, delaying morning executive dashboards.", isAlert: true },
      { text: "Each regional warehouse stores inventory in a different schema, making global forecasting impossible." },
      { text: "We need a unified real-time streaming lakehouse architecture with strong data contracts." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "Decision-makers looking at 24-hour old stale data",
      "High cloud compute costs from unoptimized batch jobs",
      "Lack of clean governance and lineage tracking",
    ],
    solutionTitle: "The ADRIG Streaming Data Lakehouse",
    solutionHighlights: [
      "Sub-second event streaming with Kafka, Spark, and modern columnar storage",
      "Automated schema enforcement, data deduplication, and lineage tracking",
      "Single source of truth feeding real-time analytics and downstream ML models",
    ],
    asset3D: "/services/Data_Analysis_Section.png",
    systemTag: "LAKEHOUSE // REAL-TIME ETL",
  },
  "predictive-analytics": {
    scenarioTitle: "Reactive Maintenance & Unforeseen Downtime",
    sender: "Director of Plant Operations",
    role: "Heavy Transit & Rail",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    timestamp: "03:12 PM · Central Operations Dispatch",
    messages: [
      { text: "Track point failure caused an unscheduled 4-hour delay on the main industrial freight line.", isAlert: true },
      { text: "We are currently replacing equipment based on arbitrary calendar schedules instead of actual wear." },
      { text: "We need anomaly forecasting that flags mechanical stress 72 hours before failure occurs." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "Emergency repairs cost 6x more than scheduled maintenance",
      "Unplanned operational downtime disrupting entire logistics chains",
      "Excess capital locked in redundant replacement inventory",
    ],
    solutionTitle: "The ADRIG Predictive Intelligence Engine",
    solutionHighlights: [
      "Time-series anomaly detection algorithms trained on live vibration and temperature telemetry",
      "Automated work-order generation 72 hours prior to predicted mechanical threshold breaches",
      "Live operational risk score matrix for fleet-wide asset allocation",
    ],
    asset3D: "/services/Data_Analysis_Section.png",
    systemTag: "ANOMALY DETECTION // FORECASTING",
  },
  "blockchain": {
    scenarioTitle: "Multi-Party Reconciliation & Audit Disputes",
    sender: "Head of Structured Trade",
    role: "Cross-Border Logistics & Finance",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80",
    timestamp: "05:10 PM · Trade Settlement Ledger",
    messages: [
      { text: "Customs authorities, shipping carriers, and banks are maintaining 3 conflicting sets of records.", isAlert: true },
      { text: "Letters of Credit release is stalled for 9 days awaiting physical ink signatures and notary stamps." },
      { text: "We need an immutable, permissioned distributed ledger with verifiable smart contracts." },
    ],
    impactTitle: "The Operational Friction",
    impactMetrics: [
      "9-day settlement latency on multi-party transactions",
      "High dispute resolution and legal audit overhead",
      "Vulnerability to fraudulent tampering in manual papers",
    ],
    solutionTitle: "The ADRIG Sovereign Ledger Architecture",
    solutionHighlights: [
      "Enterprise permissioned blockchain with Byzantine fault-tolerant consensus",
      "Automated escrow and bill-of-lading smart contracts releasing upon verified GPS triggers",
      "Cryptographically auditable transaction proofs accessible by all authorized stakeholders",
    ],
    asset3D: "/services/remove_bg/ChatGPT Image Aug 11, 2026, 07_43_46 PM (4).png",
    systemTag: "IMMUTABLE // SMART CONTRACTS",
  },
};

/* Fallback for unlisted slugs */
const DEFAULT_CINEMATIC_DATA: PainPointDetails = {
  scenarioTitle: "Operational Bottlenecks & Legacy Inefficiencies",
  sender: "Head of Digital Transformation",
  role: "Enterprise Systems",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  timestamp: "10:00 AM · Internal Operations Slack",
  messages: [
    { text: "Legacy systems cannot scale with our current volume and data throughput.", isAlert: true },
    { text: "Manual steps create unnecessary latency and operational risk across the workflow." },
    { text: "We need an engineered architecture that guarantees reliability and performance." },
  ],
  impactTitle: "The Operational Friction",
  impactMetrics: [
    "Unnecessary manual bottlenecks and delays",
    "Fragmented systems with low observability",
    "High maintenance overhead on legacy workflows",
  ],
  solutionTitle: "The ADRIG Engineered Architecture",
  solutionHighlights: [
    "Built specifically for high-throughput enterprise scale",
    "Real-time observability and continuous automated validation",
    "Full IP ownership, zero lock-in, and sovereign security",
  ],
  asset3D: "/services/Ai_consultation.png",
  systemTag: "ENGINEERED // PRECISION",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Main ServiceTemplate Component
───────────────────────────────────────────────────────────────────────────── */

export default function ServiceTemplate({
  service,
  parentLabel = "Services",
  parentHref = "/services",
}: {
  service: Service;
  parentLabel?: string;
  parentHref?: string;
}) {
  const relatedWork = WORK_ITEMS.slice(0, 3);
  const cinematicData = SERVICE_CINEMATIC_DATA[service.slug] || DEFAULT_CINEMATIC_DATA;

  return (
    <div className="bg-[#FAFCFF] text-slate-950 font-sans selection:bg-[#0E5CEE] selection:text-white">
      

      {/* 2. Cinematic 3D Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-[#FAFCFF] pt-8 sm:pt-14 pb-20 sm:pb-28">
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" />

        {/* Ambient Blue Radial Glows */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-300/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[350px] bg-blue-200/20 blur-[110px] rounded-full pointer-events-none" />

        <div className="shell relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Hero Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 shadow-sm text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-6 w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E5CEE]" />
                {service.eyebrow}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.06]"
              >
                {service.headline}{" "}
                <span className="text-[#0E5CEE] font-medium">{service.headlineAccent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl"
              >
                {service.overview}
              </motion.p>

              {/* CTAs & Service Meta */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-slate-900 px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#0E5CEE] hover:-translate-y-0.5"
                >
                  <span>Engineer this capability</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#friction-analysis"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-6 py-3.5 text-[14.5px] font-semibold text-slate-800 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 hover:bg-white"
                >
                  <span>See Operational Friction</span>
                </Link>
              </motion.div>

              {/* Quick Specs Badges */}
              <div className="mt-10 pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-widest">DEPLOYMENT</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">Air-Gapped / Cloud</p>
                </div>
                <div>
                  <p className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-widest">ARCHITECTURE</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">Fault-Tolerant</p>
                </div>
                <div>
                  <p className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-widest">IP OWNERSHIP</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">100% Client Owned</p>
                </div>
              </div>
            </div>

            {/* Right: 3D Cinematic Render Display */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[560px] aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 bg-white/90 p-4 sm:p-6 shadow-2xl shadow-blue-950/[0.07] backdrop-blur-xl"
              >
                {/* Visual Glass Frame */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#F3F7FF] to-[#EAF2FF] border border-blue-100 flex items-center justify-center">
                  <Image
                    src={cinematicData.asset3D}
                    alt={service.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-700 drop-shadow-xl"
                    priority
                  />

                  {/* Floating Architectural Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-blue-200/80 shadow-md text-[11px] font-mono font-semibold text-[#0E5CEE] backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-[#0E5CEE] animate-pulse" />
                      {cinematicData.systemTag}
                    </span>
                  </div>

                  {/* Floating Uptime Badge */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-mono font-medium backdrop-blur-md shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      ENTERPRISE GRADE
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Relatable Operational Pain Point / Dialogue Box Section */}
      <section id="friction-analysis" className="py-20 sm:py-28 border-b border-slate-200/60 bg-white relative overflow-hidden">
        <div className="shell">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E5CEE]" />
              Operational Reality
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
              The friction businesses face before engineering.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Every system we build starts by isolating the exact operational logjam that costs teams hours, revenue, and focus.
            </p>
          </div>

          {/* Large Screen Widescreen Dialogue Showcase Card */}
          <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200/80 bg-[#FAFCFF] p-6 sm:p-10 lg:p-12 shadow-xl shadow-blue-950/[0.04]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Relatable Message Box Dialogue */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
                <div>
                  {/* Chat / Alert Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={cinematicData.avatar}
                        alt={cinematicData.sender}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{cinematicData.sender}</p>
                        <p className="text-xs text-slate-500 font-normal">{cinematicData.role}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      LIVE ISSUE
                    </span>
                  </div>

                  {/* Message Bubbles */}
                  <div className="space-y-3.5">
                    {cinematicData.messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-2xl text-[14px] leading-relaxed font-normal ${
                          msg.isAlert
                            ? "bg-red-50/80 border border-red-200/70 text-red-900 font-medium"
                            : "bg-[#F7F9FC] border border-slate-200/60 text-slate-800"
                        }`}
                      >
                        {msg.isAlert && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 mb-1.5">
                            <AlertCircle className="w-3.5 h-3.5" />
                            CRITICAL BOTTLENECK
                          </div>
                        )}
                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{cinematicData.timestamp}</span>
                  <span className="text-red-500 font-semibold uppercase">UNRESOLVED LOGJAM</span>
                </div>
              </div>

              {/* Right Column: The Engineered Resolution */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-inner">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-mono font-semibold uppercase tracking-wider text-blue-300 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#347DFF]" />
                    ADRIG SYSTEM RESOLUTION
                  </span>

                  <h3 className="text-2xl font-normal tracking-tight text-white leading-snug">
                    {cinematicData.solutionTitle}
                  </h3>

                  <ul className="mt-6 space-y-4">
                    {cinematicData.solutionHighlights.map((sol, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-200 text-sm sm:text-[15px] leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-[#347DFF] shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#A9C8FF] hover:text-white transition-colors group"
                  >
                    <span>Eliminate this bottleneck with ADRIG</span>
                    <ArrowRight className="w-4 h-4 text-[#347DFF] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Capabilities & Strengths Bento Grid */}
      <section className="py-20 sm:py-28 border-b border-slate-200/60 bg-[#FAFCFF] relative overflow-hidden">
        {/* Subtle Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="shell relative z-10">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E5CEE]" />
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
              Architected for high throughput & zero drift.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((f, i) => (
              <Reveal key={f} delay={(i % 4) * 0.04}>
                <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-7 shadow-lg shadow-blue-950/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300/70 hover:shadow-xl hover:shadow-blue-900/[0.07]">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#1463FF] mb-3">
                      <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
                      FEATURE 0{i + 1}
                    </span>
                    <h3 className="text-[19px] font-normal tracking-tight text-slate-900 group-hover:text-[#0E5CEE] transition-colors">
                      {f}
                    </h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Precision Spec</span>
                    <span className="font-mono text-[#0E5CEE]">READY</span>
                  </div>
                  {/* Corner glow */}
                  <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[#1463FF] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.08] pointer-events-none" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Systematic Engineering Approach (Process) */}
      <section className="py-20 sm:py-28 border-b border-slate-200/60 bg-white">
        <div className="shell">
          <div className="mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E5CEE]" />
              Delivery Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
              How we take systems from drawing to production.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {service.process.map((step, i) => (
              <div
                key={step}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-[#FAFCFF] p-6 shadow-sm hover:border-blue-300 transition-colors"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#0E5CEE] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-blue-200/60">
                    STEP 0{i + 1}
                  </span>
                  <h4 className="text-lg font-normal text-slate-950 mt-4 tracking-tight">
                    {step}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 mt-6 pt-3 border-t border-slate-200/60">
                  Standardized Milestone
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Included Solutions & Deliverables Grid */}
      <section id="solutions" className="py-20 sm:py-28 border-b border-slate-200/60 bg-[#FAFCFF] relative overflow-hidden">
        <div className="shell relative z-10">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E5CEE]" />
              Modular Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
              Deployable modules included under this service.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.solutions.map((sol, i) => (
              <Reveal key={sol} delay={(i % 4) * 0.05}>
                <div className="h-full flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm hover:shadow-md hover:border-blue-300/60 transition-all">
                  <div>
                    <span className="w-2 h-2 rounded-full bg-[#0E5CEE] inline-block mb-3" />
                    <h4 className="text-[17px] font-normal text-slate-950 tracking-tight leading-snug">
                      {sol}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-6 pt-4 border-t border-slate-100">
                    ENTERPRISE MODULE
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Technologies & Industries Cloud */}
      <section className="py-20 sm:py-28 border-b border-slate-200/60 bg-white">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-4">
              <Cpu className="w-3.5 h-3.5 text-[#0E5CEE]" />
              Powering Technologies
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-950">
              Battle-tested frameworks & infrastructure
            </h3>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200/80 bg-[#FAFCFF] px-4 py-2 text-[13.5px] font-normal text-slate-800 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0E5CEE]" />
              Domain Applicability
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-950">
              Tailored for mission-critical industry sectors
            </h3>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {INDUSTRIES.map((ind) => (
                <span
                  key={ind}
                  className="rounded-full border border-slate-200/80 bg-[#FAFCFF] px-4 py-2 text-[13.5px] font-normal text-slate-800 shadow-sm"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Related Case Studies */}
      <section className="py-20 sm:py-28 border-b border-slate-200/60 bg-[#FAFCFF] relative overflow-hidden">
        <div className="shell relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF4FF] border border-blue-200/70 text-xs font-semibold uppercase tracking-wider text-[#0E5CEE] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E5CEE]" />
                Proven Outcomes
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                Related enterprise deployments
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-[#0E5CEE] transition-colors"
            >
              <span>View all work</span>
              <ArrowRight className="w-4 h-4 text-[#0E5CEE]" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedWork.map((w, i) => (
              <Card
                key={w.slug}
                href={`/work/${w.slug}`}
                eyebrow={w.category}
                title={`${w.name} · ${w.client}`}
                description={w.summary}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <CTASection
        title={`Ready to engineer ${service.name}?`}
        description="Let's review your operational constraints and architect a production-ready system."
      />
    </div>
  );
}
