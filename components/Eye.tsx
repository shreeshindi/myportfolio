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

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!eye || !pupil) return;

      const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = clientX - eyeCenterX;
      const deltaY = clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      const maxDistance = 10;
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

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.eye} ref={eyeRef}>
      <div className={styles.pupil} ref={pupilRef}></div>
    </div>
  );
};

export default Eye;
