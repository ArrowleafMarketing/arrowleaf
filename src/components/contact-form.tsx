"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useActionState, useEffect } from "react";
import { sendContact, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { status: "idle", attempt: 0 };

const input =
  "rounded-brand border border-ink/15 bg-paper px-4 py-3 text-base font-normal outline-offset-2 transition-colors focus:border-lapis aria-[invalid=true]:border-neon-red";

/** The contact form. Sends through the `sendContact` server action. */
export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);

  // Tell Tag Manager about each real submission, so a GA4 "generate_lead"
  // (or an ads conversion) can be triggered off it. Safe without GTM: the
  // event just waits in the dataLayer.
  useEffect(() => {
    // A real send carries the sender's name back; a caught bot doesn't.
    if (state.status === "sent" && state.values?.name) sendGTMEvent({ event: "generate_lead", form: "contact" });
  }, [state.status, state.attempt, state.values?.name]);

  if (state.status === "sent") {
    return (
      <div
        data-reveal
        role="status"
        className="grid content-start gap-3 rounded-brand-lg border border-hairline bg-white p-7 sm:p-9"
      >
        <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">Message sent</p>
        <p className="text-3xl font-semibold tracking-tight">
          Thanks{state.values?.name ? `, ${state.values.name.split(" ")[0]}` : ""}.
        </p>
        <p className="max-w-md text-base text-ink/75">
          We read every message ourselves and we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = state.errors ?? {};
  const field = (id: "name" | "email" | "company", label: string, type: string, auto: string, optional = false) => (
    <label className="grid gap-1.5 text-sm font-medium">
      <span>
        {label}
        {optional && <span className="font-normal text-ink/60"> (optional)</span>}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={auto}
        required={!optional}
        defaultValue={v[id]}
        aria-invalid={err[id] ? true : undefined}
        aria-describedby={err[id] ? `${id}-error` : undefined}
        className={input}
      />
      {err[id] && (
        <span id={`${id}-error`} className="text-xs font-normal text-neon-red">
          {err[id]}
        </span>
      )}
    </label>
  );

  return (
    <form
      key={state.attempt}
      action={action}
      data-reveal
      noValidate
      className="grid gap-4 rounded-brand-lg border border-hairline bg-white p-7 sm:p-9"
    >
      {field("name", "Name", "text", "name")}
      {field("email", "Email", "email", "email")}
      {field("company", "Company", "text", "organization", true)}
      <label className="grid gap-1.5 text-sm font-medium">
        What would you like to move?
        <textarea
          name="message"
          rows={5}
          required
          defaultValue={v.message}
          aria-invalid={err.message ? true : undefined}
          aria-describedby={err.message ? "message-error" : undefined}
          className={input}
        />
        {err.message && (
          <span id="message-error" className="text-xs font-normal text-neon-red">
            {err.message}
          </span>
        )}
      </label>

      {/* Spam trap: hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-lapis disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send"}
        </button>
        {state.status === "error" && state.message && (
          <p role="alert" className="text-sm text-neon-red">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
