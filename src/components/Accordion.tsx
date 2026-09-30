import React, { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpenDefault?: boolean;
  id: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpenDefault = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border-b border-glass-border py-4 transition-colors">
      <button
        id={`faq-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-ans-${id}`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-2 font-display text-lg md:text-xl text-cloud hover:text-atmosphere transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atmosphere rounded"
      >
        <span className="pr-4">{question}</span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-glass-border transition-transform duration-300 ${
            isOpen ? 'rotate-180 bg-atmosphere/20 text-atmosphere border-atmosphere/40' : 'text-mist'
          }`}
          aria-hidden="true"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-ans-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        className={`grid transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-2 pb-2' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden text-mist text-sm md:text-base leading-relaxed max-w-2xl">
          {answer}
        </div>
      </div>
    </div>
  );
};
