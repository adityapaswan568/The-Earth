import React, { useRef } from 'react';
import { content } from '../content/content';
import { Button } from '../components/Button';
import { scrollState } from '../state/scroll';
import { useLivePopulation } from '../hooks/useLivePopulation';

export const Hero: React.FC = () => {
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const livePopulation = useLivePopulation(1000);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    scrollState.isDraggingHero = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    scrollState.manualRotation.y += dx * 0.005;
    scrollState.manualRotation.x += dy * 0.005;
    scrollState.manualRotation.vy = dx * 0.005;
    scrollState.manualRotation.vx = dy * 0.005;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    scrollState.isDraggingHero = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const scrollToWhy = () => {
    const el = document.getElementById('why');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between px-5 sm:px-12 md:px-16 pt-24 sm:pt-32 pb-8 sm:pb-12 z-10"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Invisible drag surface */}
      <div className="absolute inset-0 pointer-events-auto" />

      {/* Main Hero Content */}
      <div className="relative pointer-events-none max-w-xl md:max-w-2xl mt-8 sm:mt-12 md:mt-20">
        {/* Badge */}

        {/* Headline — scales gracefully from 375px → desktop */}
        <h1 className="font-display text-[2rem] leading-[1.1] sm:text-6xl md:text-7xl font-normal tracking-tight text-cloud mb-4 sm:mb-6 drop-shadow-lg">
          {content.hero.headline}
        </h1>

        {/* Subtext — hidden on very small phones to save space */}
        <p className="hidden xs:block text-mist text-base sm:text-xl font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg">
          {content.hero.subtext}
        </p>
        {/* Shorter version for tiny screens */}
        <p className="xs:hidden text-mist text-sm leading-relaxed mb-6">
          {content.hero.subtext}
        </p>

        <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
          <Button size="lg" variant="primary" onClick={scrollToWhy}>
            {content.hero.button}
            <svg className="w-4 h-4 ml-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Bottom Hero Bar */}
      <div className="relative pointer-events-none flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pt-6 sm:pt-12 border-t border-cloud/10">

        {/* Live population counter */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {/* Number shrinks on mobile so the 13-digit string doesn't overflow */}
            <p className="font-display text-2xl sm:text-3xl md:text-4xl text-cloud font-light tabular-nums leading-none">
              {livePopulation}
            </p>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-widest uppercase bg-green-500/15 text-green-400 border border-green-500/25 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-mist">
            {content.hero.stat}
          </p>
        </div>

        {/* Scroll hint */}
        <div className="flex items-center gap-2 text-xs text-mist tracking-widest uppercase shrink-0">
          <span className="inline-block animate-bounce">↓</span>
          <span>{content.hero.scrollHint}</span>
        </div>
      </div>
    </section>
  );
};
