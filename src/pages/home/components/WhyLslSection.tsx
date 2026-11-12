import ScrollReveal from "@/components/feature/ScrollReveal";
import SectionHeading from "@/components/feature/SectionHeading";

const reasons = [
  { title: "Reliable Operations", desc: "Dependable logistics coordination and shipment handling.", icon: "ri-shield-check-line" },
  { title: "End-to-End Solutions", desc: "From pickup and transportation to delivery and distribution.", icon: "ri-route-line" },
  { title: "Multimodal Transportation", desc: "Integrated road, rail, air and ocean freight capabilities.", icon: "ri-train-line" },
  { title: "Shipment Visibility", desc: "Track your shipment anytime using your unique AWB number.", icon: "ri-eye-line" },
  { title: "Customer Focused", desc: "Solutions designed around individual business requirements.", icon: "ri-heart-3-line" },
  { title: "Professional Execution", desc: "Structured processes and coordinated logistics operations.", icon: "ri-verified-badge-line" },
];

export default function WhyLslSection() {
  return (
    <section className="bg-primary-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why LSL"
            title="Why Businesses Choose LSL"
            subtitle="A logistics partner built on reliability, coordination and professional execution."
            dark
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} delay={(i % 3) * 80}>
              <div className="group h-full rounded-lg border border-primary-800 bg-primary-900/40 p-6 transition duration-300 hover:border-accent-500/50 hover:bg-primary-900/70">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-500">
                  <i className={`${r.icon} text-xl text-foreground-950`} aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground-50">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-300">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}