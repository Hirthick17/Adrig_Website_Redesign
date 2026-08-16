import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_SERVICES, getServiceBySlug } from "@/content/services";
import { ServicePage as ServicePageView } from "@/components/service-page/ServicePage";

export function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  return {
    title: service ? `${service.hero.eyebrow} — ADRIG` : "Service — ADRIG",
    description: service?.hero.description,
  };
}

export default async function ServiceRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageView service={service} />;
}
