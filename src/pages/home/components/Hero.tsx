import { Link } from "react-router-dom";
import ScrollReveal from "@/components/feature/ScrollReveal";

const trustPoints = ["End-to-End Logistics", "Reliable Delivery", "Global Connectivity"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[700px]">
      <img
        src="https://readdy.ai/api/search-image?query=Sweeping%20aerial%20view%20of%20a%20busy%20container%20terminal%20and%20port%20with%20large%20container%20ships%2C%20stacked%20shipping%20containers%2C%20gantry%20cranes%20and%20global%20cargo%20infrastructure%2C%20deep%20corporate%20blue%20and%20teal%20tone%2C%20cinematic%20atmospheric%20lighting%2C%20professional%20logistics%20photography%2C%20premium%20international%20freight%20aesthetic&width=1800&height=1000&seq=lsl-hero-1&orientation=landscape"
        alt="Global container port with cargo ships and cranes"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/55 to-primary-950/80" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-6">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-300/40 bg-accent-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-200">
            <i className="ri-global-line" aria-hidden />
            Freight Forwarding &amp; Supply Chain
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] text-foreground-50 md:text-6xl">
            Connecting Businesses.
            <span className="block text-accent-300">Moving Possibilities.</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-200 md:text-lg">
            Reliable, efficient and technology-driven logistics solutions for businesses
            across India and global markets.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent-500 px-7 py-3.5 text-sm font-semibold text-foreground-950 transition hover:bg-accent-600"
            >
              Get a Quote
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
            <Link
              to="/track-order"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-50/40 bg-background-50/10 px-7 py-3.5 text-sm font-semibold text-foreground-50 backdrop-blur transition hover:bg-background-50/20"
            >
              <i className="ri-search-line" aria-hidden />
              Track Your Shipment
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-background-50/15 pt-6">
            {trustPoints.map((p, i) => (
              <span key={p} className="flex items-center gap-2 text-sm font-medium text-foreground-100">
                {i > 0 && <i className="ri-circle-fill text-[5px] text-accent-300" aria-hidden />}
                <i className="ri-checkbox-circle-line text-accent-300" aria-hidden />
                {p}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}