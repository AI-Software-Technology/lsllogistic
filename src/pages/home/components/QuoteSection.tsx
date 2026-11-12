import ScrollReveal from "@/components/feature/ScrollReveal";
import SectionHeading from "@/components/feature/SectionHeading";
import QuoteForm from "@/components/feature/QuoteForm";

export default function QuoteSection() {
  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <ScrollReveal>
            <div>
              <SectionHeading
                eyebrow="Get a Quote"
                title="Let's Move Your Business Forward"
                subtitle="Tell us about your shipment and our logistics team will prepare a tailored solution for your cargo."
                align="left"
              />
              <div className="mt-8 space-y-4">
                {[
                  { icon: "ri-time-line", text: "Quick response from our logistics specialists" },
                  { icon: "ri-route-line", text: "Tailored multi-modal shipping solutions" },
                  { icon: "ri-shield-check-line", text: "Transparent pricing and professional coordination" },
                ].map((f) => (
                  <div key={f.icon} className="flex items-center gap-3 text-sm text-foreground-700">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
                      <i className={`${f.icon} text-primary-700`} aria-hidden />
                    </span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="rounded-lg border border-background-200 bg-background-50 p-6 shadow-card md:p-8">
              <QuoteForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}