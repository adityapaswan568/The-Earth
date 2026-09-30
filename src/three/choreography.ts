import type { SectionId } from '../state/scroll';
import { siteConfig } from '../site.config';

export interface ChoreographyTarget {
  globeX: number;
  scale: number;
  cameraDistance: number;
  focus?: { lat: number; lon: number };
  autoRotate: boolean;
  dimLevel: number;
  atmosphereStrength: number;
  specularBoost: number;
  greenTint: number;
  nightLightsBoost: number;
  cloudsOpacity: number;
  reddishTint: number;
}

export const sectionChoreography: Record<SectionId, ChoreographyTarget> = {
  hero: {
    globeX: 0.85,
    scale: 1.0,
    cameraDistance: 3.2,
    autoRotate: true,
    dimLevel: 1.0,
    atmosphereStrength: 1.0,
    specularBoost: 1.0,
    greenTint: 0.0,
    nightLightsBoost: 1.0,
    cloudsOpacity: 0.85,
    reddishTint: 0.0,
  },
  why: {
    globeX: -0.85,
    scale: 1.15,
    cameraDistance: 2.9,
    focus: { lat: 0, lon: -150 },
    autoRotate: false,
    dimLevel: 1.0,
    atmosphereStrength: 1.1,
    specularBoost: 1.4,
    greenTint: 0.0,
    nightLightsBoost: 0.6,
    cloudsOpacity: 0.85,
    reddishTint: 0.0,
  },
  layers: {
    globeX: 0.0,
    scale: 1.25,
    cameraDistance: 2.7,
    autoRotate: false,
    dimLevel: 1.0,
    atmosphereStrength: 1.0,
    specularBoost: 1.0,
    greenTint: 0.0,
    nightLightsBoost: 1.0,
    cloudsOpacity: 0.85,
    reddishTint: 0.0,
  },
  journey: {
    globeX: 0.75,
    scale: 0.95,
    cameraDistance: 3.4,
    autoRotate: true,
    dimLevel: 1.0,
    atmosphereStrength: 1.0,
    specularBoost: 1.0,
    greenTint: 0.0,
    nightLightsBoost: 1.0,
    cloudsOpacity: 0.85,
    reddishTint: 0.0,
  },
  facts: {
    globeX: -0.65,
    scale: 0.75,
    cameraDistance: 4.0,
    autoRotate: true,
    dimLevel: 0.6,
    atmosphereStrength: 0.7,
    specularBoost: 0.7,
    greenTint: 0.0,
    nightLightsBoost: 0.6,
    cloudsOpacity: 0.6,
    reddishTint: 0.0,
  },
  faq: {
    globeX: 0.65,
    scale: 0.65,
    cameraDistance: 4.5,
    autoRotate: true,
    dimLevel: 0.35,
    atmosphereStrength: 0.5,
    specularBoost: 0.5,
    greenTint: 0.0,
    nightLightsBoost: 0.4,
    cloudsOpacity: 0.4,
    reddishTint: 0.0,
  },
  about: {
    globeX: 0.0,
    scale: 0.55,
    cameraDistance: 5.0,
    autoRotate: true,
    dimLevel: 0.3,
    atmosphereStrength: 0.4,
    specularBoost: 0.4,
    greenTint: 0.0,
    nightLightsBoost: 0.3,
    cloudsOpacity: 0.3,
    reddishTint: 0.0,
  },
  cta: {
    globeX: 0.0,
    scale: 1.5,
    cameraDistance: 2.4,
    focus: { lat: siteConfig.homeLocation.lat, lon: siteConfig.homeLocation.lon },
    autoRotate: false,
    dimLevel: 1.0,
    atmosphereStrength: 1.3,
    specularBoost: 1.0,
    greenTint: 0.0,
    nightLightsBoost: 2.2,
    cloudsOpacity: 0.7,
    reddishTint: 0.0,
  },
};

export const layerTargets = [
  // Atmosphere
  {
    focus: { lat: 20, lon: 0 },
    atmosphereStrength: 2.6,
    specularBoost: 0.8,
    greenTint: 0.0,
    nightLightsBoost: 0.5,
    cloudsOpacity: 1.0,
  },
  // Oceans
  {
    focus: { lat: 0, lon: -150 },
    atmosphereStrength: 0.8,
    specularBoost: 2.5,
    greenTint: 0.0,
    nightLightsBoost: 0.2,
    cloudsOpacity: 0.4,
  },
  // Land
  {
    focus: { lat: 25, lon: 45 },
    atmosphereStrength: 0.7,
    specularBoost: 0.4,
    greenTint: 0.1,
    nightLightsBoost: 0.7,
    cloudsOpacity: 0.3,
  },
  // Life
  {
    focus: { lat: 45, lon: 15 },
    atmosphereStrength: 1.0,
    specularBoost: 1.0,
    greenTint: 0.4,
    nightLightsBoost: 2.6,
    cloudsOpacity: 0.6,
  },
];

export const journeyStepStates = [
  {
    reddishTint: 1.0,
    atmosphereStrength: 0.0,
    cloudsOpacity: 0.0,
    specularBoost: 0.0,
    greenTint: 0.0,
    nightLightsBoost: 0.0,
  },
  {
    reddishTint: 0.15,
    atmosphereStrength: 0.6,
    cloudsOpacity: 0.6,
    specularBoost: 1.5,
    greenTint: 0.0,
    nightLightsBoost: 0.0,
  },
  {
    reddishTint: 0.0,
    atmosphereStrength: 0.7,
    cloudsOpacity: 0.75,
    specularBoost: 1.2,
    greenTint: 0.2,
    nightLightsBoost: 0.0,
  },
  {
    reddishTint: 0.0,
    atmosphereStrength: 1.4,
    cloudsOpacity: 0.85,
    specularBoost: 1.1,
    greenTint: 0.25,
    nightLightsBoost: 0.0,
  },
  {
    reddishTint: 0.0,
    atmosphereStrength: 1.0,
    cloudsOpacity: 0.85,
    specularBoost: 1.0,
    greenTint: 0.0,
    nightLightsBoost: 1.6,
  },
];
