"use client";

import { useEffect } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { interpolateCamera, MOBILE_CAMERA, CAMERA_KEYFRAMES } from "./camera-path";

const tempPosition = new THREE.Vector3();
const tempTarget = new THREE.Vector3();

export default function HeroCamera({
  progressRef,
  isMobile,
  reducedMotion,
}: {
  progressRef: MutableRefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    if (reducedMotion) {
      const final = CAMERA_KEYFRAMES[CAMERA_KEYFRAMES.length - 1];
      camera.position.set(final.position[0], final.position[1], final.position[2]);
      camera.fov = final.fov;
      camera.lookAt(final.target[0], final.target[1], final.target[2]);
      camera.updateProjectionMatrix();
    } else if (isMobile) {
      camera.position.set(MOBILE_CAMERA.position[0], MOBILE_CAMERA.position[1], MOBILE_CAMERA.position[2]);
      camera.fov = MOBILE_CAMERA.fov;
      camera.lookAt(MOBILE_CAMERA.target[0], MOBILE_CAMERA.target[1], MOBILE_CAMERA.target[2]);
      camera.updateProjectionMatrix();
    }
  }, [camera, isMobile, reducedMotion]);

  useFrame(() => {
    if (isMobile || reducedMotion) return;
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const fov = interpolateCamera(progressRef.current, tempPosition, tempTarget);
    camera.position.copy(tempPosition);
    camera.fov = fov;
    camera.lookAt(tempTarget);
    camera.updateProjectionMatrix();
  });

  return null;
}
