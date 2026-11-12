import ScrollReveal from "@/components/feature/ScrollReveal";
import Counter from "@/components/feature/Counter";

const stats = [
  { end: 120, suffix: "+", label: "Trade Lanes Served", icon: "ri-global-line" },
  { end: 4800, suffix: "+", label: "Shipments Delivered", icon: "ri-truck-line" },
  { end: 60, suffix: "+", label: "Regions Connected", icon: "ri-map-2-line" },
  { end: 98, suffix: "%", label: "On-Time Reliable", icon: "ri-shield-check-line" },
];

export default function StatsSection() {
  return (
    <section className="bg-accent-500 py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80}>
              <div className="flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground-950/10">
                  <i className={`${s.icon} text-2xl text-foreground-950`} aria-hidden />
                </span>
                <p className="mt-4 font-heading text-3xl font-extrabold text-foreground-950 md:text-4xl">
                  <Counter end={s.end} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-foreground-800">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}