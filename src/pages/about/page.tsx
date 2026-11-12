import PageHeader from "@/components/feature/PageHeader";
import ScrollReveal from "@/components/feature/ScrollReveal";
import SectionHeading from "@/components/feature/SectionHeading";
import Counter from "@/components/feature/Counter";
import usePageMeta from "@/hooks/usePageMeta";

const values = [
  { title: "Reliability", desc: "We honour commitments and deliver dependably, every time.", icon: "ri-shield-check-line" },
  { title: "Integrity", desc: "Transparent pricing, honest communication and ethical operations.", icon: "ri-verified-badge-line" },
  { title: "Efficiency", desc: "Streamlined processes that keep cargo moving without delays.", icon: "ri-flashlight-line" },
  { title: "Innovation", desc: "Technology-enabled visibility and smarter logistics solutions.", icon: "ri-lightbulb-line" },
];

const journey = [
  { label: "Integrated logistics for every mode", icon: "ri-global-line" },
  { label: "Customer-first coordination", icon: "ri-heart-3-line" },
  { label: "Technology-driven visibility", icon: "ri-eye-line" },
  { label: "Multimodal freight expertise", icon: "ri-train-line" },
];

export default function About() {
  usePageMeta(
    "About Us | LSL Logistics Network — Integrated Freight & Supply Chain Partner in India",
    "Learn about LSL Logistics Network — an integrated logistics and supply chain partner delivering reliable ocean, air, road and rail freight solutions across India and global markets.",
    "/about-us"
  );

  return (
    <>
      <PageHeader
        title="About LSL Logistics Network"
        subtitle="An integrated logistics and supply chain partner built around your business."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      <section className="bg-background-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20logistics%20professionals%20in%20a%20corporate%20environment%20collaborating%20over%20a%20global%20supply%20chain%20map%2C%20with%20containers%20and%20cargo%20in%20the%20background%2C%20professional%20business%20photography%2C%20premium%20tone%2C%20sharp%20detail&width=1000&height=800&seq=lsl-about-hero-1&orientation=portrait"
                alt="LSL logistics team planning a global supply chain"
                className="h-[420px] w-full rounded-lg object-cover md:h-[520px]"
              />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
                <span className="h-px w-6 bg-primary-600" aria-hidden />
                Our Story
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-foreground-950 md:text-4xl">
                A Logistics Partner You Can Build On
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                LSL Logistics Network (OPC) Pvt. Ltd. is an integrated logistics and
                supply chain company based in New Delhi, India. We help businesses move
                goods efficiently, securely and reliably year-round — combining freight
                expertise, professional coordination and technology to deliver complete
                end-to-end logistics management.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {journey.map((j) => (
                  <div key={j.label} className="flex items-center gap-2.5 text-sm text-foreground-700">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100">
                      <i className={`${j.icon} text-accent-700`} aria-hidden />
                    </span>
                    {j.label}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-background-100 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ScrollReveal>
            <SectionHeading eyebrow="Mission · Vision · Commitment" title="What Drives LSL Forward" />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                key: "mission",
                label: "Our Mission",
                icon: "ri-compass-3-line",
                desc: "To simplify global trade for businesses by delivering reliable, transparent and technology-driven logistics solutions that move cargo safely, on time and at the right cost — across every mode of transport.",
              },
              {
                key: "vision",
                label: "Our Vision",
                icon: "ri-eye-line",
                desc: "To be a trusted end-to-end supply chain partner recognized for professional execution and measurable results — connecting Indian businesses to markets around the world.",
              },
              {
                key: "commitment",
                label: "Our Commitment",
                icon: "ri-shield-check-line",
                desc: "We are committed to every shipment we handle — with secure handling, proactive communication, professional coordination and complete visibility from pickup to final delivery.",
              },
            ].map((m, i) => (
              <ScrollReveal key={m.key} delay={i * 80}>
                <div className="h-full rounded-lg border border-background-200 bg-background-50 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-500">
                    <i className={`${m.icon} text-xl text-foreground-950`} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground-950">{m.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-600">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-950 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ScrollReveal>
            <SectionHeading dark eyebrow="Core Values" title="The Principles That Guide Us" />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-lg border border-primary-800 bg-primary-900/40 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-500">
                    <i className={`${v.icon} text-xl text-foreground-950`} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-foreground-50">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-300">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-100 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ScrollReveal>
            <SectionHeading eyebrow="By the Numbers" title="Trusted Capacity, Measured Results" />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { end: 120, suffix: "+", label: "Trade Lanes Served" },
              { end: 4800, suffix: "+", label: "Shipments Delivered" },
              { end: 60, suffix: "+", label: "Regions Connected" },
              { end: 98, suffix: "%", label: "On-Time Reliable" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div className="rounded-lg border border-background-200 bg-background-50 p-6 text-center">
                  <p className="font-heading text-3xl font-extrabold text-primary-600 md:text-4xl">
                    <Counter end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-foreground-600">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}