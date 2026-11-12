import { Link, useParams } from "react-router-dom";
import PageHeader from "@/components/feature/PageHeader";
import ScrollReveal from "@/components/feature/ScrollReveal";
import SectionHeading from "@/components/feature/SectionHeading";
import ServiceRequestForm from "@/pages/services/components/ServiceRequestForm";
import { services } from "@/mocks/services";
import usePageMeta from "@/hooks/usePageMeta";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  usePageMeta(
    service
      ? `${service.name} | LSL Logistics Network`
      : "Service Not Found | LSL Logistics Network",
    service
      ? `${service.name} from LSL Logistics Network — ${service.short}`
      : "The logistics service you are looking for was not found.",
    service ? `/services/${service.slug}` : "/services"
  );

  if (!service) {
    return (
      <section className="flex min-h-[60vh] items-center bg-background-50 pt-16">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center md:px-6">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <i className="ri-file-search-line text-2xl text-primary-700" aria-hidden />
          </span>
          <h1 className="mt-6 font-heading text-2xl font-bold text-foreground-950 md:text-3xl">
            Service not found
          </h1>
          <p className="mt-3 text-sm text-foreground-600">
            We couldn't find the logistics service you were looking for. Please browse our full range of services instead.
          </p>
          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
          >
            View All Services
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
        </div>
      </section>
    );
  }

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 6);

  return (
    <>
      <PageHeader
        title={service.name}
        subtitle={service.tagline}
        image={service.image}
        imageAlt={service.alt}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.name },
        ]}
      />

      <section className="bg-background-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="h-[340px] w-full object-cover md:h-[440px]"
                />
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {service.benefits.map((b) => (
                  <div
                    key={b.label}
                    className="rounded-lg border border-background-200 bg-background-100 p-4"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-100">
                      <i className={`${b.icon} text-lg text-accent-700`} aria-hidden />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-foreground-800">{b.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
                <span className="h-px w-6 bg-primary-600" aria-hidden />
                Service Overview
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-foreground-950 md:text-3xl">
                {service.name} with LSL
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                {service.description}
              </p>
              <div className="mt-7 rounded-lg border border-background-200 bg-background-100 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950">
                  Why our clients rely on this service
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground-700">
                      <i className="ri-checkbox-circle-fill mt-0.5 text-accent-600" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
              >
                Get a Quote for {service.name}
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="border-t border-background-200 bg-background-100 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <ScrollReveal key={f} delay={(i % 3) * 80}>
                <div className="h-full rounded-lg border border-background-200 bg-background-50 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-50">
                    <i className="ri-check-line text-primary-700" aria-hidden />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-foreground-900">{f}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-50 py-16 md:py-24" aria-labelledby="request-service-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
                <span className="h-px w-6 bg-primary-600" aria-hidden />
                Service Booking
              </span>
              <h2
                id="request-service-heading"
                className="mt-3 font-heading text-2xl font-bold text-foreground-950 md:text-4xl"
              >
                Request This Service
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                Tell us about your shipment requirements and our logistics team will get back to
                you with the next steps.
              </p>
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-10 max-w-4xl">
            <ScrollReveal delay={100}>
              <ServiceRequestForm serviceSlug={service.slug} serviceName={service.name} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-background-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Explore More"
              title="Other Logistics Solutions"
              subtitle="Complete freight forwarding and supply-chain services for every shipping need."
            />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <ScrollReveal key={s.slug} delay={(i % 3) * 80}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full items-start gap-3 rounded-lg border border-background-200 bg-background-50 p-5 transition hover:border-primary-200 hover:shadow-card"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent-100">
                    <i className={`${s.icon} text-xl text-accent-700`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground-950">{s.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-600">
                      {s.short}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 transition group-hover:gap-2">
                      Learn More
                      <i className="ri-arrow-right-line" aria-hidden />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}