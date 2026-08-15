"use client";

import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { buildRoutedCurve } from "./cable-routes";
import type { Vec3 } from "./building-recipes";
import type { HeroState } from "./hero-story";
import { COLORS, ADRIG_BLUE } from "./materials";
import SignalPacket from "./SignalPacket";

function revealTube(geometry: THREE.TubeGeometry, progress: number, tubularSegments: number, radialSegments: number) {
  const completed = Math.floor(Math.min(1, Math.max(0, progress)) * tubularSegments);
  const count = completed * radialSegments * 6;
  const total = geometry.index?.count ?? 0;
  geometry.setDrawRange(0, Math.min(count, total));
}

export default function TechnicalCable({
  waypoints,
  slotIndex,
  primary,
  stateRef,
}: {
  waypoints: Vec3[];
  slotIndex: number;
  primary: boolean;
  stateRef: MutableRefObject<HeroState>;
}) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const tubularSegments = primary ? 160 : 96;
  const outerRadius = primary ? 0.55 : 0.38;
  const outerRadialSegments = primary ? 8 : 6;
  const innerRadius = primary ? 0.18 : 0.12;
  const innerRadialSegments = primary ? 6 : 5;

  const curve = useMemo(() => buildRoutedCurve(waypoints), [waypoints]);

  const outerGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, tubularSegments, outerRadius, outerRadialSegments, false),
    [curve, tubularSegments, outerRadius, outerRadialSegments]
  );
  const innerGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, tubularSegments, innerRadius, innerRadialSegments, false),
    [curve, tubularSegments, innerRadius, innerRadialSegments]
  );

  const outerMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: COLORS.conduit, roughness: 0.5, metalness: 0.3 }), []);
  const innerMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: ADRIG_BLUE, roughness: 0.3, metalness: 0.1, emissive: new THREE.Color(ADRIG_BLUE), emissiveIntensity: 0.4 }), []);

  const portPosition = waypoints[waypoints.length - 1];

  useFrame(() => {
    const s = stateRef.current.slots[slotIndex];
    if (!s) return;
    revealTube(outerGeometry, s.cableReveal, tubularSegments, outerRadialSegments);
    revealTube(innerGeometry, s.cableReveal, tubularSegments, innerRadialSegments);
  });

  return (
    <group>
      <mesh ref={outerRef} geometry={outerGeometry} material={outerMaterial} />
      <mesh ref={innerRef} geometry={innerGeometry} material={innerMaterial} />
      {/* tower input port */}
      <mesh position={portPosition}>
        <sphereGeometry args={[primary ? 0.9 : 0.6, 12, 8]} />
        <meshStandardMaterial color={ADRIG_BLUE} emissive={new THREE.Color(ADRIG_BLUE)} emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
      <SignalPacket curve={curve} slotIndex={slotIndex} primary={primary} stateRef={stateRef} />
    </group>
  );
}
