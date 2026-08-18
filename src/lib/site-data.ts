/**
 * Single source of truth for site structure & copy, matching
 * /sitemap/Overall_Website_Sitemap.png, Service.png and Work_Page.png.
 * Pages are generated FROM this data (dynamic [slug] routes) rather than
 * hand-authored per page, per the "faster coding implementation" brief.
 */

/**
 * The one approved hero copy block, carried over verbatim from the
 * validated hero.html trailer (final composition) — not invented here.
 */
export const HERO_COPY = {
  eyebrow: "Engineering Intelligent Systems",
  headline: "Engineering",
  headlineAccent: "Intelligent Systems",
  headlineLine2: "For Businesses That Want To Evolve.",
  description:
    "ADRIG combines AI, automation, software engineering and data intelligence to transform the way businesses operate.",
  primaryCta: { label: "Start Your Transformation", href: "/contact" },
  secondaryCta: { label: "Explore Capabilities", href: "/services" },
};

/** The three narrative beats that play while the city assembles — copy carried over from hero.html as-is. */
export const HERO_STORY_BEATS = [
  {
    eyebrow: "01 — Digital awakening",
    heading: "Engineering ",
    accent: "Intelligent Systems",
    body: "Every system worth trusting starts as a drawing. Precision before code.",
    in: [0.02, 0.1] as [number, number],
    out: [0.14, 0.21] as [number, number],
  },
  {
    eyebrow: "02 — Ecosystem formation",
    heading: "Connecting intelligence, technology, ",
    accent: "and business.",
    body: "Enterprise systems, data architecture and workflow — assembled as one structure rather than bolted together.",
    in: [0.2, 0.28] as [number, number],
    out: [0.38, 0.46] as [number, number],
  },
];

/**
 * One operational pain-point per district, index-aligned with DISTRICTS in
 * cinema-engine.ts (Healthcare, Finance, Data & Cloud, Manufacturing, Retail,
 * Logistics & Transport, Energy). Rendered as a message bubble that appears
 * large at the district and travels toward the tower, shrinking as it goes —
 * illustrative industry pain points, not a claim about a real client.
 */
export const HERO_PROBLEM_BUBBLES = [
  { label: "Healthcare", text: "Patient records live in six systems that don't talk to each other." },
  { label: "Finance", text: "Reconciliation still happens in a spreadsheet, by hand." },
  { label: "Data & Cloud", text: "Every team ships. Nobody has the full picture." },
  { label: "Manufacturing", text: "Downtime gets discovered after the line has already stopped." },
  { label: "Retail", text: "Inventory counts never match what's actually on the shelf." },
  { label: "Logistics & Transport", text: "Nobody knows where a shipment is until it doesn't arrive." },
  { label: "Energy", text: "Grid data updates hourly. Decisions can't wait that long." },
];

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const NAV_LINKS: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Chatbot Development", href: "/services/chatbot-development" },
      { label: "Software Development", href: "/services/software-development" },
      { label: "Workflow Automations", href: "/services/workflow-automation" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Generative AI", href: "/services/generative-ai-solutions" },
      { label: "Artificial Intelligence & ML", href: "/services/ai-ml-development" },
      { label: "Data Engineering", href: "/services/data-engineering" },
      { label: "Data Analysis & Predictive Analytics", href: "/services/predictive-analytics" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Generative AI", href: "/generative-ai" },
  { label: "Blockchain", href: "/blockchain" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About ADRIG", href: "/team" },
    { label: "Our Story", href: "/team#story" },
    { label: "Careers", href: "/careers" },
  ],
  services: [
    { label: "All Services", href: "/services" },
    { label: "Generative AI", href: "/generative-ai" },
    { label: "Blockchain", href: "/blockchain" },
  ],
  products: [{ label: "All Products", href: "/products" }],
  caseStudies: [{ label: "All Case Studies", href: "/work" }],
  resources: [
    { label: "Industries We Serve", href: "/industries" },
    { label: "Technologies We Use", href: "/technologies" },
  ],
  contact: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Cookies Policy", href: "/cookies-policy" },
  ],
};

/* ============================================================== services */

