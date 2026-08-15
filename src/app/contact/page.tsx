import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Contact" };

const OPTIONS = [
  { title: "Project Enquiry", body: "Tell us your idea.", href: "mailto:hello@adrig.co.in?subject=Project%20Enquiry" },
  { title: "Schedule a Call", body: "Book a meeting.", href: "tel:+918939853747", id: "schedule" },
  { title: "General Enquiry", body: "Just have a question?", href: "mailto:hello@adrig.co.in" },
  { title: "Partner With Us", body: "Explore a partnership.", href: "mailto:hello@adrig.co.in?subject=Partnership" },
  { title: "Support", body: "Need help with a product?", href: "mailto:hello@adrig.co.in?subject=Support" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        headline="Let's build the"
        headlineAccent="future together."
        description="Have a project in mind? Let's turn it into reality."
      />

      <section className="border-b border-adrig-hairline bg-white py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="grid gap-4 sm:grid-cols-2">
            {OPTIONS.map((opt, i) => (
              <Reveal key={opt.title} delay={i * 0.06}>
                <a
                  id={opt.id}
                  href={opt.href}
                  className="block scroll-mt-24 rounded-2xl border border-adrig-hairline bg-white p-6 transition hover:border-adrig-blue/40 hover:shadow-[0_20px_44px_-28px_rgba(14,92,238,0.35)]"
                >
                  <p className="text-[16px] font-semibold text-adrig-ink">{opt.title}</p>
                  <p className="mt-2 text-[13.5px] text-adrig-muted">{opt.body}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <SectionHeading eyebrow="Contact Info" title="Reach us directly" />
            <div className="mt-6 grid gap-4">
              <a href="tel:+918939853747" className="text-[16px] font-semibold text-adrig-ink transition hover:text-adrig-blue">
                +91 89398 53747
              </a>
              <a href="mailto:hello@adrig.co.in" className="text-[16px] font-semibold text-adrig-ink transition hover:text-adrig-blue">
                hello@adrig.co.in
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
