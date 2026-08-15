"use client";

import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { HeroState } from "./hero-story";
import { ADRIG_BLUE } from "./materials";

const TRAIL_LENGTH = 5;
const tempPoint = new THREE.Vector3();

/** Moves along the cable's own curve via arc length — never leaves it. */
export default function SignalPacket({
  curve,
  slotIndex,
  primary,
  stateRef,
}: {
  curve: THREE.CurvePath<THREE.Vector3>;
  slotIndex: number;
  primary: boolean;
  stateRef: MutableRefObject<HeroState>;
}) {
  const headRef = useRef<THREE.Mesh>(null);
  const trailRefs = useRef<(THREE.Mesh | null)[]>([]);

  const headRadius = primary ? 0.8 : 0.48;
  const headGeometry = useMemo(() => new THREE.SphereGeometry(headRadius, primary ? 12 : 10, primary ? 8 : 6), [headRadius, primary]);
  const headMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: ADRIG_BLUE, emissive: new THREE.Color(ADRIG_BLUE), emissiveIntensity: 1.1, roughness: 0.25 }),
    []
  );
  const trailGeometry = useMemo(() => new THREE.SphereGeometry(headRadius, 8, 6), [headRadius]);
  const trailMaterials = useMemo(
    () =>
      Array.from({ length: TRAIL_LENGTH }, () => new THREE.MeshBasicMaterial({ color: ADRIG_BLUE, transparent: true, opacity: 0, toneMapped: false })),
    []
  );

  useFrame(() => {
    const s = stateRef.current.slots[slotIndex];
    if (!s) return;

    const visible = s.packetActive;
    if (headRef.current) headRef.current.visible = visible;
    trailRefs.current.forEach((m) => {
      if (m) m.visible = visible;
    });
    if (!visible) return;

    const u = Math.min(1, Math.max(0, s.packetEased));
    curve.getPointAt(u, tempPoint);
    if (headRef.current) headRef.current.position.copy(tempPoint);

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const trailU = Math.max(0, u - i * 0.012);
      curve.getPointAt(trailU, tempPoint);
      const mesh = trailRefs.current[i];
      if (mesh) {
        mesh.position.copy(tempPoint);
        const scale = 1 - i * 0.14;
        mesh.scale.setScalar(scale);
      }
      trailMaterials[i].opacity = 0.34 * (1 - i / TRAIL_LENGTH);
    }
  });

  return (
    <group>
      <mesh ref={headRef} geometry={headGeometry} material={headMaterial} visible={false} />
      {trailMaterials.map((mat, i) => (
        <mesh
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          geometry={trailGeometry}
          material={mat}
          visible={false}
        />
      ))}
    </group>
  );
}
