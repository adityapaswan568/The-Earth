import React from 'react';
import { content } from '../content/content';
import { Pill } from '../components/Pill';

export const Facts: React.FC = () => {
  return (
    <section
      id="facts"
      className="relative min-h-screen w-full flex items-center justify-end px-6 sm:px-12 md:px-16 py-24 z-10"
    >
      <div className="w-full md:max-w-xl lg:max-w-2xl">
        <Pill variant="atmosphere" className="mb-4">
          Orbital Perspective
        </Pill>

        <h2 className="font-display text-3xl sm:text-5xl font-light text-cloud leading-tight mb-8">
          {content.facts.heading}
        </h2>

        <div className="grid gap-6">
          {content.facts.items.map((fact, index) => (
            <div
              key={fact.title}
              className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-atmosphere/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-atmosphere text-lg font-medium">0{index + 1}</span>
                <h3 className="font-display text-xl font-medium text-cloud">
                  {fact.title}
                </h3>
              </div>
              <p className="text-mist text-sm sm:text-base leading-relaxed">
                {fact.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
