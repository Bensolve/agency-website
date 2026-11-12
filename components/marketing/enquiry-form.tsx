"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { Button } from "@/components/ui/button";

const initial: EnquiryState = { status: "idle" };

const fieldCls =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink disabled:opacity-60";

const serviceOptions = [
  "Website development",
  "Mobile app development",
  "Graphic design and branding",
  "SaaS development",
];

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initial);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldCls}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="eyebrow mb-2 block">
            Company
          </label>
          <input
            id="company"
            name="company"
            maxLength={160}
            autoComplete="organization"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="budget" className="eyebrow mb-2 block">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue="undecided"
            className={fieldCls}
          >
            <option value="undecided">Not sure yet</option>
            <option value="<5k">Under $5k</option>
            <option value="5-15k">$5k – $15k</option>
            <option value="15-30k">$15k – $30k</option>
            <option value="30k+">$30k+</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="service" className="eyebrow mb-2 block">
          Service of interest
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className={fieldCls}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block">
          Project details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={fieldCls}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send enquiry →"}
        </Button>
        <p className="text-sm text-ink-soft">
          We reply within one business day.
        </p>
      </div>

      <div aria-live="polite" role="status">
        {state.status === "success" && (
          <p className="mt-2 rounded-sm border border-accent bg-accent/10 px-4 py-3 text-sm font-medium">
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p className="mt-2 rounded-sm border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}