import { FC, ReactNode } from 'react';
import { track } from '@vercel/analytics';
import { profile } from '@/data/profile';
import { Panel, PanelLabel } from './Panel';
import { IconDownload, IconExternal, IconGitHub, IconLinkedIn, IconMail } from './Icons';

const chipClass =
  'border border-neon-border bg-neon/[0.04] px-2.5 py-1 text-[11px] text-neon-soft md:text-xs';

const Chip: FC<{ children: string }> = ({ children }) => <span className={chipClass}>{children}</span>;

const CtaLink: FC<{
  href: string;
  children: ReactNode;
  external?: boolean;
  accent?: boolean;
  event?: string;
}> = ({ href, children, external, accent, event }) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    onClick={() => {
      if (event) track(event);
    }}
    className={
      accent
        ? 'inline-flex items-center gap-2 border border-cyan-300/80 bg-cyan-400 px-3.5 py-2 text-xs text-canvas transition-colors hover:bg-cyan-300 md:text-sm'
        : 'inline-flex items-center gap-2 border border-neon-border bg-neon/[0.06] px-3.5 py-2 text-xs text-neon transition-colors hover:border-neon-border-strong hover:bg-neon/10 hover:shadow-neon-sm md:text-sm'
    }
  >
    {children}
  </a>
);

