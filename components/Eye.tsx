// components/Eye.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/Eye.module.css';

const Eye = () => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;

    const handleMouseMove = (event: MouseEvent) => {
      if (!eye || !pupil) return;

      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = event.clientX - eyeCenterX;
      const deltaY = event.clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Limit the distance to avoid unnatural behavior
      const maxDistance = 10; // Adjusted to a smaller distance for realism
      const distance = Math.min(maxDistance, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      gsap.to(pupil, {
        x: pupilX,
        y: pupilY,
        duration: 0.1,
      });
    };

    const handleMouseLeave = () => {
      if (!pupil) return;

      gsap.to(pupil, {
        x: 0,
        y: 0,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.eye} ref={eyeRef}>
      <div className={styles.pupil} ref={pupilRef}></div>
    </div>
  );
};

export default Eye;
