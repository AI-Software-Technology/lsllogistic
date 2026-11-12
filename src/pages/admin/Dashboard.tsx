import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { getDashboardStats, getRecentActivity } from "@/lib/logisticsStore";

interface CardDef {
  label: string;
  value: number;
  icon: string;
  tone: string;
  to: string;
}

export default function Dashboard() {
  const stats = getDashboardStats();
  const activity = getRecentActivity(8);

  const cards: CardDef[] = [
    { label: "Total Enquiries", value: stats.totalEnquiries, icon: "ri-file-list-3-line", tone: "bg-primary-50 text-primary-700", to: "/admin/enquiries" },
    { label: "Pending / New", value: stats.newEnquiries, icon: "ri-time-line", tone: "bg-secondary-100 text-secondary-900", to: "/admin/enquiries" },
    { label: "Accepted", value: stats.acceptedEnquiries, icon: "ri-check-double-line", tone: "bg-accent-100 text-accent-800", to: "/admin/enquiries" },
    { label: "Rejected", value: stats.rejectedEnquiries, icon: "ri-close-circle-line", tone: "bg-red-100 text-red-700", to: "/admin/enquiries" },
    { label: "Active Orders", value: stats.activeOrders, icon: "ri-box-3-line", tone: "bg-primary-50 text-primary-700", to: "/admin/orders" },
    { label: "In Transit", value: stats.inTransit, icon: "ri-flight-takeoff-line", tone: "bg-accent-100 text-accent-800", to: "/admin/orders" },
    { label: "Delivered", value: stats.delivered, icon: "ri-checkbox-circle-line", tone: "bg-accent-100 text-accent-800", to: "/admin/orders" },
    { label: "Delayed", value: stats.delayed, icon: "ri-time-line", tone: "bg-orange-100 text-orange-700", to: "/admin/orders" },
    { label: "Cancelled", value: stats.cancelled, icon: "ri-close-circle-line", tone: "bg-red-100 text-red-700", to: "/admin/orders" },
  ];

  const formatWhen = (w: string) => {
    // show a short friendly version of the timestamp
    return w.split(", ")[0] ?? w;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground-950 md:text-2xl">Dashboard</h1>
        <p className="mt-1 text-sm text-foreground-600">
          Overview of enquiries, orders and live shipment activity.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="group rounded-lg border border-background-200 bg-background-50 p-4 transition hover:border-primary-200 hover:shadow-card"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-md ${card.tone}`}>
              <i className={`${card.icon} text-lg`} aria-hidden />
            </span>
            <p className="mt-3 font-heading text-2xl font-bold text-foreground-950">{card.value}</p>
            <p className="mt-0.5 text-xs text-foreground-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-background-200 bg-background-50 p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-foreground-950">Recent Activity</h2>
            <Link
              to="/admin/enquiries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 transition hover:text-primary-700"
            >
              View All
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
          <ul className="mt-4 space-y-2">
            {activity.map((item, i) => (
              <li key={`${item.kind}-${item.refId}-${i}`}>
                <Link
                  to={item.link}
                  className="flex items-center gap-3 rounded-md border border-background-100 bg-background-100 p-3 transition hover:border-primary-200"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                      item.kind === "enquiry" ? "bg-primary-50 text-primary-700" : "bg-accent-100 text-accent-800"
                    }`}
                  >
                    <i className={item.kind === "enquiry" ? "ri-file-list-3-line text-lg" : "ri-box-3-line text-lg"} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground-900">
                      {item.title}
                      <span className="ml-2 text-xs font-normal text-foreground-500">
                        {item.refId}
                      </span>
                    </p>
                    <p className="truncate text-xs text-foreground-500">{item.subtitle}</p>
                    <p className="text-[11px] text-foreground-400">{item.kind === "enquiry" ? "Enquiry" : "Order"} • {formatWhen(item.when)}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-background-200 bg-background-50 p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              <Link
                to="/admin/enquiries"
                className="flex items-center gap-3 rounded-md border border-background-200 p-3 text-sm font-medium text-foreground-700 transition hover:border-primary-200 hover:bg-primary-50"
              >
                <i className="ri-file-list-3-line text-primary-600" aria-hidden />
                Review new enquiries
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 rounded-md border border-background-200 p-3 text-sm font-medium text-foreground-700 transition hover:border-primary-200 hover:bg-primary-50"
              >
                <i className="ri-box-3-line text-primary-600" aria-hidden />
                Manage active orders
              </Link>
              <Link
                to="/track-order"
                className="flex items-center gap-3 rounded-md border border-background-200 p-3 text-sm font-medium text-foreground-700 transition hover:border-primary-200 hover:bg-primary-50"
              >
                <i className="ri-map-pin-line text-primary-600" aria-hidden />
                View customer tracking
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-background-200 bg-background-50 p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950">Workflow</h2>
            <ol className="mt-4 space-y-3 text-sm text-foreground-600">
              <li className="flex gap-3"><i className="ri-file-add-line text-accent-600" aria-hidden /><span>Customer submits a service enquiry</span></li>
              <li className="flex gap-3"><i className="ri-eye-line text-accent-600" aria-hidden /><span>Review &amp; Accept / Reject</span></li>
              <li className="flex gap-3"><i className="ri-add-circle-line text-accent-600" aria-hidden /><span>Create Order with a unique Order ID</span></li>
              <li className="flex gap-3"><i className="ri-truck-line text-accent-600" aria-hidden /><span>Update status — tracking updates live</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}