/**
 * The single source of derived animation state for the hero. Every visual
 * system (intro copy, stage labels, pain bubbles, cables, packets, tower
 * energy, resolution) reads from ONE state object built here from the
 * normalized progress value — nothing recomputes its own timing elsewhere.
 */

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function range(progress: number, start: number, end: number) {
  return clamp01((progress - start) / Math.max(0.0001, end - start));
}

export function smoothstep01(value: number) {
  const x = clamp01(value);
  return x * x * (3 - 2 * x);
}

export function smoothRange(progress: number, start: number, end: number) {
  return smoothstep01(range(progress, start, end));
}

export function windowOpacity(
  progress: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
) {
  const enter = smoothRange(progress, fadeInStart, fadeInEnd);
  const exit = smoothRange(progress, fadeOutStart, fadeOutEnd);
  return enter * (1 - exit);
}

export function easeInOutCubic(value: number) {
  const x = clamp01(value);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function arrivalFlash(progress: number, arrival: number, width = 0.012) {
  return Math.exp(-Math.pow((progress - arrival) / width, 2));
}

/* ============================================================ cable timing
   Index-aligned with DISTRICT_SLOTS / CABLE_ROUTES (0 = Healthcare). */
export type SlotTiming = {
  bubbleStart: number; bubbleEnd: number;
  collapseStart: number; collapseEnd: number;
  cableStart: number; cableEnd: number;
  packetStart: number; packetEnd: number;
  arrival: number;
  energyWeight: number;
  energyWindowStart: number; energyWindowEnd: number;
};

export const SLOT_TIMING: SlotTiming[] = [
  // Healthcare (primary)
  { bubbleStart: 0.12, bubbleEnd: 0.26, collapseStart: 0.26, collapseEnd: 0.32, cableStart: 0.3, cableEnd: 0.44, packetStart: 0.39, packetEnd: 0.48, arrival: 0.48, energyWeight: 0.3, energyWindowStart: 0.465, energyWindowEnd: 0.485 },
  // Slot 1
  { bubbleStart: 0.45, bubbleEnd: 0.51, collapseStart: 0.5, collapseEnd: 0.53, cableStart: 0.5, cableEnd: 0.55, packetStart: 0.52, packetEnd: 0.56, arrival: 0.56, energyWeight: 0.1, energyWindowStart: 0.55, energyWindowEnd: 0.57 },
  // Slot 2
  { bubbleStart: 0.51, bubbleEnd: 0.57, collapseStart: 0.56, collapseEnd: 0.59, cableStart: 0.57, cableEnd: 0.63, packetStart: 0.6, packetEnd: 0.64, arrival: 0.64, energyWeight: 0.1, energyWindowStart: 0.63, energyWindowEnd: 0.65 },
  // Slot 3
  { bubbleStart: 0.59, bubbleEnd: 0.65, collapseStart: 0.64, collapseEnd: 0.67, cableStart: 0.65, cableEnd: 0.71, packetStart: 0.68, packetEnd: 0.72, arrival: 0.72, energyWeight: 0.1, energyWindowStart: 0.71, energyWindowEnd: 0.73 },
  // Slot 4
  { bubbleStart: 0.62, bubbleEnd: 0.68, collapseStart: 0.67, collapseEnd: 0.7, cableStart: 0.68, cableEnd: 0.74, packetStart: 0.71, packetEnd: 0.75, arrival: 0.75, energyWeight: 0.1, energyWindowStart: 0.74, energyWindowEnd: 0.76 },
  // Slot 5
  { bubbleStart: 0.54, bubbleEnd: 0.6, collapseStart: 0.59, collapseEnd: 0.62, cableStart: 0.6, cableEnd: 0.66, packetStart: 0.63, packetEnd: 0.67, arrival: 0.67, energyWeight: 0.1, energyWindowStart: 0.66, energyWindowEnd: 0.68 },
  // Slot 6
  { bubbleStart: 0.47, bubbleEnd: 0.53, collapseStart: 0.52, collapseEnd: 0.55, cableStart: 0.52, cableEnd: 0.58, packetStart: 0.55, packetEnd: 0.59, arrival: 0.59, energyWeight: 0.1, energyWindowStart: 0.58, energyWindowEnd: 0.6, },
  // Slot 7
  { bubbleStart: 0.65, bubbleEnd: 0.71, collapseStart: 0.7, collapseEnd: 0.73, cableStart: 0.71, cableEnd: 0.77, packetStart: 0.74, packetEnd: 0.78, arrival: 0.78, energyWeight: 0.1, energyWindowStart: 0.77, energyWindowEnd: 0.79 },
];

export type SlotState = {
  cableReveal: number;
  packetActive: boolean;
  packetEased: number;
  arrival: number;
  bubbleOpacity: number;
  bubbleScale: number;
  bubbleTranslateY: number;
  bubbleTextOpacity: number;
  bubbleCollapse: number;
  bubbleToCapsule: number;
};

export type HeroState = {
  progress: number;
  introOpacity: number;
  introTranslateY: number;
  introScale: number;
  introVisible: boolean;
  cityEntranceY: number;
  cityOpacity: number;
  stageHealthcareOpacity: number;
  stageNetworkOpacity: number;
  towerVisibleEnergy: number;
  towerGlowEnergy: number;
  resolutionOpacity: number;
  resolutionTranslateY: number;
  cueOpacity: number;
  slots: SlotState[];
};

export function createHeroState(): HeroState {
  return {
    progress: 0,
    introOpacity: 1,
    introTranslateY: 0,
    introScale: 1,
    introVisible: true,
    cityEntranceY: -7,
    cityOpacity: 0.2,
    stageHealthcareOpacity: 0,
    stageNetworkOpacity: 0,
    towerVisibleEnergy: 0,
    towerGlowEnergy: 0,
    resolutionOpacity: 0,
    resolutionTranslateY: 34,
    cueOpacity: 1,
    slots: SLOT_TIMING.map(() => ({
      cableReveal: 0,
      packetActive: false,
      packetEased: 0,
      arrival: 0,
      bubbleOpacity: 0,
      bubbleScale: 0.82,
      bubbleTranslateY: 18,
      bubbleTextOpacity: 1,
      bubbleCollapse: 0,
      bubbleToCapsule: 0,
    })),
  };
}

/** Mutates `state` in place from `progress` — never allocates. Safe to call every frame. */
export function updateHeroState(state: HeroState, progress: number): HeroState {
  const p = clamp01(progress);
  state.progress = p;

  // Screen A — intro copy (§5)
  const introExit = smoothRange(p, 0.065, 0.135);
  state.introOpacity = 1 - introExit;
  state.introTranslateY = lerp(0, -28, introExit);
  state.introScale = lerp(1, 0.965, introExit);
  state.introVisible = state.introOpacity >= 0.08;

  // City entrance (§6 Screen A)
  const cityEntrance = smoothRange(p, 0, 0.075);
  state.cityEntranceY = lerp(-7, 0, cityEntrance);
  state.cityOpacity = lerp(0.2, 1, cityEntrance);

  // Stage labels
  state.stageHealthcareOpacity = windowOpacity(p, 0.135, 0.19, 0.44, 0.49);
  state.stageNetworkOpacity = windowOpacity(p, 0.49, 0.55, 0.78, 0.83);

  // Scroll cue
  state.cueOpacity = 1 - smoothRange(p, 0.01, 0.06);

  // Resolution (§6 Screen F)
  const resolutionReveal = smoothRange(p, 0.875, 0.94);
  state.resolutionOpacity = resolutionReveal;
  state.resolutionTranslateY = lerp(34, 0, resolutionReveal);

  // Tower energy (§19)
  let towerEnergy = 0;
  for (const t of SLOT_TIMING) {
    towerEnergy += t.energyWeight * smoothRange(p, t.energyWindowStart, t.energyWindowEnd);
  }
  towerEnergy = clamp01(towerEnergy);
  const visibleEnergy = smoothstep01(towerEnergy);
  state.towerVisibleEnergy = visibleEnergy;
  state.towerGlowEnergy = visibleEnergy * visibleEnergy;

  // Per-slot cable / packet / bubble state (§13–16)
  for (let i = 0; i < SLOT_TIMING.length; i++) {
    const t = SLOT_TIMING[i];
    const s = state.slots[i];

    s.cableReveal = smoothRange(p, t.cableStart, t.cableEnd);

    const packetLocal = range(p, t.packetStart, t.packetEnd);
    s.packetActive = p >= t.packetStart && p <= t.packetEnd;
    s.packetEased = easeInOutCubic(packetLocal);

    s.arrival = arrivalFlash(p, t.arrival);

    const enter = smoothRange(p, t.bubbleStart, t.bubbleStart + (t.bubbleEnd - t.bubbleStart) * 0.55);
    const exit = smoothRange(p, t.collapseStart, t.collapseEnd);
    s.bubbleOpacity = enter * (1 - exit);
    s.bubbleScale = lerp(0.82, 1, enter) * lerp(1, 0.18, exit);
    s.bubbleTranslateY = lerp(18, -24, enter);
    s.bubbleTextOpacity = 1 - smoothRange(p, t.collapseStart, t.collapseStart + (t.collapseEnd - t.collapseStart) * 0.55);
    s.bubbleCollapse = exit;
    // Cross-fade HTML bubble -> 3D capsule across the final third of the collapse window.
    const crossStart = t.collapseStart + (t.collapseEnd - t.collapseStart) * 0.6;
    s.bubbleToCapsule = smoothRange(p, crossStart, t.collapseEnd + 0.005);
  }

  return state;
}
