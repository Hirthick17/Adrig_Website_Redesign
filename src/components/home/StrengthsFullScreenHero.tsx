'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HeroGeometricShaderBackground } from '@/components/ui/hero-geometric';
import { CircuitBoard } from '@/components/ui/circuit-board';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function IllustrationPipeline() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <pattern id="grid-a" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D9E2EE" strokeWidth="0.5" />
        </pattern>
        <marker id="arrow-a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,1 L4,3 L0,5 Z" fill="#1463FF" />
        </marker>
      </defs>
      <rect width="400" height="200" fill="#F3F7FF" />
      <rect width="400" height="200" fill="url(#grid-a)" opacity="0.5" />
      <line x1="40" y1="100" x2="360" y2="100" stroke="#A9C8FF" strokeWidth="1.5" strokeDasharray="4 3" />
      {[60, 140, 220, 300, 360].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="100" r="14" fill="white" stroke={i === 4 ? '#1463FF' : '#A9C8FF'} strokeWidth={i === 4 ? 2 : 1} />
          <circle cx={cx} cy="100" r={i === 4 ? 6 : 5} fill={i === 4 ? '#1463FF' : '#CFE0FF'} />
          {i < 4 && (
            <path d={`M${cx + 16} 100 L${cx + 28} 100`} stroke="#1463FF" strokeWidth="1.5" markerEnd="url(#arrow-a)" />
          )}
        </g>
      ))}
      {['Ingest', 'Parse', 'Reason', 'Validate', 'Deploy'].map((label, i) => {
        const xs = [60, 140, 220, 300, 360];
        return (
          <text key={label} x={xs[i]} y="128" textAnchor="middle" fontSize="9" fill="#52627A" fontFamily="Inter, sans-serif" letterSpacing="0.04em">{label}</text>
        );
      })}
      <circle r="4" fill="#1463FF" opacity="0.9">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M60,100 L360,100" />
      </circle>
    </svg>
  );
}

function IllustrationArchitecture() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <pattern id="grid-b" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D9E2EE" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="#F3F7FF" />
      <rect width="400" height="200" fill="url(#grid-b)" opacity="0.5" />
      {[
        { y: 40, w: 280, label: 'Application Layer', color: '#EAF2FF', stroke: '#A9C8FF' },
        { y: 90, w: 240, label: 'Intelligence Layer', color: '#CFE0FF', stroke: '#347DFF' },
        { y: 140, w: 200, label: 'Infrastructure Layer', color: '#EAF2FF', stroke: '#A9C8FF' },
      ].map(({ y, w, label, color, stroke }) => (
        <g key={label}>
          <rect x={(400 - w) / 2} y={y} width={w} height={36} rx="8" fill={color} stroke={stroke} strokeWidth="1" />
          <text x="200" y={y + 22} textAnchor="middle" fontSize="10" fill="#0B213F" fontFamily="Inter, sans-serif" fontWeight="500">{label}</text>
        </g>
      ))}
      <line x1="200" y1="76" x2="200" y2="90" stroke="#347DFF" strokeWidth="1.5" />
      <line x1="200" y1="126" x2="200" y2="140" stroke="#347DFF" strokeWidth="1.5" />
      <rect x="80" y="90" width="240" height="36" rx="8" fill="#1463FF" opacity="0.06" />
    </svg>
  );
}

function IllustrationDeployment() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <pattern id="grid-c" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D9E2EE" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="#F3F7FF" />
      <rect width="400" height="200" fill="url(#grid-c)" opacity="0.5" />
      {[30, 58, 86, 114].map((y) => (
        <g key={y}>
          <rect x="60" y={y} width="120" height="22" rx="4" fill="white" stroke="#A9C8FF" strokeWidth="1" />
          <circle cx="80" cy={y + 11} r="4" fill="#1463FF" opacity="0.8" />
          <rect x="92" y={y + 7} width="60" height="4" rx="2" fill="#EAF2FF" />
          <rect x="92" y={y + 7} width="30" height="4" rx="2" fill="#A9C8FF" />
        </g>
      ))}
      <path d="M 180 80 C 240 80 240 110 300 110" stroke="#1463FF" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
      <circle cx="300" cy="110" r="18" fill="white" stroke="#A9C8FF" strokeWidth="1" />
      <text x="300" y="115" textAnchor="middle" fontSize="9" fill="#0B213F" fontFamily="Inter, sans-serif" fontWeight="600">LIVE</text>
      <circle cx="300" cy="110" r="26" fill="none" stroke="#1463FF" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" values="18;32;18" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="300" y="155" textAnchor="middle" fontSize="9" fill="#52627A" fontFamily="Inter, sans-serif" letterSpacing="0.04em">99.9% UPTIME</text>
    </svg>
  );
}

