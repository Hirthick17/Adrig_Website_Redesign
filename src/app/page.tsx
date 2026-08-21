import Hero from "@/components/hero/Hero";
import CTASection from "@/components/ui/CTASection";
import { HomeFlowEnvironment } from "@/components/home/HomeFlowEnvironment";
import { FlowSection } from "@/components/home/FlowSection";
import StoryBridge from "@/components/home/StoryBridge";
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

        <StoryBridge story="why-to-services" />

        <FlowSection>
          <ServicesSection />
        </FlowSection>

        <StoryBridge story="services-to-products" />

        <FlowSection>
          <ProductsSection />
        </FlowSection>

        <StoryBridge story="products-to-process" />

        <FlowSection>
          <HowWeWorkSection />
        </FlowSection>

        <StoryBridge story="process-to-cases" />

        <FlowSection>
          <CaseStudiesSection />
        </FlowSection>

        <StoryBridge story="cases-to-testimonials" />

        <FlowSection>
          <TestimonialsSection />
        </FlowSection>

        <StoryBridge story="testimonials-to-industries" />

        <FlowSection>
          <IndustriesSection />
        </FlowSection>

        <StoryBridge story="industries-to-technologies" />

        <FlowSection>
          <TechnologiesSection />
        </FlowSection>

        <StoryBridge story="technologies-to-cta" />

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
