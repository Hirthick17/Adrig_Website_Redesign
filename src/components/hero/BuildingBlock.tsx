"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { BlockSpec } from "./building-recipes";
import { MATERIAL_PROPS } from "./materials";

/** Renders one procedural primitive from a BlockSpec. Pure geometry — no imported models. */
export default function BuildingBlock({ spec }: { spec: BlockSpec }) {
  const mat = MATERIAL_PROPS[spec.material as keyof typeof MATERIAL_PROPS];
  const rotation = spec.rotation ?? [0, 0, 0];

  const geometry = useMemo(() => {
    switch (spec.primitive) {
      case "cylinder": {
        const r = spec.radius ?? 1;
        const h = spec.height ?? 1;
        return new THREE.CylinderGeometry(r, r, h, Math.min(spec.radialSegments ?? 20, 48));
      }
      case "plane": {
        const [w, , d] = spec.size ?? [1, 1, 1];
        return new THREE.PlaneGeometry(w, d);
      }
      case "wedge": {
        const [w, h, d] = spec.size ?? [1, 1, 1];
        return new THREE.CylinderGeometry(0, Math.max(w, d) / 2, h, 3);
      }
      case "roundedBox":
      case "box":
      default: {
        const [w, h, d] = spec.size ?? [1, 1, 1];
        return new THREE.BoxGeometry(w, h, d);
      }
    }
  }, [spec.primitive, spec.size, spec.radius, spec.height, spec.radialSegments]);

  return (
    <mesh geometry={geometry} position={spec.position} rotation={rotation} castShadow receiveShadow>
      <meshStandardMaterial
        color={mat.color}
        roughness={mat.roughness}
        metalness={mat.metalness}
        transparent={mat.transparent}
        opacity={mat.opacity ?? 1}
        emissive={mat.emissive ? new THREE.Color(mat.emissive) : undefined}
        emissiveIntensity={mat.emissiveIntensity ?? 0}
      />
    </mesh>
  );
}