function IllustrationSecurity() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <pattern id="grid-d" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D9E2EE" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="#F3F7FF" />
      <rect width="400" height="200" fill="url(#grid-d)" opacity="0.5" />
      <path d="M 200 30 L 248 52 L 248 98 C 248 128 224 148 200 158 C 176 148 152 128 152 98 L 152 52 Z" fill="#EAF2FF" stroke="#A9C8FF" strokeWidth="1.5" />
      <path d="M 200 46 L 236 64 L 236 100 C 236 124 218 140 200 148 C 182 140 164 124 164 100 L 164 64 Z" fill="white" stroke="#347DFF" strokeWidth="1" />
      <rect x="188" y="88" width="24" height="20" rx="4" fill="#1463FF" opacity="0.9" />
      <path d="M 192 88 L 192 82 C 192 77 208 77 208 82 L 208 88" stroke="#1463FF" strokeWidth="2" fill="none" />
      {[
        { x: 290, y: 95 },
        { x: 245, y: 156 },
        { x: 155, y: 156 },
        { x: 110, y: 95 },
        { x: 155, y: 34 },
        { x: 245, y: 34 },
      ].map((pt, i) => (
        <g key={i}>
          <line x1="200" y1="95" x2={pt.x} y2={pt.y} stroke="#A9C8FF" strokeWidth="0.75" strokeDasharray="3 3" />
          <circle cx={pt.x} cy={pt.y} r="5" fill="white" stroke="#CFE0FF" strokeWidth="1" />
        </g>
      ))}
      <text x="200" y="185" textAnchor="middle" fontSize="9" fill="#52627A" fontFamily="Inter, sans-serif" letterSpacing="0.05em">PRIVATE · AIR-GAPPED · SOVEREIGN</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Feature data — ADRIG blue palette only (AGENTS §1.3, §3)
───────────────────────────────────────────────────────────────────────────── */
interface BentoFeatureItem {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  Illustration: React.FC;
  className: string;
}

const BENTO_FEATURES: BentoFeatureItem[] = [
  {
    eyebrow: 'Autonomous Scale',
    title: 'Engineered for high-throughput precision',
    description: 'Custom AI pipelines, autonomous agent swarms, and high-performance computing built to execute mission-critical enterprise workloads with zero operational drift.',
    href: '/services',
    cta: 'Explore capabilities',
    Illustration: IllustrationPipeline,
    className: 'col-span-1 lg:col-span-2',
  },
  {
    eyebrow: 'Deep Domain Pedigree',
    title: 'Expert AI & systems architects',
    description: 'Senior engineers with specialized expertise across deep learning, real-time distributed data pipelines, and scalable enterprise platforms.',
    href: '/team',
    cta: 'Meet our team',
    Illustration: IllustrationArchitecture,
    className: 'col-span-1 lg:col-span-1',
  },
  {
    eyebrow: 'Mission-Critical Scale',
    title: 'Proven production track record',
    description: 'Deployed enterprise systems powering railways, automated fintech verification, predictive manufacturing, and defense operations.',
    href: '/work',
    cta: 'View case studies',
    Illustration: IllustrationDeployment,
    className: 'col-span-1 lg:col-span-1',
  },
  {
    eyebrow: 'Enterprise Security',
    title: 'Private by design & zero lock-in',
    description: 'Complete data sovereignty deployed in your dedicated private cloud with air-gapped security, verifiable weights, and full IP ownership.',
    href: '/technologies',
    cta: 'Security & architecture',
    Illustration: IllustrationSecurity,
    className: 'col-span-1 lg:col-span-2',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Section component
───────────────────────────────────────────────────────────────────────────── */
export function StrengthsFullScreenHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.32 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={sectionRef}
      id="why-adrig"
      className="snap-section min-h-screen w-full bg-[#FAFCFF] text-slate-900 flex flex-col justify-between py-16 sm:py-24 px-5 sm:px-8 lg:px-14 relative overflow-hidden font-sans selection:bg-[#0E5CEE] selection:text-white border-b border-slate-200/60"
    >
      {/* Ambient WebGL background */}
      <HeroGeometricShaderBackground
        color1="#93C5FD"
        color2="#FFFFFF"
        speed={0.5}
        className="opacity-60"
      />

      {/* Soft radial glows — blue-derived only */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-blue-300/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-blue-200/20 blur-[110px] rounded-full pointer-events-none" />

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Section header */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center mb-10 sm:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.08] max-w-4xl mx-auto font-sans"
        >
          Engineered for precision. Built for autonomous scale.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          High-throughput AI systems and mission-critical engineering designed to scale across complex enterprise operations.
        </motion.p>
      </div>

      {/* Bento grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {BENTO_FEATURES.map((item) => (
          <motion.div
            key={item.title}
            variants={cardVariants}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-950/[0.04] hover:shadow-xl hover:shadow-blue-900/[0.07] hover:border-blue-300/70 transition-all duration-500 hover:-translate-y-1 ${item.className}`}
          >
            {/* Technical SVG illustration */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#F3F7FF] border-b border-slate-200/60">
              <item.Illustration />
            </div>

            {/* Card body */}
            <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1463FF] inline-flex items-center gap-1.5 mb-3">
                  <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
                  {item.eyebrow}
                </span>

                <h3 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight leading-snug group-hover:text-[#0E5CEE] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#0E5CEE] transition-colors duration-300"
                >
                  <span>{item.cta}</span>
                  <ArrowRight className="w-4 h-4 text-[#0E5CEE] transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Corner glow — ADRIG blue only */}
            <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-[#1463FF] opacity-0 group-hover:opacity-[0.08] blur-2xl transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <div className="relative z-10 w-full text-center mt-8 sm:mt-10">
        <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Explore our full suite of AI capabilities below</span>
          <ArrowRight className="w-3.5 h-3.5 rotate-90 text-[#0E5CEE]" />
        </div>
      </div>
    </section>
  );
}

export default StrengthsFullScreenHero;
