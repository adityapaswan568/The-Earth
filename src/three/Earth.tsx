import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { scrollState } from '../state/scroll';
import { sectionChoreography, layerTargets, journeyStepStates } from './choreography';
import { latLonToEuler, latLonToVector3 } from './latLon';
import { Atmosphere } from './Atmosphere';
import { siteConfig } from '../site.config';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';

const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D uDayMap;
  uniform sampler2D uNightMap;
  uniform sampler2D uSpecularMap;
  uniform vec3 uSunDirection;
  uniform float uDimLevel;
  uniform float uNightBoost;
  uniform float uSpecularBoost;
  uniform float uGreenTint;
  uniform float uReddishTint;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vPosition;

  void main() {
    vec3 dayColor = texture2D(uDayMap, vUv).rgb;
    vec3 nightColor = texture2D(uNightMap, vUv).rgb;
    float specMask = texture2D(uSpecularMap, vUv).r;

    // Reddish tint for early formation
    if (uReddishTint > 0.0) {
      vec3 molten = vec3(0.95, 0.3, 0.08) * (dayColor.r * 1.4 + 0.3);
      dayColor = mix(dayColor, molten, uReddishTint);
    }

    // Green tint for life / biosphere
    if (uGreenTint > 0.0) {
      vec3 vegetation = vec3(0.15, 0.8, 0.35) * dayColor;
      dayColor = mix(dayColor, vegetation, uGreenTint * 0.8);
    }

    vec3 norm = normalize(vWorldNormal);
    vec3 sunDir = normalize(uSunDirection);
    float sunDot = dot(norm, sunDir);

    // Day/Night smooth transition
    float dayFactor = smoothstep(-0.15, 0.25, sunDot);
    float nightFactor = 1.0 - dayFactor;

    // Specular ocean reflection
    vec3 viewDir = normalize(-vPosition);
    vec3 halfVec = normalize(sunDir + viewDir);
    float spec = pow(max(dot(norm, halfVec), 0.0), 28.0) * specMask * uSpecularBoost;
    vec3 specColor = vec3(1.0, 1.0, 1.0) * spec * dayFactor;

    // City lights on the unlit hemisphere
    vec3 nightLights = nightColor * (nightFactor * uNightBoost * 2.0);

    // Diffuse daylight and soft ambient
    vec3 ambient = dayColor * 0.05;
    vec3 diffuseDay = dayColor * max(sunDot, 0.0);

    vec3 finalColor = (diffuseDay + ambient + nightLights + specColor) * uDimLevel;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const Earth: React.FC = () => {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const { camera } = useThree();

  const globeGroupRef = useRef<THREE.Group>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);
  const earthMatRef = useRef<THREE.ShaderMaterial>(null);
  const pinRef = useRef<THREE.Group>(null);

  // Load textures using useTexture
  const [dayMap, nightMap, cloudsMap, specularMap] = useTexture([
    '/textures/earth_day.jpg',
    '/textures/earth_night.jpg',
    '/textures/earth_clouds.png',
    '/textures/earth_specular.jpg',
  ]);

  useMemo(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    nightMap.colorSpace = THREE.SRGBColorSpace;
  }, [dayMap, nightMap]);

  // Atmosphere current strength state
  const atmosphereStrengthRef = useRef(1.0);

  // Sun direction vector in world space
  const sunDirection = useMemo(() => new THREE.Vector3(5, 2.5, 4).normalize(), []);

  // Home location pin coordinates
  const pinPosition = useMemo(() => {
    return latLonToVector3(siteConfig.homeLocation.lat, siteConfig.homeLocation.lon, 1.01);
  }, []);

  const segments = isMobile ? 36 : 64;

  useFrame((_, delta) => {
    if (!globeGroupRef.current || !earthMeshRef.current || !earthMatRef.current) return;

    const currentSection = scrollState.activeSection;
    const baseTarget = sectionChoreography[currentSection] || sectionChoreography.hero;

    // Derive modifiers based on section
    let targetX = isMobile ? 0 : baseTarget.globeX;
    let targetScale = isMobile ? baseTarget.scale * 0.8 : baseTarget.scale;
    let targetCamDist = baseTarget.cameraDistance;
    let targetDim = baseTarget.dimLevel;
    let targetAtmo = baseTarget.atmosphereStrength;
    let targetSpec = baseTarget.specularBoost;
    let targetGreen = baseTarget.greenTint;
    let targetNight = baseTarget.nightLightsBoost;
    let targetClouds = baseTarget.cloudsOpacity;
    let targetReddish = baseTarget.reddishTint;
    let targetFocus = baseTarget.focus;

    if (currentSection === 'layers') {
      const layerMod = layerTargets[scrollState.layerIndex] || layerTargets[0];
      targetFocus = layerMod.focus;
      targetAtmo = layerMod.atmosphereStrength;
      targetSpec = layerMod.specularBoost;
      targetGreen = layerMod.greenTint;
      targetNight = layerMod.nightLightsBoost;
      targetClouds = layerMod.cloudsOpacity;
    } else if (currentSection === 'journey') {
      const stepMod = journeyStepStates[scrollState.journeyStep] || journeyStepStates[0];
      targetAtmo = stepMod.atmosphereStrength;
      targetSpec = stepMod.specularBoost;
      targetGreen = stepMod.greenTint;
      targetNight = stepMod.nightLightsBoost;
      targetClouds = stepMod.cloudsOpacity;
      targetReddish = stepMod.reddishTint;
    }

    atmosphereStrengthRef.current = THREE.MathUtils.lerp(
      atmosphereStrengthRef.current,
      targetAtmo,
      0.08
    );

    // Lerp position & scale
    globeGroupRef.current.position.x = THREE.MathUtils.lerp(
      globeGroupRef.current.position.x,
      targetX,
      0.08
    );
    const curScale = globeGroupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(curScale, targetScale, 0.08);
    globeGroupRef.current.scale.set(nextScale, nextScale, nextScale);

    // Lerp camera distance
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamDist, 0.08);

    // Lerp uniforms
    const uniforms = earthMatRef.current.uniforms;
    uniforms.uDimLevel.value = THREE.MathUtils.lerp(uniforms.uDimLevel.value, targetDim, 0.08);
    uniforms.uSpecularBoost.value = THREE.MathUtils.lerp(uniforms.uSpecularBoost.value, targetSpec, 0.08);
    uniforms.uGreenTint.value = THREE.MathUtils.lerp(uniforms.uGreenTint.value, targetGreen, 0.08);
    uniforms.uNightBoost.value = THREE.MathUtils.lerp(uniforms.uNightBoost.value, targetNight, 0.08);
    uniforms.uReddishTint.value = THREE.MathUtils.lerp(uniforms.uReddishTint.value, targetReddish, 0.08);

    // Lerp clouds opacity
    if (cloudsMeshRef.current) {
      const cloudsMat = cloudsMeshRef.current.material as THREE.MeshStandardMaterial;
      cloudsMat.opacity = THREE.MathUtils.lerp(cloudsMat.opacity, targetClouds, 0.08);
      // Clouds rotate slightly faster than Earth
      if (!prefersReduced) {
        cloudsMeshRef.current.rotation.y += delta * 0.04;
      }
    }

    // Rotation choreography
    // NOTE: drag & inertia respect prefers-reduced-motion, but passive
    // auto-rotation always runs (it's ambient, not interaction-triggered)
    if ((scrollState.isDragging || scrollState.isDraggingHero) && !prefersReduced) {
      // Hero drag direct rotation
      earthMeshRef.current.rotation.y = scrollState.manualRotation.y;
      earthMeshRef.current.rotation.x = scrollState.manualRotation.x;
    } else if (!prefersReduced && (Math.abs(scrollState.manualRotation.vy) > 0.0001 || Math.abs(scrollState.manualRotation.vx) > 0.0001)) {
      // Hero drag inertia release
      scrollState.manualRotation.y += scrollState.manualRotation.vy;
      scrollState.manualRotation.x += scrollState.manualRotation.vx;
      scrollState.manualRotation.vy *= 0.94;
      scrollState.manualRotation.vx *= 0.94;
      earthMeshRef.current.rotation.y = scrollState.manualRotation.y;
      earthMeshRef.current.rotation.x = scrollState.manualRotation.x;
    } else if (targetFocus) {
      // Focused orientation to lat/lon (always runs for choreography)
      const [targetRotX, targetRotY] = latLonToEuler(targetFocus.lat, targetFocus.lon);
      earthMeshRef.current.rotation.x = THREE.MathUtils.lerp(
        earthMeshRef.current.rotation.x,
        targetRotX,
        0.06
      );
      earthMeshRef.current.rotation.y = THREE.MathUtils.lerp(
        earthMeshRef.current.rotation.y,
        targetRotY,
        0.06
      );
      // keep manual rotation synchronized
      scrollState.manualRotation.x = earthMeshRef.current.rotation.x;
      scrollState.manualRotation.y = earthMeshRef.current.rotation.y;
    } else if (baseTarget.autoRotate) {
      // Constant gentle planetary spin — always on (ambient, not interaction-driven)
      earthMeshRef.current.rotation.y += delta * 0.03;
      earthMeshRef.current.rotation.x = THREE.MathUtils.lerp(
        earthMeshRef.current.rotation.x,
        0.2, // slight axial tilt
        0.04
      );
      scrollState.manualRotation.x = earthMeshRef.current.rotation.x;
      scrollState.manualRotation.y = earthMeshRef.current.rotation.y;
    }

    // Home pin display in CTA section
    if (pinRef.current) {
      const showPin = currentSection === 'cta';
      const targetPinScale = showPin ? 1 : 0;
      pinRef.current.scale.lerp(new THREE.Vector3(targetPinScale, targetPinScale, targetPinScale), 0.1);
    }
  });

  return (
    <group ref={globeGroupRef} position={[0.85, 0, 0]}>
      {/* Atmosphere Glow */}
      <Atmosphere strengthRef={atmosphereStrengthRef} />

      {/* Earth Body */}
      <mesh ref={earthMeshRef} aria-hidden="true">
        <sphereGeometry args={[1, segments, segments]} />
        <shaderMaterial
          ref={earthMatRef}
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={{
            uDayMap: { value: dayMap },
            uNightMap: { value: nightMap },
            uSpecularMap: { value: specularMap },
            uSunDirection: { value: sunDirection },
            uDimLevel: { value: 1.0 },
            uNightBoost: { value: 1.0 },
            uSpecularBoost: { value: 1.0 },
            uGreenTint: { value: 0.0 },
            uReddishTint: { value: 0.0 },
          }}
        />

        {/* Clouds Sphere */}
        <mesh ref={cloudsMeshRef} scale={[1.008, 1.008, 1.008]} aria-hidden="true">
          <sphereGeometry args={[1, segments, segments]} />
          <meshStandardMaterial
            map={cloudsMap}
            transparent
            opacity={0.85}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>

        {/* Home Base Pin Marker */}
        <group ref={pinRef} position={pinPosition} scale={[0, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#5BB0F0" />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 0.04, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.012, 16, 16]} />
            <meshBasicMaterial color="#5BB0F0" />
          </mesh>
        </group>
      </mesh>
    </group>
  );
};
