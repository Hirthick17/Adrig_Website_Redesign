"use client";

import { useRef } from "react";
import type { MutableRefObject, RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { DISTRICT_SLOTS } from "./building-recipes";
import { CABLE_ROUTES } from "./cable-routes";
import { updateHeroState } from "./hero-story";
import type { HeroState } from "./hero-story";
import AdrigTower from "./AdrigTower";
import ProceduralDistrict from "./ProceduralDistrict";
import TechnicalCable from "./TechnicalCable";
import GroundSystem from "./GroundSystem";

export type BubbleAnchorRef = RefObject<HTMLDivElement | null>;

/**
 * Projects each district's bubble anchor to screen space every frame and
 * writes the result into the DOM refs PainBubbleLayer owns — the same
 * scene-anchored technique used for tower labels, just repeated per slot.
 */
function projectAnchors(
  camera: THREE.Camera,
  size: { width: number; height: number },
  bubbleRefs: MutableRefObject<(HTMLDivElement | null)[]>,
  scratch: THREE.Vector3
) {
  for (let i = 0; i < DISTRICT_SLOTS.length; i++) {
    const el = bubbleRefs.current[i];
    if (!el) continue;
    const d = DISTRICT_SLOTS[i];
    scratch.set(d.position[0], 23, d.position[2]);
    scratch.project(camera);
    const x = (scratch.x * 0.5 + 0.5) * size.width;
    const y = (-scratch.y * 0.5 + 0.5) * size.height;
    const visible = scratch.z >= -1 && scratch.z <= 1;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    el.dataset.visible = visible ? "1" : "0";
  }
}

const scratchVec = new THREE.Vector3();

export default function CityScene({
  progressRef,
  stateRef,
  bubbleRefs,
  isMobile,
  reducedMotion = false,
}: {
  progressRef: MutableRefObject<number>;
  stateRef: MutableRefObject<HeroState>;
  bubbleRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  isMobile: boolean;
  reducedMotion?: boolean;
}) {
  const { camera, size } = useThree();
  const cityGroupRef = useRef<THREE.Group>(null);

  const visibleSlots = isMobile ? DISTRICT_SLOTS.filter((d) => [0, 1, 5, 6, 7].includes(d.slot)) : DISTRICT_SLOTS;

  useFrame(() => {
    updateHeroState(stateRef.current, reducedMotion ? 1 : progressRef.current);
    const s = stateRef.current;

    if (cityGroupRef.current) {
      cityGroupRef.current.position.y = s.cityEntranceY;
    }

    projectAnchors(camera, size, bubbleRefs, scratchVec);
  });

  return (
    <group ref={cityGroupRef}>
      <fog attach="fog" args={["#06090F", 60, 280]} />
      <GroundSystem isMobile={isMobile} />
      <AdrigTower stateRef={stateRef} />

      {visibleSlots.map((d) => (
        <ProceduralDistrict key={d.slot} district={d} />
      ))}

      {DISTRICT_SLOTS.map((d, i) =>
        !isMobile || [0, 1, 5, 6, 7].includes(d.slot) ? (
          <TechnicalCable
            key={d.slot}
            waypoints={[...CABLE_ROUTES[i]]}
            slotIndex={i}
            primary={d.role === "primary"}
            stateRef={stateRef}
          />
        ) : null
      )}
    </group>
  );
}
