"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LayoutGrid } from "../ui/layout-grid";
import { InteractiveHoverButton } from "@/registry/magicui/interactive-hover-button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { WORK_ITEMS } from "@/lib/site-data";


const CASE_STUDY_ASSETS = [
  {
    keywords: ["rail-rules", "clarifier", "classifier", "rule", "rail rules"],
    image: "/images/work/ai-rule-classifier.png",
    label: "AI Rule Clarifier",
  },
  {
    keywords: ["trackon", "track-on", "track on", "tracking"],
    image: "/images/work/track-on.png",
    label: "TrackOn Operations",
  },
  {
    keywords: ["southern-railways", "rbms", "rail", "railway", "train", "metro", "transport"],
    image: "/case-studies/ChatGPT Image Aug 17, 2026, 10_36_32 AM (1).png",
    label: "Railway Intelligence",
  },
  {
    keywords: ["health", "hospital", "medical", "clinic", "patient"],
    image: "/case-studies/ChatGPT Image Aug 17, 2026, 10_36_34 AM (2).png",
    label: "Healthcare Intelligence",
  },
  {
    keywords: ["finance", "bank", "banking", "fintech", "financial"],
    image: "/case-studies/ChatGPT Image Aug 17, 2026, 10_36_34 AM (3).png",
    label: "Financial Intelligence",
  },
  {
    keywords: [
      "logistics",
      "warehouse",
      "supply",
      "delivery",
      "shipping",
      "operations",
    ],
    image: "/case-studies/ChatGPT Image Aug 17, 2026, 10_36_34 AM (4).png",
    label: "Logistics Intelligence",
  },
];

function resolveVisual(
  work: {
    slug?: string;
    name?: string;
    client?: string;
    summary?: string;
  },
  index: number,
) {
  const text = [
    work.slug,
    work.name,
    work.client,
    work.summary,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    CASE_STUDY_ASSETS.find((item) =>
      item.keywords.some((keyword) =>
        text.includes(keyword),
      ),
    ) ??
    CASE_STUDY_ASSETS[
      index % CASE_STUDY_ASSETS.length
    ]
  );
}

function CaseStudyContent({
  title,
  client,
  summary,
  slug,
}: {
  title: string;
  client?: string;
  summary?: string;
  slug: string;
}) {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      {/* TOP COPY */}
      <div className="max-w-xl">
        {client && (
          <p className="font-inter text-[13px] font-semibold tracking-wide text-slate-500 uppercase">
            {client}
          </p>
        )}

        <h3 className="mt-2 max-w-[560px] font-poppins text-[26px] font-medium leading-[1.06] tracking-[-0.035em] text-[#0E5CEE] sm:text-[32px] lg:text-[38px]">
          {title}
        </h3>
      </div>

      {/* BOTTOM COPY */}
      <div className="flex items-end justify-between gap-5">
        {summary && (
          <div className="max-w-[460px]">
            <TextGenerateEffect
              words={summary}
              duration={0.4}
              staggerDelay={0.04}
              className="font-inter text-[14px] font-normal leading-[1.55] text-slate-600 sm:text-[15px]"
            />
          </div>
        )}

        <InteractiveHoverButton
          onClick={() => window.location.href = `/work/${slug}`}
          className="h-11 w-11 shrink-0"
          title={`View ${title}`}
        >
          <ArrowUpRight className="h-6 w-6" />
        </InteractiveHoverButton>
      </div>
    </div>
  );
}

export function CaseStudiesShowcase() {
  const featured = WORK_ITEMS.filter((w) => w.slug !== "miporis").slice(0, 3);

  const cards = featured.map((work, index) => {
    const visual = resolveVisual(work, index);

    const layoutClasses = [
      "md:col-span-2",
      "col-span-1",
      "col-span-1",
    ];

    return {
      id: index + 1,

      content: (
        <CaseStudyContent
          title={work.name}
          client={work.client}
          summary={work.summary}
          slug={work.slug}
        />
      ),

      className: layoutClasses[index] || "col-span-1",

      thumbnail: visual.image,
    };
  });

  return (
    <section
      id="case-studies"
      className="
        relative
        overflow-hidden
        bg-transparent
        py-12
        sm:py-16
        lg:py-20
      "
    >
      <div className="shell">

        {/* TITLE SECTION — OUTSIDE THE GRID */}
        <div
          className="
            relative
            z-20
            mb-8
            flex
            items-start
            justify-between
            px-5
            pt-5
            sm:mb-10
            sm:px-8
            sm:pt-7
            lg:px-10
          "
        >
          <div className="pointer-events-none">
            <h2
              className="
                text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.08] max-w-4xl mx-auto font-sans"
            >
              Work built around
              real operations.
            </h2>
          </div>

          <InteractiveHoverButton
            onClick={() => window.location.href = '/work'}
            className="text-[14px] mt-2"
          >
            Explore all case studies
          </InteractiveHoverButton>
        </div>

        {/* HERO-LIKE GRID */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
          "
        >
          <LayoutGrid cards={cards} />
        </div>

        <div className="mt-6 flex justify-end md:hidden">
          <Link
            href="/work"
            className="
              inline-flex
              items-center
              gap-2
              font-inter
              text-[14px]
              font-medium
              text-slate-800
            "
          >
            Explore all work
            <ArrowUpRight className="h-4 w-4 text-[#0E5CEE]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
