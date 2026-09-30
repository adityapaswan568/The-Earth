import React from 'react';
import { content } from '../content/content';
import { AccordionItem } from '../components/Accordion';
import { Pill } from '../components/Pill';

export const Faq: React.FC = () => {
  return (
    <section
      id="faq"
      className="relative min-h-screen w-full flex items-center justify-start px-6 sm:px-12 md:px-16 py-24 z-10"
    >
      <div className="w-full md:max-w-xl lg:max-w-2xl">
        <Pill variant="default" className="mb-4">
          Inquiries
        </Pill>

        <h2 className="font-display text-3xl sm:text-5xl font-light text-cloud leading-tight mb-8">
          Questions and answers.
        </h2>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-glass-border">
          {content.faq.map((item, idx) => (
            <AccordionItem
              key={item.q}
              id={`faq-${idx}`}
              question={item.q}
              answer={item.a}
              isOpenDefault={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
