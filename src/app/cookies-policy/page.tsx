import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Cookies Policy" };

export default function CookiesPolicyPage() {
  return <LegalPage eyebrow="Legal" headline="Cookies Policy" />;
}
