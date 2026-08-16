"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      {/* vertical track + animated dot */}
      <div className="absolute left-8 top-3 hidden md:block">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{ boxShadow: "0 0 0 4px rgba(14,92,238,0.15), 0 0 20px rgba(14,92,238,0.4)" }}
          className="relative ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0E5CEE] bg-white"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{ backgroundColor: "#0E5CEE", borderColor: "#0E5CEE" }}
            className="h-2 w-2 rounded-full bg-[#0E5CEE]"
          />
        </motion.div>

        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          {/* background track */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="rgba(11,18,32,0.08)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
          />
          {/* animated glowing beam */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="rgba(14,92,238,0)" stopOpacity="0" />
              <stop stopColor="#0E5CEE" />
              <stop offset="0.325" stopColor="#347DFF" />
              <stop offset="1" stopColor="#A9C8FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef} className="md:pl-20">
        {children}
      </div>
    </motion.div>
  );
};
