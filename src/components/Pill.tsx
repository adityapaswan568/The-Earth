import React from 'react';

interface PillProps {
  children: React.ReactNode;
  variant?: 'atmosphere' | 'canopy' | 'continent' | 'default';
  className?: string;
}

export const Pill: React.FC<PillProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantStyles = {
    default: 'border-glass-border bg-glass text-mist',
    atmosphere: 'border-atmosphere/30 bg-atmosphere/10 text-atmosphere',
    canopy: 'border-canopy/30 bg-canopy/10 text-emerald-400',
    continent: 'border-continent/30 bg-continent/10 text-amber-300',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tracking-wide uppercase ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
