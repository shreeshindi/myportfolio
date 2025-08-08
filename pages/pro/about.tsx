// pages/pro/about.tsx
import { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

/** Inline SVGs so there’s no external image loading risk */
const SpringLogo: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 256 256" className={className} role="img" aria-label="Spring">
    <defs>
      <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#6ee7b7" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
    <rect width="256" height="256" rx="56" fill="url(#g1)" />
    <path
      fill="#0b4228"
      d="M204.6 68.9c-7.4 8.9-17.7 14.7-27.8 17.5 2.4-7.8 3.3-16.9-.7-25.3-5.6-11.5-17.4-17.7-29.6-17.7-31.5 0-50.5 28.7-53.7 58.4-1.9 17.3 1 30.6 9.7 40.7 7.4 8.5 17.8 13.3 29.9 14.3 18.6 1.6 38.8-6.8 54.1-20.7 12.5-11.4 22.5-26.6 27.1-43.2 1.5-5.5-2.9-10.7-9-9.3zM109 168.2c-9.4 0-18.1-2.7-25.4-7.8-10.2-7.2-16-18.1-17.1-31.7-.9-10.9 1.1-22.8 5.6-34.1-19.7 9.6-33.9 30-33.9 54.1 0 33 26.8 59.8 59.8 59.8 22.4 0 41.9-12.3 52.1-30.5-12.5 6.4-26.3 10.2-41.1 10.2z"
    />
  </svg>
);

const JavaLogo: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 256 256" className={className} role="img" aria-label="Java">
    <defs>
      <linearGradient id="j1" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect width="256" height="256" rx="56" fill="url(#j1)" />
    <g fill="#0b1e36">
      <path d="M141 58c0 14-22 22-22 34 0 9 11 14 11 14s-20-5-20-21c0-16 22-22 22-34 0-7-4-12-4-12s13 6 13 19z"/>
      <path d="M96 156c15 7 53 7 68 0 0 0 3 3 3 6 0 9-28 14-37 14s-37-5-37-14c0-3 3-6 3-6z"/>
      <path d="M97 139c17 8 49 8 66 0 0 0 3 2 3 6 0 9-25 13-36 13s-36-4-36-13c0-4 3-6 3-6z"/>
      <path d="M97 122c17 8 49 8 66 0 0 0 3 2 3 6 0 9-25 13-36 13s-36-4-36-13c0-4 3-6 3-6z"/>
    </g>
  </svg>
);

const LogoGrid: FC = () => (
  <div className="grid grid-cols-2 gap-4">
    {[
      { name: 'Spring Boot', node: <SpringLogo className="h-20 w-auto" /> },
      { name: 'Java', node: <JavaLogo className="h-20 w-auto" /> },
    ].map((item, idx) => (
      <div
        key={idx}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(300px 200px at 30% 10%, rgba(255,255,255,0.18), transparent 40%)',
            mixBlendMode: 'screen',
          }}
        />
        <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/10 opacity-0 blur-sm transition-all duration-700 group-hover:left-2/3 group-hover:opacity-70" />
        <div className="flex h-28 items-center justify-center">
          <div className="animate-[floaty_6s_ease-in-out_infinite]">{item.node}</div>
        </div>
      </div>
    ))}
    <style jsx global>{`
      @keyframes floaty {
        0% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.02); }
        100% { transform: translateY(0) scale(1); }
      }
    `}</style>
  </div>
);

