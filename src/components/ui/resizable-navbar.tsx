"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ types */

export interface NavItemType {
  name?: string;
  label?: string;
  link?: string;
  href?: string;
  children?: NavItemType[];
}

/* ================================================================ Navbar */

export function Navbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 40) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none",
        scrolled ? "pt-3 sm:pt-4" : "pt-4 sm:pt-6",
        className
      )}
    >
      <div className="w-full flex justify-center pointer-events-auto">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              // pass scrolled down
              scrolled: scrolled ? 1 : 0,
            } as Record<string, unknown>);
          }
          return child;
        })}
      </div>
    </motion.header>
  );
}

/* =============================================================== NavBody */

export function NavBody({
  children,
  className,
  scrolled,
}: {
  children: React.ReactNode;
  className?: string;
  scrolled?: number;
}) {
  const isScrolled = Boolean(scrolled);

  return (
    <motion.div
      initial={false}
      animate={{
        maxWidth: isScrolled ? "920px" : "1180px",
        paddingTop: isScrolled ? "8px" : "10px",
        paddingBottom: isScrolled ? "8px" : "10px",
        paddingLeft: isScrolled ? "16px" : "20px",
        paddingRight: isScrolled ? "16px" : "20px",
        backgroundColor: isScrolled
          ? "rgba(7, 26, 51, 0.95)"
          : "rgba(11, 33, 63, 0.92)",
        boxShadow: isScrolled
          ? "0 20px 48px -12px rgba(7, 26, 51, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12)"
          : "0 14px 36px -12px rgba(7, 26, 51, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)",
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "hidden md:flex w-full items-center justify-between gap-4 rounded-full backdrop-blur-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================== NavItems */

export function NavItems({
  items = [],
  className,
}: {
  items: NavItemType[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {items.map((item, idx) => {
        const title = item.name ?? item.label ?? "";
        const targetHref = item.link ?? item.href ?? "/";
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div
            key={`${title}-${idx}`}
            className="relative"
            onMouseEnter={() => {
              setHoveredIndex(idx);
              if (hasChildren) setOpenDropdown(idx);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              if (hasChildren) setOpenDropdown(null);
            }}
          >
            <Link
              href={targetHref}
              className="relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[14px] font-medium text-white/85 transition-colors hover:text-white"
            >
              {hoveredIndex === idx && (
                <motion.span
                  layoutId="navHover"
                  className="absolute inset-0 rounded-full bg-white/12"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{title}</span>
              {hasChildren && (
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className="relative z-10 text-white/70"
                  aria-hidden
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>

            {/* Dropdown Menu */}
            {hasChildren && openDropdown === idx && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full mt-2 grid w-72 gap-1 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#071a33]/95 p-2 shadow-[0_24px_60px_-16px_rgba(7,26,51,0.6)] backdrop-blur-xl"
                >
                  {item.children?.map((child, cIdx) => {
                    const childTitle = child.name ?? child.label ?? "";
                    const childHref = child.link ?? child.href ?? "/";
                    return (
                      <Link
                        key={`${childTitle}-${cIdx}`}
                        href={childHref}
                        className="rounded-xl px-3.5 py-2 text-[13.5px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        {childTitle}
                      </Link>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ============================================================ NavbarLogo */

export function NavbarLogo({
  href = "/",
  src = "/logo.jpg",
  alt = "ADRIG",
  text = "ADRIG",
  className,
}: {
  href?: string;
  src?: string;
  alt?: string;
  text?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-none items-center gap-2.5 font-semibold tracking-tight text-white transition-opacity hover:opacity-90",
        className
      )}
    >
      <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-white p-1 shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={26}
          height={26}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      {text && (
        <span className="text-[15px] font-bold tracking-tight text-white">
          {text}
        </span>
      )}
    </Link>
  );
}

/* ========================================================== NavbarButton */

export function NavbarButton({
  children,
  variant = "primary",
  onClick,
  href,
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-4 sm:px-5 py-2 text-[13.5px] font-semibold transition-all duration-200 cursor-pointer",
    variant === "primary"
      ? "bg-white text-[#071a33] hover:bg-[#eaf2ff] shadow-[0_4px_14px_rgba(0,0,0,0.1)] active:scale-95"
      : "bg-white/10 text-white hover:bg-white/20 border border-white/15 active:scale-95",
    className
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}

/* ============================================================= MobileNav */

export function MobileNav({
  children,
  className,
  scrolled,
}: {
  children: React.ReactNode;
  className?: string;
  scrolled?: number;
}) {
  const isScrolled = Boolean(scrolled);

  return (
    <motion.div
      initial={false}
      animate={{
        boxShadow: isScrolled
          ? "0 18px 40px -12px rgba(7, 26, 51, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12)"
          : "0 12px 30px -12px rgba(7, 26, 51, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)",
      }}
      className={cn(
        "flex md:hidden w-full flex-col rounded-3xl bg-[#071a33]/95 p-3 backdrop-blur-md text-white",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ======================================================= MobileNavHeader */

export function MobileNavHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full items-center justify-between px-2", className)}>
      {children}
    </div>
  );
}

/* ======================================================= MobileNavToggle */

export function MobileNavToggle({
  isOpen,
  onClick,
  className,
}: {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "grid size-9 place-items-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white",
        className
      )}
      aria-label="Toggle navigation menu"
    >
      {isOpen ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      )}
    </button>
  );
}

/* ========================================================= MobileNavMenu */

export function MobileNavMenu({
  isOpen,
  onClose,
  children,
  className,
}: {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex flex-col gap-2 overflow-hidden px-2 pt-4 pb-2 border-t border-white/10 mt-3",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
