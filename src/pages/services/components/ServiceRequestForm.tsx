import { useMemo, useState, type FormEvent } from "react";
import {
  getServiceFormConfig,
  defaultServiceFormConfig,
  type ServiceFormConfig,
  type FormField,
} from "@/mocks/serviceRequests";
import { addEnquiry, type Enquiry } from "@/lib/logisticsStore";

interface ServiceRequestFormProps {
  serviceSlug: string;
  serviceName: string;
}

type FieldValues = Record<string, string>;

const BASE_FIELDS: FormField[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
  { name: "companyName", label: "Company Name", type: "text", placeholder: "Your company name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@company.com" },
  { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+91 98000 00000" },
];

function Field({ field, value, onChange }: { field: FormField; value: string; onChange: (v: string) => void }) {
  const base = {
    name: field.name,
    required: field.required,
    value,
    onChange: (e: { target: { value: string } }) => onChange(e.target.value),
    className:
      "w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200",
  };

  if (field.type === "textarea") {
    return (
      <textarea
        {...base}
        rows={4}
        placeholder={field.placeholder}
        className={`${base.className} resize-none`}
      />
    );
  }
  if (field.type === "select") {
    return (
      <select {...base} defaultValue="" required={field.required}>
        <option value="">Select...</option>
        {(field.options ?? []).map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }
  return <input {...base} type={field.type} placeholder={field.placeholder} />;
}

export default function ServiceRequestForm({ serviceSlug, serviceName }: ServiceRequestFormProps) {
  const config: ServiceFormConfig = useMemo(
    () => getServiceFormConfig(serviceSlug) ?? defaultServiceFormConfig,
    [serviceSlug]
  );

  const originField: FormField = {
    name: "origin",
    label: config.originLabel,
    type: "text",
    required: true,
    placeholder: config.originPlaceholder,
  };
  const destinationField: FormField = {
    name: "destination",
    label: config.destinationLabel,
    type: "text",
    required: true,
    placeholder: config.destinationPlaceholder,
  };

  const allFields = [originField, destinationField, ...config.extras];
  const baseNames = BASE_FIELDS.map((f) => f.name);

  const [values, setValues] = useState<FieldValues>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!(values.fullName ?? "").trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!(values.email ?? "").trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!(values.phone ?? "").trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!(values.origin ?? "").trim()) {
      setError(`Please enter the ${originField.label.toLowerCase()}.`);
      return;
    }
    if (!(values.destination ?? "").trim()) {
      setError(`Please enter the ${destinationField.label.toLowerCase()}.`);
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      const details: Record<string, string> = {};
      allFields.forEach((field) => {
        if (!baseNames.includes(field.name)) {
          const v = (values[field.name] ?? "").trim();
          if (v) details[field.label] = v;
        }
      });

      const created = addEnquiry({
        customerName: values.fullName.trim(),
        companyName: (values.companyName ?? "").trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        serviceSlug,
        serviceName,
        origin: values.origin.trim(),
        destination: values.destination.trim(),
        cargoType: (values.cargoType ?? "").trim() || (values.productType ?? "").trim() || "General Cargo",
        details,
        message: (values.message ?? "").trim(),
      });

      setEnquiry(created);
      setValues({});
      setSubmitting(false);
    }, 700);
  };

  if (enquiry) {
    return (
      <div className="rounded-lg border border-background-200 bg-background-50 p-8 text-center md:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
          <i className="ri-checkbox-circle-fill text-3xl text-accent-600" aria-hidden />
        </span>
        <h3 className="mt-6 font-heading text-xl font-bold text-foreground-950 md:text-2xl">
          Enquiry Submitted Successfully
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-foreground-600">
          Your logistics enquiry has been received successfully. Our team will review the
          requirements and create your shipment order shortly. Please save your Enquiry ID for
          reference.
        </p>
        <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-lg border border-background-200 bg-background-100 px-8 py-5">
          <span className="text-xs uppercase tracking-wide text-foreground-500">Your Enquiry ID</span>
          <span className="mt-1 font-heading text-2xl font-bold tracking-wide text-primary-700">
            {enquiry.enquiryId}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-foreground-500">
          <i className="ri-information-line" aria-hidden />
          You will receive an AWB (Air Waybill) number once your enquiry is confirmed — use it to track your shipment.
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setEnquiry(null);
              setValues({});
            }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
          >
            <i className="ri-add-line" aria-hidden />
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-background-200 bg-background-50 p-6 md:p-8" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BASE_FIELDS.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-1.5 block text-xs font-semibold text-foreground-700">
              {field.label}
              {field.required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            <Field field={field} value={values[field.name] ?? ""} onChange={(v) => setValue(field.name, v)} />
          </div>
        ))}

        {allFields.map((field) => (
          <div key={field.name} className={field.full || field.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={field.name} className="mb-1.5 block text-xs font-semibold text-foreground-700">
              {field.label}
              {field.required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            <Field field={field} value={values[field.name] ?? ""} onChange={(v) => setValue(field.name, v)} />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-foreground-700">
            Additional Requirements / Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={500}
            placeholder="Tell us about your shipment requirements and our logistics team will get back to you with the next steps."
            value={values.message ?? ""}
            onChange={(e) => setValue("message", e.target.value)}
            className="w-full resize-none rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <i className="ri-error-warning-line mt-0.5" aria-hidden />
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground-500">
          By submitting, you agree to be contacted by our logistics team regarding your request.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700 disabled:opacity-60"
        >
          {submitting ? (
            <i className="ri-loader-4-line animate-spin" aria-hidden />
          ) : (
            <i className="ri-send-plane-fill" aria-hidden />
          )}
          {submitting ? "Submitting..." : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}