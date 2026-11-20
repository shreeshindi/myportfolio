import Link from 'next/link';
import { profile } from '@/data/profile';
import { LegalPage, LegalSection } from '@/components/neon/LegalPage';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      description={`Terms for using ${profile.fullName}'s personal portfolio website.`}
      updated="20 November 2026"
    >
      <p>
        These Terms of Use apply to this personal portfolio website (
        <a href={profile.website} className="text-neon hover:underline">
          {profile.websiteLabel}
        </a>
        ) operated by {profile.fullName}. By using the site, you agree to these terms. If you do not agree, do
        not use the site. This is a practical notice for a personal portfolio, not a commercial product
        contract, and it is not legal advice.
      </p>

      <LegalSection heading="Purpose of the site">
        <p>
          The site is an informational personal portfolio describing professional background, projects, and
          ways to get in touch. It is provided for general information and professional networking. It is not
          an offer of employment, investment advice, or a guarantee of services unless separately agreed in
          writing.
        </p>
      </LegalSection>

      <LegalSection heading="No warranty">
        <p>
          Content is provided &quot;as is&quot; and may contain errors or become outdated. I do not warrant that
          the site will be uninterrupted, error-free, or always available. Resume details, project descriptions,
          and contact information may change without notice.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <ul className="list-disc space-y-2 pl-5">
          <li>Do not attempt to disrupt, scrape abusively, or gain unauthorized access to the site or related systems.</li>
          <li>Do not use contact details for spam, harassment, or unlawful purposes.</li>
          <li>Do not misrepresent affiliation with me or this site.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Third-party links and services">
        <p>
          Links to third-party sites or services (including GitHub, LinkedIn, Coursera, email, and phone) are
          provided for convenience. I do not control those services and am not responsible for their content,
          availability, or privacy practices. Your use of them is under their own terms.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          Unless otherwise noted, site design and original text on this portfolio belong to {profile.fullName}.
          You may view and share links to the public pages for normal personal or professional reference. Do not
          copy the site as a template for commercial redistribution without permission.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the fullest extent permitted by applicable law, {profile.fullName} is not liable for any indirect,
          incidental, special, consequential, or punitive damages, or for any loss of data, profits, or business
          opportunities, arising from your use of or inability to use this site. Where liability cannot be
          excluded, it is limited to the maximum extent allowed by law.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Contact details on this site are for professional inquiries. Reach me at{' '}
          <a href={`mailto:${profile.contact.email}`} className="text-neon hover:underline">
            {profile.contact.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Governing note">
        <p>
          This site is operated by an individual based in India. Local mandatory consumer or privacy rights that
          cannot be waived still apply where they are legally required. If a court finds any part of these terms
          unenforceable, the rest remain in effect.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          These terms may be updated from time to time. The &quot;Last updated&quot; date will change when that
          happens. Continued use of the site after an update means the revised terms apply to later visits.
        </p>
      </LegalSection>

      <p className="text-xs text-neon-dim">
        Related: <Link href="/privacy" className="text-neon hover:underline">Privacy Notice</Link>
      </p>
    </LegalPage>
  );
}
