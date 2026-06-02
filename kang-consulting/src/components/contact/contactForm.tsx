"use client";

import { FormEvent, useState } from "react";
import SendingAnimation from "@/components/contact/sendingAnimation";
import type { Dictionary } from "@/i18n/dictionaries";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  howDidYouFindUs: string;
  subject: string;
  message: string;
  website: string;
};

type FeedbackState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const emptyForm: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  howDidYouFindUs: "",
  subject: "",
  message: "",
  website: "",
};

const REQUIRED_KEYS = ["name", "email", "service", "subject", "message"] as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormCopy = Dictionary["contact"]["form"];

const MIN_SENDING_DURATION = 3000;

const waitForSendingAnimation = async (startedAt: number) => {
  const elapsed = Date.now() - startedAt;
  const remaining = MIN_SENDING_DURATION - elapsed;

  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining));
  }
};

interface ContactFormProps {
  copy: ContactFormCopy;
  nextSteps?: Dictionary["contact"]["nextSteps"];
  onSubmitted?: (values: ContactFormValues) => void;
}

export default function ContactForm({ copy, nextSteps, onSubmitted }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormValues>(emptyForm);
  const [feedback, setFeedback] = useState<FeedbackState>({ status: "idle" });

  const isSubmitting = feedback.status === "loading";
  const showSendingOverlay = isSubmitting;

  const updateField = (field: keyof ContactFormValues) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const missing = REQUIRED_KEYS.filter((key) => !form[key].trim());

    if (missing.length > 0) {
      const missingLabels = missing.map((key) => copy.fields[key].label);
      const message = `${copy.missingFieldsPrefix} ${missingLabels.join(", ")}.`;
      setFeedback({ status: "error", message });
      return;
    }

    if (!emailPattern.test(form.email.trim().toLowerCase())) {
      setFeedback({ status: "error", message: copy.invalidEmailMessage });
      return;
    }

    let animationStartedAt: number | null = null;
    try {
      setFeedback({ status: "loading" });
      animationStartedAt = Date.now();

      const submittedValues = { ...form };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedValues),
      });

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: copy.genericError }));
        const message = typeof error === "string" ? error : copy.genericError;
        throw new Error(message);
      }

      await waitForSendingAnimation(animationStartedAt);
      setFeedback({ status: "success", message: copy.successMessage });
      onSubmitted?.(submittedValues);
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.genericError;
      if (animationStartedAt !== null) {
        await waitForSendingAnimation(animationStartedAt);
      }
      setFeedback({ status: "error", message });
    }
  };

  return (
    <div
      className="relative rounded-[var(--radius-md)] border border-[#dcd7d0] bg-white shadow-[var(--shadow-soft)]"
      aria-busy={showSendingOverlay}
    >
      {showSendingOverlay ? (
        <output
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-white/92 px-6 py-8 text-center backdrop-blur-sm"
          aria-live="assertive"
        >
          <SendingAnimation />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">{copy.sendingLabel}</p>
        </output>
      ) : null}
      <form className="space-y-7 p-5 sm:space-y-8 sm:p-8 md:p-10" onSubmit={handleSubmit} noValidate>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-label="Website"
            value={form.website}
            onChange={(event) => updateField("website")(event.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111111] md:text-3xl">{copy.heading}</h2>
          <p className="text-base leading-relaxed text-gray-700 md:text-lg">{copy.subheading}</p>
        </div>

        {feedback.status !== "idle" && feedback.status !== "loading" ? (
          <output
            className={`rounded-[var(--radius-sm)] border px-4 py-3 text-sm md:text-base font-medium ${feedback.status === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : "border-red-300 bg-red-50 text-red-900"
              }`}
            aria-live="polite"
          >
            {feedback.message}
          </output>
        ) : null}

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-800">
              {copy.fields.name.label}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name")(event.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-[#dcd7d0] bg-white px-4 py-3 text-gray-900 transition focus:border-black focus:outline-none focus:ring-0"
              placeholder={copy.fields.name.placeholder}
              aria-label={copy.fields.name.label}
              aria-describedby="name-helper"
            />
            <p id="name-helper" className="text-xs text-gray-500">
              {copy.fields.name.helper}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-800">
              {copy.fields.email.label}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField("email")(event.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-[#dcd7d0] bg-white px-4 py-3 text-gray-900 transition focus:border-black focus:outline-none focus:ring-0"
              placeholder={copy.fields.email.placeholder}
              aria-label={copy.fields.email.label}
              aria-describedby="email-helper"
            />
            <p id="email-helper" className="text-xs text-gray-500">
              {copy.fields.email.helper}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-800">
              {copy.fields.phone.label}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => updateField("phone")(event.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-[#dcd7d0] bg-white px-4 py-3 text-gray-900 transition focus:border-black focus:outline-none focus:ring-0"
              placeholder={copy.fields.phone.placeholder}
              aria-label={copy.fields.phone.label}
              aria-describedby="phone-helper"
            />
            <p id="phone-helper" className="text-xs text-gray-500">
              {copy.fields.phone.helper}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-medium text-gray-800">
              {copy.fields.service.label}
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={(event) => updateField("service")(event.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-[#dcd7d0] bg-white px-4 py-3 text-gray-900 transition focus:border-black focus:outline-none focus:ring-0"
              aria-label={copy.fields.service.label}
              aria-describedby="service-helper"
            >
              <option value="" disabled>
                {copy.servicePlaceholder}
              </option>
              {copy.services.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <p id="service-helper" className="text-xs text-gray-500">
              {copy.fields.service.helper}
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="howDidYouFindUs" className="text-sm font-medium text-gray-800">
              {copy.fields.howDidYouFindUs.label}
            </label>
            <input
              id="howDidYouFindUs"
              name="howDidYouFindUs"
              type="text"
              value={form.howDidYouFindUs}
              onChange={(event) => updateField("howDidYouFindUs")(event.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-[#dcd7d0] bg-white px-4 py-3 text-gray-900 transition focus:border-black focus:outline-none focus:ring-0"
              placeholder={copy.fields.howDidYouFindUs.placeholder}
              aria-label={copy.fields.howDidYouFindUs.label}
              aria-describedby="find-helper"
            />
            <p id="find-helper" className="text-xs text-gray-500">
              {copy.fields.howDidYouFindUs.helper}
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="subject" className="text-sm font-medium text-gray-800">
              {copy.fields.subject.label}
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={(event) => updateField("subject")(event.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-[#dcd7d0] bg-white px-4 py-3 text-gray-900 transition focus:border-black focus:outline-none focus:ring-0"
              placeholder={copy.fields.subject.placeholder}
              aria-label={copy.fields.subject.label}
              aria-describedby="subject-helper"
            />
            <p id="subject-helper" className="text-xs text-gray-500">
              {copy.fields.subject.helper}
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-800">
              {copy.fields.message.label}
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={(event) => updateField("message")(event.target.value)}
              className="h-40 w-full rounded-[var(--radius-sm)] border border-[#dcd7d0] bg-white px-4 py-3 text-gray-900 transition focus:border-black focus:outline-none focus:ring-0"
              placeholder={copy.fields.message.placeholder}
              aria-label={copy.fields.message.label}
              aria-describedby="message-helper"
            />
            <p id="message-helper" className="text-xs text-gray-500">
              {copy.fields.message.helper}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {copy.requiredNote}
          </p>
          <button
            type="submit"
            className="flex w-full items-center justify-center border border-[#0b0c10] bg-[#0b0c10] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-200 hover:bg-[#111827] disabled:pointer-events-none disabled:opacity-60 md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? copy.submittingLabel : copy.submitLabel}
          </button>
        </div>
        {nextSteps ? (
          <div className="border-t border-[#e6e0da] pt-8">
            <div className="space-y-4 rounded-[var(--radius-sm)] bg-[#f9f7f4] p-4 sm:p-5">
              <h3 className="text-xl font-semibold text-[#111111]">{nextSteps.title}</h3>
              <p className="text-sm leading-relaxed text-gray-700 md:text-base">{nextSteps.body}</p>
              <div className="grid gap-3 text-sm text-gray-800">
                <p>
                  <span className="font-semibold">{nextSteps.urgentPrefix}</span>{" "}
                  <a className="text-black underline" href={`mailto:${nextSteps.emailLabel}`}>
                    {nextSteps.emailLabel}
                  </a>
                  .
                </p>
                <p>{nextSteps.preferCall}</p>
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
