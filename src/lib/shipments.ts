import {
  getShipmentByAwbNumber,
  sampleAwbNumber as storeSampleAwbNumber,
  type Shipment,
  type ShipmentEvent,
} from "@/lib/logisticsStore";

export type { Shipment, ShipmentEvent };

// Re-export the canonical timeline so public tracking and admin stay in sync.
export const TIMELINE_STATUSES = [
  "Order Received",
  "Shipment Confirmed",
  "Pickup Completed",
  "In Transit",
  "Arrived at Hub",
  "Customs Clearance",
  "Out for Delivery",
  "Delivered",
] as const;

export function sampleAwbNumber(): string {
  return storeSampleAwbNumber();
}

// Orders (seeded + admin-created) are the single source of truth in
// logisticsStore. This lookup keeps the public tracking widget connected to the
// exact same data the admin panel manages — customers track via AWB Number.
export async function fetchShipmentByAwbNumber(awb: string): Promise<Shipment | null> {
  return getShipmentByAwbNumber(awb);
}

export function formatStatusClass(status: string): string {
  const lower = status.toLowerCase();
  if (lower.includes("delivered")) return "text-accent-700 bg-accent-100";
  if (lower.includes("delayed")) return "text-orange-700 bg-orange-100";
  if (lower.includes("cancelled") || lower.includes("canceled")) return "text-red-700 bg-red-100";
  return "text-primary-700 bg-primary-100";
}