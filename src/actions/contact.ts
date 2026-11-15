"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { contactFormCopy, profile } from "@/data";
import { siteConfig } from "@/config/site";
import {
  contactSchema,
  readContactValues,
  type ContactField,
  type ContactState,
} from "@/lib/contact";

/** Hidden field real visitors never fill. Bots that fill every input are dropped silently. */
const HONEYPOT = "website";

/**
 * Best-effort spam brake: 5 messages per IP per 10 minutes. It lives in memory, so it resets
 * on deploys/cold starts and isn't shared between server instances. Fine for a portfolio.
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const recentSends = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (recentSends.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) return true;
  recent.push(now);
  recentSends.set(ip, recent);
  return false;
}

/** Contact form handler (`<ContactForm />` via useActionState). Sends the enquiry with Resend. */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const { errors } = contactFormCopy;
  const values = readContactValues(formData);

  // Pretend it worked so bots don't learn to skip the field.
  if (formData.get(HONEYPOT)) return { status: "success" };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "error",
      message: errors.invalid,
      values,
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ) as Partial<Record<ContactField, string>>,
    };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return { status: "error", message: errors.rateLimited, values };

  const { name, email, service, message } = parsed.data;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service || "Not specified"}`,
    "",
    message,
    "",
    `Sent from the contact form on ${siteConfig.url}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Local development without a key: show the message in the terminal instead of sending it.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] RESEND_API_KEY not set, message not emailed:\n${text}`);
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY is not set; contact form messages cannot be sent.");
    return { status: "error", message: errors.form, values };
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL || profile.email,
    replyTo: email,
    // Collapse whitespace so a pasted multi-line name can't break the subject line.
    subject: `New enquiry from ${name.replace(/\s+/g, " ")}${service ? ` (${service})` : ""}`,
    text,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return { status: "error", message: errors.form, values };
  }

  return { status: "success" };
}
