"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const currentContent = content[activeCard] || content[0];

  return (
    <div
      ref={ref}
      className="h-[32rem] overflow-y-auto flex justify-between relative rounded-3xl p-6 sm:p-10 border border-slate-200/80 bg-white/95 shadow-xl shadow-blue-950/[0.04] scroll-smooth"
    >
      {/* Left text column */}
      <div className="relative flex items-start px-2 sm:px-4 max-w-xl w-full">
        <div className="w-full">
          {content.map((item, index) => {
            const isActive = activeCard === index;
            return (
              <div
                key={item.title + index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleCardClick(index)}
                className="py-16 first:pt-4 cursor-pointer group transition-all"
              >


                <motion.h3
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    color: isActive ? "#07111f" : "#64748b",
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl sm:text-3xl font-semibold tracking-tight group-hover:opacity-80"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-sm sm:text-base text-slate-600 font-normal max-w-md mt-4 leading-relaxed"
                >
                  {item.description}
                </motion.p>
              </div>
            );
          })}
          {/* Generous bottom scroll runway so the last item can scroll to center */}
          <div className="h-64" />
        </div>
      </div>

      {/* Right sticky visual display */}
      <div
        className={cn(
          "hidden lg:block h-72 w-96 rounded-2xl bg-[#F3F7FF] border border-blue-200/80 sticky top-6 overflow-hidden shadow-md shrink-0 self-start",
          contentClassName
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {currentContent?.content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StickyScroll;
