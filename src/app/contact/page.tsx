"use client";

import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const PHONE_DISPLAY = "+91 XXXX XXX XXX";
const PHONE_LINK = "+910000000000"; // Replace with ADRIG's real phone number.
const WHATSAPP_LINK = "+910000000000"; // Replace with ADRIG's real WhatsApp number.
const EMAIL = "contact@adrig.co.in";

interface ContactSectionProps {
  phone?: string;
  phoneHref?: string;
  whatsappHref?: string;
  email?: string;
  location?: string;
  mapsHref?: string;
}

export function ContactChannelsSection({
  phone = PHONE_DISPLAY,
  phoneHref = `tel:${PHONE_LINK}`,
  whatsappHref = `https://wa.me/${WHATSAPP_LINK.replace("+", "")}?text=${encodeURIComponent("Hi, I found ADRIG through your website and I'd like to discuss a project.")}`,
  email = EMAIL,
  location = "Chennai, India",
  mapsHref = "https://www.google.com/maps/search/?api=1&query=Chennai%2C%20India",
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard may be unavailable in some browser contexts.
    }
  }

  return (
    <section
      id="contact"
      className="
        relative overflow-hidden
        border-y border-[#DCE5F2]
        bg-[#F7F9FC]
        py-24 sm:py-28 lg:py-36
      "
    >
      {/* -------------------------------------------------------------
          ADRIG GRID BACKGROUND
      ------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,rgba(14,92,238,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.045)_1px,transparent_1px)]
          bg-[size:72px_72px]
          [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]
        "
      />

      <div
        className="
          relative z-10
          mx-auto
          w-full
          max-w-[1560px]
          px-6
          sm:px-8
          lg:px-12
        "
      >
        {/* =========================================================
            INTRO
        ========================================================= */}
        <div
          className="
            grid gap-10
            border-b border-[#DCE5F2]
            pb-14
            lg:grid-cols-[0.42fr_1.58fr]
            lg:items-end
            lg:pb-16
          "
        >
          <div>
            <p
              className="
                text-[13px]
                font-medium
                tracking-[0.08em]
                text-[#0E5CEE]
              "
            >
              Contact ADRIG
            </p>
          </div>

          <div>
            <h2
              className="
                max-w-[1050px]
                text-[clamp(3.1rem,5.4vw,6.4rem)]
                font-normal
                leading-[0.94]
                tracking-[-0.065em]
                text-[#0B1220]
              "
            >
              Bring us the problem
              <span className="block text-[#0E5CEE]">
                everyone keeps working around.
              </span>
            </h2>

            <p
              className="
                mt-7 max-w-[690px]
                text-[17px]
                leading-8
                tracking-[-0.015em]
                text-slate-500
                sm:text-lg
              "
            >
              Tell us what&apos;s slowing the team down. We&apos;ll help you
              figure out what should be automated, rebuilt, or simplified.
            </p>
          </div>
        </div>

        {/* =========================================================
            CONTACT GRID
        ========================================================= */}
        <div
          className="
            mt-8
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-12
          "
        >
          {/* =======================================================
              EMAIL — PRIMARY
          ======================================================= */}
          <div
            className="
              group relative
              min-h-[330px]
              overflow-hidden
              rounded-[30px]
              border border-[#C9D9F4]
              bg-[#0E5CEE]
              p-8 text-white
              transition-transform duration-300
              hover:-translate-y-1
              md:p-10
              xl:col-span-5
            "
          >
            <div className="flex items-start justify-between gap-6">
              <div
                className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  border border-white/20
                  bg-white/10
                "
              >
                <Mail className="h-5 w-5" />
              </div>

              <span className="text-[13px] text-white/60">
                Best for project enquiries
              </span>
            </div>

            <div className="absolute bottom-9 left-8 right-8 md:left-10 md:right-10">
              <p className="text-[15px] text-white/65">
                Email
              </p>

              <a
                href={`mailto:${email}`}
                className="
                  mt-3 block
                  break-words
                  text-[clamp(1.9rem,3vw,3.6rem)]
                  font-medium
                  leading-[1]
                  tracking-[-0.045em]
                "
              >
                {email}
              </a>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${email}`}
                  className="
                    inline-flex h-11
                    items-center gap-2
                    rounded-full
                    bg-white
                    px-5
                    text-sm font-medium
                    text-[#0B1220]
                    transition-transform
                    hover:-translate-y-0.5
                  "
                >
                  Start an email
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="
                    inline-flex h-11
                    items-center gap-2
                    rounded-full
                    border border-white/20
                    px-5
                    text-sm font-medium
                    text-white
                    transition-colors
                    hover:bg-white/10
                  "
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy email
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* =======================================================
              WHATSAPP
          ======================================================= */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="
              group relative
              min-h-[330px]
              overflow-hidden
              rounded-[30px]
              border border-[#C9D9F4]
              bg-white
              p-8
              transition-all duration-300
              hover:-translate-y-1
              hover:border-[#0E5CEE]
              md:p-10
              xl:col-span-3
            "
          >
            <div className="flex items-start justify-between">
              <div
                className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  bg-[#EDF4FF]
                  text-[#0E5CEE]
                "
              >
                <MessageCircle className="h-5 w-5" />
              </div>

              <ArrowUpRight
                className="
                  h-5 w-5 text-slate-300
                  transition-all duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-[#0E5CEE]
                "
              />
            </div>

            <div className="absolute bottom-9 left-8 right-8 md:left-10 md:right-10">
              <p className="text-[15px] text-slate-400">
                WhatsApp
              </p>

              <h3
                className="
                  mt-3
                  text-[clamp(2rem,2.7vw,3.1rem)]
                  leading-[1]
                  tracking-[-0.045em]
                  text-[#0B1220]
                "
              >
                Chat with us.
              </h3>

              <p className="mt-5 max-w-[260px] text-[15px] leading-6 text-slate-500">
                Good for quick questions and starting a conversation.
              </p>
            </div>
          </a>

          {/* =======================================================
              PHONE
          ======================================================= */}
          <a
            href={phoneHref}
            className="
              group relative
              min-h-[330px]
              overflow-hidden
              rounded-[30px]
              border border-[#C9D9F4]
              bg-white
              p-8
              transition-all duration-300
              hover:-translate-y-1
              hover:border-[#0E5CEE]
              md:p-10
              xl:col-span-4
            "
          >
            <div className="flex items-start justify-between">
              <div
                className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  bg-[#EDF4FF]
                  text-[#0E5CEE]
                "
              >
                <Phone className="h-5 w-5" />
              </div>

              <ArrowUpRight
                className="
                  h-5 w-5 text-slate-300
                  transition-all duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-[#0E5CEE]
                "
              />
            </div>

            <div className="absolute bottom-9 left-8 right-8 md:left-10 md:right-10">
              <p className="text-[15px] text-slate-400">
                Phone
              </p>

              <p
                className="
                  mt-3
                  text-[clamp(1.9rem,2.6vw,3rem)]
                  leading-[1]
                  tracking-[-0.045em]
                  text-[#0B1220]
                "
              >
                {phone}
              </p>

              <p className="mt-5 text-[15px] leading-6 text-slate-500">
                Prefer talking it through? Give us a call.
              </p>
            </div>
          </a>

          {/* =======================================================
              LOCATION
          ======================================================= */}
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="
              group relative
              min-h-[270px]
              overflow-hidden
              rounded-[30px]
              bg-[#12263F]
              p-8
              text-white
              transition-transform duration-300
              hover:-translate-y-1
              md:min-h-[300px]
              md:p-10
              xl:col-span-12
            "
          >
            {/* schematic map decoration */}
            <div
              aria-hidden="true"
              className="
                absolute
                -right-[120px]
                -top-[180px]
                h-[520px]
                w-[520px]
                rounded-full
                border border-white/10
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -right-[15px]
                -top-[75px]
                h-[330px]
                w-[330px]
                rounded-full
                border border-white/10
              "
            />

            <div className="relative z-10 flex h-full flex-col justify-between gap-14 md:flex-row md:items-end">
              <div>
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-full
                    border border-white/15
                    bg-white/10
                  "
                >
                  <MapPin className="h-5 w-5" />
                </div>

                <p className="mt-12 text-[15px] text-white/50">
                  Location
                </p>

                <h3
                  className="
                    mt-3
                    text-[clamp(2.7rem,4.6vw,5.5rem)]
                    leading-[0.95]
                    tracking-[-0.055em]
                  "
                >
                  {location}
                </h3>
              </div>

              <div
                className="
                  inline-flex items-center gap-3
                  text-[15px]
                  font-medium
                  text-white/80
                "
              >
                Open in Google Maps
                <ArrowUpRight
                  className="
                    h-4 w-4
                    transition-transform
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    await new Promise((resolve) => window.setTimeout(resolve, 800));
    setStatus("success");
  }

  return (
    <section
      id="contact-form"
      className="relative w-full overflow-hidden bg-[#040E1E] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 md:flex-row md:items-start md:gap-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#5B91F5]">
            02.6
          </span>
          <div>
            <h2 className="text-[clamp(2.6rem,5vw,5.2rem)] font-normal leading-[0.94] tracking-[-0.06em] text-white">
              Contact — the close
            </h2>
            <p className="mt-4 max-w-[700px] text-base leading-7 text-slate-400 sm:text-lg">
              Every path converges here, and this is the only place the site is allowed to ask directly. A split panel:
              proof on the left, the form on the right, nothing else on the screen.
            </p>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="grid grid-cols-1 overflow-hidden rounded-[30px] border border-[#17325C] bg-[#071630] shadow-[0_30px_90px_rgba(2,9,22,0.85)] lg:grid-cols-12">
          {/* Left Visual / Proof Panel */}
          <div className="relative flex min-h-[480px] flex-col justify-end overflow-hidden bg-[#0B2A6B] p-6 sm:p-10 lg:col-span-6 lg:min-h-[620px] lg:p-12">
            {/* Architectural Vector Scene */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
              <svg
                viewBox="0 0 520 640"
                preserveAspectRatio="xMidYMid slice"
                className="h-full w-full object-cover"
              >
                <defs>
                  <pattern id="cxd" width="9" height="9" patternUnits="userSpaceOnUse">
                    <circle cx="1.6" cy="1.6" r="1.6" fill="rgba(159,190,249,0.55)" />
                  </pattern>
                </defs>
                <rect width="520" height="640" fill="#0B2A6B" />
                <path
                  d="M0 300 L120 190 L230 285 L330 175 L520 330 L520 640 L0 640Z"
                  fill="url(#cxd)"
                  opacity="0.6"
                />
                <path
                  d="M0 380 L150 285 L270 360 L400 250 L520 340 L520 640 L0 640Z"
                  fill="#123A8C"
                  opacity="0.85"
                />
                <path
                  d="M0 470 L170 385 L300 455 L430 370 L520 420 L520 640 L0 640Z"
                  fill="#071C55"
                />
                <g stroke="rgba(159,190,249,0.4)" strokeWidth="1.2" fill="none">
                  <path d="M0 470 L170 385 L300 455 L430 370 L520 420" />
                  <path d="M0 380 L150 285 L270 360 L400 250 L520 340" />
                </g>
              </svg>
            </div>

            {/* Testimonial Quote Card */}
            <figure className="relative z-10 rounded-[20px] border border-white/15 bg-[#051633]/85 p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
              <blockquote className="text-base font-semibold leading-relaxed text-white sm:text-lg">
                “They didn&apos;t sell us AI. They asked what we did twice a day, and then made it stop.”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#122A54] font-mono text-xs font-semibold text-white">
                  RP
                </span>
                <div className="text-xs">
                  <span className="block font-semibold text-white">[ Real name ]</span>
                  <span className="text-slate-400">[ Role ] · [ Company ]</span>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Right Form Panel */}
          <div className="relative z-10 flex flex-col justify-center bg-[#071630] p-6 sm:p-10 lg:col-span-6 lg:p-12">
            {/* ADRIG Mark */}
            <span className="mb-5 inline-block" aria-hidden="true">
              <svg viewBox="163 178 274 244" fill="none" className="h-9 w-9">
                <g stroke="#ffffff" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M300 195 L180 405" />
                  <path d="M300 195 L420 405" />
                </g>
                <path d="M247.5 345 H352.5" stroke="#5B91F5" strokeWidth="36" strokeLinecap="round" />
              </svg>
            </span>

            <h3 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
              Contact us
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Tell us what repeats. We will tell you honestly whether it is worth automating — and what it would cost if it is. Or email{" "}
              <a
                href="mailto:contact@adrig.co.in"
                className="text-[#5B91F5] underline underline-offset-4 transition-colors hover:text-white"
              >
                contact@adrig.co.in
              </a>
              .
            </p>

            {status === "success" ? (
              <div className="mt-8 rounded-[16px] border border-[#5B91F5]/30 bg-[#0C2248] p-7 text-center text-white">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#5B91F5]/20 text-lg font-bold text-[#5B91F5]">
                  ✓
                </span>
                <h4 className="mt-3 text-xl font-medium">Message sent</h4>
                <p className="mt-1.5 text-xs text-slate-300">
                  We will review your inquiry and get back to you within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setMessage("");
                    setStatus("idle");
                  }}
                  className="mt-4 text-xs font-semibold text-[#5B91F5] underline hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="cxName" className="block text-xs font-semibold text-slate-300">
                    Name
                  </label>
                  <input
                    id="cxName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-1.5 w-full rounded-[10px] border border-[#19335A] bg-[#0A1D3D] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#5B91F5] focus:ring-1 focus:ring-[#5B91F5]"
                  />
                </div>

                <div>
                  <label htmlFor="cxMail" className="block text-xs font-semibold text-slate-300">
                    Work email
                  </label>
                  <input
                    id="cxMail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1.5 w-full rounded-[10px] border border-[#19335A] bg-[#0A1D3D] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#5B91F5] focus:ring-1 focus:ring-[#5B91F5]"
                  />
                </div>

                <div>
                  <label htmlFor="cxMsg" className="block text-xs font-semibold text-slate-300">
                    What are you trying to fix?
                  </label>
                  <textarea
                    id="cxMsg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="The problem, not the spec."
                    className="mt-1.5 w-full resize-none rounded-[10px] border border-[#19335A] bg-[#0A1D3D] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#5B91F5] focus:ring-1 focus:ring-[#5B91F5]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-[10px] bg-white px-6 text-sm font-semibold text-[#071630] shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:bg-[#5B91F5] hover:text-white disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? "Sending message..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  {
    question: "How quickly will you respond?",
    answer:
      "Project, partnership and general enquiries are typically reviewed within one business day.",
  },
  {
    question: "Do I need a complete technical brief?",
    answer:
      "No. A clear description of the business problem, existing workflow and desired outcome is enough to start.",
  },
  {
    question: "Can ADRIG work with our existing technical team?",
    answer:
      "Yes. ADRIG can collaborate with internal engineering teams, vendors and specialist partners.",
  },
  {
    question: "Do you support systems after launch?",
    answer:
      "Ongoing maintenance, iteration and production support can be included depending on the engagement.",
  },
];

export default function ContactPage() {
  return (
    <main className="overflow-x-clip bg-[#F8FBFF] text-slate-950">
      <section className="relative flex min-h-[92svh] w-full items-center justify-center overflow-hidden bg-[#06162F] text-white">
        <Image
          src="/images/contact/contact-bg.webp"
          alt="ADRIG AI Technologies"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#06162F]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#06162F]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_12%,rgba(0,0,0,0.50)_100%)]" />

        <div className="shell relative z-10 flex min-h-[92svh] items-center justify-center py-24 sm:py-28">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-blue-200 sm:text-xs">
              Contact ADRIG
            </p>

            <h1 className="contact-title mt-7 max-w-[1150px] text-[clamp(3.6rem,7.4vw,8.4rem)] font-normal leading-[0.88] tracking-[-0.07em] text-white">
              Tell us the real problem.
              <span className="block text-[#75A8FF]">
                We&apos;ll take it from there.
              </span>
            </h1>

            <p className="mt-9 max-w-[760px] text-base leading-8 text-white/75 sm:text-lg lg:text-xl">
              You don&apos;t need a perfect scope document. Tell us what is
              slowing you down, what is not working, or what you want to build.
              We&apos;ll turn the problem into a clear path forward.
            </p>

            <a
              href="#contact-form"
              className="mt-10 inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[#06162F] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a conversation →
            </a>
          </div>
        </div>
      </section>

      {/* Redesigned Contact Channels Grid */}
      <ContactChannelsSection />

      {/* Split-Panel Contact Close */}
      <ContactFormSection />

      <section className="border-y border-slate-200/70 bg-[#F8FBFF] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-[8vw]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
              Before you send
            </p>

            <h2 className="mt-6 text-[clamp(3rem,4.6vw,5.3rem)] leading-[0.93] tracking-[-0.06em]">
              Questions we get
              <span className="block text-[#1463FF]">
                before the first call.
              </span>
            </h2>
          </div>

          <div className="border-t border-slate-200">
            {FAQ.map((item, index) => (
              <details
                key={item.question}
                className="faq-item group border-b border-slate-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7">
                  <div className="flex gap-5">
                    <span className="mt-1 font-mono text-[9px] text-[#1463FF]">
                      0{index + 1}
                    </span>
                    <h3 className="text-xl tracking-[-0.035em] sm:text-2xl">
                      {item.question}
                    </h3>
                  </div>
                  <span className="text-xl transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-[720px] pb-7 pl-10 text-sm leading-7 text-slate-500 sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06162F] py-24 text-white sm:py-32">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 18%,rgba(52,119,255,.30),transparent 35%)",
          }}
        />

        <div className="shell relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
            No polished brief required
          </p>
          <h2 className="mt-6 max-w-[1100px] text-[clamp(3.6rem,6.5vw,7.4rem)] leading-[0.88] tracking-[-0.07em]">
            Bring the messy version.
            <span className="block text-[#75A8FF]">
              That&apos;s usually where the useful work starts.
            </span>
          </h2>
          <a
            href="#contact-form"
            className="mt-10 inline-flex min-h-[52px] items-center gap-4 rounded-full bg-white px-6 text-sm font-semibold text-[#06162F]"
          >
            Start the conversation →
          </a>
        </div>
      </section>

      <style jsx global>{`
        .contact-title {
          animation: contactHeroReveal 650ms cubic-bezier(.16, 1, .3, 1) both;
        }

        @keyframes contactHeroReveal {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-title {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}