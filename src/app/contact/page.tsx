"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

const PHONE_DISPLAY = "+91 XXXX XXX XXX";
const PHONE_LINK = "+910000000000"; // Replace with ADRIG's real phone number.
const WHATSAPP_LINK = "+910000000000"; // Replace with ADRIG's real WhatsApp number.
const EMAIL = "hello@adrig.co.in";

const steps = ["name", "email", "build", "budget", "message"] as const;
type Step = (typeof steps)[number];

type FormState = Record<Step, string>;

const initialForm: FormState = {
  name: "",
  email: "",
  build: "",
  budget: "",
  message: "",
};

function isValid(step: Step, value: string) {
  const clean = value.trim();

  if (step === "name") return clean.length >= 2;
  if (step === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
  if (step === "build") return clean.length >= 3;
  if (step === "budget") return true;
  if (step === "message") return clean.length >= 8;

  return false;
}

function ChannelCards() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const whatsappMessage = encodeURIComponent(
    "Hi, I found ADRIG through your website and I'd like to discuss a project."
  );

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:grid-cols-4">
      <a
        href={`tel:${PHONE_LINK}`}
        className="contact-channel group flex min-h-[210px] flex-col justify-between border-b border-r border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8FBFF] hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6 lg:border-b-0"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
          Phone
        </span>

        <div>
          <p className="font-mono text-[clamp(1rem,1.45vw,1.35rem)] tracking-[-0.03em] text-slate-950">
            {PHONE_DISPLAY}
          </p>
          <p className="mt-2 translate-y-1 text-xs text-slate-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Tap to call
          </p>
        </div>
      </a>

      <a
        href={`https://wa.me/${WHATSAPP_LINK.replace("+", "")}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="contact-channel group flex min-h-[210px] flex-col justify-between border-b border-slate-200 bg-[#25D366] p-5 text-[#071A0F] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(37,211,102,0.18)] sm:p-6 lg:border-b-0 lg:border-r"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/55">
          WhatsApp
        </span>

        <div>
          <p className="text-[clamp(1.4rem,2vw,2rem)] font-medium tracking-[-0.045em]">
            Chat with us
          </p>
          <p className="mt-2 font-mono text-xs text-black/55">{PHONE_DISPLAY}</p>
        </div>
      </a>

      <div className="contact-channel group relative flex min-h-[210px] flex-col justify-between border-r border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8FBFF] hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
          Email
        </span>

        <div>
          <a
            href={`mailto:${EMAIL}`}
            className="block break-all text-[clamp(1rem,1.5vw,1.35rem)] tracking-[-0.035em] text-slate-950"
          >
            {EMAIL}
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-3 text-xs text-[#1463FF] opacity-70 transition-opacity hover:opacity-100"
          >
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
      </div>

      <a
        href="https://www.google.com/maps/search/?api=1&query=Chennai%2C%20India"
        target="_blank"
        rel="noreferrer"
        className="contact-channel group relative min-h-[210px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,22,47,0.04) 0%, rgba(6,22,47,0.78) 100%), url('/images/contact/chennai-map.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
            Location
          </span>
          <p className="mt-2 text-xl tracking-[-0.04em]">Chennai, India</p>
          <p className="mt-2 text-xs text-white/65">Open in Google Maps ↗</p>
        </div>
      </a>
    </div>
  );
}

function ContactExperience() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [activeIndex, setActiveIndex] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const activeStep = steps[activeIndex];

  const allRequiredValid = useMemo(
    () =>
      isValid("name", form.name) &&
      isValid("email", form.email) &&
      isValid("build", form.build) &&
      isValid("message", form.message),
    [form]
  );

  function updateField(step: Step, value: string) {
    setForm((current) => ({ ...current, [step]: value }));
    setAttempted(false);
  }

  function goNext() {
    const valid = isValid(activeStep, form[activeStep]);

    if (!valid && activeStep !== "budget") {
      setAttempted(true);
      return;
    }

    setAttempted(false);

    if (activeIndex < steps.length - 1) {
      setActiveIndex((current) => current + 1);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();

    if (activeStep === "message") {
      formRef.current?.requestSubmit();
      return;
    }

    goNext();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!allRequiredValid) {
      setAttempted(true);

      const firstInvalid = steps.findIndex(
        (step) => step !== "budget" && !isValid(step, form[step])
      );

      if (firstInvalid >= 0) setActiveIndex(firstInvalid);
      return;
    }

    setStatus("sending");

    // Front-end submit state only. Replace this small block with your API call
    // when your contact endpoint is ready, e.g. await fetch('/api/contact', ...).
    await new Promise((resolve) => window.setTimeout(resolve, 700));

    setStatus("success");
  }

  if (status === "success") {
    return (
      <section id="contact-form" className="bg-white py-24 sm:py-32">
        <div className="shell">
          <div className="mx-auto flex min-h-[420px] max-w-[620px] items-center justify-center text-center">
            <div className="animate-[contactSuccess_.55s_cubic-bezier(.22,1,.36,1)_both]">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E9F1FF] text-[#1463FF]">
                ✓
              </span>
              <h2 className="mt-6 text-[clamp(2.7rem,5vw,5rem)] leading-[0.95] tracking-[-0.06em] text-slate-950">
                Got it.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">
                We&apos;ll reply within a business day.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-slate-200/70 bg-[#F8FBFF] py-14 sm:py-20">
        <div className="shell">
          <ChannelCards />
        </div>
      </section>

      <section id="contact-form" className="bg-white py-24 sm:py-32">
        <div className="shell">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-[520px]"
          >
            <p className="mb-14 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1463FF]">
              Start a conversation
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const active = index === activeIndex;
                const completed = index < activeIndex;
                const hidden = index > activeIndex;
                const valid = isValid(step, form[step]);
                const hasValue = form[step].trim().length > 0;

                if (hidden) return null;

                const prompts: Record<Step, string> = {
                  name: "What’s your name?",
                  email: "What’s your email?",
                  build: "What are you looking to build?",
                  budget: "Budget or timeline?",
                  message: "Anything else we should know?",
                };

                const helpers: Record<Step, string> = {
                  name: "Just so we know who we’re speaking with.",
                  email: "We’ll only use this to reply to your enquiry.",
                  build: "A rough idea is enough — no technical brief needed.",
                  budget: "Optional. No wrong answer — this just helps us prep.",
                  message: "Press Shift + Enter for a new line, or Enter to send.",
                };

                return (
                  <div
                    key={step}
                    className={`transition-all duration-300 ${
                      active
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1 opacity-40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => completed && setActiveIndex(index)}
                      className={`w-full text-left ${completed ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div className="flex items-start justify-between gap-5">
                        <label
                          htmlFor={`contact-${step}`}
                          className={`block tracking-[-0.045em] text-slate-950 ${
                            active
                              ? "text-[clamp(2rem,4vw,3rem)] leading-[1.02]"
                              : "text-lg leading-tight"
                          }`}
                        >
                          {prompts[step]}
                          {step === "budget" && (
                            <span className="ml-2 align-middle font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">
                              optional
                            </span>
                          )}
                        </label>

                        {hasValue && valid && (
                          <span className="mt-1 text-sm text-[#1463FF] transition-opacity duration-300">
                            ✓
                          </span>
                        )}
                      </div>
                    </button>

                    {active && (
                      <div className="mt-6 animate-[contactFieldIn_.35s_cubic-bezier(.22,1,.36,1)_both]">
                        {step === "message" ? (
                          <textarea
                            id={`contact-${step}`}
                            name={step}
                            value={form[step]}
                            autoFocus
                            rows={2}
                            onChange={(event) => updateField(step, event.target.value)}
                            onKeyDown={handleKeyDown}
                            onInput={(event) => {
                              const target = event.currentTarget;
                              target.style.height = "auto";
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            className="w-full resize-none overflow-hidden border-b-2 border-[#1463FF] bg-transparent pb-4 text-xl leading-8 text-slate-950 outline-none placeholder:text-slate-300"
                            placeholder="Tell us the context, problem or goal..."
                          />
                        ) : (
                          <input
                            id={`contact-${step}`}
                            name={step}
                            type={step === "email" ? "email" : "text"}
                            value={form[step]}
                            autoFocus
                            onChange={(event) => updateField(step, event.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full border-b-2 border-[#1463FF] bg-transparent pb-4 text-xl text-slate-950 outline-none placeholder:text-slate-300"
                            placeholder={
                              step === "name"
                                ? "Your name"
                                : step === "email"
                                  ? "you@company.com"
                                  : step === "build"
                                    ? "A product, workflow, AI system..."
                                    : "₹1–3L, this quarter, still exploring..."
                            }
                          />
                        )}

                        <div className="mt-3 flex min-h-6 items-start justify-between gap-4">
                          <p className="text-xs leading-5 text-slate-400">
                            {attempted && step !== "budget" && !valid
                              ? step === "email"
                                ? "Enter a valid email address to continue."
                                : "Add a little more detail to continue."
                              : helpers[step]}
                          </p>

                          {step !== "message" && (
                            <button
                              type="button"
                              onClick={goNext}
                              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-[#1463FF] transition-opacity hover:opacity-60"
                            >
                              Enter ↵
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {activeStep === "message" && (
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-10 inline-flex min-h-[52px] min-w-[132px] items-center justify-center rounded-full bg-[#1463FF] px-7 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B54DE] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? (
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                    Sending
                  </span>
                ) : (
                  "Send it"
                )}
              </button>
            )}
          </form>
        </div>
      </section>

      <style jsx global>{`
        @keyframes contactFieldIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes contactSuccess {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-channel,
          [class*="contactFieldIn"],
          [class*="contactSuccess"] {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
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

      <ContactExperience />

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