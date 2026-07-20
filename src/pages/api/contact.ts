import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";
import { Resend } from "resend";

const MAX_MESSAGE_LENGTH = 5_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, in-memory rate limiting: on a warm serverless instance this
// blunts rapid floods from a single IP. It resets on cold starts and isn't
// shared across instances; back it with Upstash/Vercel KV for durable limits.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000; // 10 minutes
const submissions = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  submissions.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
};

// Strip control characters / newlines to keep user input on a single line when
// interpolated into the e-mail subject.
const sanitizeLine = (value: string): string =>
  value.replace(/[\u0000-\u001F\u007F]+/g, " ").trim();

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip =
    clientAddress ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Trop de tentatives. Merci de réessayer plus tard." },
      { status: 429 },
    );
  }

  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  // Honeypot: answer with success to avoid giving bots feedback.
  if (website) return Response.json({ ok: true });

  if (
    !name ||
    name.length > 100 ||
    !emailPattern.test(email) ||
    !message ||
    message.length < 10 ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return Response.json(
      { error: "Merci de vérifier les informations saisies." },
      { status: 400 },
    );
  }

  // Read at runtime so the secret is never inlined into the build output.
  const apiKey = getSecret("RESEND_API_KEY");
  const from = getSecret("RESEND_FROM");
  const recipient = getSecret("CONTACT_RECIPIENT");

  if (!apiKey || !from || !recipient) {
    console.error("Contact form is missing Resend environment variables.");
    return Response.json(
      { error: "Le service de contact est momentanément indisponible." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [recipient],
    replyTo: email,
    subject: `Nouveau contact : ${sanitizeLine(name)}`,
    text: `Nom : ${name}\nE-mail : ${email}\nEntreprise : ${company || "Non renseignée"}\nBesoin : ${projectType || "Non renseigné"}\nBudget : ${budget || "Non renseigné"}\n\nMessage :\n${message}`,
  });

  if (error) {
    console.error("Resend contact email failed:", error);
    return Response.json(
      { error: "Le message n’a pas pu être envoyé." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
};
