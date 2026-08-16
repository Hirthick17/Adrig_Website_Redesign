"use client";

import React from "react";
import type { ServiceConfig } from "@/content/services";
import { ServiceHero } from "./sections/ServiceHero";
import { ProblemStory } from "./sections/ProblemStory";
import { CapabilityStage } from "./sections/CapabilityStage";
import { ArchitectureReveal } from "./sections/ArchitectureReveal";
import { AdrigProcessSection } from "@/components/sections/AdrigProcessSection";
import { UseCaseGrid } from "./sections/UseCaseGrid";
import { ProofSection } from "./sections/ProofSection";
import { ServiceCTA } from "./sections/ServiceCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";

export function ServicePage({
  service,
}: {
  service: ServiceConfig;
}) {
  return (
    <main className="overflow-clip bg-[#FAFCFF] text-slate-950 font-sans selection:bg-[#0E5CEE] selection:text-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.hero.eyebrow },
        ]}
      />

      {/* 1. Hero with Parallax Edge Focus Images */}
      <ServiceHero
        serviceKey={service.key}
        content={service.hero}
        heroImages={service.heroImages}
      />

      {/* 2. Operational Problem Story with Sticky Scroll Meme/Image Showcase */}
      <ProblemStory
        title={service.problem.title}
        description={service.problem.description}
        steps={service.problem.steps}
        serviceKey={service.key}
        problemImages={service.problemImages}
      />

      {/* 3. Core Capabilities with 4/8 Asymmetric Stage */}
      <CapabilityStage
        capabilities={service.capabilities}
        serviceKey={service.key}
      />

      {/* 4. System Architecture with Tracing Beam */}
      <ArchitectureReveal
        architecture={service.architecture}
        serviceKey={service.key}
      />

      {/* 5. Shared ADRIG Delivery Process (AdrigProcessSection) */}
      <AdrigProcessSection />

      {/* 6. Enterprise Use Cases Spotlight Grid */}
      <UseCaseGrid items={service.useCases} serviceKey={service.key} />

      {/* 7. Proof & Case Study Evidence */}
      {service.proof ? <ProofSection proof={service.proof} /> : null}

      {/* 8. Final Conversion CTA */}
      <ServiceCTA serviceName={service.hero.eyebrow} />
    </main>
  );
}

export default ServicePage;
