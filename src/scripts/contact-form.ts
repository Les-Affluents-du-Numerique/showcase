const panel = document.querySelector<HTMLElement>(".contact-panel");
const form = panel?.querySelector<HTMLFormElement>(".contact-form");
const status = form?.querySelector<HTMLElement>(".contact-form-status");
const statusText = form?.querySelector<HTMLElement>(
  ".contact-form-status-text",
);
const submitButton = form?.querySelector<HTMLButtonElement>(
  'button[type="submit"]',
);
const spinner = form?.querySelector<HTMLElement>(".contact-spinner");
const submitLabel = form?.querySelector<HTMLElement>(".contact-submit-label");
const submitArrow = form?.querySelector<HTMLElement>(".contact-submit-arrow");
const success = panel?.querySelector<HTMLElement>(".contact-success");
const successText = panel?.querySelector<HTMLElement>(".contact-success-text");
const resetButton = panel?.querySelector<HTMLButtonElement>(".contact-reset");

const setSending = (sending: boolean) => {
  if (submitButton) submitButton.disabled = sending;
  spinner?.classList.toggle("hidden", !sending);
  submitArrow?.classList.toggle("hidden", sending);
  if (submitLabel)
    submitLabel.textContent = sending ? "Envoi en cours…" : "Envoyer";
};

const showError = (message: string) => {
  if (statusText) statusText.textContent = message;
  status?.classList.remove("hidden");
  status?.classList.add("flex");
};

const clearError = () => {
  status?.classList.add("hidden");
  status?.classList.remove("flex");
};

const showSuccess = (name: string) => {
  if (successText) {
    const first = name.trim().split(/\s+/)[0];
    successText.textContent = first
      ? `Merci ${first}, nous revenons vers vous sous 24h.`
      : "Merci, nous revenons vers vous sous 24h.";
  }
  form?.classList.add("invisible");
  success?.classList.add("is-visible");
  resetButton?.focus();
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  clearError();
  setSending(true);
  const name = new FormData(form).get("name")?.toString() ?? "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);

    form.reset();
    showSuccess(name);
  } catch {
    showError(
      "L’envoi a échoué. Vous pouvez nous écrire à contact@lesaffluentsdunumerique.fr.",
    );
  } finally {
    setSending(false);
  }
});

resetButton?.addEventListener("click", () => {
  success?.classList.remove("is-visible");
  form?.classList.remove("invisible");
  form?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
});

// Treat this file as a module so top-level names (e.g. `status`) are scoped to
// it and don't clash with DOM globals when type-checked in isolation.
export {};
