"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { NAV_LINKS } from "@/lib/site-data";
import Link from "next/link";

export default function CornerNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={NAV_LINKS} />
        <div className="flex items-center gap-3">
          <NavbarButton variant="primary" href="/contact">
            Let&apos;s Talk
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {NAV_LINKS.map((item, idx) => (
            <div key={`mobile-nav-${idx}`} className="flex flex-col">
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-[15px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 flex flex-col border-l border-white/10 pl-2">
                  {item.children.map((child, cIdx) => (
                    <Link
                      key={`mobile-sub-${cIdx}`}
                      href={child.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-lg px-2.5 py-1.5 text-[13.5px] font-medium text-white/70 transition hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 pt-2 border-t border-white/10">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              href="/contact"
              className="w-full text-center"
            >
              Let&apos;s Talk
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
