import { useState, type FormEvent } from "react";
import { services } from "@/mocks/services";

const FORM_URL = "https://readdy.ai/api/form/dad96prep053ijub0ru0";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function QuoteForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [formError, setFormError] = useState("");

  const validate = (form: HTMLFormElement): string => {
    const name = (form.elements.namedItem("full_name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    if (!name) return "Please enter your full name.";
    if (!email) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (!message) return "Please enter a short message about your requirement.";
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormError("");

    const clientError = validate(form);
    if (clientError) {
      setState("error");
      setFormError(clientError);
      return;
    }

    // Honeypot anti-spam check
    const hp = (form.elements.namedItem("company_alt") as HTMLInputElement).value;
    if (hp && hp.trim() !== "") {
      setState("success");
      form.reset();
      return;
    }

    setState("loading");
    try {
      const data = new FormData(form);
      if (hp.trim() === "") data.delete("company_alt");

      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      const responseText = await response.text();
      let parsed: { code?: string; meta?: { message?: string; detail?: string }; message?: string } = {};
      try {
        parsed = responseText ? JSON.parse(responseText) : {};
      } catch {
        parsed = {};
      }

      const serverMsg =
        parsed?.meta?.message ||
        parsed?.message ||
        parsed?.meta?.detail ||
        responseText;

      const failed = !response.ok || parsed.code !== "OK" || (serverMsg && /spam/i.test(serverMsg));

      if (failed) {
        setState("error");
        setFormError(serverMsg || "Something went wrong. Please try again.");
        return;
      }

      setState("success");
      form.reset();
    } catch {
      setState("error");
      setFormError("We couldn't send your request. Please try again shortly.");
    }
  };

  if (state === "success") {
    return (
      <div className="rounded-lg border border-accent-200 bg-accent-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-500">
          <i className="ri-check-line text-2xl text-background-50" aria-hidden />
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground-950">
          Thank you for your enquiry
        </h3>
        <p className="mt-2 text-sm text-foreground-600">
          Thank you. Our logistics team will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      id="lsl-quote-form"
      data-readdy-form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      noValidate
    >
      <div>
        <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          placeholder="Your full name"
          className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div>
        <label htmlFor="company_name" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Company Name
        </label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          placeholder="Your company"
          className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="name@company.com"
          className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+91 ..."
          className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Service Required <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cargo_type" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Cargo Type
        </label>
        <input
          id="cargo_type"
          name="cargo_type"
          type="text"
          placeholder="e.g. General cargo"
          className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div>
        <label htmlFor="origin" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Origin
        </label>
        <input
          id="origin"
          name="origin"
          type="text"
          placeholder="City / Country"
          className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div>
        <label htmlFor="destination" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Destination
        </label>
        <input
          id="destination"
          name="destination"
          type="text"
          placeholder="City / Country"
          className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={500}
          rows={4}
          placeholder="Tell us about your shipment requirement, expected timeline, weight and volume..."
          className="w-full resize-none rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
        <p className="mt-1 text-right text-xs text-foreground-500">
          Max 500 characters
        </p>
      </div>

      <div className="sm:col-span-2">
        <input
          type="text"
          name="company_alt"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          readOnly
          className="lsl-hp-field"
        />
      </div>

      {state === "error" && formError && (
        <div className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div className="flex items-center gap-2">
            <i className="ri-error-warning-line" aria-hidden />
            {formError}
          </div>
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700 disabled:opacity-60 sm:w-auto"
        >
          {state === "loading" ? "Sending..." : "Request a Quote"}
          {state !== "loading" && <i className="ri-arrow-right-line" aria-hidden />}
        </button>
      </div>
    </form>
  );
}