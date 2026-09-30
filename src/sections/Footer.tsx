import React from 'react';
import { content } from '../content/content';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full border-t border-glass-border bg-abyss py-12 px-6 sm:px-12 md:px-16 z-10 text-mist text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-medium text-cloud text-base mb-1">
            {content.footer.left}
          </p>
          <p className="text-xs text-mist/70">
            {content.footer.credits}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
          {content.footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-mist hover:text-atmosphere transition-colors"
            >
              {link.label}
            </a>
          ))}
          <span className="text-cloud/40">© {content.footer.year}</span>
        </div>
      </div>
    </footer>
  );
};
