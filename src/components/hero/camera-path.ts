import * as THREE from "three";
import { smoothstep01 } from "./hero-story";

/**
 * Cinematic camera path — low angle, telephoto compression (narrow FOV),
 * dramatic slow push toward the tower.
 * Start: ground-level heroic angle. End: elevated pull-out reveal.
 */
export const CAMERA_KEYFRAMES = [
  // Start: wide low angle — you're looking UP at the tower
  { progress: 0,    position: [10, 28, 210],  target: [0, 60, 0],   fov: 34 },
  // Story A: slow push-in, camera settles mid-height
  { progress: 0.18, position: [6, 32, 198],   target: [-6, 55, 4],  fov: 32 },
  // Story B: lower + slight arc right (healthcare district comes into frame)
  { progress: 0.48, position: [-8, 24, 192],  target: [0, 58, 0],   fov: 31 },
  // Story C: slow pull left, network revealed
  { progress: 0.78, position: [12, 30, 196],  target: [0, 62, 0],   fov: 32 },
  // Resolution: slow pull back, full city silhouette
  { progress: 1,    position: [0, 44, 218],   target: [0, 64, 0],   fov: 34 },
] as const;

/* Mobile: static dramatic angle biased right so tower clears left-aligned text */
export const MOBILE_CAMERA = {
  position: [-80, 36, 240] as [number, number, number],
  target: [20, 54, 0] as [number, number, number],
  fov: 44,
};

const TEMP_CAMERA_END = new THREE.Vector3();
const TEMP_TARGET_END = new THREE.Vector3();

/**
 * Interpolates camera position/target/fov between surrounding keyframes.
 * Allocation-free — pass reusable output vectors.
 */
export function interpolateCamera(
  progress: number,
  outputPosition: THREE.Vector3,
  outputTarget: THREE.Vector3
) {
  let index = 0;
  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    if (progress >= CAMERA_KEYFRAMES[i].progress && progress <= CAMERA_KEYFRAMES[i + 1].progress) {
      index = i;
      break;
    }
  }
  const from = CAMERA_KEYFRAMES[index];
  const to = CAMERA_KEYFRAMES[Math.min(index + 1, CAMERA_KEYFRAMES.length - 1)];
  const span = Math.max(0.0001, to.progress - from.progress);
  const local = smoothstep01((progress - from.progress) / span);

  outputPosition
    .set(from.position[0], from.position[1], from.position[2])
    .lerp(TEMP_CAMERA_END.set(to.position[0], to.position[1], to.position[2]), local);
  outputTarget
    .set(from.target[0], from.target[1], from.target[2])
    .lerp(TEMP_TARGET_END.set(to.target[0], to.target[1], to.target[2]), local);
  return THREE.MathUtils.lerp(from.fov, to.fov, local);
}
