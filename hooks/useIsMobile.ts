import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
  const [isMob, setIsMob] = useState(false);

  useEffect(() => {
    const q1 = window.matchMedia('(pointer: coarse)');
    const q2 = window.matchMedia('(max-width: 1024px)');
    
    const update = () => setIsMob(q1.matches || q2.matches);
    
    update();
    
    const onChange = () => update();
    
    // Modern browsers
    if (q1.addEventListener) {
      q1.addEventListener('change', onChange);
      q2.addEventListener('change', onChange);
      return () => {
        q1.removeEventListener('change', onChange);
        q2.removeEventListener('change', onChange);
      };
    } else {
      // Fallback for older browsers (though unlikely needed for this stack)
      try {
        q1.addListener(onChange);
        q2.addListener(onChange);
        return () => {
          q1.removeListener(onChange);
          q2.removeListener(onChange);
        };
      } catch (e) {
        console.error('Media query listener error', e);
      }
    }
  }, []);

  return isMob;
}
