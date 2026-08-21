"use client";

import { motion, stagger, useAnimate, useInView } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

type TextGenerateEffectProps = Omit<React.ComponentProps<"div">, "children"> & {
  words: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
};

function TextGenerateEffect({
  ref,
  words,
  className,
  filter = true,
  duration = 0.4,
  staggerDelay = 0.05,
  ...props
}: TextGenerateEffectProps) {
  const localRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref as any, () => localRef.current as HTMLDivElement);

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-20px" });
  const wordsArray = React.useMemo(() => words.split(" "), [words]);

  React.useEffect(() => {
    if (scope.current && isInView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration,
          delay: stagger(staggerDelay),
        },
      );
    }
  }, [animate, duration, filter, scope, staggerDelay, isInView]);

  return (
    <div
      className={cn("text-slate-600", className)}
      data-slot="text-generate-effect"
      ref={localRef}
      {...(props as any)}
    >
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <motion.span
            className="opacity-0 will-change-[transform,opacity,filter] inline-block mr-1"
            key={`${word}-${idx}`}
            style={{
              filter: filter ? "blur(8px)" : "none",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export { TextGenerateEffect, type TextGenerateEffectProps };
export default TextGenerateEffect;
