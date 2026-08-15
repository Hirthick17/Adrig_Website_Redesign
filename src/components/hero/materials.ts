/**
 * Cinematic dark palette — carbon towers, electric blue glass, chrome trims.
 * High metalness + low roughness = reflective, premium, non-cartoon.
 */
export const ADRIG_BLUE = "#0E5CEE";

export const COLORS = {
  carbon:   "#0D1117",   // primary building mass — near-black
  panel:    "#141B26",   // facade / secondary volumes
  chrome:   "#8BAAC4",   // trim rings, fins, structural frames
  glass:    ADRIG_BLUE,  // emissive blue glass — brand
  glow:     "#1A6FFF",   // inner glow / lit windows
  ground:   "#070B10",   // reflective ground plane
  dormant:  "#253651",   // unlit elements
  conduit:  "#1C3050",   // cable / connector color
};

export type MaterialKey =
  | "carbon"
  | "panel"
  | "chrome"
  | "glass"
  | "glowPanel"
  | "dark"
  | "ivory";

export const MATERIAL_PROPS: Record<
  MaterialKey,
  {
    color: string;
    roughness: number;
    metalness: number;
    transparent?: boolean;
    opacity?: number;
    emissive?: string;
    emissiveIntensity?: number;
  }
> = {
  carbon:    { color: COLORS.carbon,  roughness: 0.14, metalness: 0.82 },
  panel:     { color: COLORS.panel,   roughness: 0.20, metalness: 0.68 },
  chrome:    { color: COLORS.chrome,  roughness: 0.08, metalness: 0.92 },
  glass:     { color: COLORS.glass,   roughness: 0.05, metalness: 0.10, transparent: true, opacity: 0.78, emissive: COLORS.glass, emissiveIntensity: 0.55 },
  glowPanel: { color: COLORS.glow,    roughness: 0.04, metalness: 0.12, transparent: true, opacity: 0.65, emissive: COLORS.glow,  emissiveIntensity: 1.1 },
  dark:      { color: COLORS.dormant, roughness: 0.22, metalness: 0.60 },
  ivory:     { color: COLORS.chrome,  roughness: 0.10, metalness: 0.80 },
};
