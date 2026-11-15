"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ChevronDown, CircleCheck } from "lucide-react";
import { contactFormCopy } from "@/data";
import { sendContactMessage } from "@/actions/contact";
import { sendGtagEvent, sendMetaEvent } from "@/lib/analytics";
import { CONTACT_LIMITS, type ContactField, type ContactState } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { PillArrow, pillClassName } from "./pill-link";

type Props = {
  /** Passed only when analytics is on (live site): fires a lead conversion on success. */
  tracking?: { googleAdsId: string; ga4Id: string; metaPixelId: string; label: string };
  className?: string;
};

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "w-full rounded-2xl border border-border bg-background px-4 text-body text-foreground transition-colors duration-300 placeholder:text-muted/70 hover:border-border-strong focus-visible:border-foreground aria-[invalid=true]:border-accent";

/**
 * Contact form → `sendContactMessage` Server Action (Resend). Works without JavaScript
 * (plain form POST); with JS it shows inline errors, a pending state and a success panel.
 */
export function ContactForm({ tracking, className }: Props) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  // The success state the visitor dismissed with "Send another message".
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const copy = contactFormCopy;
  const showSuccess = state.status === "success" && state !== dismissed;

  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
      if (tracking?.googleAdsId && tracking.label) {
        sendGtagEvent("conversion", { send_to: `${tracking.googleAdsId}/${tracking.label}` });
      }
      if (tracking?.ga4Id) {
        sendGtagEvent("generate_lead", { send_to: tracking.ga4Id, form_id: "contact" });
      }
      if (tracking?.metaPixelId) {
        sendMetaEvent("Lead", { content_name: "contact_form" });
      }
    } else if (state.status === "error") {
      // Move focus to the first field with a problem so keyboard/screen-reader users land on it.
      const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]");
      firstInvalid?.focus();
    }
  }, [state, tracking]);

  if (showSuccess) {
    return (
      <div
        className={cn("rounded-3xl border border-border bg-surface p-7 sm:p-9", className)}
        role="status"
      >
        <CircleCheck aria-hidden className="size-10 text-accent" strokeWidth={1.75} />
        <h3 ref={successRef} tabIndex={-1} className="mt-6 text-h3 font-extrabold outline-none">
          {copy.success.title}
        </h3>
        <p className="mt-3 max-w-md text-muted">{copy.success.body}</p>
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className="mt-8 text-small font-medium underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
        >
          {copy.success.again}
        </button>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const values = state.values;

  /** Shared a11y wiring for a field: id, name, error state and its description. */
  const fieldProps = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const fieldError = (name: ContactField) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-2 text-small text-accent">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      action={formAction}
      className={cn("relative rounded-3xl border border-border bg-surface p-7 sm:p-9", className)}
      aria-labelledby="contact-form-title"
    >
      <h3 id="contact-form-title" className="text-h3 font-extrabold tracking-tight">
        {copy.title}
      </h3>
      <p className="mt-2 text-muted">{copy.intro}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-small font-medium">
            {copy.fields.name.label}
          </label>
          <input
            {...fieldProps("name")}
            type="text"
            required
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            placeholder={copy.fields.name.placeholder}
            defaultValue={values?.name}
            className={cn(fieldClass, "h-12")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-small font-medium">
            {copy.fields.email.label}
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            maxLength={CONTACT_LIMITS.email}
            placeholder={copy.fields.email.placeholder}
            defaultValue={values?.email}
            className={cn(fieldClass, "h-12")}
          />
          {fieldError("email")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-service" className="mb-2 block text-small font-medium">
            {copy.fields.service.label}
          </label>
          <div className="relative">
            <select
              // `key` re-applies the echoed value after a failed submit (selects ignore defaultValue updates).
              key={values?.service ?? ""}
              {...fieldProps("service")}
              defaultValue={values?.service ?? ""}
              className={cn(fieldClass, "h-12 appearance-none pr-11")}
            >
              <option value="">{copy.fields.service.placeholder}</option>
              {copy.serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
            />
          </div>
          {fieldError("service")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-2 block text-small font-medium">
            {copy.fields.message.label}
          </label>
          <textarea
            {...fieldProps("message")}
            required
            rows={5}
            minLength={CONTACT_LIMITS.messageMin}
            maxLength={CONTACT_LIMITS.message}
            placeholder={copy.fields.message.placeholder}
            defaultValue={values?.message}
            className={cn(fieldClass, "resize-y py-3")}
          />
          {fieldError("message")}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are ignored. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p aria-live="polite" className="mt-6 text-small text-accent empty:hidden">
        {state.status === "error" ? state.message : ""}
      </p>

      <div className="mt-6 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-caption text-muted">{copy.privacy}</p>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className={pillClassName({
            size: "md",
            className: "self-start disabled:cursor-wait disabled:opacity-70 sm:self-auto",
          })}
        >
          <span>{pending ? copy.pending : copy.submit}</span>
          <PillArrow size="md" />
        </button>
      </div>
    </form>
  );
}
