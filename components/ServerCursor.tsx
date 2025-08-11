// components/ServerCursor.tsx
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/ServerCursor.module.css";

/**
 * Server-rack cursor with blinking LEDs.
 * Safe against null refs, StrictMode double effects, and duplicate mounts.
 * Works on mouse + touch. Pointer-events: none (won't block clicks).
 */
export default function ServerCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // visual states
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  // smooth follow
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // timeouts + pointer type
  const hideTimeout = useRef<number | null>(null);
  const lastPointerType = useRef<"mouse" | "touch" | "pen" | "unknown">("unknown");

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return; // guard first render

    // Prevent duplicates: if another #server-cursor-root exists, hide this one and bail.
    const existing = document.getElementById("server-cursor-root");
    if (existing && existing !== el) {
      el.style.display = "none";
      return;
    }
    // Claim the singleton id for this instance.
    el.id = "server-cursor-root";
    el.style.display = ""; // ensure visible if previously hidden

    // Initialize position to center
    target.current.x = window.innerWidth / 2;
    target.current.y = window.innerHeight / 2;
    pos.current.x = target.current.x;
    pos.current.y = target.current.y;

    // Set initial transform safely
    el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

    const handlePointerMove = (e: PointerEvent) => {
      lastPointerType.current = (e.pointerType as any) || "mouse";
      const isTouch = lastPointerType.current === "touch";

      let x = e.clientX;
      let y = e.clientY;

      // offset so it doesn't sit under the finger
      if (isTouch) {
        x += 24;
        y -= 48;
      }

      target.current.x = x;
      target.current.y = y;

      setVisible(true);

      if (hideTimeout.current) {
        window.clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
      // auto-hide after inactivity (useful on touch)
      hideTimeout.current = window.setTimeout(() => setVisible(false), 1400);
    };

    const handlePointerDown = () => {
      setActive(true);
      setVisible(true);
      if (hideTimeout.current) {
        window.clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
    };

    const handlePointerUp = () => {
      setActive(false);
      if (lastPointerType.current === "touch") {
        if (hideTimeout.current) window.clearTimeout(hideTimeout.current);
        hideTimeout.current = window.setTimeout(() => setVisible(false), 400);
      }
    };

    const handlePointerLeave = () => {
      if (lastPointerType.current === "mouse") setVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);

    const loop = () => {
      const k = 0.18; // smoothing factor
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      pos.current.x += dx * k;
      pos.current.y += dy * k;

      const tiltX = Math.max(-8, Math.min(8, -dy * 0.06));
      const tiltY = Math.max(-8, Math.min(8, dx * 0.06));

      // ref could be nulled during hot reload; guard each frame
      const node = rootRef.current;
      if (node) {
        node.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("mouseleave", handlePointerLeave);
      if (hideTimeout.current) window.clearTimeout(hideTimeout.current);
      // do not remove the element id; next mount will check and handle duplicates
    };
  }, []);

  const cls = [
    styles.cursorRoot,
    visible ? styles.visible : styles.hidden,
    active ? styles.active : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={cls} aria-hidden="true" role="presentation">
      <div className={styles.serverCard}>
        <div className={styles.vent} />
        <div className={styles.bays}>
          <div className={styles.bay} />
          <div className={styles.bay} />
          <div className={styles.bay} />
        </div>
        <div className={styles.lights}>
          <span className={`${styles.led} ${styles.ledRed}`} />
          <span className={`${styles.led} ${styles.ledAmber}`} />
          <span className={`${styles.led} ${styles.ledGreen}`} />
        </div>
      </div>
      <div className={styles.glow} />
    </div>
  );
}
