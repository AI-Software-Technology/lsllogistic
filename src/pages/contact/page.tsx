import PageHeader from "@/components/feature/PageHeader";
import ScrollReveal from "@/components/feature/ScrollReveal";
import QuoteForm from "@/components/feature/QuoteForm";
import usePageMeta from "@/hooks/usePageMeta";

const contactCards = [
  {
    title: "Registered Office",
    icon: "ri-map-pin-2-line",
    lines: [
      "Flat No. 54-C, 2nd Floor, Block-WP,",
      "Near Jhule Lal Mandir, Pitampura,",
      "New Delhi – 110034, India",
    ],
  },
  {
    title: "Email Us",
    icon: "ri-mail-line",
    lines: ["info@lsllogistics.com", "We respond within 24 hours."],
    href: "mailto:info@lsllogistics.com",
  },
  {
    title: "Call Us",
    icon: "ri-phone-line",
    lines: ["+91 11 4000 1234", "Mon–Sat, 9:00 AM – 6:00 PM IST"],
    href: "tel:+911140001234",
  },
];

export default function ContactPage() {
  usePageMeta(
    "Contact Us & Get a Quote | LSL Logistics Network",
    "Get a logistics quote or reach LSL Logistics Network in New Delhi. Request pricing for ocean, air, road, rail, cold chain, customs and door-to-door freight services.",
    "/contact"
  );

  return (
    <>
      <PageHeader
        title="Let's Move Your Business Forward"
        subtitle="Tell us about your shipment and our logistics team will contact you shortly with a tailored quote."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
      />

      <section className="bg-background-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 80}>
                <div className="h-full rounded-lg border border-background-200 bg-background-100 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-600">
                    <i className={`${c.icon} text-2xl text-background-50`} aria-hidden />
                  </span>
                  <h2 className="mt-4 font-heading text-base font-bold text-foreground-950">
                    {c.title}
                  </h2>
                  {c.lines.map((l, j) =>
                    j === 0 && c.href ? (
                      <a
                        key={l}
                        href={c.href}
                        className="mt-2 block text-sm font-medium text-primary-700 transition hover:text-primary-800"
                      >
                        {l}
                      </a>
                    ) : (
                      <p key={l} className="mt-2 text-sm leading-relaxed text-foreground-600">
                        {l}
                      </p>
                    )
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
                <span className="h-px w-6 bg-primary-600" aria-hidden />
                Request a Quote
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-foreground-950 md:text-3xl">
                Get a Tailored Logistics Quote
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                Share your shipment details and our team will prepare a competitive,
                tailored proposal. Forward enquiry, customs support and door-to-door
                coordination — all from a single point of contact.
              </p>
              <div className="mt-7 space-y-3">
                {[
                  "Response within 24 hours",
                  "Tailored multi-modal solutions",
                  "Transparent, competitive pricing",
                  "Dedicated logistics coordinator",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-foreground-700">
                    <i className="ri-check-line text-accent-600" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="rounded-lg border border-background-200 bg-background-100 p-6 md:p-8">
                <QuoteForm />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="mt-16 overflow-hidden rounded-lg">
              <iframe
                title="LSL Logistics Network registered office location on Google Maps"
                src="https://www.google.com/maps?q=Pitampura%2C%20New%20Delhi%2C%20India&output=embed"
                className="h-[380px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}