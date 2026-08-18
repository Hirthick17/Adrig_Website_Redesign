import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FOOTER_LINKS } from "@/lib/site-data";

/* ============================================================
   FOOTER NAVIGATION
============================================================ */

const COMPANY_LINKS = FOOTER_LINKS.company;

const EXPLORE_LINKS = [
  ...FOOTER_LINKS.services,
  ...FOOTER_LINKS.products,
  ...FOOTER_LINKS.caseStudies,
  ...FOOTER_LINKS.resources,
];

const LEGAL_LINKS = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms-conditions",
  },
  {
    label: "Cookies Policy",
    href: "/cookies-policy",
  },
];

/* ============================================================
   FOOTER
============================================================ */

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white text-slate-950">
      {/* ======================================================
          01 — CTA STRIP
      ====================================================== */}

      <div className="border-t border-slate-200">
        <div className="shell mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 border-b border-slate-200 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-14">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1463FF]">
                Start a conversation
              </p>

              <h2 className="mt-3 text-[clamp(2rem,3vw,3.7rem)] font-normal leading-[1] tracking-[-0.05em] text-slate-950">
                Have a problem worth{" "}
                <span className="text-[#1463FF]">
                  engineering?
                </span>
              </h2>
            </div>

            <Link
              href="/contact"
              className="group inline-flex min-h-[52px] w-fit items-center gap-4 rounded-full bg-[#08172D] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1463FF]"
            >
              <span>Let&apos;s Talk</span>

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================
          02 — BRAND + NAVIGATION
      ====================================================== */}

      <div className="relative">
        {/* Background grid */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.025)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
        />

        <div className="shell relative z-10 mx-auto grid max-w-7xl gap-14 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_1.85fr] lg:gap-[8vw] lg:px-12">
          {/* ==================================================
              BRAND BLOCK
          ================================================== */}

          <div className="max-w-[430px]">
            {/* Wordmark */}

            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D203A] text-[11px] font-bold text-white transition-colors duration-300 group-hover:bg-[#1463FF]">
                A
              </span>

              <span className="text-lg font-semibold tracking-[-0.035em] text-slate-950">
                ADRIG
              </span>
            </Link>

            {/* Tagline */}

            <p className="mt-7 max-w-[380px] text-xl leading-[1.45] tracking-[-0.025em] text-slate-700">
              AI systems engineered for{" "}
              <span className="text-slate-950">
                measurable operational outcomes.
              </span>
            </p>

            <p className="mt-5 max-w-[360px] text-sm leading-7 text-slate-500">
              AI, automation, software and data engineering
              designed around real operating constraints.
            </p>

            {/* Social links */}

            <div className="mt-8 flex items-center gap-2">
              <SocialButton
                href="#"
                label="LinkedIn"
              >
                <span className="text-[11px] font-bold tracking-[-0.04em]">
                  in
                </span>
              </SocialButton>

              <SocialButton
                href="#"
                label="Instagram"
              >
                <span className="text-[10px] font-semibold">
                  IG
                </span>
              </SocialButton>

              <SocialButton
                href="#"
                label="X"
              >
                <span className="text-[12px] font-semibold">
                  X
                </span>
              </SocialButton>
            </div>
          </div>

          {/* ==================================================
              NAVIGATION
          ================================================== */}

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
            <FooterColumn
              title="Company"
              items={COMPANY_LINKS}
            />

            <FooterColumn
              title="Explore"
              items={EXPLORE_LINKS}
            />

            <FooterColumn
              title="Legal"
              items={LEGAL_LINKS}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          03 — BOTTOM BAR
      ====================================================== */}

      <div className="border-t border-slate-200">
        <div className="shell mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-[12px] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {new Date().getFullYear()} ADRIG AI Technologies.
            All rights reserved.
          </p>

          <a
            href="mailto:hello@adrig.co.in"
            className="w-fit transition-colors duration-300 hover:text-[#1463FF]"
          >
            hello@adrig.co.in
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   FOOTER COLUMN
============================================================ */

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>

      <ul className="mt-6 space-y-3.5">
        {items.map((item, index) => (
          <li key={`${item.href}-${index}`}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium tracking-[-0.015em] text-slate-700 transition-colors duration-300 hover:text-[#1463FF]"
            >
              <span>{item.label}</span>

              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   SOCIAL BUTTON
============================================================ */

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1463FF] hover:bg-[#1463FF] hover:text-white"
    >
      {children}
    </a>
  );
}