const About: FC = () => {
  return (
    <>
      <Head>
        <title>About — Shreenidhi</title>
        <meta
          name="description"
          content="About Shreenidhi M C — Backend Software Engineer (Java, Spring Boot). Skills, education, experience, and projects."
        />
      </Head>

      <div className={`${grotesk.className} relative min-h-screen overflow-hidden text-white`}>
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute -top-28 -left-28 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl animate-[blob_18s_ease-in-out_infinite] bg-[radial-gradient(closest-side,_#60a5fa,_transparent)]" />
          <div className="absolute -bottom-40 -right-36 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl animate-[blob_22s_ease-in-out_infinite] bg-[radial-gradient(closest-side,_#a855f7,_transparent)]" />
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
            {/* Contact removed */}
          </nav>
          <a
            href="/image/shreenidhi.pdf"
            download
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 hover:bg-white/20 md:hidden"
          >
            Resume
          </a>
        </header>

        {/* Intro + Logo Grid */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-8 pt-2 md:pt-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="text-4xl font-bold leading-tight md:text-5xl">About Me</h1>
                <p className="mt-4 max-w-prose text-white/85">
                  I’m <span className="font-semibold text-white">Shreenidhi M C</span>, a backend engineer focused on
                  <span className="mx-1 rounded-lg border border-white/15 bg-white/10 px-2 py-0.5">Java</span>
                  and
                  <span className="mx-1 rounded-lg border border-white/15 bg-white/10 px-2 py-0.5">Spring Boot</span>.
                  I care about clean API design, security that’s actually enforced, and apps that don’t fall over on a Monday morning.
                  Dockerized, observable, and production-minded from day one.
                </p>

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

              {/* Two-logo grid (inline SVGs, no external fetch) */}
              <LogoGrid />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mx-auto w-full max-w-7xl px-6 py-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h2 className="text-xl font-semibold">Languages</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-white/80">
                <li>Java</li>
                <li>Python</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h2 className="text-xl font-semibold">Frameworks & Tech</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-white/80">
                <li>Spring Boot, Spring MVC, Spring Security, JPA/Hibernate</li>
                <li>Servlets, RESTful APIs</li>
                <li>FastAPI</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h2 className="text-xl font-semibold">Databases & Tools</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-white/80">
                <li>PostgreSQL, MySQL, MongoDB</li>
                <li>Maven, Gradle, Docker, Git</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mx-auto w-full max-w-7xl px-6 py-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Education</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold">B.E. in Computer Science</h3>
                <p className="text-white/80">Visvesvaraya Technological University, 2020</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold">Diploma in Computer Science</h3>
                <p className="text-white/80">PES University, 2016</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mx-auto w-full max-w-7xl px-6 py-6">
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">Software Engineer — Hanriver, Kolkata</h3>
                  <p className="text-white/70">May 2023 – Present</p>
                </div>
                <div className="text-white/80">Java • Spring Boot • Docker • PostgreSQL • MySQL</div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                <li>Lead developer on SmartFarm & SmartRoot; shipped scalable, secure backend services.</li>
                <li>Hardened auth with Spring Security; implemented session/JWT flows and strict policies.</li>
                <li>~20% faster responses via query tuning, indices, and pragmatic caching.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">Backend Developer — Kingston Info Solution Services</h3>
                  <p className="text-white/70">Apr 2020 – Apr 2023</p>
                </div>
                <div className="text-white/80">Java • Spring Boot • Hibernate • Payments</div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                <li>Built the MFS Bulk Payment system for secure, high-volume transactions.</li>
                <li>Structured logging (AOP + Log4J) for traceability and faster incident response.</li>
                <li>Cross-team collaboration to deliver robust API contracts and stable releases.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mx-auto w-full max-w-7xl px-6 py-6">
          <h2 className="text-2xl font-bold">Projects</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'SmartFarm (Hanriver)',
                desc: 'Routing & task management platform for farm services. Strong scheduling & reliability focus.',
                stack: ['Spring Boot', 'PostgreSQL', 'Docker'],
              },
              {
                name: 'SmartRoot (Hanriver)',
                desc: 'Farm management with IoT ingestion and real-time insights dashboards.',
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
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto w-full max-w-7xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl md:flex-row md:text-left">
            <p className="text-white/80">© {new Date().getFullYear()} Shreenidhi</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/image/shreenidhi.pdf"
                download
                className="rounded-lg bg-white px-4 py-2 text-black hover:opacity-90"
              >
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

      {/* Global animations + mouse tracking for glare */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.04); }
          66% { transform: translate(-25px, 10px) scale(0.98); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              window.addEventListener('mousemove', function(e){
                document.documentElement.style.setProperty('--mx', e.clientX + 'px');
                document.documentElement.style.setProperty('--my', e.clientY + 'px');
              });
            })();
          `,
        }}
      />
    </>
  );
};

export default About;
