import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { SERVICES, PRODUCTS, WORK_ITEMS, INDUSTRIES, TECHNOLOGIES, WHY_ADRIG } from "@/lib/site-data";

export function WhyAdrigSection() {
  return (
    <section id="why-adrig" className="border-b border-adrig-hairline bg-white py-20 sm:py-28">
      <div className="shell">
        <SectionHeading eyebrow="Why ADRIG" title="Our strengths & differentiators" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_ADRIG.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="rounded-2xl border border-adrig-hairline p-5">
              <p className="text-[15px] font-semibold text-adrig-ink">{item.title}</p>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-adrig-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHAT_WE_DO = [
  { title: "AI Development", body: "Custom AI solutions built around your data." },
  { title: "Automation", body: "Intelligent automation for repetitive operational work." },
  { title: "Data & Analytics", body: "Insights and intelligence from data you already have." },
  { title: "Consulting", body: "Strategy and guidance to sequence what's worth building." },
];

export function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="border-b border-adrig-hairline bg-adrig-bg py-20 sm:py-28">
      <div className="shell">
        <SectionHeading eyebrow="What We Do" title="Overview of ADRIG AI capabilities" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT_WE_DO.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="rounded-2xl border border-adrig-hairline bg-white p-6">
              <p className="text-[16px] font-semibold text-adrig-ink">{item.title}</p>
              <p className="mt-2 text-[14px] leading-[1.55] text-adrig-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="our-services" className="border-b border-adrig-hairline bg-white py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Our Services" title="Eight capabilities. One team." />
          <Link href="/services" className="text-[14px] font-semibold text-adrig-blue">
            View all services →
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Card
              key={s.slug}
              href={`/services/${s.slug}`}
              index={s.number}
              title={s.name}
              description={s.overview}
              delay={(i % 4) * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductsSection() {
  return (
    <section id="our-products" className="border-b border-adrig-hairline bg-adrig-bg py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Our Products" title="Platforms showcasing what we build" />
          <Link href="/products" className="text-[14px] font-semibold text-adrig-blue">
            View all products →
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Card
              key={p.slug}
              href={`/products#${p.slug}`}
              eyebrow={p.tagline}
              title={p.name}
              description={p.description}
              delay={(i % 3) * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudiesSection() {
  const featured = WORK_ITEMS.slice(0, 4);
  return (
    <section id="case-studies" className="border-b border-adrig-hairline bg-white py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Case Studies" title="Trusted by leading organizations" />
          <Link href="/work" className="text-[14px] font-semibold text-adrig-blue">
            View all case studies →
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((w, i) => (
            <Card
              key={w.slug}
              href={`/work/${w.slug}`}
              eyebrow={w.category}
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

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-b border-adrig-hairline bg-adrig-bg py-20 sm:py-28">
      <div className="shell">
        <SectionHeading eyebrow="Testimonials" title="What our clients say" align="center" />
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl rounded-2xl border border-dashed border-adrig-hairline bg-white p-8 text-center">
          <p className="text-[14.5px] text-adrig-faint">Client testimonials coming soon.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section id="industries" className="border-b border-adrig-hairline bg-white py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Industries We Serve" title="Domain expertise across multiple industries" />
          <Link href="/industries" className="text-[14px] font-semibold text-adrig-blue">
            Explore all industries →
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {INDUSTRIES.map((ind) => (
            <span key={ind} className="rounded-full border border-adrig-hairline bg-adrig-bg px-5 py-2.5 text-[14px] font-medium text-adrig-ink">
              {ind}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologiesSection() {
  return (
    <section id="technologies" className="border-b border-adrig-hairline bg-adrig-bg py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Technologies We Use" title="Modern tools & frameworks" />
          <Link href="/technologies" className="text-[14px] font-semibold text-adrig-blue">
            View all technologies →
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {TECHNOLOGIES.map((tech) => (
            <span key={tech} className="rounded-full border border-adrig-hairline bg-white px-5 py-2.5 text-[14px] font-medium text-adrig-ink">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
