// components/SwipeOverlay.tsx
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const MIN_DISTANCE = 80;
const AXIS_DOMINANCE = 1.2;
const MAX_DURATION_MS = 1200;
const FUDGE = 32; // px: arrive slightly before the top so animations start after

const SwipeOverlay: FC = () => {
  const [visible, setVisible] = useState(true);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const tracking = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (visible) {
      const prevHtml = document.documentElement.style.overflow;
      const prevBody = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prevHtml;
        document.body.style.overflow = prevBody;
      };
    }
  }, [visible]);

  const scrollToLandingTopPrecise = () => {
    const el =
      document.getElementById("landing-start") ||
      document.getElementById("landing");

    if (!el) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const rect = el.getBoundingClientRect();
    const absoluteTop = Math.floor(rect.top + window.pageYOffset);
    const targetY = Math.max(0, absoluteTop - FUDGE);

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const goProfessional = () => {
    setVisible(false);
    setTimeout(() => router.push("/pro/professional"), 50);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    startX.current = t.clientX;
    startY.current = t.clientY;
    startTime.current = performance.now();
    tracking.current = true;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (tracking.current) e.preventDefault();
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!tracking.current) return;
    tracking.current = false;
    const duration = performance.now() - startTime.current;
    if (duration > MAX_DURATION_MS) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - startX.current;
    const dy = t.clientY - startY.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    const isLeft = dx < -MIN_DISTANCE && absDx > absDy * AXIS_DOMINANCE;
    const isUp = dy < -MIN_DISTANCE && absDy > absDx * AXIS_DOMINANCE;

    if (isLeft) {
      goProfessional();
      return;
    }
    if (isUp) {
      setVisible(false);
      // wait a tick so overflow unlocks
      requestAnimationFrame(() => setTimeout(scrollToLandingTopPrecise, 50));
      return;
    }
  };

  if (!visible) return null;

  return (
    <div
      id="swipe-gate"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="w-full h-full flex flex-col items-center justify-between text-white select-none">
        <div className="w-full flex items-center justify-between px-6 pt-8">
          <div className="flex items-center gap-3">
            <svg className="w-10 h-10 md:w-14 md:h-14 animate-nudge-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <div className="text-lg md:text-2xl font-bold">Swipe Left</div>
          </div>
          <div className="text-right text-sm md:text-base opacity-80">
            Go to <span className="font-semibold">Professional</span>
          </div>
        </div>

        <div className="text-center px-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Choose your path</h2>
          <p className="text-sm md:text-base opacity-90">
            Swipe <span className="font-semibold">Up</span> for <span className="font-semibold">Fun</span> •
            Swipe <span className="font-semibold">Left</span> for <span className="font-semibold">Professional</span>
          </p>
        </div>

        <div className="w-full flex flex-col items-center pb-10">
          <svg className="w-12 h-12 md:w-16 md:h-16 animate-nudge-up mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 12l6-6 6 6" />
            <path d="M12 6v12" />
          </svg>
          <div className="text-lg md:text-2xl font-bold">Swipe Up</div>
          <div className="text-sm md:text-base opacity-80">
            Start at <span className="font-semibold">Landing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeOverlay;
