import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Earth } from './Earth';
import { useIsMobile } from '../hooks/useIsMobile';
import { scrollState } from '../state/scroll';

export const Scene: React.FC = () => {
  const isMobile = useIsMobile();
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    scrollState.isDragging = true;
    scrollState.isDraggingHero = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    scrollState.manualRotation.y += dx * 0.005;
    scrollState.manualRotation.x += dy * 0.005;
    // Clamp vertical tilt so globe doesn't flip upside-down
    scrollState.manualRotation.x = Math.max(-0.8, Math.min(0.8, scrollState.manualRotation.x));
    scrollState.manualRotation.vy = dx * 0.005;
    scrollState.manualRotation.vx = dy * 0.005;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    scrollState.isDragging = false;
    scrollState.isDraggingHero = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen overflow-hidden bg-deep-ocean [cursor:none] [@media(pointer:coarse)]:cursor-auto"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 40 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        className="w-full h-full"
      >
        {/* Subtle Ambient Light for Dark Side */}
        <ambientLight intensity={0.06} />

        {/* Directional Sun Light */}
        <directionalLight
          position={[5, 2.5, 4]}
          intensity={2.2}
          color="#ffffff"
        />

        {/* Background Starfield */}
        <Stars
          radius={100}
          depth={60}
          count={isMobile ? 1200 : 2500}
          factor={3.5}
          saturation={0}
          fade
          speed={0.4}
        />

        {/* The Earth Model — Suspense MUST be inside Canvas so texture loading
            doesn't unmount the entire WebGL context */}
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
};
