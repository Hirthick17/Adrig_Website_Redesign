"use client";

import React from "react";
import type { ServiceConfig } from "@/content/services";
import { ServiceHero } from "./sections/ServiceHero";
import { ProblemStory } from "./sections/ProblemStory";
import { CapabilityStage } from "./sections/CapabilityStage";
import { ArchitectureReveal } from "./sections/ArchitectureReveal";
import { UseCaseGrid } from "./sections/UseCaseGrid";
import { ProofSection } from "./sections/ProofSection";
import { ServiceCTA } from "./sections/ServiceCTA";

export function ServicePage({ service }: { service: ServiceConfig }) {
  const serviceDisplayName =
    service.hero.eyebrow || service.hero.title || "this capability";

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-950">
      {/* 01. Hero with calm, mouse-depth parallax and editorial typography */}
      <ServiceHero
        serviceKey={service.key}
        content={service.hero}
        heroImages={service.heroImages}
      />

      {/* 02. Problem Breakdown & Context */}
      <ProblemStory
        title={service.problem.title}
        description={service.problem.description}
        steps={service.problem.steps}
        serviceKey={service.key}
        problemImages={service.problemImages}
      />

      {/* 03. Interactive Capabilities Stage */}
      <CapabilityStage
        capabilities={service.capabilities}
        serviceKey={service.key}
      />

      {/* 04. Technical Architecture Pipeline */}
      <ArchitectureReveal
        architecture={service.architecture}
        serviceKey={service.key}
      />

      {/* 05. Proven Use Cases */}
      <UseCaseGrid
        items={service.useCases}
        serviceKey={service.key}
      />

      {/* 06. Verified Outcome Proof (if available) */}
      {service.proof && <ProofSection proof={service.proof} />}

      {/* 07. Enterprise Systems CTA */}
      <ServiceCTA serviceName={serviceDisplayName} />
    </div>
  );
}

export default ServicePage;