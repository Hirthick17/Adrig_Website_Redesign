# 🚀 Adrig AI — Next.js Enterprise 3D Web Experience

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=flat&logo=three.js)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.7-purple?style=flat)](https://r3f.docs.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-ff0055?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

An enterprise-grade, interactive 3D website built for **Adrig AI**, combining high-performance WebGL 3D rendering (React Three Fiber & Three.js), cinematic camera choreographies, futuristic cyberpunk/sci-fi glassmorphism design systems, and responsive Next.js 15 App Router architecture.

---

## 📑 Table of Contents

- [🌌 Design Idea & Visual Philosophy](#-design-idea--visual-philosophy)
- [📁 Folder Structure Breakdown](#-folder-structure-breakdown)
- [🛠️ Getting Started & Installation](#️-getting-started--installation)
- [🎮 3D Engine & Animation Architecture](#-3d-engine--animation-architecture)
- [🧱 Developer Guide: Creating Components & Screens](#-developer-guide-creating-components--screens)
  - [1. Creating a New Page / Route](#1-creating-a-new-page--route)
  - [2. Creating UI Components](#2-creating-ui-components)
  - [3. Building Animated Sections (Framer Motion)](#3-building-animated-sections-framer-motion)
  - [4. Adding 3D Procedural Objects & Visual Recipes](#4-adding-3d-procedural-objects--visual-recipes)
- [🎨 Styling & Design Tokens](#-styling--design-tokens)
- [⚡ Performance Optimization Best Practices](#-performance-optimization-best-practices)
- [📜 Git Workflow](#-git-workflow)

---

## 🌌 Design Idea & Visual Philosophy

The Adrig AI platform is built around **"Cinematic Technological Infrastructure"**:
1. **Interactive 3D District**: A live procedural digital city representing complex AI systems, neural signal paths, technical cables, data packets, and the central **Adrig Tower**.
2. **Scrollytelling & Stage Progressions**: The 3D camera travels along parametric spline paths (`camera-path.ts`) synchronized with user scroll or story stage triggers (`hero-story.ts`).
3. **Cyberpunk Minimalist Dark Mode**: Deep void backgrounds (`#030712`, `#0a0e1a`) paired with electric cyan, neon violet, and emerald data flows, subtle glow effects, and frosted glass cards (`backdrop-blur`).
4. **Fluid Micro-Interactions**: Hover states, smooth card expansions, glowing borders, and staggered scroll reveals powered by Framer Motion.

---

## 📁 Folder Structure Breakdown

```plaintext
adrig-next/
├── public/                     # Static assets (images, icons, models)
├── src/
│   ├── app/                    # Next.js 15 App Router (Pages & Layouts)
│   │   ├── layout.tsx          # Global root layout (Navbar, Footer, Providers)
│   │   ├── page.tsx            # Main Landing Page (Hero + Home sections)
│   │   ├── globals.css         # Global styles, Tailwind directives, theme variables
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── icon.tsx            # Dynamic Favicon generation
│   │   ├── blockchain/         # Blockchain Solutions subpage
│   │   ├── generative-ai/      # Generative AI Solutions subpage
│   │   ├── services/           # Services overview and detail subpages
│   │   ├── products/           # Products portfolio subpages
│   │   ├── industries/         # Target industry solutions
│   │   ├── technologies/       # Technology stack showcase
│   │   ├── work/               # Case studies and portfolio
│   │   ├── team/               # Leadership and team showcase
│   │   ├── careers/            # Job listings & hiring page
│   │   ├── contact/            # Interactive contact form & inquiries
│   │   ├── privacy-policy/     # Legal privacy policy
│   │   ├── terms-conditions/   # Terms and conditions
│   │   └── cookies-policy/     # Cookie usage policy
│   │
│   ├── components/             # Reusable UI & 3D Components
│   │   ├── Nav.tsx             # Global navigation bar with blur effect & mobile menu
│   │   ├── Footer.tsx          # Multi-column footer with brand links
│   │   │
│   │   ├── hero/               # 3D WebGL Canvas & Scrollytelling Architecture
│   │   │   ├── Hero.tsx                 # Hero wrapper managing overlay & 3D canvas
│   │   │   ├── HeroCanvas.tsx           # React Three Fiber Canvas with postprocessing
│   │   │   ├── CityScene.tsx            # 3D World composition (lighting, fog, environment)
│   │   │   ├── AdrigTower.tsx           # Monolithic central AI tower
│   │   │   ├── ProceduralDistrict.tsx   # Procedural building clusters and skyscrapers
│   │   │   ├── GroundSystem.tsx         # Dark grid ground plane with neon pulse lines
│   │   │   ├── TechnicalCable.tsx       # Dynamic 3D data cables with glowing shaders
│   │   │   ├── SignalPacket.tsx         # Animated light packets moving through cables
│   │   │   ├── PainBubbleLayer.tsx      # Interactive 3D floating problem/pain bubbles
│   │   │   ├── HeroCamera.tsx           # Camera controller attached to spline paths
│   │   │   ├── HeroIntro.tsx            # HTML Overlay: Initial brand statement & CTA
│   │   │   ├── HeroStageInformation.tsx # Floating stage-specific HUD information
│   │   │   ├── HeroResolution.tsx       # Stage resolution overlay
│   │   │   ├── HeroProgressIndicator.tsx# Interactive step indicator & stage jumper
│   │   │   ├── building-recipes.ts      # Geometry and dimension definitions for 3D buildings
│   │   │   ├── cable-routes.ts          # 3D spline coordinate data for signal cables
│   │   │   ├── camera-path.ts           # Parametric camera waypoints & look-at targets
│   │   │   ├── hero-story.ts            # State machines & narrative definitions for stages
│   │   │   └── materials.ts             # Reusable Three.js shaders, glass & metallic materials
│   │   │
│   │   ├── home/               # Landing page specific sections
│   │   │   └── HomeSections.tsx         # WhyAdrig, WhatWeDo, Services, Testimonials, etc.
│   │   │
│   │   ├── ui/                 # Atomic design UI components
│   │   │   ├── Card.tsx                 # Glassmorphic card with gradient borders
│   │   │   ├── PageHero.tsx             # Standardized hero section for inner subpages
│   │   │   ├── SectionHeading.tsx       # Section titles with tag badge and subtitle
│   │   │   ├── Reveal.tsx               # Framer motion in-view fade/slide wrapper
│   │   │   ├── CTASection.tsx           # High-impact conversion CTA banner
│   │   │   ├── Breadcrumb.tsx           # Navigation breadcrumb trails
│   │   │   ├── FeatureList.tsx          # Key points / feature checklists
│   │   │   ├── ProcessRail.tsx          # Step-by-step roadmap rail
│   │   │   └── LegalPage.tsx            # Standard layout for legal / policy pages
│   │   │
│   │   ├── services/           # Service-specific specialized components
│   │   └── work/               # Portfolio and case study interactive widgets
│   │
│   └── lib/                    # Utilities, site metadata, and helper functions
│       ├── site-data.ts        # Central configuration (Navigation links, services, products, testimonials)
│       └── utils.ts            # Helper functions (class merging `cn()`, formatters)
│
├── .gitignore                  # Git ignore rules (node_modules, .next, .env)
├── eslint.config.mjs           # ESLint linting configuration
├── next.config.ts              # Next.js build & runtime configuration
├── package.json                # Project dependencies & scripts
├── postcss.config.mjs          # PostCSS processor plugins
└── tsconfig.json               # TypeScript compiler rules & path aliases (`@/*`)
```

---

## 🛠️ Getting Started & Installation

### Prerequisites
- **Node.js**: Version `18.18.0` or `>= 20.0.0`
- **Package Manager**: `npm` (v9+ or v10+) or `pnpm` / `yarn`
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hirthick17/Adrig_Website_Redesign.git
   cd Adrig_Website_Redesign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   > The application will start at **`http://localhost:3000`** with Turbopack enabled for ultra-fast hot reloading.

### Production Build & Deployment

```bash
# Build optimized production bundle
npm run build

# Run production server locally
npm run start

# Run TypeScript & ESLint checks
npm run lint
```

---

## 🎮 3D Engine & Animation Architecture

The website uses a hybrid 2D/3D rendering stack:

```
┌─────────────────────────────────────────────────────────────┐
│                    DOM & UI Layer                           │
│  (Next.js App Router + Tailwind CSS + Framer Motion)        │
│  - Nav, HeroIntro, Stage HUD, Section Cards, CTA            │
└──────────────────────────────┬──────────────────────────────┘
                               │ State / Scroll Trigger
┌──────────────────────────────▼──────────────────────────────┐
│                  React Three Fiber Canvas                   │
│  (CityScene, PostProcessing Bloom, Ambient & Point Lights)  │
├─────────────────────────────────────────────────────────────┤
│  - HeroCamera (Interpolates position along camera-path.ts)  │
│  - AdrigTower (Central procedural structure)                │
│  - ProceduralDistrict (Instanced building geometry)         │
│  - TechnicalCable & SignalPacket (Spline data flow shaders) │
│  - PainBubbleLayer (Interactive 3D hoverable spheres)       │
└─────────────────────────────────────────────────────────────┘
```

### Key 3D Concepts:
- **`HeroCanvas.tsx`**: Sets up WebGL rendering context with antialiasing, camera FOV (45°), tone mapping, and Bloom post-processing.
- **`camera-path.ts`**: Defines vector coordinates `(x, y, z)` and target vectors for each narrative stage. Camera transitions use smooth Lerp (`THREE.MathUtils.lerp`).
- **`building-recipes.ts`**: Procedural parameters to generate high-tech city blocks without loading heavy external 3D models (`.gltf`/`.glb`), ensuring instant page loads (< 200ms).

---

## 🧱 Developer Guide: Creating Components & Screens

### 1. Creating a New Page / Route

To create a new route (e.g. `/solutions/ai-analytics`):

1. Create a directory under `src/app/solutions/ai-analytics/`.
2. Create a `page.tsx` file inside:

```tsx
// src/app/solutions/ai-analytics/page.tsx
import PageHero from "@/components/ui/PageHero";
import CTASection from "@/components/ui/CTASection";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "AI Analytics — Adrig AI",
  description: "Next-generation enterprise data intelligence and predictive pipelines.",
};

export default function AIAnalyticsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <PageHero
        tag="Solutions"
        title="AI Analytics Platform"
        description="Transform unstructured enterprise data into real-time actionable intelligence."
      />
      <section className="container mx-auto px-6 py-12">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Real-time Stream" description="Sub-millisecond event streaming." />
            <Card title="Predictive AI" description="Autonomous forecasting models." />
            <Card title="Security" description="Zero-trust cryptographic data protection." />
          </div>
        </Reveal>
      </section>
      <CTASection
        title="Ready to supercharge your data?"
        description="Schedule a technical architecture review with our engineers."
      />
    </main>
  );
}
```

---

### 2. Creating UI Components

Reusable UI components live in `src/components/ui/`. Follow the glassmorphic dark theme style:

```tsx
// src/components/ui/Badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "cyan" | "purple" | "emerald";
  className?: string;
}

export default function Badge({ label, variant = "cyan", className }: BadgeProps) {
  const variantStyles = {
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-300",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-mono tracking-wider uppercase rounded-full border backdrop-blur-md",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
```

---

### 3. Building Animated Sections (Framer Motion)

Use Framer Motion with the pre-configured `<Reveal>` wrapper or create custom micro-interactions:

```tsx
"use client";

import { motion } from "framer-motion";

export function AnimatedFeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors backdrop-blur-xl group"
    >
      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-slate-400">{desc}</p>
    </motion.div>
  );
}
```

---

### 4. Adding 3D Procedural Objects & Visual Recipes

When creating 3D meshes in React Three Fiber:
1. Always use `useFrame` for continuous animations.
2. Share geometries and materials from `src/components/hero/materials.ts` to minimize GPU state switches.
3. Example of a custom pulsing 3D beacon:

```tsx
// src/components/hero/BeaconNode.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BeaconNode({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#0891b2"
        emissiveIntensity={1.5}
        roughness={0.2}
        metalness={0.9}
        wireframe
      />
    </mesh>
  );
}
```

---

### 5. Managing Global Content in `site-data.ts`

To add or update menu items, services, products, case studies, or company statistics, edit `src/lib/site-data.ts`. All pages automatically consume data from this single source of truth.

---

## 🎨 Styling & Design Tokens

The styling architecture uses **Tailwind CSS v4** with custom CSS variables in `src/app/globals.css`:

| Token | CSS Variable / Value | Purpose |
| :--- | :--- | :--- |
| **Background Void** | `#030712` / `bg-slate-950` | Primary dark canvas background |
| **Card Surface** | `rgba(15, 23, 42, 0.65)` | Frosted glass cards |
| **Accent Primary** | `#06b6d4` (`cyan-500`) | Primary neon highlight & buttons |
| **Accent Secondary**| `#8b5cf6` (`purple-500`)| Secondary AI gradient accents |
| **Accent Success**  | `#10b981` (`emerald-500`)| Active data signals / metrics |
| **Typography** | `Inter`, `Geist Sans`, `Fira Code` (Mono) | High-legibility modern sans & technical mono |

---

## ⚡ Performance Optimization Best Practices

1. **Procedural Geometry over Heavy 3D Models**: Using algorithmic boxes, cylinders, and splines keeps initial bundle size small and avoids multi-megabyte GLTF downloads.
2. **Turbopack**: Run `npm run dev` with `--turbopack` for instant module replacement.
3. **Lazy R3F Rendering**: The Canvas runs with `frameloop="always"` or `"demand"` based on stage animations.
4. **Hardware Acceleration**: Use `transform-gpu` and `will-change` sparingly on animated DOM nodes.
5. **Next.js Image & Font Optimization**: Built-in Next.js font and asset optimizations are leveraged globally.

---

## 📜 Git Workflow

- **`main`**: Production-ready code.
- **Feature Branches**: `feature/your-feature-name` or `fix/bug-name`.
- Commit with conventional commit messages (e.g., `feat: add AI agent showcase section`, `fix: camera spline interpolation at stage 3`).

```bash
# Push new changes
git add .
git commit -m "feat: your new feature description"
git push origin main
```

---

## 👥 Authors & Maintainers

- **Adrig AI Engineering Team**
- Repository: [GitHub - Hirthick17/Adrig_Website_Redesign](https://github.com/Hirthick17/Adrig_Website_Redesign)
