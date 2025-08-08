// pages/pro/professional.tsx
import { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { Space_Grotesk } from 'next/font/google';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const IconDownload: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 3v10m0 0l4-4m-4 4l-4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLinkedIn: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zM8 8h3.8v2.05h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.77 2.65 4.77 6.1V23h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23H8V8z"/>
  </svg>
);
const IconGitHub: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.87 1.25 1.87 1.25 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.67-.31-5.48-1.34-5.48-5.96 0-1.32.47-2.4 1.24-3.24-.12-.31-.54-1.58.12-3.3 0 0 1.01-.32 3.3 1.23a11.43 11.43 0 0 1 6.01 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.72.24 2.99.12 3.3.77.84 1.23 1.92 1.23 3.24 0 4.63-2.81 5.64-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5z"/>
  </svg>
);

const Professional: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mouse-follow glare spotlight
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty('--mx', `${x}px`);
      document.documentElement.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <Head>
        <title>Shreenidhi — Professional</title>
        <meta name="description" content="Backend Engineer (Java, Spring Boot) — clean APIs, secure services, production-ready systems." />
      </Head>

      <div className={`${grotesk.className} relative min-h-screen overflow-hidden text-white`}>
        {/* Layered Background: animated blobs + grid + gradient + mouse-follow glare */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          {/* Animated blobs */}
          <div className="absolute -top-28 -left-28 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl animate-[blob_18s_ease-in-out_infinite] bg-[radial-gradient(closest-side,_#60a5fa,_transparent)]" />
          <div className="absolute -bottom-40 -right-36 h-[32rem] w-[32rem] rounded-full opacity-40 blur-3xl animate-[blob_22s_ease-in-out_infinite] bg-[radial-gradient(closest-side,_#a855f7,_transparent)]" />
          <div className="absolute top-1/3 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl animate-[blob_26s_ease-in-out_infinite] bg-[radial-gradient(closest-side,_#22d3ee,_transparent)]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px),' +
                'linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Vertical gradient tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/70 to-black/85" />
        </div>

        {/* Mouse-follow glare layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(600px 600px at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.18), transparent 45%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Header */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/pro/professional" className="flex items-center gap-3">
            <Image src="/image/12.png" alt="Logo" width={40} height={40} priority />
            <span className="text-xl font-semibold tracking-wide">Shreenidhi</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/pro/professional" className="hover:opacity-80">Home</Link>
            <Link href="/pro/about" className="hover:opacity-80">About</Link>
            <button onClick={() => setIsOpen(true)} className="hover:opacity-80">Contact</button>
          </nav>
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10"
          >
            Contact
          </button>
        </header>

        {/* Hero */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-10 pt-2 md:pt-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Open to backend roles
                </div>
                <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
                  Building <span className="bg-gradient-to-r from-sky-300 to-fuchsia-300 bg-clip-text text-transparent">secure, fast</span> backends
                </h1>
                <p className="mt-4 max-w-prose text-white/85">
                  I ship clean APIs and resilient services with Java, Spring Boot, JPA/Hibernate, PostgreSQL/MySQL, Docker,
                  and proper security. Pragmatic designs, production focus, and boring reliability.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/image/shreenidhi.pdf"
                    download
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-black hover:opacity-90"
                  >
                    <IconDownload className="h-5 w-5" />
                    <span>Download Resume</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shreenidhi-mc-vernekar-29a050259/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20"
                  >
                    <IconLinkedIn className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/shreeshindi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20"
                  >
                    <IconGitHub className="h-5 w-5" />
                    <span>GitHub</span>
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    'Java', 'Spring Boot', 'Spring Security', 'REST APIs',
                    'JPA/Hibernate', 'PostgreSQL', 'MySQL', 'MongoDB',
                    'Docker', 'CI/CD', 'Caching', 'Resilience'
                  ].map((s) => (
                    <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                {/* Glare ring behind image */}
                <div className="absolute -inset-6 -z-10 rounded-3xl opacity-50 blur-2xl"
                     style={{ background: 'conic-gradient(from 180deg at 50% 50%, #22d3ee, #a855f7, #60a5fa, #22d3ee)' }} />
                <Image
                  src="/image/Capture1.png"
                  alt="Work preview"
                  width={720}
                  height={420}
                  className="mx-auto rounded-2xl border border-white/10 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-4 md:pb-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Secure by default', desc: 'JWT/session auth, hardened headers, least privilege, and audit-friendly logs.' },
              { title: 'Performance-first', desc: 'Query tuning, indices, caching; ship APIs with low latency and predictable throughput.' },
              { title: 'Ops ready', desc: 'Dockerized services, env configs, sensible CI/CD and rollout strategies.' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-white/80">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mx-auto w-full max-w-7xl px-6 py-8">
          <h2 className="text-2xl font-bold">Experience</h2>
          <div className="mt-6 space-y-6">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">Software Engineer — Hanriver, Kolkata</h3>
                  <p className="text-white/70">May 2023 – Present</p>
                </div>
                <div className="text-white/80">Java • Spring Boot • Docker • PostgreSQL • MySQL</div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                <li>Led SmartFarm & SmartRoot backends; modular monolith with solid domain boundaries.</li>
                <li>Hardened auth with Spring Security; implemented secure session/JWT flows.</li>
                <li>Cut response times ~20% with query/index tuning and practical caching.</li>
              </ul>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">Backend Developer — Kingston Info Solution Services</h3>
                  <p className="text-white/70">Apr 2020 – Apr 2023</p>
                </div>
                <div className="text-white/80">Java • Spring Boot • Hibernate • Payments</div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                <li>Built MFS Bulk Payment system handling secure, high-volume transactions.</li>
                <li>Introduced structured logging (AOP + Log4J) for traceability and faster RCA.</li>
                <li>Partnered with frontend & ops to ship stable features with clean API contracts.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-10">
          <h2 className="text-2xl font-bold">Projects</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'SmartFarm (Hanriver)',
                desc: 'Routing & task management for farm services. Strong scheduling & reliability focus.',
                stack: ['Spring Boot', 'PostgreSQL', 'Docker'],
              },
              {
                name: 'SmartRoot (Hanriver)',
                desc: 'Farm management with IoT ingestion & real-time insights dashboards.',
                stack: ['Java', 'Spring Boot', 'Containers'],
              },
              {
                name: 'MFS Bulk Payment',
                desc: 'High-performance, secure payment processing for financial institutions.',
                stack: ['Spring Boot', 'Hibernate', 'MySQL'],
              },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-white/80">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto w-full max-w-7xl px-6 pb-12">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl md:flex-row md:text-left">
            <p className="text-white/80">© {new Date().getFullYear()} Shreenidhi</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="/image/shreenidhi.pdf" download className="rounded-lg bg-white px-4 py-2 text-black hover:opacity-90">
                Download Resume
              </a>
              <a
                href="https://www.linkedin.com/in/shreenidhi-mc-vernekar-29a050259/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/shreeshindi"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Contact Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50">
        <div className="flex min-h-screen items-center justify-center p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 text-white backdrop-blur-xl">
            <Dialog.Title className="text-xl font-semibold">Contact Me</Dialog.Title>
            <Dialog.Description className="mt-2 text-white/80">
              I usually respond within 24 hours.
            </Dialog.Description>
            <div className="mt-4 space-y-3">
              <a href="mailto:shreenidhi.mc.vernekar@gmail.com" className="block rounded-lg bg-white px-4 py-2 text-center font-medium text-black hover:opacity-90">
                shreenidhi.mc.vernekar@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/shreenidhi-mc-vernekar-29a050259/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-center hover:bg-white/20"
              >
                Message on LinkedIn
              </a>
            </div>
            <div className="mt-6 text-right">
              <button onClick={() => setIsOpen(false)} className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20">
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Extra CSS for animations & glare (scoped global so Tailwind config need not change) */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-25px, 10px) scale(0.98); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </>
  );
};

export default Professional;
