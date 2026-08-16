import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon?: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      // Apple-style crisp card with depth
      "bg-white shadow-lg shadow-blue-950/10 border border-white/80 backdrop-blur-sm min-h-[220px]",
      "transform-gpu transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/20 hover:-translate-y-1",
      className,
    )}
  >
    <div className="absolute inset-0 z-0 overflow-hidden">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 p-6 transition-all duration-300 group-hover:-translate-y-5">
      {Icon && (
        <Icon className="h-9 w-9 origin-left transform-gpu text-slate-800 transition-all duration-300 ease-in-out group-hover:scale-75 mb-1" />
      )}
      <h3 className="text-lg sm:text-xl font-bold font-sans text-slate-900 tracking-tight">
        {name}
      </h3>
      <p className="max-w-md text-xs sm:text-[13.5px] leading-relaxed text-slate-600 font-sans font-normal">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10",
      )}
    >
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto bg-white/95 backdrop-blur-md shadow-md text-[#0E5CEE] font-semibold hover:bg-white hover:text-[#0A4FE3] rounded-xl px-4 py-2 text-xs">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-3.5 w-3.5" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-blue-600/[0.03]" />
  </div>
);

export { BentoCard, BentoGrid };
