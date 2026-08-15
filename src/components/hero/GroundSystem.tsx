"use client";

import { Grid } from "@react-three/drei";
import { WORLD } from "./building-recipes";

export default function GroundSystem({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <group>
      {/* Dark reflective ground plane — near-black with high metalness */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <planeGeometry args={[WORLD.width, WORLD.depth]} />
        <meshStandardMaterial color="#070B10" roughness={0.08} metalness={0.82} />
      </mesh>

      {/* Neon blue grid — subtle electric lines on the dark ground */}
      {!isMobile && (
        <Grid
          args={[WORLD.width, WORLD.depth]}
          position={[0, 0.015, 0]}
          cellSize={8}
          cellThickness={0.28}
          cellColor="#0E5CEE"
          sectionSize={32}
          sectionThickness={0.55}
          sectionColor="#1A6FFF"
          fadeDistance={220}
          fadeStrength={2.4}
          infiniteGrid={false}
        />
      )}
    </group>
  );
}
