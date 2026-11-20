import { FC } from 'react';

type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const IconDownload: FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19.5h16" />
  </svg>
);

export const IconMail: FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M4 6h16v12H4z" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const IconExternal: FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const IconLinkedIn: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zM8 8h3.8v2.05h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.77 2.65 4.77 6.1V23h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23H8V8z" />
  </svg>
);

export const IconGitHub: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.87 1.25 1.87 1.25 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.67-.31-5.48-1.34-5.48-5.96 0-1.32.47-2.4 1.24-3.24-.12-.31-.54-1.58.12-3.3 0 0 1.01-.32 3.3 1.23a11.43 11.43 0 0 1 6.01 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.72.24 2.99.12 3.3.77.84 1.23 1.92 1.23 3.24 0 4.63-2.81 5.64-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5z" />
  </svg>
);
