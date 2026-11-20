import { FC, useEffect, useState } from 'react';

type TypewriterTextProps = {
  text: string;
  className?: string;
  speed?: number;
  delayMs?: number;
  showCursor?: boolean;
};

export const TypewriterText: FC<TypewriterTextProps> = ({
  text,
  className = '',
  speed = 28,
  delayMs = 200,
  showCursor = true,
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
    <span className={className}>
      <span>{shown}</span>
      {showCursor && (
        <span
          className={
            done
              ? 'neon-cursor'
              : 'inline-block h-[0.95em] w-[0.5ch] translate-y-[0.05em] bg-neon align-baseline'
          }
          aria-hidden
        />
      )}
    </span>
  );
};
