'use client';

import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, type MotionValue } from 'framer-motion';
import { useRef, forwardRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  href?: string;
  tags?: string[];
}

export interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  href?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  totalCards: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  href = '#',
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 px-4 sm:px-8 lg:px-12"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-2vh + ${i * 22}px)`,
        }}
        className="flex flex-col relative -top-[10%] sm:-top-[12%] h-[520px] sm:h-[560px] w-full max-w-6xl rounded-3xl p-6 sm:p-10 lg:p-12 origin-top border border-white/15 shadow-[0_32px_80px_rgba(7,26,51,0.5)] backdrop-blur-2xl overflow-hidden"
      >
        {/* Card Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-6 sm:gap-10 lg:gap-12 items-stretch">
          {/* Left: Text, Details, CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-[1.12]">
                {title}
              </h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-[16px] leading-relaxed text-slate-200 font-normal">
                {description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-auto flex items-center justify-between">
              <Link
                href={href}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-slate-950 font-semibold text-sm transition-all duration-300 hover:bg-[#1463FF] hover:text-white shadow-md hover:shadow-lg"
              >
                <span>Explore capability</span>
                <ArrowRight className="w-4 h-4 text-[#1463FF] group-hover:text-white transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right: Immersive Image with architectural glass frame */}
          <div className="lg:col-span-6 relative h-[220px] sm:h-[260px] lg:h-full rounded-2xl overflow-hidden border border-white/15 shadow-inner bg-black/20">
            <motion.div
              className="w-full h-full relative"
              style={{ scale: imageScale }}
            >
              <img
                src={url}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export interface StackingCardRootProps {
  projects: ProjectData[];
  headingTitle?: React.ReactNode;
  headingSubtitle?: string;
}

const StackingCards = forwardRef<HTMLElement, StackingCardRootProps>(
  ({ projects, headingTitle, headingSubtitle }, ref) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end'],
    });

    return (
      <ReactLenis root>
        <main className="bg-slate-950 text-white relative" ref={container}>
          {/* Header section — clean ADRIG typography and blueprint style */}
          {headingTitle !== null && (
            <section className="min-h-[48vh] sm:min-h-[52vh] w-full flex flex-col items-center justify-center relative px-6 text-center py-16 sm:py-20">
              {/* Blueprint grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

              {/* Ambient Blue Radial Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#1463FF]/15 blur-[120px] rounded-full pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1463FF]/15 border border-[#347DFF]/30 shadow-sm text-xs font-semibold uppercase tracking-wider text-[#A9C8FF] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1463FF]" />
                  Our Capabilities
                </span>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white max-w-4xl leading-[1.08]">
                  {headingTitle || "Eight capabilities. One connected team."}
                </h2>

                {headingSubtitle && (
                  <p className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed">
                    {headingSubtitle}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Stacking Cards List */}
          <section className="w-full relative pb-20">
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.035;
              return (
                <Card
                  key={`stack_${project.title}_${i}`}
                  i={i}
                  url={project.link}
                  title={project.title}
                  color={project.color}
                  description={project.description}
                  href={project.href}
                  progress={scrollYProgress}
                  range={[i * (1 / (projects.length || 1)), 1]}
                  targetScale={targetScale}
                  totalCards={projects.length}
                />
              );
            })}
          </section>
        </main>
      </ReactLenis>
    );
  }
);

StackingCards.displayName = 'StackingCards';

export default StackingCards;