export type Service = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  overview: string;
  keyBenefits: string[];
  features: string[];
  process: string[];
  solutions: string[];
  technologies: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "chatbot-development",
    number: "01",
    name: "Chatbot Development",
    eyebrow: "Chatbot Development",
    headline: "One conversation in.",
    headlineAccent: "Resolved, every channel.",
    overview:
      "Conversational AI that understands intent and context, connects to your knowledge base, and resolves customer requests across every channel you already use.",
    keyBenefits: [
      "Consistent answers across WhatsApp, web, email and social",
      "Grounded in your own documentation, not generic guesses",
      "Escalates cleanly to a human when it should",
    ],
    features: [
      "NLP & Understanding",
      "Intent & Entity Recognition",
      "RAG Chatbots",
      "Custom Prompt Engineering",
      "Conversation Analytics",
      "Omnichannel Chatbots",
      "FAQ Automation",
      "Chatbot Integration",
    ],
    process: ["Discover", "Design", "Build", "Integrate", "Launch", "Improve"],
    solutions: [
      "Customer support automation",
      "Lead qualification bots",
      "Internal knowledge assistants",
      "Omnichannel deployment",
    ],
    technologies: ["Python", "LangChain", "OpenAI", "React", "Node.js", "AWS"],
  },
  {
    slug: "software-development",
    number: "02",
    name: "Software Development",
    eyebrow: "Software Development",
    headline: "Real business problems in.",
    headlineAccent: "Cloud software out.",
    overview:
      "Custom SaaS products engineered end-to-end — from strategy and UI/UX through migration, integration and long-term support.",
    keyBenefits: [
      "Built around how your team actually works",
      "API-first, so it fits your existing stack",
      "Supported and maintained after launch",
    ],
    features: [
      "SaaS Consulting & Strategy",
      "Custom SaaS Product Development",
      "UI/UX Design",
      "SaaS Migration",
      "API Development & Integration",
      "Support & Maintenance",
    ],
    process: ["Discover", "Design", "Build", "Deploy", "Support"],
    solutions: [
      "Accounting SaaS",
      "CMS platforms",
      "ERP SaaS",
      "Project management SaaS",
      "Communication platforms",
      "HR SaaS",
      "CRM SaaS",
      "Billing SaaS",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    slug: "workflow-automation",
    number: "03",
    name: "Workflow Automations",
    eyebrow: "Workflow Automations",
    headline: "One workflow in.",
    headlineAccent: "Automation out.",
    overview:
      "Rule-based and AI-driven automation that removes repetitive work from your operations, from event triggers to reporting.",
    keyBenefits: [
      "Fewer manual handoffs between systems",
      "Consistent, auditable process execution",
      "Scales without adding headcount",
    ],
    features: [
      "Rule-Based Automation",
      "AI-Driven Decision Systems",
      "Robotic Process Automation",
      "API-Based Automation",
      "Event-Triggered Workflows",
      "Automated Reporting & Notifications",
    ],
    process: ["Map", "Design", "Automate", "Monitor"],
    solutions: [
      "Approval workflows",
      "Data sync between systems",
      "Scheduled reporting",
      "Notification pipelines",
    ],
    technologies: ["Python", "Node.js", "AWS"],
  },
  {
    slug: "ai-automation",
    number: "04",
    name: "AI Automation",
    eyebrow: "AI Automation",
    headline: "One request in.",
    headlineAccent: "Action out.",
    overview:
      "AI agents and intelligent process automation that make decisions, complete documents and integrate with the systems your business already runs on.",
    keyBenefits: [
      "Handles the long tail, not just the happy path",
      "Decisions grounded in your business rules",
      "Integrates with existing enterprise systems",
    ],
    features: [
      "Intelligent Process Automation",
      "AI Agents",
      "Business Process Automation",
      "AI Decision Automation",
      "Document Automation",
      "Enterprise Integrations",
    ],
    process: ["Assess", "Design", "Automate", "Deploy", "Optimize"],
    solutions: [
      "Document processing agents",
      "Decision automation",
      "Enterprise system integration",
    ],
    technologies: ["Python", "LangChain", "OpenAI", "AWS"],
  },
  {
    slug: "generative-ai-solutions",
    number: "05",
    name: "Generative AI",
    eyebrow: "Generative AI",
    headline: "One prompt in.",
    headlineAccent: "Content, at scale.",
    overview:
      "Generative AI consulting and implementation — from content generation to enterprise-grade GenAI integration built around your data.",
    keyBenefits: [
      "Consulting first, tooling second",
      "Multimodal: text, image, video and audio",
      "Built for enterprise integration, not demos",
    ],
    features: [
      "Generative AI Consulting",
      "AI Content Generation",
      "Image / Video / Audio Generation",
      "AI Co-Pilots",
      "Custom Generative AI Solutions",
      "Enterprise GenAI Integration",
    ],
    process: ["Consult", "Prototype", "Build", "Integrate"],
    solutions: ["Content generation pipelines", "AI co-pilots", "Custom GenAI products"],
    technologies: ["OpenAI", "LangChain", "Python", "AWS"],
  },
  {
    slug: "ai-ml-development",
    number: "06",
    name: "Artificial Intelligence & ML",
    eyebrow: "Artificial Intelligence & ML",
    headline: "Raw data in.",
    headlineAccent: "Trained models out.",
    overview:
      "Machine learning and computer vision systems, trained, deployed and monitored — from first model to production.",
    keyBenefits: [
      "Models trained on your own domain data",
      "Deployment and monitoring, not just notebooks",
      "Vision and language capabilities in one team",
    ],
    features: [
      "Machine Learning Solutions",
      "Computer Vision",
      "Natural Language Processing",
      "Predictive Modeling",
      "AI Model Development",
      "AI Model Training & Fine-tuning",
      "Model Deployment",
      "AI Model Monitoring",
    ],
    process: ["Data", "Train", "Validate", "Deploy", "Monitor"],
    solutions: ["Computer vision pipelines", "NLP systems", "Predictive models"],
    technologies: ["Python", "PyTorch", "TensorFlow", "AWS"],
  },
  {
    slug: "data-engineering",
    number: "07",
    name: "Data Engineering",
    eyebrow: "Data Engineering",
    headline: "Scattered data in.",
    headlineAccent: "One pipeline out.",
    overview:
      "Data pipelines, warehousing and governance that turn scattered sources into a single, reliable foundation for analytics and AI.",
    keyBenefits: [
      "Real-time and batch pipelines, your choice",
      "Governed data your teams can trust",
      "Built to feed analytics and AI directly",
    ],
    features: [
      "Data Pipeline Development",
      "Data Warehousing",
      "ETL / ELT Development",
      "Real-time Data Streaming",
      "Data Lake & Lakehouse",
      "Data Integration",
      "Data Governance",
    ],
    process: ["Assess", "Architect", "Build", "Integrate", "Govern"],
    solutions: ["ETL pipelines", "Data warehouses", "Streaming ingestion"],
    technologies: ["Python", "AWS", "PostgreSQL"],
  },
  {
    slug: "predictive-analytics",
    number: "08",
    name: "Data Analysis & Predictive Analytics",
    eyebrow: "Data Analysis & Predictive Analytics",
    headline: "One dataset in.",
    headlineAccent: "Insight out.",
    overview:
      "Forecasting, classification and anomaly detection, delivered as BI dashboards decision-makers actually use.",
    keyBenefits: [
      "Forecasts and models tied to real decisions",
      "Dashboards built for the people who use them",
      "Anomaly detection that catches what matters",
    ],
    features: [
      "Time-Series Forecasting",
      "Regression Analysis",
      "Classification Models",
      "Anomaly Detection",
      "Ensemble Modelling",
      "BI Dashboards & Reporting",
      "Advanced Analytics",
    ],
    process: ["Ingest", "Model", "Analyze", "Decide"],
    solutions: ["Forecasting models", "BI dashboards", "Anomaly detection systems"],
    technologies: ["Python", "TensorFlow", "AWS"],
  },
];

