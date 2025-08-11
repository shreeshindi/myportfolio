// pages/landing.tsx
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import SwipeOverlay from '@/components/SwipeOverlay';
import MobileSwipeNav from '@/components/MobileSwipeNav';
import LandingSection from '@/components/LandingSection';

// Cursor (scoped)
import ServerCursor from '@/components/ServerCursor';
import cursorStyles from '@/styles/ServerCursor.module.css';

function useIsMobileOrTablet(): boolean {
  const [isMob, setIsMob] = useState(false);
  useEffect(() => {
    const q1 = window.matchMedia('(pointer: coarse)');
    const q2 = window.matchMedia('(max-width: 1024px)');
    const update = () => setIsMob(q1.matches || q2.matches);
    update();
    const onChange = () => update();
    if ((q1 as any).addEventListener) {
      q1.addEventListener('change', onChange);
      q2.addEventListener('change', onChange);
      return () => {
        q1.removeEventListener('change', onChange);
        q2.removeEventListener('change', onChange);
      };
    } else {
      q1.addListener(onChange);
      q2.addListener(onChange);
      return () => {
        q1.removeListener(onChange);
        q2.removeListener(onChange);
      };
    }
  }, []);
  return isMob;
}

const LandingPage = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const isMobile = useIsMobileOrTablet();
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    document.body.style.overflow = (!isMobile && isModalOpen) ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobile, isModalOpen]);

  return (
    <div className={cursorStyles.scope}>
      {/* Desktop only */}
      {!isMobile && <ServerCursor />}

      {/* MOBILE: full-screen gate + persistent left-swipe nav */}
      {isMobile && <SwipeOverlay />}
      {isMobile && <MobileSwipeNav />}

      {/* DESKTOP: keep existing popup */}
      {!isMobile && <Modal isOpen={isModalOpen} onClose={closeModal} />}

      <LandingSection />
    </div>
  );
};

export default LandingPage;
