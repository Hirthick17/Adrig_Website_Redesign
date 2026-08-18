"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface LayoutGridCard {
  id: string | number;
  className: string;
  thumbnail: string;
  content: React.ReactNode;
}

interface LayoutGridProps {
  cards: LayoutGridCard[];
}

export const LayoutGrid: React.FC<LayoutGridProps> = ({ cards }) => {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        sm:gap-5
        lg:gap-6
        auto-rows-max
      "
    >
      {cards.map((card) => {
        // Determine if this card is wide (col-span-2) or narrow (col-span-1)
        const isWide = card.className.includes("col-span-2") || card.className.includes("md:col-span-2");
        
        return (
          <motion.div
            key={card.id}
            className={`
              group
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-slate-200/70
              bg-white
              shadow-[0_20px_70px_rgba(15,23,42,0.06)]
              transition-all
              duration-300
              ${isWide ? "min-h-[500px] sm:min-h-[420px] lg:min-h-[480px]" : "min-h-[500px] sm:min-h-[420px] lg:min-h-[480px]"}
              ${card.className}
            `}
            onMouseEnter={() => setHoveredId(card.id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ y: -4 }}
          >
            {/* Visual Container with Transparent Background */}
            <div className="absolute inset-0 overflow-hidden bg-white h-full">
              {/* Soft ADRiG ambience glow */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[80%]
                  w-[80%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#0E5CEE]/[0.055]
                  blur-[70px]
                "
              />

              {/* Transparent illustration */}
              <img
                src={card.thumbnail}
                alt=""
                className="
                  absolute
                  left-1/2
                  top-[50%]
                  h-[80%]
                  w-[90%]
                  -translate-x-1/2
                  -translate-y-1/2
                  object-contain
                  object-center
                  transition-transform
                  duration-[800ms]
                  ease-[cubic-bezier(.2,.8,.2,1)]
                  group-hover:scale-[1.05]
                "
              />

              {/* Bottom gradient for readability */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#061A3D]/90
                  via-[#061A3D]/15
                  via-[48%]
                  to-transparent
                "
              />
            </div>

            {/* Text Content Overlay */}
            <div
              className="
                relative
                z-20
                flex
                h-full
                w-full
                flex-col
                justify-between
                p-6
                sm:p-8
              "
            >
              {card.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
