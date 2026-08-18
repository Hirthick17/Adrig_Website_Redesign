import Hero from "@/components/hero/Hero";
import CTASection from "@/components/ui/CTASection";
import { HomeFlowEnvironment } from "@/components/home/HomeFlowEnvironment";
import { FlowSection } from "@/components/home/FlowSection";
import {
  WhyAdrigSection,
  ServicesSection,
  ProductsSection,
  HowWeWorkSection,
  CaseStudiesSection,
  TestimonialsSection,
  IndustriesSection,
  TechnologiesSection,
} from "@/components/home/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />

      <HomeFlowEnvironment>
        <FlowSection>
          <WhyAdrigSection />
        </FlowSection>

        <FlowSection>
          <ServicesSection />
        </FlowSection>

        <FlowSection>
          <ProductsSection />
        </FlowSection>

        <FlowSection>
          <HowWeWorkSection />
        </FlowSection>

        <FlowSection>
          <CaseStudiesSection />
        </FlowSection>

        <FlowSection>
          <TestimonialsSection />
        </FlowSection>

        <FlowSection>
          <IndustriesSection />
        </FlowSection>

        <FlowSection>
          <TechnologiesSection />
        </FlowSection>

        <FlowSection>
          <CTASection
            title="Let's build something together."
            description="Have a project in mind? Let's turn it into reality."
          />
        </FlowSection>
      </HomeFlowEnvironment>
    </>
  );
}
