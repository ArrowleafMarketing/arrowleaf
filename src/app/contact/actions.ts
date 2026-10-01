"use server";

import { Resend } from "resend";

/**
 * The contact form's server action. Sends each inquiry by email through
 * Resend (the same setup as the team's client sites) and, when a webhook is
 * configured, also posts it to the CRM (GoHighLevel).
 *
 * Environment (see .env.example):
 * - RESEND_API_KEY  required
 * - CONTACT_TO      required; one address, or several separated by commas
 * - RESEND_FROM     optional; a sender on a domain verified in Resend
 * - GHL_WEBHOOK_URL optional; inbound webhook for the CRM
 */

const FIELDS = ["name", "email", "company", "message"] as const;
type Field = (typeof FIELDS)[number];

export type ContactState = {
  status: "idle" | "error" | "sent";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
  /** Bumped on every reply, so the form remounts with the values it sent. */
  attempt: number;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS: Record<Field, number> = { name: 120, email: 200, company: 160, message: 5000 };

export async function sendContact(prev: ContactState, formData: FormData): Promise<ContactState> {
  const attempt = prev.attempt + 1;
  const values = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "").trim().slice(0, LIMITS[f])]),
  ) as Record<Field, string>;

  // Bots fill in the hidden field; people never see it. Pretend it worked.
  if (String(formData.get("website") ?? "").trim()) return { status: "sent", attempt };

  const errors: Partial<Record<Field, string>> = {};
  if (!values.name) errors.name = "Please add your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please add an email we can reply to.";
  if (values.message.length < 2) errors.message = "Tell us a little about what you need.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "A couple of things need a look.", errors, values, attempt };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.RESEND_FROM || "Arrowleaf website <onboarding@resend.dev>";
  const failed: ContactState = {
    status: "error",
    message: "Sorry, your message didn't go through. Please try again in a minute.",
    values,
    attempt,
  };

  let delivered = false;

  if (key && to) {
    const subject = `New inquiry from ${values.name}${values.company ? ` (${values.company})` : ""}`;
    const text = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || "(not given)"}`,
      "",
      values.message,
    ].join("\n");
    try {
      const { error } = await new Resend(key).emails.send({
        from,
        to: to.split(",").map((a) => a.trim()).filter(Boolean),
        replyTo: values.email,
        subject,
        text,
      });
      if (error) console.error("Contact form: Resend rejected the email", error);
      else delivered = true;
    } catch (err) {
      console.error("Contact form: sending failed", err);
    }
  } else {
    console.error("Contact form isn't configured: set RESEND_API_KEY and CONTACT_TO.");
  }

  const webhook = process.env.GHL_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "arrowleafmarketing.com contact form" }),
      });
      if (res.ok) delivered = true;
      else console.error("Contact form: CRM webhook returned", res.status);
    } catch (err) {
      console.error("Contact form: CRM webhook failed", err);
    }
  }

  return delivered ? { status: "sent", values: { name: values.name }, attempt } : failed;
}
