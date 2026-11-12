import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { getEnquiries, type Enquiry } from "@/lib/logisticsStore";

const FILTERS = ["All", "New", "Under Review", "Accepted", "Rejected"] as const;

export default function Enquiries() {
  const enquiries = getEnquiries();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enquiries.filter((e) => {
      if (filter !== "All" && e.status !== filter) return false;
      if (!q) return true;
      return [
        e.enquiryId,
        e.customerName,
        e.companyName,
        e.email,
        e.phone,
        e.serviceName,
        e.origin,
        e.destination,
        e.cargoType,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [enquiries, query, filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: enquiries.length };
    FILTERS.forEach((f) => {
      if (f !== "All") c[f] = enquiries.filter((e) => e.status === f).length;
    });
    return c;
  }, [enquiries]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground-950 md:text-2xl">Service Enquiries</h1>
        <p className="mt-1 text-sm text-foreground-600">
          Enquiries submitted from every service page on the website.
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
              <span className="ml-1.5 opacity-70">({counts[f] ?? 0})</span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400" aria-hidden />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search enquiries..."
            className="w-full rounded-md border border-background-300 bg-background-50 py-2.5 pl-10 pr-4 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-background-200 bg-background-50">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-background-200 bg-background-100 text-xs uppercase tracking-wide text-foreground-500">
                <th className="px-4 py-3 font-semibold">Enquiry ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">Submitted</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e: Enquiry) => (
                <tr key={e.enquiryId} className="border-b border-background-100 last:border-0 hover:bg-background-100/60">
                  <td className="px-4 py-3 font-semibold text-primary-700">{e.enquiryId}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground-900">{e.customerName}</p>
                    <p className="text-xs text-foreground-500">{e.companyName}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground-700">{e.serviceName}</td>
                  <td className="px-4 py-3">
                    <p className="text-foreground-700">{e.origin}</p>
                    <p className="text-xs text-foreground-400">→ {e.destination}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground-500">{e.submittedAt}</td>
                  <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/enquiries/${e.enquiryId}`}
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-100"
                    >
                      Open
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
            <i className="ri-file-search-line text-4xl text-foreground-300" aria-hidden />
            <p className="mt-3 text-sm text-foreground-500">No enquiries match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}