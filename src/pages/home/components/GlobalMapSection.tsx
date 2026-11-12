import ScrollReveal from "@/components/feature/ScrollReveal";
import SectionHeading from "@/components/feature/SectionHeading";

const hubs = [
  { name: "Russia", x: 50, y: 18 },
  { name: "Iraq", x: 55, y: 40 },
  { name: "Israel", x: 51, y: 38 },
  { name: "Saudi Arabia", x: 55, y: 47 },
  { name: "Qatar", x: 58, y: 43 },
  { name: "India", x: 63, y: 55, core: true },
  { name: "UAE", x: 60, y: 49 },
  { name: "Japan", x: 87, y: 38 },
  { name: "Global Trade", x: 78, y: 66 },
];

const routes = [
  { left: "50%", top: "20%", width: "30%", rotate: "12deg" },
  { left: "52%", top: "30%", width: "26%", rotate: "18deg" },
  { left: "55%", top: "40%", width: "36%", rotate: "6deg" },
  { left: "58%", top: "48%", width: "42%", rotate: "4deg" },
  { left: "60%", top: "52%", width: "48%", rotate: "-6deg" },
];

export default function GlobalMapSection() {
  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Global Reach"
            title="Connecting Markets. Delivering Globally."
            subtitle="A visual representation of our global logistics connectivity across key trade regions."
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative mt-12 overflow-hidden rounded-lg border border-background-200 shadow-card">
            <div className="relative h-[380px] md:h-[460px]">
              <img
                src="https://readdy.ai/api/search-image?query=Stylized%20abstract%20world%20map%20with%20dotted%20continents%20in%20deep%20navy%20blue%20on%20a%20dark%20background%2C%20minimal%20global%20network%20connectivity%20concept%2C%20clean%20premium%20corporate%20data%20visualization%20tone&width=1600&height=900&seq=lsl-worldmap-1&orientation=landscape"
                alt="Abstract stylized world map showing global logistics connectivity"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-950/60" />

              {routes.map((r, i) => (
                <div
                  key={i}
                  className="absolute h-px lsl-route"
                  style={{
                    left: r.left,
                    top: r.top,
                    width: r.width,
                    transform: `rotate(${r.rotate})`,
                    background:
                      "repeating-linear-gradient(90deg, oklch(var(--accent-500)) 0 8px, transparent 8px 16px)",
                    opacity: 0.5,
                  }}
                  aria-hidden
                />
              ))}

              {hubs.map((hub) => (
                <div
                  key={hub.name}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                >
                  <span
                    className={`block h-3 w-3 rounded-full ${
                      hub.core
                        ? "lsl-pulse-dot bg-accent-300"
                        : "bg-accent-500"
                    }`}
                    aria-hidden
                  />
                  <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary-900 px-2 py-1 text-[10px] font-medium text-foreground-50 opacity-0 transition group-hover:opacity-100">
                    {hub.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-background-200 bg-background-50 p-5 sm:grid-cols-4">
              {["India", "UAE", "Saudi Arabia", "Qatar", "Japan", "Iraq", "Russia", "Israel"].map((region) => (
                <div key={region} className="flex items-center gap-2 text-sm text-foreground-700">
                  <i className="ri-map-pin-2-line text-accent-600" aria-hidden />
                  {region}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}