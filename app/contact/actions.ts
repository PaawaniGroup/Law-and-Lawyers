"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/content/site";
import { enquirySchema, matterOptions, type EnquiryField, type EnquiryFieldErrors, type EnquiryState } from "@/lib/enquiry";

/**
 * Simple in-memory rate limit: 5 enquiries per IP per 15 minutes.
 * On serverless hosting each instance keeps its own counter, so this blunts casual abuse only.
 * For a hard limit, back it with a shared store (e.g. Upstash Redis).
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return false;
}

const FALLBACK_MESSAGE = `Your enquiry could not be sent just now. Please telephone ${site.contact.phoneDisplay} or write to ${site.contact.email}.`;

async function sendViaResend(subject: string, text: string, replyTo: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return false;
  try {
    const { error } = await new Resend(key).emails.send({
      from,
      to: [process.env.CONTACT_TO || site.contact.email],
      replyTo,
      subject,
      text,
    });
    return !error;
  } catch {
    return false;
  }
}

async function sendViaFormspree(fields: Record<string, string>): Promise<boolean> {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) return false;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;

  // Honeypot: pretend success so bots learn nothing.
  if (raw.website) return { status: "success" };

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: EnquiryFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as EnquiryField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: `Too many enquiries have been sent from this connection. Please try again later, or telephone ${site.contact.phoneDisplay}.`,
      fieldErrors: {},
    };
  }

  const d = parsed.data;
  const matter = matterOptions.find((o) => o.value === d.matter)?.label ?? d.matter;
  const subject = `Website enquiry: ${matter} (${d.name})`;
  const text = [
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `Nature of matter: ${matter}`,
    `Relevant deadline: ${d.deadline || "Not stated"}`,
    "",
    "Brief description of the matter:",
    d.description,
    "",
    "Documents available for review (listed, not uploaded):",
    d.documents || "Not stated",
    "",
    `Consent to process this information to respond to the enquiry: given (${new Date().toISOString()})`,
  ].join("\n");

  const sent =
    (await sendViaResend(subject, text, d.email)) ||
    (await sendViaFormspree({ name: d.name, phone: d.phone, email: d.email, matter, deadline: d.deadline ?? "", description: d.description, documents: d.documents ?? "", message: text, _subject: subject }));

  if (sent) return { status: "success" };

  // No provider configured: succeed in development so the flow can be tested; fail loudly in production.
  const configured = Boolean((process.env.RESEND_API_KEY && process.env.RESEND_FROM) || process.env.FORMSPREE_ENDPOINT);
  if (!configured && process.env.NODE_ENV !== "production") {
    console.info("[enquiry:dev] No email provider configured. Enquiry not sent:\n" + text);
    return { status: "success" };
  }
  return { status: "error", message: FALLBACK_MESSAGE, fieldErrors: {} };
}
