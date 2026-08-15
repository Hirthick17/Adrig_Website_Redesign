import * as THREE from "three";
import type { Vec3 } from "./building-recipes";

/**
 * Routed cable paths, one per district slot (index-aligned with
 * DISTRICT_SLOTS). Straight segments with rounded elbows — never a loose
 * Catmull-Rom cable, never an arrow.
 */
export const CABLE_ROUTES: Vec3[][] = [
  [
    [-40, 8, 52], [-40, 1.1, 52], [-28, 1.1, 52], [-28, 1.1, 22],
    [-14.4, 1.1, 22], [-14.4, 1.1, 13.8], [-14.4, 33, 13.8],
  ],
  [
    [-83, 12, 8], [-83, 1.1, 8], [-58, 1.1, 8], [-14.4, 1.1, 7], [-14.4, 22, 7],
  ],
  [
    [-62, 7, -52], [-62, 1.1, -52], [-46, 1.1, -52], [-46, 1.1, -7],
    [-14.4, 1.1, -7], [-14.4, 18, -7],
  ],
  [
    [-28, 7, -79], [-28, 1.1, -79], [-28, 1.1, -58], [-7, 1.1, -58],
    [-7, 1.1, -14.4], [-7, 26, -14.4],
  ],
  [
    [38, 9, -74], [38, 1.1, -74], [38, 1.1, -54], [7, 1.1, -54],
    [7, 1.1, -14.4], [7, 31, -14.4],
  ],
  [
    [72, 8, -44], [72, 1.1, -44], [52, 1.1, -44], [52, 1.1, -7],
    [14.4, 1.1, -7], [14.4, 36, -7],
  ],
  [
    [80, 8, 24], [80, 1.1, 24], [58, 1.1, 24], [58, 1.1, 7],
    [14.4, 1.1, 7], [14.4, 41, 7],
  ],
  [
    [43, 8, 58], [43, 1.1, 58], [32, 1.1, 58], [32, 1.1, 30],
    [7, 1.1, 30], [7, 1.1, 13.8], [7, 46, 13.8],
  ],
];

/**
 * Turns a polyline of waypoints into a THREE.CurvePath of straight
 * LineCurve3 segments joined by rounded QuadraticBezierCurve3 elbows, per
 * the corner-rounding formula in the spec.
 */
export function buildRoutedCurve(waypoints: Vec3[]): THREE.CurvePath<THREE.Vector3> {
  const path = new THREE.CurvePath<THREE.Vector3>();
  const points = waypoints.map((p) => new THREE.Vector3(...p));
  if (points.length < 2) return path;

  const cornerEntry: THREE.Vector3[] = [points[0]];
  const cornerExit: THREE.Vector3[] = [points[0]];

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const inVec = new THREE.Vector3().subVectors(prev, curr);
    const lenIn = inVec.length();
    const dIn = inVec.clone().normalize();

    const outVec = new THREE.Vector3().subVectors(next, curr);
    const lenOut = outVec.length();
    const dOut = outVec.clone().normalize();

    const r = Math.min(2.4, 0.45 * lenIn, 0.45 * lenOut);
    const entry = curr.clone().addScaledVector(dIn, r);
    const exit = curr.clone().addScaledVector(dOut, r);

    cornerEntry.push(entry);
    cornerExit.push(exit);
  }
  cornerEntry.push(points[points.length - 1]);
  cornerExit.push(points[points.length - 1]);

  for (let i = 0; i < points.length - 1; i++) {
    const segStart = i === 0 ? cornerExit[0] : cornerExit[i];
    const segEnd = cornerEntry[i + 1];
    path.add(new THREE.LineCurve3(segStart, segEnd));

    if (i < points.length - 2) {
      path.add(new THREE.QuadraticBezierCurve3(cornerEntry[i + 1], points[i + 1], cornerExit[i + 1]));
    }
  }

  return path;
}

/** Tower input "port" — the top of each cable's final waypoint. */
export function routePortPosition(waypoints: Vec3[]): Vec3 {
  return waypoints[waypoints.length - 1];
}
