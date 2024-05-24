// components/Eye.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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

      const pupilMovement = 15; // Adjust this value for pupil movement radius

      gsap.to(pupil, {
        x: Math.cos(angle) * pupilMovement,
        y: Math.sin(angle) * pupilMovement,
        duration: 0.1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="eye" ref={eyeRef}>
      <div className="pupil" ref={pupilRef}></div>
    </div>
  );
};

export default Eye;
