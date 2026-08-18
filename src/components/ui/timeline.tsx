"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 82%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative min-h-[78vh] py-8 md:min-h-[82vh] md:py-12"
          >
            <div className="sticky top-24 z-20 flex justify-center">
              <div className="w-full max-w-6xl">
                <div className="mb-4 flex items-center gap-3 md:mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200/80 bg-white shadow-md">
                    <div className="h-4 w-4 rounded-full bg-[#1463FF]" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                    {item.title}
                  </h3>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="origin-center"
                >
                  {item.content}
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 hidden w-0.5 overflow-hidden bg-linear-to-b from-transparent from-0% via-slate-200 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:block"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-linear-to-t from-[#1463FF] via-[#347DFF] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
