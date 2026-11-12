import { Link } from "react-router-dom";
import ScrollReveal from "@/components/feature/ScrollReveal";
import Counter from "@/components/feature/Counter";

const highlights = [
  { label: "End-to-end shipment management", icon: "ri-route-line" },
  { label: "Multimodal transportation", icon: "ri-train-line" },
  { label: "Professional coordination", icon: "ri-team-line" },
  { label: "Customer-focused service", icon: "ri-heart-3-line" },
  { label: "Technology-enabled visibility", icon: "ri-eye-line" },
  { label: "Reliable logistics solutions", icon: "ri-shield-check-line" },
];

export default function AboutSection() {
  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20logistics%20operations%20team%20reviewing%20global%20container%20operations%20at%20a%20port%2C%20with%20cargo%20ships%20and%20containers%20behind%2C%20corporate%20business%20photography%2C%20confident%20and%20professional%2C%20premium%20tone%2C%20sharp%20detail&width=1000&height=800&seq=lsl-about-1&orientation=portrait"
                alt="LSL logistics operations team at a container port"
                className="h-[420px] w-full rounded-lg object-cover md:h-[520px]"
              />
              <div className="absolute -bottom-6 -right-4 hidden rounded-lg bg-accent-500 px-6 py-5 shadow-soft md:block">
                <p className="text-3xl font-extrabold text-foreground-950">
                  <Counter end={120} suffix="+" />
                </p>
                <p className="text-xs font-semibold text-foreground-800">Global Trade Lanes Served</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
              <span className="h-px w-6 bg-primary-600" aria-hidden />
              Who We Are
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-foreground-950 md:text-4xl">
              Logistics Built Around Your Business
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
              LSL Logistics Network provides integrated logistics and supply chain solutions
              designed to help businesses move goods efficiently, securely and reliably. We
              combine deep freight expertise with technology to give your cargo the speed,
              safety and transparency it deserves.
            </p>
            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h.label} className="flex items-center gap-2.5 text-sm text-foreground-700">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100">
                    <i className={`${h.icon} text-accent-700`} aria-hidden />
                  </span>
                  {h.label}
                </li>
              ))}
            </ul>
            <Link
              to="/about-us"
              className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
            >
              Know More About Us
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}