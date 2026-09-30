import React, { useEffect, useState } from 'react';
import { content } from '../content/content';
import { Button } from '../components/Button';
import { type SectionId, subscribeSection } from '../state/scroll';

export const Nav: React.FC = () => {
  const [active, setActive] = useState<SectionId>('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return subscribeSection((section) => setActive(section));
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className="glass-nav rounded-full px-4 py-2 flex items-center gap-3 sm:gap-6 shadow-2xl pointer-events-auto border border-cloud/10"
      >
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2 text-cloud hover:text-atmosphere transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atmosphere rounded-full pr-1"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-atmosphere animate-pulse" />
          <span className="font-display font-medium text-sm tracking-wide">Earth</span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1 text-xs sm:text-sm text-mist">
          {content.nav.map((item) => {
            const sectionName = item.href.replace('#', '');
            const isActive = active === sectionName;
            return (
              <li key={item.label}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cloud font-medium bg-cloud/10 shadow-sm'
                      : 'hover:text-cloud hover:bg-cloud/5'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right CTA */}
        <div className="flex items-center gap-2">


          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-1.5 text-mist hover:text-cloud rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atmosphere"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed top-20 inset-x-4 glass-nav rounded-2xl p-4 flex flex-col gap-2 pointer-events-auto border border-cloud/10 shadow-2xl">
          {content.nav.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-left px-3 py-2 rounded-lg text-cloud hover:bg-cloud/10 text-sm font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
