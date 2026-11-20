import Link from 'next/link';
import { profile } from '@/data/profile';
import { LegalPage, LegalSection } from '@/components/neon/LegalPage';

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Notice"
      description={`How ${profile.fullName} handles analytics and contact information on this personal portfolio.`}
      updated="20 November 2026"
    >
      <p>
        This privacy notice explains how this personal portfolio website (
        <a href={profile.website} className="text-neon hover:underline">
          {profile.websiteLabel}
        </a>
        ), operated by {profile.fullName}, uses limited usage information. It is written in plain language for
        visitors. It is not legal advice and does not create rights beyond applicable law.
      </p>

      <LegalSection heading="Who runs this site">
        <p>
          This site is a personal portfolio operated by {profile.fullName}. For privacy questions, email{' '}
          <a href={`mailto:${profile.contact.email}`} className="text-neon hover:underline">
            {profile.contact.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="What this site collects">
        <p>This site does not require accounts and does not ask you to submit a contact form.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-neon">Usage counts:</strong> aggregated page views and named button-click
            events (for example Resume, GitHub, LinkedIn, Contact) via Vercel Analytics, so the site owner can
            see how the portfolio is used.
          </li>
          <li>
            <strong className="text-neon">Technical hosting data:</strong> like most websites, the host may
            process standard request information needed to deliver pages (such as IP address and timestamps) in
            server logs. That is handled by the hosting provider as part of operating the site.
          </li>
          <li>
            <strong className="text-neon">If you contact me:</strong> if you email or call using the details on
            this site, I will receive whatever you choose to send. I use that only to respond to professional
            inquiries.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="What this site does not do">
        <ul className="list-disc space-y-2 pl-5">
          <li>No user accounts or login</li>
          <li>No selling of personal data</li>
          <li>No advertising networks or ad trackers added by this site</li>
          <li>No intentional VPN detection, device fingerprinting, or identity profiling by this site</li>
          <li>No on-site public dashboard of visitor details</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Providers">
        <p>
          This site is hosted on <strong className="text-neon">Vercel</strong>, which also provides Web
          Analytics used for visit and click counts. Vercel processes data according to its own terms and
          privacy documentation. External links (for example GitHub, LinkedIn, Coursera) are operated by those
          third parties under their own policies.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and similar technologies">
        <p>
          Vercel Analytics is used for aggregated usage measurement. This site does not add separate
          advertising cookies. Your browser may still store technical data needed for normal browsing. You can
          control cookies and site data in your browser settings.
        </p>
      </LegalSection>

      <LegalSection heading="Retention and access">
        <p>
          Analytics counts are retained according to Vercel&apos;s Analytics product settings and practices.
          Emails or messages you send are kept only as long as needed to handle the conversation and related
          professional follow-up, unless a longer period is required by law.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can stop using the site at any time, use browser privacy controls, or contact me at{' '}
          <a href={`mailto:${profile.contact.email}`} className="text-neon hover:underline">
            {profile.contact.email}
          </a>{' '}
          with a privacy question. Depending on where you live, local law may give you additional rights
          regarding personal data.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          This notice may be updated when the site&apos;s practices change. The &quot;Last updated&quot; date
          at the top will change when that happens. Continued use of the site after an update means the revised
          notice applies to later visits.
        </p>
      </LegalSection>

      <p className="text-xs text-neon-dim">
        Related: <Link href="/terms" className="text-neon hover:underline">Terms of Use</Link>
      </p>
    </LegalPage>
  );
}
