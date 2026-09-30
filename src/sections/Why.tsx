import React from 'react';
import { content } from '../content/content';
import { Pill } from '../components/Pill';

export const Why: React.FC = () => {
  return (
    <section
      id="why"
      className="relative min-h-screen w-full flex items-center justify-end px-6 sm:px-12 md:px-16 py-24 z-10"
    >
      <div className="w-full md:max-w-xl lg:max-w-2xl">
        <Pill variant="atmosphere" className="mb-4">
          Habitable Zone
        </Pill>

        <h2 className="font-display text-3xl sm:text-5xl font-light text-cloud leading-tight mb-8">
          {content.why.heading}
        </h2>

        <div className="space-y-6">
          {content.why.points.map((point, index) => (
            <div
              key={point.title}
              className="glass-panel p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:border-atmosphere/40 group"
            >
              <div className="flex items-start gap-4">
                <span className="font-display text-2xl text-atmosphere/60 group-hover:text-atmosphere transition-colors">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-cloud mb-2 group-hover:text-atmosphere transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-mist text-sm sm:text-base leading-relaxed">
                    {point.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
