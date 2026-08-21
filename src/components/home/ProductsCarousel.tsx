"use client";

import React from "react";
import Link from "next/link";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { InteractiveHoverButton } from "@/registry/magicui/interactive-hover-button";
import { PRODUCTS } from "@/lib/site-data";

/* ---- Per-product expanded content ---- */

const PRODUCT_DETAILS: Record<
  string,
  { features: string[]; tech: string[]; image: string }
> = {
  rbms: {
    features: [
      "Real-time block operations monitoring across railway zones",
      "Automated coordination between control rooms and field staff",
      "Digital reporting that replaces manual paper-based workflows",
      "Live tracking dashboards with incident alerts",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80",
  },
  billsapp: {
    features: [
      "Unified billing and payment processing for businesses of any scale",
      "Automated invoice generation and reconciliation",
      "Multi-channel payment acceptance with live reporting",
      "Compliance-ready audit trails and exportable records",
    ],
    tech: ["React", "Node.js", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
  },
  aladdyn: {
    features: [
      "Visual workflow builder for AI-driven automation pipelines",
      "Pre-built connectors for common enterprise systems",
      "Rule engine with human-in-the-loop review steps",
      "Usage analytics and execution history at every stage",
    ],
    tech: ["Python", "LangChain", "React", "AWS"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
  },
  "track-on": {
    features: [
      "Live asset and operations tracking with sub-minute refresh",
      "Configurable alert thresholds and escalation rules",
      "Integrated map view with historical replay",
      "Role-based dashboards for field, management, and executive teams",
    ],
    tech: ["React", "Node.js", "AWS"],
    image: "/images/work/track-on.png",
  },
  "dagala-analytics": {
    features: [
      "Self-serve analytics platform with drag-and-drop exploration",
      "Anomaly detection and trend forecasting on operational data",
      "Scheduled reports with automated distribution",
      "Embeddable dashboards for internal and client-facing use",
    ],
    tech: ["Python", "TensorFlow", "React", "AWS"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  "ai-rule-clarifier": {
    features: [
      "Natural-language lookup trained on complex operational rule books",
      "Consistent, auditable answers for field decision-making",
      "Context-aware responses that cite specific rule sections",
      "Deployable on-premise for secure, air-gapped environments",
    ],
    tech: ["Python", "LangChain", "OpenAI"],
    image: "/images/work/ai-rule-classifier.png",
  },
};

function ProductContent({ slug }: { slug: string }) {
  const product = PRODUCTS.find((p) => p.slug === slug);
  const details = PRODUCT_DETAILS[slug];
  if (!product || !details) return null;

  return (
    <div className="space-y-6">
      {/* Description block */}
      <div className="rounded-3xl bg-[#f7f9fc] p-8 md:p-12">
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#1b293d] md:text-lg">
          <span className="font-semibold text-[#0B1220]">
            {product.tagline}.
          </span>{" "}
          {product.description}
        </p>
      </div>

      {/* Features */}
      <div className="rounded-3xl bg-[#f7f9fc] p-8 md:p-12">
        <h4 className="mb-6 text-xs font-bold uppercase tracking-[.18em] text-[#0E5CEE]">
          Key capabilities
        </h4>
        <ul className="mx-auto max-w-3xl space-y-4">
          {details.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-[#1b293d]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0E5CEE]" />
              <span className="text-[15px] leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech + CTA */}
      <div className="rounded-3xl bg-[#f7f9fc] p-8 md:p-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#0E5CEE]">
              Built with
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[rgba(11,18,32,.12)] bg-white px-4 py-1.5 text-[13px] font-medium text-[#0B1220]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <InteractiveHoverButton
            onClick={() => window.location.href = `/products#${slug}`}
            className="text-[14px]"
          >
            Explore {product.name}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
}

/* ---- Card images matched per product ---- */
const PRODUCT_IMAGES: Record<string, string> = {
  rbms: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80",
  billsapp:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
  aladdyn:
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
  "track-on":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  "dagala-analytics":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  "ai-rule-clarifier":
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
};

/* ================================================================ Export */

export default function ProductsCarousel() {
  const cardsData = PRODUCTS.map((product) => ({
    category: product.tagline,
    title: product.name,
    src:
      PRODUCT_IMAGES[product.slug] ??
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    content: <ProductContent slug={product.slug} />,
  }));

  const cards = cardsData.map((card, index) => (
    <Card key={card.src + index} card={card} index={index} />
  ));

  return (
    <section
      id="our-products"
      className="border-b border-adrig-hairline bg-transparent py-20 sm:py-28"
    >
      {/* Section header — aligned to the shell container */}
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-2">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.08] max-w-4xl mx-auto font-sans">
              Platforms built from real operations
            </h2>
            <p className="mt-4 max-w-xl text-[15.5px] leading-[1.65] text-adrig-muted">
              Each product emerged from solving a real enterprise challenge — then
              engineered into a platform others can deploy.
            </p>
          </div>
          <InteractiveHoverButton
            variant="secondary"
            onClick={() => window.location.href = '/products'}
            className="text-[14px]"
          >
            View all products →
          </InteractiveHoverButton>
        </div>
      </div>

      {/* Carousel — full-bleed scroll, aligned to shell on left edge */}
      <Carousel items={cards} />
    </section>
  );
}
