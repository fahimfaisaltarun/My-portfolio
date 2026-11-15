import { z } from "zod";
import { contactFormCopy } from "@/data";

/** Field length limits. The form mirrors them as `maxLength`/`minLength` attributes. */
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 20,
  message: 5000,
} as const;

export type ContactField = "name" | "email" | "service" | "message";
export type ContactValues = Record<ContactField, string>;

/** What the contact Server Action returns to `<ContactForm />`. */
export type ContactState = {
  status: "idle" | "success" | "error";
  /** Form-level message (network/provider failure, rate limit, "fix the fields"). */
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echo of what was submitted, so fields keep their text after a failed attempt. */
  values?: ContactValues;
};

const { errors, serviceOptions } = contactFormCopy;

/** Values arrive already trimmed (see `readContactValues`). */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, { error: errors.name })
    .max(CONTACT_LIMITS.name, { error: errors.tooLong }),
  email: z.email({ error: errors.email }).max(CONTACT_LIMITS.email, { error: errors.email }),
  // Optional: empty string means "not chosen".
  service: z.union([z.enum(serviceOptions), z.literal("")]),
  message: z
    .string()
    .min(CONTACT_LIMITS.messageMin, { error: errors.message })
    .max(CONTACT_LIMITS.message, { error: errors.tooLong }),
});

/** Pull the four fields out of the submitted FormData as trimmed strings. */
export function readContactValues(formData: FormData): ContactValues {
  const read = (key: ContactField) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: read("name"),
    email: read("email"),
    service: read("service"),
    message: read("message"),
  };
}
