import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/site-data";
import ServiceTemplate from "@/components/services/ServiceTemplate";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  return { title: service?.name ?? "Service" };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}
