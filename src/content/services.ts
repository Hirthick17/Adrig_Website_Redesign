export type ServiceKey =
  | "chatbot"
  | "llm"
  | "ai-automation"
  | "workflow"
  | "data-analysis"
  | "software"
  | "consultation";

export type ProblemStep = {
  title: string;
  description: string;
  visualState?: string; // deprecated — images used instead
};

export type CapabilityItem = {
  id: string;
  title: string;
  description: string;
  outcome: string;
  metrics?: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  description: string;
};

export type UseCaseItem = {
  title: string;
  description: string;
  impact?: string;
  image?: string;
};

export type ProofData = {
  metric: string;
  label: string;
  description: string;
  client?: string;
  image?: string;
};

// Aceternity placeholder images (replace with real meme/relatable images per service)
const ACE = {
  hero1: "https://assets.aceternity.com/components/hero-1.webp",
  hero2: "https://assets.aceternity.com/components/hero-2.webp",
  hero3: "https://assets.aceternity.com/components/hero-3.webp",
  mesh:  "https://assets.aceternity.com/components/hero-section-with-mesh-gradient.webp",
  globe: "https://assets.aceternity.com/components/3d-globe.webp",
  kbd:   "https://assets.aceternity.com/components/keyboard-2.webp",
};

export type ServiceConfig = {
  key: ServiceKey;
  slug: string;
  aliases?: string[];
  /** 4–6 hero parallax images. Use meme/relatable images per service context. */
  heroImages: string[];
  /** 2–4 problem section sticky images. One per scroll step. */
  problemImages: string[];
  hero: {
    eyebrow?: string;
    title: string;
    emphasis: string;
    description: string;
    primaryCta: string;
  };
  problem: {
    title: string;
    description: string;
    steps: ProblemStep[];
  };
  capabilities: CapabilityItem[];
  architecture: {
    title: string;
    nodes: ArchitectureNode[];
  };
  useCases: UseCaseItem[];
  proof?: ProofData;
};

