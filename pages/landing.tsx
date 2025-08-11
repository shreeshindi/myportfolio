// pages/landing.tsx
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Modal from '../components/Modal';
import SwipeOverlay from '@/components/SwipeOverlay';
import MobileSwipeNav from '@/components/MobileSwipeNav';   // <-- ADD

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

const Landing = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setModalOpen] = useState(true);
  const isMobile = useIsMobileOrTablet();

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleScrollTrigger = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll('p');
        paragraphs.forEach((p) => {
          const chars = p.textContent!.split('');
          p.innerHTML = '';
          chars.forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            p.appendChild(span);
          });
          const spans = p.querySelectorAll('span');
          gsap.set(spans, { opacity: 0 });
          gsap.to(spans, {
            opacity: 1,
            duration: 0.05,
            stagger: { each: 0.05, from: 'start' },
            scrollTrigger: {
              trigger: p,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }

      if (bgRef.current) {
        const { default: gsap2 } = await import('gsap');
        gsap2.to(bgRef.current, {
          y: '60%',
          ease: 'none',
          scrollTrigger: {
            trigger: bgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    };
    handleScrollTrigger();
  }, []);

  useEffect(() => {
    document.body.style.overflow = (!isMobile && isModalOpen) ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobile, isModalOpen]);

  return (
    <div className={cursorStyles.scope}>
      <ServerCursor />

      {/* MOBILE: full-screen gate + persistent left-swipe nav */}
      {isMobile && <SwipeOverlay />}
      {isMobile && <MobileSwipeNav />}

      {/* DESKTOP: keep existing popup */}
      {!isMobile && <Modal isOpen={isModalOpen} onClose={closeModal} />}

      <div
        id="landing"
        ref={bgRef}
        className="min-h-screen w-full bg-cover bg-center flex flex-col justify-start items-center pt-16 relative"
        style={{
          backgroundImage: "url('/image/p1.gif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

        <Head><title>Shreenidhi</title></Head>

        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="scrolldown"></div>
        </div>

        <div className="text-center mt-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 z-10 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-shadow">
            Are you looking for a good backend developer?
          </h1>
          <br />
          <div
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-4 text-shadow space-y-6 text-left mx-auto"
            ref={textRef}
          >
            <p className="mb-6">🎩 Sup. I’m Shreenidhi — I build backends that don’t break, cry, or mysteriously vanish at 3AM.</p>
            <p className="mb-6">🔧 I play around with <span className="font-bold">Spring Boot</span>, <span className="font-bold">Spring Security</span>, <span className="font-bold">Django</span>, and <span className="font-bold">FastAPI</span> like they’re LEGO sets — except these LEGO sets run your business and don’t hurt when you step on them.</p>
            <p className="mb-6">🎉 My code is clean, fast, and built to last. No spaghetti, no mystery bugs, no “it works on my machine” nonsense.</p>
            <p className="mb-6">🚀 You bring the idea, I’ll make sure it runs smooth, scales well, and stays solid long after launch.</p>
          </div>
        </div>

        <div style={{ paddingBottom: '40rem' }}></div>
      </div>
    </div>
  );
};

export default Landing;
