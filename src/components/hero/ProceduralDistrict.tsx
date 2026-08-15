"use client";

import type { DistrictSlot } from "./building-recipes";
import { BUILDING_RECIPES, FOOTPRINT } from "./building-recipes";
import BuildingBlock from "./BuildingBlock";

/** One industry district: a ground platform plus its procedural building recipe. */
export default function ProceduralDistrict({ district }: { district: DistrictSlot }) {
  const recipe = BUILDING_RECIPES[district.type];
  const footprint = FOOTPRINT[district.type];

  return (
    <group position={district.position} rotation={[0, district.rotationY, 0]}>
      <mesh position={[0, 0.3, 0]} receiveShadow>
        <boxGeometry args={[footprint.width + 6, 0.6, footprint.depth + 6]} />
        <meshStandardMaterial color="#0A0F18" roughness={0.10} metalness={0.80} />
      </mesh>
      {recipe.map((spec) => (
        <BuildingBlock key={spec.id} spec={spec} />
      ))}
    </group>
  );
}
