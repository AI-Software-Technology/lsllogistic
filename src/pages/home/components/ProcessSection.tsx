import ScrollReveal from "@/components/feature/ScrollReveal";
import SectionHeading from "@/components/feature/SectionHeading";

const steps = [
  { num: "01", title: "Request", desc: "Customer submits shipment requirement.", icon: "ri-file-list-3-line" },
  { num: "02", title: "Planning", desc: "LSL develops the appropriate logistics solution.", icon: "ri-settings-3-line" },
  { num: "03", title: "Pickup", desc: "Cargo is collected and prepared for transportation.", icon: "ri-truck-line" },
  { num: "04", title: "Transportation", desc: "Shipment moves through the selected logistics network.", icon: "ri-send-plane-line" },
  { num: "05", title: "Delivery", desc: "Cargo reaches the final destination safely and efficiently.", icon: "ri-map-pin-2-line" },
];

export default function ProcessSection() {
  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How It Works"
            title="A Simple, Reliable Logistics Process"
            subtitle="From your first request to final delivery, we keep every step coordinated and transparent."
          />
        </ScrollReveal>

        <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-5">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 90}>
              <div className="relative flex h-full flex-col items-center text-center">
                <div className="relative">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                    <i className={`${step.icon} text-2xl text-background-50`} aria-hidden />
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-xs font-extrabold text-foreground-950">
                    {step.num}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-600">{step.desc}</p>
                {i < steps.length - 1 && (
                  <span
                    className="absolute right-[-2rem] top-8 hidden text-2xl text-primary-300 md:block"
                    aria-hidden
                  >
                    <i className="ri-arrow-right-line" />
                  </span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}