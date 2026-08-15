"use client";

import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { HeroState } from "./hero-story";
import { ADRIG_BLUE } from "./materials";

const ADRIG_BLUE_COLOR = new THREE.Color(ADRIG_BLUE);
const GLOW_COLOR = new THREE.Color("#1A6FFF");
const DORMANT_EMISSIVE = new THREE.Color("#0A1828");
const CHROME_COLOR = new THREE.Color("#8BAAC4");
const CARBON_COLOR = new THREE.Color("#0D1117");

/* --- Custom rotating halo ring shader --- */
const HALO_VERT = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const HALO_FRAG = /* glsl */ `
  uniform float uEnergy;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float r = distance(vUv, vec2(0.5));
    float ring = smoothstep(0.44, 0.47, r) * smoothstep(0.52, 0.49, r);
    float pulse = 0.6 + 0.4 * sin(uTime * 2.4 + r * 12.0);
    float alpha = ring * pulse * uEnergy * 0.9;
    gl_FragColor = vec4(${ADRIG_BLUE_COLOR.r.toFixed(4)}, ${ADRIG_BLUE_COLOR.g.toFixed(4)}, ${ADRIG_BLUE_COLOR.b.toFixed(4)}, alpha);
  }
`;

/* --- Orbit ring shader (rotating scan ring) --- */
const ORBIT_FRAG = /* glsl */ `
  uniform float uEnergy;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float r = distance(vUv, vec2(0.5));
    float ring = smoothstep(0.46, 0.48, r) * smoothstep(0.50, 0.485, r);
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float sweep = smoothstep(-3.14, 3.14, mod(angle + uTime * 1.8, 6.28) - 5.5);
    float alpha = ring * sweep * uEnergy * 0.8;
    gl_FragColor = vec4(${GLOW_COLOR.r.toFixed(4)}, ${GLOW_COLOR.g.toFixed(4)}, ${GLOW_COLOR.b.toFixed(4)}, alpha);
  }
`;

