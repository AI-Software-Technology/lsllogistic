import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import CreateOrderModal from "./CreateOrderModal";
import { getEnquiry, setEnquiryStatus, type Order } from "@/lib/logisticsStore";

export default function EnquiryDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(() => getEnquiry(id));
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [toast, setToast] = useState("");

  if (!enquiry) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <i className="ri-file-search-line text-4xl text-foreground-300" aria-hidden />
        <p className="mt-3 text-sm text-foreground-500">Enquiry not found.</p>
        <Link to="/admin/enquiries" className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700">
          Back to Enquiries
        </Link>
      </div>
    );
  }

  const refresh = () => setEnquiry(getEnquiry(id));

  const accept = () => {
    setEnquiryStatus(enquiry.enquiryId, "Accepted", "");
    refresh();
    setToast("Enquiry accepted. You can now create an order.");
    window.setTimeout(() => setToast(""), 3000);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) return;
    setEnquiryStatus(enquiry.enquiryId, "Rejected", rejectReason.trim());
    refresh();
    setRejectOpen(false);
    setRejectReason("");
    setToast("Enquiry rejected with reason saved.");
    window.setTimeout(() => setToast(""), 3000);
  };

  const onCreated = (order: Order) => {
    setCreateOpen(false);
    refresh();
    navigate(`/admin/orders/${order.id}`);
  };

  const commonRows = [
    { label: "Enquiry ID", value: enquiry.enquiryId },
    { label: "Customer Name", value: enquiry.customerName },
    { label: "Company Name", value: enquiry.companyName || "—" },
    { label: "Email", value: enquiry.email },
    { label: "Phone", value: enquiry.phone },
    { label: "Service Requested", value: enquiry.serviceName },
    { label: "Origin", value: enquiry.origin },
    { label: "Destination", value: enquiry.destination },
    { label: "Cargo Type", value: enquiry.cargoType },
    { label: "Submitted", value: enquiry.submittedAt },
  ];

  const detailEntries = Object.entries(enquiry.details);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/admin/enquiries" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 transition hover:text-primary-700">
            <i className="ri-arrow-left-line" aria-hidden />
            Back to Enquiries
          </Link>
          <h1 className="mt-2 font-heading text-xl font-bold text-foreground-950 md:text-2xl">
            Enquiry {enquiry.enquiryId}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <StatusBadge status={enquiry.status} />
            {enquiry.orderId && (
              <Link to={`/admin/orders/${enquiry.orderId}`} className="text-xs font-semibold text-accent-700 hover:underline">
                → Order {enquiry.orderId}
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {enquiry.status !== "Rejected" && (
            <button
              type="button"
              onClick={accept}
              disabled={enquiry.status === "Accepted"}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-5 py-2.5 text-sm font-semibold text-background-50 transition hover:bg-accent-700 disabled:opacity-50"
            >
              <i className="ri-check-double-line" aria-hidden />
              Accept Enquiry
            </button>
          )}
          {enquiry.status !== "Accepted" && (
            <button
              type="button"
              onClick={() => setRejectOpen(true)}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
            >
              <i className="ri-close-circle-line" aria-hidden />
              Reject Enquiry
            </button>
          )}
          {enquiry.status === "Accepted" && (
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              disabled={!!enquiry.orderId}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700 disabled:opacity-50"
            >
              <i className="ri-add-circle-line" aria-hidden />
              {enquiry.orderId ? "Order Created" : "Create Order"}
            </button>
          )}
        </div>
      </div>

      {toast && (
        <div className="flex items-center gap-2 rounded-md border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-800">
          <i className="ri-checkbox-circle-line" aria-hidden />
          {toast}
        </div>
      )}

      {enquiry.status === "Rejected" && enquiry.rejectionReason && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">Rejection Reason</p>
          <p className="mt-1">{enquiry.rejectionReason}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-background-200 bg-background-50 p-5 lg:col-span-2">
          <h2 className="font-heading text-base font-bold text-foreground-950">Enquiry Information</h2>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {commonRows.map((row) => (
              <div key={row.label} className="rounded-md bg-background-100 p-3">
                <dt className="text-xs text-foreground-500">{row.label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-foreground-800">{row.value}</dd>
              </div>
            ))}
          </dl>

          {detailEntries.length > 0 && (
            <>
              <h3 className="mt-6 font-heading text-sm font-bold text-foreground-950">
                Service-Specific Details
              </h3>
              <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {detailEntries.map(([k, v]) => (
                  <div key={k} className="rounded-md bg-background-100 p-3">
                    <dt className="text-xs text-foreground-500">{k}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-foreground-800">{v}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {enquiry.message && (
            <div className="mt-6">
              <h3 className="font-heading text-sm font-bold text-foreground-950">Message</h3>
              <p className="mt-2 rounded-md bg-background-100 p-3 text-sm text-foreground-700">
                {enquiry.message}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-background-200 bg-background-50 p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950">Admin Notes</h2>
            <textarea
              defaultValue={enquiry.adminNotes}
              rows={4}
              maxLength={500}
              placeholder="Add internal notes about this enquiry..."
              className="mt-3 w-full resize-none rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
              onBlur={(e) => {
                setEnquiryStatus(enquiry.enquiryId, enquiry.status, e.target.value);
                refresh();
              }}
            />
          </div>

          <div className="rounded-lg border border-background-200 bg-background-50 p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950">Workflow Status</h2>
            <ol className="mt-3 space-y-3 text-sm text-foreground-600">
              <li className="flex gap-3"><i className={`ri-file-add-line ${enquiry.status !== "New" ? "text-accent-600" : "text-foreground-300"}`} aria-hidden /><span>Enquiry received — {enquiry.status}</span></li>
              <li className="flex gap-3"><i className={`ri-check-double-line ${enquiry.status === "Accepted" ? "text-accent-600" : "text-foreground-300"}`} aria-hidden /><span>Accepted by admin</span></li>
              <li className="flex gap-3"><i className={`ri-add-circle-line ${enquiry.orderId ? "text-accent-600" : "text-foreground-300"}`} aria-hidden /><span>Order created {enquiry.orderId ? `(${enquiry.orderId})` : ""}</span></li>
            </ol>
          </div>
        </div>
      </div>

      {rejectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg border border-background-200 bg-background-50 p-6 shadow-card">
            <h2 className="font-heading text-lg font-bold text-foreground-950">Reject Enquiry</h2>
            <p className="mt-1 text-sm text-foreground-600">
              The enquiry record will be kept for future reference.
            </p>
            <label htmlFor="reject-reason" className="mt-4 block text-xs font-semibold text-foreground-700">
              Rejection Reason
            </label>
            <textarea
              id="reject-reason"
              rows={4}
              maxLength={500}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Why is this enquiry being rejected?"
              className="mt-1.5 w-full resize-none rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setRejectOpen(false)}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-2.5 text-sm font-semibold text-foreground-700 transition hover:bg-background-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReject}
                disabled={!rejectReason.trim()}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-background-50 transition hover:bg-red-700 disabled:opacity-50"
              >
                <i className="ri-close-circle-line" aria-hidden />
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {createOpen && (
        <CreateOrderModal enquiry={enquiry} onClose={() => setCreateOpen(false)} onCreated={onCreated} />
      )}
    </div>
  );
}