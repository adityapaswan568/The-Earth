import React, { useState, useEffect } from 'react';
import { content } from '../content/content';
import { Pill } from '../components/Pill';
import { scrollState, setLayerIndex, subscribeLayer } from '../state/scroll';

export const Layers: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState(0);

  useEffect(() => {
    return subscribeLayer((idx) => setSelectedLayer(idx));
  }, []);

  const handleSelect = (idx: number) => {
    setSelectedLayer(idx);
    scrollState.layerIndex = idx;
    setLayerIndex(idx);
  };

  const activeItem = content.layers.items[selectedLayer];

  return (
    <section
      id="layers"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-16 py-24 z-10"
    >
      <div className="max-w-xl md:max-w-2xl">
        <Pill variant="canopy" className="mb-4">
          Planetary Anatomy
        </Pill>

        <h2 className="font-display text-3xl sm:text-5xl font-light text-cloud leading-tight mb-4">
          {content.layers.heading}
        </h2>

        <p className="text-mist text-base sm:text-lg mb-8">
          {content.layers.intro}
        </p>

        {/* Layer Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {content.layers.items.map((item, idx) => {
            const isActive = selectedLayer === idx;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(idx)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atmosphere ${
                  isActive
                    ? 'bg-atmosphere text-abyss font-semibold shadow-[0_0_16px_rgba(91,176,240,0.35)]'
                    : 'glass-panel text-mist hover:text-cloud hover:border-atmosphere/40'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Selected Layer Info Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-glass-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 rounded-full bg-atmosphere animate-pulse" />
            <h3 className="font-display text-2xl font-medium text-cloud">
              {activeItem.name}
            </h3>
          </div>
          <p className="text-mist text-base sm:text-lg leading-relaxed">
            {activeItem.text}
          </p>
        </div>
      </div>
    </section>
  );
};
