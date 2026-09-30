import React, { useState, useEffect } from 'react';
import { content } from '../content/content';
import { Pill } from '../components/Pill';
import { scrollState, setJourneyStep, subscribeJourney } from '../state/scroll';

export const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return subscribeJourney((step) => setActiveStep(step));
  }, []);

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    scrollState.journeyStep = stepIndex;
    setJourneyStep(stepIndex);
  };

  return (
    <section
      id="journey"
      className="relative min-h-screen w-full flex items-center justify-start px-6 sm:px-12 md:px-16 py-24 z-10"
    >
      <div className="w-full md:max-w-xl lg:max-w-2xl">
        <Pill variant="continent" className="mb-4">
          Deep Time
        </Pill>

        <h2 className="font-display text-3xl sm:text-5xl font-light text-cloud leading-tight mb-10">
          {content.journey.heading}
        </h2>

        {/* Vertical Timeline */}
        <div className="relative pl-8 space-y-6 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-glass-border">
          {content.journey.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => handleStepClick(idx)}
                className={`group relative cursor-pointer transition-all duration-300 p-5 rounded-2xl ${
                  isActive
                    ? 'glass-panel border-atmosphere/50 bg-atmosphere/5 shadow-[0_0_25px_rgba(91,176,240,0.15)]'
                    : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Node icon */}
                <div
                  className={`absolute -left-[30px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'bg-atmosphere border-atmosphere scale-125 shadow-[0_0_12px_rgba(91,176,240,0.8)]'
                      : 'bg-deep-ocean border-mist/40 group-hover:border-cloud'
                  }`}
                >
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-abyss" />}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3
                    className={`font-display text-xl font-medium transition-colors ${
                      isActive ? 'text-atmosphere' : 'text-cloud group-hover:text-atmosphere'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <span className="text-xs text-mist font-medium tracking-wide">
                    {step.subtitle}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-mist leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
