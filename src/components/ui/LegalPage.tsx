import PageHero from "./PageHero";

export default function LegalPage({ eyebrow, headline }: { eyebrow: string; headline: string }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} headline={headline} description="Effective date to be confirmed." />
      <section className="py-16 sm:py-24">
        <div className="shell max-w-2xl rounded-2xl border border-dashed border-adrig-hairline p-8">
          <p className="text-[14.5px] leading-[1.7] text-adrig-muted">
            This page is a placeholder pending legal review. Reach out to{" "}
            <a href="mailto:hello@adrig.co.in" className="font-semibold text-adrig-blue">
              hello@adrig.co.in
            </a>{" "}
            for the current policy.
          </p>
        </div>
      </section>
    </>
  );
}
