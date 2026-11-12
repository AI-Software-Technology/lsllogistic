interface StatusBadgeProps {
  status: string;
}

const ENQUIRY_STYLES: Record<string, string> = {
  New: "bg-secondary-100 text-secondary-900",
  "Under Review": "bg-primary-100 text-primary-700",
  Accepted: "bg-accent-100 text-accent-800",
  Rejected: "bg-red-100 text-red-700",
};

const SHIPMENT_STYLES: Record<string, string> = {
  "Order Received": "bg-background-200 text-foreground-700",
  "Shipment Confirmed": "bg-primary-100 text-primary-700",
  "Pickup Completed": "bg-primary-100 text-primary-700",
  "In Transit": "bg-accent-100 text-accent-800",
  "Arrived at Hub": "bg-primary-100 text-primary-700",
  "Customs Clearance": "bg-primary-100 text-primary-700",
  "Out for Delivery": "bg-accent-100 text-accent-800",
  Delivered: "bg-accent-100 text-accent-800",
  Delayed: "bg-orange-100 text-orange-700",
  Cancelled: "bg-red-100 text-red-700",
};

const ICONS: Record<string, string> = {
  New: "ri-file-add-line",
  "Under Review": "ri-time-line",
  Accepted: "ri-check-double-line",
  Rejected: "ri-close-circle-line",
  "Order Received": "ri-inbox-archive-line",
  "Shipment Confirmed": "ri-verified-badge-line",
  "Pickup Completed": "ri-truck-line",
  "In Transit": "ri-flight-takeoff-line",
  "Arrived at Hub": "ri-route-line",
  "Customs Clearance": "ri-file-shield-2-line",
  "Out for Delivery": "ri-map-pin-2-line",
  Delivered: "ri-checkbox-circle-line",
  Delayed: "ri-time-line",
  Cancelled: "ri-close-circle-line",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style =
    ENQUIRY_STYLES[status] ?? SHIPMENT_STYLES[status] ?? "bg-background-200 text-foreground-700";
  const icon = ICONS[status] ?? "ri-information-line";
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      <i className={`${icon} text-sm`} aria-hidden />
      {status}
    </span>
  );
}