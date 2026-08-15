import Reveal from "./Reveal";

export default function ProcessRail({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step, i) => (
        <Reveal key={step} delay={i * 0.05} className="flex-1 min-w-[140px]">
          <div className="rounded-2xl border border-adrig-hairline bg-white p-5">
            <p className="text-[11px] font-bold tracking-[.18em] text-adrig-blue">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[14.5px] font-semibold text-adrig-ink">{step}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
