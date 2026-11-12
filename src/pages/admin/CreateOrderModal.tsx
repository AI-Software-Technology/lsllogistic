import { useState, type FormEvent } from "react";
import { createOrderFromEnquiry, isAwbNumberTaken, type Enquiry, type Order } from "@/lib/logisticsStore";

interface CreateOrderModalProps {
  enquiry: Enquiry;
  onClose: () => void;
  onCreated: (order: Order) => void;
}

function toInputDate(d: string): string {
  // "02 Sep 2026" -> "2026-09-02"
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return "";
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromInputDate(v: string): string {
  if (!v) return "";
  const d = new Date(v);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function todayDate(): string {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function CreateOrderModal({ enquiry, onClose, onCreated }: CreateOrderModalProps) {
  const [form, setForm] = useState({
    awbNumber: "",
    shipmentType: enquiry.serviceName,
    shipmentDate: "",
    estimatedDelivery: "",
    currentLocation: enquiry.origin,
    cargoType: enquiry.cargoType,
    weight: enquiry.details.weight ?? "",
    packageDetails: "",
    notes: enquiry.message,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.awbNumber.trim()) {
      setError("Please enter the AWB (Air Waybill) number for this shipment.");
      return;
    }
    if (isAwbNumberTaken(form.awbNumber)) {
      setError("This AWB number is already assigned to another order. Please use a unique AWB number.");
      return;
    }
    if (!form.shipmentType.trim()) {
      setError("Please enter the shipment type.");
      return;
    }
    if (!form.currentLocation.trim()) {
      setError("Please enter the current location.");
      return;
    }
    if (!form.cargoType.trim()) {
      setError("Please enter the cargo type.");
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      const created = createOrderFromEnquiry(enquiry.enquiryId, {
        awbNumber: form.awbNumber.trim(),
        shipmentType: form.shipmentType.trim(),
        shipmentDate: fromInputDate(form.shipmentDate) || todayDate(),
        estimatedDelivery: fromInputDate(form.estimatedDelivery),
        currentLocation: form.currentLocation.trim(),
        cargoType: form.cargoType.trim(),
        weight: form.weight.trim(),
        packageDetails: form.packageDetails.trim(),
        notes: form.notes.trim(),
      });
      setSubmitting(false);
      if (created) {
        onCreated(created);
      } else {
        setError("Unable to create order. This enquiry may already have an order.");
      }
    }, 500);
  };

  const infoRows = [
    { label: "Customer", value: `${enquiry.customerName}${enquiry.companyName ? ` • ${enquiry.companyName}` : ""}` },
    { label: "Email", value: enquiry.email },
    { label: "Phone", value: enquiry.phone },
    { label: "Enquiry ID", value: enquiry.enquiryId },
  ];

  const fields = [
    { key: "awbNumber", label: "AWB Number (Air Waybill)", type: "text" },
    { key: "shipmentType", label: "Shipment Type", type: "text" },
    { key: "shipmentDate", label: "Shipment Date", type: "date" },
    { key: "estimatedDelivery", label: "Estimated Delivery Date", type: "date" },
    { key: "currentLocation", label: "Current Location", type: "text" },
    { key: "cargoType", label: "Cargo Type", type: "text" },
    { key: "weight", label: "Cargo Weight", type: "text" },
    { key: "packageDetails", label: "Package / Container Details", type: "text" },
  ] as const;

  const awbHint = "This AWB number is what your customer will use to track this shipment.";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 py-10">
      <div className="w-full max-w-2xl rounded-lg border border-background-200 bg-background-50 shadow-card">
        <div className="flex items-start justify-between border-b border-background-200 p-6">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground-950">Create Order</h2>
            <p className="mt-1 text-xs text-foreground-500">
              Create a confirmed shipment order from accepted enquiry{" "}
              <span className="font-semibold text-primary-700">{enquiry.enquiryId}</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground-500 transition hover:bg-background-100 hover:text-foreground-800"
            aria-label="Close"
          >
            <i className="ri-close-line text-xl" aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="rounded-md bg-background-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-500">
              Enquiry Information (pre-filled)
            </p>
            <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {infoRows.map((row) => (
                <div key={row.label}>
                  <dt className="text-xs text-foreground-500">{row.label}</dt>
                  <dd className="text-sm font-medium text-foreground-800">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key}>
                <label htmlFor={`create-${field.key}`} className="mb-1.5 block text-xs font-semibold text-foreground-700">
                  {field.label}
                </label>
                <input
                  id={`create-${field.key}`}
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => set(field.key, e.target.value)}
                  className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
                />
                {field.key === "awbNumber" && (
                  <p className="mt-1.5 text-xs text-foreground-500">{awbHint}</p>
                )}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="create-notes" className="mb-1.5 block text-xs font-semibold text-foreground-700">
                Additional Notes
              </label>
              <textarea
                id="create-notes"
                rows={3}
                maxLength={500}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                className="w-full resize-none rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <i className="ri-error-warning-line mt-0.5" aria-hidden />
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse items-stretch justify-end gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-2.5 text-sm font-semibold text-foreground-700 transition hover:bg-background-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting ? (
                <i className="ri-loader-4-line animate-spin" aria-hidden />
              ) : (
                <i className="ri-add-circle-line" aria-hidden />
              )}
              {submitting ? "Creating..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}