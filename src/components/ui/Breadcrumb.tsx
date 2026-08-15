import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="shell flex items-center gap-2 pt-6 text-[13px] text-adrig-faint">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>/</span>}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-adrig-blue">
              {item.label}
            </Link>
          ) : (
            <span className="text-adrig-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
