"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import StackingCards from "@/components/ui/stacking-card";
import StrengthsFullScreenHero from "@/components/home/StrengthsFullScreenHero";
import ProductsCarousel from "@/components/home/ProductsCarousel";
import { AdrigProcessSection } from "@/components/sections/AdrigProcessSection";
import { BackgroundLines } from "@/components/ui/background-lines";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { ArrowRight } from "lucide-react";
import {
  SERVICES,
  WORK_ITEMS,
  INDUSTRIES,
  TECHNOLOGIES,
} from "@/lib/site-data";

/* ============================================================= WHY ADRIG */

export function WhyAdrigSection() {
  return <StrengthsFullScreenHero />;
}

/* ============================================================== SERVICES */

const CAPABILITY_PALETTES = [
  { color: "#0B213F", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" },
  { color: "#071A33", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80" },
  { color: "#0B2447", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80" },
  { color: "#0D1F3C", image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80" },
  { color: "#081E3D", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80" },
  { color: "#092244", image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&auto=format&fit=crop&q=80" },
  { color: "#0B2852", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80" },
  { color: "#071E3B", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" },
];

export function ServicesSection() {
  const serviceCards = SERVICES.map((s, idx) => {
    const palette = CAPABILITY_PALETTES[idx % CAPABILITY_PALETTES.length];
    return {
      title: `${s.number}. ${s.name}`,
      description: s.overview,
      link: palette.image,
      color: palette.color,
      href: `/services/${s.slug}`,
    };
  });

  return (
    <section id="our-services" className="border-b border-slate-800/80 bg-slate-950">
      <StackingCards
        projects={serviceCards}
        headingTitle="Engineering intelligent enterprise capabilities."
        headingSubtitle="Eight interconnected capabilities engineered to build, automate, and scale modern business operations."
      />
    </section>
  );
}

/* ============================================================== PRODUCTS */

export function ProductsSection() {
  return <ProductsCarousel />;
}

/* =========================================================== HOW WE WORK */

export function HowWeWorkSection() {
  return <AdrigProcessSection />;
}

/* =========================================================== CASE STUDIES */

export function CaseStudiesSection() {
  const featured = WORK_ITEMS.slice(0, 4);

  return (
    <section
      id="case-studies"
      className="border-b border-slate-200/60 bg-white py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            title="Proven results across complex operations"
          />
          <Link 
            href="/work" 
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-[#0E5CEE] transition-colors"
          >
            <span>View all case studies</span>
            <ArrowRight className="w-4 h-4 text-[#0E5CEE]" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((w, i) => (
            <Card
              key={w.slug}
              href={`/work/${w.slug}`}
              title={`${w.name} · ${w.client}`}
              description={w.summary}
              delay={(i % 4) * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================== TESTIMONIALS */

const TESTIMONIALS = [
  {
    quote:
      "ADRIG completely redesigned how our block management works. What used to be manual radio calls and paper logs is now a live dashboard — our control rooms operate with half the delays.",
    name: "Rajesh Murugan",
    designation: "Operations Manager, Southern Railways",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "The AI Rule Clarifier gave our field officers consistent, auditable answers in under five seconds — something that used to take a phone call to head office and twenty minutes of waiting.",
    name: "Anitha Selvam",
    designation: "Field Operations Lead, Southern Railways",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "From the first architecture review to go-live, ADRIG kept every commitment. The analytics platform they built didn't just report data — it changed how we read our business.",
    name: "Karthik Balaji",
    designation: "CTO, Dagala Analytics",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "We've worked with several AI vendors. ADRIG is the first that actually understood our constraints and built something our team could own and operate independently.",
    name: "Priya Nair",
    designation: "VP of Technology, Miporis",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "The platform scales with us. Six months after launch we doubled the transaction volume and didn't have to touch the infrastructure. That's what engineering trust looks like.",
    name: "Samuel Okonkwo",
    designation: "Engineering Lead, BillsApp Enterprise",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="border-b border-slate-200/60 bg-[#FAFCFF] py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="shell relative z-10">
        <div className="mb-8">
          <SectionHeading
            title="Trusted by engineering and operations leaders"
            align="center"
          />
        </div>
        <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay />
      </div>
    </section>
  );
}

/* ============================================================ INDUSTRIES */
import { Heading, Paragraph, Price, PricingWrapper } from "@/components/ui/pricing";

const FEATURED_INDUSTRIES = [
  {
    sector: "SECTOR 01 // INFRASTRUCTURE",
    title: "Railways & Mobility",
    description:
      "Autonomous block management, real-time telemetry, and predictive maintenance for high-traffic transport corridors.",
    href: "/industries",
  },
  {
    sector: "SECTOR 02 // LIFE SCIENCES",
    title: "Clinical AI & Healthcare",
    description:
      "Air-gapped clinical knowledge retrieval, HIPAA-compliant patient triage, and automated multi-modal record synthesis.",
    href: "/industries",
  },
  {
    sector: "SECTOR 03 // FINTECH",
    title: "Financial Ledgers & Banking",
    description:
      "High-throughput transaction validation, autonomous compliance audits, and sovereign event ledgers.",
    href: "/industries",
  },
  {
    sector: "SECTOR 04 // SUPPLY CHAIN",
    title: "Smart Logistics & Retail",
    description:
      "Sub-second ERP event routing, machine anomaly detection, and automated multimodal order dispatching.",
    href: "/industries",
  },
];

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative border-b border-slate-200/60 overflow-hidden bg-[#FAFCFF]"
    >
      <BackgroundLines className="w-full py-20 sm:py-28 bg-[#FAFCFF]">
        <div className="shell relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeading
              title="Domain expertise across mission-critical sectors"
            />
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-[#0E5CEE] transition-colors"
            >
              <span>Explore all industries</span>
              <ArrowRight className="w-4 h-4 text-[#0E5CEE]" />
            </Link>
          </div>

          {/* PricingWrapper Crosses Grid with Motion */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_INDUSTRIES.map((ind) => (
              <PricingWrapper
                key={ind.title}
                type="crosses"
                contactHref={ind.href}
                className="bg-white/95 backdrop-blur-xl"
              >
                <Heading>{ind.sector}</Heading>
                <Price>{ind.title}</Price>
                <Paragraph>{ind.description}</Paragraph>
              </PricingWrapper>
            ))}
          </div>

          {/* Secondary sector pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 pt-6 border-t border-slate-200/70">
            {INDUSTRIES.map((ind) => (
              <span
                key={ind}
                className="rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-[13px] font-normal text-slate-700 shadow-xs hover:border-blue-300 hover:text-[#0E5CEE] transition-all"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </BackgroundLines>
    </section>
  );
}

/* ========================================================== TECHNOLOGIES */
import { EnterpriseToolsMarquee } from "@/components/ui/marquee-logos";

export function TechnologiesSection() {
  return (
    <section
      id="technologies"
      className="border-b border-slate-200/60 bg-[#FAFCFF] py-20 sm:py-28 relative overflow-hidden"
    >
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="shell relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeading
            title="Modern enterprise tools & frameworks"
          />
          <Link
            href="/technologies"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-[#0E5CEE] transition-colors"
          >
            <span>View all technologies</span>
            <ArrowRight className="w-4 h-4 text-[#0E5CEE]" />
          </Link>
        </div>

        {/* Continuous Animated Marquee with Enterprise Logos */}
        <EnterpriseToolsMarquee />

        {/* Tech Badges Cloud */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {TECHNOLOGIES.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-sm px-4 py-2 text-[13px] font-normal text-slate-700 shadow-xs hover:border-blue-300 hover:text-[#0E5CEE] transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
