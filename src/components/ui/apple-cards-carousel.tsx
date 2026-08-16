"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/useOutsideClick";

/* ------------------------------------------------------------------ types */

interface CarouselProps {
  items: React.JSX.Element[];
  initialScroll?: number;
}

type CardType = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

/* ---------------------------------------------------------------- context */

const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

/* ================================================================ Carousel */

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const handleCardClose = useCallback((index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 280 : 396;
      const gap = isMobile() ? 16 : 24;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        {/* Track */}
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          {/* left spacer to align first card with the shell container */}
          <div
            className="shrink-0"
            style={{
              width: "max(calc((100vw - 1360px) / 2 + clamp(20px, 4vw, 64px)), clamp(20px, 4vw, 64px))",
            }}
          />
          <div className="flex shrink-0 gap-5 md:gap-6">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.56,
                  delay: Math.min(index * 0.08, 0.4),
                  ease: [0.22, 1, 0.36, 1],
                }}
                key={"card-" + index}
                className="rounded-3xl last:pr-[max(calc((100vw-1360px)/2+clamp(20px,4vw,64px)),clamp(20px,4vw,64px))]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nav arrows */}
        <div className="mr-[max(calc((100vw-1360px)/2+clamp(20px,4vw,64px)),clamp(20px,4vw,64px))] flex justify-end gap-2 mt-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full border border-adrig-hairline bg-white transition-colors disabled:opacity-30 hover:border-adrig-blue/30 hover:shadow-[0_4px_16px_rgba(14,92,238,.12)]"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-adrig-ink"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full border border-adrig-hairline bg-white transition-colors disabled:opacity-30 hover:border-adrig-blue/30 hover:shadow-[0_4px_16px_rgba(14,92,238,.12)]"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-adrig-ink"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

/* ==================================================================== Card */

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardType;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      {/* ---- Expanded overlay ---- */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            {/* scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-adrig-ink/60 backdrop-blur-sm"
            />
            {/* close button */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-6 top-6 z-[80]"
            >
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition hover:bg-white"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-adrig-ink"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </motion.div>

            {/* expanded card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[70] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-8"
            >
              {/* Header image */}
              <div className="relative overflow-hidden rounded-2xl">
                <motion.div
                  layoutId={layout ? `image-${card.title}` : undefined}
                  className="relative h-60 w-full md:h-80"
                >
                  <BlurImage
                    src={card.src}
                    alt={card.title}
                    fill
                    className="object-cover object-center"
                  />
                  {/* gradient overlay for readability at top */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#071a33]/90 via-[#071a33]/40 to-transparent" />
                </motion.div>
                {/* Title overlay at top */}
                <div className="absolute top-0 left-0 right-0 p-6 md:p-8">
                  <motion.p
                    layoutId={layout ? `category-${card.category}` : undefined}
                    className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#a9c8ff]"
                  >
                    {card.category}
                  </motion.p>
                  <motion.p
                    layoutId={layout ? `title-${card.title}` : undefined}
                    className="text-xl font-semibold tracking-tight text-white md:text-3xl"
                  >
                    {card.title}
                  </motion.p>
                </div>
              </div>

              {/* Content body */}
              <div className="py-8">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---- Compact card with text at TOP ---- */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="group relative z-10 flex h-80 w-64 flex-col items-start justify-start overflow-hidden rounded-3xl bg-adrig-ink p-6 md:h-[420px] md:w-96 md:p-8"
      >
        {/* Image */}
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-0 object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {/* Gradient from top for text legibility */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#071a33]/90 via-[#071a33]/40 to-transparent" />

        {/* Text at top */}
        <div className="relative z-10 text-left">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#a9c8ff]"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-lg font-semibold tracking-tight text-white md:text-2xl"
          >
            {card.title}
          </motion.p>
        </div>
      </motion.button>
    </>
  );
};

/* ============================================================= BlurImage */

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  ...rest
}: {
  height?: number;
  width?: number;
  src: string;
  className?: string;
  alt?: string;
  fill?: boolean;
  [key: string]: unknown;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn(
        "transition-[filter,opacity] duration-500",
        isLoading ? "blur-sm opacity-0" : "blur-0 opacity-100",
        fill && "absolute inset-0 h-full w-full",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={fill ? undefined : (width ?? 500)}
      height={fill ? undefined : (height ?? 500)}
      loading="lazy"
      decoding="async"
      alt={alt ?? "image"}
      {...rest}
    />
  );
};
