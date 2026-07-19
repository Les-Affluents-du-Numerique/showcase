import type { APIRoute } from "astro";
import { Resend } from "resend";

const MAX_MESSAGE_LENGTH = 5_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
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

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM;
  const recipient = import.meta.env.CONTACT_RECIPIENT;

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
    subject: `Nouveau contact : ${name}`,
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