export default function AdrigTower({ stateRef }: { stateRef: MutableRefObject<HeroState> }) {
  const haloMatRef = useRef<THREE.ShaderMaterial>(null);
  const orbitMatRef = useRef<THREE.ShaderMaterial>(null);
  const crownLightRef = useRef<THREE.PointLight>(null);
  const groundLightRef = useRef<THREE.PointLight>(null);

  const texture = useTexture("/adrig-logo.svg");

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  /* --- Materials (memoised) --- */
  const carbonMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CARBON_COLOR, roughness: 0.14, metalness: 0.82 }),
    []
  );
  const panelMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#141B26", roughness: 0.20, metalness: 0.68 }),
    []
  );
  const chromeMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CHROME_COLOR, roughness: 0.08, metalness: 0.92 }),
    []
  );
  const crownMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: CHROME_COLOR,
      roughness: 0.06,
      metalness: 0.95,
      emissive: ADRIG_BLUE_COLOR,
      emissiveIntensity: 0,
    }),
    []
  );
  const glassMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: ADRIG_BLUE_COLOR,
      roughness: 0.04,
      metalness: 0.12,
      transparent: true,
      opacity: 0.72,
      emissive: ADRIG_BLUE_COLOR,
      emissiveIntensity: 0.4,
    }),
    []
  );
  const platformRingMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: ADRIG_BLUE, transparent: true, opacity: 0.22, toneMapped: false }),
    []
  );
  const logoMat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false, opacity: 0.3, color: DORMANT_EMISSIVE.clone() }),
    [texture]
  );

  const { logoWidth, logoHeight } = useMemo(() => {
    const image = texture.image as { width?: number; height?: number } | undefined;
    const aspect = image?.width && image?.height ? image.width / image.height : 340 / 124;
    const maxW = 17; let w = maxW; let h = w / aspect;
    if (h > 6.2) { h = 6.2; w = h * aspect; }
    return { logoWidth: w, logoHeight: h };
  }, [texture]);

  const haloUniforms = useMemo(() => ({ uEnergy: { value: 0 }, uTime: { value: 0 } }), []);
  const orbitUniforms = useMemo(() => ({ uEnergy: { value: 0 }, uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    const s = stateRef.current;
    const vis = s.towerVisibleEnergy;
    const glow = s.towerGlowEnergy;
    const t = clock.getElapsedTime();

    // Logo transitions from invisible/dark to bright white
    logoMat.opacity = THREE.MathUtils.lerp(0.08, 1, vis);
    logoMat.color.lerpColors(DORMANT_EMISSIVE, new THREE.Color("#FFFFFF"), vis);

    // Crown glows and pulses
    crownMat.emissiveIntensity = 2.4 * glow * (0.85 + 0.15 * Math.sin(t * 3.2));

    // Glass bands brighten
    glassMat.emissiveIntensity = THREE.MathUtils.lerp(0.35, 1.4, vis);
    glassMat.opacity = THREE.MathUtils.lerp(0.55, 0.88, vis);

    // Halo + orbit shaders
    if (haloMatRef.current) {
      haloMatRef.current.uniforms.uEnergy.value = vis;
      haloMatRef.current.uniforms.uTime.value = t;
    }
    if (orbitMatRef.current) {
      orbitMatRef.current.uniforms.uEnergy.value = vis;
      orbitMatRef.current.uniforms.uTime.value = t;
    }

    // Lights
    if (crownLightRef.current) crownLightRef.current.intensity = 80 * glow;
    if (groundLightRef.current) groundLightRef.current.intensity = THREE.MathUtils.lerp(2, 14, vis);
  });

  return (
    <group>
      {/* Reflective base platform */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <cylinderGeometry args={[30, 30, 0.8, 64]} />
        <meshStandardMaterial color="#0A0F18" roughness={0.06} metalness={0.90} />
      </mesh>

      {/* Platform ring glow */}
      <mesh position={[0, 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]} material={platformRingMat}>
        <ringGeometry args={[27.5, 28.2, 64]} />
      </mesh>

      {/* Halo disc (pulsing) */}
      <mesh position={[0, 0.88, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[62, 62]} />
        <shaderMaterial
          ref={haloMatRef}
          transparent depthWrite={false}
          uniforms={haloUniforms}
          vertexShader={HALO_VERT}
          fragmentShader={HALO_FRAG}
          toneMapped={false}
        />
      </mesh>

      {/* Orbit sweep ring */}
      <mesh position={[0, 0.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 70]} />
        <shaderMaterial
          ref={orbitMatRef}
          transparent depthWrite={false}
          uniforms={orbitUniforms}
          vertexShader={HALO_VERT}
          fragmentShader={ORBIT_FRAG}
          toneMapped={false}
        />
      </mesh>

      {/* === TOWER MASS === */}

      {/* Wide base plinth */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow material={carbonMat}>
        <boxGeometry args={[44, 4, 44]} />
      </mesh>

      {/* Lower podium */}
      <mesh position={[0, 9, 0]} castShadow receiveShadow material={panelMat}>
        <boxGeometry args={[34, 10, 34]} />
      </mesh>

      {/* Glass band on podium */}
      <mesh position={[0, 14.5, 0]} material={glassMat}>
        <boxGeometry args={[35, 1.2, 35]} />
      </mesh>

      {/* Mid shaft */}
      <mesh position={[0, 38, 0]} castShadow receiveShadow material={panelMat}>
        <boxGeometry args={[26, 46, 26]} />
      </mesh>

      {/* Glass bands on shaft */}
      <mesh position={[0, 24, 0]} material={glassMat}>
        <boxGeometry args={[27, 1.1, 27]} />
      </mesh>
      <mesh position={[0, 44, 0]} material={glassMat}>
        <boxGeometry args={[27, 1.1, 27]} />
      </mesh>
      <mesh position={[0, 60, 0]} material={glassMat}>
        <boxGeometry args={[27, 1.1, 27]} />
      </mesh>

      {/* Upper tower shaft (narrower) */}
      <mesh position={[0, 80, 0]} castShadow receiveShadow material={carbonMat}>
        <boxGeometry args={[18, 36, 18]} />
      </mesh>

      {/* Glass band mid-upper */}
      <mesh position={[0, 74, 0]} material={glassMat}>
        <boxGeometry args={[20, 1.2, 20]} />
      </mesh>
      <mesh position={[0, 92, 0]} material={glassMat}>
        <boxGeometry args={[20, 1.2, 20]} />
      </mesh>

      {/* Crown block */}
      <mesh position={[0, 104, 0]} castShadow material={crownMat}>
        <boxGeometry args={[22, 10, 22]} />
      </mesh>

      {/* Crown cap */}
      <mesh position={[0, 110, 0]} castShadow material={chromeMat}>
        <boxGeometry args={[16, 4, 16]} />
      </mesh>

      {/* Four vertical chrome fins */}
      {([ [-10, 72, 10], [10, 72, 10], [-10, 72, -10], [10, 72, -10] ] as [number, number, number][]).map(
        (pos, i) => (
          <mesh key={i} position={pos} castShadow material={chromeMat}>
            <boxGeometry args={[0.7, 96, 0.7]} />
          </mesh>
        )
      )}

      {/* Logo on front face */}
      <mesh position={[0, 96, 13.4]} material={logoMat}>
        <planeGeometry args={[logoWidth, logoHeight]} />
      </mesh>

      {/* Glow lights */}
      <pointLight
        ref={crownLightRef}
        position={[0, 108, 14]}
        color={ADRIG_BLUE}
        intensity={0}
        distance={90}
        decay={1.8}
      />
      <pointLight
        ref={groundLightRef}
        position={[0, 2, 0]}
        color="#0E5CEE"
        intensity={2}
        distance={60}
        decay={2}
      />
    </group>
  );
}