/* ============================================ generative ai & blockchain
   Same shape as Service, so both pages reuse the one ServiceTemplate. */

export const GENERATIVE_AI: Service = {
  slug: "generative-ai",
  number: "GA",
  name: "Generative AI",
  eyebrow: "Generative AI",
  headline: "One idea in.",
  headlineAccent: "Every format out.",
  overview:
    "End-to-end generative AI capability — consulting, prompt engineering, content generation and enterprise integration under one roof.",
  keyBenefits: [
    "Consulting first, tooling second",
    "Multimodal: text, image, video, voice",
    "Built for enterprise integration, not demos",
  ],
  features: [
    "GenAI Consulting",
    "LLM Development",
    "Prompt Engineering",
    "AI Content Generation",
    "Image Generation",
    "Video Generation",
    "AI Voice & Speech",
    "AI Co-Pilots",
    "Custom GenAI Solutions",
    "GenAI Integration",
  ],
  process: ["Consult", "Prototype", "Build", "Integrate"],
  solutions: ["Content generation pipelines", "AI co-pilots", "Custom GenAI products", "Enterprise GenAI integration"],
  technologies: ["OpenAI", "LangChain", "Python", "AWS"],
};

export const BLOCKCHAIN: Service = {
  slug: "blockchain",
  number: "BC",
  name: "Blockchain",
  eyebrow: "Blockchain",
  headline: "One ledger in.",
  headlineAccent: "Trust, by design.",
  overview:
    "Blockchain consulting and development — smart contracts, DApps, DeFi and secure, audited infrastructure.",
  keyBenefits: [
    "Security-audited by default",
    "Public or private chain, your choice",
    "From consulting through to token launch",
  ],
  features: [
    "Blockchain Consulting",
    "Smart Contract Development",
    "DApp Development",
    "DeFi Development",
    "NFT Marketplace Development",
    "Blockchain Integration",
    "Blockchain Security Audits",
    "Token Development",
    "Web3 Development",
    "Private Blockchain Solutions",
  ],
  process: ["Consult", "Design", "Develop", "Audit", "Launch"],
  solutions: ["Smart contracts", "DApps", "DeFi protocols", "NFT marketplaces", "Private chains"],
  technologies: ["Python", "AWS"],
};

