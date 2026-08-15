/**
 * Cinematic building recipes — slim glass towers, not cartoon blocks.
 * High-rise architectural language: narrow footprint, tall shafts,
 * blue-glass curtain walls, chrome fins, emissive crowns.
 * Every number is pure data — BuildingBlock/ProceduralDistrict read it.
 */

export const WORLD = {
  width: 320,
  depth: 300,
  groundY: 0,
  cableY: 1.1,
  towerPosition: [0, 0, 0] as [number, number, number],
};

export type Vec3 = [number, number, number];

export type IndustryType =
  | "healthcare"
  | "finance"
  | "retail"
  | "logistics"
  | "manufacturing"
  | "mobility"
  | "energy"
  | "technology";

export type DistrictSlot = {
  slot: number;
  role: "primary" | "supporting";
  type: IndustryType;
  label: string;
  position: Vec3;
  rotationY: number;
};

export const DISTRICT_SLOTS: DistrictSlot[] = [
  { slot: 0, role: "primary",    type: "healthcare",    label: "Healthcare",    position: [-62, 0,  52],  rotationY: 0 },
  { slot: 1, role: "supporting", type: "finance",       label: "FinTech",       position: [-100, 0,  8],  rotationY: Math.PI / 18 },
  { slot: 2, role: "supporting", type: "retail",        label: "Retail",        position: [-82, 0, -58],  rotationY: Math.PI / 12 },
  { slot: 3, role: "supporting", type: "logistics",     label: "Logistics",     position: [-28, 0, -96],  rotationY: -Math.PI / 24 },
  { slot: 4, role: "supporting", type: "manufacturing", label: "Manufacturing", position: [38, 0, -92],   rotationY: Math.PI / 20 },
  { slot: 5, role: "supporting", type: "mobility",      label: "Railways",      position: [92, 0, -44],   rotationY: -Math.PI / 14 },
  { slot: 6, role: "supporting", type: "energy",        label: "Energy",        position: [100, 0,  24],  rotationY: -Math.PI / 18 },
  { slot: 7, role: "supporting", type: "technology",    label: "Technology",    position: [62, 0,  68],   rotationY: Math.PI / 16 },
];

export type PrimitiveType = "box" | "cylinder" | "plane" | "wedge" | "roundedBox";
export type MaterialKey = "carbon" | "panel" | "chrome" | "glass" | "glowPanel" | "dark" | "ivory";

export type BlockSpec = {
  id: string;
  primitive: PrimitiveType;
  size?: Vec3;
  radius?: number;
  height?: number;
  radialSegments?: number;
  position: Vec3;
  rotation?: Vec3;
  material: MaterialKey;
};

/* ============================================================== healthcare
   Cruciform glass hospital tower with rooftop helipad beacon ring */
export const HEALTHCARE_BLOCKS: BlockSpec[] = [
  { id: "base",         primitive: "box",      size: [30, 3, 26],   position: [0, 1.5, 0],     material: "carbon" },
  { id: "podium",       primitive: "box",      size: [24, 8, 20],   position: [0, 7, 0],        material: "panel" },
  { id: "main-shaft",   primitive: "box",      size: [14, 52, 12],  position: [-2, 36, 0],      material: "panel" },
  { id: "wing-shaft",   primitive: "box",      size: [8, 38, 16],   position: [8, 27, 0],       material: "carbon" },
  { id: "glass-band-1", primitive: "box",      size: [15, 1.2, 13], position: [-2, 18, 0],      material: "glass" },
  { id: "glass-band-2", primitive: "box",      size: [15, 1.2, 13], position: [-2, 32, 0],      material: "glass" },
  { id: "glass-band-3", primitive: "box",      size: [15, 1.2, 13], position: [-2, 48, 0],      material: "glass" },
  { id: "atrium",       primitive: "box",      size: [10, 14, 10],  position: [0, 15, 8],       material: "glass" },
  { id: "crown",        primitive: "box",      size: [10, 6, 10],   position: [-2, 66, 0],      material: "chrome" },
  { id: "helipad",      primitive: "cylinder", radius: 6, height: 0.6, radialSegments: 48, position: [-2, 69.3, 0], material: "dark" },
  { id: "beacon-ring",  primitive: "cylinder", radius: 5.5, height: 0.3, radialSegments: 48, position: [-2, 69.65, 0], material: "glowPanel" },
  { id: "mast",         primitive: "cylinder", radius: 0.4, height: 10, position: [-2, 75, 0],  material: "chrome" },
];

