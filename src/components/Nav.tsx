"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/site-data";
import {
  Dropdown,
  Trigger,
  TriggerWrapper,
  Tabs,
  Tab,
} from "@/components/ui/dropdown-menu";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-adrig-hairline bg-adrig-bg/85 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center gap-8">
        <Link href="/" className="flex flex-none items-center gap-2.5 font-semibold tracking-tight text-adrig-ink">
          <span className="grid size-8 place-items-center rounded-[9px] bg-adrig-navy text-sm font-bold text-white">
            A
          </span>
          ADRIG
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => {
            const hasChildren = Boolean(item.children?.length);

            if (hasChildren) {
              return (
                <div key={item.label} className="relative">
                  <Dropdown>
                    <TriggerWrapper>
                      <Trigger>
                        <span>{item.label}</span>
                      </Trigger>
                    </TriggerWrapper>
                    <Tabs className="w-[320px]">
                      <Tab>
                        <div className="grid gap-1">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-adrig-ink/80 transition hover:bg-adrig-blue-soft hover:text-adrig-ink"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </Tab>
                    </Tabs>
                  </Dropdown>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14.5px] font-medium text-adrig-ink/80 transition hover:text-adrig-ink"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="ml-auto hidden flex-none items-center gap-2 rounded-full bg-adrig-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-adrig-blue md:inline-flex"
        >
          Let&apos;s Talk
        </Link>

        <button
          type="button"
          className="ml-auto grid size-9 place-items-center rounded-lg border border-adrig-hairline md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-adrig-hairline bg-white md:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-adrig-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-2 rounded-full bg-adrig-navy px-4 py-2.5 text-center text-sm font-semibold text-white">
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
