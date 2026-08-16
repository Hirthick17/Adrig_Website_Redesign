"use client";

import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { ProblemStep } from "@/content/services";

// Aceternity placeholder — replace with service-specific relatable meme images
const PROBLEM_PLACEHOLDERS = [
  "https://assets.aceternity.com/components/hero-1.webp",
  "https://assets.aceternity.com/components/hero-2.webp",
  "https://assets.aceternity.com/components/hero-3.webp",
  "https://assets.aceternity.com/components/keyboard-2.webp",
];

function ProblemImage({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="relative w-full h-full min-h-[280px] overflow-hidden rounded-2xl flex items-center justify-center bg-slate-900">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 400px"
        className="object-cover"
      />
      {/* Relatable caption strip */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 z-10">
        <p className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}

export function ProblemStory({
  title,
  description,
  steps,
  problemImages,
}: {
  title: string;
  description: string;
  steps: ProblemStep[];
  serviceKey?: string;
  problemImages?: string[];
}) {
  const images = problemImages?.length ? problemImages : PROBLEM_PLACEHOLDERS;

  const content = steps.map((step, i) => ({
    title: step.title,
    description: step.description,
    content: (
      <ProblemImage
        src={images[i % images.length]}
        alt={step.title}
        label={`Pain point 0${i + 1} // ${step.title}`}
      />
    ),
  }));

  return (
    <section id="problem" className="bg-white py-20 sm:py-28 border-b border-slate-200/60 relative overflow-hidden">
      <div className="shell max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-tight text-slate-950 max-w-3xl">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Sticky Scroll with image panel */}
        <StickyScroll content={content} />
      </div>
    </section>
  );
}

export default ProblemStory;
