import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface AtmosphereProps {
  // Accept a ref so mutations in Earth's useFrame are always visible
  // without needing a React re-render
  strengthRef: React.MutableRefObject<number>;
}

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 viewDir = normalize(-vPosition);
    float dotNV = dot(viewDir, vNormal);
    float glow = pow(1.0 - clamp(dotNV, 0.0, 1.0), 3.2) * uIntensity;
    gl_FragColor = vec4(uColor, glow);
  }
`;

export const Atmosphere: React.FC<AtmosphereProps> = ({ strengthRef }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
    if (materialRef.current) {
      // Read directly from ref — always gets the latest value from Earth's useFrame
      materialRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uIntensity.value,
        strengthRef.current,
        0.08
      );
    }
  });

  return (
    <mesh aria-hidden="true">
      <sphereGeometry args={[1.055, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uColor: { value: new THREE.Color('#5BB0F0') },
          uIntensity: { value: strengthRef.current },
        }}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};
