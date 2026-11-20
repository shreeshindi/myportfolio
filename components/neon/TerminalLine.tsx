import { FC, useEffect, useState } from 'react';

type TerminalLineProps = {
  text: string;
  className?: string;
  /** Delay before typing starts (ms). */
  delayMs?: number;
  /** Characters per second. */
  speed?: number;
};

export const TerminalLine: FC<TerminalLineProps> = ({
  text,
  className = '',
  delayMs = 400,
  speed = 42,
}) => {
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(text);
      setDone(true);
      return;
    }

    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, 1000 / speed);
    }, delayMs);

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delayMs, speed]);

  return (
    <p className={`font-mono text-sm text-neon md:text-base ${className}`}>
      <span className="text-neon-dim">$ </span>
      <span>{shown}</span>
      <span className={done ? 'neon-cursor' : 'inline-block h-[1.05em] w-[0.55ch] bg-neon align-text-bottom'} />
    </p>
  );
};
