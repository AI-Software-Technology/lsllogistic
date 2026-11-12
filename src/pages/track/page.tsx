import { Link } from "react-router-dom";
import PageHeader from "@/components/feature/PageHeader";
import TrackingWidget from "@/components/feature/TrackingWidget";
import ScrollReveal from "@/components/feature/ScrollReveal";
import usePageMeta from "@/hooks/usePageMeta";

const statuses = [
  { label: "Order Received", note: "Shipment request has been registered." },
  { label: "Confirmed", note: "Shipment confirmed and processing started." },
  { label: "Picked Up", note: "Cargo has been collected from the shipper." },
  { label: "In Transit", note: "Shipment is currently moving through the network." },
  { label: "Arrived at Hub", note: "Shipment has reached a logistics hub." },
  { label: "Customs Clearance", note: "Shipment is undergoing customs clearance." },
  { label: "Out for Delivery", note: "Shipment is on the final delivery route." },
  { label: "Delivered", note: "Shipment reached its destination successfully." },
  { label: "Delayed", note: "Shipment has been temporarily delayed." },
  { label: "Cancelled", note: "Shipment has been cancelled." },
];

export default function TrackPage() {
  usePageMeta(
    "Track Your Shipment | AWB Number Tracking | LSL Logistics Network",
    "Track your LSL Logistics shipment in real time by entering your AWB (Air Waybill) number. Check current status, shipment timeline and estimated delivery — no login required.",
    "/track-order"
  );

  return (
    <>
      <PageHeader
        title="Track Your Shipment"
        subtitle="Enter your AWB (Air Waybill) number to check the latest shipment status. No login required."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Shipment Tracking" }]}
      />

      <TrackingWidget />

      <section className="bg-background-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
                <span className="h-px w-6 bg-primary-600" aria-hidden />
                Shipment Status Guide
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold text-foreground-950 md:text-4xl">
                Understanding Your Shipment Status
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                Here's what each status means as your cargo moves through the LSL
                logistics network.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statuses.map((s, i) => (
              <ScrollReveal key={s.label} delay={(i % 3) * 60}>
                <div className="flex h-full items-start gap-3 rounded-lg border border-background-200 bg-background-100 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-100">
                    <i className="ri-information-line text-accent-700" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground-950">{s.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-600">{s.note}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 rounded-lg border border-background-200 bg-background-100 p-8 text-center">
              <h3 className="font-heading text-xl font-bold text-foreground-950">
                Need help with your shipment?
              </h3>
              <p className="mt-2 text-sm text-foreground-600">
                Our team is ready to assist you with tracking, quotes and any logistics query.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
              >
                Contact Our Team
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}