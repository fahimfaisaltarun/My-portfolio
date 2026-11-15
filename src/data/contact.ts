import { services } from "./services";

/** Contact form copy (footer, #contact). Validation messages are shown under each field. */
export const contactFormCopy = {
  title: "Send a message",
  intro: "Prefer writing? Tell me about your brand and I'll reply personally.",
  fields: {
    name: { label: "Your name", placeholder: "Jane Smith" },
    email: { label: "Email", placeholder: "jane@yourbrand.com" },
    service: { label: "What do you need?", placeholder: "Choose a service (optional)" },
    message: {
      label: "Project details",
      placeholder: "Your brand, goals, timeline and budget, whatever you know so far.",
    },
  },
  /** Options for the service dropdown: the featured services plus a catch-all. */
  serviceOptions: [
    ...services.filter((service) => service.featured).map((service) => service.label),
    "Something else",
  ],
  errors: {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    message: "Please write at least a sentence or two (20+ characters).",
    tooLong: "That's a bit long. Please shorten it.",
    form: "Something went wrong and your message wasn't sent. Please try again, or email me directly.",
    rateLimited: "You've sent a few messages already. Please wait a few minutes and try again.",
    invalid: "Please fix the highlighted fields.",
  },
  submit: "Send message",
  pending: "Sending…",
  privacy: "I only use your details to reply to you. No newsletters, no sharing.",
  success: {
    title: "Message sent, thank you!",
    body: "I'll get back to you soon. Keep an eye on your inbox (and spam folder) for my reply.",
    again: "Send another message",
  },
} as const;
