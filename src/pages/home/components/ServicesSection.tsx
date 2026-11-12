import { Link } from "react-router-dom";
import ScrollReveal from "@/components/feature/ScrollReveal";
import SectionHeading from "@/components/feature/SectionHeading";
import { services } from "@/mocks/services";

export default function ServicesSection() {
  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Our Logistics Solutions"
            subtitle="Comprehensive logistics services designed to move your business forward."
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={(i % 3) * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-background-200 bg-background-50 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-md bg-accent-500">
                    <i className={`${service.icon} text-xl text-foreground-950`} aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-base font-bold text-foreground-950">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-600">
                    {service.short}
                  </p>
                  <Link
                    to={`/services/${service.slug}`}
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

        <ScrollReveal>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-7 py-3.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
            >
              View All Services
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}