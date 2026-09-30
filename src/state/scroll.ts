export type SectionId = 'hero' | 'why' | 'layers' | 'journey' | 'facts' | 'faq' | 'about' | 'cta';

export interface ScrollStore {
  progress: number;
  activeSection: SectionId;
  sectionProgress: Record<SectionId, number>;
  layerIndex: number;
  layerProgress: number;
  journeyStep: number;
  journeyProgress: number;
  isDraggingHero: boolean;
  isDragging: boolean;
  heroDragDelta: { x: number; y: number };
  manualRotation: { x: number; y: number; vx: number; vy: number };
}

export const scrollState: ScrollStore = {
  progress: 0,
  activeSection: 'hero',
  sectionProgress: {
    hero: 0,
    why: 0,
    layers: 0,
    journey: 0,
    facts: 0,
    faq: 0,
    about: 0,
    cta: 0,
  },
  layerIndex: 0,
  layerProgress: 0,
  journeyStep: 0,
  journeyProgress: 0,
  isDraggingHero: false,
  isDragging: false,
  heroDragDelta: { x: 0, y: 0 },
  manualRotation: { x: 0, y: 0, vx: 0, vy: 0 },
};

type Listener<T> = (val: T) => void;

const sectionListeners = new Set<Listener<SectionId>>();
const layerListeners = new Set<Listener<number>>();
const journeyListeners = new Set<Listener<number>>();

export function setActiveSection(section: SectionId) {
  if (scrollState.activeSection !== section) {
    scrollState.activeSection = section;
    sectionListeners.forEach((fn) => fn(section));
  }
}

export function setLayerIndex(index: number) {
  if (scrollState.layerIndex !== index) {
    scrollState.layerIndex = index;
    layerListeners.forEach((fn) => fn(index));
  }
}

export function setJourneyStep(step: number) {
  if (scrollState.journeyStep !== step) {
    scrollState.journeyStep = step;
    journeyListeners.forEach((fn) => fn(step));
  }
}

export function subscribeSection(fn: Listener<SectionId>) {
  sectionListeners.add(fn);
  return () => {
    sectionListeners.delete(fn);
  };
}

export function subscribeLayer(fn: Listener<number>) {
  layerListeners.add(fn);
  return () => {
    layerListeners.delete(fn);
  };
}

export function subscribeJourney(fn: Listener<number>) {
  journeyListeners.add(fn);
  return () => {
    journeyListeners.delete(fn);
  };
}
