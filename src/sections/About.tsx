import React from 'react';
import { content } from '../content/content';
import { Pill } from '../components/Pill';
import { Button } from '../components/Button';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full flex justify-center px-6 sm:px-12 md:px-16 py-24 z-10"
    >
      <div className="w-full max-w-3xl glass-panel p-8 sm:p-12 rounded-3xl text-center flex flex-col items-center">
        <Pill variant="atmosphere" className="mb-4">
          The Builder
        </Pill>

        <h2 className="font-display text-3xl sm:text-4xl font-light text-cloud leading-tight mb-6">
          {content.about.heading}
        </h2>

        <p className="text-mist text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
          {content.about.body}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {content.about.links.map((link) => (
            <Button
              key={link.label}
              asLink
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
            >
              {link.label}
              <svg className="w-3.5 h-3.5 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
