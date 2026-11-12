import { EnquiryForm } from "@/components/marketing/enquiry-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const whatsapp =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15551234567";

  return (
    <div className="container-page py-20 lg:py-28">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="display-xl mt-4">Tell us about the project.</h1>
          <p className="body-lg mt-8">
            Short brief, please. What you&apos;re building, who it&apos;s for,
            and what &ldquo;done&rdquo; looks like. We&apos;ll reply within one
            business day — with a straight answer on whether we&apos;re the
            right fit.
          </p>

          <div className="mt-12 space-y-6 border-t border-line pt-8">
            <div>
              <p className="eyebrow">Email</p>
              <a
                href="mailto:hello@your-agency.com"
                className="mt-2 block text-lg underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
              >
                hello@your-agency.com
              </a>
            </div>
            <div>
              <p className="eyebrow">WhatsApp</p>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-lg underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
              >
                Message us →
              </a>
            </div>
            <div>
              <p className="eyebrow">Response time</p>
              <p className="mt-2 text-lg text-ink-soft">
                One business day, usually less.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-line p-6 lg:p-10">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}