/* =============================================================== products */

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "rbms",
    name: "RBMS",
    tagline: "Railway Block Management System",
    description:
      "A centralized platform for railway block operations — real-time tracking, coordination and reporting.",
  },
  {
    slug: "billsapp",
    name: "BillsApp",
    tagline: "Bill Management & Payment Solution",
    description: "Streamlined billing and payments for businesses of any size.",
  },
  {
    slug: "aladdyn",
    name: "Aladdyn.io",
    tagline: "AI-Powered Automation Platform",
    description: "A platform for building and running AI-driven automation workflows.",
  },
  {
    slug: "track-on",
    name: "Track-On",
    tagline: "Advanced Tracking & Monitoring",
    description: "Real-time tracking and monitoring built for operational visibility.",
  },
  {
    slug: "dagala-analytics",
    name: "Dagala Analytics",
    tagline: "Data Analytics Platform",
    description: "A analytics platform turning operational data into decisions.",
  },
  {
    slug: "ai-rule-clarifier",
    name: "AI Rule Clarifier",
    tagline: "AI-Powered Rule Clarification (Rail Rules)",
    description: "AI that clarifies complex regulatory and operational rules on demand.",
  },
];

/* ================================================================= work */

export type WorkItem = {
  slug: string;
  name: string;
  client: string;
  category: string;
  summary: string;
  challenge: string[];
  solution: string;
  keyFeatures: string[];
  technologies: string[];
};

