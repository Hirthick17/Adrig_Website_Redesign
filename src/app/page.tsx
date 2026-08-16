import Hero from "@/components/hero/Hero";
import CTASection from "@/components/ui/CTASection";
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
      <WhyAdrigSection />
      <ServicesSection />
      <ProductsSection />
      <HowWeWorkSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <IndustriesSection />
      <TechnologiesSection />
      <CTASection
        title="Let's build something together."
        description="Have a project in mind? Let's turn it into reality."
      />
    </>
  );
}
