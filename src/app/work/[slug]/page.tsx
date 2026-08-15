import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORK_ITEMS } from "@/lib/site-data";
import CaseStudyTemplate from "@/components/work/CaseStudyTemplate";

export function generateStaticParams() {
  return WORK_ITEMS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = WORK_ITEMS.find((w) => w.slug === slug);
  return { title: item ? `${item.name} · ${item.client}` : "Work" };
}

export default async function WorkCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = WORK_ITEMS.find((w) => w.slug === slug);
  if (!item) notFound();
  return <CaseStudyTemplate item={item} />;
}
