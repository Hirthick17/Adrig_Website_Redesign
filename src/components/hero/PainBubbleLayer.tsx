"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { DISTRICT_SLOTS } from "./building-recipes";
import type { HeroState } from "./hero-story";

/** Generic, industry-recognisable operational pain points — illustrative narrative copy, not a claim about a real client. */
const BUBBLE_TEXT = [
  "Patient records live in six systems that don't talk to each other.",
  "Reconciliation still happens in a spreadsheet, by hand.",
  "Inventory counts never match what's actually on the shelf.",
  "Nobody knows where a shipment is until it doesn't arrive.",
  "Downtime gets discovered after the line has already stopped.",
  "Scheduling changes take longer to communicate than to make.",
  "Grid data updates hourly. Decisions can't wait that long.",
  "Every team ships. Nobody has the full picture.",
];

export default function PainBubbleLayer({
  stateRef,
  bubbleRefs,
}: {
  stateRef: MutableRefObject<HeroState>;
  bubbleRefs: MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    function frame() {
      const s = stateRef.current;
      for (let i = 0; i < DISTRICT_SLOTS.length; i++) {
        const el = bubbleRefs.current[i];
        const slot = s.slots[i];
        if (!el || !slot) continue;

        const projectedVisible = el.dataset.visible === "1";
        const opacity = projectedVisible ? slot.bubbleOpacity : 0;

        if (opacity <= 0.003) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          continue;
        }

        el.style.opacity = String(opacity);
        el.style.transform =
          `translate3d(var(--x), var(--y), 0)` +
          ` translate(-50%, -100%)` +
          ` translateY(-24px)` +
          ` scale(${slot.bubbleScale.toFixed(3)})`;

        const textEl = textRefs.current[i];
        if (textEl) textEl.style.opacity = String(slot.bubbleTextOpacity);
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [stateRef, bubbleRefs]);

  return (
    <>
      {DISTRICT_SLOTS.map((d, i) => (
        <div
          key={d.slot}
          ref={(el) => {
            bubbleRefs.current[i] = el;
          }}
          className="hero-bubble"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <p
            ref={(el) => {
              textRefs.current[i] = el;
            }}
          >
            {BUBBLE_TEXT[i]}
          </p>
        </div>
      ))}
    </>
  );
}
