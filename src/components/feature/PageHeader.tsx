import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  breadcrumb: { label: string; to?: string }[];
}

export default function PageHeader({
  title,
  subtitle,
  image = "https://readdy.ai/api/search-image?query=Abstract%20aerial%20view%20of%20container%20terminal%20and%20global%20shipping%20lines%2C%20muted%20dark%20blue%20tone%2C%20stylized%20graphic%20landscape%20for%20a%20corporate%20logistics%20website%20header%20background%2C%20clean%20minimal%20premium%20aesthetic&width=1600&height=600&seq=lsl-pageheader-1&orientation=landscape",
  imageAlt = "Global logistics background",
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section className="relative flex h-[300px] items-center overflow-hidden pt-16 md:h-[360px]">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/85 via-primary-950/70 to-primary-900/80" />
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 text-xs text-foreground-200">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-1">
              {i > 0 && <i className="ri-arrow-right-s-line text-foreground-300" aria-hidden />}
              {crumb.to ? (
                <Link to={crumb.to} className="transition hover:text-accent-300">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground-200">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="font-heading text-3xl font-extrabold text-foreground-50 md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground-200 md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}