import { Link } from "react-router-dom";
import PageHeader from "@/components/feature/PageHeader";
import ScrollReveal from "@/components/feature/ScrollReveal";
import SectionHeading from "@/components/feature/SectionHeading";
import { services } from "@/mocks/services";
import usePageMeta from "@/hooks/usePageMeta";

export default function ServicesPage() {
  usePageMeta(
    "Logistics Services | Ocean, Air, Road & Rail Freight | LSL Logistics Network",
    "Explore LSL Logistics Network's comprehensive logistics services — ocean freight, air freight, road freight, rail freight, cold chain, customs clearance and door-to-door logistics.",
    "/services"
  );

  return (
    <>
      <PageHeader
        title="Our Logistics Services"
        subtitle="Comprehensive freight forwarding and supply chain solutions designed to move your business forward."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="bg-background-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.slug} delay={(i % 3) * 80}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-background-200 bg-background-50 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-md bg-accent-500">
                      <i className={`${s.icon} text-xl text-foreground-950`} aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-heading text-base font-bold text-foreground-950">{s.name}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-600">{s.short}</p>
                    <Link
                      to={`/services/${s.slug}`}
                      className="mt-4 inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-primary-600 transition hover:gap-2 hover:text-primary-700"
                    >
                      Learn More
                      <i className="ri-arrow-right-line" aria-hidden />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}