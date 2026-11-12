export const metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-20 lg:py-28">
      <p className="eyebrow">Legal</p>
      <h1 className="display-lg mt-4">Privacy policy</h1>
      <p className="mt-6 text-sm text-ink-soft">
        <strong>Template only.</strong> Have this reviewed by a lawyer familiar
        with GDPR before launch.
      </p>
      <div className="mt-12 space-y-8 text-lg leading-relaxed text-ink-soft">
        <section>
          <h2 className="display-md mb-4 text-ink">What we collect</h2>
          <p>
            When you submit the enquiry form, we collect your name, email,
            company (optional), budget range (optional), service interest
            (optional) and the message you write. We also collect standard
            server logs.
          </p>
        </section>
        <section>
          <h2 className="display-md mb-4 text-ink">How we use it</h2>
          <p>
            We use this information only to respond to your enquiry and, if we
            work together, to deliver the project. We do not sell or share it
            with third parties for marketing.
          </p>
        </section>
        <section>
          <h2 className="display-md mb-4 text-ink">Retention</h2>
          <p>
            Enquiries are retained for 24 months unless you ask us to delete
            them sooner.
          </p>
        </section>
        <section>
          <h2 className="display-md mb-4 text-ink">Your rights</h2>
          <p>
            Email{" "}
            <a
              className="underline"
              href="mailto:hello@your-agency.com"
            >
              hello@your-agency.com
            </a>{" "}
            to request access, correction or deletion of your data.
          </p>
        </section>
      </div>
    </div>
  );
}