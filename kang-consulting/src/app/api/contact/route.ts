import { NextResponse } from "next/server";
import { Resend } from "resend";
import { MAINTENANCE_HEADING, SITE_DOWN } from "@/lib/siteStatus";

const MAX_BODY_BYTES = 12_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const CONTACT_RECIPIENT_EMAIL = "support@kangconsulting.org";

const serviceLabels = {
  "college-consulting": "College Consulting",
  "research-mentorship": "Research Mentorship",
  both: "Both Services",
  prestige: "Prestige Program",
} as const;

type ServiceKey = keyof typeof serviceLabels;

interface ConsultationRequest {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  howDidYouFindUs?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitEntry>();

const fieldLimits = {
  name: 100,
  email: 254,
  phone: 40,
  howDidYouFindUs: 250,
  subject: 150,
  message: 3_000,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const genericInvalidResponse = () =>
  NextResponse.json({ error: "Please check your form details and try again." }, { status: 400 });

const getString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

  return firstForwardedIp || request.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (clientIp: string) => {
  const now = Date.now();
  const current = rateLimits.get(clientIp);

  if (!current || current.resetAt <= now) {
    rateLimits.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
};

const isServiceKey = (service: string): service is ServiceKey =>
  Object.hasOwn(serviceLabels, service);

const exceedsLimit = (value: string, limit: number) => value.length > limit;

const parseRequestBody = async (request: Request) => {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return { body: null, tooLarge: true };
  }

  const rawBody = await request.text();
  const rawBodyBytes = new TextEncoder().encode(rawBody).byteLength;

  if (rawBodyBytes > MAX_BODY_BYTES) {
    return { body: null, tooLarge: true };
  }

  try {
    return { body: JSON.parse(rawBody) as ConsultationRequest, tooLarge: false };
  } catch {
    return { body: null, tooLarge: false };
  }
};

export async function POST(request: Request) {
  if (SITE_DOWN) {
    return NextResponse.json(
      { error: MAINTENANCE_HEADING },
      { status: 503, headers: { "Retry-After": "86400" } },
    );
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const { body, tooLarge } = await parseRequestBody(request);

  if (tooLarge) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  if (!body) {
    return genericInvalidResponse();
  }

  const name = getString(body.name);
  const email = getString(body.email).toLowerCase();
  const phone = getString(body.phone);
  const service = getString(body.service);
  const howDidYouFindUs = getString(body.howDidYouFindUs);
  const subject = getString(body.subject);
  const message = getString(body.message);
  const website = getString(body.website);

  if (website) {
    return genericInvalidResponse();
  }

  if (
    !name ||
    !email ||
    !service ||
    !subject ||
    !message ||
    !emailPattern.test(email) ||
    !isServiceKey(service) ||
    exceedsLimit(name, fieldLimits.name) ||
    exceedsLimit(email, fieldLimits.email) ||
    exceedsLimit(phone, fieldLimits.phone) ||
    exceedsLimit(howDidYouFindUs, fieldLimits.howDidYouFindUs) ||
    exceedsLimit(subject, fieldLimits.subject) ||
    exceedsLimit(message, fieldLimits.message)
  ) {
    return genericInvalidResponse();
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY environment variable");
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const resend = new Resend(resendApiKey);
  const serviceName = serviceLabels[service];
  const htmlMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    await resend.emails.send({
      from: "Kang Consulting <support@kangconsulting.org>",
      to: [CONTACT_RECIPIENT_EMAIL],
      replyTo: email,
      subject: `[WEBSITE FORM] New Consultation Request: ${escapeHtml(subject)}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="color-scheme" content="light" />
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h1 { color: #4F46E5; }
              .info { margin-bottom: 10px; }
              .message { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>New Consultation Request</h1>
              <div class="info"><strong>Name:</strong> ${escapeHtml(name)}</div>
              <div class="info"><strong>Email:</strong> ${escapeHtml(email)}</div>
              <div class="info"><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</div>
              <div class="info"><strong>Service:</strong> ${escapeHtml(serviceName)}</div>
              ${
                howDidYouFindUs
                  ? `<div class="info"><strong>How did you find us:</strong> ${escapeHtml(howDidYouFindUs)}</div>`
                  : ""
              }
              <div class="info"><strong>Subject:</strong> ${escapeHtml(subject)}</div>
              <div class="info"><strong>Message:</strong></div>
              <div class="message">${htmlMessage}</div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