/* ================================================================= finance
   Three-slab stepped skyscraper cluster with glass spire */
export const FINANCE_BLOCKS: BlockSpec[] = [
  { id: "base",         primitive: "box",      size: [28, 4, 24],   position: [0, 2, 0],        material: "carbon" },
  { id: "podium",       primitive: "box",      size: [22, 10, 18],  position: [0, 9, 0],        material: "panel" },
  { id: "shaft-left",   primitive: "box",      size: [6, 62, 14],   position: [-8, 45, 0],      material: "panel" },
  { id: "shaft-centre", primitive: "box",      size: [8, 80, 14],   position: [0, 54, 0],       material: "carbon" },
  { id: "shaft-right",  primitive: "box",      size: [6, 50, 14],   position: [8, 39, 0],       material: "panel" },
  { id: "glass-l-1",   primitive: "box",      size: [6.5, 1, 14.5], position: [-8, 22, 0],     material: "glass" },
  { id: "glass-l-2",   primitive: "box",      size: [6.5, 1, 14.5], position: [-8, 44, 0],     material: "glass" },
  { id: "glass-c-1",   primitive: "box",      size: [8.5, 1, 14.5], position: [0, 28, 0],      material: "glass" },
  { id: "glass-c-2",   primitive: "box",      size: [8.5, 1, 14.5], position: [0, 56, 0],      material: "glass" },
  { id: "glass-c-3",   primitive: "box",      size: [8.5, 1, 14.5], position: [0, 76, 0],      material: "glass" },
  { id: "crown",        primitive: "box",      size: [6, 8, 6],     position: [0, 98, 0],       material: "chrome" },
  { id: "spire",        primitive: "cylinder", radius: 0.5, height: 18, position: [0, 112, 0],  material: "glowPanel" },
];

/* ================================================================== retail
   Low horizontal pavilion with glass canopy and rooftop garden boxes */
export const RETAIL_BLOCKS: BlockSpec[] = [
  { id: "base",         primitive: "box",      size: [36, 3, 24],   position: [0, 1.5, 0],     material: "carbon" },
  { id: "main",         primitive: "box",      size: [32, 16, 18],  position: [0, 11, 0],      material: "panel" },
  { id: "tower",        primitive: "box",      size: [10, 38, 10],  position: [-10, 29, -2],   material: "carbon" },
  { id: "glass-lobby",  primitive: "box",      size: [16, 12, 4],   position: [4, 10, 11],     material: "glass" },
  { id: "canopy",       primitive: "box",      size: [36, 0.8, 8],  position: [0, 17.4, 12],   material: "chrome" },
  { id: "glass-t-1",   primitive: "box",      size: [10.5, 1, 10.5], position: [-10, 20, -2], material: "glass" },
  { id: "glass-t-2",   primitive: "box",      size: [10.5, 1, 10.5], position: [-10, 36, -2], material: "glass" },
  { id: "crown",        primitive: "box",      size: [8, 4, 8],     position: [-10, 50, -2],   material: "chrome" },
  { id: "garden-1",     primitive: "box",      size: [8, 2, 5],     position: [8, 20, -4],     material: "dark" },
  { id: "garden-2",     primitive: "box",      size: [6, 2, 5],     position: [14, 20, -4],    material: "dark" },
];

/* =============================================================== logistics
   Wide industrial complex — low shed + tall control tower */
export const LOGISTICS_BLOCKS: BlockSpec[] = [
  { id: "base",         primitive: "box",      size: [44, 3, 30],   position: [0, 1.5, 0],     material: "carbon" },
  { id: "shed",         primitive: "box",      size: [40, 14, 24],  position: [0, 10, 0],      material: "panel" },
  { id: "control",      primitive: "box",      size: [10, 44, 10],  position: [-14, 32, 0],    material: "carbon" },
  { id: "glass-c-1",   primitive: "box",      size: [10.5, 1, 10.5], position: [-14, 16, 0],  material: "glass" },
  { id: "glass-c-2",   primitive: "box",      size: [10.5, 1, 10.5], position: [-14, 30, 0],  material: "glass" },
  { id: "glass-c-3",   primitive: "box",      size: [10.5, 1, 10.5], position: [-14, 46, 0],  material: "glowPanel" },
  { id: "glass-shed",  primitive: "box",      size: [40, 1, 24],   position: [0, 17.5, 0],    material: "glass" },
  { id: "dock-canopy",  primitive: "box",      size: [30, 0.6, 6],  position: [4, 14.6, 15],   material: "chrome" },
  { id: "crane-arm",    primitive: "box",      size: [0.8, 0.8, 20], position: [-14, 57, 4],   material: "chrome" },
  { id: "crane-mast",   primitive: "cylinder", radius: 0.5, height: 12, position: [-14, 62, 4], material: "glowPanel" },
];

