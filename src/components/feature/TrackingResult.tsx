import { TIMELINE_STATUSES, formatStatusClass, type Shipment } from "@/lib/shipments";

interface TrackingResultProps {
  shipment: Shipment;
  loading?: boolean;
}

const STATUS_INDEX: Record<string, number> = {
  "Order Received": 0,
  "Shipment Confirmed": 1,
  "Pickup Completed": 2,
  "Picked Up": 2,
  "In Transit": 3,
  "Arrived at Hub": 4,
  "Customs Clearance": 5,
  "Out for Delivery": 6,
  "Delivered": 7,
  Delayed: 3,
  Cancelled: 0,
};

export default function TrackingResult({ shipment, loading }: TrackingResultProps) {
  const currentIndex = STATUS_INDEX[shipment.status] ?? 0;
  const isDelayed = shipment.status.toLowerCase() === "delayed";
  const isCancelled = shipment.status.toLowerCase() === "cancelled";
  const latestIndex = shipment.history.length - 1;

  const detailRows: { label: string; value: string; icon: string }[] = [
    { label: "Shipment Date", value: shipment.shipmentDate, icon: "ri-calendar-line" },
    { label: "Origin", value: shipment.origin, icon: "ri-map-pin-2-line" },
    { label: "Destination", value: shipment.destination, icon: "ri-map-pin-5-line" },
    { label: "Current Location", value: shipment.currentLocation, icon: "ri-send-plane-line" },
    { label: "Estimated Delivery", value: shipment.estimatedDelivery, icon: "ri-timer-line" },
    { label: "Last Updated", value: shipment.lastUpdated, icon: "ri-time-line" },
    { label: "Shipment Type", value: shipment.shipmentType, icon: "ri-box-3-line" },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-background-200 bg-background-50">
      <div className="flex flex-col gap-3 border-b border-background-200 bg-background-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-foreground-500">AWB Number</p>
          <p className="font-heading text-lg font-bold text-foreground-950">{shipment.awbNumber}</p>
          <p className="mt-0.5 text-xs text-foreground-400">Order ID (internal): {shipment.id}</p>
        </div>
        <span
          className={`inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${formatStatusClass(shipment.status)}`}
        >
          <span className="h-2 w-2 rounded-full bg-current lsl-pulse-dot" aria-hidden />
          {shipment.status}
        </span>
      </div>

      {(isDelayed || isCancelled) && (
        <div
          className={`border-b px-5 py-4 text-sm ${
            isDelayed
              ? "border-orange-200 bg-orange-50 text-orange-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <div className="flex items-start gap-2">
            <i className={`ri-${isDelayed ? "time" : "close-circle"}-line text-lg`} aria-hidden />
            <span>
              {isDelayed
                ? "This shipment has been temporarily delayed. Our team is coordinating to minimise the impact on your delivery."
                : "This shipment has been cancelled. Please contact our team if this is unexpected."}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 p-5 md:grid-cols-2 md:p-6">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground-950">Shipment Timeline</h3>
          <ol className="relative mt-5 space-y-1 border-l border-background-200 pl-6">
            {TIMELINE_STATUSES.map((status, i) => {
              const done = i < currentIndex;
              const current = i === currentIndex;
              return (
                <li key={status} className="relative">
                  <span
                    className={`absolute -left-[30px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      done
                        ? "border-accent-500 bg-accent-500"
                        : current
                        ? "border-accent-500 bg-background-50"
                        : "border-background-300 bg-background-50"
                    }`}
                    aria-hidden
                  >
                    {done && <i className="ri-check-line text-[10px] text-background-50" aria-hidden />}
                    {current && <span className="h-2 w-2 rounded-full bg-accent-500 lsl-pulse-dot" aria-hidden />}
                  </span>
                  <span
                    className={`block py-1.5 text-sm ${
                      done
                        ? "text-foreground-700"
                        : current
                        ? "font-semibold text-foreground-950"
                        : "text-foreground-400"
                    }`}
                  >
                    {status}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-foreground-950">Shipment Details</h3>
          <dl className="mt-5 space-y-3">
            {detailRows.map((row) => (
              <div
                key={row.label}
                className="flex items-start justify-between gap-4 border-b border-background-100 pb-3"
              >
                <dt className="flex items-center gap-2 text-sm text-foreground-500">
                  <i className={`${row.icon} text-primary-600`} aria-hidden />
                  {row.label}
                </dt>
                <dd className="text-right text-sm font-medium text-foreground-800">{row.value || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-background-200 p-5 md:p-6">
        <h3 className="font-heading text-base font-bold text-foreground-950">Shipment Event History</h3>
        <ul className="mt-4 space-y-3">
          {shipment.history.map((event, i) => {
            const isLatest = i === latestIndex;
            return (
              <li
                key={event.label + event.when + i}
                className="flex gap-3 rounded-lg border border-background-100 bg-background-50 p-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100">
                  <i className="ri-check-double-line text-accent-700" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground-900">
                    {event.label}
                    {isLatest && (
                      <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700">
                        Latest
                      </span>
                    )}
                    <span className="text-xs font-normal text-foreground-500">{event.when}</span>
                  </p>
                  {event.location && (
                    <p className="flex items-center gap-1 text-xs text-foreground-500">
                      <i className="ri-map-pin-line" aria-hidden />
                      {event.location}
                    </p>
                  )}
                  <p className="text-sm text-foreground-600">{event.note}</p>
                </div>
              </li>
            );
          })}
        </ul>
        {!loading && shipment.history.length === 0 && (
          <p className="mt-3 text-sm text-foreground-500">No status events recorded yet.</p>
        )}
      </div>
    </div>
  );
}