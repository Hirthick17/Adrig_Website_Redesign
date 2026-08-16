"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import type { ServiceKey } from "@/content/services";

type HeroContent = {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
  primaryCta: string;
};

// Aceternity placeholder images — replace with real meme/relatable images per service
const PLACEHOLDER_IMAGES = [
  "https://assets.aceternity.com/components/hero-section-with-mesh-gradient.webp",
  "https://assets.aceternity.com/components/3d-globe.webp",
  "https://assets.aceternity.com/components/keyboard-2.webp",
  "https://assets.aceternity.com/components/hero-1.webp",
  "https://assets.aceternity.com/components/hero-2.webp",
  "https://assets.aceternity.com/components/hero-3.webp",
];

export function ServiceHero({
  serviceKey,
  content,
  heroImages,
}: {
  serviceKey: ServiceKey;
  content: HeroContent;
  heroImages?: string[];
}) {
  const images = heroImages?.length ? heroImages : PLACEHOLDER_IMAGES;

  return (
    <section className="relative min-h-svh overflow-hidden bg-[#FAFCFF] border-b border-slate-200/60 pt-16 sm:pt-20 pb-20">
      <BlueprintBackground />

      {/* Ambient Blue Radial Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-300/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[350px] bg-blue-200/20 blur-[110px] rounded-full pointer-events-none" />

      <div className="mx-auto grid min-h-[calc(100svh-120px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:px-12 pt-16 lg:grid-cols-12 relative z-10">
        {/* Left Editorial Narrative */}
        <div className="relative z-20 lg:col-span-5 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-normal leading-[1.04] tracking-tight text-slate-950">
            {content.title}{" "}
            <span className="text-[#0E5CEE] font-medium">{content.emphasis}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {content.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-lg transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0E5CEE] focus-visible:outline-none"
            >
              <span>{content.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#problem"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-6 text-sm font-semibold text-slate-800 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 hover:bg-white"
            >
              <span>See the pain point</span>
            </a>
          </div>

          {/* Quick Specs */}
          <div className="mt-10 pt-6 border-t border-slate-200/70 grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-widest">DEPLOYMENT</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">Air-Gapped / Cloud</p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-widest">SECURITY</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">Private VPC</p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-widest">IP RIGHTS</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">100% Client Owned</p>
            </div>
          </div>
        </div>

        {/* Right — Parallax Hero Images */}
        <div className="relative min-h-[500px] lg:col-span-7 lg:min-h-[600px]">
          <ParallaxHeroImages images={images} variant="edge-focus" />
        </div>
      </div>
    </section>
  );
}

function BlueprintBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.04)_1px,transparent_1px)] opacity-70 [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_96%)]"
    />
  );
}

export default ServiceHero;
