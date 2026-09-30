import React from 'react';
import { content } from '../content/content';
import { siteConfig } from '../site.config';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';

export const Cta: React.FC = () => {
  return (
    <section
      id="cta"
      className="relative min-h-[90vh] w-full flex flex-col justify-center items-center text-center px-6 sm:px-12 md:px-16 py-24 z-10"
    >
      <div className="max-w-2xl glass-panel p-8 sm:p-14 rounded-3xl border border-glass-border shadow-2xl backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 mb-4">
          <Pill variant="atmosphere">
            {siteConfig.homeLocation.city || "Home Base"}
          </Pill>
          <span className="text-xs text-mist font-mono">
            {siteConfig.homeLocation.lat.toFixed(2)}°N, {siteConfig.homeLocation.lon.toFixed(2)}°E
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-light text-cloud leading-tight mb-4">
          {content.cta.heading}
        </h2>

        <p className="text-mist text-lg sm:text-xl leading-relaxed mb-8">
          {content.cta.text}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {content.cta.buttons.map((btn) => (
            <Button
              key={btn.label}
              asLink
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              variant={btn.primary ? 'primary' : 'secondary'}
              size="lg"
            >
              {btn.label}
            </Button>
          ))}
        </div>

        <p className="text-xs text-mist/60 font-mono tracking-wider uppercase">
          {content.cta.note}
        </p>
      </div>
    </section>
  );
};
