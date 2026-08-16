"use client";

import { useState, useRef, useId, useEffect } from "react";
import { cn } from "@/lib/utils";

function IconArrowNarrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative flex h-[70vmin] w-[70vmin] max-h-[500px] max-w-[500px] flex-col items-center justify-center text-center text-white opacity-100 transition-all duration-500 ease-in-out"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.96) rotateY(0deg)"
              : "scale(1) rotateY(calc(var(--x) * -0.02deg)) rotateX(calc(var(--y) * 0.02deg))",
          transformOrigin: "center center",
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl bg-[#071a33] transition-all duration-300 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.6,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071a33]/90 via-[#071a33]/30 to-transparent" />
        </div>

        <article
          className="relative p-6 sm:p-8 transition-opacity duration-500 ease-in-out"
          style={{
            opacity: current === index ? 1 : 0,
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 20), calc(var(--y) / 20), 0)"
                : "none",
          }}
        >
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-4">
            {title}
          </h2>
          <div className="flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#071a33] shadow-lg transition-transform duration-200 hover:scale-105">
              <span>{button}</span>
              <IconArrowNarrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-adrig-hairline bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-white active:scale-95",
        type === "previous" ? "rotate-180" : ""
      )}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="h-5 w-5 text-adrig-ink" />
    </button>
  );
};

export default function Carousel({ slides }: { slides: SlideData[] }) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative mx-auto w-[70vmin] max-w-[500px]"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="flex gap-4 [transform-style:preserve-3d]"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute top-[calc(100%+1.5rem)] flex w-full justify-center gap-3">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
