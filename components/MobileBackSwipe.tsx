// components/MobileBackSwipe.tsx
import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const MIN_DISTANCE = 80;      // px required to count as a swipe
const AXIS_DOMINANCE = 1.2;   // horizontal must dominate vertical by this factor
const MAX_DURATION_MS = 1200; // swipe must be reasonably quick

const MobileBackSwipe: FC = () => {
  const router = useRouter();

  // Always-on gesture state (global listeners)
  const tracking = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  // Small visual hint; gesture works even when this is hidden
  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];

      tracking.current = true;
      startX.current = t.clientX;
      startY.current = t.clientY;
      startTime.current = performance.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking.current) return;

      const t = e.touches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;

      // If it's clearly a horizontal right swipe in progress, prevent scroll jank
      if (Math.abs(dx) > Math.abs(dy) * AXIS_DOMINANCE && dx > 12) {
        // Need non-passive to prevent default
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking.current) return;
      tracking.current = false;

      const duration = performance.now() - startTime.current;
      if (duration > MAX_DURATION_MS) return;

      const t = e.changedTouches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      const isRight = dx > MIN_DISTANCE && absDx > absDy * AXIS_DOMINANCE;
      if (isRight) {
        // Navigate back to Fun (home), start at Landing top
        router.push('/#landing-start');
      }
    };

    // Add non-passive listeners so we can preventDefault when needed
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart as any);
      window.removeEventListener('touchmove', onTouchMove as any);
      window.removeEventListener('touchend', onTouchEnd as any);
    };
  }, [router]);

  // Pure UI hint; does NOT capture touches (pointer-events: none)
  return (
    <div
      className="fixed top-4 left-3 z-[60] pointer-events-none"
      aria-hidden
    >
      {showHint && (
        <div className="flex items-center gap-2 rounded-full bg-white/12 border border-white/20 text-white px-3 py-1.5 backdrop-blur-md">
          <svg
            className="w-5 h-5 animate-nudge-right"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-sm font-medium">Back to Fun page</span>
        </div>
      )}
    </div>
  );
};

export default MobileBackSwipe;
