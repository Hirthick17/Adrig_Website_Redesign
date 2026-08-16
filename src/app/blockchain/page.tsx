import type { Metadata } from "next";
import { consultationService } from "@/content/services";
import { ServicePage as ServicePageView } from "@/components/service-page/ServicePage";

export const metadata: Metadata = {
  title: "Blockchain & Smart Contracts — ADRIG",
  description: "Enterprise permissioned ledger systems and automated smart contracts.",
};

export default function BlockchainPage() {
  return <ServicePageView service={consultationService} />;
}
