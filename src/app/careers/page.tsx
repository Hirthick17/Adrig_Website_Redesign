import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <PageHero
      eyebrow="Careers"
      headline="Coming soon."
      description="ADRIG isn't hiring publicly yet. Check back soon, or reach out directly if you'd like to introduce yourself."
      primaryCta={{ label: "Contact Us", href: "/contact" }}
    />
  );
}