export const WORK_ITEMS: WorkItem[] = [
  {
    slug: "southern-railways",
    name: "RBMS",
    client: "Southern Railways",
    category: "Railways",
    summary:
      "A centralized, real-time platform that digitizes block management and reduces manual dependency.",
    challenge: [
      "Manual block management led to delays and errors",
      "Lack of real-time visibility across locations",
      "Communication gaps between departments",
    ],
    solution:
      "A centralized, real-time platform automating block operations with live tracking and cross-team coordination.",
    keyFeatures: ["Real-time monitoring", "Block scheduling", "Live tracking", "Automated alerts", "Reports & analytics"],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    slug: "rail-rules",
    name: "AI Rule Clarifier",
    client: "Southern Railways",
    category: "Railways",
    summary: "An AI system that clarifies operational rail rules on demand for field staff.",
    challenge: ["Complex rule books slow decision-making", "Inconsistent interpretation across teams"],
    solution: "An AI-powered clarifier trained on the rule book, giving consistent answers in plain language.",
    keyFeatures: ["Natural-language rule lookup", "Consistent interpretation", "Fast field reference"],
    technologies: ["Python", "LangChain", "OpenAI"],
  },
  {
    slug: "trackon",
    name: "TrackOn",
    client: "Southern Railways",
    category: "Railways",
    summary: "Advanced tracking and monitoring built on the same operational backbone as RBMS.",
    challenge: ["Fragmented tracking across systems", "Delayed operational reporting"],
    solution: "A unified tracking layer with live status and automated reporting.",
    keyFeatures: ["Live tracking", "Automated reporting", "Operational dashboards"],
    technologies: ["React", "Node.js", "AWS"],
  },
  {
    slug: "miporis",
    name: "Miporis",
    client: "Miporis",
    category: "Analytics",
    summary: "An analytics engagement focused on real-time operational insight.",
    challenge: ["Data spread across disconnected tools", "No single source of truth for decisions"],
    solution: "A consolidated analytics layer with dashboards built around real decisions.",
    keyFeatures: ["Unified analytics", "Custom dashboards", "Automated reporting"],
    technologies: ["Python", "AWS"],
  },
  {
    slug: "dagala-analytics",
    name: "Dagala Analytics",
    client: "Dagala",
    category: "Analytics",
    summary: "A data analytics platform turning operational data into decisions.",
    challenge: ["Manual reporting cycles", "Limited visibility into trends"],
    solution: "A self-serve analytics platform with forecasting and anomaly detection.",
    keyFeatures: ["Forecasting", "Anomaly detection", "BI dashboards"],
    technologies: ["Python", "TensorFlow", "AWS"],
  },
  {
    slug: "dagala",
    name: "Dagala",
    client: "Dagala",
    category: "Software",
    summary: "A broader platform engagement alongside the Dagala Analytics product.",
    challenge: ["Multiple disconnected internal tools"],
    solution: "A unified platform consolidating core operational workflows.",
    keyFeatures: ["Unified workflows", "Role-based access", "Integrations"],
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "barron-tech-serve",
    name: "Barron Tech Serve",
    client: "Barron Tech Serve",
    category: "FinTech",
    summary: "A mobile application engagement for a technology services provider.",
    challenge: ["Legacy mobile experience", "Manual service workflows"],
    solution: "A rebuilt mobile app with automated service workflows.",
    keyFeatures: ["Mobile-first design", "Automated workflows", "Real-time status"],
    technologies: ["React", "Node.js"],
  },
  {
    slug: "aladdyn",
    name: "Aladdyn",
    client: "Aladdyn.io",
    category: "AI Automation",
    summary: "The AI-powered automation platform product engagement.",
    challenge: ["Manual, repetitive operational workflows"],
    solution: "An AI automation platform orchestrating workflows end-to-end.",
    keyFeatures: ["AI agents", "Workflow orchestration", "Integrations"],
    technologies: ["Python", "LangChain", "AWS"],
  },
  {
    slug: "billsapp",
    name: "BillsApp",
    client: "BillsApp",
    category: "FinTech",
    summary: "The bill management and payment solution product engagement.",
    challenge: ["Manual billing cycles", "Delayed payment reconciliation"],
    solution: "An end-to-end billing and payments platform.",
    keyFeatures: ["Automated billing", "Payment processing", "Reconciliation"],
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
];

/* ============================================================= industries */

export const INDUSTRIES = [
  "Railways",
  "Healthcare",
  "FinTech",
  "Education",
  "Manufacturing",
  "Logistics",
  "Retail",
];

/* =========================================================== technologies */

export const TECHNOLOGIES = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "OpenAI",
  "LangChain",
  "React",
  "Node.js",
  "AWS",
];

/* =============================================================== why adrig */

export const WHY_ADRIG = [
  { title: "Expert Team", body: "Skilled professionals across AI, data and software engineering." },
  { title: "Innovation", body: "Cutting-edge solutions built on current, proven technology." },
  { title: "Proven Track Record", body: "Delivery across railways, fintech, manufacturing and more." },
  { title: "Customer-Centric", body: "Client success drives every engagement decision." },
  { title: "End-to-End Support", body: "From strategy to deployment, and support after launch." },
];
