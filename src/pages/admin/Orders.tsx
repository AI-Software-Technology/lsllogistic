import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { getOrders } from "@/lib/logisticsStore";

const FILTERS = [
  "All",
  "In Transit",
  "Delivered",
  "Delayed",
  "Cancelled",
  "Order Received",
] as const;

export default function Orders() {
  const orders = getOrders();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [service, setService] = useState("All");

  const services = useMemo(() => Array.from(new Set(orders.map((o) => o.serviceName))), [orders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "All" && o.status !== filter) return false;
      if (service !== "All" && o.serviceName !== service) return false;
      if (!q) return true;
      return [
        o.id,
        o.awbNumber,
        o.customerName,
        o.companyName,
        o.serviceName,
        o.origin,
        o.destination,
        o.currentLocation,
        o.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [orders, query, filter, service]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground-950 md:text-2xl">
          Orders / Shipments
        </h1>
        <p className="mt-1 text-sm text-foreground-600">
          All confirmed shipment orders created from accepted enquiries.
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                filter === f
                  ? "bg-primary-600 text-background-50"
                  : "bg-background-200 text-foreground-600 hover:bg-background-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="rounded-md border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
          >
            <option value="All">All Services</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="relative w-full sm:w-64">
            <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400" aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-md border border-background-300 bg-background-50 py-2.5 pl-10 pr-4 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-background-200 bg-background-50">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead>
              <tr className="border-b border-background-200 bg-background-100 text-xs uppercase tracking-wide text-foreground-500">
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">AWB Number</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">Current Location</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">ETA</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-background-100 last:border-0 hover:bg-background-100/60">
                  <td className="px-4 py-3 font-semibold text-primary-700">{o.id}</td>
                  <td className="px-4 py-3 font-semibold text-accent-700">{o.awbNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground-900">{o.customerName}</p>
                    <p className="text-xs text-foreground-500">{o.companyName}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground-700">{o.serviceName}</td>
                  <td className="px-4 py-3">
                    <p className="text-foreground-700">{o.origin}</p>
                    <p className="text-xs text-foreground-400">→ {o.destination}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground-700">{o.currentLocation}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-xs text-foreground-500">{o.estimatedDelivery}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/orders/${o.id}`}
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-100"
                    >
                      Manage
                      <i className="ri-arrow-right-s-line" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <i className="ri-box-3-line text-4xl text-foreground-300" aria-hidden />
            <p className="mt-3 text-sm text-foreground-500">No orders match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}