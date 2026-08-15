import Link from "next/link";
import type { WorkItem } from "@/lib/site-data";
import { WORK_ITEMS } from "@/lib/site-data";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessRail from "@/components/ui/ProcessRail";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";

const IMPLEMENTATION_STEPS = ["Planning", "Analysis", "Development", "Testing", "Deployment", "Support"];

export default function CaseStudyTemplate({ item }: { item: WorkItem }) {
  const next = WORK_ITEMS[(WORK_ITEMS.findIndex((w) => w.slug === item.slug) + 1) % WORK_ITEMS.length];

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: item.name }]} />

      <PageHero
        eyebrow={`${item.category} · ${item.client}`}
        headline={item.name}
        description={item.summary}
        primaryCta={{ label: "Start a Project", href: "/contact" }}
      />

      {/* overview */}
      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Overview" title={`${item.name} for ${item.client}`} description={item.summary} />
        </div>
      </section>

      {/* challenge */}
      <section className="border-b border-adrig-hairline bg-adrig-bg py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="The Challenge" title="What needed to be solved" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {item.challenge.map((c, i) => (
              <Reveal key={c} delay={i * 0.06} className="rounded-xl border border-adrig-hairline bg-white p-4">
                <p className="text-[14px] font-medium text-adrig-ink">{c}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* our solution */}
      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Our Solution" title="ADRIG's approach" description={item.solution} />
        </div>
      </section>

      {/* key features */}
      <section className="border-b border-adrig-hairline bg-adrig-bg py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Key Features" title="What we built" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {item.keyFeatures.map((f, i) => (
              <Reveal key={f} delay={(i % 3) * 0.06} className="rounded-xl border border-adrig-hairline bg-white p-4">
                <p className="text-[14px] font-medium text-adrig-ink">{f}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* tech stack */}
      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Technology Stack" title="Built with" />
          <div className="mt-6 flex flex-wrap gap-2.5">
            {item.technologies.map((t) => (
              <span key={t} className="rounded-full border border-adrig-hairline bg-adrig-bg px-4 py-2 text-[13px] font-medium text-adrig-ink">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* implementation approach */}
      <section className="border-b border-adrig-hairline bg-adrig-bg py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Implementation Approach" title="How it was delivered" />
          <div className="mt-8">
            <ProcessRail steps={IMPLEMENTATION_STEPS} />
          </div>
        </div>
      </section>

      {/* next project CTA */}
      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[.18em] text-adrig-blue">Next Project</p>
            <p className="mt-2 text-[18px] font-semibold text-adrig-ink">{next.name} · {next.client}</p>
          </div>
          <Link href={`/work/${next.slug}`} className="inline-flex items-center gap-2 rounded-full border border-adrig-hairline px-5 py-3 text-[14px] font-semibold text-adrig-ink transition hover:border-adrig-navy">
            View case study →
          </Link>
        </div>
      </section>

      <CTASection title="Have a project in mind?" description="Let's build something impactful together." />
    </>
  );
}
