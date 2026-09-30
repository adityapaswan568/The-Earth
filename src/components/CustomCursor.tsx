import React, { useEffect, useRef } from 'react';
import { scrollState } from '../state/scroll';

/**
 * CustomCursor
 * - Small precise dot that follows mouse exactly
 * - Larger ring that lerps behind with smooth lag
 * - Ring expands + changes colour while dragging the globe
 * - Ring inverts on hoverable elements (links, buttons, [data-cursor-hover])
 * - Hides the native OS cursor site-wide
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Detect touch-primary devices — no cursor needed on mobile/tablet
  const isTouchDevice =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice) return; // nothing to do on touch devices

    // Hide native cursor globally (desktop only)
    document.documentElement.style.cursor = 'none';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnter = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };
    const onMouseLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    // Track hover over interactive elements
    const onPointerOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, [role="button"], [data-cursor-hover], label, input, select, textarea')) {
        isHovering = true;
      }
    };
    const onPointerOut = (e: PointerEvent) => {
      const el = e.relatedTarget as HTMLElement | null;
      if (!el || !el.closest('a, button, [role="button"], [data-cursor-hover], label, input, select, textarea')) {
        isHovering = false;
      }
    };

    const tick = () => {
      // Smooth lerp for ring
      const lerpFactor = 0.12;
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;

      const isDragging = scrollState.isDragging || scrollState.isDraggingHero;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        dotRef.current.style.background = isDragging
          ? 'rgba(91,176,240,0.95)'
          : isHovering
            ? '#ffffff'
            : 'rgba(91,176,240,0.9)';
        dotRef.current.style.width  = isHovering ? '6px'  : '5px';
        dotRef.current.style.height = isHovering ? '6px'  : '5px';
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

        const size   = isDragging ? '52px' : isHovering ? '40px' : '28px';
        const border = isDragging
          ? '1.5px solid rgba(91,176,240,0.7)'
          : isHovering
            ? '1.5px solid rgba(255,255,255,0.8)'
            : '1.5px solid rgba(91,176,240,0.45)';
        const bg = isDragging
          ? 'rgba(91,176,240,0.08)'
          : isHovering
            ? 'rgba(255,255,255,0.06)'
            : 'transparent';

        ringRef.current.style.width  = size;
        ringRef.current.style.height = size;
        ringRef.current.style.border = border;
        ringRef.current.style.background = bg;
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout',  onPointerOut,  { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = '';
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout',  onPointerOut);
    };
  }, []);

  const base: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 99999,
    willChange: 'transform',
    transition: 'width 0.18s ease, height 0.18s ease, background 0.18s ease, border 0.18s ease',
  };

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Precise dot */}
      <div
        ref={dotRef}
        style={{
          ...base,
          width: '5px',
          height: '5px',
          background: 'rgba(91,176,240,0.9)',
          boxShadow: '0 0 6px rgba(91,176,240,0.7)',
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width: '28px',
          height: '28px',
          border: '1.5px solid rgba(91,176,240,0.45)',
          backdropFilter: 'blur(0px)',
        }}
      />
    </>
  );
};
