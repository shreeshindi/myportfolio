// pages/index.tsx
import Head from 'next/head';
import Image from 'next/image';
import Eye from '../components/Eye';
import { useState, useEffect } from 'react';
import Footer from '../funpart/Footer';
import { useRouter } from 'next/router';

// Cursor (scoped)
import ServerCursor from '@/components/ServerCursor';
import cursorStyles from '@/styles/ServerCursor.module.css';

// MOBILE helpers
import MobilePeekers from '@/components/MobilePeekers';
import MobileSwipeNav from '@/components/MobileSwipeNav';
import SwipeOverlay from '@/components/SwipeOverlay';

// Desktop popup
import Modal from '../components/Modal';

// Shared landing section (holds #landing and #landing-start)
import LandingSection from '@/components/LandingSection';

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

const Home = () => {
  const [isNearButton, setIsNearButton] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [showGif, setShowGif] = useState(false);

  // Desktop popup visibility
  const [isModalOpen, setModalOpen] = useState(true);

  const router = useRouter();
  const isMobile = useIsMobileOrTablet();

  // Keep desktop page blocked while modal is open
  useEffect(() => {
    if (!isMobile && isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isModalOpen]);

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = 'touches' in event ? event.touches[0] : (event as MouseEvent);
      const button = document.getElementById('bonkers-button');
      if (button) {
        const rect = button.getBoundingClientRect();
        const isNear =
          clientX > rect.left - 50 &&
          clientX < rect.right + 50 &&
          clientY > rect.top - 50 &&
          clientY < rect.bottom + 50;
        setIsNearButton(isNear);
      }
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove as any, { passive: true } as any);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove as any);
    };
  }, []);

  const handleMouseEnter = () => setIsButtonHovered(true);
  const handleMouseLeave = () => setIsButtonHovered(false);
  const toggleShowGif = (show: boolean) => setShowGif(show);
  const handleHireMeClick = () => router.push('/hire-me');

  return (
    <div className={cursorStyles.scope}>
      {/* Desktop only cursor */}
      {!isMobile && <ServerCursor />}

      <Head><title>My Portfolio</title></Head>

      {/* Mobile: full-screen swipe overlay + left-swipe nav; NO popup */}
      {isMobile && <SwipeOverlay />}
      {isMobile && <MobileSwipeNav />}

      {/* Desktop: keep popup */}
      {!isMobile && <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />}

      {/* Landing — do NOT wrap with an element that has id="landing" to avoid duplicate IDs */}
      <div className={`${showGif ? 'hidden' : ''}`}>
        <LandingSection />
      </div>

      {/* FUN SECTION */}
      <div
        id="fun"
        className={`min-h-screen bg-gray-100 relative flex flex-col justify-center items-center ${showGif ? 'hidden' : ''}`}
        style={{
          backgroundImage: "url('/image/p2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>

        {/* DESKTOP ONLY: PNG + Eyes */}
        {!isMobile && !isButtonHovered && (
          <>
            <Image
              src="/image/cm.png"
              alt="Your Image"
              className="absolute bottom-0 left-0 z-10 w-72 h-72"
              width={288}
              height={288}
              style={{ margin: 0, padding: 0 }}
            />
            <div
              className="absolute bottom-0 left-0 z-20 flex space-x-4"
              style={{ transform: 'translate(130px, -170px)' }}
            >
              <Eye />
              <Eye />
            </div>
          </>
        )}

        {/* MOBILE/TABLET ONLY: Peekers that slide in/out on scroll */}
        {isMobile && (
          <MobilePeekers
            images={[
              "/image/onep.png",
              "/image/shin.png",
              "/image/bean.png",
              "/image/inos.png",
              "/image/batm.png",
            ]}
            fallback="/image/shin.png"
            peekDurationMs={1200}
            scrollSpeedThreshold={0.22}
          />
        )}

        <div className="flex justify-center items-center space-x-4 relative z-10 mb-4" />

        <button
          id="bonkers-button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleHireMeClick}
          className={`text-white py-2 px-4 rounded transition-transform relative z-10 ${isNearButton ? 'animate-bonkers' : ''} ${isNearButton ? 'bg-blue-500' : 'bg-red-500'}`}
        >
          Hire me!
        </button>

        {isNearButton && (
          <iframe
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="https://www.youtube.com/embed/urLf8lLOqnQ?autoplay=1&loop=1&playlist=urLf8lLOqnQ"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        <div className="absolute top-0 left-0 w-full h-full opacity-95 z-0"></div>
      </div>

      <Footer toggleShowGif={toggleShowGif} />
    </div>
  );
};

export default Home;
