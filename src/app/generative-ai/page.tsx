import type { Metadata } from "next";
import { GENERATIVE_AI } from "@/lib/site-data";
import ServiceTemplate from "@/components/services/ServiceTemplate";

export const metadata: Metadata = { title: "Generative AI" };

export default function GenerativeAIPage() {
  return <ServiceTemplate service={GENERATIVE_AI} parentLabel="Generative AI" parentHref="/generative-ai" />;
}
