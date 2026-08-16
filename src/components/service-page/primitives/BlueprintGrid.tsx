import React from "react";

export function BlueprintGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)] ${className}`}
    />
  );
}

export default BlueprintGrid;