/* ============================================================ manufacturing
   Factory complex — barrel vault hall + twin chimneys with glow rings */
export const MANUFACTURING_BLOCKS: BlockSpec[] = [
  { id: "base",         primitive: "box",      size: [42, 3, 32],   position: [0, 1.5, 0],     material: "carbon" },
  { id: "hall",         primitive: "box",      size: [36, 20, 26],  position: [-2, 13, 0],     material: "panel" },
  { id: "annex",        primitive: "box",      size: [12, 12, 18],  position: [18, 9, 1],      material: "carbon" },
  { id: "glass-hall",  primitive: "box",      size: [36, 1, 26],   position: [-2, 23.5, 0],   material: "glass" },
  { id: "glass-h-2",   primitive: "box",      size: [36, 1, 26],   position: [-2, 13, 0],     material: "glass" },
  { id: "chimney-1",    primitive: "cylinder", radius: 1.6, height: 26, position: [-12, 36, -6], material: "dark" },
  { id: "chimney-2",    primitive: "cylinder", radius: 1.6, height: 20, position: [-4, 33, -6],  material: "dark" },
  { id: "glow-ring-1",  primitive: "cylinder", radius: 2.2, height: 0.5, radialSegments: 32, position: [-12, 49.5, -6], material: "glowPanel" },
  { id: "glow-ring-2",  primitive: "cylinder", radius: 2.2, height: 0.5, radialSegments: 32, position: [-4, 43.5, -6],  material: "glowPanel" },
  { id: "access-glass", primitive: "box",      size: [12, 10, 2.5], position: [-2, 8, 14],     material: "glass" },
];

/* ================================================================ mobility
   Rail station — thin horizontal terminal with glass wave canopy */
export const MOBILITY_BLOCKS: BlockSpec[] = [
  { id: "base",         primitive: "box",      size: [46, 3, 28],   position: [0, 1.5, 0],     material: "carbon" },
  { id: "terminal",     primitive: "box",      size: [40, 12, 18],  position: [0, 9, -2],      material: "panel" },
  { id: "control",      primitive: "box",      size: [10, 28, 10],  position: [-14, 22, -2],   material: "carbon" },
  { id: "glass-ctrl",  primitive: "box",      size: [10.5, 1, 10.5], position: [-14, 14, -2], material: "glass" },
  { id: "glass-ctrl2", primitive: "box",      size: [10.5, 1, 10.5], position: [-14, 26, -2], material: "glowPanel" },
  { id: "canopy",       primitive: "box",      size: [44, 0.8, 16], position: [0, 12.8, 10],   material: "chrome" },
  { id: "glass-term",  primitive: "box",      size: [40, 1, 18],   position: [0, 15.5, -2],   material: "glass" },
  { id: "rail-1",       primitive: "box",      size: [0.3, 0.2, 48], position: [-5, 0.3, 18],  material: "glowPanel" },
  { id: "rail-2",       primitive: "box",      size: [0.3, 0.2, 48], position: [5, 0.3, 18],   material: "glowPanel" },
  { id: "platform",     primitive: "box",      size: [12, 0.5, 46], position: [0, 0.45, 18],   material: "dark" },
];

/* ================================================================== energy
   Power plant — cylindrical reactors + lattice mast with glowing halo */
