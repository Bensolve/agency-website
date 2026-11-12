export const metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-20 lg:py-28">
      <p className="eyebrow">Legal</p>
      <h1 className="display-lg mt-4">Terms of service</h1>
      <p className="mt-6 text-sm text-ink-soft">
        <strong>Template only.</strong> Have this reviewed by a lawyer before
        launch.
      </p>
      <div className="mt-12 space-y-8 text-lg leading-relaxed text-ink-soft">
        <section>
          <h2 className="display-md mb-4 text-ink">Website use</h2>
          <p>
            This site is provided for information and enquiry purposes. Content
            is our own unless otherwise credited; do not reproduce it without
            permission.
          </p>
        </section>
        <section>
          <h2 className="display-md mb-4 text-ink">Engagements</h2>
          <p>
            Any project work is governed by a separate written engagement
            agreement signed by both parties. Nothing on this website
            constitutes an offer of services.
          </p>
        </section>
        <section>
          <h2 className="display-md mb-4 text-ink">Liability</h2>
          <p>
            The site is provided &ldquo;as is&rdquo;. To the maximum extent
            permitted by law, we exclude liability for any loss arising from use
            of the site.
          </p>
        </section>
        <section>
          <h2 className="display-md mb-4 text-ink">Governing law</h2>
          <p>
            Placeholder — insert your jurisdiction and the courts that will hear
            disputes.
          </p>
        </section>
      </div>
    </div>
  );
}