// pages/hire-me.tsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type Theme = {
  name: string;
  bgClass: string; // tailwind gradient classes
  tintClass: string; // translucent overlay
  buttonClass: string;
  buttonHoverClass: string;
};

// SVG cursors (data URLs). Each has a matching fallback cursor keyword.
const CURSORS: { name: string; url: string; fallback: string }[] = [
  {
    name: 'rocket',
    url:
      `data:image/svg+xml;utf8,` +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
           <text x='12' y='32' font-size='26'>🚀</text>
         </svg>`
      ),
    fallback: 'pointer',
  },
  {
    name: 'sparkles',
    url:
      `data:image/svg+xml;utf8,` +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='42' height='42' viewBox='0 0 42 42'>
           <text x='6' y='28' font-size='24'>✨</text>
         </svg>`
      ),
    fallback: 'crosshair',
  },
  {
    name: 'ghost',
    url:
      `data:image/svg+xml;utf8,` +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
           <text x='6' y='28' font-size='22'>👻</text>
         </svg>`
      ),
    fallback: 'grab',
  },
  {
    name: 'coffee',
    url:
      `data:image/svg+xml;utf8,` +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
           <text x='6' y='28' font-size='22'>☕</text>
         </svg>`
      ),
    fallback: 'alias',
  },
  {
    name: 'bolt',
    url:
      `data:image/svg+xml;utf8,` +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
           <text x='6' y='28' font-size='22'>⚡</text>
         </svg>`
      ),
    fallback: 'cell',
  },
  {
    name: 'code',
    url:
      `data:image/svg+xml;utf8,` +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'>
           <text x='6' y='30' font-size='22'>💻</text>
         </svg>`
      ),
    fallback: 'text',
  },
  {
    name: 'fire',
    url:
      `data:image/svg+xml;utf8,` +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'>
           <text x='6' y='30' font-size='22'>🔥</text>
         </svg>`
      ),
    fallback: 'move',
  },
  {
    name: 'duck',
    url:
      `data:image/svg+xml;utf8,` +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'>
           <text x='6' y='30' font-size='22'>🦆</text>
         </svg>`
      ),
    fallback: 'help',
  },
];

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

const HireMe = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [cursorCss, setCursorCss] = useState<string>('auto');
  const [headline, setHeadline] = useState<string>('CONNECT');
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glitchTimer = useRef<number | null>(null);

  // pick randoms on mount
  useEffect(() => {
    // random hero image
    const images = [
      '/image/dev1.webp',
      '/image/dev2.webp',
      '/image/dev3.webp',
      '/image/dev4.webp',
      '/image/dev5.webp',
    ];
    setSelectedImage(images[Math.floor(Math.random() * images.length)]);

    // random cursor
    const c = CURSORS[Math.floor(Math.random() * CURSORS.length)];
    setCursorCss(`url(${c.url}) 10 10, ${c.fallback}`);

    // random headline
    setHeadline(HEADLINES[Math.floor(Math.random() * HEADLINES.length)]);

    // random theme
    setTheme(THEMES[Math.floor(Math.random() * THEMES.length)]);
  }, []);

  // parallax tilt + emoji trail
  useEffect(() => {
    const node = containerRef.current;
    const tiltEl = tiltRef.current;
    if (!node) return;

    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      lastX = x;
      lastY = y;

      // Parallax tilt based on pointer position
      if (tiltEl) {
        const rect = tiltEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (x - cx) / rect.width;
        const dy = (y - cy) / rect.height;
        const rotateX = (dy * -10).toFixed(2);
        const rotateY = (dx * 12).toFixed(2);
        tiltEl.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }

      // Emoji trail
      spawnEmoji(x, y);
    };

    const onLeave = () => {
      if (tiltEl) {
        tiltEl.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
    };

    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // periodic glitch effect on headline
  useEffect(() => {
    const el = document.getElementById('glitchTitle');
    if (!el) return;

    const runGlitch = () => {
      el.classList.add('glitch');
      window.setTimeout(() => el.classList.remove('glitch'), 600);
    };

    // random intervals between 3–7s
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

  // helper: spawn a floating emoji that fades away
  const spawnEmoji = (x: number, y: number) => {
    const span = document.createElement('span');
    span.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    span.style.position = 'fixed';
    span.style.left = x + 'px';
    span.style.top = y + 'px';
    span.style.pointerEvents = 'none';
    span.style.zIndex = '50';
    span.style.fontSize = 12 + Math.floor(Math.random() * 16) + 'px';
    span.style.opacity = '0.9';
    span.style.transform = `translate(-50%, -50%) scale(${0.8 + Math.random() * 0.6})`;

    const driftX = (Math.random() - 0.5) * 160; // left/right drift
    const driftY = -80 - Math.random() * 80; // upward drift
    const rotate = (Math.random() - 0.5) * 90;

    document.body.appendChild(span);

    // animate with WAAPI if available, else fallback with CSS
    const duration = 900 + Math.random() * 900;
    if ((span as any).animate) {
      (span as any)
        .animate(
          [
            { transform: span.style.transform, opacity: 0.95 },
            { transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) rotate(${rotate}deg)`, opacity: 0 },
          ],
          { duration, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
        )
        .finished.finally(() => span.remove());
    } else {
      // fallback
      setTimeout(() => span.remove(), duration);
    }
  };

  // magnetic button behavior
  const btnRef = useRef<HTMLAnchorElement>(null);
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

    anchor.addEventListener('mousemove', onMove);
    anchor.addEventListener('mouseleave', onLeave);
    return () => {
      anchor.removeEventListener('mousemove', onMove);
      anchor.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // memoized container styles with random cursor
  const containerStyle = useMemo<React.CSSProperties>(() => {
    return { cursor: cursorCss } as React.CSSProperties;
  }, [cursorCss]);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${theme.bgClass} relative overflow-hidden text-white`}
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
          className="select-none text-center text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          onMouseEnter={() => {
            const el = document.getElementById('glitchTitle');
            if (!el) return;
            el.classList.add('glitch');
            setTimeout(() => el.classList.remove('glitch'), 600);
          }}
        >
          {headline}
        </h1>

        {/* Hero card with tilt */}
        <div
          ref={tiltRef}
          className="mt-10 w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl shadow-2xl transition-transform duration-200 will-change-transform"
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
            <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs">
              random: true
            </div>
            <div className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/50 px-3 py-1 text-xs">
              theme: {theme.name}
            </div>
          </div>

          <p className="mt-5 text-center text-lg/relaxed text-white/90">
            I build backends that are fast, secure, and low-drama. If you need clean APIs, solid auth, and smooth
            deployments — we’ll get along.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              ref={btnRef}
              href="/image/shreenidhi.pdf"
              target="_blank"
              download
              className={`rounded-xl px-5 py-3 ${theme.buttonClass} ${theme.buttonHoverClass} transition-all duration-200 active:scale-[0.98]`}
            >
              Download Resume
            </a>

            <Link
              href="/pro/professional"
              className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 backdrop-blur hover:bg-white/20 transition-all"
            >
              See Work
            </Link>
          </div>
        </div>

        {/* footer hint */}
        <p className="mt-8 text-sm text-white/80">
          Tip: Reload the page — the vibe changes each time.
        </p>
      </div>

      {/* Styles: glitch + cursor help text (and a tiny easter egg pulse) */}
      <style jsx global>{`
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
      `}</style>
    </div>
  );
};

export default HireMe;