export const BentoGrid: FC = () => {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-16 pt-6 sm:px-6 md:grid-cols-12 md:gap-5 md:pb-24 md:pt-10">
      {/* Hero */}
      <Panel pulse className="md:col-span-8 md:row-span-2">
        <PanelLabel>backend development &amp; system architect</PanelLabel>
        <h1 className="font-display text-4xl font-bold tracking-wide text-neon md:text-6xl lg:text-7xl">
          {profile.fullName}
        </h1>
        <p className="mt-3 font-display text-lg tracking-wide text-neon-soft md:text-2xl">{profile.title}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neon-soft/90 md:text-base">
          {profile.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <CtaLink href={profile.resumePath} accent event="cta_resume">
            <IconDownload className="h-4 w-4" />
            Resume
          </CtaLink>
          <CtaLink href={profile.links.github} external event="cta_github">
            <IconGitHub className="h-4 w-4" />
            GitHub
          </CtaLink>
          <CtaLink href={profile.links.linkedin} external event="cta_linkedin">
            <IconLinkedIn className="h-4 w-4" />
            LinkedIn
          </CtaLink>
          <CtaLink href="#contact" event="cta_contact">
            <IconMail className="h-4 w-4" />
            Contact
          </CtaLink>
        </div>
      </Panel>

      {/* Status */}
      <Panel className="md:col-span-4">
        <PanelLabel>status</PanelLabel>
        <dl className="space-y-4 text-sm">
          <div>
            <dd className="text-neon">{profile.availability}</dd>
          </div>
          <div>
            <dt className="text-neon-dim">Experience</dt>
            <dd className="mt-1 text-neon">{profile.years} years</dd>
          </div>
          <div>
            <dt className="text-neon-dim">Focus</dt>
            <dd className="mt-1 text-neon">{profile.focus}</dd>
          </div>
        </dl>
      </Panel>

      {/* Stack pulse */}
      <Panel className="md:col-span-4">
        <PanelLabel>core stack</PanelLabel>
        <div className="flex flex-wrap gap-2">
          {['Java', 'Spring Boot', 'OAuth2', 'Docker', 'MySQL', 'Redis'].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-neon-dim">
          Aviation · Hospitality · Fintech · IoT
        </p>
      </Panel>

      {/* About */}
      <Panel id="about" className="md:col-span-12">
        <PanelLabel>about</PanelLabel>
        <p className="max-w-4xl text-sm leading-relaxed text-neon-soft md:text-base">{profile.summary}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {profile.highlights.map((h) => (
            <div key={h.title} className="border border-neon-border/70 bg-canvas-elevated/60 p-4">
              <h3 className="font-display text-sm tracking-wide text-neon">{h.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neon-soft/85 md:text-sm">{h.desc}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Experience */}
      <Panel id="experience" className="md:col-span-12">
        <PanelLabel>experience</PanelLabel>
        <div className="space-y-8">
          {profile.experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="border-l border-neon-border pl-4 md:pl-5">
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="font-display text-base tracking-wide text-neon md:text-lg">
                  {job.role}
                  <span className="text-neon-dim"> / </span>
                  {job.company}
                </h3>
                <p className="text-xs text-neon-dim md:text-sm">{job.period}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neon-soft/90">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-neon" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      {/* Projects */}
      <Panel id="projects" className="md:col-span-12">
        <PanelLabel>selected projects</PanelLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map((p) => (
            <article
              key={p.name}
              className="flex flex-col border border-neon-border bg-canvas-elevated/50 p-4 transition-colors hover:border-neon-border-strong"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-neon-dim">{p.context}</p>
              <h3 className="mt-2 font-display text-base tracking-wide text-neon">{p.name}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-neon-soft/85 md:text-sm">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-4xl text-xs leading-relaxed text-neon-dim md:text-sm">
          {profile.additionalWork}
        </p>
      </Panel>

      {/* Skills */}
      <Panel id="skills" className="md:col-span-8">
        <PanelLabel>skills</PanelLabel>
        <div className="space-y-5">
          {profile.skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-2 text-xs uppercase tracking-[0.18em] text-neon-dim">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
        {profile.certifications.length > 0 && (
          <div className="mt-6 border-t border-neon-border pt-4">
            <h3 className="mb-2 text-xs uppercase tracking-[0.18em] text-neon-dim">Certifications</h3>
            <ul className="space-y-1 text-sm text-neon-soft">
              {profile.certifications.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('cta_cert')}
                    className="text-neon underline-offset-2 hover:underline"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Panel>

      {/* Education */}
      <Panel className="md:col-span-4">
        <PanelLabel>education</PanelLabel>
        <div className="space-y-5">
          {profile.education.map((ed) => (
            <div key={ed.school}>
              <p className="font-display text-sm tracking-wide text-neon">{ed.school}</p>
              <p className="mt-1 text-xs text-neon-soft md:text-sm">{ed.degree}</p>
              <p className="mt-1 text-xs text-neon-dim">{ed.year}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Contact */}
      <Panel id="contact" className="md:col-span-12">
        <PanelLabel>contact</PanelLabel>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl tracking-wide text-neon md:text-3xl">Let&apos;s connect</h2>
            <p className="mt-2 max-w-xl text-sm text-neon-soft">
              I am open to building and improving software systems of any kind. If you need help with the server side, how the pieces fit together, or APIs that stay reliable in real use, get in touch.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <p>
                <a
                  className="text-neon hover:underline"
                  href={`mailto:${profile.contact.email}`}
                  onClick={() => track('cta_email')}
                >
                  {profile.contact.email}
                </a>
              </p>
              <p>
                <a
                  className="text-neon hover:underline"
                  href={profile.contact.phoneHref}
                  onClick={() => track('cta_phone')}
                >
                  {profile.contact.phone}
                </a>
              </p>
              <p>
                <a
                  className="inline-flex items-center gap-1.5 text-neon hover:underline"
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('cta_website')}
                >
                  {profile.websiteLabel}
                  <IconExternal className="h-3.5 w-3.5" />
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href={profile.resumePath} accent event="cta_resume">
              <IconDownload className="h-4 w-4" />
              Download resume
            </CtaLink>
            <CtaLink href={profile.links.github} external event="cta_github">
              <IconGitHub className="h-4 w-4" />
              GitHub
            </CtaLink>
            <CtaLink href={profile.links.linkedin} external event="cta_linkedin">
              <IconLinkedIn className="h-4 w-4" />
              LinkedIn
            </CtaLink>
          </div>
        </div>
        <footer className="mt-10 border-t border-neon-border pt-4 text-[11px] text-neon-dim">
          <span className="text-neon">$</span> {profile.fullName} — Neon Terminal · {new Date().getFullYear()}
        </footer>
      </Panel>
    </div>
  );
};