/* ─────────────────────────────────────────────────────────────────────────────
   1. Chatbot Development
───────────────────────────────────────────────────────────────────────────── */
export const chatbotService: ServiceConfig = {
  key: "chatbot",
  slug: "chatbot-development",
  aliases: ["chatbot"],
  heroImages: [
    "/images/chatbot posters/chatbot-meme-01-repetitive-faq-2x3.png",
    "/images/chatbot posters/chatbot-meme-02-understands-but-cant-act-2x3.png",
    "/images/chatbot posters/chatbot-meme-03-chatbot-support-team-2x3.png",
  ],
  problemImages: [
    "/images/chatbot posters/chatbot-meme-01-repetitive-faq-2x3.png",
    "/images/chatbot posters/chatbot-meme-02-understands-but-cant-act-2x3.png",
    "/images/chatbot posters/chatbot-meme-03-chatbot-support-team-2x3.png",
  ],
  hero: {
    eyebrow: "Chatbot Development",
    title: "Conversational systems built around",
    emphasis: "verified business knowledge.",
    description:
      "Enterprise RAG chatbots that understand intent, query your private knowledge base, and resolve customer and internal requests across every channel.",
    primaryCta: "Discuss your chatbot",
  },
  problem: {
    title: "Support teams are overwhelmed by disconnected knowledge.",
    description:
      "When internal documents live in fragmented silos, response latency spikes and inconsistent information damages client trust.",
    steps: [
      {
        title: "Fragmented knowledge silos",
        description:
          "Documentation, product manuals, and policies live across Zendesk, Notion, and Slack.",
        visualState: "fragmented",
      },
      {
        title: "Repetitive Tier-1 logjam",
        description:
          "Human support agents spend 70% of their workday copy-pasting answers to standard questions.",
        visualState: "logjam",
      },
      {
        title: "Grounded conversational intelligence",
        description:
          "ADRIG's RAG engine indexes internal docs and returns verified, cited answers in under 1.2s.",
        visualState: "resolved",
      },
    ],
  },
  capabilities: [
    {
      id: "rag",
      title: "Retrieval-Augmented Generation (RAG)",
      description:
        "Connect live document repositories with real-time vector embeddings and semantic search.",
      outcome: "Answers strictly grounded in your verified internal source files.",
      metrics: "< 1.2s average latency",
    },
    {
      id: "omnichannel",
      title: "Omnichannel Connectors",
      description:
        "Deploy unified conversational agents across WhatsApp, Web Portal, Slack, and Zendesk.",
      outcome: "One brain powering customer touchpoints across all channels.",
      metrics: "99.9% uptime SLA",
    },
    {
      id: "triage",
      title: "Autonomous Escalation Engine",
      description:
        "Deterministic intent recognition that resolves Tier-1 queries and routes complex cases to human staff.",
      outcome: "Zero dead-end conversations with full conversation context handed to agents.",
      metrics: "64% autonomous resolution rate",
    },
  ],
  architecture: {
    title: "From raw documentation to verified real-time answers.",
    nodes: [
      { id: "input", label: "Omnichannel Input", description: "WhatsApp, Web, or Slack query" },
      { id: "intent", label: "Intent Parser", description: "Semantic classifier & entity extractor" },
      { id: "vector", label: "Vector Search", description: "Cosine similarity across private embeddings" },
      { id: "guardrails", label: "Governance Layer", description: "Hallucination and compliance filter" },
      { id: "output", label: "Cited Response", description: "Context-aware answer with verified sources" },
    ],
  },
  useCases: [
    {
      title: "Enterprise Customer Support Agent",
      description: "Automate Tier-1 resolution across WhatsApp and web with real-time CRM integration.",
      impact: "74% reduction in first-response time",
      image: "/services/Ai_consultation.png",
    },
    {
      title: "Internal Technical Knowledge Bot",
      description: "Allow engineers and field workers to query internal architectural rules in natural language.",
      impact: "Zero dependency on senior engineer triage",
      image: "/services/remove_bg/ChatGPT Image Aug 11, 2026, 07_43_47 PM (5).png",
    },
  ],
  proof: {
    metric: "4.8s → 0.9s",
    label: "Resolution Speed",
    description: "Deployed for railway field operations, answering complex regulatory questions in seconds.",
    client: "Southern Railways Operations",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. LLM Development & Generative AI
───────────────────────────────────────────────────────────────────────────── */
export const llmService: ServiceConfig = {
  key: "llm",
  slug: "generative-ai-solutions",
  aliases: ["generative-ai", "llm-development", "llm"],
  heroImages: [
    "/images/generative-ai-01.png",
    "/images/generative-ai-02.png",
    "/images/generative-ai-03.png",
  ],
  problemImages: [
    "/images/generative-ai-01.png",
    "/images/generative-ai-02.png",
    "/images/generative-ai-03.png",
  ],
  hero: {
    eyebrow: "Generative AI & LLM Systems",
    title: "Language systems built around",
    emphasis: "your proprietary data.",
    description:
      "Private, observable LLM applications and domain-tuned foundation models designed around your data, workflows, and operating constraints.",
    primaryCta: "Discuss your model",
  },
  problem: {
    title: "Generic public models lack enterprise context and data governance.",
    description:
      "Useful business intelligence requires air-gapped security, deterministic verification, and full model weight ownership.",
    steps: [
      {
        title: "Hallucination risks",
        description: "Public LLMs produce plausible but factually flawed assertions on mission-critical workflows.",
        visualState: "hallucination",
      },
      {
        title: "Sensitive data exposure",
        description: "Unregulated API calls risk leaking proprietary algorithms, customer records, and trade secrets.",
        visualState: "leakage",
      },
      {
        title: "Sovereign enterprise intelligence",
        description: "Fine-tuned models running in private VPCs with deterministic verification layers.",
        visualState: "governed",
      },
    ],
  },
  capabilities: [
    {
      id: "finetuning",
      title: "Domain-Specific Fine-Tuning",
      description: "Specialize open-weights models (Llama 3, Mistral) on your company's domain ontology.",
      outcome: "High-accuracy outputs tailored to your internal terminology and formats.",
      metrics: "98.4% domain precision",
    },
    {
      id: "evaluation",
      title: "Automated LLM Evaluation",
      description: "Continuous benchmark suite evaluating hallucination, safety, and operational adherence.",
      outcome: "Measurable model performance verified before production deployments.",
      metrics: "0% external data leaks",
    },
    {
      id: "airgap",
      title: "Air-Gapped Private Deployment",
      description: "Containerized deployment in your dedicated cloud or on-premise GPU clusters.",
      outcome: "Full IP ownership with zero third-party token surveillance.",
      metrics: "Air-gapped compliance",
    },
  ],
  architecture: {
    title: "From domain corpora to deterministic enterprise execution.",
    nodes: [
      { id: "curation", label: "Data Curation", description: "Anonymized, cleaned domain dataset" },
      { id: "tuning", label: "LoRA / QLoRA Tuning", description: "Quantized parameter-efficient fine-tuning" },
      { id: "eval", label: "Benchmark Suite", description: "Deterministic factual verification" },
      { id: "serving", label: "vLLM Inference", description: "High-throughput GPU inference cluster" },
      { id: "api", label: "Enterprise API", description: "Secure RBAC endpoint for client systems" },
    ],
  },
  useCases: [
    {
      title: "Financial Audit & Clause Extraction",
      description: "Parse multi-hundred-page loan covenants and flag covenant breach risks automatically.",
      impact: "90% faster compliance reviews",
      image: "/images/services/generative-ai.png",
    },
    {
      title: "Clinical Protocol Assistant",
      description: "Assist healthcare practitioners in retrieving treatment protocols grounded in medical journals.",
      impact: "100% auditable citation links",
      image: "/images/generative-ai-02.png",
    },
  ],
  proof: {
    metric: "100%",
    label: "Air-Gapped Privacy",
    description: "Sovereign on-premise LLM deployed with verifiable weights and zero telemetry callbacks.",
    client: "Healthcare Systems Partner",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   3. AI Automation
───────────────────────────────────────────────────────────────────────────── */
export const aiAutomationService: ServiceConfig = {
  key: "ai-automation",
  slug: "ai-automation",
  aliases: ["ai-automation"],
  heroImages: [
    "/images/ai-automations-01.png",
    "/images/ai-automations-02.png",
    "/images/ai-automations-03.png",
  ],
  problemImages: [
    "/images/ai-automations-01.png",
    "/images/ai-automations-02.png",
    "/images/ai-automations-03.png",
  ],
  hero: {
    eyebrow: "AI Automation",
    title: "Intelligent agent swarms built for",
    emphasis: "autonomous execution.",
    description:
      "Multi-agent systems and intelligent process automation that extract unstructured data, execute decision trees, and orchestrate complex tasks.",
    primaryCta: "Explore automation",
  },
  problem: {
    title: "Manual operations cannot scale with exponential transaction volumes.",
    description:
      "When human operators must manually review unstructured invoices, claims, and tickets, operations bottleneck and error rates multiply.",
    steps: [
      {
        title: "Unstructured document avalanche",
        description: "PDFs, scanned images, and emails require manual transcription into databases.",
        visualState: "manual_backlog",
      },
      {
        title: "Linear headcount dependency",
        description: "Scaling the business requires hiring more clerical staff to review documents.",
        visualState: "bottleneck",
      },
      {
        title: "Autonomous agent execution",
        description: "Agent swarms parse, validate, and execute workflows with human-in-the-loop oversight.",
        visualState: "agent_orchestration",
      },
    ],
  },
  capabilities: [
    {
      id: "agents",
      title: "Autonomous Agent Swarms",
      description: "Collaborative specialized agents (Extractor, Validator, Executor) handling end-to-end tasks.",
      outcome: "Complex multi-step workflows executed without human fatigue.",
      metrics: "10x throughput multiplier",
    },
    {
      id: "vision",
      title: "Document Vision Extraction",
      description: "Multi-modal vision models parsing messy tables, handwritten notes, and complex layouts.",
      outcome: "High-fidelity structured JSON output from any document format.",
      metrics: "99.2% OCR extraction accuracy",
    },
    {
      id: "hitl",
      title: "Human-in-the-Loop Review",
      description: "Automated confidence scoring that auto-approves high-confidence items and flags edge cases.",
      outcome: "Complete risk control with zero blind automated errors.",
      metrics: "100% auditable log trace",
    },
  ],
  architecture: {
    title: "From raw unstructured intake to verified ERP transaction.",
    nodes: [
      { id: "intake", label: "Document Ingestion", description: "PDFs, scans, emails, and API payloads" },
      { id: "vision_agent", label: "Vision Extractor", description: "Spatial OCR & key-value mapping" },
      { id: "rule_agent", label: "Policy Validator", description: "Cross-checks against compliance logic" },
      { id: "hitl_node", label: "Confidence Gate", description: "Flags low-confidence scores for review" },
      { id: "erp_exec", label: "ERP Integration", description: "Commits clean record into core ERP" },
    ],
  },
  useCases: [
    {
      title: "Automated Accounts Payable Processing",
      description: "Extract line items from 5,000+ monthly vendor invoices and auto-reconcile with purchase orders.",
      impact: "82% reduction in processing cost",
      image: "/images/services/ai-automation.png",
    },
    {
      title: "Insurance Claims Triage & Fraud Check",
      description: "Auto-review medical bills, police reports, and damage photos for fraud indicators.",
      impact: "Claims settlement down from 6 days to 4 hours",
      image: "/images/ai-automations-02.png",
    },
  ],
  proof: {
    metric: "94.6%",
    label: "Touchless Processing",
    description: "High-volume claims platform processing thousands of unstructured records autonomously.",
    client: "National Logistics Enterprise",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   4. Workflow Automation
───────────────────────────────────────────────────────────────────────────── */
export const workflowService: ServiceConfig = {
  key: "workflow",
  slug: "workflow-automation",
  aliases: ["workflow-automations", "workflow-automation"],
  heroImages: [
    "/images/workflow-automations-01.png",
    "/images/workflow-automations-02.png",
    "/images/workflow-automations-03.png",
  ],
  problemImages: [
    "/images/workflow-automations-01.png",
    "/images/workflow-automations-02.png",
    "/images/workflow-automations-03.png",
  ],
  hero: {
    eyebrow: "Workflow Automation",
    title: "Connecting fragmented tools into",
    emphasis: "one synchronized system.",
    description:
      "Event-driven automation pipelines that eliminate manual handoffs, bridge legacy ERPs, and provide real-time operational telemetry.",
    primaryCta: "Automate your workflows",
  },
  problem: {
    title: "Disconnected software systems create silent delays and data drift.",
    description:
      "When CRM, inventory, and accounting operate on separate schedules, teams spend their time fixing sync errors rather than moving forward.",
    steps: [
      {
        title: "Silent handoff failures",
        description: "Updates in one system fail to propagate, leaving field teams working on stale numbers.",
        visualState: "drift",
      },
      {
        title: "Manual spreadsheet reconciliation",
        description: "Teams export CSVs daily to manually balance databases across departments.",
        visualState: "manual_csv",
      },
      {
        title: "Synchronized event bus",
        description: "Every state change broadcasts through an observable event pipeline in real time.",
        visualState: "synchronized",
      },
    ],
  },
  capabilities: [
    {
      id: "event_bus",
      title: "Event-Driven Architecture",
      description: "High-throughput message brokers (Kafka/RabbitMQ) broadcasting state changes instantaneously.",
      outcome: "Zero lag between business triggers and execution.",
      metrics: "< 50ms propagation time",
    },
    {
      id: "erp_bridge",
      title: "Legacy ERP Connectors",
      description: "Custom bi-directional adapters bridging SAP, Oracle, and modern cloud APIs.",
      outcome: "Extend modern automation onto legacy infrastructure without total rewrites.",
      metrics: "Zero API downtime",
    },
    {
      id: "telemetry",
      title: "Real-Time Telemetry & Alerting",
      description: "Live operational dashboards displaying pipeline health, retry queues, and latency.",
      outcome: "Immediate automated alerting before operational bottlenecks impact clients.",
      metrics: "99.99% message delivery SLA",
    },
  ],
  architecture: {
    title: "From operational event trigger to distributed execution.",
    nodes: [
      { id: "trigger", label: "Business Trigger", description: "Inventory threshold, webhook, or order" },
      { id: "router", label: "Event Router", description: "Validates schema & deduplicates payloads" },
      { id: "transform", label: "Data Transformer", description: "Normalizes formats between APIs" },
      { id: "connector", label: "ERP Connector", description: "Executes atomic writes to core databases" },
      { id: "audit", label: "Audit Ledger", description: "Immutable execution trace and replay log" },
    ],
  },
  useCases: [
    {
      title: "Multi-Zone Railway Block Operations",
      description: "Real-time coordination between station masters, track managers, and central dispatch.",
      impact: "Reduced operational train hold delays by 42%",
      image: "/images/services/workflow-automation.png",
    },
    {
      title: "Automated Supply Chain Reordering",
      description: "Trigger manufacturer purchase orders automatically when warehouse stock drops below safety buffers.",
      impact: "Zero stockouts across 18 regional hubs",
      image: "/images/workflow-automations-02.png",
    },
  ],
  proof: {
    metric: "42%",
    label: "Delay Reduction",
    description: "Real-time block management automation deployed across high-traffic rail networks.",
    client: "Southern Railways Network",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   5. Data Analysis & Predictive Analytics
───────────────────────────────────────────────────────────────────────────── */
export const dataAnalysisService: ServiceConfig = {
  key: "data-analysis",
  slug: "predictive-analytics",
  aliases: ["data-analysis", "data-engineering", "data-analysis-predictive-analytics"],
  heroImages: [
    "/images/data-predictive-analysis-01.png",
    "/images/data-predictive-analysis-02.png",
    "/images/data-predictive-analysis-03.png",
  ],
  problemImages: [
    "/images/data-predictive-analysis-01.png",
    "/images/data-predictive-analysis-02.png",
    "/images/data-predictive-analysis-03.png",
  ],
  hero: {
    eyebrow: "Data Intelligence & Analytics",
    title: "Transforming raw operational noise into",
    emphasis: "predictive foresight.",
    description:
      "High-performance streaming data lakehouses, real-time analytics engines, and predictive anomaly models that give leaders verified operational clarity.",
    primaryCta: "Analyze your data",
  },
  problem: {
    title: "Companies drown in raw data while starving for timely decisions.",
    description:
      "When reports take days to compile, leaders make decisions based on what happened last week instead of what is happening right now.",
    steps: [
      {
        title: "Stale batch reporting",
        description: "Nightly batch scripts finish hours late, providing retrospective rather than proactive signals.",
        visualState: "stale_batch",
      },
      {
        title: "Unnoticed machine anomalies",
        description: "Equipment failure patterns go undetected until unexpected catastrophic downtime occurs.",
        visualState: "unnoticed_failure",
      },
      {
        title: "Continuous streaming intelligence",
        description: "Real-time columnar pipelines calculate live risk scores and anomaly alerts in milliseconds.",
        visualState: "realtime_insight",
      },
    ],
  },
  capabilities: [
    {
      id: "lakehouse",
      title: "Real-Time Streaming Lakehouse",
      description: "Columnar data architecture (ClickHouse, Snowflake, DuckDB) optimized for sub-second queries.",
      outcome: "Query millions of raw records in milliseconds without compute bottlenecks.",
      metrics: "10x query acceleration",
    },
    {
      id: "anomaly",
      title: "Predictive Anomaly Detection",
      description: "Time-series machine learning models forecasting mechanical or financial deviations.",
      outcome: "Prevent equipment downtime 72 hours before failures manifest.",
      metrics: "96.8% anomaly forecast accuracy",
    },
    {
      id: "dashboards",
      title: "Executive Decision Dashboards",
      description: "Custom drag-and-drop dashboards and embeddable telemetry components.",
      outcome: "Unified operational visibility for C-suite and field engineers alike.",
      metrics: "Live sub-minute refresh",
    },
  ],
  architecture: {
    title: "From telemetry stream to predictive decision execution.",
    nodes: [
      { id: "sensor", label: "Telemetry Stream", description: "IoT sensors, logs, and transaction streams" },
      { id: "stream", label: "Stream Ingestion", description: "Kafka / Flink real-time transformation" },
      { id: "lake", label: "Columnar Storage", description: "Partitioned high-speed analytical lakehouse" },
      { id: "ml_model", label: "Inference Engine", description: "Time-series anomaly forecasting model" },
      { id: "action", label: "Action Dispatch", description: "Automated work-order / executive alert" },
    ],
  },
  useCases: [
    {
      title: "Predictive Train Track Maintenance",
      description: "Analyze vibration and heat sensor feeds along rail corridors to schedule proactive repairs.",
      impact: "72 hours advance failure warning",
      image: "/images/services/data-predictive-analysis.png",
    },
    {
      title: "Real-Time Retail Revenue Forecasting",
      description: "Aggregate point-of-sale data across 200+ stores with dynamic inventory allocation.",
      impact: "18% reduction in inventory holding costs",
      image: "/images/data-predictive-analysis-02.png",
    },
  ],
  proof: {
    metric: "72h",
    label: "Predictive Lead Time",
    description: "Sensor telemetry pipeline predicting mechanical failure risks before track disruption.",
    client: "Dagala Analytics Platform",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   6. Custom Software Engineering
───────────────────────────────────────────────────────────────────────────── */
export const softwareService: ServiceConfig = {
  key: "software",
  slug: "software-development",
  aliases: ["software", "software-engineering"],
  heroImages: [
    "/images/software posters/software-meme-01-less-chaos.png",
    "/images/software posters/software-meme-02-small-change.png",
    "/images/software posters/software-meme-03-maintenance-firefighter.png",
  ],
  problemImages: [
    "/images/software posters/software-meme-01-less-chaos.png",
    "/images/software posters/software-meme-02-small-change.png",
    "/images/software posters/software-meme-03-maintenance-firefighter.png",
  ],
  hero: {
    eyebrow: "Software Engineering",
    title: "Custom SaaS platforms built for",
    emphasis: "resilience and high concurrency.",
    description:
      "Enterprise software products engineered end-to-end — from system architecture and UI/UX design to fault-tolerant distributed cloud infrastructure.",
    primaryCta: "Build your platform",
  },
  problem: {
    title: "Off-the-shelf software forces businesses into unnatural workflows.",
    description:
      "Rigid SaaS tools create workarounds, high monthly per-seat licensing fees, and lack the performance required for proprietary business scale.",
    steps: [
      {
        title: "Bloated per-seat subscriptions",
        description: "Companies pay six figures annually for software that only meets 60% of their actual requirements.",
        visualState: "licensing_cost",
      },
      {
        title: "Clunky integration workarounds",
        description: "Teams rely on brittle manual spreadsheets to bridge features missing in commercial SaaS.",
        visualState: "brittle_bridge",
      },
      {
        title: "Purpose-built proprietary software",
        description: "Custom software aligned 100% to your workflows, deployed in your private cloud with zero per-seat fees.",
        visualState: "custom_saas",
      },
    ],
  },
  capabilities: [
    {
      id: "fullstack",
      title: "Cloud-Native Fullstack Architecture",
      description: "Engineered with Next.js, Node.js, Go, and PostgreSQL for blistering speed and low latency.",
      outcome: "Sub-100ms UI interactions and predictable horizontal cloud autoscaling.",
      metrics: "99.99% uptime availability",
    },
    {
      id: "multi_tenant",
      title: "Multi-Tenant SaaS Infrastructure",
      description: "Secure data isolation, role-based access control (RBAC), and compliance-ready audit logging.",
      outcome: "Scale to thousands of enterprise accounts with strict tenant boundaries.",
      metrics: "SOC2-aligned architecture",
    },
    {
      id: "api_first",
      title: "API-First Microservices",
      description: "Expose clean REST and GraphQL endpoints designed for seamless third-party ecosystem integration.",
      outcome: "Your software becomes a platform other systems can build upon.",
      metrics: "100% documented endpoints",
    },
  ],
  architecture: {
    title: "From client interaction to distributed database replication.",
    nodes: [
      { id: "cdn", label: "Edge CDN / Gateway", description: "Global edge caching & SSL termination" },
      { id: "frontend", label: "Next.js Interface", description: "Server-rendered, responsive UI layer" },
      { id: "api_layer", label: "Microservices Core", description: "Stateless backend services & auth" },
      { id: "cache", label: "Redis Cache Layer", description: "In-memory session and query caching" },
      { id: "database", label: "Postgres Cluster", description: "Multi-region replicated database" },
    ],
  },
  useCases: [
    {
      title: "Enterprise Billing & Invoice Engine",
      description: "Multi-currency SaaS billing platform processing recurring subscriptions and automated GST invoices.",
      impact: "Processed $14M+ in annual transactions",
      image: "/images/services/software-development.png",
    },
    {
      title: "Fleet & Asset Telemetry Dashboard",
      description: "Real-time interactive GPS and sensor mapping platform tracking industrial transport assets.",
      impact: "Sub-second live map updates for 2,400+ vehicles",
      image: "/images/software posters/software-meme-02-small-change.png",
    },
  ],
  proof: {
    metric: "$14M+",
    label: "Processed Volume",
    description: "Custom fintech SaaS billing platform running in production with zero downtime incidents.",
    client: "BillsApp Enterprise",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   7. AI Consultation & Systems Architecture
───────────────────────────────────────────────────────────────────────────── */
export const consultationService: ServiceConfig = {
  key: "consultation",
  slug: "ai-ml-development",
  aliases: ["consultation", "ai-consultation", "ai-ml"],
  heroImages: [
    "/images/ai-ml-01.png",
    "/images/ai-ml-02.png",
    "/images/ai-ml-03.png",
  ],
  problemImages: [
    "/images/ai-ml-01.png",
    "/images/ai-ml-02.png",
    "/images/ai-ml-03.png",
  ],
  hero: {
    eyebrow: "AI Consultation & Strategy",
    title: "Turning vague AI ambition into",
    emphasis: "executable system roadmaps.",
    description:
      "Deep technical reviews, architecture design, and feasibility roadmaps led by senior AI architects — preventing expensive mistakes before code is written.",
    primaryCta: "Schedule architecture review",
  },
  problem: {
    title: "85% of enterprise AI proofs-of-concept fail to reach production.",
    description:
      "Without rigorous upfront architecture, companies spend hundreds of thousands on lab prototypes that fail real-world data constraints.",
    steps: [
      {
        title: "Hype-driven prototyping",
        description: "Projects start building without validating data quality, latency thresholds, or regulatory constraints.",
        visualState: "unfocused_poc",
      },
      {
        title: "Costly production dead-ends",
        description: "Prototypes fail when exposed to real concurrency, security requirements, and legacy ERPs.",
        visualState: "failed_handover",
      },
      {
        title: "De-risked engineering blueprint",
        description: "Clear architectural blueprints, risk registers, and phased milestones designed by senior engineers.",
        visualState: "executable_blueprint",
      },
    ],
  },
  capabilities: [
    {
      id: "audit",
      title: "AI Feasibility & Data Audit",
      description: "Assess existing data quality, infrastructure maturity, and security compliance.",
      outcome: "A definitive go/no-go report backed by technical proof.",
      metrics: "2-week audit cycle",
    },
    {
      id: "architecture_blueprint",
      title: "System Architecture Blueprint",
      description: "End-to-end technical diagrams specifying model selection, hardware requirements, and APIs.",
      outcome: "An engineering plan your internal team or vendors can build without ambiguity.",
      metrics: "100% verified specifications",
    },
    {
      id: "roi_roadmap",
      title: "Phased Execution Roadmap",
      description: "Prioritized milestones organized by business impact vs technical complexity.",
      outcome: "Ship high-impact wins in 6-week increments instead of multi-year blind bets.",
      metrics: "Guaranteed milestone timeline",
    },
  ],
  architecture: {
    title: "From initial operational audit to validated delivery plan.",
    nodes: [
      { id: "data_eval", label: "Data Quality Audit", description: "Evaluates completeness and governance" },
      { id: "feasibility", label: "Feasibility Modeling", description: "Tests model options against latency" },
      { id: "arch_design", label: "System Design", description: "Defines APIs, security, and scaling" },
      { id: "cost_analysis", label: "Compute TCO", description: "Forecasts cloud and GPU budget" },
      { id: "roadmap", label: "Execution Roadmap", description: "Deliverable timeline with risk registers" },
    ],
  },
  useCases: [
    {
      title: "Enterprise AI Readiness & Strategy",
      description: "Complete architectural review and technology selection for an international logistics provider.",
      impact: "Saved estimated $340k in misguided tooling purchases",
      image: "/images/services/ai-ml.png",
    },
    {
      title: "Security & Sovereignty Review",
      description: "Audit compliance requirements for deploying proprietary LLMs in regulated financial environments.",
      impact: "Approved for production air-gapped deployment",
      image: "/images/ai-ml-02.png",
    },
  ],
  proof: {
    metric: "$340k",
    label: "Tooling Budget Saved",
    description: "Upfront architecture audit prevented premature cloud compute purchases and lock-in.",
    client: "Enterprise Logistics Client",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   8. Blockchain & Smart Contract Engineering
───────────────────────────────────────────────────────────────────────────── */
export const blockchainService: ServiceConfig = {
  key: "blockchain",
  slug: "blockchain",
  aliases: ["blockchain-development", "web3", "smart-contracts"],
  heroImages: [
    "/images/blockchain-01.png",
    "/images/blockchain-02.png",
    "/images/blockchain-03.png",
  ],
  problemImages: [
    "/images/blockchain-01.png",
    "/images/blockchain-02.png",
    "/images/blockchain-03.png",
  ],
  hero: {
    eyebrow: "Blockchain & Smart Contracts",
    title: "Permissioned distributed ledgers built for",
    emphasis: "tamper-proof operational trust.",
    description:
      "Enterprise blockchain networks, auditable smart contract automation, and cryptographic settlement systems designed for verifiable multi-party workflows.",
    primaryCta: "Discuss blockchain architecture",
  },
  problem: {
    title: "Multi-party operational agreements suffer from lack of verified provenance.",
    description:
      "When external vendors, logistics carriers, and finance teams maintain disparate databases, settling disputes takes weeks of costly manual audits.",
    steps: [
      {
        title: "Disputed reconciliation ledgers",
        description: "Counterparties maintain conflicting records, causing prolonged settlement freezes.",
        visualState: "dispute",
      },
      {
        title: "Vulnerable intermediary risk",
        description: "Centralized third-party intermediaries add fees, latency, and single points of failure.",
        visualState: "intermediary",
      },
      {
        title: "Cryptographic consensus automation",
        description: "Smart contracts execute settlements autonomously upon verified state transitions.",
        visualState: "consensus",
      },
    ],
  },
  capabilities: [
    {
      id: "smart_contracts",
      title: "Audited Smart Contract Development",
      description: "Formal verification and security-audited Solidity / Rust smart contracts.",
      outcome: "Deterministic execution of contractual clauses with zero human tampering.",
      metrics: "100% formal test coverage",
    },
    {
      id: "permissioned_ledgers",
      title: "Enterprise Permissioned Networks",
      description: "Hyperledger Besu / Polygon Supernets configured for compliant multi-stakeholder consortiums.",
      outcome: "High-throughput, private blockchain infrastructure with customizable access control.",
      metrics: "< 1s finality time",
    },
    {
      id: "tokenization",
      title: "Asset Tokenization & Settlement",
      description: "Tokenize real-world assets (RWA) and automate instant cross-border treasury settlements.",
      outcome: "Drastic liquidity optimization and automated audit compliance.",
      metrics: "Instant atomic settlement",
    },
  ],
  architecture: {
    title: "From transaction event to immutable consensus commit.",
    nodes: [
      { id: "tx_submit", label: "Signed Payload", description: "Cryptographically signed client transaction" },
      { id: "mempool", label: "Consensus Layer", description: "IBFT 2.0 / PoS validator verification" },
      { id: "evm", label: "Smart Contract Engine", description: "State transition & rule verification" },
      { id: "state", label: "State Trie", description: "Merkle-Patricia cryptographic state commit" },
      { id: "indexer", label: "Enterprise Subgraph", description: "Real-time indexer for ERP integration" },
    ],
  },
  useCases: [
    {
      title: "Multi-Carrier Supply Chain Provenance",
      description: "Track pharmaceutical cold-chain sensor data on an immutable distributed ledger.",
      impact: "Zero counterfeit or compromised batch disputes",
      image: "/images/blockchain-01.png",
    },
    {
      title: "Automated Royalty & Escrow Settlement",
      description: "Release vendor escrow payments automatically when milestone delivery webhooks fire.",
      impact: "Reduced dispute resolution cycle from 28 days to instantaneous",
      image: "/images/blockchain-02.png",
    },
  ],
  proof: {
    metric: "100%",
    label: "Audit Integrity",
    description: "Immutable ledger tracking compliance records across multiple independent transport carriers.",
    client: "Global Logistics Consortium",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   9. Data Engineering & Lakehouses
───────────────────────────────────────────────────────────────────────────── */
export const dataEngineeringService: ServiceConfig = {
  key: "data-engineering",
  slug: "data-engineering",
  aliases: ["data-engineering-solutions", "lakehouse"],
  heroImages: [
    "/images/data-engineering-01.png",
    "/images/data-engineering-02.png",
    "/images/data-engineering-03.png",
  ],
  problemImages: [
    "/images/data-engineering-01.png",
    "/images/data-engineering-02.png",
    "/images/data-engineering-03.png",
  ],
  hero: {
    eyebrow: "Data Engineering",
    title: "Streaming data pipelines built for",
    emphasis: "high-velocity enterprise scale.",
    description:
      "Robust data lakehouses, distributed ETL pipelines, and real-time Kafka streams engineered for zero data loss and sub-second analytical queries.",
    primaryCta: "Architect your data pipeline",
  },
  problem: {
    title: "Fragmented pipelines break under modern enterprise ingestion velocity.",
    description:
      "Legacy batch ETL jobs fail silently, leaving analytics dashboards out of sync and machine learning models starved of clean data.",
    steps: [
      {
        title: "Brittle pipeline failures",
        description: "Schema mutations break overnight ETL runs without alerting data teams.",
        visualState: "broken_pipeline",
      },
      {
        title: "Compute cost explosion",
        description: "Unoptimized full-table scans inflate cloud data warehouse invoices exponentially.",
        visualState: "cost_explosion",
      },
      {
        title: "Observable streaming lakehouse",
        description: "Zero-copy columnar storage and automated schema governance ensure 99.99% pipeline reliability.",
        visualState: "reliable_lakehouse",
      },
    ],
  },
  capabilities: [
    {
      id: "streaming_etl",
      title: "Real-Time Streaming ETL",
      description: "Apache Kafka and Spark Streaming pipelines processing gigabytes per second with zero message loss.",
      outcome: "Analytics and AI models fed with real-time, clean data.",
      metrics: "< 100ms end-to-end latency",
    },
    {
      id: "lakehouse_arch",
      title: "Modern Data Lakehouse Design",
      description: "Delta Lake / Iceberg architectures combining the reliability of data warehouses with lake scalability.",
      outcome: "Unified single source of truth for both BI reporting and ML training.",
      metrics: "60% cloud compute cost savings",
    },
    {
      id: "data_governance",
      title: "Automated Data Governance & Lineage",
      description: "Automated data quality assertions (Great Expectations) and end-to-end lineage tracking.",
      outcome: "Total confidence in data correctness and regulatory compliance.",
      metrics: "99.99% pipeline uptime",
    },
  ],
  architecture: {
    title: "From raw data ingestion to governed lakehouse consumption.",
    nodes: [
      { id: "ingest", label: "Source Ingestion", description: "Databases (CDC), logs, and webhook streams" },
      { id: "kafka", label: "Kafka Event Hub", description: "Partitioned high-throughput message queue" },
      { id: "spark", label: "Spark Transformation", description: "Schema validation & deduplication" },
      { id: "iceberg", label: "Iceberg Lakehouse", description: "Columnar Parquet storage with time-travel" },
      { id: "query", label: "Trino / ClickHouse", description: "Sub-second SQL query engine for BI/AI" },
    ],
  },
  useCases: [
    {
      title: "High-Throughput IoT Telemetry Pipeline",
      description: "Ingest and process 40,000 sensor telemetry messages per second from industrial machinery.",
      impact: "Zero message loss with 90ms query response",
      image: "/images/services/data-engineering.png",
    },
    {
      title: "Real-Time Financial Transaction Aggregator",
      description: "Unified CDC pipeline synchronizing 12 regional core-banking databases into a central lakehouse.",
      impact: "Replaced 6-hour batch jobs with sub-minute continuous sync",
      image: "/images/data-engineering-02.png",
    },
  ],
  proof: {
    metric: "40k/s",
    label: "Ingestion Rate",
    description: "Distributed streaming pipeline running continuous ingestion with sub-second analytical querying.",
    client: "Industrial IoT Infrastructure",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Registry of all services
───────────────────────────────────────────────────────────────────────────── */
export const ALL_SERVICES: ServiceConfig[] = [
  chatbotService,
  llmService,
  aiAutomationService,
  workflowService,
  dataAnalysisService,
  softwareService,
  consultationService,
  blockchainService,
  dataEngineeringService,
];

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  const normalized = slug.toLowerCase().trim();
  return ALL_SERVICES.find(
    (s) => s.slug === normalized || s.key === normalized || s.aliases?.includes(normalized)
  );
}
