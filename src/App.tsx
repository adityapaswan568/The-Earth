import React, { useEffect, useRef } from 'react';
import { CustomCursor } from './components/CustomCursor';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Scene } from './three/Scene';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Why } from './sections/Why';
import { Layers } from './sections/Layers';
import { Journey } from './sections/Journey';
import { Facts } from './sections/Facts';
import { Faq } from './sections/Faq';
import { About } from './sections/About';
import { Cta } from './sections/Cta';
import { Footer } from './sections/Footer';

import {
  type SectionId,
  scrollState,
  setActiveSection,
  setLayerIndex,
  setJourneyStep,
} from './state/scroll';
import { useReducedMotion } from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    if (!prefersReduced) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // Clean up ticker on unmount
      return () => {
        gsap.ticker.remove(updateTicker);
        lenis.destroy();
      };
    }
  }, [prefersReduced]);

  useEffect(() => {
    const sections: SectionId[] = [
      'hero',
      'why',
      'layers',
      'journey',
      'facts',
      'faq',
      'about',
      'cta',
    ];

    const triggers: ScrollTrigger[] = [];

    // Overall scroll progress
    const globalTrigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });
    triggers.push(globalTrigger);

    // Section triggers
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => {
          scrollState.activeSection = id;
          setActiveSection(id);
        },
        onEnterBack: () => {
          scrollState.activeSection = id;
          setActiveSection(id);
        },
        onUpdate: (self) => {
          scrollState.sectionProgress[id] = self.progress;
        },
      });
      triggers.push(st);
    });

    // Layers Sub-trigger: advances layerIndex (0 to 3) as user scrolls across layers section
    const layersEl = document.getElementById('layers');
    if (layersEl) {
      const layerSt = ScrollTrigger.create({
        trigger: layersEl,
        start: 'top 40%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          scrollState.layerProgress = self.progress;
          const idx = Math.min(3, Math.floor(self.progress * 4));
          scrollState.layerIndex = idx;
          setLayerIndex(idx);
        },
      });
      triggers.push(layerSt);
    }

    // Journey Sub-trigger: advances journeyStep (0 to 4) as user scrolls across journey section
    const journeyEl = document.getElementById('journey');
    if (journeyEl) {
      const journeySt = ScrollTrigger.create({
        trigger: journeyEl,
        start: 'top 40%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          scrollState.journeyProgress = self.progress;
          const step = Math.min(4, Math.floor(self.progress * 5));
          scrollState.journeyStep = step;
          setJourneyStep(step);
        },
      });
      triggers.push(journeySt);
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-deep-ocean text-cloud">
      {/* Custom Cursor — sits above everything */}
      <CustomCursor />

      {/* 3D Earth Canvas Background */}
      <Scene />

      {/* Floating Top Nav */}
      <Nav />

      {/* Main Scrollable Content */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <Why />
        <Layers />
        <Journey />
        <Facts />
        <Faq />
        <About />
        <Cta />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
