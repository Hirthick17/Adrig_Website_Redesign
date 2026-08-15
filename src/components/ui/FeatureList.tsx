import Reveal from "./Reveal";

export default function FeatureList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item} delay={(i % 4) * 0.05} className="flex items-start gap-3 rounded-xl border border-adrig-hairline bg-white p-4">
          <span className="mt-1 size-1.5 flex-none rounded-full bg-adrig-blue" />
          <span className="text-[14.5px] font-medium text-adrig-ink">{item}</span>
        </Reveal>
      ))}
    </div>
  );
}
