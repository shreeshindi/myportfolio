import { FC, ReactNode } from 'react';
import { useReveal } from './useReveal';

type PanelProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  pulse?: boolean;
};

export const Panel: FC<PanelProps> = ({ children, className = '', id, pulse }) => {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id={id}
      className={`reveal neon-panel rounded-sm p-5 md:p-6 ${pulse ? 'neon-pulse' : ''} ${className}`}
    >
      {children}
    </section>
  );
};

export const PanelLabel: FC<{ children: string }> = ({ children }) => (
  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-neon-dim">{children}</p>
);
