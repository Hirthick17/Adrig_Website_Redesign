import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/site-data";

const COLUMNS: { title: string; items: { label: string; href: string }[] }[] = [
  { title: "Company", items: FOOTER_LINKS.company },
  { title: "Services", items: FOOTER_LINKS.services },
  { title: "Products", items: FOOTER_LINKS.products },
  { title: "Case Studies", items: FOOTER_LINKS.caseStudies },
  { title: "Resources", items: FOOTER_LINKS.resources },
  { title: "Contact Us", items: FOOTER_LINKS.contact },
];

export default function Footer() {
  return (
    <footer className="border-t border-adrig-hairline bg-white">
      <div className="shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-6">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-[13px] font-semibold text-adrig-ink">{col.title}</p>
            <ul className="grid gap-2.5">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13.5px] text-adrig-muted transition hover:text-adrig-blue">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-adrig-hairline">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 text-[12.5px] text-adrig-faint sm:flex-row">
          <p>© {new Date().getFullYear()} ADRIG AI Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="transition hover:text-adrig-blue">LinkedIn</a>
            <a href="#" aria-label="Instagram" className="transition hover:text-adrig-blue">Instagram</a>
            <a href="#" aria-label="X" className="transition hover:text-adrig-blue">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
