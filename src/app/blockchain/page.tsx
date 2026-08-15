import type { Metadata } from "next";
import { BLOCKCHAIN } from "@/lib/site-data";
import ServiceTemplate from "@/components/services/ServiceTemplate";

export const metadata: Metadata = { title: "Blockchain" };

export default function BlockchainPage() {
  return <ServiceTemplate service={BLOCKCHAIN} parentLabel="Blockchain" parentHref="/blockchain" />;
}