export const ENERGY_BLOCKS: BlockSpec[] = [
  { id: "base",         primitive: "box",      size: [36, 3, 30],   position: [0, 1.5, 0],     material: "carbon" },
  { id: "core",         primitive: "box",      size: [18, 22, 18],  position: [0, 14, 0],      material: "panel" },
  { id: "pod-left",     primitive: "cylinder", radius: 5.5, height: 16, radialSegments: 24, position: [-13, 11, 0], material: "carbon" },
  { id: "pod-right",    primitive: "cylinder", radius: 5.5, height: 16, radialSegments: 24, position: [13, 11, 0],  material: "carbon" },
  { id: "ring-l",       primitive: "cylinder", radius: 6.2, height: 0.6, radialSegments: 32, position: [-13, 6, 0],  material: "glowPanel" },
  { id: "ring-r",       primitive: "cylinder", radius: 6.2, height: 0.6, radialSegments: 32, position: [13, 6, 0],   material: "glowPanel" },
  { id: "ring-l2",      primitive: "cylinder", radius: 6.2, height: 0.6, radialSegments: 32, position: [-13, 16, 0], material: "glass" },
  { id: "ring-r2",      primitive: "cylinder", radius: 6.2, height: 0.6, radialSegments: 32, position: [13, 16, 0],  material: "glass" },
  { id: "glass-core",  primitive: "box",      size: [18, 1, 18],   position: [0, 25.5, 0],    material: "glass" },
  { id: "control",      primitive: "box",      size: [12, 10, 8],   position: [0, 33, -2],     material: "carbon" },
  { id: "mast",         primitive: "cylinder", radius: 0.7, height: 22, position: [0, 52, -2],  material: "chrome" },
  { id: "halo",         primitive: "cylinder", radius: 4.5, height: 0.4, radialSegments: 48, position: [0, 63, -2], material: "glowPanel" },
  { id: "solar-1",      primitive: "box",      size: [10, 0.4, 6],  position: [-9, 26, -10],   rotation: [-0.2, 0, 0], material: "glass" },
  { id: "solar-2",      primitive: "box",      size: [10, 0.4, 6],  position: [9, 26, -10],    rotation: [-0.2, 0, 0], material: "glass" },
];

/* =============================================================== technology
   Twin slender towers bridged by a glass skybridge + antenna cluster */
export const TECHNOLOGY_BLOCKS: BlockSpec[] = [
  { id: "base",         primitive: "box",      size: [32, 3, 26],   position: [0, 1.5, 0],     material: "carbon" },
  { id: "podium",       primitive: "box",      size: [26, 8, 20],   position: [0, 7, 0],       material: "panel" },
  { id: "tower-left",   primitive: "box",      size: [8, 66, 16],   position: [-9, 41, 0],     material: "carbon" },
  { id: "tower-right",  primitive: "box",      size: [8, 50, 16],   position: [9, 33, 0],      material: "panel" },
  { id: "glass-l-1",   primitive: "box",      size: [8.5, 1, 16.5], position: [-9, 18, 0],    material: "glass" },
  { id: "glass-l-2",   primitive: "box",      size: [8.5, 1, 16.5], position: [-9, 36, 0],    material: "glass" },
  { id: "glass-l-3",   primitive: "box",      size: [8.5, 1, 16.5], position: [-9, 58, 0],    material: "glowPanel" },
  { id: "glass-r-1",   primitive: "box",      size: [8.5, 1, 16.5], position: [9, 18, 0],     material: "glass" },
  { id: "glass-r-2",   primitive: "box",      size: [8.5, 1, 16.5], position: [9, 38, 0],     material: "glowPanel" },
  { id: "skybridge",    primitive: "box",      size: [10, 4, 8],    position: [0, 30, 0],      material: "glass" },
  { id: "crown-l",      primitive: "box",      size: [6, 5, 6],     position: [-9, 77, 0],     material: "chrome" },
  { id: "crown-r",      primitive: "box",      size: [6, 4, 6],     position: [9, 59, 0],      material: "chrome" },
  { id: "antenna-1",    primitive: "cylinder", radius: 0.5, height: 16, position: [-9, 90, 0],  material: "glowPanel" },
  { id: "antenna-2",    primitive: "cylinder", radius: 0.4, height: 10, position: [9, 72, 2],   material: "chrome" },
];

export const BUILDING_RECIPES: Record<IndustryType, BlockSpec[]> = {
  healthcare:    HEALTHCARE_BLOCKS,
  finance:       FINANCE_BLOCKS,
  retail:        RETAIL_BLOCKS,
  logistics:     LOGISTICS_BLOCKS,
  manufacturing: MANUFACTURING_BLOCKS,
  mobility:      MOBILITY_BLOCKS,
  energy:        ENERGY_BLOCKS,
  technology:    TECHNOLOGY_BLOCKS,
};

/** Footprint (width/depth) per industry, used to size the ground platform. */
export const FOOTPRINT: Record<IndustryType, { width: number; depth: number }> = {
  healthcare:    { width: 30, depth: 26 },
  finance:       { width: 28, depth: 24 },
  retail:        { width: 36, depth: 24 },
  logistics:     { width: 44, depth: 30 },
  manufacturing: { width: 42, depth: 32 },
  mobility:      { width: 46, depth: 28 },
  energy:        { width: 36, depth: 30 },
  technology:    { width: 32, depth: 26 },
};

/** Mobile shows only 4 fully detailed supporting buildings + healthcare. */
export const MOBILE_VISIBLE_SLOTS = [0, 1, 5, 6, 7];
