// components/MobilePeekers.tsx
import { useEffect, useRef } from "react";
import styles from "@/styles/MobilePeekers.module.css";

type Side = "left" | "right";

interface Props {
  /** List of character image URLs. One will be chosen at random for each peek. */
  images?: string[];
  /** Fallback image if a listed one fails to load. */
  fallback?: string;
  /** How long a peeker stays visible (ms). */
  peekDurationMs?: number;
  /** Scroll speed threshold to trigger a peek (px/ms). Lower = more sensitive. */
  scrollSpeedThreshold?: number;
}

export default function MobilePeekers({
  images,
  fallback = "/image/cm.png",
  peekDurationMs = 1100,
  scrollSpeedThreshold = 0.25,
}: Props) {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const leftImgRef = useRef<HTMLImageElement | null>(null);
  const rightImgRef = useRef<HTMLImageElement | null>(null);

  const animating = useRef(false);
  const lastY = useRef<number>(0);
  const lastT = useRef<number>(0);

  // sanitize + ensure at least the fallback exists
  const pool = (images && images.length > 0 ? images : [fallback]).slice();

  // Preload all images once (best-effort)
  useEffect(() => {
    const unique = Array.from(new Set([...pool, fallback]));
    unique.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickRandomImage = () => {
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx] || fallback;
  };

  const setRandomTop = (el: HTMLDivElement) => {
    // keep within 15%..85% of viewport height
    const pct = 15 + Math.random() * 70;
    el.style.top = `${pct}vh`;
  };

  const triggerPeek = (side: Side) => {
    if (animating.current) return;
    animating.current = true;

    const wrapper = (side === "left" ? leftRef.current : rightRef.current) as HTMLDivElement | null;
    const imgEl = (side === "left" ? leftImgRef.current : rightImgRef.current) as HTMLImageElement | null;
    if (!wrapper || !imgEl) {
      animating.current = false;
      return;
    }

    // choose image randomly for this peek
    const chosen = pickRandomImage();
    imgEl.src = chosen;

    setRandomTop(wrapper);
    wrapper.classList.add(styles.peek);

    // retract after peekDurationMs
    window.setTimeout(() => {
      wrapper.classList.remove(styles.peek);
      animating.current = false;
    }, peekDurationMs);
  };

  useEffect(() => {
    lastY.current = window.scrollY;
    lastT.current = performance.now();
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dy = Math.abs(y - lastY.current);
      const dt = Math.max(16, now - lastT.current);
      const v = dy / dt; // px per ms

      lastY.current = y;
      lastT.current = now;

      if (v > scrollSpeedThreshold && !animating.current) {
        const side: Side = Math.random() < 0.5 ? "left" : "right";
        triggerPeek(side);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if any image fails, hard-fallback to the fallback asset
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.src !== window.location.origin + fallback && !el.src.endsWith(fallback)) {
      el.src = fallback;
    }
  };

  return (
    <div className={styles.root} aria-hidden="true">
      <div ref={leftRef} className={`${styles.peeker} ${styles.left}`}>
        <img ref={leftImgRef} src={fallback} alt="" className={styles.img} onError={handleError} />
      </div>
      <div ref={rightRef} className={`${styles.peeker} ${styles.right}`}>
        <img ref={rightImgRef} src={fallback} alt="" className={`${styles.img} ${styles.flip}`} onError={handleError} />
      </div>
    </div>
  );
}
