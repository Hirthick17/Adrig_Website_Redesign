"use client";

import { Suspense } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import type { HeroState } from "./hero-story";
import HeroCamera from "./HeroCamera";
import CityScene from "./CityScene";

export default function HeroCanvas({
  progressRef,
  stateRef,
  bubbleRefs,
  isMobile,
  reducedMotion,
}: {
  progressRef: MutableRefObject<number>;
  stateRef: MutableRefObject<HeroState>;
  bubbleRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      className="!absolute inset-0 !h-full !w-full"
      style={{ pointerEvents: "none" }}
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.25] : [1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 32, 200], fov: 34, near: 0.1, far: 700 }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.35;
      }}
    >
      <Suspense fallback={null}>
        {/* --- Cinematic dark lighting rig --- */}

        {/* Ambient: near-black — let emissive/lights do the work */}
        <ambientLight intensity={0.06} />

        {/* Cold rim from upper-left — creates dramatic edge highlights on towers */}
        <directionalLight
          position={[-120, 220, 80]}
          intensity={1.8}
          color="#B8D0F0"
          castShadow={!isMobile}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-200}
          shadow-camera-right={200}
          shadow-camera-top={200}
          shadow-camera-bottom={-200}
          shadow-camera-near={10}
          shadow-camera-far={500}
        />

        {/* Warm fill from ground — bounced light from the platform */}
        <pointLight position={[0, -8, 0]} intensity={1.2} color="#1A3060" distance={180} decay={2} />

        {/* Electric blue key from below-front — the "AI power source" feel */}
        <pointLight position={[0, 18, 60]} intensity={2.8} color="#0E5CEE" distance={220} decay={1.8} />

        {/* Right fill — prevents complete black-out on right side */}
        <pointLight position={[180, 80, 60]} intensity={0.9} color="#8BAAC4" distance={280} decay={2} />

        <HeroCamera progressRef={progressRef} isMobile={isMobile} reducedMotion={reducedMotion} />
        <CityScene
          progressRef={progressRef}
          stateRef={stateRef}
          bubbleRefs={bubbleRefs}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

        {/* --- Post-processing --- */}
        {!reducedMotion && (
          <EffectComposer>
            {/* Bloom — makes emissive glass glow through */}
            <Bloom
              luminanceThreshold={0.55}
              luminanceSmoothing={0.08}
              intensity={isMobile ? 0.9 : 1.6}
              mipmapBlur
            />
            {/* Vignette — cinematic dark corners */}
            <Vignette
              eskil={false}
              offset={0.18}
              darkness={isMobile ? 0.5 : 0.72}
            />
            {/* Subtle film grain — adds texture / realness */}
            <Noise
              premultiply
              blendFunction={BlendFunction.ADD}
              opacity={0.022}
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
