// pages/hire-me.tsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type Theme = {
  name: string;
  bgClass: string;       // Tailwind gradient classes
  tintClass: string;     // Overlay
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
const EMOJIS = ['✨', '⚡', '💥', '🔥', '💫', '🫶', '🚀', '🎯', '🌈', '🧩', '🫡'];

const isIOS = () => {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
};

const HireMe = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [headline, setHeadline] = useState<string>('CONNECT');
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [isCoarse, setIsCoarse] = useState<boolean>(false);
  const [motionAllowed, setMotionAllowed] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const glitchTimer = useRef<number | null>(null);

  // ---------------- Desktop-only custom cursor ----------------
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [cursorVariant, setCursorVariant] = useState<'emoji' | 'dot' | 'ring' | 'blob'>('emoji');
  const [cursorEmoji, setCursorEmoji] = useState<string>('🚀');

  // ---------------- Randomize all on mount ----------------
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

    // detect coarse pointer (mobile/tablet)
    const mql = window.matchMedia('(pointer: coarse)');
    const setMode = () => setIsCoarse(mql.matches);
    setMode();
    mql.addEventListener?.('change', setMode);

    // cursor variant + emoji (desktop only)
    if (!mql.matches) {
      const variants: Array<'emoji' | 'dot' | 'ring' | 'blob'> = ['emoji', 'dot', 'ring', 'blob'];
      setCursorVariant(variants[Math.floor(Math.random() * variants.length)]);
      setCursorEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
    }

    return () => {
      mql.removeEventListener?.('change', setMode);
    };
  }, []);

  // ---------------- Desktop cursor follow + emoji trail ----------------
  useEffect(() => {
    if (isCoarse) return; // mobile: skip cursor logic

    const cur = cursorRef.current;
    if (!cur) return;

    let targetX = 0, targetY = 0;
    let x = 0, y = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // desktop emoji trail (lightweight)
      spawnEmoji(e.clientX, e.clientY, 0.9, true);
    };

    const loop = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      cur.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onDown = () => cur.classList.add('cursor-click');
    const onUp = () => cur.classList.remove('cursor-click');

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isCoarse]);

  // Grow cursor over links/buttons (desktop only)
  useEffect(() => {
    if (isCoarse) return;
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const isInteractive = t.closest('a, button, [data-cursor="link"]');
      const inner = cursorInnerRef.current;
      if (!inner) return;
      if (isInteractive) inner.classList.add('cursor-hot');
      else inner.classList.remove('cursor-hot');
    };
    window.addEventListener('mousemove', onOver);
    return () => window.removeEventListener('mousemove', onOver);
  }, [isCoarse]);

  // ---------------- Parallax tilt (desktop: mouse, mobile: device motion) ----------------
  useEffect(() => {
    const tiltEl = tiltRef.current;
    if (!tiltEl) return;

    if (!isCoarse) {
      // Desktop: mouse-based tilt
      const onMove = (e: MouseEvent) => {
        const rect = tiltEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        const rotateX = (dy * -10).toFixed(2);
        const rotateY = (dx * 12).toFixed(2);
        tiltEl.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      };
      const onLeave = () => {
        tiltEl.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseleave', onLeave);
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      };
    } else {
      // Mobile: device orientation tilt
      let handler: ((e: DeviceOrientationEvent) => void) | null = null;

      const startMotion = () => {
        handler = (e: DeviceOrientationEvent) => {
          const beta = e.beta ?? 0;  // front-back tilt (-180,180)
          const gamma = e.gamma ?? 0; // left-right tilt (-90,90)
          const rotateX = Math.max(-10, Math.min(10, -(beta / 90) * 10));
          const rotateY = Math.max(-12, Math.min(12, (gamma / 60) * 12));
          tiltEl.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
        };
        window.addEventListener('deviceorientation', handler, true);
      };

      // if already allowed (Android / some browsers), start immediately
      if (typeof (DeviceOrientationEvent as any) !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // iOS requires explicit permission; show button below
      } else {
        startMotion();
        setMotionAllowed(true);
      }

      return () => {
        if (handler) window.removeEventListener('deviceorientation', handler, true);
      };
    }
  }, [isCoarse]);

  // iOS "Enable Motion" button
  const requestIOSMotion = async () => {
    try {
      const perm = await (DeviceOrientationEvent as any).requestPermission();
      if (perm === 'granted') {
        setMotionAllowed(true);
        // trigger the effect hook above by re-setting state
        // (small trick: flip isCoarse to same value to re-run effect)
        setIsCoarse((v) => v);
      }
    } catch {
      setMotionAllowed(false);
    }
  };

  // ---------------- Glitch headline ----------------
  useEffect(() => {
    const el = document.getElementById('glitchTitle');
    if (!el) return;

    const runGlitch = () => {
      el.classList.add('glitch');
      window.setTimeout(() => el.classList.remove('glitch'), 600);
    };
    const schedule = () => {
      glitchTimer.current = window.setTimeout(() => {
        runGlitch();
        schedule();
      }, 3000 + Math.random() * 4000);
    };
    schedule();
    return () => {
      if (glitchTimer.current) window.clearTimeout(glitchTimer.current);
    };
  }, []);

  // ---------------- Particles / Confetti ----------------
  // desktop: light emoji trail handled in cursor move
  // mobile: idle floating particles + tap confetti
  useEffect(() => {
    if (!isCoarse) return;

    let alive = true;

    // idle gentle particles
    const spawnIdle = () => {
      if (!alive) return;
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight - 20 - Math.random() * 80;
      spawnEmoji(x, y, 0.6, false, true);
      window.setTimeout(spawnIdle, 600 + Math.random() * 1000);
    };
    spawnIdle();

    // tap confetti
    const onTouch = (e: TouchEvent) => {
      const touches = Array.from(e.touches);
      touches.forEach((t) => {
        // bigger, denser burst on tap
        for (let i = 0; i < 10; i++) {
          spawnEmoji(t.clientX, t.clientY, 1, false);
        }
      });
    };
    window.addEventListener('touchstart', onTouch, { passive: true });

    return () => {
      alive = false;
      window.removeEventListener('touchstart', onTouch);
    };
  }, [isCoarse]);

  // Create and animate a floating emoji
  // desktopLight: true => shorter trail
  // idle: true => spawn from bottom area, float up slower
  const spawnEmoji = (x: number, y: number, opacity = 0.9, desktopLight = false, idle = false) => {
    const span = document.createElement('span');
    span.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    span.style.position = 'fixed';
    span.style.left = x + 'px';
    span.style.top = y + 'px';
    span.style.pointerEvents = 'none';
    span.style.zIndex = '50';
    span.style.fontSize = (idle ? 12 : 12 + Math.floor(Math.random() * 16)) + 'px';
    span.style.opacity = String(opacity);
    span.style.transform = `translate(-50%, -50%) scale(${idle ? 0.9 : 0.8 + Math.random() * 0.6})`;
    const driftX = (Math.random() - 0.5) * (idle ? 60 : 160);
    const driftY = idle ? -(40 + Math.random() * 40) : -80 - Math.random() * 80;
    const rotate = (Math.random() - 0.5) * (idle ? 30 : 90);

    document.body.appendChild(span);
    const duration = desktopLight ? 500 + Math.random() * 600 : 900 + Math.random() * 900;

    if ((span as any).animate) {
      (span as any)
        .animate(
          [
            { transform: span.style.transform, opacity: opacity },
            { transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) rotate(${rotate}deg)`, opacity: 0 },
          ],
          { duration, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
        )
        .finished.finally(() => span.remove());
    } else {
      setTimeout(() => span.remove(), duration);
    }
  };

  // ---------------- Magnetic button (all devices) ----------------
  useEffect(() => {
    const anchor = btnRef.current;
    if (!anchor) return;
    const onMove = (e: MouseEvent) => {
      const rect = anchor.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      anchor.style.transform = `translate(${dx * 0.08}px, ${dy * 0.08}px) scale(1.02)`;
    };
    const onLeave = () => {
      anchor.style.transform = 'translate(0,0) scale(1)';
    };
    // mouse only (on touch it remains normal)
    anchor.addEventListener('mousemove', onMove);
    anchor.addEventListener('mouseleave', onLeave);
    return () => {
      anchor.removeEventListener('mousemove', onMove);
      anchor.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const containerStyle = useMemo<React.CSSProperties>(() => ({}), []);

  return (
    <div
      id="hireme-root"
      ref={containerRef}
      className={`min-h-screen ${theme.bgClass} relative overflow-hidden text-white hireme-root`}
      style={containerStyle}
    >
      <Head>
        <title>Hire Me</title>
      </Head>

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

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Headline with glitch */}
        <h1
          id="glitchTitle"
          className="select-none text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          onMouseEnter={() => {
            const el = document.getElementById('glitchTitle');
            if (!el) return;
            el.classList.add('glitch');
            setTimeout(() => el.classList.remove('glitch'), 600);
          }}
        >
          {headline}
        </h1>

        {/* iOS motion permission button (only when needed) */}
        {isCoarse && isIOS() && !motionAllowed && typeof (DeviceOrientationEvent as any)?.requestPermission === 'function' && (
          <button
            onClick={requestIOSMotion}
            className="mt-4 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm backdrop-blur hover:bg-white/20 transition"
          >
            Enable Motion
          </button>
        )}

        {/* Hero card with tilt */}
        <div
          ref={tiltRef}
          className="mt-8 w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl shadow-2xl transition-transform duration-200 will-change-transform"
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Dev visual"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 768px"
                priority
              />
            )}

            {/* corner badges */}
            <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] sm:text-xs">
              random: true
            </div>
            <div className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/50 px-3 py-1 text-[10px] sm:text-xs">
              theme: {theme.name}
            </div>
          </div>

          <p className="mt-5 text-center text-base sm:text-lg md:text-lg text-white/90">
            I build backends that are fast, secure, and low-drama. If you need clean APIs, solid auth, and smooth
            deployments — we’ll get along.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              ref={btnRef}
              href="/image/shreenidhi.pdf"
              target="_blank"
              download
              data-cursor="link"
              className={`rounded-xl px-5 py-3 ${theme.buttonClass} ${theme.buttonHoverClass} transition-all duration-200 active:scale-[0.98]`}
            >
              Download Resume
            </a>

            <Link
              href="/pro/professional"
              data-cursor="link"
              className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 backdrop-blur hover:bg-white/20 transition-all"
            >
              See Work
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-white/80">Tip: Reload — the vibe changes each time.</p>
      </div>

      {/* Desktop-only custom cursor (mobile has no system cursor) */}
      {!isCoarse && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 z-[9999] pointer-events-none"
          style={{ transform: 'translate(-100px, -100px)' }}
        >
          <div
            ref={cursorInnerRef}
            className={`transition-transform duration-120 ease-out will-change-transform ${
              cursorVariant === 'emoji' ? 'text-2xl' : ''
            }`}
            style={{
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
            }}
          >
            {cursorVariant === 'emoji' && <span>{cursorEmoji}</span>}

            {cursorVariant === 'dot' && (
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: 'white',
                  borderRadius: '999px',
                  outline: '2px solid rgba(255,255,255,.5)',
                }}
              />
            )}

            {cursorVariant === 'ring' && (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '999px',
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
                  width: 28,
                  height: 28,
                  borderRadius: '20% 80% 70% 30% / 30% 30% 70% 70%',
                  background:
                    'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,.9), rgba(255,255,255,.3), rgba(255,255,255,.9))',
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
        /* Hide system cursor ONLY on desktop (we render our own).
           On mobile, there is no cursor anyway and we don't hide it. */
        @media (pointer: fine) {
          #hireme-root, #hireme-root * { cursor: none !important; }
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
