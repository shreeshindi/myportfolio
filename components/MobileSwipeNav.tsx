// components/MobileSwipeNav.tsx
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const MIN_DISTANCE = 80;         // px
const AXIS_DOMINANCE = 1.2;      // x must dominate y
const MAX_DURATION_MS = 1200;    // must finish within this time
const START_EDGE_RATIO = 0.55;   // start swipe from right 45% of the screen

function isMobileOrTablet(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(max-width: 1024px)").matches;
}

function isInteractive(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  const tag = el.tagName?.toLowerCase();
  if (["a", "button", "input", "textarea", "select", "label", "iframe", "video", "canvas"].includes(tag)) return true;
  if ((el as HTMLElement).isContentEditable) return true;
  if (el.closest("[data-no-swipe='true']")) return true;
  return false;
}

export default function MobileSwipeNav() {
  const router = useRouter();
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const tracking = useRef(false);
  const startTarget = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (!isMobileOrTablet()) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      // if the gate overlay is up, let it handle gestures
      if (document.getElementById("swipe-gate")) return;

      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      startTime.current = performance.now();
      startTarget.current = e.target;
      tracking.current = true;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking.current) return;
      tracking.current = false;

      // overlay check again for safety
      if (document.getElementById("swipe-gate")) return;

      if (isInteractive(startTarget.current)) return;

      const endTime = performance.now();
      const duration = endTime - startTime.current;
      if (duration > MAX_DURATION_MS) return;

      const t = e.changedTouches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Require starting on the right half (to reduce accidental triggers)
      if (startX.current < window.innerWidth * START_EDGE_RATIO) return;

      const isLeft = dx < -MIN_DISTANCE && absDx > absDy * AXIS_DOMINANCE;
      if (isLeft) {
        router.push("/pro/professional");
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchend", onTouchEnd as any);
    };
  }, [router]);

  return null;
}
