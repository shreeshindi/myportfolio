import Head from 'next/head';
import { profile } from '@/data/profile';
import { NeonShell } from '@/components/neon/NeonShell';
import { BentoGrid } from '@/components/neon/BentoGrid';

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${profile.fullName} — ${profile.title}`}</title>
        <meta name="description" content={profile.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${profile.fullName} — ${profile.title}`} />
        <meta property="og:description" content={profile.description} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NeonShell>
        <BentoGrid />
      </NeonShell>
    </>
  );
}
