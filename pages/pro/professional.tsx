// pages/pro/professional.tsx
import { FC, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
  // mouse-follow glare spotlight
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <Head>
        <title>Shreenidhi — Professional</title>
        <meta
          name="description"
          content="Senior Software Engineer (Backend). Java + Spring Boot. I build clean, secure, production-ready APIs with real-world reliability."
        />
      </Head>

      <div className={`${grotesk.className} relative min-h-screen overflow-hidden text-white`}>
        {/* Background: animated blobs + grid + tint */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute -top-28 -left-28 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl animate-[blob_18s_ease-in-out_infinite] bg-[radial-gradient(closest-side,_#60a5fa,_transparent)]" />
          <div className="absolute -bottom-40 -right-36 h-[32rem] w-[32rem] rounded-full opacity-40 blur-3xl animate-[blob_22s_ease-in-out_infinite] bg-[radial-gradient(closest-side,_#a855f7,_transparent)]" />
          <div className="absolute top-1/3 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl animate-[blob_26s_ease-in-out_infinite] bg-[radial-gradient(closest-side,_#22d3ee,_transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px),' +
                'linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/70 to-black/85" />
        </div>

        {/* Mouse-follow glare */}
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
          </nav>
        </header>

        {/* Hero */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-10 pt-2 md:pt-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Open to Senior Backend roles
                </div>
                <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
                  Building <span className="bg-gradient-to-r from-sky-300 to-fuchsia-300 bg-clip-text text-transparent">secure, fast</span> backends
                </h1>
                <p className="mt-4 max-w-prose text-white/85">
                  Results-driven backend engineer with 5+ years in Java & Spring Boot.
                  I deliver clean REST APIs, strong auth (JWT/Session), observability, and deployments that don’t break on Monday.
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
                    'Java','Spring Boot','Spring Security','REST APIs',
                    'JPA/Hibernate','PostgreSQL','MySQL','MongoDB',
                    'Docker','CI/CD','FastAPI','Microservices'
                  ].map((s) => (
                    <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute -inset-6 -z-10 rounded-3xl opacity-50 blur-2xl"
                  style={{ background: 'conic-gradient(from 180deg at 50% 50%, #22d3ee, #a855f7, #60a5fa, #22d3ee)' }}
                />
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
              { title: 'Secure by default', desc: 'JWT/session auth, strict headers, least-privilege access, audit-ready logs.' },
              { title: 'Performance-first', desc: 'Indexes, query tuning, caching; stable latency and predictable throughput.' },
              { title: 'Ops ready', desc: 'Dockerized, env-based configs, sensible CI/CD and safe rollouts.' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-white/80">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience (updated) */}
        <section className="mx-auto w-full max-w-7xl px-6 py-8">
          <h2 className="text-2xl font-bold">Experience</h2>
          <div className="mt-6 space-y-6">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">Senior Software Engineer — Flycatch Tech</h3>
                  <p className="text-white/70">Aug 2024 – Present</p>
                </div>
                <div className="text-white/80">Java • Spring Boot • MySQL • Docker</div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                <li>Delivered backend for AwayTogether & a pluggable Authentication Core.</li>
                <li>Built internal tools (jukebox, activity scheduler) to improve guest engagement.</li>
                <li>Migrated services to a Strapi-backed CMS for consistent API contracts.</li>
              </ul>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">Software Engineer — Hanriver, Kolkata</h3>
                  <p className="text-white/70">May 2023 – Jul 2024</p>
                </div>
                <div className="text-white/80">Java • Spring Boot • Docker • PostgreSQL</div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                <li>Led SmartFarm (vertical farm ERP) and SmartRoot (IoT farm management) backends.</li>
                <li>Implemented SSO with Spring Security across multiple apps.</li>
                <li>Improved API response times ~20% via tuning & caching.</li>
              </ul>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">Backend Developer — Kingston Info Solution Services</h3>
                  <p className="text-white/70">Apr 2020 – Apr 2023</p>
                </div>
                <div className="text-white/80">Java • Spring Boot • Hibernate • MySQL</div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                <li>Built and maintained MFS Bulk Payment for secure, high-volume transactions.</li>
                <li>Added structured logging with AOP + Log4J for faster RCA.</li>
                <li>Query optimization and caching cut bulk processing time by ~15%.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects (updated) */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-10">
          <h2 className="text-2xl font-bold">Projects</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'AwayTogether (Flycatch Tech)',
                desc: 'Hotel management platform with Spring Boot + MySQL + Docker.',
                stack: ['Spring Boot','MySQL','Docker'],
              },
              {
                name: 'Authentication Core (Flycatch Tech)',
                desc: 'Pluggable auth module (JWT/Session) reusable across Spring apps.',
                stack: ['Java','Spring Security','JWT/Session'],
              },
              {
                name: 'SmartFarm (Hanriver)',
                desc: 'Task routing & scheduling for vertical farms; reliability-first design.',
                stack: ['Spring Boot','PostgreSQL','Docker'],
              },
              {
                name: 'SmartRoot (Hanriver)',
                desc: 'IoT-enabled farm management with real-time insights.',
                stack: ['Java','Spring Boot','Containers'],
              },
              {
                name: 'MFS Bulk Payment',
                desc: 'High-performance, secure bulk payment processing.',
                stack: ['Spring Boot','Hibernate','MySQL'],
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

      {/* Extra CSS for animations */}
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
