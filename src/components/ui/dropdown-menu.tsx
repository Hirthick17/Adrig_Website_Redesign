"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DirectionContext = createContext<{
  direction: "rtl" | "ltr" | null;
  setAnimationDirection: (tab: number | null) => void;
} | null>(null);

const CurrentTabContext = createContext<{
  currentTab: number | null;
} | null>(null);

export const Dropdown: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [currentTab, setCurrentTab] = useState<null | number>(null);
  const [direction, setDirection] = useState<"rtl" | "ltr" | null>(null);

  const setAnimationDirection = (tab: number | null) => {
    if (typeof currentTab === "number" && typeof tab === "number") {
      setDirection(currentTab > tab ? "rtl" : "ltr");
    } else if (tab === null) {
      setDirection(null);
    }

    setCurrentTab(tab);
  };

  return (
    <DirectionContext.Provider value={{ direction, setAnimationDirection }}>
      <CurrentTabContext.Provider value={{ currentTab }}>
        <span
          onMouseLeave={() => setAnimationDirection(null)}
          className={cn("relative flex h-fit gap-2", className)}
        >
          {children}
        </span>
      </CurrentTabContext.Provider>
    </DirectionContext.Provider>
  );
};

export const TriggerWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTab } = useContext(CurrentTabContext)!;
  const { setAnimationDirection } = useContext(DirectionContext)!;

  return (
    <>
      {React.Children.map(children, (child, index) => (
        <button
          key={`trigger-${index}`}
          type="button"
          onMouseEnter={() => setAnimationDirection(index + 1)}
          onClick={() => setAnimationDirection(index + 1)}
          className={cn(
            "flex h-10 items-center gap-0.5 rounded-full px-3.5 py-2 text-[14.5px] font-medium text-adrig-ink/80 transition-colors hover:text-adrig-ink",
            currentTab === index + 1 && "bg-adrig-blue-soft text-adrig-ink [&>svg]:rotate-180"
          )}
        >
          {child}
        </button>
      ))}
    </>
  );
};

export const Trigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <>
      <span className={cn("inline-flex items-center gap-1.5", className)}>{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        aria-hidden="true"
        className="relative top-[1px] h-3 w-3 transition-transform duration-200"
      >
        <path
          d="M1 1l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const Tabs: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { currentTab } = useContext(CurrentTabContext)!;
  const { direction } = useContext(DirectionContext)!;

  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={currentTab ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute left-0 top-[calc(100%_+_8px)] z-50 w-auto"
    >
      <div className="absolute -top-[8px] left-0 right-0 h-[8px]" />
      <div
        className={cn(
          "rounded-2xl border border-adrig-hairline bg-white/90 p-2 shadow-[0_24px_60px_-32px_rgba(15,32,71,0.35)] backdrop-blur-xl",
          className
        )}
      >
        {React.Children.map(children, (child, index) => (
          <div key={`tab-content-${index}`} className="overflow-hidden">
            <AnimatePresence>
              {currentTab !== null && (
                <motion.div
                  initial={{ opacity: 0, x: direction === "ltr" ? 100 : direction === "rtl" ? -100 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {currentTab === index + 1 && child}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const Tab: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={cn("w-[290px]", className)}>{children}</div>;
};
