// pages/hire-me.tsx
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import TiltCard from '@/components/TiltCard';
import GlitchTitle from '@/components/GlitchTitle';
import ParticleBackground from '@/components/ParticleBackground';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useMotionPermission } from '@/hooks/useMotionPermission';
import { useMousePosition } from '@/hooks/useMousePosition';

type Theme = {
  name: string;
  bgClass: string;
  tintClass: string;
  buttonClass: string;
  buttonHoverClass: string;
};

const THEMES: Theme[] = [
  {
    name: 'sunset',
    bgClass: 'bg-gradient-to-br from-rose-500 via-fuchsia-600 to-indigo-700',
    tintClass: 'bg-white/10',
    buttonClass: 'bg-black text-white',
    buttonHoverClass: 'hover:bg-gray-800',
  },
  {
    name: 'ocean',
    bgClass: 'bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-600',
    tintClass: 'bg-white/10',
    buttonClass: 'bg-black text-white',
    buttonHoverClass: 'hover:bg-gray-800',
  },
  {
    name: 'midnight',
    bgClass: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800',
    tintClass: 'bg-white/10',
    buttonClass: 'bg-white text-black',
    buttonHoverClass: 'hover:opacity-90',
  },
  {
    name: 'mango',
    bgClass: 'bg-gradient-to-br from-amber-400 via-orange-500 to-pink-600',
    tintClass: 'bg-black/10',
    buttonClass: 'bg-black text-white',
    buttonHoverClass: 'hover:bg-gray-800',
  },
];

const HEADLINES = ['CONNECT', 'SAY HI', 'PING ME', "LET'S TALK", 'YO!'];

const HireMe = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [headline, setHeadline] = useState<string>('CONNECT');
  const [theme, setTheme] = useState<Theme>(THEMES[0]);

  const isCoarse = useIsMobile();
  const { motionAllowed, requestIOSMotion, isIOS } = useMotionPermission(isCoarse);
  const { cursorRef, cursorInnerRef, cursorVariant, cursorEmoji } = useMousePosition(isCoarse);

  // ---------- Randomize ----------
  useEffect(() => {
    const images = [
      '/image/dev1.webp',
      '/image/dev2.webp',
      '/image/dev3.webp',
      '/image/dev4.webp',
      '/image/dev5.webp',
    ];
    setSelectedImage(images[Math.floor(Math.random() * images.length)]);
    setHeadline(HEADLINES[Math.floor(Math.random() * HEADLINES.length)]);
    setTheme(THEMES[Math.floor(Math.random() * THEMES.length)]);
  }, []);

  const containerStyle = useMemo<React.CSSProperties>(() => ({}), []);

  return (
    <div
      id="hireme-root"
      className={`min-h-screen ${theme.bgClass} relative overflow-hidden text-white hireme-root`}
      style={containerStyle}
    >
      <Head><title>Hire Me</title></Head>

      {/* Grid overlay + tint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,.22) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,.22) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          mixBlendMode: 'overlay',
        }}
      />
      <div className={`absolute inset-0 ${theme.tintClass}`} />

      {/* Content: safe-area padding so it doesn't touch top/bottom on phones */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 safe-py">

        <GlitchTitle headline={headline} />

        {/* iOS motion permission button (only when needed) */}
        {isCoarse && isIOS &&
          !motionAllowed &&
          typeof (DeviceOrientationEvent as any)?.requestPermission === 'function' && (
            <button
              onClick={requestIOSMotion}
              className="mt-5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm backdrop-blur hover:bg-white/20 transition"
            >
              Enable Motion
            </button>
          )}

        <TiltCard
          selectedImage={selectedImage}
          theme={theme}
          isCoarse={isCoarse}
          motionAllowed={motionAllowed}
        />

        <p className="mt-8 text-sm text-white/80">Tip: Reload — the vibe changes each time.</p>
      </div>

      <ParticleBackground isCoarse={isCoarse} />

      {/* Desktop-only custom cursor */}
      {!isCoarse && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 z-[9999] pointer-events-none"
          style={{ transform: 'translate(-100px, -100px)' }}
        >
          <div
            ref={cursorInnerRef}
            className={`transition-transform duration-120 ease-out will-change-transform ${cursorVariant === 'emoji' ? 'text-2xl' : ''}`}
            style={{
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
            }}
          >
            {cursorVariant === 'emoji' && <span>{cursorEmoji}</span>}
            {cursorVariant === 'dot' && (
              <div style={{ width: 10, height: 10, background: 'white', borderRadius: '999px', outline: '2px solid rgba(255,255,255,.5)' }} />
            )}
            {cursorVariant === 'ring' && (
              <div
                style={{
                  width: 32, height: 32, borderRadius: '999px',
                  border: '2px solid rgba(255,255,255,.85)',
                  boxShadow: '0 0 0 4px rgba(255,255,255,.15)',
                  backdropFilter: 'blur(2px)',
                }}
              />
            )}
            {cursorVariant === 'blob' && (
              <div
                className="animate-[blobPulse_3s_ease-in-out_infinite]"
                style={{
                  width: 28, height: 28,
                  borderRadius: '20% 80% 70% 30% / 30% 30% 70% 70%',
                  background: 'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,.9), rgba(255,255,255,.3), rgba(255,255,255,.9))',
                  mixBlendMode: 'screen',
                  boxShadow: '0 8px 30px rgba(255,255,255,.25)',
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx global>{`
        /* Desktop only: hide system cursor (we render our own). */
        @media (pointer: fine) {
          #hireme-root, #hireme-root * { cursor: none !important; }
        }

        /* Safe-area + top/bottom breathing room on phones */
        .safe-py { padding-top: 2.5rem; padding-bottom: 2.5rem; }
        @supports (padding: max(0px)) {
          .safe-py {
            padding-top: max(2.5rem, env(safe-area-inset-top));
            padding-bottom: max(2.5rem, env(safe-area-inset-bottom));
          }
        }

        .glitch {
          text-shadow:
            0.03em 0 0 rgba(255, 0, 0, 0.7),
            -0.025em 0 0 rgba(0, 255, 255, 0.7);
          animation: glitchy 0.6s steps(2, end);
        }
        @keyframes glitchy {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 2px); }
          100% { transform: translate(0, 0); }
        }

        .cursor-click { transform: translate(var(--x, 0), var(--y, 0)) scale(0.92); }
        .cursor-hot { transform: translate(-50%, -50%) scale(1.35) !important; }

        @keyframes blobPulse {
          0% { transform: translate(-50%, -50%) scale(0.95) rotate(0deg); }
          50% { transform: translate(-50%, -50%) scale(1.08) rotate(6deg); }
          100% { transform: translate(-50%, -50%) scale(0.95) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default HireMe;
