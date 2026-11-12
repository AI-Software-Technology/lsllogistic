interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
            dark ? "text-accent-300" : "text-primary-600"
          }`}
        >
          <span
            className={`h-px w-6 ${dark ? "bg-accent-300" : "bg-primary-600"}`}
            aria-hidden
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 font-heading text-2xl font-bold leading-tight md:text-4xl ${
          dark ? "text-foreground-50" : "text-foreground-950"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm leading-relaxed md:text-base ${
            dark ? "text-foreground-200" : "text-foreground-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}