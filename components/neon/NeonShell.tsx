import { FC, ReactNode } from 'react';
import { track } from '@vercel/analytics';
import { profile } from '@/data/profile';
import { TypewriterText } from './TypewriterText';

type NeonShellProps = {
  children: ReactNode;
};

export const NeonShell: FC<NeonShellProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas text-neon-soft selection:bg-neon/30 selection:text-canvas">
      <div className="neon-atmosphere" aria-hidden />
      <div className="neon-scanlines" aria-hidden />

      <header className="sticky top-0 z-30 border-b border-neon-border/60 bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="/#top"
            className="min-w-[11ch] font-display text-sm tracking-[0.2em] text-neon md:text-base"
            aria-label={profile.name}
          >
            <TypewriterText text={profile.name.toUpperCase()} speed={22} delayMs={120} />
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-6 text-xs text-neon-dim md:flex">
            <a href="/#about" className="hover:text-neon">
              About
            </a>
            <a href="/#experience" className="hover:text-neon">
              Experience
            </a>
            <a href="/#projects" className="hover:text-neon">
              Projects
            </a>
            <a href="/#skills" className="hover:text-neon">
              Skills
            </a>
            <a href="/#contact" className="hover:text-neon">
              Contact
            </a>
          </nav>
          <a
            href={profile.resumePath}
            onClick={() => track('cta_resume')}
            className="border border-cyan-300/80 bg-cyan-400 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-canvas transition-colors hover:bg-cyan-300"
          >
            Resume
          </a>
        </div>
      </header>

      <main id="top">{children}</main>
    </div>
  );
};
