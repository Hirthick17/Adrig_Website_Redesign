import type { Metadata } from "next";
import { blockchainService } from "@/content/services";
import { ServicePage as ServicePageView } from "@/components/service-page/ServicePage";

export const metadata: Metadata = {
  title: "Blockchain & Smart Contracts — ADRIG",
  description: blockchainService.hero.description,
};

export default function BlockchainPage() {
  return <ServicePageView service={blockchainService} />;
}
