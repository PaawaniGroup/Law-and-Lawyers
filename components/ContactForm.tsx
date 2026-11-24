"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { DESCRIPTION_MAX, matterOptions, type EnquiryField, type EnquiryState } from "@/lib/enquiry";
import { site } from "@/content/site";
import { Seal } from "./Seal";

const initialState: EnquiryState = { status: "idle" };

const FIELD_LABELS: Record<string, string> = {
  name: "Full name",
  phone: "Phone",
  email: "Email",
  matter: "Nature of matter",
  deadline: "Relevant deadline",
  description: "Brief description of the matter",
  documents: "Documents available for review",
  consent: "Consent",
};

function FieldError({ field, message }: { field: EnquiryField; message?: string }) {
  return message ? (
    <p id={`${field}-error`} className="field-error">
      {message}
    </p>
  ) : null;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [length, setLength] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Submit through a transition (not the form `action` prop) so React does not clear the fields on error.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  };

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="border-t border-rule pt-10 outline-none">
        <Seal size={176} stamp className="text-evergreen" decorative />
        <h2 className="t-h2 mt-8 max-w-[22ch]">{site.form.success}</h2>
        <p className="mt-8">
          <Link href="/" className="link">
            Return to the home page <span className="a">→</span>
          </Link>
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const errorList = Object.entries(errors) as [EnquiryField, string][];
  const err = (f: EnquiryField) => errors[f];
  const invalid = (f: EnquiryField) => (err(f) ? true : undefined);
  const describedBy = (f: EnquiryField, extra?: string) => [err(f) ? `${f}-error` : "", extra].filter(Boolean).join(" ") || undefined;

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="form-title" className="space-y-9">
      <h2 id="form-title" className="t-h2">
        Enquiry
      </h2>

      {/* Errors are announced as soon as they appear */}
      <div ref={summaryRef} tabIndex={-1} role="alert" aria-live="assertive" className="outline-none">
        {state.status === "error" && (
          <div className="border border-oxblood p-5">
            <p className="font-medium text-oxblood">{state.message}</p>
            {errorList.length > 0 && (
              <ul className="t-small mt-3 list-none space-y-1">
                {errorList.map(([f, msg]) => (
                  <li key={f}>
                    <a href={`#${f}`} className="link">
                      {FIELD_LABELS[f] ?? f}: {msg}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="name" className="label">
          Full name <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required aria-required="true" aria-invalid={invalid("name")} aria-describedby={describedBy("name")} className="input" />
        <FieldError field="name" message={err("name")} />
      </div>

      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="phone" className="label">
            Phone <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-required="true" aria-invalid={invalid("phone")} aria-describedby={describedBy("phone")} className="input tnum" />
          <FieldError field="phone" message={err("phone")} />
        </div>
        <div className="field">
          <label htmlFor="email" className="label">
            Email <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-required="true" aria-invalid={invalid("email")} aria-describedby={describedBy("email")} className="input" />
          <FieldError field="email" message={err("email")} />
        </div>
      </div>

      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="matter" className="label">
            Nature of matter <span className="req" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select id="matter" name="matter" required aria-required="true" defaultValue="" aria-invalid={invalid("matter")} aria-describedby={describedBy("matter")} className="input pr-8">
              <option value="" disabled>
                Select
              </option>
              {matterOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg aria-hidden="true" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
              <path d="M1 1.5l5 5 5-5" />
            </svg>
          </div>
          <FieldError field="matter" message={err("matter")} />
        </div>
        <div className="field">
          <label htmlFor="deadline" className="label">
            Relevant deadline <span className="ink-2">(optional)</span>
          </label>
          <input id="deadline" name="deadline" type="date" aria-invalid={invalid("deadline")} aria-describedby={describedBy("deadline")} className="input tnum" />
          <FieldError field="deadline" message={err("deadline")} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="description" className="label">
          Brief description of the matter <span className="req" aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          aria-required="true"
          maxLength={DESCRIPTION_MAX}
          rows={5}
          onChange={(e) => setLength(e.target.value.length)}
          aria-invalid={invalid("description")}
          aria-describedby={describedBy("description", "description-count")}
          className="input"
        />
        <p id="description-count" className="label label-2 tnum mt-2 text-right">
          {length.toLocaleString("en-IN")} / {DESCRIPTION_MAX.toLocaleString("en-IN")}
        </p>
        <FieldError field="description" message={err("description")} />
      </div>

      <div className="field">
        <label htmlFor="documents" className="label">
          Documents available for review <span className="ink-2">(optional)</span>
        </label>
        <textarea id="documents" name="documents" rows={3} maxLength={DESCRIPTION_MAX} aria-describedby={describedBy("documents", "documents-hint")} aria-invalid={invalid("documents")} className="input" />
        <p id="documents-hint" className="t-small ink-2 mt-2">
          {site.form.documentsHint}
        </p>
        <FieldError field="documents" message={err("documents")} />
      </div>

      {/* Honeypot: hidden from people and from assistive technology */}
      <div className="hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="check">
          <input id="consent" type="checkbox" name="consent" required aria-required="true" aria-invalid={invalid("consent")} aria-describedby={describedBy("consent")} />
          <span className="t-small">
            I consent to The Law &amp; Lawyers processing the information in this form in order to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="link">
              privacy notice
            </Link>
            . <span className="req text-oxblood" aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError field="consent" message={err("consent")} />
      </div>

      <div>
        <p className="t-small ink-2 mb-6 max-w-[56ch] border-l border-brass pl-4">{site.form.note}</p>
        <button type="submit" className="btn" disabled={pending}>
          <span className="btn-label">{pending ? "Sending" : site.cta.enquiry}</span>
          <span className="arr" aria-hidden="true" />
        </button>
        <noscript>
          <p className="t-small mt-4">
            This form needs JavaScript. Please telephone {site.contact.phoneDisplay} or write to {site.contact.email}.
          </p>
        </noscript>
      </div>
    </form>
  );
}
