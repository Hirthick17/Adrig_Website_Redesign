import type { Service } from "@/lib/site-data";
import { WORK_ITEMS, INDUSTRIES, WHY_ADRIG } from "@/lib/site-data";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureList from "@/components/ui/FeatureList";
import ProcessRail from "@/components/ui/ProcessRail";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";

/** The 11-section template from sitemap/Service.png, fed by one Service record. */
export default function ServiceTemplate({ service, parentLabel = "Services", parentHref = "/services" }: {
  service: Service;
  parentLabel?: string;
  parentHref?: string;
}) {
  const relatedWork = WORK_ITEMS.slice(0, 3);

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: parentLabel, href: parentHref }, { label: service.name }]} />

      <PageHero
        eyebrow={service.eyebrow}
        headline={service.headline}
        headlineAccent={service.headlineAccent}
        description={service.overview}
        primaryCta={{ label: "Let's Build Together", href: "/contact" }}
        secondaryCta={{ label: "Explore Solutions", href: "#solutions" }}
      />

      {/* overview / key benefits */}
      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <SectionHeading eyebrow="Service Overview" title={`What is ${service.name}?`} description={service.overview} />
          <div className="grid gap-3 sm:grid-cols-2">
            {service.keyBenefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.06} className="rounded-xl border border-adrig-hairline p-4">
                <p className="text-[14px] font-medium text-adrig-ink">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* key features */}
      <section className="border-b border-adrig-hairline bg-adrig-bg py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Key Features" title="Core capabilities & strengths" />
          <div className="mt-10">
            <FeatureList items={service.features} />
          </div>
        </div>
      </section>

      {/* approach / process */}
      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Our Approach" title="How we deliver results" />
          <div className="mt-10">
            <ProcessRail steps={service.process} />
          </div>
        </div>
      </section>

      {/* solutions / sub-services */}
      <section id="solutions" className="border-b border-adrig-hairline bg-adrig-bg py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Solutions" title="What's included under this service" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {service.solutions.map((s, i) => (
              <Reveal key={s} delay={(i % 4) * 0.06} className="rounded-xl border border-adrig-hairline bg-white p-4">
                <p className="text-[14px] font-medium text-adrig-ink">{s}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* technologies + industries */}
      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Technologies We Use" title="Powering this service" />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {service.technologies.map((t) => (
                <span key={t} className="rounded-full border border-adrig-hairline bg-adrig-bg px-4 py-2 text-[13px] font-medium text-adrig-ink">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Industries We Serve" title="Domain expertise" />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {INDUSTRIES.map((ind) => (
                <span key={ind} className="rounded-full border border-adrig-hairline bg-adrig-bg px-4 py-2 text-[13px] font-medium text-adrig-ink">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* case studies teaser */}
      <section className="border-b border-adrig-hairline bg-adrig-bg py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Case Studies" title="Real-world impact" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {relatedWork.map((w, i) => (
              <Card key={w.slug} href={`/work/${w.slug}`} eyebrow={w.category} title={`${w.name} · ${w.client}`} description={w.summary} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* why adrig */}
      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Why ADRIG" title="What sets us apart" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_ADRIG.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="rounded-2xl border border-adrig-hairline p-5">
                <p className="text-[15px] font-semibold text-adrig-ink">{item.title}</p>
                <p className="mt-2 text-[13.5px] leading-[1.5] text-adrig-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Ready to build with ${service.name}?`}
        description="Have a project in mind? Let's turn it into reality."
      />
    </>
  );
}
