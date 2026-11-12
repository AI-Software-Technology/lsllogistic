import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import {
  ALL_STATUSES,
  getOrder,
  updateOrder,
  type ShipmentStatus,
} from "@/lib/logisticsStore";

function toInputDate(d: string): string {
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return "";
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromInputDate(v: string): string {
  if (!v) return "";
  return new Date(v).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const TIMELINE = [
  "Order Received",
  "Shipment Confirmed",
  "Pickup Completed",
  "In Transit",
  "Arrived at Hub",
  "Customs Clearance",
  "Out for Delivery",
  "Delivered",
];

export default function OrderDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const [order, setOrder] = useState(() => getOrder(id));
  const [status, setStatus] = useState<ShipmentStatus>(
    (getOrder(id)?.status as ShipmentStatus) ?? "Order Received"
  );
  const [awbNumber, setAwbNumber] = useState(getOrder(id)?.awbNumber ?? "");
  const [currentLocation, setCurrentLocation] = useState(getOrder(id)?.currentLocation ?? "");
  const [estimatedDelivery, setEstimatedDelivery] = useState(toInputDate(getOrder(id)?.estimatedDelivery ?? ""));
  const [notes, setNotes] = useState(getOrder(id)?.notes ?? "");
  const [toast, setToast] = useState("");

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <i className="ri-box-3-line text-4xl text-foreground-300" aria-hidden />
        <p className="mt-3 text-sm text-foreground-500">Order not found.</p>
        <Link to="/admin/orders" className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700">
          Back to Orders
        </Link>
      </div>
    );
  }

  const refresh = () => {
    const updated = getOrder(id);
    if (updated) setOrder(updated);
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!awbNumber.trim()) {
      setToast("Please enter the AWB number.");
      window.setTimeout(() => setToast(""), 3000);
      return;
    }
    if (!currentLocation.trim()) {
      setToast("Please enter the current location.");
      window.setTimeout(() => setToast(""), 3000);
      return;
    }
    const result = updateOrder(id, {
      status,
      awbNumber: awbNumber.trim(),
      currentLocation: currentLocation.trim(),
      estimatedDelivery: fromInputDate(estimatedDelivery),
      notes: notes.trim(),
    });
    if (result.awbTaken) {
      setToast("That AWB number is already assigned to another order.");
      window.setTimeout(() => setToast(""), 3500);
      return;
    }
    refresh();
    setToast("Shipment updated. Tracking history records added.");
    window.setTimeout(() => setToast(""), 3500);
    if (result.order) {
      setStatus(result.order.status as ShipmentStatus);
      setAwbNumber(result.order.awbNumber);
    }
  };

  const shield = (s: string) => s === order.status;

  const infoRows = [
    { label: "Order ID", value: order.id },
    { label: "AWB Number", value: order.awbNumber },
    { label: "Enquiry ID", value: order.enquiryId },
    { label: "Customer", value: `${order.customerName}${order.companyName ? ` • ${order.companyName}` : ""}` },
    { label: "Email", value: order.email },
    { label: "Phone", value: order.phone },
    { label: "Service", value: order.serviceName },
    { label: "Shipment Type", value: order.shipmentType },
    { label: "Shipment Date", value: order.shipmentDate },
    { label: "Origin", value: order.origin },
    { label: "Destination", value: order.destination },
    { label: "Cargo Type", value: order.cargoType },
    { label: "Weight", value: order.weight || "—" },
    { label: "Package Details", value: order.packageDetails || "—" },
    { label: "Last Updated", value: order.lastUpdated },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/admin/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 transition hover:text-primary-700">
            <i className="ri-arrow-left-line" aria-hidden />
            Back to Orders
          </Link>
          <h1 className="mt-2 font-heading text-xl font-bold text-foreground-950 md:text-2xl">
            Order {order.id}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <StatusBadge status={order.status} />
            <Link to="/track-order" className="text-xs font-semibold text-accent-700 hover:underline">
              ← View customer tracking page
            </Link>
          </div>
        </div>
      </div>

      {toast && (
        <div className="flex items-center gap-2 rounded-md border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-800">
          <i className="ri-checkbox-circle-line" aria-hidden />
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-background-200 bg-background-50 p-5 lg:col-span-2">
          <h2 className="font-heading text-base font-bold text-foreground-950">Shipment Details</h2>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {infoRows.map((row) => (
              <div key={row.label} className="rounded-md bg-background-100 p-3">
                <dt className="text-xs text-foreground-500">{row.label}</dt>
                <dd className="mt-0.5 break-words text-sm font-medium text-foreground-800">{row.value}</dd>
              </div>
            ))}
          </dl>

          {order.notes && (
            <div className="mt-6">
              <h3 className="font-heading text-sm font-bold text-foreground-950">Notes</h3>
              <p className="mt-2 rounded-md bg-background-100 p-3 text-sm text-foreground-700">{order.notes}</p>
            </div>
          )}

          <h3 className="mt-6 font-heading text-sm font-bold text-foreground-950">Tracking History</h3>
          <ol className="relative mt-4 space-y-1 border-l border-background-200 pl-6">
            {TIMELINE.map((t, i) => {
              const completed = order.history.some((h) => h.label === t) || TIMELINE.indexOf(order.status) > i;
              const isCurrent = shield(t);
              return (
                <li key={t} className="relative">
                  <span
                    className={`absolute -left-[30px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      completed
                        ? "border-accent-500 bg-accent-500"
                        : isCurrent
                        ? "border-accent-500 bg-background-50"
                        : "border-background-300 bg-background-50"
                    }`}
                    aria-hidden
                  >
                    {completed && <i className="ri-check-line text-[10px] text-background-50" aria-hidden />}
                    {isCurrent && <span className="h-2 w-2 rounded-full bg-accent-500 lsl-pulse-dot" aria-hidden />}
                  </span>
                  <span className={`block py-1.5 text-sm ${completed ? "text-foreground-700" : isCurrent ? "font-semibold text-foreground-950" : "text-foreground-400"}`}>
                    {t}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleUpdate} className="rounded-lg border border-background-200 bg-background-50 p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950">Update Shipment</h2>

            <label htmlFor="order-status" className="mt-4 block text-xs font-semibold text-foreground-700">
              Current Status
            </label>
            <select
              id="order-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
              className="mt-1.5 w-full rounded-md border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <label htmlFor="order-awb" className="mt-4 block text-xs font-semibold text-foreground-700">
              AWB Number (Air Waybill)
            </label>
            <input
              id="order-awb"
              type="text"
              value={awbNumber}
              onChange={(e) => setAwbNumber(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />

            <label htmlFor="order-location" className="mt-4 block text-xs font-semibold text-foreground-700">
              Current Location
            </label>
            <input
              id="order-location"
              type="text"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />

            <label htmlFor="order-eta" className="mt-4 block text-xs font-semibold text-foreground-700">
              Estimated Delivery Date
            </label>
            <input
              id="order-eta"
              type="date"
              value={estimatedDelivery}
              onChange={(e) => setEstimatedDelivery(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />

            <label htmlFor="order-notes" className="mt-4 block text-xs font-semibold text-foreground-700">
              Shipment Notes
            </label>
            <textarea
              id="order-notes"
              rows={4}
              maxLength={500}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5 w-full resize-none rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
            >
              <i className="ri-refresh-line" aria-hidden />
              Update Shipment
            </button>
            <p className="mt-3 text-center text-xs text-foreground-500">
              Changing status adds a new entry to Tracking History automatically.
            </p>
          </form>
        </div>
      </div>

      <div className="rounded-lg border border-background-200 bg-background-50 p-5">
        <h2 className="font-heading text-base font-bold text-foreground-950">Tracking History Events</h2>
        <ul className="mt-4 space-y-3">
          {[...order.history].reverse().map((ev, i) => (
            <li key={`${ev.label}-${ev.when}-${i}`} className="flex gap-3 rounded-md border border-background-100 bg-background-100 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-100">
                <i className="ri-check-double-line text-accent-700" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground-900">
                  {ev.label}
                  {i === 0 && (
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700">
                      Latest
                    </span>
                  )}
                  <span className="text-xs font-normal text-foreground-500">{ev.when}</span>
                </p>
                {ev.location && (
                  <p className="flex items-center gap-1 text-xs text-foreground-500">
                    <i className="ri-map-pin-line" aria-hidden />
                    {ev.location}
                  </p>
                )}
                <p className="text-sm text-foreground-600">{ev.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}