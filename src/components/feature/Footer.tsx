import { Link } from "react-router-dom";
import Logo from "./Logo";
import { servicesNav } from "@/mocks/services";

const companyLinks = [
  { to: "/about-us", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/track-order", label: "Shipment Tracking" },
  { to: "/contact", label: "Contact Us" },
];

const footerServices = [
  { slug: "ocean-freight-forwarding", label: "Ocean Freight" },
  { slug: "air-freight-forwarding", label: "Air Freight" },
  { slug: "road-freight", label: "Road Freight" },
  { slug: "rail-freight", label: "Rail Freight" },
  { slug: "cold-chain-logistics", label: "Cold Chain" },
  { slug: "custom-clearance", label: "Custom Clearance" },
  { slug: "warehousing-distribution", label: "Warehousing" },
  { slug: "door-to-door-logistics", label: "Door-to-Door" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-foreground-100">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground-300">
              LSL Logistics Network (OPC) Pvt. Ltd. — an integrated logistics and
              supply-chain partner moving your business forward across India and
              global markets.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground-50">
              Company
            </h4>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground-300 transition hover:text-accent-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground-50">
              Services
            </h4>
            <ul className="mt-5 space-y-3">
              {footerServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-sm text-foreground-300 transition hover:text-accent-300"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground-50">
              Contact
            </h4>
            <div className="mt-5 space-y-4 text-sm text-foreground-300">
              <p>
                <span className="flex items-start gap-2">
                  <i className="ri-map-pin-2-line mt-0.5 text-accent-300" aria-hidden />
                  <span>
                    Flat No. 54-C, 2nd Floor, Block-WP, Near Jhule Lal Mandir,
                    Pitampura, New Delhi – 110034
                  </span>
                </span>
              </p>
              <a href="mailto:info@lsllogistics.com" className="flex items-center gap-2 transition hover:text-accent-300">
                <i className="ri-mail-line text-accent-300" aria-hidden />
                info@lsllogistics.com
              </a>
              <a href="tel:+911140001234" className="flex items-center gap-2 transition hover:text-accent-300">
                <i className="ri-phone-line text-accent-300" aria-hidden />
                +91 11 4000 1234
              </a>
            </div>
            <div className="mt-6 overflow-hidden rounded-lg">
              <iframe
                title="LSL Logistics Network office location on Google Maps"
                src="https://www.google.com/maps?q=Pitampura%2C%20New%20Delhi%2C%20India&output=embed"
                className="h-32 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row md:px-6">
          <p className="text-xs text-foreground-400">
            © 2026 LSL Logistics Network (OPC) Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground-400">
            <Link to="/contact" className="transition hover:text-accent-300">
              Privacy Policy
            </Link>
            <span className="text-primary-700">|</span>
            <Link to="/contact" className="transition hover:text-accent-300">
              Terms &amp; Conditions
            </Link>
            <span className="text-primary-700">|</span>
            <Link to="/admin" className="transition hover:text-accent-300">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}