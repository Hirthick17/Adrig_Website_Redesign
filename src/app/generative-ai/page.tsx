import type { Metadata } from "next";
import { llmService } from "@/content/services";
import { ServicePage as ServicePageView } from "@/components/service-page/ServicePage";

export const metadata: Metadata = {
  title: "Generative AI & LLM Development — ADRIG",
  description: llmService.hero.description,
};

export default function GenerativeAIPage() {
  return <ServicePageView service={llmService} />;
}
