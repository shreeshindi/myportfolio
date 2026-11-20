import { FC, ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { NeonShell } from './NeonShell';

type LegalPageProps = {
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
};

export const LegalPage: FC<LegalPageProps> = ({ title, description, updated, children }) => {
  return (
    <>
      <Head>
        <title>{`${title} — ${profile.fullName}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NeonShell>
        <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 md:pb-24 md:pt-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-neon-dim">
            legal
          </p>
          <h1 className="font-display text-3xl tracking-wide text-neon md:text-4xl">{title}</h1>
          <p className="mt-2 text-xs text-neon-dim">Last updated: {updated}</p>

          <article className="neon-panel mt-8 space-y-5 rounded-sm p-5 text-sm leading-relaxed text-neon-soft md:p-8 md:text-base">
            {children}
          </article>

          <p className="mt-8 text-xs text-neon-dim">
            <Link href="/" className="text-neon hover:underline">
              Back to home
            </Link>
            <span className="mx-2">·</span>
            <Link href="/privacy" className="text-neon hover:underline">
              Privacy
            </Link>
            <span className="mx-2">·</span>
            <Link href="/terms" className="text-neon hover:underline">
              Terms
            </Link>
          </p>
        </div>
      </NeonShell>
    </>
  );
};

export const LegalSection: FC<{ heading: string; children: ReactNode }> = ({ heading, children }) => (
  <section>
    <h2 className="font-display text-base tracking-wide text-neon md:text-lg">{heading}</h2>
    <div className="mt-2 space-y-3 text-neon-soft/90">{children}</div>
  </section>
);
