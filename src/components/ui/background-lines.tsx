"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children?: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#071a33]",
        className
      )}
    >
      <SVG svgOptions={svgOptions} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const SVG = ({
  svgOptions,
}: {
  svgOptions?: {
    duration?: number;
  };
}) => {
  const duration = svgOptions?.duration || 10;

  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-370 -179C-370 -179 -302 226 162 353C626 480 694 885 694 885",
    "M-360 -169C-360 -169 -292 236 172 363C636 490 704 895 704 895",
    "M-350 -159C-350 -159 -282 246 182 373C646 500 714 905 714 905",
    "M-340 -149C-340 -149 -272 256 192 383C656 510 724 915 724 915",
    "M-330 -139C-330 -139 -262 266 202 393C666 520 734 925 734 925",
    "M-320 -129C-320 -129 -252 276 212 403C676 530 744 935 744 935",
    "M-310 -119C-310 -119 -242 286 222 413C686 540 754 945 754 945",
    "M-300 -109C-300 -109 -232 296 232 423C696 550 764 955 764 955",
    "M-290 -99C-290 -99 -222 306 242 433C706 560 774 965 774 965",
    "M-280 -89C-280 -89 -212 316 252 443C716 570 784 975 784 975",
    "M-270 -79C-270 -79 -202 326 262 453C726 580 794 985 794 985",
    "M-260 -69C-260 -69 -192 336 272 463C736 590 804 995 804 995",
    "M-250 -59C-250 -59 -182 346 282 473C746 600 814 1005 814 1005",
    "M-240 -49C-240 -49 -172 356 292 483C756 610 824 1015 824 1015",
    "M-230 -39C-230 -39 -162 366 302 493C766 620 834 1025 834 1025",
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="adrig-line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0E5CEE" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#347DFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0E5CEE" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {paths.map((path, idx) => (
          <motion.path
            key={`line-${idx}`}
            d={path}
            stroke="url(#adrig-line-gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0.2, opacity: 0.2 }}
            animate={{
              pathLength: [0.2, 0.9, 0.2],
              opacity: [0.2, 0.7, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: duration + idx * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};
